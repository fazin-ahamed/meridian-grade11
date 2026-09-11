import type { ChapterContent, MasteryModule, MasterySection } from "../types";
import { PHYSICS_MASTERY_QUESTIONS } from "./physics-mastery-questions";

function S(id: string, title: string, body: string, bullets?: string[]): MasterySection {
  return { id, title, body, bullets };
}

function M(
  id: string,
  title: string,
  summary: string,
  sections: MasterySection[],
  section: string,
  includeInGuide = true,
): MasteryModule {
  return {
    id,
    title,
    summary,
    sections,
    questions: PHYSICS_MASTERY_QUESTIONS.filter((item) => item.section === section),
    includeInGuide,
  };
}

const TOOLKIT: MasteryModule = M(
  "physics-toolkit",
  "Physics Math Toolkit",
  "Vectors, graphs, trigonometry, dot products, and calculus-lite. These are the moves that make later mechanics feel mechanical instead of mysterious.",
  [
    S(
      "toolkit-scalars-vectors",
      "0.1 Scalars vs vectors",
      "A scalar has magnitude only: mass, time, speed, energy, and work. A vector has magnitude and direction and obeys vector addition: displacement, velocity, acceleration, force, and momentum. The same number can describe very different physics when its direction is missing.",
      [
        "Choose axes before adding vectors. Break each vector into components and solve the x and y stories independently.",
        "Do not add magnitudes unless the vectors are collinear and their signs have already been handled.",
        "A vector is not defined by its components alone until the axes and signs are known.",
      ],
    ),
    S(
      "toolkit-components",
      "0.2 Components are the language of mechanics",
      "For a vector of magnitude $A$ at angle $\\theta$ from +x, $A_x=A\\cos\\theta$ and $A_y=A\\sin\\theta$. The signs come from the quadrant, not from the calculator. Reconstruct with $A=\\sqrt{A_x^2+A_y^2}$ and use $\\tan\\theta=A_y/A_x$ only after correcting the quadrant.",
      [
        "The 3-4-5 triangle gives $\\sin37^\\circ\\approx3/5$ and $\\cos37^\\circ\\approx4/5$; 5-12-13 is another useful triangle.",
        "Exact values: $30^\\circ\\to(1/2,\\sqrt3/2)$, $45^\\circ\\to(1/\\sqrt2,1/\\sqrt2)$, $60^\\circ\\to(\\sqrt3/2,1/2)$.",
        "A negative component is information about direction, not a negative magnitude.",
      ],
    ),
    S(
      "toolkit-dot",
      "0.3 Dot product — the work machine",
      "The dot product is $\\vec A\\cdot\\vec B=AB\\cos\\theta=A_xB_x+A_yB_y(+A_zB_z)$ and returns a scalar. Use it whenever the question asks how much of one vector acts along another. Work is the main example: $W=\\vec F\\cdot\\vec s$.",
      [
        "$\\theta=0^\\circ$ gives maximum positive work; $90^\\circ$ gives zero; $180^\\circ$ gives maximum negative work.",
        "If two non-zero vectors have zero dot product, they are perpendicular.",
        "A large force can do zero work when the displacement is perpendicular to it; this becomes important in circular motion.",
      ],
    ),
    S(
      "toolkit-graphs",
      "0.4 Graphs: slope and area",
      "A graph is a physics machine. Slope tells you a rate of change; area tells you accumulated change. On an $x$-$t$ graph, slope is velocity. On a $v$-$t$ graph, slope is acceleration and signed area is displacement. On an $a$-$t$ graph, area is change in velocity.",
      [
        "Area below the time axis is negative displacement. Distance requires the area under $|v|$, so split the graph wherever velocity changes sign.",
        "Always carry units: a $v$-$t$ area has units $(\\mathrm{m/s})\\mathrm{s}=\\mathrm m$.",
        "A turning point on an $x$-$t$ graph has zero instantaneous velocity, but it does not automatically have zero acceleration.",
      ],
    ),
    S(
      "toolkit-calculus",
      "0.5 Calculus without fear",
      "Calculus is the language of changing motion: $v=dx/dt$, $a=dv/dt$, $\\Delta x=\\int v\\,dt$, and $\\Delta v=\\int a\\,dt$. When acceleration is given as a function of position, use $a=v\\,dv/dx$. The key is to identify what is changing before choosing differentiation or integration.",
      [
        "Differentiate position to get velocity, then velocity to get acceleration.",
        "Integrate velocity to get signed displacement; if velocity becomes negative, integrate $|v|$ piecewise for distance.",
        "Use initial conditions after integrating: they supply the constants that turn a rate into the actual motion.",
      ],
    ),
  ],
  "foundation",
);

