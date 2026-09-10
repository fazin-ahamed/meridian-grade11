from pathlib import Path

PHYSICS_TS = Path("/workspace/src/data/content/physics.ts")


def append_chapter(addition: str) -> None:
    stripped = PHYSICS_TS.read_text().rstrip()
    if not stripped.endswith("};"):
        raise SystemExit("file does not end with };")
    core = stripped[:-2].rstrip()
    if core.endswith(","):
        core = core[:-1].rstrip()
    if not core.endswith("}"):
        raise SystemExit("unexpected ending: " + repr(core[-40:]))
    addition = addition.strip()
    if addition.endswith(","):
        addition = addition[:-1].rstrip()
    PHYSICS_TS.write_text(core + ",\n\n" + addition + ",\n};\n")
    print("lines", len(PHYSICS_TS.read_text().splitlines()))
