import type { ChapterContent } from "../types";
import { F, Q, T, W } from "./pack";

/** Extra theory matching official CBSE bullets that the base notes treat lightly. */
export const PHYSICS_DEPTH: Record<string, Partial<ChapterContent>> = {
  "phy-nlm": {
    theory: [
      T(
        "phy-nlm-official-friction",
        "Rolling friction, lubrication, concurrent equilibrium",
        "Rolling friction is much smaller than kinetic sliding friction: the contact patch deforms, and the normal shifts forward so it provides a retarding torque. Lubrication replaces solid–solid shear by viscous shear of a film — that is why $\\mu$ drops by an order of magnitude, not because ‘friction disappeared’. Equilibrium of concurrent forces is $\\sum\\vec F=0$ (three forces through one point close a triangle). Lami’s theorem $F_1/\\sin\\alpha=F_2/\\sin\\beta=F_3/\\sin\\gamma$ is the same statement for three forces.",
        {
          bullets: [
            "Rolling friction $f_r = \\mu_r N$, with $\\mu_r\\ll\\mu_k$. On a cycle it is why you stop pedalling and still roll.",
            "A body in equilibrium under three non-parallel forces has those forces concurrent.",
            "Lubrication is a fluids chapter in disguise: Stokes’ drag in a thin film.",
          ],
          callout: {
            kind: "board",
            text: "Boards still want the sentence ‘rolling friction is less than sliding friction because of the smaller area of contact / deformation’. Write it. Main almost never asks μ_r numerically.",
          },
        },
      ),
    ],
    formulas: [F("Lami (three concurrent)", "F_1/\\sin\\alpha = F_2/\\sin\\beta = F_3/\\sin\\gamma")],
    quiz: [
      Q(
        "phy-nlm-dq1",
        "boards",
        "Rolling friction compared with kinetic sliding friction of the same pair is",
        ["much larger", "equal", "much smaller", "infinite"],
        2,
        "Deformation torque is small; lubrication and rolling both beat sliding.",
      ),
    ],
  },
  "phy-wep": {
    theory: [
      T(
        "phy-wep-vertical",
        "Motion in a vertical circle",
        "A particle on a light string or a smooth track in a vertical circle is an energy problem plus a radial $F=ma$. Take $U=0$ at the bottom. At the top of a full loop on a string the critical speed is $\\sqrt{gr}$ so that $T+mg=mv^2/r$ can hold with $T\\ge 0$. Energy then demands $v_{\\mathrm{bottom}}\\ge\\sqrt{5gr}$. Leaving the circle (string slack, or a bead flying off a sphere) happens the instant the radial equation would require a negative constraint force. Height of leaving from the top of a sphere starting from rest at the top is $R/3$ from the top ($\\cos\\theta=2/3$).",
        {
          diagram: "circular",
          bullets: [
            "Never use SUVAT along the arc — acceleration is not constant.",
            "A car on a convex bridge: $N=mg-mv^2/r$. At $v=\\sqrt{rg}$ it loses contact.",
            "Inside a death well, $N=mv^2/r$ is horizontal and $f=\\mu N$ carries the weight.",
          ],
          callout: {
            kind: "main",
            text: "Main’s vertical-circle item is almost always the √5gr bottom speed, or the bead-on-a-sphere leaving condition. Write energy + radial, in that order.",
          },
        },
      ),
    ],
    formulas: [
      F("Loop, critical bottom", "v_{\\mathrm{bottom}}=\\sqrt{5gr}"),
      F("Leave a sphere", "\\cos\\theta=2/3\\quad\\text{(from rest at top)}"),
    ],
    worked: [
      W(
        "phy-wep-dw1",
        "main",
        "A particle slides from the top of a smooth sphere of radius R. Where does it leave?",
        [
          "Energy: $mgR(1-\\cos\\theta)=\\frac12 mv^2$.",
          "Radial at leaving ($N=0$): $mg\\cos\\theta=mv^2/R$.",
          "Substitute: $2gR(1-\\cos\\theta)=gR\\cos\\theta$ ⇒ $\\cos\\theta=2/3$.",
        ],
        "At $\\cos\\theta=2/3$ from the vertical, i.e. about $48^{\\circ}$ from the top.",
        "The same two equations, with $T$ instead of $N$, give the string-slack condition.",
      ),
    ],
  },
  "phy-rotation": {
    theory: [
      T(
        "phy-rot-compare",
        "Linear vs rotational dictionary, and rigid-body equilibrium",
        "Map every linear idea once, and rotation stops being a new language: $m\\leftrightarrow I$, $v\\leftrightarrow\\omega$, $a\\leftrightarrow\\alpha$, $p\\leftrightarrow L$, $F\\leftrightarrow\\tau$, $\\frac12 mv^2\\leftrightarrow\\frac12 I\\omega^2$, $F=ma\\leftrightarrow\\tau=I\\alpha$, $K=p^2/2m\\leftrightarrow L^2/2I$. Equilibrium of a rigid body is two independent statements: $\\sum\\vec F=0$ (COM does not accelerate) and $\\sum\\vec\\tau=0$ about every point (actually about any one point, once $\\sum F=0$). Boards want the MOI list with no derivation: rod $ML^2/12$, ring $MR^2$, disc $MR^2/2$, solid sphere $2MR^2/5$, shell $2MR^2/3$. Radius of gyration $k$ is defined by $I=Mk^2$.",
        {
          bullets: [
            "Torque about A and about B differ by $\\vec{AB}\\times\\sum F$; they agree if $\\sum F=0$.",
            "A uniform rod hinged at one end: $I=ML^2/3$ (parallel axis from COM).",
            "Rolling without slipping is the constraint $v=\\omega R$, not a force.",
          ],
        },
      ),
    ],
    formulas: [
      F("Radius of gyration", "I = Mk^2"),
      F("Rod about end", "I_{\\mathrm{end}} = ML^2/3"),
    ],
  },
  "phy-gravitation": {
    theory: [
      T(
        "phy-grav-kepler",
        "Kepler’s three laws and satellite energy",
        "I: orbits are ellipses with the sun at one focus (a circle is $e=0$). II: equal areas in equal times — this is $L$ conservation for a central force. III: $T^2\\propto a^3$, and Newton’s law upgrades it to $T^2=4\\pi^2 a^3/(GM)$. For a circular satellite $v=\\sqrt{GM/r}$, $T=2\\pi\\sqrt{r^3/GM}$, kinetic $GMm/2r$, potential $-GMm/r$, total $E=-GMm/(2r)$. Escape from the surface is $\\sqrt{2GM/R}=\\sqrt{2}v_{\\mathrm{orb}}$. Binding energy of a satellite is $+GMm/(2r)$.",
        {
          diagram: "satellite",
          bullets: [
            "Geostationary: equatorial, $T=24$ h, $r\\approx 6.6 R_E$, same sense as Earth’s spin.",
            "Polar sun-synchronous satellites have $T$ of order 100 min and $r$ just above $R_E$.",
            "g at height $h$: $g_h=g R^2/(R+h)^2\\approx g(1-2h/R)$ for $h\\ll R$. At depth $d$, $g_d=g(1-d/R)$.",
          ],
          callout: {
            kind: "board",
            text: "Write Kepler I, II, III as three numbered sentences. Main then asks the $T^2\\propto r^3$ ratio or $E=-K$.",
          },
        },
      ),
    ],
    formulas: [
      F("Kepler III", "T^2 = 4\\pi^2 a^3 / (GM)"),
      F("g at depth d", "g_d = g(1-d/R)"),
      F("Satellite total E", "E = -GMm/(2r)"),
    ],
  },
  "phy-solids": {
    theory: [
      T(
        "phy-solids-poisson",
        "Poisson’s ratio, elastic energy, qualitative uses",
        "Longitudinal strain $\\Delta L/L$ is accompanied by a lateral contraction $-\\Delta d/d$. Poisson’s ratio $\\sigma=(\\Delta d/d)/(\\Delta L/L)$ is typically $0.2$–$0.4$ for metals and cannot exceed $0.5$ for an incompressible solid (rubber is close). Elastic energy stored is $\\frac12\\times\\mathrm{stress}\\times\\mathrm{strain}\\times\\mathrm{volume}=F^2 L/(2AY)$. Qualitative uses: girders with an I-section put material far from the neutral axis (large $I$); bridges use steel’s large $Y$; rubber’s small $Y$ makes a fat energy well for shock absorption.",
        {
          diagram: "stress-strain",
          bullets: [
            "Hooke is the linear portion only. Beyond yield, $Y$ is not defined.",
            "A wire and a rod of the same $Y$ but different $A$: the thinner one stretches more for the same load.",
            "Thermal stress $Y\\alpha\\Delta T$ is this chapter mixed with thermal properties.",
          ],
        },
      ),
    ],
    formulas: [
      F("Poisson", "\\sigma = \\text{lateral strain}/\\text{longitudinal strain}"),
      F("Elastic energy", "U = F^2 L / (2 A Y)"),
    ],
  },
  "phy-fluids": {
    theory: [
      T(
        "phy-fluids-pascal",
        "Pascal, hydraulics, Stokes, Torricelli, capillarity",
        "Pascal: a pressure applied to an enclosed incompressible fluid is transmitted undiminished. Hydraulic lift: $F_2/F_1=A_2/A_1$ — you buy force, you pay with displacement ($A_1 x_1=A_2 x_2$). Stokes: $F=6\\pi\\eta r v$ on a sphere; terminal velocity $v_t=2r^2(\\rho-\\sigma)g/(9\\eta)$. Torricelli: speed of efflux $v=\\sqrt{2gh}$ from a hole at depth $h$ (Bernoulli with $P$ atmospheric on both ends). Excess pressure: $\\Delta P=2S/r$ (drop), $4S/r$ (soap bubble — two surfaces). Capillary rise $h=2S\\cos\\theta/(\\rho g r)$. Angle of contact $<90^\\circ$ (water/glass) rises; $>90^\\circ$ (mercury/glass) depresses.",
        {
          diagram: "bernoulli-pipe",
          bullets: [
            "Streamline: velocity at a point is steady. Turbulent: Reynolds $Re=\\rho v d/\\eta$ exceeds a few thousand.",
            "Dynamic lift: faster stream, lower $P$ (aeroplane wing, spinning ball — Magnus).",
            "A bubble in air vs a drop in air: count the surfaces before you write 2S or 4S.",
          ],
          callout: {
            kind: "trap",
            text: "Writing 2S/r for a soap bubble is the classic miss. Soap film has two free surfaces.",
          },
        },
      ),
    ],
    formulas: [
      F("Hydraulic lift", "F_2/F_1 = A_2/A_1"),
      F("Stokes terminal", "v_t = 2r^2(\\rho-\\sigma)g/(9\\eta)"),
      F("Torricelli", "v=\\sqrt{2gh}"),
      F("Capillary rise", "h=2S\\cos\\theta/(\\rho g r)"),
      F("Soap bubble excess P", "\\Delta P=4S/r"),
    ],
    quiz: [
      Q(
        "phy-fluids-dq1",
        "main",
        "Excess pressure inside a soap bubble of radius r is",
        ["$S/r$", "$2S/r$", "$4S/r$", "$8S/r$"],
        2,
        "Two surfaces.",
      ),
    ],
  },
  "phy-thermal": {
    theory: [
      T(
        "phy-thermal-official",
        "Anomalous water, Cp vs Cv, latent heat, blackbody",
        "Water contracts from $0^\\circ$C to $4^\\circ$C and then expands: lakes freeze from the top. $C_P$ and $C_V$ differ for gases because expansion work is allowed at constant pressure; for solids and liquids the difference is tiny and boards treat a single $c$. Latent heat is the energy to change state at constant $T$: ice stays at $0^\\circ$C until $L_f$ is supplied. Blackbody: a perfect absorber, spectrum depends only on $T$. Wien $\\lambda_m T=b$ (hotter → bluer peak). Stefan $P=e\\sigma A T^4$ with $T$ in kelvin.",
        {
          bullets: [
            "Never apply $mc\\Delta T$ across a phase-change plateau.",
            "Radiation numericals die if you leave $T$ in Celsius.",
            "Apparent expansion of a liquid includes the vessel: $\\gamma_{\\mathrm{app}}=\\gamma_{\\mathrm{real}}-\\gamma_{\\mathrm{vessel}}$.",
          ],
        },
      ),
    ],
  },
  "phy-thermo": {
    theory: [
      T(
        "phy-thermo-zeroth",
        "Zeroth law, second law, state variables, reversible vs irreversible",
        "Zeroth law: if A is in thermal equilibrium with B and B with C, then A with C — this defines temperature as the thing two systems share. A state variable (P, V, T, U, S) depends only on the current state; heat and work are path variables. Reversible: the system is always infinitesimally close to equilibrium (you can retrace). Irreversible: finite gradients, friction, free expansion, inelastic deformation. Second law (Kelvin): you cannot convert heat completely into work in a cycle without dumping some heat. Clausius: heat does not flow from cold to hot without work. Carnot is the reversible engine between two reservoirs and has the maximum $\\eta=1-T_C/T_H$.",
        {
          diagram: "pv-cycle",
          bullets: [
            "Equation of state for an ideal gas: $PV=nRT$. Real gases need van der Waals later (chemistry).",
            "A cyclic process: $\\Delta U=0$ so $Q_{\\mathrm{net}}=W_{\\mathrm{net}}$.",
            "Free expansion is adiabatic and no-work, hence $\\Delta U=0$ even though it is irreversible.",
          ],
        },
      ),
    ],
    quiz: [
      Q(
        "phy-thermo-dq1",
        "boards",
        "The zeroth law of thermodynamics defines",
        ["energy", "entropy", "temperature", "work"],
        2,
        "Transitivity of thermal equilibrium.",
      ),
    ],
  },
  "phy-ktg": {
    theory: [
      T(
        "phy-ktg-assume",
        "KTG assumptions, work of compression, Avogadro",
        "Assumptions: point molecules, no intermolecular force except during elastic collisions, random motion, container walls rigid, time of collision negligible, number huge so averages exist. Pressure is momentum transfer per second per area. Work in a quasi-static compression is $\\int P\\,dV$; for isothermal ideal this is $nRT\\ln(V_1/V_2)$ (by the system, with physics signs). Avogadro’s number $N_A=6.02\\times10^{23}$ converts moles to molecules; $R=N_A k$. Mean free path $\\lambda=1/(\\sqrt{2}\\,n\\pi d^2)$ falls if you raise pressure (more $n$).",
        {
          bullets: [
            "A real gas at high P, low T violates ‘no forces’ and ‘point molecules’ — van der Waals.",
            "$\\frac12 m v_{\\mathrm{rms}}^2=\\frac32 kT$ is the kinetic definition of temperature.",
          ],
        },
      ),
    ],
  },
  "phy-oscillations": {
    theory: [
      T(
        "phy-osc-ucm",
        "SHM from uniform circular motion, and the pendulum derivation",
        "A point moving on a circle of radius $A$ with constant $\\omega$ has $x$-projection $x=A\\cos(\\omega t+\\phi)$. That projection is SHM. This is why phase lives on a circle, and why $v=\\omega\\sqrt{A^2-x^2}$. Simple pendulum: for small $\\theta$, $\\tau=-mgL\\theta$ (in radians), $I=mL^2$, so $\\ddot\\theta+(g/L)\\theta=0$ and $T=2\\pi\\sqrt{L/g}$. The small-angle step $\\sin\\theta\\approx\\theta$ is the whole derivation; at $20^\\circ$ it is already a few percent off. Periodic functions: $\\sin(\\omega t)$, $\\cos(\\omega t)$, and any $f(t+T)=f(t)$. A loaded vertical spring oscillates about the stretched equilibrium — $g$ only shifts the origin.",
        {
          diagram: "pendulum",
          bullets: [
            "Seconds pendulum: $T=2$ s, $L\\approx 1$ m at standard g.",
            "In a lift accelerating up, $T=2\\pi\\sqrt{L/(g+a)}$. Freely falling: $T\\to\\infty$.",
          ],
        },
      ),
    ],
    worked: [
      W(
        "phy-osc-dw1",
        "boards",
        "Derive $T=2\\pi\\sqrt{L/g}$ for a simple pendulum (small angle).",
        [
          "Restoring torque $\\tau=-mgL\\sin\\theta\\approx -mgL\\theta$.",
          "$I\\ddot\\theta=\\tau$ with $I=mL^2$ gives $\\ddot\\theta+(g/L)\\theta=0$.",
          "$\\omega^2=g/L$, so $T=2\\pi/\\omega=2\\pi\\sqrt{L/g}$.",
        ],
        "$T=2\\pi\\sqrt{L/g}$.",
        "θ must be in radians for sinθ ≈ θ. This is the only derivation boards insist you write out.",
      ),
    ],
  },
  "phy-waves": {
    theory: [
      T(
        "phy-waves-official",
        "Superposition, reflection, organ pipes, harmonics",
        "Superposition: the net displacement is the algebraic sum of individual waves (linear medium). Reflection off a rigid end inverts the wave (phase change of $\\pi$, a node); off a free end it does not (antinode). A string fixed at both ends: $L=n\\lambda/2$, all harmonics. Open pipe: antinode–antinode, $L=n\\lambda/2$, all harmonics, $f_1=v/(2L)$. Closed pipe: node–antinode, $L=(2n-1)\\lambda/4$, odd harmonics only, $f_1=v/(4L)$. End correction $e=0.6r$ is added to $L$ per open end before you compute. Beats: two close frequencies, loudness oscillates at $|f_1-f_2|$.",
        {
          diagram: "wave-string",
          bullets: [
            "Progressive wave $y=A\\sin(kx-\\omega t)$ travels $+x$; $kx+\\omega t$ travels $-x$.",
            "Sound is longitudinal; a string wave is transverse. Speed on a string $\\sqrt{T/\\mu}$; in a gas $\\sqrt{\\gamma RT/M}$.",
          ],
        },
      ),
    ],
  },
  "phy-charges": {
    theory: [
      T(
        "phy-charges-dipole-torque",
        "Dipole in a uniform field; continuous charge",
        "A dipole $\\vec p=q\\,\\vec{2a}$ in a uniform $\\vec E$ feels zero net force (the two forces cancel) but a torque $\\vec\\tau=\\vec p\\times\\vec E$ trying to align $\\vec p$ with $\\vec E$. Potential energy $U=-\\vec p\\cdot\\vec E$ (zero at $90^\\circ$ in the usual convention). Continuous charge: $dq=\\lambda dl$ (line), $\\sigma dA$ (surface), $\\rho dV$ (volume). Superposition still holds: integrate $d\\vec E$. Conservation of charge is exact — charge is not created in electrostatics, only moved.",
        {
          bullets: [
            "Non-uniform E: a dipole also feels a net force toward stronger field if it is aligned.",
            "Gauss does not replace Coulomb for a cube with a charge at a corner — symmetry is missing.",
          ],
        },
      ),
    ],
    formulas: [F("Dipole torque", "\\vec\\tau = \\vec p\\times\\vec E"), F("Dipole U", "U=-\\vec p\\cdot\\vec E")],
  },
  "phy-potential": {
    theory: [
      T(
        "phy-pot-dielectric",
        "Dielectrics and energy stored (formulae)",
        "A dielectric polarises: bound charges appear on its faces and reduce the field to $E=E_0/\\kappa$. For a parallel plate with the battery connected (V fixed), $C\\to\\kappa C$, $Q\\to\\kappa Q$, $U\\to\\kappa U$. With the battery disconnected (Q fixed), $C\\to\\kappa C$, $V\\to V/\\kappa$, $U\\to U/\\kappa$. Energy stored: $U=\\frac12 CV^2=Q^2/(2C)=\\frac12 QV$. Equipotentials are perpendicular to field lines; a conductor is an equipotential volume.",
        {
          callout: {
            kind: "main",
            text: "The connected vs isolated dielectric question is the highest-yield capacitor item in Main. Draw Q, V, C, U before and after in a four-cell table.",
          },
        },
      ),
    ],
  },
  "phy-current": {
    theory: [
      T(
        "phy-current-drift",
        "Drift, mobility, Wheatstone, cells",
        "Drift speed $v_d=eE\\tau/m$ is millimetres per second; the signal is not. Current $I=neAv_d$. Mobility $\\mu=v_d/E$. Ohm’s law is $j=\\sigma E$ with $\\sigma=ne^2\\tau/m$. Wheatstone: $P/Q=R/S$ at balance — the galvanometer current is zero, which is why the bridge is a comparison, not a deflection instrument. Cells: series $\\mathcal{E}_{\\mathrm{eq}}=\\sum\\mathcal{E}$, $r_{\\mathrm{eq}}=\\sum r$; $n$ identical in parallel $\\mathcal{E}_{\\mathrm{eq}}=\\mathcal{E}$, $r_{\\mathrm{eq}}=r/n$. Terminal $V=\\mathcal{E}-Ir$ (discharging).",
        {
          diagram: "wheatstone",
          bullets: [
            "A non-linear V–I (diode, lamp) is not Ohmic; slope at a point is dynamic resistance.",
            "Emf is the open-circuit terminal PD. Internal r eats $Ir$ when current flows.",
          ],
        },
      ),
    ],
    formulas: [
      F("Drift", "I = n e A v_d"),
      F("Wheatstone", "P/Q = R/S"),
      F("Terminal PD", "V=\\mathcal{E}-Ir"),
    ],
  },
  "phy-moving": {
    theory: [
      T(
        "phy-moving-ampere-galvo",
        "Definition of ampere, galvanometer, conversion",
        "Two infinite parallel currents $I$ a distance $d$ apart attract if they are parallel: $F/\\ell=\\mu_0 I_1 I_2/(2\\pi d)$. One ampere is the current which, in two long parallel wires 1 m apart, produces $2\\times10^{-7}$ N/m. A moving-coil galvanometer: $\\tau=NIAB\\sin\\theta$, a spring $\\tau=k\\theta$ gives $\\theta\\propto I$ (current sensitivity $\\theta/I=NAB/k$). Shunt $S$ converts it to an ammeter of range $nI_g$: $S=I_g G/(I-I_g)$. Series multiplier $R=(V/I_g)-G$ converts it to a voltmeter.",
        {
          bullets: [
            "Ammeter: small resistance, always series. Voltmeter: large resistance, always parallel.",
            "Oersted: a current produces B, circling by right-hand thumb.",
          ],
        },
      ),
    ],
    formulas: [
      F("Force / length, two wires", "F/\\ell = \\mu_0 I_1 I_2 / (2\\pi d)"),
      F("Shunt", "S = I_g G / (I-I_g)"),
    ],
  },
  "phy-mag-matter": {
    theory: [
      T(
        "phy-mag-materials",
        "Dia, para, ferro — the board paragraph",
        "Diamagnetic ($\\chi$ small negative, $\\mu_r<1$): Bi, Cu, water, superconductor ($\\chi=-1$). Weakly repelled; independent of T. Paramagnetic ($\\chi$ small positive): Al, O₂, Pt; weakly attracted; $\\chi\\propto 1/T$ (Curie). Ferromagnetic ($\\chi$ huge): Fe, Co, Ni, Gd; domains; Curie temperature above which they become para. Field lines prefer ferro (they crowd in). Temperature agitates domains and kills ferro at $T_C$.",
      ),
    ],
  },
  "phy-emi": {
    theory: [
      T(
        "phy-emi-lenz",
        "Faraday, Lenz, self and mutual",
        "Faraday: $\\mathcal{E}=-d\\Phi_B/dt$, with $\\Phi=N\\int\\vec B\\cdot d\\vec A$. Lenz: the induced current fights the change — if flux in is increasing, the loop becomes a magnet pointing out. Motional $\\mathcal{E}=B\\ell v$ for a rod on rails. Self inductance $L$ from $\\Phi=LI$ so $\\mathcal{E}=-L dI/dt$; solenoid $L=\\mu_0 n^2 A\\ell$. Mutual $M$ from $\\Phi_{21}=M I_1$. Energy in an inductor $\\frac12 LI^2$.",
      ),
    ],
  },
  "phy-ac": {
    theory: [
      T(
        "phy-ac-rms-xfmr",
        "Peak vs RMS, wattless current, generator, transformer",
        "For a sinusoid, $I_{\\mathrm{rms}}=I_0/\\sqrt{2}$, $V_{\\mathrm{rms}}=V_0/\\sqrt{2}$ — this is the heating-equivalent DC. Power $P=V_{\\mathrm{rms}}I_{\\mathrm{rms}}\\cos\\phi$. Wattless current is the component $I\\sin\\phi$ that contributes no average power (pure L or C, $\\phi=\\pm 90^\\circ$). An AC generator is Faraday on a rotating coil: $\\mathcal{E}=NBA\\omega\\sin\\omega t$. Transformer: $V_s/V_p=N_s/N_p=I_p/I_s$ (ideal). Laminated core kills eddy losses; thick wire kills $I^2R$; μ-metal kills hysteresis.",
        { diagram: "transformer" },
      ),
    ],
  },
  "phy-emw": {
    theory: [
      T(
        "phy-emw-disp",
        "Displacement current and the spectrum",
        "Ampere’s law as written with $I$ only fails for a charging capacitor: Maxwell added $I_d=\\varepsilon_0 d\\Phi_E/dt$, equal to the conduction current in the wires. EM waves: $\\vec E\\perp\\vec B\\perp\\vec k$, speed $c=1/\\sqrt{\\mu_0\\varepsilon_0}$, $E/B=c$. Spectrum in increasing frequency: radio → microwave → infrared → visible → ultraviolet → X-rays → γ. Uses: radio (communication), microwave (radar, ovens), IR (remote, thermal), UV (sterilisation), X (imaging), γ (cancer, nuclear).",
      ),
    ],
  },
  "phy-ray": {
    theory: [
      T(
        "phy-ray-tir-inst",
        "TIR, optical fibres, microscopes and telescopes",
        "TIR: denser → rarer, $i>i_c$ with $\\sin i_c=n_r/n_d$. Optical fibre: a high-$n$ core, low-$n$ cladding; the ray zig-zags by TIR. Microscope: $m\\approx L D/(f_o f_e)$ (near-point final image). Astronomical telescope, normal adjustment (final at infinity): $m=f_o/f_e$, tube length $f_o+f_e$. Reflecting telescopes replace the huge $f_o$ lens by a mirror (no chromatic, can be supported from the back).",
        {
          bullets: [
            "Mirror formula $1/v+1/u=1/f$ with New Cartesian signs.",
            "Prism: $\\delta=(n-1)A$ for small A; at minimum deviation $i=e$, $n=\\sin((A+\\delta_m)/2)/\\sin(A/2)$.",
          ],
        },
      ),
    ],
    formulas: [
      F("Critical angle", "\\sin i_c = n_2/n_1\\ (n_1>n_2)"),
      F("Telescope m (normal)", "m=f_o/f_e"),
    ],
  },
  "phy-wave-opt": {
    theory: [
      T(
        "phy-wave-huygens",
        "Huygens’ proofs, coherence, single-slit diffraction",
        "Every point of a wavefront is a source of secondary wavelets; the envelope is the new wavefront. Reflection: the construction recovers $i=r$. Refraction: it recovers $n_1\\sin i=n_2\\sin r$ because the speed (and so the radius of the wavelet) changes. Coherent sources: constant phase difference (usually obtained by splitting one source — YDSE). Single-slit diffraction: central max of angular width $2\\lambda/a$; first min at $a\\sin\\theta=\\lambda$. Narrower slit, fatter central max.",
        {
          bullets: [
            "Sustained interference needs coherence, overlapping, and roughly equal amplitudes.",
            "Fringe width $\\beta=\\lambda D/d$ is the only YDSE formula boards require you to quote without derivation.",
          ],
        },
      ),
    ],
  },
  "phy-dual": {
    theory: [
      T(
        "phy-dual-expt",
        "Hertz, Lenard, the photoelectric graphs",
        "Hertz saw sparks jump more easily when UV hit the gap. Lenard showed the emitted particles were electrons, that $KE_{\\max}$ depends on frequency not intensity, and that a threshold frequency exists. Einstein: $h\\nu=\\phi+KE_{\\max}$, one photon–one electron. Experimental graphs: (i) $I$ vs $V$ for two intensities — saturation current doubles, $V_0$ does not; (ii) $V_0$ vs $\\nu$ is a straight line of slope $h/e$, intercept $\\nu_0$. de Broglie $\\lambda=h/p$; for an electron accelerated by $V$, $\\lambda=12.27/\\sqrt{V}$ Å.",
      ),
    ],
  },
  "phy-atoms": {
    theory: [
      T(
        "phy-atoms-ruth",
        "Rutherford scattering and hydrogen spectra",
        "Geiger–Marsden: most α go through, a few bounce — the atom is empty with a tiny positive nucleus. Impact parameter and scattering angle: closer approach, larger $\\theta$. Bohr: angular momentum $n\\hbar$, centripetal = Coulomb, gives $r_n=n^2 a_0/Z$ and $E_n=-13.6 Z^2/n^2$ eV. Spectra (qualitative): Lyman (to n=1, UV), Balmer (to n=2, visible), Paschen (to n=3, IR). A line’s wave number $\\bar\\nu=R(1/n_1^2-1/n_2^2)$.",
        { diagram: "bohr" },
      ),
    ],
  },
  "phy-nuclei": {
    theory: [
      T(
        "phy-nuclei-force",
        "Nuclear force, fission, fusion",
        "Nuclear force: short range (~1–2 fm), charge-independent, saturating, much stronger than Coulomb inside the nucleus. BE per nucleon peaks near $^{56}$Fe — that is why fission of heavy nuclei and fusion of light nuclei both release energy. Fission: a slow neutron on $^{235}$U, two fragments plus 2–3 neutrons and ~200 MeV. Fusion: $4p\\to\\,^4He$ in the sun, needs millions of kelvin to beat Coulomb. Mass defect $\\Delta m$ gives $E=\\Delta m c^2$ with $1\\,\\mathrm{u}=931$ MeV.",
      ),
    ],
  },
  "phy-semiconductors": {
    theory: [
      T(
        "phy-semi-bands",
        "Bands, p–n, diode as rectifier",
        "In a solid the atomic levels spread into bands. Conductor: valence and conduction overlap (or a half-filled band). Insulator: gap $\\gtrsim 3$ eV. Semiconductor: gap ~1 eV, so $kT$ at room temperature promotes some electrons. n-type: pentavalent dopant, electrons majority. p-type: trivalent, holes majority. p–n junction: diffusion creates a depletion barrier $V_0$. Forward bias thins it (current flows); reverse widens it (tiny reverse current). Half-wave rectifier: one diode, one polarity. Full-wave: two (or a bridge), both half-cycles, twice the ripple frequency.",
        { diagram: "pn-diode" },
      ),
    ],
  },
};