const UNITS: MasteryModule = M(
  "physics-units-depth",
  "1. Units and Measurements",
  "Measurement, SI, dimensions, significant figures, errors, and the instruments that make a number defensible.",
  [
    S(
      "units-claim",
      "1.1 Measurement is a claim with precision",
      "A physical quantity is a number multiplied by a unit. A measured value is never infinitely exact: the last reported digit reflects the instrument's resolution or uncertainty. Accuracy means closeness to the true value; precision means repeatability or fineness. A reading can be precise but inaccurate if the instrument is systematically miscalibrated.",
      [
        "Write the number and unit together; the unit is part of the physical statement.",
        "Do not report digits that the instrument cannot resolve.",
        "Random scatter affects precision; zero error and calibration affect accuracy.",
      ],
    ),
    S(
      "units-si",
      "1.2 SI base quantities you actually need",
      "The seven SI base quantities are length (metre, m), mass (kilogram, kg), time (second, s), current (ampere, A), temperature (kelvin, K), amount of substance (mole, mol), and luminous intensity (candela, cd). Derived units are combinations of these: $\\mathrm N=\\mathrm{kg\\,m\\,s^{-2}}$, $\\mathrm J=\\mathrm{kg\\,m^2\\,s^{-2}}$, and $\\mathrm{Pa}=\\mathrm{kg\\,m^{-1}s^{-2}}$.",
      [
        "Charge is derived: $\\mathrm C=\\mathrm{A\\,s}$; current itself is a base quantity.",
        "Radian and steradian are dimensionless derived units.",
        "Convert prefixes to SI before substituting; convert the final answer only at the end.",
      ],
    ),
    S(
      "units-dimensions",
      "1.3 Dimensions: the grammar checker of equations",
      "For mechanics, write dimensions in $M$, $L$, and $T$. Velocity is $[LT^{-1}]$, acceleration is $[LT^{-2}]$, force is $[MLT^{-2}]$, work is $[ML^2T^{-2}]$, power is $[ML^2T^{-3}]$, and pressure or stress is $[ML^{-1}T^{-2}]$. In an additive equation every term must have the same dimensions.",
      [
        "Recipe: assume a relation, replace each quantity by dimensions, equate powers, and solve for the unknown exponents.",
        "Dimensions cannot determine dimensionless constants such as $2$, $\\pi$, or $\\sin\\theta$.",
        "Same dimensions do not mean same physical quantity: torque and work share dimensions but not meaning or direction.",
      ],
    ),
    S(
      "units-sigfig",
      "1.4 Significant figures",
      "Significant figures record the reliable digits plus the first uncertain digit. Non-zero digits count; zeros between non-zero digits count; leading zeros do not; trailing zeros after a decimal do. In multiplication and division, the result follows the factor with the fewest significant figures. In addition and subtraction, it follows the least precise decimal place.",
      [
        "$0.004050$ has four significant figures; its leading zeros do not count but its interior and trailing decimal zeros do.",
        "Changing units does not change the information in a measurement; scientific notation makes that visible.",
        "Round once, at the end, so intermediate rounding does not contaminate the answer.",
      ],
    ),
    S(
      "units-errors",
      "1.5 Errors",
      "Absolute error is $\\Delta x$, relative error is $\\Delta x/x$, and percentage error is $100\\Delta x/x$. For sums or differences, maximum absolute errors add. For products, quotients, and powers, fractional errors add with the absolute value of each exponent: if $Q=A^2B^3/C$, then $\\Delta Q/Q=2\\Delta A/A+3\\Delta B/B+\\Delta C/C$.",
      [
        "Maximum error is a worst-case bound; independent random errors may be combined in quadrature only when the question asks for statistical uncertainty.",
        "A zero-error correction carries its sign: true reading = observed reading − zero error.",
        "Pure numbers and exact conversion factors do not carry measurement error.",
      ],
    ),
    S(
      "units-instruments",
      "1.6 Vernier and screw gauge",
      "For a vernier, reading = main-scale reading + coinciding vernier division × least count − zero error. A positive zero error is subtracted; a negative zero error is added. For a screw gauge, least count = pitch divided by the number of circular-scale divisions. The instrument decides how many digits are honest.",
      [
        "A vernier least count is commonly $1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}$.",
        "A screw gauge is usually more precise than a vernier because its least count is smaller.",
        "Do not invent a digit between scale marks just to make the result look more exact.",
      ],
    ),
  ],
  "units",
);

