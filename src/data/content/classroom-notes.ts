import type { ChapterContent } from "../types";
import { F, T } from "./pack";

/** Definition-first class notes, structured like a classroom notebook. */
export const CLASSROOM_NOTES: Record<string, Partial<ChapterContent>> = {
  "phy-units": {
    classNotes: [
      T(
        "cn-units-measure",
        "Measurement and units",
        "Measurement of any physical quantity is a comparison with a basic, arbitrarily chosen, internationally accepted reference standard called a **unit**. The result is a number (numerical measure) accompanied by a unit — e.g. $4\\,\\mathrm{m}$.",
        {
          bullets: [
            "**Fundamental quantities** are independent of each other; every other quantity is expressed in terms of them. Their units are **fundamental (base) units**.",
            "**Derived quantities** are built from base quantities. Their units are **derived units**.",
            "Older systems: CGS (cm, g, s), FPS (foot, pound, s), MKS (m, kg, s). The internationally accepted system is **SI** (Système International d’Unités, 1971).",
            "SI has **seven base units**: metre, kilogram, second, ampere, kelvin, mole, candela.",
            "Two supplementary dimensionless units: **radian** ($d\\theta=ds/r$) and **steradian** ($d\\Omega=dA/r^{2}$).",
            "One radian: angle at the centre of a circle subtended by an arc equal to the radius. One steradian: solid angle subtended by a spherical patch of area $r^{2}$.",
          ],
          callout: {
            kind: "board",
            text: "Write the seven base units by name, symbol and (for boards) the modern definition. JEE rarely asks the cesium-clock wording; it does ask prefixes and homogeneity.",
          },
        },
      ),
      T(
        "cn-units-dim",
        "Dimensions, dimensional formula, dimensional equation",
        "The **dimensions** of a physical quantity are the powers to which the base quantities are raised to represent it. We write them in square brackets: length $[L]$, mass $[M]$, time $[T]$, current $[A]$, temperature $[K]$, amount $[\\mathrm{mol}]$, luminous intensity $[\\mathrm{cd}]$. Magnitudes are ignored — initial, average and instantaneous velocity all have $[LT^{-1}]$.",
        {
          bullets: [
            "**Dimensional formula** shows which base quantities enter and with what powers. Volume $[M^{0}L^{3}T^{0}]$, speed $[M^{0}LT^{-1}]$, acceleration $[M^{0}LT^{-2}]$, density $[ML^{-3}T^{0}]$, force $[MLT^{-2}]$.",
            "A **dimensional equation** equates a quantity to its formula: $[F]=[MLT^{-2}]$.",
            "Force $=\\mathrm{mass}\\times(\\mathrm{length}/\\mathrm{time})^{2}$ so $[F]=[M][L]/[T]^{2}=[MLT^{-2}]$.",
            "Work, energy and torque share $[ML^{2}T^{-2}]$ but torque is an axial vector; energy is a scalar.",
          ],
        },
      ),
      T(
        "cn-units-apps",
        "Three applications of dimensional analysis",
        "(1) **Homogeneity (consistency).** Only quantities of the same dimensions may be added or subtracted. In $x=x_{0}+v_{0}t+\\tfrac12 at^{2}$ every term is $[L]$, so the equation is dimensionally allowed. A dimensionally wrong equation is certainly wrong; a dimensionally correct one need not be exact (a missing $2\\pi$ is invisible).",
        {
          bullets: [
            "(2) **Deducing a relation.** If $T=k\\,\\ell^{x}g^{y}m^{z}$ for a simple pendulum, equate $[T]=[L]^{x}[LT^{-2}]^{y}[M]^{z}$. Then $z=0$, $-2y=1$, $x+y=0$ so $x=1/2$, $y=-1/2$. Hence $T=k\\sqrt{\\ell/g}$. The $2\\pi$ is not fixed.",
            "(3) **Conversion of units.** If $[Q]=M^{a}L^{b}T^{c}$ then $n_{2}=n_{1}(M_{1}/M_{2})^{a}(L_{1}/L_{2})^{b}(T_{1}/T_{2})^{c}$. Example: $1\\,\\mathrm{J}=10^{7}\\,\\mathrm{erg}$ because $1\\,\\mathrm{kg}=10^{3}\\,\\mathrm{g}$, $1\\,\\mathrm{m}=10^{2}\\,\\mathrm{cm}$.",
            "**Significant figures.** $0.02340$ has four (leading zeros do not count; trailing zeros after a decimal do). A product is quoted to the fewest figures of its factors; a sum to the coarsest decimal place.",
            "Error of a sum: $\\Delta(a\\pm b)=\\Delta a+\\Delta b$. Product/quotient: relative errors add. Power: $\\Delta(a^{n})/a^{n}=|n|\\Delta a/a$.",
          ],
          callout: {
            kind: "trap",
            text: "Dimensions never catch a missing dimensionless factor, a wrong sign, or a missing $\\cos\\theta$. Kill options by homogeneity first, then compute.",
          },
        },
      ),
      T(
        "cn-units-si",
        "The seven SI base units",
        "SI (1971) is the only system JEE and boards expect. Two supplementary dimensionless units sit beside the seven: the **radian** and the **steradian**.",
        {
          table: {
            headers: ["Base quantity", "Unit", "Symbol"],
            rows: [
              ["Length", "metre", "m"],
              ["Mass", "kilogram", "kg"],
              ["Time", "second", "s"],
              ["Electric current", "ampere", "A"],
              ["Thermodynamic temperature", "kelvin", "K"],
              ["Amount of substance", "mole", "mol"],
              ["Luminous intensity", "candela", "cd"],
            ],
          },
          bullets: [
            "**One radian:** angle at the centre of a circle subtended by an arc equal to the radius. $d\\theta=ds/r$.",
            "**One steradian:** solid angle subtended at the centre of a sphere by a patch of area $r^{2}$. $d\\Omega=dA/r^{2}$.",
            "CGS: cm, g, s. FPS: foot, pound, s. MKS: m, kg, s. Do not mix them inside one formula.",
          ],
        },
      ),
      T(
        "cn-units-sigfig",
        "Significant figures — the classroom rules",
        "The reported result includes **all digits known reliably plus the first uncertain digit**. If $T=1.62\\,\\mathrm{s}$, 1 and 6 are certain, 2 is uncertain — three significant figures.",
        {
          bullets: [
            "All non-zero digits count. Zeros **between** non-zero digits count, decimal or not.",
            "If the number is less than 1, zeros after the decimal **but before** the first non-zero digit do **not** count. $0.002308$ has four.",
            "Trailing zeros **without** a decimal do not count: $123\\,\\mathrm{m}=12300\\,\\mathrm{cm}$ still has three. Trailing zeros **with** a decimal **do** count: $3.500$ has four.",
            "The leading zero in $0.1250$ is never significant; the trailing zero is.",
            "**Change of unit does not change significant figures** if you use scientific notation: $4.700\\,\\mathrm{m}=4.700\\times 10^{2}\\,\\mathrm{cm}$ still has four. $4700\\,\\mathrm{mm}$ written without a decimal looks like two — that is why scientific notation exists.",
            "**Product / quotient:** keep as many figures as the factor with the fewest. $5.74/1.2=4.8$ (two figures).",
            "**Sum / difference:** keep as many **decimal places** as the coarsest term. $436.32+227.2+0.301=663.8$ (one decimal).",
            "**Rounding:** digit $>5$ raises the previous; $<5$ leaves it. Exactly $5$: previous even stays, previous odd rises. $2.745\\to 2.74$, $2.735\\to 2.74$.",
          ],
          callout: {
            kind: "board",
            text: "Boards love $0.02340$ (four figures) and the density $5.74/1.2=4.8$, not $4.78$.",
          },
        },
      ),
      T(
        "cn-units-acc",
        "Accuracy, precision, parallax, oleic acid",
        "**Accuracy** is closeness to the true value. **Precision** is the resolution of the instrument. A $0.1\\,\\mathrm{cm}$ reading of $3.5\\,\\mathrm{cm}$ against a true $3.678\\,\\mathrm{cm}$ is more accurate but less precise than a $0.01\\,\\mathrm{cm}$ reading of $3.38\\,\\mathrm{cm}$.",
        {
          bullets: [
            "**Parallax:** the apparent shift of an object against a distant background when the eye moves. Basis $=$ distance between the two observation points.",
            "Planet distance: from two observatories a distance $b$ apart, parallax angle $\\theta$ (radians) gives $D=b/\\theta$.",
            "Angular diameter $\\alpha$ of the planet then gives size $d=\\alpha D$.",
            "**Oleic-acid film:** a known volume of diluted oleic acid spreads to area $A$ as a monomolecular layer. Thickness $t=V/A\\sim 10^{-9}\\,\\mathrm{m}$ — the molecular size.",
            "Screw gauge is more precise than a vernier because its least count is smaller ($0.01\\,\\mathrm{mm}$ vs $0.1\\,\\mathrm{mm}$).",
          ],
          diagram: "parallax",
        },
      ),
    ],
    formulas: [
      F("Plane angle", "d\\theta = ds/r\\quad(\\mathrm{rad})"),
      F("Solid angle", "d\\Omega = dA/r^{2}\\quad(\\mathrm{sr})"),
      F("Force dimensions", "[F]=[MLT^{-2}]"),
      F("Unit conversion", "n_{2}=n_{1}\\prod_{i}(u_{1i}/u_{2i})^{a_{i}}"),
      F("Joule to erg", "1\\,\\mathrm{J}=10^{7}\\,\\mathrm{erg}"),
    ],
  },
  "phy-motion-1d": {
    classNotes: [
      T(
        "cn-1d-defs",
        "Motion, rest, frame, and the three branches",
        "**Motion:** an object is in motion if its position changes with time, specified from a chosen origin. On a line, right of the origin is positive, left is negative. **Rest:** position does not change with respect to the surroundings as time passes. Rest and motion are **relative** — a driver is in motion relative to the road and at rest relative to a co-passenger.",
        {
          bullets: [
            "**Mechanics** studies motion of physical bodies. **Statics** — bodies at rest. **Kinematics** — motion without asking what causes it. **Dynamics** — motion with the causes (forces).",
            "**Frame of reference:** three mutually perpendicular axes plus a clock. The intersection is the origin $O$. Coordinates $(x,y,z)$ locate the object.",
            "**Point mass:** an object may be treated as a point if the distances it covers are much greater than its own size.",
            "**Rectilinear motion:** motion along a straight line.",
          ],
          diagram: "vt-graph",
        },
      ),
      T(
        "cn-1d-dist",
        "Distance, displacement, speed, velocity, acceleration",
        "**Distance** is the length of the actual path. Scalar. SI unit $\\mathrm{m}$. **Displacement** is final position minus initial position. Vector. SI unit $\\mathrm{m}$.",
        {
          bullets: [
            "**Scalar:** magnitude only (mass, length, time, distance, speed, work, temperature).",
            "**Vector:** magnitude and direction, obeys triangle/parallelogram law (displacement, velocity, acceleration, force, momentum, torque).",
            "**Average speed** $=\\dfrac{\\text{total path length}}{\\text{total time}}$. Scalar, $\\mathrm{m\\,s^{-1}}$.",
            "**Average velocity** $\\bar v=(x_{2}-x_{1})/(t_{2}-t_{1})=\\Delta x/\\Delta t$. Vector.",
            "If motion is along a straight line **and** in one direction, $|\\text{displacement}|=$ path length, so $|\\bar v|=$ average speed. This is **not** always true (a round trip has $\\bar v=0$ but nonzero average speed).",
            "**Instantaneous velocity** $v=\\lim_{\\Delta t\\to 0}\\Delta x/\\Delta t=dx/dt$ — slope of the $x$–$t$ graph.",
            "**Average acceleration** $a=(v_{2}-v_{1})/(t_{2}-t_{1})$. SI $\\mathrm{m\\,s^{-2}}$. **Instantaneous** $a=dv/dt=d^{2}x/dt^{2}$.",
            "Acceleration can come from a change of speed, a change of direction, or both. It can be positive, negative or zero.",
          ],
          callout: {
            kind: "board",
            text: "Area under a $v$–$t$ graph is displacement (signed). Area using $|v|$ is distance. Slope of $v$–$t$ is $a$; slope of $x$–$t$ is $v$.",
          },
        },
      ),
      T(
        "cn-1d-suvat",
        "Uniformly accelerated motion (SUVAT) — graphical and calculus",
        "When $a$ is constant: $v=u+at$, $s=ut+\\tfrac12 at^{2}$, $v^{2}=u^{2}+2as$, $s_{n}=u+\\tfrac12 a(2n-1)$ (distance in the $n$th second). Free fall from rest: distances in equal times stand as $1:3:5:7:\\ldots$",
        {
          bullets: [
            "Graphical $v=u+at$: the $v$–$t$ graph is a straight line of slope $a$; intercept $u$; area is $s$.",
            "Calculus: $a=dv/dt$ so $v=u+\\int a\\,dt$. Then $v=dx/dt$ so $x=x_{0}+\\int v\\,dt$.",
            "Relative velocity in 1-D: $\\vec v_{AB}=\\vec v_{A}-\\vec v_{B}$. Opposite directions add in magnitude.",
          ],
        },
      ),
      T(
        "cn-1d-graphs",
        "Reading $x$–$t$, $v$–$t$, $a$–$t$ like a board question",
        "A graph is not decoration. Boards and Main both ask you to **read** one and to **draw** one from a word problem.",
        {
          bullets: [
            "**$x$–$t$:** slope is velocity. A straight line = uniform velocity. A parabola opening up (positive $a$) if $x$ is increasing faster; the tangent at a turning point is horizontal $\\Rightarrow v=0$.",
            "**$v$–$t$:** slope is acceleration. Area between the curve and the time axis is **displacement** (signed). Area using $|v|$ is **distance**. A triangle from rest to $v$ in time $t$ has $s=\\tfrac12 vt$.",
            "**$a$–$t$:** area is $\\Delta v$.",
            "Free fall from rest: distances in equal times $1:3:5:7:\\ldots$ because $s_{n}=\\tfrac12 g(2n-1)\\tau^{2}$.",
            "If two bodies are dropped from different heights at the same instant, the **difference of heights stays constant** until the lower one hits.",
          ],
          diagram: "vt-graph",
          callout: {
            kind: "trap",
            text: "Average speed is (path)/(time), not $\\Delta x/\\Delta t$. A round trip has $\\bar v=0$ and a large average speed. Do not mix them.",
          },
        },
      ),
    ],
  },
  "phy-motion-2d": {
    classNotes: [
      T(
        "cn-2d-vec",
        "Scalars, vectors, and the algebra you actually use",
        "A **scalar** has magnitude only and combines by ordinary algebra (distance, mass, temperature, time). A **vector** has magnitude **and** direction and obeys the triangle / parallelogram law (displacement, velocity, acceleration, force).",
        {
          bullets: [
            "**Position vector** $\\vec r=\\overrightarrow{OP}$ from origin to the object. **Displacement** $\\overrightarrow{PP'}=\\vec r'-\\vec r$.",
            "**Equality:** $\\vec A=\\vec B$ iff same magnitude **and** same direction (parallel equal arrows, even if tails differ).",
            "Multiplication by a real number $k$: magnitude $|k||A|$, direction same if $k>0$, opposite if $k<0$.",
            "**Unit vector** $\\hat A=\\vec A/|A|$. Resolution in a plane: $\\vec A=A_{x}\\hat\\imath+A_{y}\\hat\\jmath$ with $A_{x}=A\\cos\\theta$, $A_{y}=A\\sin\\theta$.",
            "**Scalar (dot) product** $\\vec A\\cdot\\vec B=AB\\cos\\theta=A_{x}B_{x}+A_{y}B_{y}+A_{z}B_{z}$. Commutative. Zero iff perpendicular (or one is zero).",
            "**Vector (cross) product** $\\vec A\\times\\vec B=AB\\sin\\theta\\,\\hat n$, right-hand rule. Anti-commutative: $\\vec A\\times\\vec B=-\\vec B\\times\\vec A$. $\\vec A\\perp(\\vec A\\times\\vec B)$.",
          ],
          diagram: "projectile",
        },
      ),
      T(
        "cn-2d-proj",
        "Motion in a plane: projectile and uniform circular motion",
        "**Projectile** (no air): independent $x$ (uniform) and $y$ (uniform $a=-g$). $u_{x}=u\\cos\\theta$, $u_{y}=u\\sin\\theta$.",
        {
          bullets: [
            "Path: $y=x\\tan\\theta-\\dfrac{gx^{2}}{2u^{2}\\cos^{2}\\theta}$ (parabola).",
            "Time of flight $T=\\dfrac{2u\\sin\\theta}{g}$. Maximum height $H=\\dfrac{u^{2}\\sin^{2}\\theta}{2g}$. Range $R=\\dfrac{u^{2}\\sin 2\\theta}{g}$.",
            "$R_{\\max}=u^{2}/g$ at $\\theta=45^{\\circ}$. $H_{\\max}$ for that shot is $R_{\\max}/4$. Complementary angles $30^{\\circ}$ and $60^{\\circ}$ share $R$.",
            "**Uniform circular motion:** speed constant, velocity **not** (direction changes), acceleration $a=v^{2}/r$ radial, **not** constant as a vector. $\\omega=2\\pi/T$, $v=\\omega r$.",
            "Relative velocity of rain / river: $\\vec v_{\\mathrm{rain,man}}=\\vec v_{\\mathrm{rain}}-\\vec v_{\\mathrm{man}}$. Hold the umbrella along $\\vec v_{\\mathrm{rain,man}}$.",
          ],
          callout: {
            kind: "main",
            text: "Horizontal projection from a cliff: $t=\\sqrt{2h/g}$ (the $u_{x}$ does not enter the time). Impact speed $\\sqrt{u^{2}+2gh}$.",
          },
        },
      ),
      T(
        "cn-2d-add",
        "Adding vectors, resolving, and the two products",
        "To add $\\vec A$ and $\\vec B$: place the tail of $\\vec B$ on the head of $\\vec A$ (triangle law) or complete the parallelogram on a common tail. Magnitude of the sum: $|\\vec A+\\vec B|=\\sqrt{A^{2}+B^{2}+2AB\\cos\\theta}$.",
        {
          bullets: [
            "If $|\\vec A+\\vec B|=|\\vec A-\\vec B|$ then $\\vec A\\perp\\vec B$.",
            "Unit vectors $\\hat\\imath,\\hat\\jmath,\\hat k$ along $x,y,z$. $\\vec A\\cdot\\vec B=A_{x}B_{x}+A_{y}B_{y}+A_{z}B_{z}$. $\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\A_{x}&A_{y}&A_{z}\\\\B_{x}&B_{y}&B_{z}\\end{vmatrix}$.",
            "Work $W=\\vec F\\cdot\\vec s$. Torque $\\vec\\tau=\\vec r\\times\\vec F$.",
            "Rain / river: $\\vec v_{\\mathrm{rain,man}}=\\vec v_{\\mathrm{rain}}-\\vec v_{\\mathrm{man}}$. Hold the umbrella along that vector. To cross a river in shortest time, swim **perpendicular to the banks**; drift is $v_{\\mathrm{current}}\\times t$.",
            "UCM: $a=v^{2}/r$ is **not** a constant vector — its direction (towards the centre) keeps turning. Speed is constant; velocity is not.",
          ],
        },
      ),
    ],
  },
  "phy-nlm": {
    classNotes: [
      T(
        "cn-nlm-force",
        "Force, Aristotle’s fallacy, Galileo, inertia",
        "**Force** is an external push or pull that (i) produces or tries to produce motion in a body at rest, (ii) stops or tries to stop a moving body, or (iii) changes or tries to change the direction of motion.",
        {
          bullets: [
            "**Aristotle’s fallacy:** “an external force is required to keep a body in uniform motion.” Flawed — in practice a force is needed only to cancel friction. With no friction, uniform motion persists by itself.",
            "**Galileo’s double incline:** a ball released on a smooth plane climbs to (nearly) the same height on the other. Flatten the second plane and the ball travels farther to reach that height. In the limit of a horizontal plane it travels forever. Rest and uniform linear motion are equivalent.",
            "**Inertia:** the inherent property by which a body cannot, by itself, change its state of rest or of uniform motion along a straight line. Inertia $\\propto$ mass.",
            "**Newton I:** a body continues in rest or uniform straight-line motion unless a **net unbalanced external** force acts.",
          ],
          diagram: "galileo",
          callout: {
            kind: "board",
            text: "Boards love the Galileo paragraph and the sentence ‘action and reaction act on different bodies, so they never cancel’.",
          },
        },
      ),
      T(
        "cn-nlm-ii-iii",
        "Momentum, Newton II, impulse, Newton III, momentum conservation",
        "**Momentum** $\\vec p=m\\vec v$. Vector. SI $\\mathrm{kg\\,m\\,s^{-1}}$.",
        {
          bullets: [
            "**Newton II:** rate of change of momentum is proportional to the applied force and is in the direction of the force. $\\vec F=d\\vec p/dt$. For constant mass, $\\vec F=m\\vec a$. The SI unit of force is defined from this: $1\\,\\mathrm{N}=1\\,\\mathrm{kg\\,m\\,s^{-2}}$. Components: $F_{x}=ma_{x}$ etc.",
            "**Impulse** $=\\vec F\\Delta t=\\Delta\\vec p$. Useful when a large force acts for a short time (bat on ball, bullet in block) and the body barely moves during the impulse.",
            "**Newton III:** to every action there is always an equal and opposite reaction. $\\vec F_{AB}=-\\vec F_{BA}$. Simultaneous; **no cause–effect**; act on **different** bodies so they cannot cancel.",
            "**Conservation of linear momentum:** total momentum of an isolated system is constant. Follows from II + III: during a collision $\\vec F_{AB}\\Delta t=-\\vec F_{BA}\\Delta t$ so $\\Delta\\vec p_{A}+\\Delta\\vec p_{B}=0$.",
            "First law is the $F=0$ case of the second: $dp/dt=0\\Rightarrow p$ constant.",
          ],
          diagram: "incline-fbd",
        },
      ),
      T(
        "cn-nlm-friction-circ",
        "Friction, concurrent equilibrium, circular dynamics",
        "**Static friction** is self-adjusting: $f_{s}\\le \\mu_{s}N$, equal to the applied force until the impending-slip value $\\mu_{s}N$. **Kinetic** $f_{k}=\\mu_{k}N$, usually $\\mu_{k}<\\mu_{s}$. Rolling friction is smaller still. Lubrication reduces $\\mu$ by replacing dry contact with a fluid film.",
        {
          bullets: [
            "It is easier to **pull** than to **push** a lawn roller: pulling has an upward component that reduces $N$ (hence $f$); pushing increases $N$.",
            "Equilibrium of concurrent forces: $\\sum\\vec F=0$, or resolved $\\sum F_{x}=0$, $\\sum F_{y}=0$.",
            "**Centripetal force** $mv^{2}/r$ is not a new force — it is the **net** radial force (friction, $N$ component, tension, gravity…). Level road: $v_{\\max}=\\sqrt{\\mu rg}$. Banked: $\\tan\\theta=v^{2}/rg$ (no friction); with friction, $v^{2}=rg\\dfrac{\\mu+\\tan\\theta}{1-\\mu\\tan\\theta}$.",
          ],
          diagram: "banking",
        },
      ),
    ],
  },
  "phy-wep": {
    classNotes: [
      T(
        "cn-wep-work",
        "Work — definition, sign, units, variable force",
        "In physics, work means **mechanical work**. Work is done by a force on a body when the body is actually displaced in the direction of the applied force. $W=(F\\cos\\theta)\\,d=\\vec F\\cdot\\vec d$.",
        {
          bullets: [
            "**No work is done if** (i) displacement is zero, (ii) force is zero, (iii) force and displacement are mutually perpendicular ($\\theta=90^{\\circ}$).",
            "Work is **positive** if $0\\le\\theta<90^{\\circ}$, **negative** if $90^{\\circ}<\\theta\\le 180^{\\circ}$. Friction usually has $\\theta=180^{\\circ}$, so $W_{f}=-f\\,s$.",
            "Dimensions $[ML^{2}T^{-2}]$. SI unit **joule**: $1\\,\\mathrm{J}=1\\,\\mathrm{N}\\cdot 1\\,\\mathrm{m}$. Also $1\\,\\mathrm{erg}=10^{-7}\\,\\mathrm{J}$, $1\\,\\mathrm{eV}=1.6\\times10^{-19}\\,\\mathrm{J}$, $1\\,\\mathrm{cal}=4.186\\,\\mathrm{J}$, $1\\,\\mathrm{kWh}=3.6\\times10^{6}\\,\\mathrm{J}$.",
            "In components $W=F_{x}x+F_{y}y+F_{z}z$.",
            "**Variable force:** $W=\\int_{x_{i}}^{x_{f}}F(x)\\,dx$ — area under the $F$–$x$ graph.",
          ],
          diagram: "work-theta",
        },
      ),
      T(
        "cn-wep-energy",
        "Energy, KE, work–energy theorem, potential, collisions",
        "**Energy** is the capacity of a body to do work. **Kinetic energy** is energy by virtue of motion: $K=\\tfrac12 mv^{2}=p^{2}/2m$. Derivation: work to accelerate from rest, $W=\\int mv\\,dv=\\tfrac12 mv^{2}$.",
        {
          bullets: [
            "**Work–energy theorem:** work by the **net** force equals the change in kinetic energy, $W_{\\mathrm{net}}=K_{f}-K_{i}$. Holds for a variable force too ($W=\\int F\\,dx=\\int m v\\,dv$).",
            "**Conservative force:** work depends only on end-points, not on the path; work on a closed loop is zero (gravity, spring, electrostatic). Then $U$ exists with $F=-dU/dx$. **Non-conservative** (friction, air drag): path-dependent; mechanical energy is not conserved.",
            "Gravitational $U=mgh$ (near Earth, constant $g$). Spring $U=\\tfrac12 kx^{2}$.",
            "**Vertical circle:** just complete the circle $\\Rightarrow$ string slack at the top, $v_{C}=\\sqrt{gL}$, so $v_{A}=\\sqrt{5gL}$. At the side $B$, $v_{B}=\\sqrt{3gL}$. $K_{B}/K_{C}=3$. After $C$ the bob is a projectile.",
            "Elastic 1-D equal-mass: velocities exchange. Perfectly elastic 2-D with target at rest and $m_{1}=m_{2}$: $\\theta+\\phi=90^{\\circ}$. Coefficient of restitution $e=1$ (elastic), $e=0$ (perfectly inelastic).",
            "**Power** $P=dW/dt=\\vec F\\cdot\\vec v$. SI watt; $1\\,\\mathrm{hp}=746\\,\\mathrm{W}$.",
          ],
          diagram: "vertical-circle",
          callout: {
            kind: "main",
            text: "If linear momentum rises $10\\%$, $K\\propto p^{2}$ so $K$ rises $21\\%$. Do not write $20\\%$.",
          },
        },
      ),
    ],
    formulas: [
      F("Work", "W=\\vec F\\cdot\\vec d=Fd\\cos\\theta"),
      F("Variable force", "W=\\int_{x_{i}}^{x_{f}} F(x)\\,dx"),
      F("Kinetic energy", "K=\\tfrac12 mv^{2}=p^{2}/2m"),
      F("Work–energy theorem", "W_{\\mathrm{net}}=K_{f}-K_{i}"),
      F("Spring energy", "U=\\tfrac12 kx^{2}"),
      F("Power", "P=\\vec F\\cdot\\vec v"),
    ],
  },
  "phy-solids": {
    classNotes: [
      T(
        "cn-sol-stress",
        "Deforming force, elasticity, stress, strain, Hooke",
        "A **deforming force** changes the configuration of a body (length, volume or shape) by shifting molecules from their normal positions. **Elasticity** is the property of regaining the original configuration when the deforming forces are removed. Quartz and phosphor bronze are nearly perfectly elastic; putty, mud and paraffin wax are nearly perfectly plastic. No real body is either extreme.",
        {
          bullets: [
            "**Stress** $=$ internal restoring force per unit area. If there is no plastic flow, restoring force $=$ external deforming force, so $\\mathrm{stress}=F/A$. SI $\\mathrm{N\\,m^{-2}}$ (pascal). Dimensions $[ML^{-1}T^{-2}]$.",
            "**Normal (longitudinal) stress:** force perpendicular to the area. **Tensile** if the body extends; **compressive** if it shortens.",
            "**Tangential (shearing) stress:** force parallel to the area — changes **shape**, not volume.",
            "**Hydraulic (volume) stress:** uniform pressure, $\\Delta P$. Changes **volume**.",
            "**Strain** is dimensionless: longitudinal $\\Delta L/L$, shearing $\\theta$ (or $\\Delta x/L$), volume $\\Delta V/V$.",
            "**Hooke’s law:** within the proportional limit, stress $\\propto$ strain. The ratio is the **modulus of elasticity**. If stress increases, stress/strain stays **constant**.",
          ],
          diagram: "stress-strain",
        },
      ),
      T(
        "cn-sol-moduli",
        "Young, bulk, shear, Poisson, elastic energy",
        "Young’s modulus $Y=(F/A)/(\\Delta L/L)=FL/A\\Delta L$. Bulk $B=-\\Delta P/(\\Delta V/V)$ (the minus makes $B>0$). Shear (rigidity) $\\eta=(F/A)/\\theta$. Compressibility $K=1/B$, SI $\\mathrm{Pa^{-1}}$.",
        {
          bullets: [
            "**Poisson’s ratio** $\\sigma=$ lateral strain / longitudinal strain $= -(\\Delta D/D)/(\\Delta L/L)$. Typically $0.2$–$0.4$; theoretically $-1$ to $0.5$.",
            "Elastic energy stored $U=\\tfrac12\\times\\mathrm{stress}\\times\\mathrm{strain}\\times\\mathrm{volume}=\\tfrac12 Y (\\Delta L/L)^{2}\\times AL=\\tfrac12 F\\,\\Delta L$. Energy density $=\\tfrac12\\times\\mathrm{stress}\\times\\mathrm{strain}$.",
            "On a typical metal curve: $O$ origin, $P$ proportional limit (Hooke), $E$ elastic limit, $Y$ yield, $U$ ultimate strength, $B$ breaking point. Rubber has a small slope (small $Y$); steel the steepest of steel/brass/rubber.",
          ],
          diagram: "young-moduli",
        },
      ),
      T(
        "cn-sol-limit",
        "Elastic limit, experimental Hooke, stress–strain map",
        "**Elastic limit** is the upper load up to which the body recovers completely on unloading. Elasticity is a property of the **material**; elastic limit is a property of **that body** (geometry included). Beyond the elastic limit the body takes a **permanent set**.",
        {
          bullets: [
            "**Hooke (original):** extension $\\propto$ load, within the elastic limit. **Modified:** stress $\\propto$ strain. The constant is the **modulus of elasticity** $E$, independent of the size of the specimen, dependent on the material.",
            "Experimental check: hang a spring, add known weights, plot load vs extension. A straight line through the origin **is** Hooke.",
            "Typical metal curve: **OA** proportional (Hooke fully). **AB** elastic but not linear — unload from B and you still return to O. **B** is the elastic limit. **BC** partly plastic: unload from C and you keep a permanent set $OO_{1}$. **C** yield point; **CD** the wire flows at nearly constant stress (yield strength). **E** ultimate strength (maximum stress). **F** breaking point. After E the actual area shrinks (necking) so the **engineering** stress falls.",
            "Steel is more elastic than rubber: same stress, much smaller strain, so $Y$ is larger. $Y$ of a rigid body is infinite ($\\Delta L=0$). $Y$ falls as temperature rises.",
            "Bulk modulus exists for solids, liquids **and** gases. Young and shear exist **only for solids**. Ideal liquid: $G=0$. Gases: isothermal $E_{T}=P$, adiabatic $E_{s}=\\gamma P$.",
            "For most solids $G\\approx Y/3$. Sample $Y$ ($10^{9}\\,\\mathrm{N\\,m^{-2}}$): steel $200$, copper $110$, aluminium $70$, glass $65$, concrete $30$, wood $13$.",
          ],
          diagram: "stress-strain",
          callout: {
            kind: "board",
            text: "Boards ask: ‘steel is more elastic than rubber — why?’ Answer with $Y$, not with ‘it stretches less so it is less elastic’ — that sentence is the trap.",
          },
        },
      ),
    ],
    formulas: [
      F("Young’s modulus", "Y=\\frac{F/A}{\\Delta L/L}=\\frac{FL}{A\\Delta L}"),
      F("Bulk modulus", "B=-\\frac{\\Delta P}{\\Delta V/V}"),
      F("Shear modulus", "\\eta=\\frac{F/A}{\\theta}"),
      F("Poisson’s ratio", "\\sigma=\\frac{\\text{lateral strain}}{\\text{longitudinal strain}}"),
      F("Elastic energy", "U=\\tfrac12 F\\,\\Delta L=\\tfrac12\\times\\text{stress}\\times\\text{strain}\\times V"),
    ],
  },
};
