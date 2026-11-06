"""Recipes: a reviewed list of registered steps, such as setting up a laptop for one course.

A recipe holds no commands. Each entry names an Action from the registry and its arguments, so a
recipe can do nothing a card can't, and every step still shows its command, its cost and its undo.
That keeps it safe for a TA to write one without touching code: see docs/recipes.md.
"""
from __future__ import annotations

import json
import re

from .apps import APPS
from .config import SKILL_DIR, load_allow_list

# Steps that add things. A recipe never removes anything, and measuring is left to the learner.
ALLOWED = {"install_runtime": set(), "start_runtime": set(), "pull_model": {"model"}, "first_prompt": {"model"}, "install_app": {"app"}}
FIELDS = {"id", "title", "for", "why", "review", "steps"}


def validate(data: dict) -> list[dict]:
    """Raise ValueError naming the first problem, so a bad recipe never reaches a learner."""
    models = {m["ollama_tag"] for m in load_allow_list()}
    recipes, seen = data.get("recipes"), set()
    if not isinstance(recipes, list) or not recipes:
        raise ValueError("recipes.json needs a list of recipes.")
    for recipe in recipes:
        name = recipe.get("id") if isinstance(recipe, dict) else None
        if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9-]{1,40}", name):
            raise ValueError(f"Recipe id {name!r} must be short lowercase words joined by hyphens.")
        if name in seen:
            raise ValueError(f"Two recipes are called {name}.")
        seen.add(name)
        if set(recipe) != FIELDS:
            raise ValueError(f"Recipe {name} must have exactly these fields: {sorted(FIELDS)}.")
        for key in ("title", "for", "why"):
            if not isinstance(recipe[key], str) or not recipe[key].strip():
                raise ValueError(f"Recipe {name} needs a {key}.")
        review = recipe["review"]
        if not isinstance(review, dict) or set(review) != {"by", "on"} or bool(review["by"]) != bool(review["on"]):
            raise ValueError(f"Recipe {name}: a review needs both who and when, or neither.")
        if not isinstance(recipe["steps"], list) or not recipe["steps"]:
            raise ValueError(f"Recipe {name} needs at least one step.")
        for step in recipe["steps"]:
            action = step.get("action") if isinstance(step, dict) else None
            if action not in ALLOWED:
                raise ValueError(f"Recipe {name}: {action!r} isn't a step a recipe may use. It may use: {sorted(ALLOWED)}.")
            args = set(step) - {"action"}
            if args != ALLOWED[action]:
                raise ValueError(f"Recipe {name}: {action} takes exactly {sorted(ALLOWED[action]) or 'no arguments'}.")
            if "model" in step and step["model"] not in models:
                raise ValueError(f"Recipe {name}: {step['model']} isn't on the lab's model list.")
            if "app" in step and step["app"] not in APPS:
                raise ValueError(f"Recipe {name}: {step['app']} isn't one of the lab's apps.")
    return recipes


def load_recipes() -> dict[str, dict]:
    data = json.loads((SKILL_DIR / "recipes.json").read_text(encoding="utf-8"))
    return {r["id"]: r for r in validate(data)}