const STRAIGHT: MasteryModule = M(
  "physics-straight-depth",
  "2. Motion in a Straight Line",
  "Position, displacement, velocity, acceleration, graphs, free fall, relative motion, and variable acceleration in one dimension.",
  [
    S(
      "straight-position",
      "2.1 Position, displacement, distance",
      "Choose an origin and a positive direction. Position $x$ locates the particle. Displacement $\\Delta x=x_f-x_i$ is signed; distance is the total path length and is never negative. Therefore distance is always at least $|\\Delta x|$, with equality only when the object does not reverse direction.",
      [
        "A round trip can have zero displacement and non-zero distance.",
        "The sign of displacement depends on the chosen positive direction, not on whether the motion feels forward.",
        "Write the initial and final positions before deciding which formula to use.",
      ],
    ),
    S(
      "straight-speed",
      "2.2 Speed and velocity",
      "Average velocity is displacement divided by time; average speed is distance divided by time. Instantaneous velocity is $v=dx/dt$ and speed is $|v|$. For equal distances at speeds $v_1$ and $v_2$, average speed is the harmonic mean $2v_1v_2/(v_1+v_2)$; for equal times it is the arithmetic mean.",
      [
        "Velocity can be negative while speed is positive.",
        "Average velocity is not the average of the initial and final velocities unless acceleration is constant.",
        "Use the path for speed and the signed endpoint change for velocity.",
      ],
    ),
    S(
      "straight-acceleration",
      "2.3 Acceleration",
      "Acceleration is $a=dv/dt$. Negative acceleration does not automatically mean slowing down. Speed decreases when velocity and acceleration have opposite signs; it increases when they have the same sign. The sign is a direction statement, while speeding up or slowing down is a comparison of magnitudes.",
      [
        "A particle can have zero acceleration and non-zero constant velocity.",
        "At an instant of rest, acceleration may still be non-zero, as at the top of a vertical throw.",
        "Read the signs of $v$ and $a$ together before making a verbal claim.",
      ],
    ),
    S(
      "straight-suvat",
      "2.4 Constant-acceleration equations",
      "Use $v=u+at$, $s=ut+\\frac12at^2$, $v^2=u^2+2as$, and $s=(u+v)t/2$ only when acceleration is constant. Pick one positive direction once, then give $u$, $v$, $a$, and $s$ their signs. For vertical motion with up positive, $a=-g$ for the entire flight.",
      [
        "Do not apply SUVAT to a variable-acceleration motion just because the question includes time.",
        "Choose the equation that eliminates the quantity you do not know.",
        "The same sign protocol works for upward motion, downward motion, and braking.",
      ],
    ),
    S(
      "straight-graphs",
      "2.5 Graph mastery",
      "On an $x$-$t$ graph, slope is velocity. On a $v$-$t$ graph, slope is acceleration and signed area is displacement. On an $a$-$t$ graph, area is change in velocity. A turning point in $x(t)$ means $v=0$, but acceleration need not vanish there.",
      [
        "Split a $v$-$t$ graph at every zero crossing when the question asks for distance.",
        "A straight $v$-$t$ line means constant acceleration, not constant velocity.",
        "Label graph slopes and areas with units; that often catches a swapped quantity.",
      ],
    ),
    S(
      "straight-freefall",
      "2.6 Free fall and vertical throw",
      "Ignoring air resistance, every body has the same downward acceleration $g$. At the highest point of an upward throw, $v=0$ but $a=-g$. From launch speed $u$, time to the top is $u/g$, maximum height is $u^2/(2g)$, and return time to the same level is $2u/g$.",
      [
        "Free fall is not the same as rest; a dropped body has zero initial velocity but non-zero acceleration.",
        "Equal-time distances from rest follow $1:3:5:7:\\ldots$.",
        "If two bodies have the same gravitational acceleration, subtract their position equations rather than guessing their meeting time.",
      ],
    ),
    S(
      "straight-relative",
      "2.7 Relative motion in 1D",
      "Relative velocity is $v_{AB}=v_A-v_B$. If two bodies move toward each other, their approach speed is the sum of their speeds; if one chases another in the same direction, it is the difference. A catch problem is a relative-position problem, not two unrelated distance problems.",
      [
        "Write the initial separation and how fast that separation changes.",
        "A delayed start belongs in the time variable: use $t$ for one body and $t-t_0$ for the delayed one.",
        "The sign of relative velocity tells you whether separation grows or shrinks.",
      ],
    ),
    S(
      "straight-variable",
      "2.8 Variable acceleration",
      "When $x(t)$ is given, differentiate: $v=dx/dt$ and $a=d^2x/dt^2$. When $a(t)$ is given, integrate to get $v(t)$ and then $x(t)$. When $a(x)$ is given, use $a=v\\,dv/dx$ so that $v^2$ can be found without introducing time.",
      [
        "Apply initial conditions immediately after integrating.",
        "For a changing velocity, distance may require splitting the interval at each $v=0$.",
        "Check the dimensions of the integrated constant and the limiting behaviour at $t=0$.",
      ],
    ),
  ],
  "straight",
);

