import { CheckCircle2, FlaskConical, Lightbulb, NotebookPen, RotateCcw, Sparkles } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";
import { TeX } from "@/components/tex";
import { cn } from "@/lib/utils";

const ink = "currentColor";
const mute = "var(--color-muted)";
const ok = "var(--color-ok)";

type Prediction = "increase" | "decrease" | "same" | "depends";

type LabGuide = {
  goal: string;
  prompt: string;
  answer: Prediction;
  explain: string;
  mission: string;
  transfer: string;
  transferAnswer: string;
};

const GUIDES: Record<string, Partial<LabGuide>> = {
  "phy-motion-1d": {
    goal: "Connect slope and area on a velocity–time graph to acceleration and displacement.",
    prompt: "When velocity changes sign, what happens to the gap between total distance and displacement magnitude?",
    answer: "increase",
    explain: "After the direction changes, displacement adds signed areas while distance adds their magnitudes. They are equal only when velocity keeps one sign.",
    mission: "Set u and a so the velocity crosses zero. Locate the turning time before reading the two quantities.",
    transfer: "A car goes east, stops, and returns west. Which graph feature proves the car changed direction?",
    transferAnswer: "Velocity crosses zero; the signed area can partially cancel.",
  },
  "phy-motion-2d": {
    goal: "See projectile motion as independent horizontal and vertical motions.",
    prompt: "With the same launch speed and level landing, what happens to range when θ changes from 30° to 60°?",
    answer: "same",
    explain: "Complementary angles θ and 90°−θ have the same sin 2θ, so they share range while producing different heights and flight times.",
    mission: "Compare 30° and 60° with the same speed, then compare their heights.",
    transfer: "If the landing height changes, does the simple complementary-angle result still apply automatically?",
    transferAnswer: "No. The equal-height derivation and its symmetry have changed.",
  },
  "phy-nlm": {
    goal: "Use a free-body diagram to decide whether a block remains at rest or slides.",
    prompt: "As the incline angle increases, what happens to the downslope component of weight?",
    answer: "increase",
    explain: "mg sin θ grows with θ. Static friction can oppose it only up to its limiting value μsN, so a threshold exists.",
    mission: "Find the angle at which tan θ just equals μ. Treat that as a boundary, not as a typical moving case.",
    transfer: "If the block is pulled upward, which way does kinetic friction point?",
    transferAnswer: "Down the plane, opposite the actual relative sliding direction.",
  },
  "phy-wep": {
    goal: "Separate the always-conserved momentum from the conditionally conserved kinetic energy.",
    prompt: "As coefficient of restitution falls from 1 to 0, what happens to kinetic energy after the collision?",
    answer: "decrease",
    explain: "Momentum remains conserved in an isolated collision, but kinetic energy is conserved only for e = 1. Deformation and heat carry away the difference.",
    mission: "Compare equal masses at e = 1, 0.5, and 0. Read velocities and energy together.",
    transfer: "Can a collision be perfectly inelastic while momentum is still conserved?",
    transferAnswer: "Yes. The bodies stick, but total momentum remains constant if external impulse is negligible.",
  },
  "phy-rotation": {
    goal: "Relate mass distribution to rotational inertia and rolling acceleration.",
    prompt: "For the same mass and radius, does putting more mass near the rim make the rolling body accelerate faster or slower?",
    answer: "decrease",
    explain: "A larger moment of inertia stores more of the available energy in rotation, leaving less for centre-of-mass translation.",
    mission: "Compare the readouts for a ring-like and disk-like distribution before trusting the ranking.",
    transfer: "What condition must hold at the contact point for rolling without slipping?",
    transferAnswer: "The contact point is instantaneously at rest relative to the surface: v = ωR.",
  },
  "phy-gravitation": {
    goal: "Connect orbital radius to gravity, speed, period, and energy.",
    prompt: "When orbital radius increases, does the circular-orbit period increase or decrease?",
    answer: "increase",
    explain: "T² is proportional to r³, so a larger orbit takes longer even though its orbital speed is lower.",
    mission: "Move the orbit outward and check the direction of change in g, v, and T.",
    transfer: "Why is escape speed √2 times circular speed at the same radius?",
    transferAnswer: "The escape condition requires zero total energy rather than the negative circular-orbit energy.",
  },
  "phy-solids": {
    goal: "Read slope, yield, and energy from a stress–strain curve.",
    prompt: "If the cross-sectional area is halved for the same force, what happens to stress?",
    answer: "increase",
    explain: "Stress is F/A, so halving area doubles stress. The material property is not the same as the applied force.",
    mission: "Use the graph and distinguish a steeper proportional slope from a higher ultimate point.",
    transfer: "What does the area under a stress–strain curve represent per unit volume?",
    transferAnswer: "Mechanical work or elastic energy density.",
  },
  "phy-fluids": {
    goal: "Use continuity and Bernoulli together rather than treating them as separate tricks.",
    prompt: "At constant flow rate, what happens to speed when a pipe narrows?",
    answer: "increase",
    explain: "A v is constant for incompressible steady flow, so reducing area requires a larger speed. In a horizontal ideal flow, pressure then falls.",
    mission: "Make the throat narrow and compare v₂ with the pressure change.",
    transfer: "Which assumption would make the simple Bernoulli prediction less reliable?",
    transferAnswer: "Significant viscosity, turbulence, pumps, or energy loss between the points.",
  },
  "phy-thermal": {
    goal: "Distinguish sensible heating from latent heat during a phase change.",
    prompt: "During a pure phase change at fixed pressure, does temperature rise while the material is changing phase?",
    answer: "same",
    explain: "The supplied energy changes the arrangement and separation of particles rather than increasing the average kinetic energy, so temperature stays approximately constant.",
    mission: "Compare a sloped temperature segment with a flat phase-change segment.",
    transfer: "What extra term must be added when a calculation crosses a phase boundary?",
    transferAnswer: "The latent-heat term mL in addition to any mcΔT segments.",
  },
  "phy-thermo": {
    goal: "Read heat, work, and internal-energy changes from a process path.",
    prompt: "As expansion increases, what happens to work done by the gas under the convention W = work done by gas?",
    answer: "increase",
    explain: "The gas pushes the surroundings during expansion, so the signed area under a PV path is positive work by the gas.",
    mission: "Compare two paths between the same states and note that work changes while ΔU does not for an ideal gas.",
    transfer: "Which quantities depend only on the state, not on the path?",
    transferAnswer: "State functions such as U, T, P, and V; heat and work are path dependent.",
  },
  "phy-ktg": {
    goal: "Connect microscopic molecular speed to macroscopic pressure and temperature.",
    prompt: "If the rms speed increases while volume stays fixed, what happens to pressure?",
    answer: "increase",
    explain: "Faster molecules transfer more momentum per collision and collide more energetically with the walls, so pressure rises.",
    mission: "Change the speed distribution and compare pressure with rms speed rather than mean speed.",
    transfer: "Which temperature scale belongs in kinetic-theory equations?",
    transferAnswer: "Absolute temperature in kelvin.",
  },
  "phy-oscillations": {
    goal: "See how amplitude, spring constant, and mass affect SHM differently.",
    prompt: "At fixed m and k, does increasing amplitude change the ideal mass–spring period?",
    answer: "same",
    explain: "For ideal linear SHM, T = 2π√(m/k), so amplitude changes energy and maximum speed but not the period.",
    mission: "Change A first, then k, then m; compare which readout responds.",
    transfer: "Where is speed maximum in one cycle?",
    transferAnswer: "At the mean position, where displacement is zero and kinetic energy is maximum.",
  },
  "phy-waves": {
    goal: "Use boundary conditions to interpret nodes, antinodes, and allowed frequencies.",
    prompt: "If a string length is increased with the same wave speed and mode number, what happens to its allowed frequency?",
    answer: "decrease",
    explain: "For a fixed mode, f = nv/(2L), so longer length means lower frequency spacing.",
    mission: "Change the mode and count nodes before reading the wavelength.",
    transfer: "What stays the same when a wave enters a new medium: speed, wavelength, or frequency?",
    transferAnswer: "The source frequency stays the same; speed and wavelength can change.",
  },
  "chem-basic": {
    goal: "Make mole ratios visible by showing particles, moles, and limiting reagent together.",
    prompt: "If one reactant runs out first, does adding more of the excess reactant make more product?",
    answer: "same",
    explain: "The limiting reactant caps the reaction extent. Extra excess reactant remains after the limiting particles are consumed.",
    mission: "Change the starting counts and identify the limiting reactant before pressing balance.",
    transfer: "Why should a balanced equation be used before converting grams to product?",
    transferAnswer: "The equation supplies the particle/mole ratio; mass conversion comes after stoichiometry.",
  },
  "chem-atom": {
    goal: "Relate a discrete level transition to radius, energy, and photon energy.",
    prompt: "For fixed Z, what happens to the orbit radius when n increases?",
    answer: "increase",
    explain: "The atom loses energy and emits a photon whose energy equals the positive difference between the two levels.",
    mission: "Change n and Z and compare the spacing of energy levels with the radius scale.",
    transfer: "What determines the wavelength of the emitted photon?",
    transferAnswer: "The energy gap ΔE through ΔE = hc/λ.",
  },
  "chem-periodic": {
    goal: "Explain periodic trends using attraction, shielding, and distance.",
    prompt: "Across a period, does effective nuclear attraction generally become stronger?",
    answer: "increase",
    explain: "Protons increase while added electrons enter the same main shell, so shielding does not rise enough to cancel the extra attraction.",
    mission: "Move across and down and record one trend plus the particle-level reason.",
    transfer: "Why does moving down a group usually increase atomic radius?",
    transferAnswer: "A new shell is added and the valence electrons are farther from the nucleus with more shielding.",
  },
  "chem-bonding": {
    goal: "Build molecular shape from electron domains and lone-pair repulsion.",
    prompt: "When a lone pair is added to the central atom, do nearby bond angles usually become larger or smaller?",
    answer: "decrease",
    explain: "Lone pairs repel more strongly than bonding pairs, squeezing the bond pairs closer together.",
    mission: "Toggle bond pairs and lone pairs, then name electron geometry separately from molecular shape.",
    transfer: "Why can NH₃ and BF₃ have different shapes even though both have three bonded atoms?",
    transferAnswer: "NH₃ has a lone pair on the central atom; BF₃ has none.",
  },
  "chem-thermo": {
    goal: "Separate activation energy from reaction enthalpy on an energy profile.",
    prompt: "If a catalyst lowers the peak but leaves reactants and products at the same levels, does ΔH change?",
    answer: "same",
    explain: "A catalyst changes the path and activation energy, not the initial and final state energies; ΔH is unchanged.",
    mission: "Toggle catalyst and reaction direction while tracking Ea and ΔH separately.",
    transfer: "What sign does ΔH have when products lie lower than reactants?",
    transferAnswer: "Negative: the forward reaction is exothermic.",
  },
  "chem-eq": {
    goal: "Treat equilibrium as a dynamic response to a disturbance, not as a static equal-concentration state.",
    prompt: "After adding a reactant, does the forward reaction initially speed up or slow down?",
    answer: "increase",
    explain: "The forward collision frequency initially rises. The system then shifts until the forward and reverse rates match again.",
    mission: "Perturb one concentration at a time and distinguish the immediate jump from the final re-equilibrated state.",
    transfer: "What does the equilibrium constant change with for a given reaction?",
    transferAnswer: "Temperature, not a concentration change alone.",
  },
  "chem-redox": {
    goal: "Make oxidation-number changes and electron transfer balance visible.",
    prompt: "If a species loses electrons, does its oxidation number increase or decrease?",
    answer: "increase",
    explain: "Loss of negative charge makes the formal oxidation number more positive: oxidation is loss of electrons.",
    mission: "Toggle the donor and acceptor and keep the total electrons lost equal to electrons gained.",
    transfer: "Which species is the oxidising agent?",
    transferAnswer: "The species that accepts electrons and is reduced.",
  },
  "chem-goc": {
    goal: "Follow electron density instead of memorising isolated organic reactions.",
    prompt: "When a nucleophile donates an electron pair to an electrophile, what happens to electron density at the target centre?",
    answer: "increase",
    explain: "A nucleophile donates an electron pair to an electron-poor centre; curved arrows begin at the donor pair and end at the new bond or acceptor orbital.",
    mission: "Trace one inductive or resonance effect and identify the electron-rich and electron-poor sites.",
    transfer: "What must a curved arrow always represent?",
    transferAnswer: "Movement of an electron pair, not movement of an atom or a positive charge by itself.",
  },
  "chem-hc": {
    goal: "Choose a hydrocarbon reaction from the substrate, bond, reagent, and conditions.",
    prompt: "When an alkene adds H₂ across its double bond, does the degree of unsaturation increase or decrease?",
    answer: "decrease",
    explain: "The π bond is consumed and two σ bonds form, so the molecule becomes more saturated.",
    mission: "Toggle the multiple bond and compare the formula, hybridisation, and reaction family.",
    transfer: "Which bond is usually attacked first in electrophilic addition?",
    transferAnswer: "The electron-rich π bond.",
  },
  "math-sets": {
    goal: "Use regions to make union, intersection, and inclusion–exclusion impossible to confuse.",
    prompt: "If the overlap grows while A and B stay fixed, does the union count grow or shrink?",
    answer: "decrease",
    explain: "A larger overlap means more outcomes were counted twice in n(A)+n(B), so the corrected union becomes smaller.",
    mission: "Push the overlap slider beyond the smaller set and notice the physical constraint.",
    transfer: "When can n(A∪B) equal n(A)+n(B)?",
    transferAnswer: "When A and B are disjoint, so the intersection is empty.",
  },
  "math-rel-11": {
    goal: "Read domain, range, and transformation behaviour from function graphs.",
    prompt: "For y = 1/x, what happens as x approaches zero from either side?",
    answer: "depends",
    explain: "The two sides diverge with opposite signs, so the graph has a vertical asymptote and no value at x = 0.",
    mission: "Switch function families and predict the restriction before reading the readout.",
    transfer: "What does a vertical-line test reject?",
    transferAnswer: "Any graph where one input x would produce more than one output y.",
  },
  "math-trig": {
    goal: "Derive signs and values from coordinates on the unit circle.",
    prompt: "As the point moves from quadrant I to quadrant II, what happens to cos θ?",
    answer: "decrease",
    explain: "The x-coordinate becomes negative while y remains positive; therefore cos is negative and sin is positive.",
    mission: "Move through all quadrants and say the signs aloud before reading sin and cos.",
    transfer: "Why is the radius 1 important to the definitions?",
    transferAnswer: "It makes the coordinates directly equal to cos x and sin x.",
  },
  "math-complex": {
    goal: "See a complex number as both algebra and a point/vector in the plane.",
    prompt: "If Im z changes from +b to −b with the same magnitude, what happens to |z|?",
    answer: "same",
    explain: "It reflects across the real axis; the modulus stays the same but the argument changes sign for a nonzero point.",
    mission: "Move Re z and Im z independently, then check z z̄ against |z|².",
    transfer: "What does multiplication do to moduli and arguments?",
    transferAnswer: "Multiply the moduli and add the arguments.",
  },
  "math-ineq": {
    goal: "Make the inequality reversal rule visible on a number line.",
    prompt: "As the coefficient changes from positive to negative in ax > 0, what happens to the allowed x-region?",
    answer: "depends",
    explain: "Dividing by a negative reverses order, so the side of the root that satisfies the inequality flips.",
    mission: "Cross a = 0 carefully. Decide whether the solution is all real, empty, or one-sided.",
    transfer: "Why is the circle open for a strict inequality?",
    transferAnswer: "The boundary point makes the expression zero, not strictly positive or negative.",
  },
  "math-pnc": {
    goal: "Connect ordered selections, unordered selections, and factorial cancellation.",
    prompt: "When order is forgotten, does the number of selections increase or decrease?",
    answer: "decrease",
    explain: "Every group of r objects appears r! times among ordered arrangements, so dividing by r! removes duplicate orderings.",
    mission: "Compare nPr and nCr for the same n and r and say what the ratio means.",
    transfer: "When would nPr be the correct model instead of nCr?",
    transferAnswer: "When positions, ranking, seating order, or any order-sensitive outcome matters.",
  },
  "math-binom": {
    goal: "Read coefficient structure from Pascal’s triangle and the general term.",
    prompt: "As you move to the next row, what happens to the sum of all coefficients?",
    answer: "increase",
    explain: "The row sum doubles because (1+1)^n = 2^n; Pascal’s addition rule builds the next row.",
    mission: "Choose a row and locate the coefficient of a chosen power before expanding.",
    transfer: "Why are the first and last coefficients always 1?",
    transferAnswer: "They correspond to choosing zero or all n factors.",
  },
  "math-seq": {
    goal: "Compare additive and multiplicative change using term, ratio, and sum views.",
    prompt: "For a GP with ratio greater than 1, does the gap between later terms generally widen?",
    answer: "increase",
    explain: "Each term is multiplied by the same factor, so absolute differences grow as the scale of terms grows.",
    mission: "Change the common difference and ratio separately and compare AP and GP plots.",
    transfer: "When does an infinite GP have a finite sum?",
    transferAnswer: "When the absolute value of the common ratio is less than 1.",
  },
  "math-conic": {
    goal: "Link eccentricity, focus, and directrix to the conic’s shape.",
    prompt: "As an ellipse becomes more stretched with fixed major axis, does eccentricity increase or decrease?",
    answer: "increase",
    explain: "The foci move farther from the centre, increasing c/a and therefore eccentricity.",
    mission: "Change a and b and observe the focus positions before reading e.",
    transfer: "What is special about the parabola’s eccentricity?",
    transferAnswer: "It is exactly 1: distance to focus equals distance to directrix.",
  },
  "math-limits": {
    goal: "Watch a secant slope converge to a tangent slope as the step shrinks.",
    prompt: "As h approaches zero, what happens to the distance between the secant points a and a+h?",
    answer: "decrease",
    explain: "The second point approaches the first, and the secant approaches the tangent that defines the derivative.",
    mission: "Use positive and negative h values and compare the two-sided approach.",
    transfer: "Why is a derivative a local rate rather than an average rate over a large interval?",
    transferAnswer: "The interval is taken to zero, so only nearby behaviour remains.",
  },
  "math-stats": {
    goal: "Separate centre from spread and see how one data point can affect each.",
    prompt: "If one value moves farther from the mean while the mean stays similar, what happens to variance?",
    answer: "increase",
    explain: "Variance squares deviations, so distant points contribute disproportionately to spread.",
    mission: "Move one slider far from the others and compare range, variance, and standard deviation.",
    transfer: "Why is standard deviation in the same units as the data while variance is squared units?",
    transferAnswer: "Standard deviation is the square root of variance.",
  },
  "math-prob-11": {
    goal: "Make event overlap visible before applying the addition rule.",
    prompt: "As event overlap grows, what happens to the amount counted twice in P(A)+P(B)?",
    answer: "increase",
    explain: "The intersection is present in both individual totals, so it must be subtracted once for the union.",
    mission: "Change overlap and read how the union probability responds.",
    transfer: "When does P(A∪B) = P(A)+P(B)?",
    transferAnswer: "For mutually exclusive events with no overlap.",
  },
};

