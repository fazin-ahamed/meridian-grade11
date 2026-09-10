import type { ChapterContent, ChapterMeta, TheoryBlock, WorkedProblem } from "../types";
import type { Grade11Guide } from "./grade11";

export type TopicEquation = {
  name: string;
  latex: string;
  meaning: string;
  conditions?: string;
};

export type TopicExample = {
  prompt: string;
  steps: string[];
  answer: string;
  insight: string;
};

export type TopicQuestion = {
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
};

export type TopicReference = {
  text: string;
  bullets?: string[];
  table?: TheoryBlock["table"];
  callout?: string;
};

export type TeachingTopic = {
  id: string;
  title: string;
  purpose: string;
  intuition: string;
  preciseIdea: string;
  mechanism?: string;
  keyPoints: string[];
  equations: TopicEquation[];
  method: string[];
  recognitionCue: string;
  visual?: { id: string; caption?: string };
  workedExample?: TopicExample;
  misconception: { tempting: string; repair: string };
  quickCheck: TopicQuestion;
  practice?: TopicQuestion;
  reference?: TopicReference;
  sourceBlockId?: string;
};

type TeachingContext = Pick<Grade11Guide, "bigIdea" | "checkpoint" | "commonMistake" | "representation">;

function splitSentences(text: string): string[] {
  return (text.replace(/\s+/g, " ").match(/[^.!?]+(?:[.!?]+|$)/g) ?? [])
    .map((item) => item.trim())
    .filter(Boolean);
}

function wordsFrom(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((word) => word.length > 3);
}

function scoreMatch(query: string, candidate: string): number {
  const candidateWords = new Set(wordsFrom(candidate));
  return wordsFrom(query).reduce((score, word) => score + (candidateWords.has(word) ? 1 : 0), 0);
}