const PLANE: MasteryModule = M(
  "physics-plane-depth",
  "3. Motion in a Plane",
  "Resolve two-dimensional motion into two one-dimensional stories that share the same time variable.",
  [
    S(
      "plane-two-axes",
      "3.1 Two dimensions = two 1D problems sharing the same time",
      "Choose x and y, resolve the initial velocity and acceleration, and solve each axis independently. The time variable links the axes. This single idea explains projectiles, river boats, rain-man questions, and many relative-velocity problems.",
      [
        "No horizontal acceleration in ideal projectile motion; vertical acceleration is $-g$.",
        "Use vector components for the motion, then reconstruct speed and direction only when asked.",
        "The same time must satisfy both the x and y equations at a meeting point.",
      ],
    ),
    S(
      "plane-projectile",
      "3.2 Projectile motion",
      "For launch speed $u$ at angle $\\theta$ on level ground, $x=u\\cos\\theta\\,t$ and $y=u\\sin\\theta\\,t-\\frac12gt^2$. Therefore $T=2u\\sin\\theta/g$, $H=u^2\\sin^2\\theta/(2g)$, and $R=u^2\\sin2\\theta/g$. Maximum range occurs at $45^\\circ$; complementary angles have the same range.",
      [
        "At the highest point, vertical velocity is zero but acceleration remains downward.",
        "The range formulas assume the launch and landing levels are the same.",
        "Use components first; memorised range formulas are a special case, not the model.",
      ],
    ),
    S(
      "plane-trajectory",
      "3.3 Trajectory equation",
      "Eliminating time gives $y=x\\tan\\theta-\\frac{gx^2}{2u^2\\cos^2\\theta}$. The path is a parabola because the horizontal coordinate grows linearly with time while the vertical coordinate contains a quadratic term. This form is useful when a projectile must pass through a specified point.",
      [
        "A point-on-trajectory question asks you to substitute coordinates into the equation and compare.",
        "The coefficient of $x^2$ controls curvature; larger launch speed makes the trajectory flatter.",
        "Do not confuse the trajectory equation with the equation of motion in time.",
      ],
    ),
    S(
      "plane-relative",
      "3.4 Relative velocity in 2D",
      "Always subtract vectors: $\\vec v_{A/B}=\\vec v_A-\\vec v_B$. In river problems, minimum time means maximising the cross-river component; shortest path means cancelling the current's downstream drift. Rain-man problems are the same subtraction with different nouns.",
      [
        "Draw the ground, water, rain, and object velocity arrows before resolving.",
        "The velocity of a swimmer relative to water is not the same as velocity relative to the bank.",
        "For a target direction, impose the desired relative component first, then solve the remaining component.",
      ],
    ),
    S(
      "plane-circular",
      "3.5 Uniform circular motion",
      "In uniform circular motion speed is constant, but velocity changes direction. The acceleration points toward the centre and has magnitude $a_c=v^2/r=\\omega^2r$, with $v=\\omega r$. This is kinematics; the real force that supplies this inward acceleration belongs to Laws of Motion.",
      [
        "Centripetal force is not a new force; it is the name for the net inward real force.",
        "Tangential acceleration is zero in uniform circular motion.",
        "Convert rpm to radians per second before using $v=\\omega r$.",
      ],
    ),
  ],
  "plane",
);

