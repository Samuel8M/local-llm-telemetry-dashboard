# Writing a recipe

A recipe is a list of steps the lab already knows, such as "set up my laptop for this course". It lives in `agent/skill/recipes.json`. You don't need to write any code.

A recipe holds no commands. Each entry names a registered step, so a recipe can't do anything a card can't. Students still see each step's exact command, cost and undo, and still approve each one. It ends in one check that confirms everything is in place.

## The format

```json
{
  "id": "95-000-setup",
  "title": "Set up for 95-000",
  "for": "Students taking 95-000",
  "why": "One sentence on why a student would want this.",
  "review": {"by": null, "on": null},
  "steps": [
    {"action": "install_app", "app": "vscode"},
    {"action": "install_runtime"},
    {"action": "start_runtime"},
    {"action": "pull_model", "model": "qwen2.5:1.5b"},
    {"action": "first_prompt", "model": "qwen2.5:1.5b"}
  ]
}
```

| Step | What it does | Needs |
|---|---|---|
| `install_runtime` | The student installs Ollama from its official page | Nothing |
| `start_runtime` | Starts Ollama | Nothing |
| `pull_model` | Downloads a model | `model`, from `agent/skill/models.json` |
| `first_prompt` | Says hello to the model, which proves it answers | `model` |
| `install_app` | Installs an app. It becomes a manual step on a laptop with no Homebrew or winget | `app`, either `vscode` or `obsidian` |

A recipe can't remove anything or measure anything. To add a new kind of step or a new app, add it to the registry first, so it gets a card, a risk label and an undo.

## Reviewing

Fill in `review` only after a person has run the recipe on a real laptop. The page then shows who reviewed it and when:

```json
"review": {"by": "TA name or team", "on": "2026-11-20"}
```

Check that the course really wants what the recipe installs. A recipe doesn't replace a course's own setup page.

## Checking your work

```sh
python3 scripts/check_project.py
```

This fails and names the problem if a recipe uses an unknown step, model or app.