function closestWorked(heading: string, worked: WorkedProblem[]): WorkedProblem | undefined {
  if (!worked.length) return undefined;
  return worked
    .map((item, index) => ({ item, index, score: scoreMatch(heading, item.prompt) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.item;
}

function closestQuiz(heading: string, content: ChapterContent, index: number): ChapterContent["quiz"][number] | undefined {
  if (!content.quiz.length) return undefined;
  return content.quiz
    .map((item, quizIndex) => ({ item, quizIndex, score: scoreMatch(heading, item.stem) }))
    .sort((a, b) => b.score - a.score || Math.abs(a.quizIndex - index) - Math.abs(b.quizIndex - index))[0]?.item;
}

function topicQuestionFromQuiz(quiz: ChapterContent["quiz"][number] | undefined, fallback: string): TopicQuestion {
  if (!quiz) {
    return {
      prompt: `Close the notes. In one sentence, what is the central idea of ${fallback}?`,
      answer: "State the quantity or structure, the condition under which it applies, and what it lets you predict.",
      explanation: "A complete answer names the idea, its conditions, and its use — not only a formula.",
    };
  }
  return {
    prompt: quiz.stem,
    options: quiz.options,
    answer: quiz.options[quiz.correct] ?? "the marked option",
    explanation: quiz.why,
  };
}

function exampleFromWorked(worked: WorkedProblem | undefined): TopicExample | undefined {
  if (!worked) return undefined;
  return {
    prompt: worked.prompt,
    steps: worked.steps,
    answer: worked.answer,
    insight: worked.insight,
  };
}

function equationsFor(block: TheoryBlock, content: ChapterContent): TopicEquation[] {
  const matches = content.formulas.filter((formula) => scoreMatch(block.heading, formula.name) > 0);
  return matches.slice(0, 3).map((formula) => ({
    name: formula.name,
    latex: formula.latex,
    meaning: formula.note ?? `Use ${formula.name.toLowerCase()} to connect the quantities in this topic.`,
  }));
}

function genericMethod(subject: ChapterMeta["subject"], heading: string): string[] {
  if (subject === "physics") {
    return [
      "Draw the situation and choose a sign convention before touching the algebra.",
      `Name the quantity that ${heading.toLowerCase()} is describing and write its definition.`,
      "Write the law, substitute with units, then check the sign and a limiting case.",
    ];
  }
  if (subject === "chemistry") {
    return [
      "Start with the observable: what changed in the sample, spectrum, graph, or flask?",
      "Translate that observation to particles, orbitals, electron flow, or collisions.",
      "Write the symbolic relation and its conditions before calculating.",
      "Check atoms/charge, units, direction of change, and whether the result is chemically plausible.",
    ];
  }
  return [
    "List the givens, the unknown, and every domain or sign restriction.",
    `Name the structure or theorem that controls ${heading.toLowerCase()}.`,
    "Work one reversible line at a time and keep the geometric/algebraic meaning visible.",
    "Verify by substitution, an endpoint, a graph, or a second representation.",
  ];
}

function splitHeadingPieces(heading: string): string[] {
  const pieces = heading
    .replace(/\s+and\s+/gi, ", ")
    .split(/,\s*|;\s*/)
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 1);
  return pieces.length >= 3 && pieces.every((piece) => piece.length < 48) ? pieces : [heading];
}

function focusedBlock(block: TheoryBlock, title: string, pieceIndex: number): TheoryBlock {
  const sentences = splitSentences(block.body);
  const focusedSentences = sentences.filter((sentence) => scoreMatch(title, sentence) > 0);
  const focusedBullets = (block.bullets ?? []).filter((bullet) => scoreMatch(title, bullet) > 0);
  return {
    ...block,
    id: `${block.id}-${pieceIndex}`,
    heading: title,
    body: focusedSentences.slice(0, 3).join(" ") || sentences.slice(pieceIndex, pieceIndex + 2).join(" ") || block.body,
    bullets: (focusedBullets.length ? focusedBullets : block.bullets)?.slice(0, 4),
    diagram: pieceIndex === 0 ? block.diagram : undefined,
  };
}

function scaffoldTopic(
  meta: ChapterMeta,
  content: ChapterContent,
  guide: TeachingContext,
  block: TheoryBlock,
  index: number,
): TeachingTopic {
  const sentences = splitSentences(block.body);
  const intuition = sentences[0] ?? guide.bigIdea;
  const preciseIdea = sentences.slice(1, 4).join(" ") || block.body || guide.bigIdea;
  const quiz = closestQuiz(block.heading, content, index);
  const worked = exampleFromWorked(closestWorked(block.heading, content.worked));
  const callout = block.callout?.text;
  const fallbackMistake = guide.commonMistake;
  const isTrap = block.callout?.kind === "trap";
  const keyPoints = (block.bullets ?? []).slice(0, 4);
  const objective = meta.objectives[index % Math.max(meta.objectives.length, 1)] ?? meta.summary;
  const mechanism = keyPoints.length
    ? keyPoints.slice(0, 2).join(" ")
    : guide.representation;

  return {
    id: `topic-${meta.id}-${block.id}`,
    title: block.heading,
    purpose: `This topic helps you ${objective.charAt(0).toLowerCase()}${objective.slice(1)}.`,
    intuition,
    preciseIdea,
    mechanism,
    keyPoints,
    equations: equationsFor(block, content),
    method: genericMethod(meta.subject, block.heading),
    recognitionCue: `When a question gives you ${block.heading.toLowerCase()} or asks you to explain its trend, start with the definition before selecting a formula.`,
    visual: block.diagram ? { id: block.diagram } : undefined,
    workedExample: worked,
    misconception: {
      tempting: isTrap ? "The tempting shortcut is to use the familiar rule without checking the condition." : "The tempting shortcut is to remember the label but skip what the symbols or graph mean.",
      repair: callout ?? fallbackMistake,
    },
    quickCheck: topicQuestionFromQuiz(quiz, block.heading),
    practice: worked
      ? {
          prompt: `Change one given in the worked example for ${block.heading.toLowerCase()}. What should happen before you calculate?`,
          answer: "Predict the direction first, then recompute and compare the change with the defining relationship.",
          explanation: "Changing one input and predicting the direction is the fastest way to check whether the model is alive in your head.",
        }
      : undefined,
    reference: {
      text: block.body,
      bullets: block.bullets,
      table: block.table,
      callout: block.callout?.text,
    },
    sourceBlockId: block.id,
  };
}

function topic(
  id: string,
  title: string,
  purpose: string,
  intuition: string,
  preciseIdea: string,
  mechanism: string,
  equations: TopicEquation[],
  method: string[],
  recognitionCue: string,
  misconception: TeachingTopic["misconception"],
  quickCheck: TopicQuestion,
  extra: Partial<Pick<TeachingTopic, "keyPoints" | "visual" | "workedExample" | "practice" | "reference">> = {},
): TeachingTopic {
  return {
    id,
    title,
    purpose,
    intuition,
    preciseIdea,
    mechanism,
    keyPoints: extra.keyPoints ?? [],
    equations,
    method,
    recognitionCue,
    misconception,
    quickCheck,
    ...extra,
  };
}

const PHYSICS_SOLIDS_TOPICS: TeachingTopic[] = [
  topic(
    "phy-solids-elasticity",
    "Elastic versus plastic deformation",
    "separate the reversible model from permanent change before you write any modulus",
    "A loaded wire changes length because its particles move slightly away from their equilibrium spacing. Remove a small enough load and the interatomic restoring forces bring the wire back; push past the material’s elastic limit and some of the rearrangement remains.",
    "Elasticity is the ability to recover the original configuration after the deforming force is removed. Plastic deformation leaves a permanent set. These are material behaviours, not synonyms for ‘hard’ or ‘strong’.",
    "The external load changes particle spacing; internal restoring forces oppose that change. In the early region the restoring response is reversible and approximately linear.",
    [],
    ["Describe the original shape and the applied load.", "Ask whether the specimen returns completely when the load is removed.", "Only then decide whether Hooke’s law and an elastic modulus apply."],
    "Use this distinction whenever a question mentions unloading, permanent set, yield, or recovery.",
    { tempting: "A material that stretches a lot is ‘more elastic’.", repair: "Elastic means recovery. A large Young’s modulus means a material produces less strain for the same stress; steel is more elastic than rubber in that precise sense." },
    { prompt: "What begins when a specimen is loaded beyond its elastic limit?", options: ["Only elastic recovery", "Permanent plastic deformation", "Zero stress", "A change in mass"], answer: "Permanent plastic deformation", explanation: "After the elastic limit, unloading does not return the body completely to its original configuration." },
    { keyPoints: ["Quartz and phosphor bronze are close to ideal elastic examples; putty and wax show plastic behaviour.", "No real material is perfectly elastic or perfectly plastic."] },
  ),
  topic(
    "phy-solids-stress",
    "Stress: internal force per area",
    "turn an applied force into the local intensity that the material actually experiences",
    "Two wires can carry the same pull but feel very different loads internally if one is thinner. The narrow wire concentrates the same force over less area.",
    "Stress is the internal restoring force per unit area. Normal stress is perpendicular to the area, while tangential or shear stress is parallel. Its SI unit is pascal, the same unit as pressure.",
    "For a uniform wire in static equilibrium, the restoring force balances the external load, so normal stress is $\\sigma=F/A$. The geometry of the cross-section matters immediately.",
    [{ name: "Normal stress", latex: "\\sigma = \\dfrac{F}{A}", meaning: "Force perpendicular to the cross-section divided by the area carrying it.", conditions: "Uniform load and a cross-section away from complicated end effects." }, { name: "Shear stress", latex: "\\tau = \\dfrac{F_{\\parallel}}{A}", meaning: "The tangential force intensity that tries to slide layers past one another." }],
    ["Draw the area on which the internal force acts.", "Choose normal or tangential force; do not use the total force automatically.", "Check that the final unit is N m⁻² (Pa)."],
    "Use stress when a question changes force, thickness, diameter, or cross-sectional area.",
    { tempting: "A larger force always means a larger material stress, even if the area also changes.", repair: "Stress is force divided by area. Doubling both force and area leaves stress unchanged." },
    { prompt: "If the same force acts on half the cross-sectional area, stress becomes", options: ["half", "unchanged", "double", "zero"], answer: "double", explanation: "$\\sigma=F/A$, so halving A doubles the stress." },
    { keyPoints: ["Tensile and compressive stress are normal stress; shear stress changes shape.", "Stress has dimensions $[ML^{-1}T^{-2}]$ and is not itself a deformation."] },
  ),
  topic(
    "phy-solids-strain",
    "Strain: fractional deformation",
    "measure deformation without confusing a long specimen with a short one",
    "An extension of 1 mm is a big change for a 10 mm wire but a tiny change for a 10 m cable. Strain compares the change with the original size, so it is a ratio rather than a raw length.",
    "Longitudinal strain is $\\varepsilon=\\Delta L/L$. Volume strain is $\\Delta V/V$. Shear strain is approximately the small shear angle $\\phi\\simeq\\Delta x/L$. Strain has no unit because equal units cancel.",
    "Strain tells how much the shape changed; stress tells what load intensity caused it. Keeping those roles separate prevents the most common modulus errors.",
    [{ name: "Longitudinal strain", latex: "\\varepsilon = \\dfrac{\\Delta L}{L}", meaning: "Fractional change in length.", conditions: "Small deformation; original length L is the reference." }, { name: "Volume strain", latex: "\\dfrac{\\Delta V}{V}", meaning: "Fractional change in volume." }],
    ["Write the original dimension under the change, not the final dimension.", "Use a signed change when direction matters; use magnitude for a size-only question.", "State that strain is dimensionless before moving on."],
    "Use strain whenever the question compares deformation of objects with different original lengths or sizes.",
    { tempting: "Strain is measured in metres because it contains a change in length.", repair: "Strain is a ratio such as ΔL/L, so it is dimensionless. A percentage is only a convenient way of displaying the ratio." },
    { prompt: "A 2 m wire extends by 1 mm. Its longitudinal strain is", options: ["5×10⁻⁴", "2×10³", "2 m", "0.5"], answer: "5×10⁻⁴", explanation: "$\\varepsilon=10^{-3}/2=5\\times10^{-4}$; the units cancel." },
    { keyPoints: ["The same absolute extension does not imply the same strain.", "Shear strain uses an angle in radians or the equivalent small ratio Δx/L."] },
  ),
  topic(
    "phy-solids-hooke",
    "Hooke’s law and the proportional limit",
    "know exactly where a modulus is a constant and where it stops being one",
    "At small loads, doubling the stress doubles the strain: the material behaves like a spring. That straight-line behaviour does not continue forever.",
    "Within the proportional limit, stress is proportional to strain: $\\mathrm{stress}=E\\times\\mathrm{strain}$. The relevant constant is the modulus for that mode of deformation. Past the proportional region, the ratio need not remain constant even if the body may still recover for a while.",
    "The slope of the initial straight part of a stress–strain graph is the elastic modulus. This is why a graph can tell both the law and the boundary of its use.",
    [{ name: "Hooke’s law", latex: "\\sigma = Y\\varepsilon", meaning: "Normal stress is proportional to longitudinal strain in the linear region.", conditions: "Only up to the proportional limit." }],
    ["Mark the linear region before using stress/strain as a constant.", "Name the relevant modulus: Y, B, or G.", "If the graph bends, stop calling the slope a single constant."],
    "Use Hooke’s law for small elastic deformations, spring-like wires, and the initial slope of a stress–strain curve.",
    { tempting: "Hooke’s law is valid all the way to breaking because the material is still under tension.", repair: "The law is a local linear approximation. Yielding, necking, hysteresis, or a nonlinear rubber response break the simple proportionality." },
    { prompt: "On a stress–strain graph, the proportional limit is the point where", options: ["the sample breaks", "stress first stops being proportional to strain", "strain becomes zero", "area becomes zero"], answer: "stress first stops being proportional to strain", explanation: "The initial straight line is the proportional region; after its end, the ratio stress/strain is no longer constant." },
    { keyPoints: ["A dimensionally correct equation can still be outside its physical conditions.", "The elastic limit may lie beyond the proportional limit: recovery can remain possible after linearity ends."] },
  ),
  topic(
    "phy-solids-curve",
    "Reading the stress–strain curve",
    "turn a graph into a story about stiffness, strength, ductility, and energy",
    "The curve is a timeline for a specimen: it starts with reversible stretching, may flow while the load barely changes, reaches a maximum engineering stress, and finally fractures.",
    "The proportional region is linear. The elastic limit is the last point of complete recovery. Yield marks appreciable plastic deformation, ultimate strength is the maximum engineering stress, and fracture is the break. The slope near the origin measures Young’s modulus; area under the curve is energy per unit volume.",
    "A steep slope means stiff, not automatically strong. A large plastic region means ductile. A high ultimate stress means strong. These are different readings of the same graph.",
    [{ name: "Elastic energy density", latex: "u = \\int_0^{\\varepsilon} \\sigma\\,d\\varepsilon", meaning: "Area under a stress–strain curve up to the chosen strain.", conditions: "For the recoverable region, it is stored elastic energy density." }],
    ["Read the axes and units first.", "Use slope for stiffness and height for stress level/strength.", "Use area for energy density and the unloading path for recovery/hysteresis."],
    "Use this graph whenever the prompt compares steel, brass, rubber, ductility, toughness, yield, or breaking.",
    { tempting: "The material with the highest breaking stress is always the most elastic.", repair: "Elasticity is about recovery and stiffness; the initial slope (Y) answers that. Breaking stress answers strength." },
    { prompt: "The area under a stress–strain curve up to a strain represents", options: ["Young’s modulus", "force", "energy density", "mass density"], answer: "energy density", explanation: "Stress × strain has units of energy per volume, and integration adds the area under the curve." },
    { visual: { id: "stress-strain", caption: "Read the curve in three ways: slope, height, and area." }, keyPoints: ["Rubber can be less stiff than steel yet useful for shock absorption because it can deform substantially.", "A brittle material fractures with little plastic strain; a ductile metal shows a wide plastic region."] },
  ),
  topic(
    "phy-solids-young",
    "Young’s modulus: stretching or compressing a wire",
    "solve the standard wire problem without mixing up material and geometry",
    "Young’s modulus answers: how much longitudinal strain does this material produce for a given tensile or compressive stress? A long, thin wire stretches more even when the material is unchanged.",
    "Young’s modulus is stress divided by longitudinal strain: $Y=(F/A)/(\\Delta L/L)=FL/(A\\Delta L)$. It is a material property in the small elastic, uniform region, while $\\Delta L$ also depends on length and area.",
    "Rearranging gives $\\Delta L=FL/(AY)$. The load and length increase extension; area and Young’s modulus reduce it. This separation is the main modelling move.",
    [{ name: "Young’s modulus", latex: "Y = \\dfrac{F/A}{\\Delta L/L}=\\dfrac{FL}{A\\Delta L}", meaning: "Stiffness against longitudinal strain.", conditions: "Uniform specimen, small elastic deformation, and a load represented by F." }],
    ["Convert area to m² before substituting.", "Write stress and strain separately once, then combine them.", "Check: doubling L should double ΔL; doubling A or Y should halve it."],
    "Use Young’s modulus for wires, rods, Searle’s apparatus, thermal stress, and series/parallel extension problems.",
    { tempting: "A higher Young’s modulus means the object is easier to stretch because it stores more energy.", repair: "Higher Y means less strain for the same stress — the material is stiffer. Stored energy also depends on the applied strain and volume." },
    { prompt: "For the same F, L, A, which wire extends more?", options: ["A shorter wire", "A wire with larger Y", "A longer wire", "A thicker wire"], answer: "A longer wire", explanation: "$\\Delta L=FL/(AY)$, so extension is proportional to L and inversely proportional to A and Y." },
    { workedExample: { prompt: "A steel wire of length 2 m, area 2 mm², Y = 2×10¹¹ Pa, is stretched by a 20 N load. Find ΔL.", steps: ["Convert area: A = 2×10⁻⁶ m².", "$\\Delta L=FL/(AY)=20×2/(2×10^{-6}×2×10^{11})$.", "$\\Delta L=1.0×10^{-4}$ m = 0.10 mm."], answer: "ΔL = 0.10 mm.", insight: "The area conversion carries a 10⁻⁶ factor; check it before blaming the formula." } },
  ),
  topic(
    "phy-solids-bulk",
    "Bulk modulus and compressibility",
    "model uniform pressure and volume change in solids, liquids, and gases",
    "Squeeze a sponge and its shape and volume both change; squeeze water in a sealed syringe and the volume changes very little. Bulk modulus describes resistance to a volume change, not to a change in length alone.",
    "Bulk modulus is $B=-\\Delta P/(\\Delta V/V)$. The minus sign makes B positive because pressure increase usually produces negative volume change. Compressibility is the reciprocal: $K=1/B$.",
    "Bulk loading is an all-direction pressure. Liquids and gases can have a bulk modulus even though they cannot sustain a static shear stress; an ideal liquid has essentially zero shear modulus.",
    [{ name: "Bulk modulus", latex: "B=-\\dfrac{\\Delta P}{\\Delta V/V}", meaning: "Resistance to fractional volume compression.", conditions: "Small uniform changes; use the stated thermodynamic condition for gases." }, { name: "Compressibility", latex: "K=\\dfrac{1}{B}", meaning: "Fractional volume change per unit pressure, with units Pa⁻¹." }],
    ["Identify pressure change and volume strain.", "Keep the sign convention so compression gives B>0.", "For a gas, check whether the process is isothermal or adiabatic."],
    "Use B for pressure–volume changes, sound in fluids, hydraulics, and comparisons of compressibility.",
    { tempting: "A liquid cannot have an elastic modulus because it cannot sustain shear.", repair: "Liquids resist volume compression, so they have a bulk modulus. They do not have a non-zero static shear modulus." },
    { prompt: "Compressibility is related to bulk modulus by", options: ["K=B", "K=1/B", "K=B²", "K=B/2"], answer: "K=1/B", explanation: "Compressibility is the reciprocal of bulk modulus." },
    { keyPoints: ["For an ideal gas, isothermal bulk modulus is P; adiabatic bulk modulus is γP.", "Large B means small volume strain for the same pressure change."] },
  ),
  topic(
    "phy-solids-shear",
    "Shear modulus and rigidity",
    "describe shape change without accidentally treating it as a volume change",
    "Push the top face of a block sideways while holding the bottom fixed. The block becomes a slanted parallelogram: the angle changes, while the volume is approximately unchanged.",
    "Shear modulus or modulus of rigidity is $G=\\tau/\\phi$, where $\\tau=F_{\\parallel}/A$ and $\\phi\\simeq\\Delta x/L$ for a small angle in radians. It measures resistance to shape change.",
    "The relevant force is parallel to the area. That is why shear problems use the sideways displacement and the original height, not a longitudinal extension formula.",
    [{ name: "Shear modulus", latex: "G=\\dfrac{F_{\\parallel}/A}{\\phi}", meaning: "Resistance to tangential deformation.", conditions: "Small shear angle; solids in static equilibrium." }],
    ["Draw the face, the parallel force, and the sideways displacement.", "Use radians for a small shear angle.", "Check that the result has units of Pa, even though φ is dimensionless."],
    "Use G for torsion/rigidity language, shear blocks, and questions distinguishing shape from volume change.",
    { tempting: "Shear stress is pressure because both are F/A, so they produce the same deformation.", repair: "The direction of F relative to the area matters. Normal stress changes length/volume; tangential stress changes shape." },
    { prompt: "A pure shear deformation primarily changes", options: ["mass", "shape", "chemical composition", "number of particles"], answer: "shape", explanation: "Shear slides layers; the defining deformation is a change in angle or shape." },
    { keyPoints: ["Young’s modulus and shear modulus are for solids because a static solid can resist shape distortion.", "For isotropic solids, Y, G, B, and Poisson’s ratio are related, not independent."], visual: { id: "young-moduli", caption: "Match the loading mode to the modulus before using a formula." } },
  ),
  topic(
    "phy-solids-poisson",
    "Poisson’s ratio and volume strain",
    "connect longitudinal stretching to the sideways response of the same specimen",
    "Pull a rubber band: it gets longer and thinner. The sideways contraction is not a separate accident; it is part of how the material redistributes its volume.",
    "Poisson’s ratio is the negative ratio of lateral strain to longitudinal strain: $\\nu=-\\varepsilon_{\\mathrm{lat}}/\\varepsilon_{\\mathrm{long}}$. For a stretched wire, $\\Delta V/V=\\varepsilon(1-2\\nu)$. If ν=1/2, the volume is unchanged.",
    "The negative sign handles the usual opposite directions: longitudinal extension is positive while lateral contraction is negative. The same relation exposes why rubber is nearly incompressible even though it is easy to stretch.",
    [{ name: "Poisson’s ratio", latex: "\\nu=-\\dfrac{\\Delta r/r}{\\Delta L/L}", meaning: "Sideways strain relative to longitudinal strain.", conditions: "Small, isotropic deformation; sign convention included." }, { name: "Volume strain", latex: "\\dfrac{\\Delta V}{V}=\\varepsilon(1-2\\nu)", meaning: "Approximate volume response of a stretched cylindrical wire." }],
    ["Write the longitudinal strain first.", "Give lateral contraction its negative sign before applying ν.", "Use ν=1/2 as the incompressible limiting case."],
    "Use Poisson’s ratio when diameter/radius changes, volume strain, incompressibility, or relations among elastic constants appear.",
    { tempting: "Poisson’s ratio must have units because it compares two different lengths.", repair: "It is a ratio of two dimensionless strains, so ν is dimensionless." },
    { prompt: "For an incompressible isotropic material, Poisson’s ratio is", options: ["0", "0.25", "0.5", "1"], answer: "0.5", explanation: "Set ΔV/V=ε(1−2ν)=0; the non-zero strain case gives ν=1/2." },
    { keyPoints: ["Typical metals have ν around 0.2–0.4; rubber is close to 0.5.", "The relation $Y=2G(1+ν)=3B(1-2ν)$ is a link between moduli for isotropic materials."], visual: { id: "young-moduli", caption: "Longitudinal, volume, and shear responses are coupled through material constants." } },
  ),
  topic(
    "phy-solids-energy",
    "Elastic energy and energy density",
    "understand why the factor 1/2 appears and what the graph area means",
    "A wire does not jump from zero force to its final force. As it stretches, the force grows from zero, so the work stored is the area of a triangle rather than the area of a rectangle.",
    "For a linearly stretched wire, $U=\\tfrac12F\\Delta L$. Dividing by volume gives elastic energy density $u=\\tfrac12\\sigma\\varepsilon=\\sigma^2/(2Y)=Y\\varepsilon^2/2$.",
    "The work done is the integral of force over extension. In a stress–strain graph, the same idea becomes the area under the curve per unit volume.",
    [{ name: "Elastic energy", latex: "U=\\tfrac12F\\Delta L", meaning: "Energy stored in a linearly stretched specimen.", conditions: "Force rises linearly from zero to F." }, { name: "Energy density", latex: "u=\\tfrac12\\sigma\\varepsilon=\\dfrac{\\sigma^2}{2Y}", meaning: "Elastic energy stored per unit volume." }],
    ["Ask whether the force grows from zero or is already constant.", "Use 1/2 for a linear ramp; use an integral for a non-linear curve.", "Check units: energy density must be J m⁻³, which equals Pa."],
    "Use this topic for work stored in a wire, stress–strain area, toughness, and load–extension graphs.",
    { tempting: "Elastic energy is FΔL because force and extension are the final values.", repair: "FΔL is the rectangle for a constant force. A spring-like load grows from zero, so the average force is F/2 and U=½FΔL." },
    { prompt: "The elastic energy density in terms of stress σ and Young’s modulus Y is", options: ["σ/Y", "σ²/Y", "σ²/(2Y)", "2σ/Y"], answer: "σ²/(2Y)", explanation: "$u=½σε$ and ε=σ/Y, so $u=σ²/(2Y)$." },
    { workedExample: { prompt: "A wire reaches a final force of 20 N after extending by 0.10 mm in the elastic region. Find the stored energy.", steps: ["The force rises linearly from zero, so average force is F/2 = 10 N.", "$U=(F/2)\\Delta L=10×1.0×10^{-4}$ J."], answer: "U = 1.0×10⁻³ J.", insight: "The same 1/2 appears whether you use the force–extension triangle or ½FΔL." } },
  ),
  topic(
    "phy-solids-combinations",
    "Wires in series, parallel, and fixed supports",
    "choose the shared quantity before combining extensions or forces",
    "Two wires in series carry the same pull one after another, so their extensions add. Two wires in parallel stretch by the same amount side by side, so their forces add.",
    "For a wire $k=AY/L$. Series: same F and $\\Delta L$ add. Parallel: same $\\Delta L$ and F add. A fixed rod heated by $\\Delta T$ cannot expand freely, so the thermal stress is $Y\\alpha\\Delta T$ in compression.",
    "Treat the wire as a spring only after deriving its stiffness from geometry and Young’s modulus. The arrangement controls what is common and what is additive.",
    [{ name: "Wire stiffness", latex: "k=\\dfrac{AY}{L}", meaning: "Force per extension for a uniform elastic wire." }, { name: "Thermal stress", latex: "\\sigma=Y\\alpha\\Delta T", meaning: "Stress produced when thermal expansion is fully prevented.", conditions: "Uniform temperature change and rigid end supports." }],
    ["Draw the arrangement and mark the quantity shared by each branch.", "Series: same force. Parallel: same extension.", "For fixed ends, write total strain = thermal strain + elastic strain = 0."],
    "Use this topic when a problem has multiple wires, composite bars, rods in supports, or temperature changes with no room to expand.",
    { tempting: "In series, wires share the extension equally; in parallel, they share the force equally.", repair: "Series shares force and adds extension. Parallel shares extension and adds force; unequal stiffness means unequal force sharing." },
    { prompt: "Two wires in series carry the same", options: ["extension", "force", "stress", "area"], answer: "force", explanation: "With no side branch between them, the transmitted force is the same; total extension is the sum." },
    { keyPoints: ["Breaking force scales with area; elongation scales with L/A for the same material and load.", "A fixed heated rod is compressed because its free thermal expansion is prevented."], practice: { prompt: "If the radius of a wire doubles while F, L, and Y stay fixed, how should ΔL change?", answer: "It becomes one quarter because A∝r².", explanation: "The area grows by four, and ΔL=FL/(AY)." } },
  ),
  topic(
    "phy-solids-choose",
    "Choosing the right modulus and checking your answer",
    "turn a word problem into the correct physical model instead of formula hunting",
    "The same force can stretch, squeeze, slide, or compress a body. The deformation tells you which modulus belongs in the model.",
    "Young’s modulus pairs normal stress with longitudinal strain; bulk modulus pairs pressure with volume strain; shear modulus pairs tangential stress with angular strain. All elastic moduli have the dimensions and units of pressure, but they are not interchangeable.",
    "A good solution names the deformation first, writes the matching definition, states the linear/small-deformation condition, then checks geometry, units, sign, and limiting behaviour.",
    [],
    ["Underline the deformation word: length, volume, angle, diameter, or energy.", "Select the stress and strain that describe that deformation.", "Run one sanity check: thinner/longer/softer should change the result in the expected direction."],
    "Use this as the first move in mixed-modulus questions and in lab interpretation.",
    { tempting: "All elastic moduli are just ‘force divided by displacement’, so any one formula will do.", repair: "The geometry and loading mode define the denominator. Start with the physical deformation, not the symbol you remember." },
    { prompt: "A question asks how a uniform pressure changes the volume of a fluid. Which modulus is the natural starting point?", options: ["Young’s modulus", "Bulk modulus", "Shear modulus", "Poisson’s ratio"], answer: "Bulk modulus", explanation: "Uniform pressure causes volume strain, so B connects pressure change to fractional volume change." },
    { visual: { id: "young-moduli", caption: "Use the deformation mode as the key to the formula." }, keyPoints: ["All three moduli are measured in Pa; strain and Poisson’s ratio are dimensionless.", "If the result grows when area grows in a simple wire-extension problem, revisit the geometry — it should usually shrink."] },
  ),
];

const TOPIC_BANK: Record<string, TeachingTopic[]> = {
  "phy-solids": PHYSICS_SOLIDS_TOPICS,
};

function fallbackBlocks(meta: ChapterMeta, content: ChapterContent): TheoryBlock[] {
  const notes = content.classNotes?.length ? content.classNotes : content.theory;
  if (notes.length) return notes;
  return [{ id: "start", heading: `The central question in ${meta.title}`, body: meta.summary, bullets: meta.objectives }];
}

export function teachingTopicsFor(meta: ChapterMeta, content: ChapterContent, guide: TeachingContext): TeachingTopic[] {
  const explicit = TOPIC_BANK[meta.id];
  if (explicit) return explicit;
  return fallbackBlocks(meta, content).flatMap((block, blockIndex) => {
    const pieces = splitHeadingPieces(block.heading);
    return pieces.map((piece, pieceIndex) => scaffoldTopic(meta, content, guide, focusedBlock(block, piece, pieceIndex), blockIndex + pieceIndex));
  });
}

export function teachingTopicCount(meta: ChapterMeta, content: ChapterContent, guide: TeachingContext): number {
  return teachingTopicsFor(meta, content, guide).length;
}
