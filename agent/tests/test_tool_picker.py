import unittest
from unittest import mock

from telemetry_agent.agent import LabAgent
from telemetry_agent.config import Settings
from telemetry_agent.llm import LLMError


class PickerModel:
    """Chooses tools from the fixed list, then answers in plain text."""

    def __init__(self, picks):
        self.picks = picks

    def choose_tools(self, system, text, names):
        if isinstance(self.picks, Exception):
            raise self.picks
        return self.picks

    def chat(self, messages, **kwargs):
        return {"content": "Here is what I found."}


class ToolPicker(unittest.TestCase):
    def ask(self, picks, text, **settings):
        agent = LabAgent(Settings(**settings), llm=PickerModel(picks))
        with mock.patch.object(agent.tools, "call", return_value={"ok": True}) as call:
            reply = agent.ask(text)
        return reply, call

    def test_a_message_with_no_router_rule_gets_tools_the_llm_picked(self):
        reply, call = self.ask(["check_install"], "am i good to go or is something still broken")
        self.assertEqual([(t["tool"], t["chosen_by"]) for t in reply.trace], [("check_install", "llm")])
        call.assert_called_once_with("check_install", {})

    def test_the_router_still_goes_first(self):
        reply, _ = self.ask(["check_hardware"], "Which model should I download for my laptop?")
        self.assertEqual([(t["tool"], t["chosen_by"]) for t in reply.trace], [("recommend_model", "router")])

    def test_none_and_failed_choices_run_nothing(self):
        for picks in (["none"], LLMError("no")):
            with self.subTest(picks=picks):
                reply, call = self.ask(picks, "tell me a story")
                self.assertEqual(reply.trace, [])
                call.assert_not_called()

    def test_a_benchmark_needs_a_named_model_and_read_logs_needs_a_known_error(self):
        reply, call = self.ask(["run_benchmark", "read_logs"], "it feels kind of odd")
        self.assertEqual(reply.trace, [])
        call.assert_not_called()
        reply, _ = self.ask(["run_benchmark"], "qwen2.5:1.5b feels odd, can you measure it")
        self.assertEqual(reply.trace[0]["args"], {"model": "qwen2.5:1.5b"})

    def test_it_can_be_switched_off(self):
        reply, _ = self.ask(["check_install"], "am i good to go", tool_picker=False)
        self.assertEqual(reply.trace, [])


if __name__ == "__main__":
    unittest.main()


class StepProposals(unittest.TestCase):
    def test_picker_turns_a_request_to_act_into_a_proposal(self):
        from telemetry_agent.agent import LabAgent, _step_for

        class Picker:
            def choose_tools(self, system, text, names):
                return ["propose_step"]

            def chat(self, messages, tools=None):
                return {"content": "ok"}
        agent = LabAgent(Settings(router=False), llm=Picker())
        self.assertEqual(agent._picked_calls("please download qwen2.5:1.5b for me")[0]["args"], {"step": "pull_model", "model": "qwen2.5:1.5b"})
        self.assertEqual(agent._picked_calls("can you remove qwen2.5:3b")[0]["args"], {"step": "remove_model", "model": "qwen2.5:3b"})
        self.assertEqual(agent._picked_calls("download something"), [])  # no exact model, no proposal
        self.assertEqual(_step_for("say hello to it"), "first_prompt")
        # The second provider: an app the lab lists becomes an app proposal, never a command.
        self.assertEqual(agent._picked_calls("can you install VS Code for me")[0]["args"], {"step": "install_app", "app": "vscode"})
        self.assertEqual(agent._picked_calls("please uninstall obsidian")[0]["args"], {"step": "remove_app", "app": "obsidian"})
        self.assertEqual(agent._picked_calls("install zoom for me"), [])  # not a listed app
        self.assertEqual(agent.tools.propose_step("install_app", app="vscode")["proposed"], {"action": "install_app", "args": {"app": "vscode"}})
        with self.assertRaises(ValueError):
            agent.tools.propose_step("install_app", app="zoom")
