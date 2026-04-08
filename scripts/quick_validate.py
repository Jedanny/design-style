#!/usr/bin/env python3
"""
Quick Skill Validator

Validates skill structure without packaging.
"""

import sys
from pathlib import Path


def validate_skill(skill_path: Path) -> tuple[bool, str]:
    """Validate skill structure."""
    skill_path = Path(skill_path)

    # Check SKILL.md exists
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        return False, "SKILL.md not found"

    # Validate frontmatter
    content = skill_md.read_text()
    if not content.startswith("---"):
        return False, "SKILL.md missing YAML frontmatter"

    # Extract and validate frontmatter
    frontmatter_end = content.find("---", 3)
    if frontmatter_end == -1:
        return False, "Invalid YAML frontmatter format"

    frontmatter = content[3:frontmatter_end].strip()

    # Check required fields
    if "name:" not in frontmatter:
        return False, "Missing 'name:' in frontmatter"
    if "description:" not in frontmatter:
        return False, "Missing 'description:' in frontmatter"

    return True, "Skill structure valid"


def main():
    if len(sys.argv) < 2:
        print("Usage: quick_validate.py <skill-path>")
        sys.exit(1)

    skill_path = sys.argv[1]
    valid, message = validate_skill(skill_path)

    if valid:
        print(f"✅ {message}")
        sys.exit(0)
    else:
        print(f"❌ {message}")
        sys.exit(1)


if __name__ == "__main__":
    main()
