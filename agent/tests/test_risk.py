"""Every card states what it costs, before it runs. A card that doesn't can't be built."""
import unittest
from unittest import mock

from telemetry_agent import actions
from telemetry_agent.apps import app_context
from telemetry_agent.config import load_allow_list

KEYS = {"time", "space", "internet", "password", "money", "undo"}


def every_card():
    model = next(m for m in load_allow_list() if m["ollama_tag"] == "qwen2.5:1.5b")
    rt = {"installed": True, "running": True, "models": [], "broken_models": []}
    for action in actions.REGISTRY.values():
        if action.id == "check_recipe":
            yield action.step({"recipe": {"id": "r", "title": "R"}, "name": "R"})
        elif action.id in actions.APP_ACTIONS:
            with mock.patch("telemetry_agent.apps.manager", return_value={"name": "Homebrew", "installed": True, "cli": "brew"}):
                ctx = app_context("vscode")
            yield action.step({**ctx, "manager": {"name": "Homebrew", "installed": True, "cli": "brew"}})
        else:
            yield action.step(actions.runtime_context(model, rt))


class RiskLabels(unittest.TestCase):
    def test_every_action_in_the_registry_states_all_six(self):
        cards = list(every_card())
        self.assertEqual(len(cards), len(actions.REGISTRY))
        for card in cards:
            self.assertEqual(set(card["risk"]), KEYS, card["id"])
            for key, item in card["risk"].items():
                self.assertTrue(item["value"].strip(), f"{card['id']} {key}")
                self.assertIn(item["level"], {"none", "note", "stop"})

    def test_a_card_with_no_label_cannot_be_built(self):
        bare = actions.Action("cloud_database", lambda c: "Create a database", describe=lambda c: {"what": "x"})
        with self.assertRaises(ValueError):
            bare.step({})

    def test_a_cost_or_a_password_or_no_undo_is_marked_to_look_at_twice(self):
        risk = actions._risk("A minute", money="About $15 a month", password="Yes, your AWS sign-in", undo="No: this can't be undone")
        self.assertEqual((risk["money"]["level"], risk["password"]["level"], risk["undo"]["level"]), ("stop", "stop", "stop"))
        free = actions._risk("A minute")
        self.assertEqual((free["money"]["level"], free["password"]["level"], free["undo"]["level"]), ("none", "none", "none"))

    def test_the_download_estimate_is_worked_out_and_says_what_it_assumes(self):
        self.assertEqual(actions._download_time(1.0), "About 3 minutes at 50 Mbit/s")
        self.assertEqual(actions._download_time(4.7), "About 13 minutes at 50 Mbit/s")
        self.assertEqual(actions._download_time(0.1), "About 1 minute at 50 Mbit/s")

    def test_steps_that_only_read_cost_nothing(self):
        cards = {c["id"]: c for c in every_card()}
        for action in ("check_hardware", "check_install", "check_app"):
            risk = cards[action]["risk"]
            self.assertEqual((risk["space"]["value"], risk["internet"]["value"], risk["undo"]["value"]), ("None", "No", "Nothing to undo"), action)

    def test_downloads_say_they_use_the_internet_and_how_much_space(self):
        risk = {c["id"]: c for c in every_card()}["pull_model"]["risk"]
        self.assertIn("Yes", risk["internet"]["value"])
        self.assertIn("1.0 GB", risk["space"]["value"])
        self.assertIn("Undo", risk["undo"]["value"])


if __name__ == "__main__":
    unittest.main()