const NLM: MasteryModule = M(
  "physics-nlm-depth",
  "4. Laws of Motion",
  "Free-body diagrams, Newton's laws, friction, connected systems, lifts, pseudo force, and circular dynamics.",
  [
    S(
      "nlm-fbd",
      "4.1 The central skill: draw the free-body diagram",
      "Isolate one body, draw only the forces acting on that body, choose axes that simplify the geometry, resolve forces, and write $\\sum F_x=ma_x$ and $\\sum F_y=ma_y$. Do not draw $ma$ as a real force in an inertial-frame free-body diagram.",
      [
        "A free-body diagram is for one body; a system diagram can hide internal forces deliberately.",
        "Normal is perpendicular to the contact, tension pulls along the string, and friction lies along the contact.",
        "Choose axes along an incline or along a string whenever that removes components.",
      ],
    ),
    S(
      "nlm-laws",
      "4.2 Newton's laws",
      "Newton I defines inertial motion. Newton II is $\\sum\\vec F_{\\rm ext}=d\\vec p/dt$ and becomes $\\sum\\vec F=m\\vec a$ for constant mass. Newton III says interaction forces are equal and opposite, but they act on different bodies, so they do not cancel in one body's FBD.",
      [
        "Acceleration follows the net force, not the largest individual force.",
        "Internal forces cancel only when writing the equation for the complete isolated system.",
        "State the frame before applying Newton's second law.",
      ],
    ),
    S(
      "nlm-forces",
      "4.3 Common forces",
      "Weight $mg$ acts vertically downward. The normal force is perpendicular to a surface and is not automatically $mg$. Tension pulls away from a body along a string. Friction acts along a surface against relative or impending relative motion. A spring exerts $F=-kx$ along its displacement.",
      [
        "A force label describes an interaction; it does not tell you its magnitude before the equations are solved.",
        "Normal force changes in lifts, inclines, circular paths, and accelerating frames.",
        "The spring's restoring direction is toward its natural length.",
      ],
    ),
    S(
      "nlm-friction",
      "4.4 Friction correctly",
      "Static friction is self-adjusting: $0\\le f_s\\le\\mu_sN$. It takes whatever value is needed to prevent slipping until the limiting value is reached. Once sliding, the ideal kinetic model is $f_k=\\mu_kN$. Static friction is not always $\\mu_sN$.",
      [
        "First assume no slip, solve the required friction, then compare it with $\\mu_sN$.",
        "If the required value exceeds the limit, the assumed state is impossible and the body slips.",
        "Friction opposes relative motion or impending relative motion, not necessarily the velocity of the centre of mass.",
      ],
    ),
    S(
      "nlm-constraints",
      "4.5 Connected bodies and constraints",
      "For light inextensible strings and smooth pulleys, connected bodies share compatible accelerations. Write the system equation first to find the common acceleration, then isolate one block to find tension or contact force. A constraint is a relationship between motions; it is not an extra force.",
      [
        "Use the string-length equation when a pulley arrangement has more than one moving segment.",
        "Internal tension cancels in the whole-system equation but remains in a single-body equation.",
        "For contact blocks, the contact force is found after the shared acceleration is known.",
      ],
    ),
    S(
      "nlm-lift",
      "4.6 Lift",
      "A scale reads the normal force. For a person of mass $m$ in a lift, $N=m(g+a)$ when accelerating upward and $N=m(g-a)$ when accelerating downward. In free fall $N=0$. The sensation of heaviness is a larger normal force, not a larger gravitational field.",
      [
        "Ask for the lift's acceleration direction, not just whether it is moving up or down.",
        "At constant velocity, $a=0$ and the scale reads $mg$.",
        "The same equations can be derived using an effective gravity in the lift frame.",
      ],
    ),
    S(
      "nlm-pseudo",
      "4.7 Non-inertial frames and pseudo force",
      "A frame accelerating with $\\vec a_{\\rm frame}$ requires a pseudo force $-m\\vec a_{\\rm frame}$ on every mass when you want to use equilibrium-style equations in that frame. It is not a new interaction; it accounts for the frame's acceleration.",
      [
        "Pseudo force points opposite to the acceleration of the chosen frame.",
        "Do not add pseudo force in an inertial laboratory frame.",
        "Choose the frame that makes the geometry or relative rest state simpler, then stay consistent.",
      ],
    ),
    S(
      "nlm-circular",
      "4.8 Circular dynamics",
      "For circular motion, the inward radial equation is $\\sum F_{\\rm inward}=mv^2/r$. The centripetal force is the net inward component of real forces: friction on a level road, normal and weight on a bank, tension in a string, or combinations of these.",
      [
        "Write the radial equation separately from the tangential equation.",
        "On a level road, static friction supplies the maximum speed condition $mv^2/r\\le\\mu_smg$.",
        "A banking angle can provide centripetal acceleration through the horizontal component of the normal force.",
      ],
    ),
  ],
  "nlm",
);

