type DiagramGuide = {
  lookFor: string;
  drawPrompt: string;
  legend?: string;
  check?: { question: string; answer: string };
};

const GUIDES: Record<string, DiagramGuide> = {
  "vt-graph": {
    lookFor: "Read the line in two ways: its slope gives acceleration, and signed area gives displacement.",
    drawPrompt: "Draw a v–t line that crosses v = 0. Mark the positive and negative areas separately.",
    legend: "Solid line = motion; dashed construction = reference axis.",
    check: { question: "What do the slope and signed area of a v–t graph mean?", answer: "Slope is acceleration; signed area is displacement. Using |v| gives distance." },
  },
  projectile: {
    lookFor: "Horizontal motion stays uniform while vertical motion accelerates downward. The curved path is their combination.",
    drawPrompt: "Draw the launch vector and split it into u cosθ and u sinθ before sketching the arc.",
    check: { question: "Which component changes in ideal projectile motion?", answer: "The horizontal component is uniform; the vertical component changes because acceleration −g acts downward." },
  },
  "incline-fbd": {
    lookFor: "Every arrow is an external force on the chosen block. The weight is vertical; only its components follow the slope.",
    drawPrompt: "Redraw the block alone. Add mg, N, and friction, then resolve mg parallel and perpendicular to the plane.",
    check: { question: "Why is mg not drawn along the incline?", answer: "Weight is always vertical; only its components can be resolved parallel and perpendicular to the incline." },
  },
  "work-theta": {
    lookFor: "Only the component of force along displacement transfers energy. The angle is between the force and displacement vectors.",
    drawPrompt: "Draw three tiny cases: positive work, zero work, and negative work. Label θ in each.",
    check: { question: "When is work zero even though a force acts?", answer: "When displacement is zero or the force is perpendicular to displacement, so F·d = 0." },
  },
  rolling: {
    lookFor: "The contact point is instantaneously at rest for pure rolling, while the centre translates and the body rotates.",
    drawPrompt: "Mark v of the centre, ω direction, and the contact point’s instantaneous velocity.",
    check: { question: "What condition identifies pure rolling?", answer: "The contact point is instantaneously at rest relative to the surface, giving v = ωR." },
  },
  kepler: {
    lookFor: "The orbit is an ellipse and the Sun is at a focus, not at the geometric centre. The swept areas encode angular momentum.",
    drawPrompt: "Sketch an ellipse with both foci, place the Sun at one focus, and shade two equal-time sectors.",
    check: { question: "What does equal area in equal time tell you?", answer: "A central force conserves angular momentum, so the radius vector sweeps equal areas in equal times." },
  },
  "stress-strain": {
    lookFor: "Slope in the proportional region is Young’s modulus; the area under the curve is elastic energy density.",
    drawPrompt: "Label proportional limit, yield, ultimate stress, and fracture on a fresh stress–strain curve.",
    check: { question: "Which graph reading answers stiffness, and which answers stored energy per volume?", answer: "The initial slope answers Young’s modulus; the area under the curve answers elastic energy density." },
  },
  "pv-cycle": {
    lookFor: "Horizontal distance represents volume change and vertical pressure; the enclosed area represents net work in a cycle.",
    drawPrompt: "Draw a clockwise loop and mark where the gas does positive net work.",
    check: { question: "What does the enclosed area of a clockwise PV cycle represent?", answer: "Net work done by the gas over the cycle under the usual convention." },
  },
  pendulum: {
    lookFor: "For small angles the restoring torque is approximately proportional to displacement, which is why SHM appears.",
    drawPrompt: "Draw the equilibrium line, angular displacement, restoring force, and the small-angle approximation.",
    check: { question: "What approximation lets a simple pendulum become SHM?", answer: "For small θ in radians, sinθ ≈ θ, making the restoring torque proportional to angular displacement." },
  },
  "wave-string": {
    lookFor: "Nodes do not move; antinodes have maximum amplitude. Boundary conditions decide which wavelengths fit.",
    drawPrompt: "Draw the first three allowed modes and count nodes and antinodes for each.",
  },
  "gauss-sphere": {
    lookFor: "Symmetry makes the field magnitude constant on a spherical Gaussian surface, so flux becomes E times area.",
    drawPrompt: "Draw the charge, a spherical Gaussian surface, radial field arrows, and outward area vectors.",
  },
  "unit-circle": {
    lookFor: "The point coordinates are (cos x, sin x). Quadrant signs come from the coordinate signs, not from memorised tables alone.",
    drawPrompt: "Draw the four axes, a radius at x, and project the point to both axes.",
  },
  argand: {
    lookFor: "The real part is horizontal, the imaginary part vertical, the modulus is distance from the origin, and the argument is the polar angle.",
    drawPrompt: "Plot z, its conjugate, and the right triangle that gives |z|.",
  },
  ellipse: {
    lookFor: "The sum of distances from the two foci is constant. Eccentricity controls how stretched the conic is.",
    drawPrompt: "Mark the centre, vertices, co-vertices, foci, and the major axis on an ellipse.",
  },
  "tangent-curve": {
    lookFor: "A derivative is the limiting slope of secants as the second point approaches the first.",
    drawPrompt: "Draw a curve, one secant through two nearby points, and the tangent left after the gap shrinks.",
  },
  "area-curve": {
    lookFor: "A definite integral accumulates signed area. If the graph crosses the axis, geometry and algebra must respect the sign.",
    drawPrompt: "Shade the region and mark any x-axis crossing where the integral must be split.",
  },
  histogram: {
    lookFor: "The bars represent grouped frequencies; the mean line locates the centre while the spread measures dispersion.",
    drawPrompt: "Sketch a distribution with the same mean but larger spread and compare the two graphs.",
  },
  venn: {
    lookFor: "The overlap belongs to both sets. Union counts every region once, so the shared region is subtracted after adding.",
    drawPrompt: "Shade A∪B, A∩B, and A′ separately on three quick Venn diagrams.",
  },
  "function-graphs": {
    lookFor: "Domain restrictions control where the graph exists; transformations move or reflect a parent graph.",
    drawPrompt: "Start with y = x² and show how y = (x−h)² + k moves the vertex.",
  },
  "bohr": {
    lookFor: "Energy levels are discrete. A transition emits or absorbs a photon whose energy equals the level difference.",
    drawPrompt: "Draw levels n = 1, 2, 3 and an arrow. Label whether the photon is emitted or absorbed.",
  },
  "hybrid-tet": {
    lookFor: "Electron domains arrange to reduce repulsion; lone pairs occupy more space and compress bond angles.",
    drawPrompt: "Draw the electron-domain geometry first, then erase lone-pair positions to name the molecular shape.",
  },
  "energy-profile": {
    lookFor: "The vertical difference between reactants and products is ΔH; the peak measures activation energy, not reaction enthalpy.",
    drawPrompt: "Sketch an exothermic profile and label Ea, ΔH, reactants, and products.",
  },
  "buffer-h": {
    lookFor: "A buffer contains a conjugate pair that consumes added H⁺ or OH⁻, so pH changes less than in water alone.",
    drawPrompt: "Draw the conjugate acid/base pair and write one reaction for added acid and one for added base.",
  },
  sn2: {
    lookFor: "The nucleophile attacks an electron-poor carbon from the backside while the leaving group departs in one concerted step.",
    drawPrompt: "Use curved arrows to show electron-pair donation and C–X bond breaking in the same step.",
  },
  periodic: {
    lookFor: "Across a period, effective nuclear attraction generally grows; down a group, shells and shielding grow. Exceptions need a local explanation.",
    drawPrompt: "Draw a small period and group arrow map, then annotate one exception rather than memorising a blank arrow.",
  },
};

export function diagramGuide(id: string, caption: string): DiagramGuide {
  const base = GUIDES[id] ?? {
    lookFor: caption,
    drawPrompt: "Redraw the diagram from memory and label the quantities that carry the relationship.",
    legend: "Solid lines carry the main relationship; accent marks the quantity or point to inspect.",
  };
  return {
    ...base,
    check: base.check ?? {
      question: "What relationship should this picture help you explain?",
      answer: base.lookFor,
    },
  };
}