const DEFAULT_GUIDE: LabGuide = {
  goal: "Change one variable at a time and connect the visible result to the displayed relationship.",
  prompt: "Before moving a control, which direction do you predict the highlighted quantity will move?",
  answer: "depends",
  explain: "The result depends on the governing relationship and on which variables are being held fixed. Use the readouts to identify the condition.",
  mission: "Change one control, pause, and say the cause-and-effect sentence before changing another control.",
  transfer: "What assumption in this model would you check before applying the same result to a real system?",
  transferAnswer: "Check the stated conditions, units, sign convention, and whether losses or additional forces are negligible.",
};

const LabContext = createContext<string>("");

export function LabProvider({ chapterId, children }: { chapterId: string; children: React.ReactNode }) {
  return <LabContext.Provider value={chapterId}>{children}</LabContext.Provider>;
}

function guideForLab(chapterId: string, title: string): LabGuide {
  return {
    ...DEFAULT_GUIDE,
    ...GUIDES[chapterId],
    goal: GUIDES[chapterId]?.goal ?? `${title}: change one variable and explain the response.`,
  };
}

export function LabGuidance({ title, lead }: { title: string; lead: string }) {
  const chapterId = useContext(LabContext);
  const guide = useMemo(() => guideForLab(chapterId, title), [chapterId, title]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [checked, setChecked] = useState(false);
  const [transfer, setTransfer] = useState<"yes" | "no" | null>(null);
  const [note, setNote] = useState("");

  function reset() {
    setPrediction(null);
    setChecked(false);
    setTransfer(null);
    setNote("");
  }

  const experimentSteps = [
    { label: "Predict", done: prediction !== null, text: "Choose a direction before moving a control." },
    { label: "Change one thing", done: checked, text: "Run the model, then compare prediction with the readout." },
    { label: "Explain", done: transfer !== null, text: "Name the law and the condition that caused the change." },
    { label: "Record", done: note.trim().length >= 12, text: "Write one observation in cause → result → reason form." },
  ];
  const completedSteps = experimentSteps.filter((step) => step.done).length;

  return (
    <div className="mt-5 space-y-3">
      <section className="rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Run it like an experiment</p>
            <p className="mt-1 text-sm text-muted">A simulation becomes learning when you predict, isolate a variable, explain the pattern, and record evidence.</p>
          </div>
          <span className="font-mono text-xs tabular-nums text-subtle">{completedSteps}/4 complete</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {experimentSteps.map((step, index) => (
            <div key={step.label} className={cn("rounded-lg border p-3", step.done ? "border-ok/30 bg-ok/5" : "border-border bg-raised/45")}>
              <div className="flex items-center gap-2">
                {step.done ? <CheckCircle2 className="size-4 text-ok" /> : <span className="grid size-4 place-items-center rounded-full border border-border font-mono text-[10px] text-subtle">{index + 1}</span>}
                <span className="text-xs font-medium text-fg">{step.label}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-subtle">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <div className="flex items-center gap-2 text-accent"><Lightbulb className="size-4" /><span className="text-xs font-medium tracking-[0.14em] uppercase">Your lab question</span></div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{guide.goal}</p>
          <p className="mt-3 text-sm font-medium text-fg">{guide.mission}</p>
          <p className="mt-3 text-sm text-muted">{lead}</p>
        </div>
        <div className="rounded-xl border border-border bg-raised/60 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2"><FlaskConical className="size-4 text-ok" /><span className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Predict before dragging</span></div>
            <button type="button" onClick={reset} className="inline-flex min-h-9 items-center gap-1 text-xs text-subtle hover:text-fg" aria-label="Reset lab guide"><RotateCcw className="size-3.5" /> reset</button>
          </div>
          <p className="mt-2 text-sm text-muted">{guide.prompt}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["increase", "decrease", "same", "depends"] as const).map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => { setPrediction(choice); setChecked(false); }}
                className={cn("min-h-10 rounded-lg border px-2 text-xs capitalize", prediction === choice ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:bg-surface hover:text-fg")}
              >
                {choice === "depends" ? "It depends" : choice === "same" ? "No change" : choice}
              </button>
            ))}
          </div>
          {prediction && !checked && <button type="button" onClick={() => setChecked(true)} className="mt-3 min-h-10 w-full rounded-lg border border-border bg-surface text-sm text-fg hover:bg-raised">Check my prediction</button>}
          {checked && (
            <div className="mt-3 rounded-lg border border-border bg-surface p-3 text-sm text-muted">
              <p className={cn("font-medium", prediction === guide.answer ? "text-ok" : "text-danger")}>{prediction === guide.answer ? "Good prediction." : "Repair the prediction."}</p>
              <p className="mt-2 leading-relaxed">{guide.explain}</p>
              <p className="mt-3 font-medium text-fg">Transfer: {guide.transfer}</p>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => setTransfer("yes")} className={cn("min-h-9 rounded-md border px-3 text-xs", transfer === "yes" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted")}>I can explain</button>
                <button type="button" onClick={() => setTransfer("no")} className={cn("min-h-9 rounded-md border px-3 text-xs", transfer === "no" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted")}>Show the cue</button>
              </div>
              {transfer && <p className="mt-2 text-xs leading-relaxed text-subtle">{guide.transferAnswer}</p>}
            </div>
          )}
        </div>
      </div>
      <details className="rounded-xl border border-border bg-surface">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 px-4 text-sm text-muted"><NotebookPen className="size-4 text-subtle" /> Lab notebook: write one observation</summary>
        <div className="border-t border-border p-4">
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Example: when I doubled ___ while holding ___ fixed, ___ changed because ___." className="min-h-20 w-full resize-y rounded-lg border border-border bg-raised px-3 py-2 text-sm text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent/40" />
          <p className="mt-2 text-xs text-subtle">Use the sentence pattern: variable changed → observation → reason.</p>
        </div>
      </details>
    </div>
  );
}

export function LabSurface({ title, lead, formula, children }: { title: string; lead: string; formula?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 md:p-5">
      <div className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-subtle uppercase"><Sparkles className="size-3.5" /> Interactive lab</div>
      <h2 className="font-display mt-2 text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{lead}</p>
      {formula && <div className="mt-3 overflow-x-auto"><TeX expr={formula} display /></div>}
      <LabGuidance title={title} lead={lead} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function LabSvg({ children, viewBox = "0 0 360 200", className }: { children: React.ReactNode; viewBox?: string; className?: string }) {
  return <svg viewBox={viewBox} className={cn("h-auto w-full max-h-72 text-fg", className)} role="img" fill="none">{children}</svg>;
}

export function LabSlider({ label, value, min, max, step, onChange, unit }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; unit?: string }) {
  const display = Number.isInteger(step) ? String(value) : value.toFixed(step < 0.1 ? 2 : 1);
  return (
    <label className="block">
      <span className="flex justify-between gap-3 text-xs text-muted"><span>{label}</span><span className="font-mono tabular-nums text-fg">{display}{unit ? ` ${unit}` : ""}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-1 h-11 w-full accent-[var(--color-accent)]" />
    </label>
  );
}

export function LabReadout({ items }: { items: { k: string; v: string }[] }) {
  return <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{items.map((item) => <div key={item.k} className="rounded-lg border border-border bg-raised px-3 py-2"><dt className="text-xs tracking-wide text-subtle uppercase">{item.k}</dt><dd className="mt-1 font-mono text-sm tabular-nums text-fg">{item.v}</dd></div>)}</dl>;
}

export { ink, mute, ok };
