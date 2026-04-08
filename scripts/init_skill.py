#!/usr/bin/env python3
"""
Skill Initializer - Creates a new skill from template

Usage:
    init_skill.py <skill-name> --path <path>

Examples:
    init_skill.py my-new-skill --path skills/public
"""

import sys
from pathlib import Path


SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: Complete description of what this skill does and when to use it.]
---

# {skill_title}

## Overview

[TODO: Explain what this skill enables]

## Usage

[TODO: Add usage instructions]
"""

TITLE_TEMPLATE = """Convert hyphenated skill name to Title Case"""


def title_case_skill_name(skill_name):
    return ' '.join(word.capitalize() for word in skill_name.split('-'))


def init_skill(skill_name, path):
    skill_dir = Path(path).resolve() / skill_name

    if skill_dir.exists():
        print(f"❌ Error: Skill directory already exists: {skill_dir}")
        return None

    skill_dir.mkdir(parents=True, exist_ok=True)
    print(f"✅ Created skill directory: {skill_dir}")

    # Create SKILL.md
    skill_title = title_case_skill_name(skill_name)
    skill_content = SKILL_TEMPLATE.format(
        skill_name=skill_name,
        skill_title=skill_title
    )

    skill_md_path = skill_dir / 'SKILL.md'
    skill_md_path.write_text(skill_content)
    print("✅ Created SKILL.md")

    # Create directories
    for dir_name in ['scripts', 'references', 'assets']:
        (skill_dir / dir_name).mkdir(exist_ok=True)

    print(f"✅ Skill '{skill_name}' initialized at {skill_dir}")
    return skill_dir


def main():
    if len(sys.argv) < 4 or sys.argv[2] != '--path':
        print("Usage: init_skill.py <skill-name> --path <path>")
        sys.exit(1)

    skill_name = sys.argv[1]
    path = sys.argv[3]

    print(f"🚀 Initializing skill: {skill_name}")
    result = init_skill(skill_name, path)
    sys.exit(0 if result else 1)


if __name__ == "__main__":
    main()
