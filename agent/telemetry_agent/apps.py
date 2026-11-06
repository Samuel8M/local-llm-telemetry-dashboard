"""Apps the lab can install: the second provider behind the Action registry.

Ollama was the first thing the lab could set up. Installing an app goes through the same
registry, so it gets the same approval card, the same exact command, the same log line and
the same undo. Homebrew does the work on a Mac and winget on Windows; without either, the
step becomes a manual one with the app's official download page, never a password prompt.
Only the apps listed here can be named, and only with the exact commands built here.
"""
from __future__ import annotations

import os
import platform
import shutil
from pathlib import Path

APPS: dict[str, dict] = {
    "vscode": {
        "id": "vscode", "name": "Visual Studio Code", "size_gb": 0.5, "site": "https://code.visualstudio.com/download",
        "what": "A free code editor from Microsoft, and a common choice for programming courses.",
        "why": "You need somewhere to write and run code. VS Code opens files, folders and a terminal in one window.",
        "brew": "visual-studio-code", "winget": "Microsoft.VisualStudioCode",
        "mac_app": "Visual Studio Code.app", "win_exe": "Programs/Microsoft VS Code/Code.exe",
    },
    "obsidian": {
        "id": "obsidian", "name": "Obsidian", "size_gb": 0.4, "site": "https://obsidian.md/download",
        "what": "A free notes app that keeps every note as a plain text file on your laptop.",
        "why": "Course notes that link to each other, stored in files you own, with nothing sent anywhere.",
        "brew": "obsidian", "winget": "Obsidian.Obsidian",
        "mac_app": "Obsidian.app", "win_exe": "Programs/Obsidian/Obsidian.exe",
    },
}

_BREW_PATHS = (Path("/opt/homebrew/bin/brew"), Path("/usr/local/bin/brew"))


def app_path(app: dict) -> Path | None:
    """Where the app is on this laptop, if it is installed; checked by file, never by asking the installer."""
    if platform.system() == "Darwin":
        for base in (Path("/Applications"), Path.home() / "Applications"):
            if (base / app["mac_app"]).is_dir():
                return base / app["mac_app"]
    elif platform.system() == "Windows":
        local = os.environ.get("LOCALAPPDATA")
        if local and (Path(local) / app["win_exe"]).is_file():
            return Path(local) / app["win_exe"]
    return None


def manager() -> dict:
    """The package manager for this laptop: what it's called, whether it's here, and how the command names it."""
    if platform.system() == "Darwin":
        found = shutil.which("brew") or next((str(p) for p in _BREW_PATHS if p.is_file()), None)
        cli = "brew" if shutil.which("brew") else found
        return {"name": "Homebrew", "cli": cli or "brew", "installed": bool(found), "link": "https://brew.sh",
                "note": "Homebrew is the Mac's usual command-line installer. The lab only uses it if you already have it."}
    if platform.system() == "Windows":
        found = shutil.which("winget")
        return {"name": "winget", "cli": "winget", "installed": bool(found), "link": "https://aka.ms/getwinget",
                "note": "winget is the installer that comes with Windows 10 and 11."}
    return {"name": "a package manager", "cli": None, "installed": False, "link": None, "note": "This lab installs apps on macOS and Windows only."}


def app_context(app_id: str) -> dict:
    """What the app actions' describe() needs."""
    app = APPS[app_id]
    path = app_path(app)
    return {"app": app, "name": app["name"], "manager": manager(), "system": platform.system(),
            "installed_at": str(path) if path else None, "model": None}


def install_command(ctx: dict) -> str | None:
    m, app = ctx["manager"], ctx["app"]
    if ctx["system"] == "Darwin":
        return f"{m['cli']} install --cask {app['brew']}"
    if ctx["system"] == "Windows":
        return f"winget install --id {app['winget']} -e --accept-package-agreements --accept-source-agreements"
    return None


def remove_command(ctx: dict) -> str | None:
    m, app = ctx["manager"], ctx["app"]
    if ctx["system"] == "Darwin":
        return f"{m['cli']} uninstall --cask {app['brew']}"
    if ctx["system"] == "Windows":
        return f"winget uninstall --id {app['winget']} -e"
    return None


def where_apps_go(ctx: dict) -> str:
    return "the Applications folder" if ctx["system"] == "Darwin" else "your user account's Programs folder"


def app_commands() -> set[str]:
    """Every exact app command the lab can show, on any OS, so the assistant may repeat them and nothing else."""
    found = {"brew --version", "winget --version", "brew list --cask", "winget list"}
    for app in APPS.values():
        for cli in ("brew", *map(str, _BREW_PATHS)):
            found |= {f"{cli} install --cask {app['brew']}", f"{cli} uninstall --cask {app['brew']}"}
        found |= {f"winget install --id {app['winget']} -e --accept-package-agreements --accept-source-agreements",
                  f"winget uninstall --id {app['winget']} -e"}
    return found