const WEP: MasteryModule = M(
  "physics-wep-depth",
  "5. Work, Energy and Power",
  "Work as energy transfer, variable force, potential energy, power, vertical circles, and collisions.",
  [
    S(
      "wep-work",
      "5.1 Work is energy transfer by force along displacement",
      "For a constant force, $W=\\vec F\\cdot\\vec s=Fs\\cos\\theta$. Positive work adds kinetic energy; negative work removes it; a perpendicular force does no instantaneous work. Work is a scalar even though force and displacement are vectors.",
      [
        "Gravity does positive work while an object descends and negative work while it rises.",
        "Normal force often does zero work when the displacement is along a smooth surface.",
        "The sign of work is determined by the angle between force and displacement.",
      ],
    ),
    S(
      "wep-variable",
      "5.2 Variable force",
      "For a one-dimensional variable force, $W=\\int F_x\\,dx$. Geometrically, work is the signed area under the $F$-$x$ graph. Areas below the x-axis represent negative work, and a changing force must not be replaced by its final value unless a justified average is used.",
      [
        "Read the graph in the direction of displacement.",
        "Break a piecewise force graph into rectangles, triangles, and signed regions.",
        "The slope of an $F$-$x$ graph is not work; its area is.",
      ],
    ),
    S(
      "wep-theorem",
      "5.3 Work-energy theorem",
      "The net work done by all real forces equals the change in kinetic energy: $W_{\\rm net}=K_f-K_i$. This method is especially efficient when force depends on position or when the time history is irrelevant. It is Newton's law integrated along the path.",
      [
        "Use net work, not the work of one convenient force, unless the other works are included separately.",
        "If the object starts from rest, $K_i=0$; do not silently assume that in a moving-body question.",
        "Work-energy gives speed directly, but not always the time taken.",
      ],
    ),
    S(
      "wep-potential",
      "5.4 Potential energy and conservative forces",
      "For a conservative force, $W_{\\rm cons}=-\\Delta U$ and in one dimension $F=-dU/dx$. Near Earth $U_g=mgh$; for a spring $U_s=\\frac12kx^2$. If only conservative forces do work, $K+U$ is constant. With friction or an external agent, use $\\Delta(K+U)=W_{\\rm nonconservative}$.",
      [
        "The zero of potential energy is arbitrary; differences and total-energy equations are physical.",
        "A local minimum of $U(x)$ is stable equilibrium; a local maximum is unstable.",
        "The negative gradient explains why a particle rolls toward lower potential energy.",
      ],
    ),
    S(
      "wep-power",
      "5.5 Power",
      "Average power is $W/\\Delta t$ and instantaneous power is $P=\\vec F\\cdot\\vec v$. A large force can deliver zero power if it is perpendicular to velocity, as in ideal uniform circular motion. Power is the rate of energy transfer, not the amount of energy.",
      [
        "Use watts only after the work and time units are consistent.",
        "For a variable force, $P=dW/dt=\\vec F\\cdot\\vec v$ remains the local rule.",
        "A motor's force and speed can trade off at fixed power.",
      ],
    ),
    S(
      "wep-circle",
      "5.6 Vertical circle",
      "For a string to remain taut, tension cannot become negative. At the limiting top point, $T=0$ and $mv_{\\rm top}^2/r=mg$, so $v_{\\rm top,min}=\\sqrt{gr}$. Energy between bottom and top then gives $v_{\\rm bottom,min}=\\sqrt{5gr}$.",
      [
        "Write the radial equation at the critical point before using energy.",
        "The string condition and the track-contact condition are different physical boundaries.",
        "Do not use a constant-acceleration equation around the loop; the direction of acceleration changes.",
      ],
    ),
    S(
      "wep-collisions",
      "5.7 Collisions",
      "For an isolated system, momentum is conserved in every collision. Kinetic energy is conserved only in an elastic collision. In a perfectly inelastic collision bodies stick together. The coefficient of restitution is $e=$ relative speed of separation divided by relative speed of approach. Total energy is still conserved when mechanical kinetic energy becomes heat, sound, or deformation.",
      [
        "Check external impulse before writing momentum conservation.",
        "Use momentum plus restitution for a one-dimensional partially elastic collision.",
        "Perfectly inelastic means maximum kinetic-energy loss for the given initial momentum, not loss of total energy.",
      ],
    ),
  ],
  "wep",
);

