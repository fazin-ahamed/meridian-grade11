import type { ChapterMeta, SubjectId } from "../types";

export type LearningLens = {
  title: string;
  steps: string[];
  instruction: string;
};

export type Grade11Guide = {
  bigIdea: string;
  bridge: string;
  sequence: string[];
  representation: string;
  labMission: string;
  checkpoint: string;
  commonMistake: string;
  lens: LearningLens;
};

const LENSES: Record<SubjectId, LearningLens> = {
  physics: {
    title: "Physics model",
    steps: ["Situation", "Diagram / vector", "Law", "Equation", "Units + check"],
    instruction: "Translate the words into a picture before choosing an equation.",
  },
  chemistry: {
    title: "Chemistry three-level view",
    steps: ["What you see", "Particles / orbitals", "Symbolic form", "Calculation"],
    instruction: "Move from the observable pattern to particles, then write the symbolic rule.",
  },
  maths: {
    title: "Mathematics decision path",
    steps: ["What is given?", "Structure", "Method", "Algebra / proof", "Verify"],
    instruction: "Name the structure and restrictions before you start manipulating symbols.",
  },
};

const OVERRIDES: Record<string, Partial<Grade11Guide>> = {
  // Physics XI
  "phy-units": {
    bigIdea: "A measurement is a number plus a unit and an uncertainty. Dimensions let you audit the physics before doing arithmetic.",
    bridge: "Be comfortable with powers of ten, ratios, and reading a scale.",
    labMission: "Change the vernier reading and decide which part is a scale reading, which part is a correction, and which part is uncertainty.",
    checkpoint: "Why can dimensions reject a formula but never prove that the numerical constant is correct?",
    commonMistake: "Treating zero error as a magnitude only; its sign changes the corrected reading.",
  },
  "phy-motion-1d": {
    bigIdea: "Motion is a chain: position changes into velocity, and velocity changes into acceleration. Graph slope and area are the same story in different views.",
    bridge: "Refresh signed numbers, slope of a line, and the meaning of a coordinate axis.",
    labMission: "Make velocity cross zero. Observe why displacement and distance stop being the same quantity.",
    checkpoint: "On a v–t graph, what do slope and signed area mean, and what changes when v becomes negative?",
    commonMistake: "Confusing distance with displacement when the object reverses direction.",
  },
  "phy-motion-2d": {
    bigIdea: "Two-dimensional motion becomes manageable when perpendicular components are treated as independent one-dimensional motions.",
    bridge: "Know sine, cosine, radians, and how to add components on perpendicular axes.",
    labMission: "Keep speed fixed and compare complementary launch angles. Explain why the ranges match but the heights do not.",
    checkpoint: "Which quantity is constant in ideal projectile motion: speed, horizontal velocity, or vertical velocity?",
    commonMistake: "Using the total speed where only a horizontal or vertical component belongs.",
  },
  "phy-nlm": {
    bigIdea: "Newton’s laws are a bookkeeping system for interactions: isolate the body, draw every external force, then sum components.",
    bridge: "Be able to resolve vectors and read a free-body diagram.",
    labMission: "Increase the incline angle until friction can no longer hold the block. Identify the threshold condition.",
    checkpoint: "Why is normal force not automatically equal to mg on an incline or in an accelerating lift?",
    commonMistake: "Pairing action and reaction forces on the same free-body diagram; they act on different bodies.",
  },
  "phy-wep": {
    bigIdea: "Work is energy transferred by a force along displacement; the work–energy theorem avoids tracking time when only speeds matter.",
    bridge: "Understand dot products, signed area, and conservation statements.",
    labMission: "Change the coefficient of restitution and watch momentum stay fixed while kinetic energy changes.",
    checkpoint: "When is the work done by a force negative, and what does that say about the object’s energy?",
    commonMistake: "Assuming momentum and kinetic energy are both conserved in every collision.",
  },
  "phy-rotation": {
    bigIdea: "Rotation is linear motion with a different geometry: torque changes angular velocity, and moment of inertia measures rotational resistance.",
    bridge: "Know centre of mass, perpendicular distance, and the linear analogues v = ωr and F = ma.",
    labMission: "Compare rolling bodies with different mass distributions. Predict which reaches the bottom first before pressing play.",
    checkpoint: "Why can a static friction force be non-zero while doing no work in ideal rolling?",
    commonMistake: "Using the wrong axis for moment of inertia or treating rolling as pure translation.",
  },
  "phy-gravitation": {
    bigIdea: "Gravity is an inverse-square central force, so orbit speed, period, energy, and Kepler’s laws are connected rather than separate formulas.",
    bridge: "Review circular motion, energy, and proportional reasoning.",
    labMission: "Increase orbital radius and check which of g, orbital speed, and period grow or fall.",
    checkpoint: "Why does a higher circular orbit have lower speed but greater mechanical energy?",
    commonMistake: "Calling centripetal force a new force instead of identifying the actual inward interaction.",
  },
  "phy-solids": {
    bigIdea: "Stress is the cause per area; strain is the fractional deformation. The slope and area of the stress–strain curve carry physical meaning.",
    bridge: "Be comfortable with ratios, slopes, and area under a graph.",
    labMission: "Change the material response and identify where proportionality ends, yielding begins, and fracture occurs.",
    checkpoint: "Which quantity has the same dimensions as pressure, and why is strain dimensionless?",
    commonMistake: "Confusing a large force with a large stress without checking area.",
  },
  "phy-fluids": {
    bigIdea: "Fluid problems are conservation problems: mass flow fixes speed, and energy conservation links speed, pressure, and height.",
    bridge: "Review density, pressure, energy per unit volume, and continuity.",
    labMission: "Narrow a pipe while holding inlet flow fixed. Predict the speed and pressure changes before exploring.",
    checkpoint: "Why does pressure fall in a fast, horizontal Venturi throat in the ideal model?",
    commonMistake: "Applying Bernoulli between points on a real turbulent or viscous flow without checking assumptions.",
  },
  "phy-thermal": {
    bigIdea: "Temperature, heat, phase change, and thermal energy are different ideas linked by energy accounting.",
    bridge: "Know proportionality, units, and the meaning of specific heat and latent heat.",
    labMission: "Add heat through a phase change and notice why temperature can stay constant while energy enters.",
    checkpoint: "During melting, where does the supplied energy go if temperature is unchanged?",
    commonMistake: "Using Q = mcΔT across a phase change without adding latent heat.",
  },
  "phy-thermo": {
    bigIdea: "The first law tracks energy; the second law constrains direction. A PV diagram turns a process into geometry.",
    bridge: "Be fluent with area, signs, and state variables P, V, T.",
    labMission: "Compare isothermal and adiabatic paths from the same state and inspect the work area between them.",
    checkpoint: "With the JEE sign convention, how do Q, W, and ΔU relate for work done by the gas?",
    commonMistake: "Treating heat and work as properties stored in a system; they are modes of energy transfer.",
  },
  "phy-ktg": {
    bigIdea: "Gas pressure is the macroscopic result of countless microscopic momentum transfers at walls.",
    bridge: "Review kinetic energy, averages, and the ideal-gas equation.",
    labMission: "Increase particle speed and distinguish the effects on pressure, temperature, and rms speed.",
    checkpoint: "Why does rms speed scale with the square root of absolute temperature rather than temperature itself?",
    commonMistake: "Using Celsius inside kinetic-theory proportionalities that require kelvin.",
  },
  "phy-oscillations": {
    bigIdea: "SHM is motion where the restoring effect is proportional and opposite to displacement; its phase links x, v, a, and energy.",
    bridge: "Know sine curves, energy, and Hooke’s law.",
    labMission: "Change mass, spring constant, and amplitude separately. Identify which changes the period and which only changes energy.",
    checkpoint: "At the mean position and at an extreme, which of x, v, a, K, and U are maximum?",
    commonMistake: "Assuming every periodic motion is SHM; the restoring relation must be linear near equilibrium.",
  },
  "phy-waves": {
    bigIdea: "A wave carries a pattern and energy through a medium; standing waves are interference constrained by boundary conditions.",
    bridge: "Review SHM, phase, wavelength, frequency, and superposition.",
    labMission: "Change the boundary condition and frequency until nodes and antinodes line up. Read the allowed modes, not just the picture.",
    checkpoint: "What is fixed by the medium and what is fixed by the source when a wave enters a new medium?",
    commonMistake: "Thinking that particles of the medium travel with the wave over a long distance.",
  },
  // Chemistry XI core
  "chem-basic": {
    bigIdea: "The mole is a counting bridge between microscopic particles and laboratory mass, volume, or concentration.",
    bridge: "Refresh ratios, scientific notation, atomic mass, and balanced equations.",
    labMission: "Balance a reaction and watch particle counts, mole ratios, and limiting reagent update together.",
    checkpoint: "Why must a balanced equation be read as a ratio of particles or moles, not as a ratio of grams?",
    commonMistake: "Comparing masses directly when the reaction is controlled by mole ratios.",
  },
  "chem-atom": {
    bigIdea: "Atomic structure is a model built from evidence: quantum numbers describe allowed states, not miniature planetary paths.",
    bridge: "Know charge, energy, wavelength, and basic proportionality.",
    labMission: "Change n and Z and track radius, energy, and photon transition together.",
    checkpoint: "What information does each quantum number contribute to an electron’s state?",
    commonMistake: "Using the Bohr orbit picture as a literal picture of every multi-electron atom.",
  },
  "chem-periodic": {
    bigIdea: "Periodic trends are recurring consequences of nuclear charge, shielding, distance, and electron arrangement.",
    bridge: "Know shells, effective nuclear charge, and the meaning of ionization and electronegativity.",
    labMission: "Move across a period and down a group, then explain every trend change using attraction and shielding.",
    checkpoint: "Why can a trend show a small exception even when the broad period pattern is correct?",
    commonMistake: "Memorising arrows without identifying which competing effects caused the trend.",
  },
  "chem-bonding": {
    bigIdea: "Molecular shape is a consequence of electron-pair repulsion, orbital overlap, and electron distribution.",
    bridge: "Be able to draw Lewis structures and count bond pairs and lone pairs.",
    labMission: "Add lone pairs one at a time and see how the electron geometry and molecular shape diverge.",
    checkpoint: "Why can two molecules with the same electron geometry have different molecular shapes?",
    commonMistake: "Counting multiple bonds as multiple electron domains in VSEPR; each bonded atom is one domain.",
  },
  "chem-thermo": {
    bigIdea: "Thermochemistry is energy bookkeeping: define the system, choose signs, and track state functions separately from path functions.",
    bridge: "Review work, heat, enthalpy, and reading an energy diagram.",
    labMission: "Switch between exothermic and endothermic profiles and identify what changes for the system versus surroundings.",
    checkpoint: "Why can Hess’s law add reactions even though the actual path between states is different?",
    commonMistake: "Changing the sign of ΔH without also reversing the chemical equation.",
  },
  "chem-eq": {
    bigIdea: "Equilibrium is dynamic balance: forward and reverse rates match, while concentrations need not be equal.",
    bridge: "Know reversible reactions, concentration, logarithms, and the idea of a rate.",
    labMission: "Perturb concentration or temperature and watch the system re-establish the same equilibrium rule with a new composition.",
    checkpoint: "What changes immediately after a stress, and what changes only after the system relaxes?",
    commonMistake: "Treating Le Chatelier’s principle as a shortcut that replaces writing Q and K.",
  },
  "chem-redox": {
    bigIdea: "Redox is electron bookkeeping expressed through oxidation numbers, half-reactions, and charge balance.",
    bridge: "Review ions, charges, conservation, and balancing algebraically.",
    labMission: "Move electrons from the species oxidised to the species reduced and keep total charge conserved.",
    checkpoint: "How can oxidation number change reveal electron transfer even when no free electron is written?",
    commonMistake: "Calling the oxidising agent the species that gets oxidised; it is reduced while causing oxidation.",
  },
  "chem-goc": {
    bigIdea: "Organic chemistry becomes predictable when electron density, bond polarity, and stability guide the reaction mechanism.",
    bridge: "Know Lewis structures, electronegativity, resonance, and acid–base language.",
    labMission: "Move electron density through inductive or resonance arrows and predict the more stable intermediate.",
    checkpoint: "Which atom donates or accepts an electron pair in the mechanism, and what evidence supports that choice?",
    commonMistake: "Memorising named effects without drawing where electron density actually moves.",
  },
  "chem-hc": {
    bigIdea: "Hydrocarbon reactions are structure transformations: identify the bond, the reagent, and the mechanism before naming the product.",
    bridge: "Refresh IUPAC naming, hybridisation, bond polarity, and addition/substitution language.",
    labMission: "Toggle saturation and substitution conditions, then compare the structure, formula, and reaction family.",
    checkpoint: "Why does the same formula class not guarantee the same reactivity or geometry?",
    commonMistake: "Choosing a product from a memorised reagent list without checking the substrate and conditions.",
  },
  // Mathematics XI
  "math-sets": {
    bigIdea: "Sets turn language into regions and operations; inclusion–exclusion prevents double counting.",
    bridge: "Know subsets, intervals, and basic logical ‘and/or/not’ language.",
    labMission: "Change the overlap and watch union, intersection, and complement counts update without double counting.",
    checkpoint: "Why is the overlap subtracted once when counting a union of two sets?",
    commonMistake: "Confusing union with intersection or forgetting the universal set for complements.",
  },
  "math-rel-11": {
    bigIdea: "A function is a rule with a controlled input-output relationship; its graph exposes domain, range, and transformations.",
    bridge: "Know ordered pairs, coordinate axes, and basic algebraic restrictions.",
    labMission: "Switch between modulus, reciprocal, exponential, and logarithmic graphs and predict domain/range before looking.",
    checkpoint: "What does the vertical-line test check, and what does it not tell you about one-one behaviour?",
    commonMistake: "Assuming every algebraic expression defines a function on all real numbers.",
  },
  "math-trig": {
    bigIdea: "The unit circle gives sine and cosine a geometric definition that explains signs, periodicity, and identities.",
    bridge: "Know radians, coordinates, and the Pythagorean theorem.",
    labMission: "Move an angle through all four quadrants and predict signs before reading coordinates.",
    checkpoint: "Why are radians the natural unit for limits and derivatives of trigonometric functions?",
    commonMistake: "Using degree values inside calculus formulas or losing the quadrant sign.",
  },
  "math-complex": {
    bigIdea: "Complex numbers make plane geometry algebraic: addition translates, multiplication rotates and scales.",
    bridge: "Review coordinates, Pythagorean distance, and polar angles.",
    labMission: "Move a + ib and read modulus, argument, conjugate, and the product z z̄ from the Argand plane.",
    checkpoint: "Why is z z̄ always real and non-negative?",
    commonMistake: "Treating i as a real variable instead of using i² = −1 and the plane representation.",
  },
  "math-ineq": {
    bigIdea: "An inequality describes a region of the number line; signs and endpoints carry as much information as the algebra.",
    bridge: "Know interval notation and how multiplying by a negative changes order.",
    labMission: "Change the sign of the coefficient and observe the solution ray flip across the root.",
    checkpoint: "When is an endpoint included, and what algebraic clue tells you?",
    commonMistake: "Dividing by a negative number without reversing the inequality sign.",
  },
  "math-pnc": {
    bigIdea: "Counting is a choice of sample space: order matters for permutations and disappears for combinations.",
    bridge: "Know the fundamental counting principle and factorial notation.",
    labMission: "Change n and r and compare ordered selections with unordered selections; name what was forgotten.",
    checkpoint: "What exactly is divided out when nPr becomes nCr?",
    commonMistake: "Using combinations when positions or order are part of the outcome.",
  },
  "math-binom": {
    bigIdea: "Pascal’s triangle is not a trick sheet; it records the same add-one-step structure as the binomial coefficients.",
    bridge: "Review combinations and algebraic expansion.",
    labMission: "Move across a row and relate symmetry, coefficient choice, and the term containing a chosen power.",
    checkpoint: "Why do the coefficients in a row add to 2ⁿ?",
    commonMistake: "Forgetting that the general term includes both a coefficient and powers of x and a.",
  },
  "math-seq": {
    bigIdea: "A sequence is a function of an index; arithmetic and geometric sequences encode additive and multiplicative change.",
    bridge: "Know algebraic patterns, ratios, and summation notation.",
    labMission: "Change the common difference or ratio and compare linear growth with exponential growth.",
    checkpoint: "How can you distinguish AP from GP when the first few terms look similar?",
    commonMistake: "Using an AP sum for a GP or treating the common ratio as a common difference.",
  },
  "math-straight": {
    bigIdea: "A line is one geometric relationship with several equivalent equations; choose the form that exposes the given information.",
    bridge: "Review slope, coordinates, and two-point distance.",
    labMission: "Move a point or slope and inspect parallelism, angle, and intercept changes.",
    checkpoint: "Which line form is fastest when a point and slope are given, and why?",
    commonMistake: "Treating an undefined slope as zero or forgetting the vertical-line case.",
  },
  "math-conic": {
    bigIdea: "A conic is a locus defined by a distance condition; the standard equations are compressed geometry, not unrelated formulas.",
    bridge: "Know coordinate distance, completing the square, and basic locus language.",
    labMission: "Change the axes and eccentricity and identify the focus/directrix geometry before calculating.",
    checkpoint: "What geometric condition separates an ellipse, parabola, and hyperbola?",
    commonMistake: "Memorising parameters without checking which axis is major or which sign pattern applies.",
  },
  "math-3d-11": {
    bigIdea: "Three-dimensional coordinates extend the plane with a third independent direction; distance is still Pythagoras in more dimensions.",
    bridge: "Review coordinates, squares, and square roots.",
    labMission: "Move one coordinate at a time and identify which component changes the distance and by how much.",
    checkpoint: "Why can the distance formula be written as a sum of squared coordinate differences?",
    commonMistake: "Mixing coordinate signs or using a 2-D formula after a z-coordinate appears.",
  },
  "math-limits": {
    bigIdea: "A limit describes the value a function approaches; a derivative is the limiting slope of nearby secants.",
    bridge: "Know algebraic factorisation, graphs, and radians for trigonometric limits.",
    labMission: "Shrink the secant step h and watch the secant slope approach the tangent slope.",
    checkpoint: "Why can a function have a limit at a point even when its displayed value there is different?",
    commonMistake: "Substituting immediately into an indeterminate form without simplifying or reasoning about the approach.",
  },
  "math-stats": {
    bigIdea: "Statistics describes both the centre and spread of data; one number cannot replace the distribution.",
    bridge: "Know mean, squares, averages, and reading a simple graph.",
    labMission: "Move one data point and compare what changes in mean, variance, standard deviation, and range.",
    checkpoint: "Why can the mean stay fixed while the standard deviation increases?",
    commonMistake: "Confusing a measure of centre with a measure of spread.",
  },
  "math-prob-11": {
    bigIdea: "Probability is a structured count of outcomes; sets and trees make ‘and’, ‘or’, and ‘not’ precise.",
    bridge: "Review sets, fractions, and complementary events.",
    labMission: "Change event overlap and compare P(A∪B) with P(A)+P(B).",
    checkpoint: "When can probabilities be added directly, and when must the intersection be subtracted?",
    commonMistake: "Adding probabilities of overlapping events without removing the double-counted outcomes.",
  },
};

