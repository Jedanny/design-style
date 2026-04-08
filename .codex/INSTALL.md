# Installing Design Style Matcher for Codex

Enable design-style-matcher skills in Codex via native skill discovery.

## Prerequisites

- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jedanny/design-style.git ~/.codex/design-style
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/design-style/skills ~/.agents/skills/design-style
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\design-style" "$env:USERPROFILE\.codex\design-style\skills"
   ```

3. **Restart Codex** to discover the skills.

## Updating

```bash
cd ~/.codex/design-style && git pull
```

## Uninstalling

```bash
rm ~/.agents/skills/design-style
```