const SOLIDS: MasteryModule = M(
  "physics-solids-depth",
  "6. Mechanical Properties of Solids",
  "Elasticity, stress, strain, moduli, wire-spring equivalence, stress-strain curves, and elastic energy.",
  [
    S(
      "solids-elasticity",
      "6.1 Elasticity: force changes shape; material pushes back",
      "Within the elastic regime, remove the deforming force and the body approximately returns to its original shape. Plastic deformation remains after unloading. Elasticity is a material response, not the claim that a body is perfectly rigid.",
      [
        "The elastic limit is a boundary of the model; beyond it, Hooke's law need not apply.",
        "A stiff material resists deformation; a strong material tolerates high stress before failure. These are different properties.",
        "A material can be elastic and still deform noticeably if its modulus is small.",
      ],
    ),
    S(
      "solids-stress",
      "6.2 Stress and strain",
      "Stress is restoring force per unit area and has pressure dimensions. Strain is fractional deformation and is dimensionless. Longitudinal stress pairs with longitudinal strain, pressure change with volume strain, and tangential stress with shear strain.",
      [
        "Normal stress can be tensile or compressive; shear stress changes shape by sliding layers.",
        "Use the original area and length for the small-deformation definitions used in school problems.",
        "A thinner wire experiences larger stress for the same force because $\\sigma=F/A$.",
      ],
    ),
    S(
      "solids-moduli",
      "6.3 Hooke's law and moduli",
      "In the linear elastic region, stress is proportional to strain. Young's modulus is $Y=(F/A)/(\\Delta L/L)$, so $\\Delta L=FL/(AY)$. Bulk modulus is $K=-\\Delta P/(\\Delta V/V)$, and shear modulus is shear stress divided by shear strain. All elastic moduli have units of pascal.",
      [
        "The minus sign in bulk modulus keeps $K$ positive when pressure increase causes volume decrease.",
        "Never select a modulus from the symbol alone; first identify the deformation.",
        "Hooke's law is a linear-region statement, not a universal law for every load.",
      ],
    ),
    S(
      "solids-wire-spring",
      "6.4 Wire ↔ spring bridge",
      "Rearrange the extension law as $F=(YA/L)\\Delta L$. A uniform wire therefore behaves like a spring with stiffness $k=YA/L$. Longer wires are softer; larger-area wires and larger-$Y$ materials are stiffer. Series and parallel wire questions can be solved with spring-combination logic.",
      [
        "Series wires carry the same force and their extensions add.",
        "Parallel wires have the same extension and their stiffnesses add.",
        "If radius doubles, area becomes four times and extension becomes one quarter for the same load.",
      ],
    ),
    S(
      "solids-curve",
      "6.5 Stress-strain curve",
      "The initial slope of a stress-strain curve is Young's modulus. The elastic limit and yield region mark the transition toward permanent deformation. Ultimate tensile stress is the maximum engineering stress; fracture follows. Stiffness, strength, and toughness describe different parts of the material story.",
      [
        "The area under the curve up to fracture is related to toughness, not simply stiffness.",
        "A steep initial slope means a large modulus; it does not automatically mean a high ultimate stress.",
        "After yielding, unloading can leave permanent strain.",
      ],
    ),
    S(
      "solids-energy",
      "6.6 Elastic energy",
      "For linear loading, elastic energy density is the area under the stress-strain graph: $u=\\frac12\\sigma\\epsilon=\\sigma^2/(2Y)=\\frac12Y\\epsilon^2$. For a wire, total stored energy is $U=F^2L/(2AY)$. Geometry controls how much energy a loaded body can store.",
      [
        "Use volume × energy density for a three-dimensional body.",
        "A thinner wire stretches more but does not automatically store more energy under the same force and length.",
        "Check that an energy result has units of joules, not pascals or metres.",
      ],
    ),
  ],
  "solids",
);