function defaultGuide(meta: ChapterMeta): Grade11Guide {
  const lens = LENSES[meta.subject];
  const prerequisite = meta.prereqs.length
    ? `Start by revising ${meta.prereqs.join(", ")}. You only need the definitions and one simple example before this chapter.`
    : "No formal chapter prerequisite is required; begin with the first definition and build a small example yourself.";
  const representation =
    meta.subject === "physics"
      ? "Use a labelled situation sketch, then translate it into a law and an equation."
      : meta.subject === "chemistry"
        ? "Keep the observable, particle, and symbolic views beside each other."
        : "Keep the graph or geometric picture beside the algebra so every step has a meaning.";
  return {
    bigIdea: meta.summary,
    bridge: prerequisite,
    sequence: lens.steps,
    representation,
    labMission: `Change one meaningful variable in ${meta.title} and explain the direction of the result before checking the formula.`,
    checkpoint: `Explain the main idea of ${meta.title} without starting with a formula.`,
    commonMistake: `Do not jump to a memorised rule in ${meta.title} before checking the conditions and what the symbols represent.`,
    lens,
  };
}

export function guideFor(meta: ChapterMeta): Grade11Guide {
  const base = defaultGuide(meta);
  const override = OVERRIDES[meta.id];
  return { ...base, ...override, lens: base.lens };
}

export function isGrade11(meta: ChapterMeta) {
  return meta.classLevel === 11;
}

export const GRADE11_CORE_IDS = Object.keys(OVERRIDES);
