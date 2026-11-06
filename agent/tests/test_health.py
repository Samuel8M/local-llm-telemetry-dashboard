"""The health check only reads, and every problem comes with a repair card or a plain next step."""
import getpass
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from telemetry_agent import answers, helper
from telemetry_agent.config import Settings

HW = {"os": "macOS", "os_version": "27.0.1", "arch": "arm64", "cpu_model": "Apple M5", "total_ram_gb": 16.0, "available_ram_gb": 8.0, "free_disk_gb": 40.0,
      "gpu": "Apple GPU", "python": "3.13.1", "running_as_admin": False}
GOOD = {"name": "Ollama", "installed": True, "running": True, "models": ["qwen2.5:0.5b"], "broken_models": [], "lab_models": ["qwen2.5:0.5b"],
        "models_dir": "/Users/secret-name/.ollama/models", "models_dir_exists": True}


class Health(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.lab = helper.Lab(Settings(base_url="http://127.0.0.1:9/v1", results_dir=Path(tmp.name)))
        patcher = mock.patch.object(self.lab.tools, "check_hardware", return_value=HW)
        patcher.start()
        self.addCleanup(patcher.stop)

    def run_check(self, rt=GOOD, hw=None):
        with mock.patch.object(self.lab, "runtime_state", return_value=rt):
            if hw:
                with mock.patch.object(self.lab.tools, "check_hardware", return_value=hw):
                    return self.lab.health()
            return self.lab.health()

    def row(self, report, check):
        return next(r for r in report["checks"] if r["id"] == check)

    def test_a_healthy_laptop_has_nothing_to_fix_and_says_what_it_did_not_test(self):
        report = self.run_check()
        self.assertEqual(report["problems"], 0)
        self.assertTrue(all(r["status"] in {"ok", "optional"} for r in report["checks"]))
        hello = self.row(report, "reply")
        self.assertEqual(hello["status"], "optional")
        self.assertEqual(hello["repair"]["action"], "first_prompt")

    def test_stopped_ollama_gets_the_start_card(self):
        report = self.run_check({**GOOD, "running": False, "models": [], "lab_models": []})
        row = self.row(report, "ollama_running")
        self.assertEqual(row["status"], "bad")
        self.assertEqual(row["repair"]["action"], "start_runtime")
        self.assertGreater(report["problems"], 0)

    def test_missing_ollama_points_to_set_up_and_stops_there(self):
        report = self.run_check({**GOOD, "installed": False, "running": False, "models": [], "lab_models": []})
        row = self.row(report, "ollama_installed")
        self.assertEqual((row["status"], row["goto"]), ("bad", "deploy"))
        self.assertNotIn("ollama_running", [r["id"] for r in report["checks"]])

    def test_a_listed_model_with_no_file_gets_a_download_card(self):
        """The Nov 5 incident: Ollama listed models whose files were gone."""
        report = self.run_check({**GOOD, "broken_models": ["qwen2.5:1.5b", "qwen2.5:7b-instruct"]})
        row = self.row(report, "model_files")
        self.assertEqual(row["status"], "warn")
        self.assertIn("qwen2.5:1.5b", row["detail"])
        self.assertIn("qwen2.5:7b-instruct", row["detail"])
        self.assertEqual([r["args"]["model"] for r in row["repairs"]], ["qwen2.5:1.5b"])  # only what the lab allows

    def test_a_model_the_lab_downloaded_that_has_gone_is_caught(self):
        self.lab._log_change("Downloaded qwen2.5:1.5b, about 1.0 GB, to Ollama's models folder.", undo_model="qwen2.5:1.5b")
        report = self.run_check()
        row = self.row(report, "lab_models_present")
        self.assertEqual(row["status"], "warn")
        self.assertEqual(row["repairs"][0]["action"], "pull_model")

    def test_an_undone_download_is_not_a_problem(self):
        self.lab._log_change("Downloaded qwen2.5:1.5b.", undo_model="qwen2.5:1.5b")
        items = self.lab.changes()["changes"]
        items[-1]["undone"] = True
        self.lab._changes_path().write_text(__import__("json").dumps(items))
        self.assertEqual(self.row(self.run_check(), "lab_models_present")["status"], "ok")

    def test_an_app_the_lab_installed_that_has_gone_is_caught(self):
        self.lab._log_change("Installed Obsidian.", undo_app="obsidian")
        with mock.patch("telemetry_agent.helper.app_path", return_value=None):
            row = self.row(self.run_check(), "lab_apps_present")
        self.assertEqual(row["status"], "warn")
        self.assertIn("Obsidian", row["detail"])

    def test_low_disk_and_low_memory_are_named_with_real_numbers(self):
        report = self.run_check(hw={**HW, "free_disk_gb": 1.5, "available_ram_gb": 0.5})
        self.assertEqual(self.row(report, "disk")["status"], "warn")
        self.assertIn("1.5", self.row(report, "disk")["detail"])
        self.assertEqual(self.row(report, "memory")["status"], "warn")
        self.assertIn("0.5", self.row(report, "memory")["detail"])

    def test_a_failed_step_is_reported(self):
        self.lab.jobs["a" * 12] = {"id": "a" * 12, "action": "pull_model", "args": {}, "status": "failed", "error": "No space left on device", "diagnosis": None}
        row = self.row(self.run_check(), "last_failure")
        self.assertEqual(row["status"], "warn")
        self.assertIn("No space left", row["detail"])

    def test_it_only_reads_and_logs_one_line(self):
        before = len(self.lab.changes()["changes"])
        with mock.patch("telemetry_agent.helper.subprocess.Popen") as popen, mock.patch("telemetry_agent.helper.subprocess.run") as run:
            self.run_check()
        popen.assert_not_called()
        run.assert_not_called()
        self.assertEqual(len(self.lab.changes()["changes"]), before + 1)
        self.assertEqual(self.lab.changes()["changes"][-1]["kind"], "check")

    def test_the_assistant_points_to_it(self):
        with mock.patch.object(self.lab, "runtime_state", return_value=GOOD):
            got = answers.answer(self.lab, "can you run a health check?")
        self.assertEqual(got["id"], "health")
        self.assertEqual(got["links"][0]["goto"], "mylab")


class HelpPacket(Health):
    def packet(self, rt=GOOD):
        with mock.patch.object(self.lab, "runtime_state", return_value=rt):
            return self.lab.help_packet()

    def test_it_says_what_a_ta_needs(self):
        text = self.packet({**GOOD, "broken_models": ["qwen2.5:1.5b"]})["markdown"]
        for needed in ("macOS 27.0.1", "Apple M5", "16.0 GB", "40.0 GB", "qwen2.5:0.5b", "qwen2.5:1.5b", "Python 3.13.1", "What I was trying to do", "Ollama is running"):
            self.assertIn(needed, text)

    def test_it_holds_nothing_personal(self):
        self.lab._log_change(f"Showed you {Path.home()}/thesis/secret.txt", kind="check")
        self.lab.jobs["b" * 12] = {"id": "b" * 12, "action": "pull_model", "args": {}, "status": "failed",
                                   "error": f"failed at {Path.home()}/x with key sk-abcdefghijklmnopqrstuvwxyz123456", "diagnosis": None}
        text = self.packet()["markdown"]
        self.assertNotIn(str(Path.home()), text)
        self.assertNotIn("secret-name", text)
        self.assertNotIn("sk-abcdefghijklmnopqrstuvwxyz123456", text)
        user = getpass.getuser()
        if len(user) > 3:
            self.assertNotIn(user, text)
        self.assertIn("failed at", text)

    def test_your_words_never_enter_it(self):
        self.lab._log_change("The assistant answered from a check (status).", kind="assistant")
        self.lab.talks["c" * 12] = {"id": "c" * 12, "model": "qwen2.5:0.5b", "status": "done", "text": "my private essay", "stop": False}
        self.assertNotIn("private essay", self.packet()["markdown"])

    def test_it_says_what_it_leaves_out_so_the_student_can_decide(self):
        text = self.packet()["markdown"]
        self.assertIn("isn't in this report", text)
        self.assertIn("Read it before you send it", text)

    def test_it_never_sends_itself(self):
        packet = self.packet()
        self.assertEqual(set(packet), {"markdown", "filename"})
        self.assertRegex(packet["filename"], r"^local-ai-lab-help-\d{4}-\d{2}-\d{2}\.md$")


if __name__ == "__main__":
    unittest.main()