const MIXED: MasteryModule = M(
  "physics-mixed-mastery",
  "Final Mixed Mastery",
  "A short decision tree that forces the toolkit, kinematics, dynamics, energy, and material models to talk to each other.",
  [
    S(
      "mixed-decision-tree",
      "The 30-second mechanics decision tree",
      "First name the object and the system boundary. Then choose the representation: components for a vector, graph slope or area for changing motion, a free-body diagram for forces, work-energy for position-dependent forces, momentum for an isolated collision, or stress-strain for deformation. Only then select a formula.",
      [
        "Ask whether the question is about time, force, energy, momentum, or deformation.",
        "Write one limiting or sign check before calculating.",
        "If the answer changes in the wrong direction when a length, mass, or area is scaled, revisit the model.",
      ],
    ),
    S(
      "mixed-standard",
      "Mastery standard",
      "A chapter is not green because the formula looks familiar. It is green when you can close the explanation, reproduce the model on paper, solve a worked archetype, and choose an option without peeking. L1 checks vocabulary; L2 checks the standard move; L3 exposes a JEE trap; L4 combines models.",
      [
        "Use the level filter to move from recognition to transfer.",
        "For every wrong option, write the mistaken model in your error log.",
        "Return to the exact concept block that caused the miss before retrying.",
      ],
    ),
  ],
  "mixed",
  false,
);

export const PHYSICS_MASTERY_COURSE: Record<string, Partial<ChapterContent>> = {
  "phy-units": { mastery: [TOOLKIT, UNITS] },
  "phy-motion-1d": { mastery: [STRAIGHT] },
  "phy-motion-2d": { mastery: [PLANE] },
  "phy-nlm": { mastery: [NLM] },
  "phy-wep": { mastery: [WEP] },
  "phy-solids": { mastery: [SOLIDS, MIXED] },
};
