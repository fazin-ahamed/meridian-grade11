# Meridian Grade 11 Learning System Upgrade

## Goal

Make the Class 11 Physics, Chemistry, and Mathematics experience teachable for a beginner while still preserving the existing JEE Main, JEE Advanced, and CBSE depth.

## Product principles

1. Every chapter opens with a mental model, prerequisite bridge, and a short learning route before the full reference notes.
2. A diagram must encode a relationship and tell the learner what to inspect, not merely decorate a page.
3. A simulation must form a loop: predict → manipulate one variable → observe a linked representation → explain the pattern → transfer it to a new situation.
4. Chemistry must connect macroscopic observation, particle-level explanation, symbolic representation, and calculation.
5. Physics must connect situation, diagram, law, equation, units, and sanity check.
6. Mathematics must connect recognition of structure, method choice, algebraic execution, and verification.
7. CBSE coverage remains the floor; JEE extensions stay visible but are introduced after the foundation.
8. All interactions must work with keyboard and touch, and remain useful on a 390 px mobile viewport.

## Scope

- Guided chapter mode for existing chapter content.
- Subject-specific Grade 11 learning scaffolds for all 14 Physics, 9 core Chemistry, and 16 Mathematics chapters in the current catalog.
- Shared guided-inquiry layer for every existing interactive lab.
- New Chemistry virtual labs for the highest-load Grade 11 ideas.
- Diagram reader controls, figure explanations, and redraw/retrieval prompts.
- No authentication, server database, or paid provider dependency.

## Learning flow

The default theory view becomes:

1. Orientation: what the chapter is really about and what it connects to.
2. Bridge: the smallest prerequisite set needed to begin.
3. Topic route: each chapter heading is split into teachable topics when it contains multiple ideas; every topic has intuition, precision, method, example, misconception repair, and retrieval.
4. Representation lens: physics model / chemistry three-level view / mathematics problem-selection workflow.
5. Visual checkpoint: inspect a diagram or simulation before reading the compressed result.
6. Retrieval checkpoint: answer a short prompt before opening the full notes.
7. Full notes: retained as an explicit reference mode, not the default first exposure.

## Topic teaching contract

The guided route is not a summary view. It is a lesson sequence. A topic should answer, in this order:

1. What is the phenomenon or structure in ordinary language?
2. What is the precise definition, equation, or theorem?
3. What causes the relationship, and under which conditions does it hold?
4. How do I recognise this topic in a new question?
5. What is one worked example, with the decision at each step visible?
6. What tempting misconception should I repair?
7. Can I retrieve the idea without looking, then transfer it to a changed situation?

Long source notes remain available inside the topic as a collapsed derivation/exception panel and in the full reference section. This preserves depth without forcing a learner to process an entire page of prose before doing anything.

## Lab contract

Every lab surface receives:

- a learning goal;
- a prediction choice before exploration;
- a single-variable exploration prompt;
- live readouts and a linked visual representation;
- a plain-language explanation of the governing relationship;
- an observation note area;
- a transfer question or checkpoint.

The controls remain deterministic and local. No fake measurements or random results are used.

## Grade 11 subject spine

### Physics

Situation → diagram/vector/FBD → governing law → equation → units and limiting check. Priority visuals: graph area/slope, vectors, free-body diagrams, energy transfer, orbit geometry, stress–strain, flow narrowing, PV processes, molecular speed distribution, SHM phase, and standing-wave nodes.

### Chemistry

Macroscopic observation → particles and orbitals → symbolic equation/structure → quantitative consequence. Priority labs: mole-ratio particles, orbital/quantum transitions, periodic trends, VSEPR geometry, energy profile, equilibrium shift, redox electron bookkeeping, and hydrocarbon structure.

### Mathematics

What is given/asked → structure and constraints → method selection → algebra/proof → graph or numerical verification. Priority visuals: set regions, function transformations, unit-circle signs, Argand geometry, inequality number lines, counting trees, Pascal structure, sequence growth, conic focus/directrix, derivative as a secant limit, variance spread, and event trees.

## Acceptance checks

- A new learner can identify what to do first on a chapter page without scrolling through the whole notes pack.
- Every existing lab has a prediction and an interpretation step.
- At least eight Chemistry Grade 11 topics have a local interactive visual, and all other Grade 11 chapters have a guided visual/diagram path.
- Diagrams have readable labels, a caption that explains the relationship, and a redraw prompt.
- `npm run typecheck`, `npm run build`, dev smoke QA, built-output smoke QA, and interactive checks pass.
- Desktop and 390×844 mobile screenshots show no blank page, console errors, clipped primary content, or horizontal overflow.
