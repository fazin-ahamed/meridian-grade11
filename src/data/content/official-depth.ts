import type { ChapterContent } from "../types";
import { F, Q, T, W } from "./pack";

/** Official CBSE bullets, written so a student who just opened Class 11 can actually use them. */
export const OFFICIAL_DEPTH: Record<string, Partial<ChapterContent>> = {
  "phy-motion-1d": {
    starter: {
      heading: "If calculus is new, start here",
      body: "You do not need Class 12 calculus to open this chapter. $v=dx/dt$ means ‘slope of the $x$–$t$ graph’. $a=dv/dt$ means ‘slope of the $v$–$t$ graph’. Area under $v$–$t$ is displacement. Learn those three sentences, then the SUVAT list is just the special case of constant slope.",
      bullets: [
        "Draw the graph before you write an equation.",
        "Pick a positive direction in line 1. Stick to it.",
        "Distance is the unsigned path; displacement is signed. JEE mixes them on purpose.",
      ],
    },
    theory: [
      T(
        "phy-m1d-official-calc",
        "The official calculus treatment, without the scare",
        "CBSE lists ‘elementary differentiation and integration for describing motion’. That is three rules, not a calculus textbook. If $x(t)$ is a polynomial, $v$ is the usual power rule. If $a$ is constant, integrating twice recovers $v=u+at$ and $s=ut+\\tfrac12 at^2$ — that is the derivation boards want written. Graphical twin: a straight $v$–$t$ line of slope $a$ has area of a trapezium $\\tfrac12(u+v)t$. Same five SUVAT relations, two languages. Variable $a$: if you are given $a(x)$, use $v\\,dv=a\\,dx$; if $a(t)$, integrate in $t$.",
        {
          diagram: "vt-graph",
          bullets: [
            "Uniform motion: $v$ constant, $x$–$t$ is a straight line, $a=0$.",
            "Non-uniform: $v$ changes. Uniformly accelerated is the special non-uniform case $a=$ const.",
            "Instantaneous velocity is the tangent slope; average velocity is the chord $\\Delta x/\\Delta t$.",
            "A $v$–$t$ graph that crosses the axis: displacement is signed area; distance is the sum of absolute areas.",
          ],
          callout: {
            kind: "board",
            text: "Write the two-line derivation of $s=ut+\\tfrac12 at^2$ from $a=dv/dt$ once in your own handwriting. Boards award the steps, not the boxed list.",
          },
        },
      ),
    ],
    formulas: [
      F("From a = dv/dt", "v=u+\\int_0^t a\\,dt'"),
      F("From v dv = a dx", "\\tfrac12(v^2-u^2)=\\int_{x_0}^{x} a\\,dx"),
      F("Distance off v–t", "s_{\\mathrm{path}}=\\int|v|\\,dt"),
    ],
    worked: [
      W(
        "phy-m1d-od1",
        "main",
        "A particle’s $v$–$t$ graph is a triangle: $v$ rises from 0 to 10 m/s in 2 s, then falls to 0 in the next 3 s. Displacement and distance?",
        [
          "Area of the triangle $=\\tfrac12\\times 5\\times 10=25\\,\\mathrm{m}$.",
          "Velocity never went negative, so distance = displacement = $25\\,\\mathrm{m}$.",
        ],
        "$25\\,\\mathrm{m}$ both",
        "If the last side had gone below the axis, displacement would shrink and distance would not.",
      ),
    ],
    quiz: [
      Q(
        "phy-m1d-odq1",
        "boards",
        "Average velocity equals $(u+v)/2$ when",
        ["always", "acceleration is constant", "the particle returns", "speed is constant"],
        1,
        "It is the trapezium formula. Variable $a$ kills it.",
      ),
    ],
  },
  "phy-motion-2d": {
    starter: {
      heading: "Vectors before the parabola",
      body: "A vector has magnitude and direction. You add them tip-to-tail or by components. A projectile is just two 1-D motions sharing time: $a_x=0$, $a_y=-g$. Until components are automatic, skip the incline.",
      bullets: [
        "Resolve, compute, reassemble. Never add $5\\,\\mathrm{N}$ to $3\\,\\mathrm{N}$ as $8$ unless they are parallel.",
        "Unit vector $\\hat a=\\vec a/|a|$.",
        "$\\vec a\\cdot\\vec b=0$ means perpendicular; $\\vec a\\times\\vec b=0$ means parallel.",
      ],
    },
    theory: [
      T(
        "phy-m2d-official-vec",
        "The official vector toolkit (Class 11, week 3)",
        "Scalars (mass, time, energy, speed) have magnitude only. Vectors (displacement, velocity, acceleration, force, momentum) need a direction. Equality of vectors: same magnitude and direction, free to slide (free vectors) unless they are localised (force at a point). Multiply by a positive real: stretch. By a negative: reverse. Addition: parallelogram or triangle law; components $a_x=a\\cos\\theta$, $a_y=a\\sin\\theta$ along rectangular axes, then $\\vec a=a_x\\hat\\imath+a_y\\hat\\jmath$. Unit vector in the $xy$ plane at angle $\\theta$ is $\\cos\\theta\\,\\hat\\imath+\\sin\\theta\\,\\hat\\jmath$.",
        {
          diagram: "projectile",
          bullets: [
            "Dot (scalar) product: $\\vec a\\cdot\\vec b=ab\\cos\\theta=a_x b_x+a_y b_y$. Work $W=\\vec F\\cdot\\vec s$ is the first application.",
            "Cross (vector) product: $|\\vec a\\times\\vec b|=ab\\sin\\theta$, direction by right-hand rule, perpendicular to the plane. Torque $\\vec\\tau=\\vec r\\times\\vec F$ is the first application.",
            "In 2-D, $\\vec a\\times\\vec b$ points out of the page if the sense $a\\to b$ is anticlockwise.",
          ],
        },
      ),
      T(
        "phy-m2d-official-proj-ucm",
        "Projectile and uniform circular motion, as the syllabus lists them",
        "Uniform velocity in a plane: straight line, $\\vec a=0$. Uniform acceleration: parabola (projectile is the $a=g$ down case). Level-ground projectile: $T=2u\\sin\\theta/g$, $R=u^2\\sin 2\\theta/g$, $H=u^2\\sin^2\\theta/(2g)$, trajectory $y=x\\tan\\theta-gx^2/(2u^2\\cos^2\\theta)$. Complementary angles $\\theta$ and $90^{\\circ}-\\theta$ share $R$. Uniform circular motion: speed constant, velocity’s direction changes, $a=v^2/r=\\omega^2 r$ toward the centre, period $T=2\\pi r/v=2\\pi/\\omega$. That centripetal acceleration is kinematic — the force that provides it waits for NLM.",
        {
          bullets: [
            "Time is the bridge: $x=(u\\cos\\theta)t$ and $y=(u\\sin\\theta)t-\\tfrac12 gt^2$ share $t$.",
            "A cliff: the quadratic in $t$ has one physical root (the positive one after $y=-h$).",
            "UCM is not ‘constant acceleration’. $|\\vec a|$ is constant; $\\vec a$ is not.",
          ],
          callout: {
            kind: "main",
            text: "Main’s projectile numerical is range / $T$ / $H$ or ‘at which angle is $R$ max’. Advanced adds an incline or a moving frame. Draw $u_x,u_y$ every time.",
          },
        },
      ),
    ],
    formulas: [
      F("Dot in components", "\\vec a\\cdot\\vec b=a_x b_x+a_y b_y"),
      F("Cross magnitude", "|\\vec a\\times\\vec b|=ab\\sin\\theta"),
      F("Trajectory", "y=x\\tan\\theta-\\frac{g x^2}{2u^2\\cos^2\\theta}"),
      F("Centripetal", "a_c=v^2/r=\\omega^2 r"),
    ],
    worked: [
      W(
        "phy-m2d-od1",
        "main",
        "A projectile is launched at $20\\,\\mathrm{m/s}$ at $30^{\\circ}$. $g=10$. Range and max height.",
        [
          "$R=u^2\\sin 2\\theta/g=400\\cdot\\sin 60^{\\circ}/10=40\\cdot\\sqrt{3}/2=20\\sqrt{3}\\,\\mathrm{m}$.",
          "$H=u^2\\sin^2\\theta/(2g)=400\\cdot(1/2)^2/20=400\\cdot 1/4 / 20=5\\,\\mathrm{m}$.",
        ],
        "$R=20\\sqrt{3}\\,\\mathrm{m}$, $H=5\\,\\mathrm{m}$",
        "sin 2θ, not 2 sin θ. Complementary 60° would share this range and a larger H.",
      ),
    ],
  },
  "phy-wep": {
    theory: [
      T(
        "phy-wep-official-collide",
        "Work by a variable force, and collisions in one and two dimensions",
        "Work by a constant force is $W=\\vec F\\cdot\\vec s=Fs\\cos\\theta$. Variable force: $W=\\int F_x\\,dx$ — the area under the $F$–$x$ graph. Kinetic energy $K=\\tfrac12 mv^2$. Work–energy theorem: $W_{\\mathrm{net}}=\\Delta K$, always, including friction. Power $P=dW/dt=\\vec F\\cdot\\vec v$. A spring $F=-kx$ is conservative; $U=\\tfrac12 kx^2$. Conservative: $W$ around a closed loop is 0 and $U$ exists. Gravity and springs are; friction and drag are not. Vertical circle lives here as energy + a radial $F=ma$ at one point.",
        {
          diagram: "collision-1d",
          bullets: [
            "1-D elastic, equal mass, target at rest: they exchange velocities. Remember this picture.",
            "Coefficient of restitution $e=(v_2-v_1)/(u_1-u_2)$ along the common normal. $e=1$ elastic, $e=0$ perfectly inelastic (they stick, momentum still conserved).",
            "2-D equal-mass elastic: the two departure velocities are perpendicular. That is a Main/Advanced classic.",
            "Do not conserve energy in an inelastic collision. Do conserve momentum if $\\vec J_{\\mathrm{ext}}=0$.",
          ],
          callout: {
            kind: "trap",
            text: "Work by friction on a block is $-f\\,s_{\\mathrm{path}}$ (path, not displacement) relative to the contact. On a moving belt the block’s displacement and the friction point’s displacement differ — Advanced.",
          },
        },
      ),
    ],
    formulas: [
      F("Variable work", "W=\\int_{x_1}^{x_2} F_x\\,dx"),
      F("Restitution", "e=\\frac{v_{\\mathrm{sep}}}{u_{\\mathrm{app}}}\\quad\\text{(along the normal)}"),
      F("1-D elastic equal mass", "v_1=u_2,\\quad v_2=u_1"),
    ],
    worked: [
      W(
        "phy-wep-od1",
        "main",
        "Masses 2 kg and 3 kg. First has $u=5\\,\\mathrm{m/s}$, second at rest, $e=1$, head-on. Final speeds?",
        [
          "Momentum: $2\\cdot 5=2v_1+3v_2$.",
          "Restitution: $v_2-v_1=5$.",
          "Then $10=2v_1+3(v_1+5)=5v_1+15\\Rightarrow 5v_1=-5\\Rightarrow v_1=-1$, $v_2=4\\,\\mathrm{m/s}$.",
        ],
        "$v_1=-1\\,\\mathrm{m/s}$, $v_2=4\\,\\mathrm{m/s}$",
        "The light one bounces back. Check: $K_i=25$, $K_f=1+24=25$.",
      ),
    ],
  },
  "phy-gravitation": {
    theory: [
      T(
        "phy-grav-official-kepler",
        "Kepler, inverse-square, g(h), g(d), escape and satellites",
        "Kepler I: orbits are ellipses, sun at one focus (circle is the $e=0$ ellipse). II: equal areas in equal times — this is angular-momentum conservation about the sun. III: $T^2\\propto a^3$. Newton: $F=Gm_1 m_2/r^2$, and Kepler III drops out for circles as $T^2=4\\pi^2 r^3/(GM)$. $g=GM/R^2$ on the surface. Altitude $h$: $g_h=GM/(R+h)^2\\approx g(1-2h/R)$ for $h\\ll R$. Depth $d$: $g_d=g(1-d/R)$ (uniform sphere). Potential $V=-GM/r$ (zero at infinity); $U=mV$. Escape: $\\tfrac12 mv_e^2=GMm/R$ so $v_e=\\sqrt{2gR}=\\sqrt{2GM/R}$. Circular orbit: $v_o=\\sqrt{GM/r}=\\sqrt{gR^2/r}$, $E=-GMm/(2r)$ (more negative is more bound).",
        {
          diagram: "kepler",
          bullets: [
            "Field $\\vec g$ is force per unit mass; potential is energy per unit mass. Do not mix $g$ and $V$.",
            "Inside a spherical shell, $g=0$ and $V$ is the surface value (constant).",
            "Geostationary: equatorial, $T=24\\,\\mathrm{h}$, $r^3=GM T^2/(4\\pi^2)$, always above the same point.",
          ],
        },
      ),
    ],
    formulas: [
      F("g at height", "g_h=g\\frac{R^2}{(R+h)^2}"),
      F("g at depth", "g_d=g(1-d/R)"),
      F("Escape", "v_e=\\sqrt{2GM/R}"),
      F("Orbit energy", "E=-\\frac{GMm}{2r}"),
    ],
  },
  "phy-fluids": {
    theory: [
      T(
        "phy-fl-official-pascal-stokes",
        "Pascal, Stokes, Bernoulli, bubbles and capillary — the official list",
        "Pressure in a column $P=P_0+\\rho g h$. Pascal: a pressure change in an enclosed incompressible fluid is transmitted undiminished — hydraulic lift $F_2/F_1=A_2/A_1$. Gravity makes $P$ increase downward; a barometer is that column with $P_0=\\rho g h$. Viscosity: Stokes’ drag $F=6\\pi\\eta r v$ on a sphere; terminal velocity $v_t=2r^2(\\rho-\\sigma)g/(9\\eta)$. Streamline vs turbulent: Reynolds $R_e=\\rho v d/\\eta$; critical $v_c$. Bernoulli along a streamline, ideal, steady, incompressible: $P+\\rho g h+\\tfrac12\\rho v^2=$ const. Torricelli: speed of efflux $\\sqrt{2gh}$. Dynamic lift (aeroplane wing, spinning ball) is Bernoulli plus a path-length difference. Surface tension $S$: energy per area, also force per length. Excess pressure: drop $2S/r$, bubble (two surfaces) $4S/r$. Capillary $h=2S\\cos\\theta/(\\rho g r)$.",
        {
          diagram: "capillary",
          bullets: [
            "A hydraulic brake is Pascal with a small master piston and a large slave.",
            "Bernoulli is not ‘faster air, lower pressure’ as a slogan — write the terms you are dropping.",
            "Angle of contact $\\theta$: wetting ($\\theta$ acute, $h>0$) vs non-wetting (mercury, $h<0$).",
          ],
        },
      ),
    ],
    formulas: [
      F("Stokes terminal", "v_t=\\frac{2r^2(\\rho-\\sigma)g}{9\\eta}"),
      F("Torricelli", "v=\\sqrt{2gh}"),
      F("Bubble excess", "\\Delta P=4S/r"),
      F("Capillary", "h=\\frac{2S\\cos\\theta}{\\rho g r}"),
    ],
  },
  "phy-solids": {
    theory: [
      T(
        "phy-sol-official-moduli",
        "Stress, strain, Hooke, three moduli, Poisson, elastic energy",
        "Stress = restoring force / area. Strain = fractional change of length, volume or angle — dimensionless. Hooke: stress $\\propto$ strain in the linear region; modulus is that ratio. Young $Y=(F/A)/(\\Delta L/L)$. Bulk $B=-\\Delta P/(\\Delta V/V)$. Shear $G=(F/A)/\\theta$. Poisson $\\sigma=$ lateral strain / longitudinal strain (positive, typically $0.2$–$0.4$; rubber near $0.5$ is almost incompressible). Elastic energy density $\\tfrac12\\times$ stress $\\times$ strain $=\\tfrac12 Y(\\Delta L/L)^2$. Applications (qualitative): cranes, bridges, bone, rubber — a large $Y$ means a stiff material, not a strong one. Strength is the breaking stress.",
        {
          diagram: "stress-strain",
          bullets: [
            "Proportionality limit, then elastic limit, then yield, then ultimate, then fracture — name the points on the steel curve.",
            "Series rods: same $F$, $\\Delta L$ adds. Parallel: same $\\Delta L$, $F$ adds.",
          ],
        },
      ),
    ],
  },
  "phy-charges": {
    theory: [
      T(
        "phy-ch-official-gauss",
        "Coulomb, superposition, dipole, Gauss’s three official applications",
        "Charge is conserved and quantised ($q=ne$). Coulomb $F=kq_1 q_2/r^2$ along the line, $k=1/(4\\pi\\varepsilon_0)$. Superposition: forces (and fields) add as vectors — that is the whole continuous-charge chapter. Field of a point charge $E=kq/r^2$ radially out if $q>0$. Field lines start on $+$ and end on $-$, never cross, density pictures $|E|$. Dipole $p=qd$: on axis $E=2kp/r^3$, on equator $E=kp/r^3$ opposite to $\\vec p$. Torque in a uniform field $\\vec\\tau=\\vec p\\times\\vec E$; net force on a dipole in a uniform field is 0. Gauss: $\\oint\\vec E\\cdot d\\vec A=q_{\\mathrm{enc}}/\\varepsilon_0$. Official three: infinite line $E=\\lambda/(2\\pi\\varepsilon_0 r)$, infinite sheet $E=\\sigma/(2\\varepsilon_0)$, spherical shell $E=kq/r^2$ outside and $0$ inside.",
        {
          diagram: "gauss-sphere",
          callout: {
            kind: "board",
            text: "Learn the three Gauss results as sentences with the symmetry named (cylindrical, planar, spherical). Main will not ask you to invent a fourth symmetry.",
          },
        },
      ),
    ],
  },
  "phy-current": {
    theory: [
      T(
        "phy-cu-official-drift-k",
        "Drift, Ohm, cells, Kirchhoff, Wheatstone",
        "Current $I=dq/dt$. In a metal, $I=neAv_d$ with drift $v_d=eE\\tau/m$. Mobility $\\mu=v_d/E$. Ohm: $V=IR$ for linear ohmic metals; $V$–$I$ of a diode or a gas discharge is non-linear. $R=\\rho \\ell/A$, $\\rho=\\rho_0(1+\\alpha\\Delta T)$. Power $P=VI=I^2 R=V^2/R$. A cell: emf $\\mathcal{E}$ is the open-circuit PD; terminal $V=\\mathcal{E}-Ir$ when it discharges. Series cells: $\\mathcal{E}$ adds, $r$ adds. Parallel identical cells: $\\mathcal{E}$ same, $r$ divides. Kirchhoff: junction $\\sum I=0$ (charge); loop $\\sum\\mathcal{E}=\\sum IR$ (energy). Wheatstone: $P/Q=R/S$ at balance — galvanometer current is zero, so its resistance does not matter.",
        {
          diagram: "wheatstone",
          bullets: [
            "Meter bridge is Wheatstone on a 100 cm wire: $X/R=\\ell/(100-\\ell)$.",
            "Internal $r$ is why a battery sags under load. Potentiometer measures $\\mathcal{E}$ at (almost) zero current.",
          ],
        },
      ),
    ],
    formulas: [
      F("Drift", "I=neAv_d"),
      F("Wheatstone", "P/Q=R/S"),
      F("Terminal PD", "V=\\mathcal{E}-Ir"),
    ],
  },
  "phy-atoms": {
    theory: [
      T(
        "phy-at-official-bohr",
        "Rutherford scattering, Bohr radius / speed / energy, hydrogen lines",
        "Geiger–Marsden: most $\\alpha$ go through, a few bounce — atom is empty with a tiny positive nucleus. Rutherford could not explain discrete spectra or why the electron does not radiate. Bohr postulates: (1) stationary orbits, (2) $mvr=n\\hbar$, (3) $h\\nu=E_i-E_f$. Then $r_n=n^2 a_0/Z$ with $a_0=0.529\\,\\mathrm{\\AA}$, $v_n=Z\\alpha c/n$, $E_n=-13.6 Z^2/n^2\\,\\mathrm{eV}$. Hydrogen lines: Lyman to $n=1$ (UV), Balmer to $n=2$ (visible), Paschen to $n=3$ (IR). Qualitative: each series is a fan of lines crowding toward a series limit.",
        { diagram: "bohr" },
      ),
    ],
  },
  "phy-semiconductors": {
    theory: [
      T(
        "phy-se-official-bands",
        "Bands, p and n, the junction diode, rectifier",
        "In a solid the atomic levels spread into bands. Conductor: valence and conduction bands overlap (or the valence band is half-filled). Insulator: gap $\\gtrsim 3\\,\\mathrm{eV}$. Semiconductor: gap $\\sim 1\\,\\mathrm{eV}$, so $kT$ can promote a few electrons. Intrinsic: $n=p=n_i$. Extrinsic: pentavalent donor $\\to$ n-type ($n\\gg p$); trivalent acceptor $\\to$ p-type ($p\\gg n$). A p–n junction in equilibrium grows a depletion layer and a built-in barrier. Forward bias thins the barrier, current rises exponentially past $\\sim 0.7\\,\\mathrm{V}$ (Si). Reverse bias thickens it; a tiny reverse saturation current until breakdown. Rectifier: a diode in series with a load on AC passes one half-cycle. A capacitor after the diode is the unlisted-but-useful smoother.",
        {
          diagram: "diode-iv",
          bullets: [
            "I–V: almost zero reverse, then a knee, then a steep forward line.",
            "n-type is not negatively charged overall — it is neutral, with electrons as majority carriers.",
          ],
        },
      ),
    ],
  },
  "phy-emw": {
    theory: [
      T(
        "phy-emw-official-uses",
        "Spectrum in order, with the uses boards actually list",
        "Long $\\lambda$ to short: radio (AM/FM, TV, cell) → microwave (radar, microwave ovens, satellite) → infrared (remote, thermal imaging, heat lamps) → visible (400–700 nm, vision) → ultraviolet (sterilisation, photolithography, sunburn) → X-rays (imaging, airport, crystal structure) → $\\gamma$ (nuclear, radiotherapy, astronomy). Displacement current is the missing term that lets a charging capacitor obey Ampere. Transverse: $\\vec E$, $\\vec B$, $\\vec k$ mutually perpendicular.",
        { diagram: "em-spectrum" },
      ),
    ],
  },
  "phy-mag-matter": {
    theory: [
      T(
        "phy-mm-official-three",
        "Bar magnet, dipole field (qualitative), para / dia / ferro",
        "A bar magnet is equivalent (qualitatively) to a solenoid of similar shape: field lines emerge from the north and loop to the south, continuing inside. On the axis of a dipole, $B$ is along $\\vec m$; on the equator it is opposite $\\vec m$ (same pattern as the electric dipole). Torque $\\vec\\tau=\\vec m\\times\\vec B$ tries to align the magnet with the field. Diamagnetic ($\\mathrm{Bi}$, $\\mathrm{Cu}$, water): $\\chi<0$, weakly repelled, independent of $T$. Paramagnetic ($\\mathrm{Al}$, $\\mathrm{O}_2$): $\\chi>0$ small, weakly attracted, $\\chi\\propto 1/T$ (Curie). Ferromagnetic ($\\mathrm{Fe}$, $\\mathrm{Co}$, $\\mathrm{Ni}$): $\\chi\\gg 0$, domains, hysteresis, lost above the Curie temperature where it becomes para.",
        { diagram: "solenoid" },
      ),
    ],
  },
  "math-rel-11": {
    starter: {
      heading: "Nine graphs, then the definitions",
      body: "Before one-one and onto, you must be able to sketch the catalogue CBSE names: constant, identity, polynomial, rational, modulus, signum, exponential, log, greatest integer. Domain is ‘where it is allowed’; range is ‘what actually comes out’.",
      bullets: [
        "$|x|$ is V-shaped. $\\mathrm{sgn}(x)$ is two steps and a point at the origin.",
        "$[x]$ is a staircase. $e^x$ never hits 0. $\\ln x$ needs $x>0$.",
        "A function is a relation that does not give one $x$ two $y$’s.",
      ],
    },
    theory: [
      T(
        "math-rel11-official-graphs",
        "The official function catalogue, with domain and range",
        "Constant $f(x)=c$: domain $\\mathbb R$, range $\\{c\\}$. Identity $f(x)=x$: both $\\mathbb R$. Polynomial: domain $\\mathbb R$; range depends on degree and leading coefficient (odd degree $\\to\\mathbb R$). Rational $p/q$: domain $\\mathbb R$ minus zeros of $q$. Modulus $|x|$: domain $\\mathbb R$, range $[0,\\infty)$. Signum: $1$ for $x>0$, $0$ at $0$, $-1$ for $x<0$; range $\\{-1,0,1\\}$. Exponential $a^x$ ($a>0,a\\neq 1$): domain $\\mathbb R$, range $(0,\\infty)$. Log $\\log_a x$: domain $(0,\\infty)$, range $\\mathbb R$. Greatest integer $[x]$: domain $\\mathbb R$, range $\\mathbb Z$, jump discontinuity at every integer. Sum/difference/product/quotient of functions live on the intersection of domains (and $g\\neq 0$ for a quotient).",
        {
          diagram: "function-graphs",
          bullets: [
            "Pictorial test: a vertical line hits the graph at most once $\\Leftrightarrow$ it is a function.",
            "Horizontal line hits at most once $\\Leftrightarrow$ one-one.",
            "Cartesian $n(A\\times B)=n(A)n(B)$. Ordered pair $(a,b)$ is not $\\{a,b\\}$.",
          ],
        },
      ),
    ],
    quiz: [
      Q(
        "math-rel11-odq1",
        "boards",
        "Range of $\\mathrm{sgn}(x)$ is",
        ["$\\mathbb R$", "$[-1,1]$", "$\\{-1,0,1\\}$", "$\\{0,1\\}$"],
        2,
        "Three values only. It is not the interval $[-1,1]$.",
      ),
    ],
  },
  "math-sets": {
    theory: [
      T(
        "math-sets-official-roster",
        "How to write a set so a mark scheme cannot argue",
        "Roster $\\{2,3,5\\}$ vs set-builder $\\{x\\in\\mathbb N:x\\text{ is prime}, x<6\\}$. Empty $\\varnothing$ is a subset of every set; $\\{\\varnothing\\}$ is not empty. Finite vs infinite: $\\mathbb N$ is infinite; a roster you can finish is finite. Equal sets: same elements, order and repetition do not count. Subsets of $\\mathbb R$ as intervals: $(a,b), [a,b], [a,b), (a,b]$, rays $(a,\\infty)$, $(−\\infty,b]$. Universal set $U$ is declared, not assumed. Venn is a proof tool, not a decoration. Properties of complement: $(A')'=A$, $A\\cup A'=U$, $A\\cap A'=\\varnothing$, De Morgan.",
        { diagram: "venn" },
      ),
    ],
  },
  "math-int": {
    theory: [
      T(
        "math-int-official-menu-2",
        "How to recognise which official integral you are looking at",
        "Complete the square first. $ax^2+bx+c=a\\bigl[(x+b/2a)^2 \\pm \\text{something}\\bigr]$. Then the something’s sign picks $\\int dx/(x^2+a^2)$ (arctan), $\\int dx/(x^2-a^2)$ (log/artanh form), $\\int dx/\\sqrt{a^2-x^2}$ (arcsin), $\\int dx/\\sqrt{x^2\\pm a^2}$ (log). A linear $px+q$ on top is ‘split into $k\\,d(\\mathrm{quad})/dx$ plus a leftover constant’ — two integrals, not one guess. Parts: $u$ is the function you are happy to differentiate (LIATE as a hint, not a law).",
        { diagram: "area-curve" },
      ),
    ],
  },
};
