import type { ChapterContent } from "../types";
import { F, pack, Q, T, W } from "./pack";

export const PHYSICS_XII: Record<string, ChapterContent> = {
  "phy-charges": pack(
    "phy-charges",
    [
      T(
        "t0",
        "If you just opened Class 12",
        "Electric charge is the new mass: it comes in lumps of $e=1.6\\times10^{-19}\\,\\mathrm{C}$, it is conserved, and unlike mass it has two signs so forces can repel. Almost every electrostatics numerical is Coulomb’s law plus superposition. Gauss’s law is the same physics, rewritten for symmetry so you never have to integrate a mess.",
        {
          callout: {
            kind: "board",
            text: "Write one clean sentence each for quantisation, conservation and additivity. Boards award the sentence; Main hides a sign error inside a three-charge puzzle.",
          },
        },
      ),
      T(
        "t1",
        "Coulomb’s law and superposition",
        "The force on $q_1$ due to $q_2$ is $\\vec F_{12}=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}\\hat r_{21}$ in vacuum. In a linear dielectric replace $\\varepsilon_0$ by $\\varepsilon=\\kappa\\varepsilon_0$. Superposition is linear: the net field is the vector sum, never the sum of magnitudes unless the vectors are parallel. $k=9\\times10^9$ in SI. A continuous charge is handled by $dq=\\lambda dl$, $\\sigma dA$ or $\\rho dV$.",
        {
          bullets: [
            "Like charges repel; the unit vector always points from the source charge to the field point.",
            "A charge does not exert a force on itself. Do not include $q$ in the field that acts on $q$.",
            "For three charges, draw three arrows at the test charge, then components.",
          ],
        },
      ),
      T(
        "t2",
        "Electric field and field lines",
        "$\\vec E=\\vec F/q_0$ in the $q_0\\to 0$ limit. Field of a point charge $E=kq/r^2$. Dipole at a point on axis $E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{2p}{r^3}$; on equator $E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^3}$ opposite to $\\vec p$. Lines start on $+$ and end on $-$ (or infinity); they never cross; density is $|E|$.",
        { diagram: "gauss-sphere" },
      ),
      T(
        "t3",
        "Gauss’s law — the symmetry machine",
        "$\\oint\\vec E\\cdot d\\vec A=Q_{\\mathrm{encl}}/\\varepsilon_0$. Use it only when symmetry makes $|E|$ constant on the Gaussian surface and $\\vec E\\parallel d\\vec A$ (or perpendicular, contributing 0). Standard: infinite line $E=\\lambda/(2\\pi\\varepsilon_0 r)$, infinite sheet $E=\\sigma/(2\\varepsilon_0)$ (one sheet, either side), conductor surface $E=\\sigma/\\varepsilon_0$ just outside. Inside a uniformly charged insulating sphere $E\\propto r$; outside like a point.",
        {
          callout: {
            kind: "main",
            text: "Main’s Gauss item is almost always ‘which surface’ or the inside/outside sphere pair. If you cannot name the symmetry (spherical / cylindrical / planar), you cannot use Gauss.",
          },
        },
      ),
      T(
        "t4",
        "Conductors at electrostatics rest",
        "E = 0 in the material of a conductor. Excess charge sits on the outer surface. Cavity with no charge: inner surface charge is 0. Charge $q$ in a cavity: inner surface gets $-q$, outer gets $+q$ extra. A conductor is an equipotential. Sharp points have large $\\sigma$ and large $E$ (corona).",
        {
          callout: {
            kind: "advanced",
            text: "A cavity theorem and a Gaussian pillbox at the surface are Advanced’s favourite two-line arguments. The field inside a charged conductor’s cavity is zero only if the cavity is empty of charge.",
          },
        },
      ),
    ],
    [
      F("Coulomb", "F=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}"),
      F("Point field", "E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}"),
      F("Gauss", "\\oint E\\,dA = Q_{\\mathrm{encl}}/\\varepsilon_0"),
      F("Infinite line", "E=\\lambda/(2\\pi\\varepsilon_0 r)"),
      F("Infinite sheet", "E=\\sigma/(2\\varepsilon_0)"),
      F("Conductor surface", "E=\\sigma/\\varepsilon_0"),
      F("Dipole axis", "E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{2p}{r^3}"),
      F("Dipole equator", "E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^3}"),
    ],
    [
      "Adding field magnitudes instead of components.",
      "Using Gauss on a cube with a charge at a corner without the 8-cube trick.",
      "Writing $E=\\sigma/\\varepsilon_0$ for an infinite sheet in vacuum (that is the conductor result).",
      "Including the test charge in $Q_{\\mathrm{encl}}$.",
    ],
    [
      "Draw $\\vec E$ arrows before writing a single equation.",
      "If symmetry is spherical, cylindrical or planar, Gauss; otherwise Coulomb integral.",
      "For a conductor, start from $E=0$ inside and a Gaussian pillbox.",
    ],
    [
      W("w1", "main", "Two charges $+q$ and $+q$ at $x=\\pm a$. Field at the origin?", ["Equal opposite fields cancel.", "$E=0$."], "$0$", "Same charges, midpoint: cancel. Opposite charges: $2kq/a^2$."),
      W("w2", "advanced", "Uniform insulating sphere radius $R$, total $Q$. $E$ at $r=R/2$?", ["Gauss: $Q_{\\mathrm{encl}}=Q(r/R)^3=Q/8$.", "$E\\,4\\pi r^2=Q_{\\mathrm{encl}}/\\varepsilon_0$.", "$E=Q/(8\\pi\\varepsilon_0 R^2)$ wait: $E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q r}{R^3}=\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{2R^2}$."], "$\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{2R^2}$", "Inside: $E\\propto r$. Outside: $1/r^2$."),
      W("w3", "boards", "State Gauss’s law and name one symmetry it solves instantly.", ["Flux $=Q/\\varepsilon_0$.", "Infinite line, sheet, or spherical shell."], "Flux through a closed surface equals enclosed charge over $\\varepsilon_0$.", "Boards want the statement in words plus one application."),
    ],
    [
      Q("q1", "main", "Field inside a uniformly charged insulating sphere, $r<R$, is proportional to", ["$1/r^2$", "$1/r$", "$r$", "constant"], 2, "Gauss with $Q_{\\mathrm{encl}}\\propto r^3$ gives $E\\propto r$."),
      Q("q2", "boards", "Quantisation of charge means", ["$q=ne$, $n\\in\\mathbb{Z}$", "charge is conserved", "charge is a vector", "charge depends on speed"], 0, "Millikan; $e$ is the quantum."),
      Q("q3", "main", "An infinite plane sheet of charge has $E$", ["$\\sigma/\\varepsilon_0$ independent of side", "$\\sigma/(2\\varepsilon_0)$ on each side", "$\\sigma/(4\\pi\\varepsilon_0)$", "zero"], 1, "Non-conducting sheet. Conductor: $\\sigma/\\varepsilon_0$ just outside."),
      Q("q4", "advanced", "A charge $q$ inside a cavity of an isolated neutral conductor. Charge on the outer surface is", ["0", "$+q$", "$-q$", "$q/2$"], 1, "Inner induced $-q$; outer $+q$ so the conductor stays neutral."),
      Q("q5", "main", "Electric field lines", ["can cross at a null point", "are closer where $|E|$ is larger", "form closed loops in electrostatics", "start on negative charges"], 1, "They never cross; electrostatic lines start on + and end on −."),
    ],
    [
      { title: "Rank booster — cube corner", body: "Charge at a cube corner: only $1/8$ of the full solid angle is inside. Flux through the cube is $q/(8\\varepsilon_0)$. Flux through one adjacent face is not $1/6$ of that — three faces meet, and the field is not uniform. Advanced wants the $1/8$ argument, not a fake $1/24$ unless they ask total flux through the three adjacent faces ($q/(24\\varepsilon_0)$ each if symmetry of an infinite lattice of cubes is used)." },
      { title: "Olympiad stretch — dipole field from potential", body: "Once $V=\\frac{1}{4\\pi\\varepsilon_0}\\frac{\\vec p\\cdot\\hat r}{r^2}$ is known, $\\vec E=-\\nabla V$ recovers both axis and equatorial formulae and the general angular form." },
    ],
    [
      "I never add $E$ as numbers when directions differ.",
      "I can write Gauss for line, sheet, sphere (inside and out) without looking.",
      "I know conductor: $E=0$ inside, $\\sigma$ on the surface, cavity theorems.",
      "I distinguish $\\sigma/2\\varepsilon_0$ (sheet) from $\\sigma/\\varepsilon_0$ (conductor).",
    ],
    "Main: Coulomb components, Gauss sphere inside/outside, and the infinite-sheet factor of 2. Advanced: cavity, flux through part of a cube, and a dipole in a non-uniform field ($\\vec F=(\\vec p\\cdot\\nabla)\\vec E$).",
    {
      heading: "Class 11 student arriving here",
      body: "You only need vectors from Class 11 and the habit of a free-body diagram. Charge is a signed scalar; the field is a vector. Spend one evening only on Coulomb + components before touching Gauss.",
      bullets: ["Master the three-charge plane problem.", "Then one Gauss sphere.", "Leave dielectrics until capacitors."],
    },
  ),

  "phy-potential": pack(
    "phy-potential",
    [
      T("t1", "Potential as the line integral", "$V(B)-V(A)=-\\int_A^B\\vec E\\cdot d\\vec\\ell$. In electrostatics the integral is path-independent, so $\\vec E=-\\nabla V$ and $\\oint E\\cdot dl=0$. Point charge $V=kq/r$ (zero at infinity). Superposition holds for $V$ as a scalar — that is why potential is often easier than field.", { diagram: "capacitor" }),
      T("t2", "Energy of charge assemblies", "A pair: $U=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r}$. A continuous cloud: $U=\\frac{\\varepsilon_0}{2}\\int E^2 d\\tau=\\frac12\\int\\rho V\\,d\\tau$. Bringing $q$ from infinity to a point: $W=qV$. A dipole in a uniform field: $\\tau=pE\\sin\\theta$, $U=-pE\\cos\\theta$."),
      T("t3", "Capacitors", "$C=Q/V$. Parallel plate $C=\\kappa\\varepsilon_0 A/d$. Series: $1/C=\\sum 1/C_i$ (same $Q$). Parallel: $C=\\sum C_i$ (same $V$). Energy $U=\\frac12 CV^2=Q^2/(2C)=\\frac12 QV$. Inserting a dielectric with battery connected: $V$ fixed, $Q$ and $U$ rise by $\\kappa$. Battery disconnected: $Q$ fixed, $V$ and $U$ fall.", { callout: { kind: "main", text: "The battery-connected vs isolated pair is the highest-yield capacitor trap in Main." } }),
      T("t4", "Combinations and dielectrics", "A metal slab of thickness $t$ filling the gap in area: $C=\\varepsilon_0 A/(d-t)$. Dielectric slab filling a fraction of the gap is a series combination; filling a fraction of the area is parallel. Energy density $\\frac12\\varepsilon_0 E^2$ ($\\frac12\\kappa\\varepsilon_0 E^2$ in a linear dielectric)."),
    ],
    [
      F("Potential of a point", "V=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}"),
      F("Field from V", "\\vec E=-\\nabla V"),
      F("Pair energy", "U=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r}"),
      F("Capacitance", "C=Q/V,\\quad C=\\kappa\\varepsilon_0 A/d"),
      F("Energy", "U=\\tfrac12 C V^2"),
      F("Series", "1/C=\\sum 1/C_i"),
      F("Dipole energy", "U=-pE\\cos\\theta"),
    ],
    [
      "Taking $V=0$ at a finite point without restating it.",
      "Using $U=qV$ with $V$ of the charge itself (self-energy double-count).",
      "Inserting dielectric and mixing the ‘battery on/off’ cases.",
      "Series capacitors share $V$ — they do not; they share $Q$.",
    ],
    [
      "Scalar first: compute $V$, then $E=-dV/dr$ if the problem is radial.",
      "Always announce whether $Q$ or $V$ is the conserved quantity.",
      "Energy stored is in the field, not ‘in the plates’.",
    ],
    [
      W("w1", "main", "Two capacitors $2\\,\\mu\\mathrm{F}$ and $3\\,\\mu\\mathrm{F}$ in series on $10\\,\\mathrm{V}$. Charge on each?", ["$C_{\\mathrm{eq}}=6/5=1.2\\,\\mu\\mathrm{F}$.", "$Q=C_{\\mathrm{eq}}V=12\\,\\mu\\mathrm{C}$ on each."], "$12\\,\\mu\\mathrm{C}$", "Series: same $Q$, voltages split as $1/C$."),
      W("w2", "advanced", "Isolated charged capacitor, $U_i=\\frac12 Q^2/C$. Dielectric $\\kappa=2$ fills it. New energy?", ["$Q$ fixed, $C\\to 2C$.", "$U_f=Q^2/(4C)=U_i/2$."], "Halved", "The missing energy is the work the field does pulling the dielectric in."),
    ],
    [
      Q("q1", "main", "Equipotential surfaces", ["are parallel to $\\vec E$", "are perpendicular to $\\vec E$", "are the same as field lines", "cannot be closed"], 1, "No work along an equipotential, so $E_\\parallel=0$."),
      Q("q2", "boards", "Work by electrostatic field in a closed loop is", ["$q\\oint E\\cdot dl=0$", "always positive", "$qV$", "undefined"], 0, "Conservative field."),
      Q("q3", "main", "Two equal capacitors in parallel. Equivalent is", ["half of one", "twice of one", "unchanged", "zero"], 1, "Parallel adds $C$."),
      Q("q4", "advanced", "A dipole in a uniform field has net force", ["$pE$", "0", "$pE\\sin\\theta$", "unstable unless aligned"], 1, "Force is zero in a uniform field; torque is not."),
      Q("q5", "boards", "SI unit of capacitance is", ["volt", "coulomb", "farad", "ohm"], 2, "$1\\,\\mathrm{F}=1\\,\\mathrm{C/V}$."),
    ],
    [{ title: "Mix-chapter", body: "RC charging later uses $C$ here. A conducting sphere’s $C=4\\pi\\varepsilon_0 R$ is a Gauss + $V=kq/R$ one-liner — Advanced numericals love it." }],
    ["I treat $V$ as a scalar sum.", "I know series vs parallel for $C$.", "Battery on: $V$ fixed. Isolated: $Q$ fixed.", "I can write $C=4\\pi\\varepsilon_0 R$ for an isolated sphere."],
    "Main: combination + dielectric with/without battery. Potential of a shell (constant inside). Advanced: energy density integrals, image-charge flavour, and $C$ of unusual geometries.",
  ),

  "phy-current": pack(
    "phy-current",
    [
      T("t1", "Current, drift, Ohm", "$I=nqAv_d$. Ohm’s law microscopically $v_d=eE\\tau/m$, so $\\sigma=ne^2\\tau/m$, $J=\\sigma E$. Resistance $R=\\rho\\ell/A$, $\\rho=1/\\sigma$. Temperature: $\\rho=\\rho_0(1+\\alpha\\Delta T)$ for metals ($\\alpha>0$).", { diagram: "circuit-series" }),
      T("t2", "Kirchhoff", "Junction: $\\sum I=0$ (charge). Loop: $\\sum\\varepsilon=\\sum IR$ with a consistent sign convention. A battery of emf $\\varepsilon$ and internal $r$ has terminal $V=\\varepsilon-Ir$ when discharging, $V=\\varepsilon+Ir$ when charging."),
      T("t3", "Combinations, instruments", "Series $R$ adds; parallel $1/R$ adds. Wheatstone: $P/Q=R/S$ at balance. Metre bridge is Wheatstone on a wire. Potentiometer measures emf because current through the cell is zero at null. Ammeter: shunt $S=I_g G/(I-I_g)$ in parallel. Voltmeter: multiplier $R=(V/I_g)-G$ in series."),
      T("t4", "RC transients", "Charging $q=CE(1-e^{-t/RC})$, $I=(E/R)e^{-t/RC}$. Discharging $q=q_0 e^{-t/RC}$. Time constant $\\tau=RC$ is the time to $63\\%$ of the final charge. Energy from the battery is $CE^2$; half is stored, half is heat in $R$.", { callout: { kind: "advanced", text: "Advanced will ask the heat in $R$ during charging ($\\frac12 CE^2$) or the current immediately after a switch — capacitors are shorts at $t=0^+$, opens in DC steady state." } }),
    ],
    [
      F("Drift", "I=nqAv_d"),
      F("Ohm microscopic", "J=\\sigma E,\\quad \\sigma=ne^2\\tau/m"),
      F("Resistance", "R=\\rho\\ell/A"),
      F("Terminal voltage", "V=\\varepsilon\\mp Ir"),
      F("RC charge", "q=CE(1-e^{-t/RC})"),
      F("Shunt", "S=\\frac{I_g G}{I-I_g}"),
    ],
    [
      "Using $V=\\varepsilon+Ir$ while the battery is discharging.",
      "Metre-bridge formula with $\\ell$ measured from the wrong end.",
      "Treating a capacitor as a resistor in DC steady state (it is an open).",
      "Power in a resistor is $I^2R$, not $I^2/R$.",
    ],
    [
      "At $t=0^+$ a capacitor is a wire; in DC steady state it is a gap.",
      "Colour the currents on the diagram before writing loops.",
      "Potentiometer > voltmeter when ‘actual emf’ is asked.",
    ],
    [
      W("w1", "main", "A $12\\,\\mathrm{V}$ battery, $r=1\\,\\Omega$, load $5\\,\\Omega$. Terminal voltage?", ["$I=12/6=2\\,\\mathrm{A}$.", "$V=\\varepsilon-Ir=12-2=10\\,\\mathrm{V}$."], "$10\\,\\mathrm{V}$", "Load shares $IR$; internal drop is $Ir$."),
      W("w2", "boards", "Three $6\\,\\Omega$ resistors, all in parallel. $R_{\\mathrm{eq}}$?", ["$1/R=3/6=1/2$.", "$R=2\\,\\Omega$."], "$2\\,\\Omega$", "Equal parallels: $R/n$."),
    ],
    [
      Q("q1", "main", "Drift speed in a metal is of order", ["$10^8$ m/s", "$10^{-4}$ m/s", "speed of light", "sound speed"], 1, "Current is large because $n$ is huge, not because $v_d$ is."),
      Q("q2", "boards", "SI unit of resistivity is", ["$\\Omega$", "$\\Omega\\,\\mathrm{m}$", "$\\Omega/\\mathrm{m}$", "siemens"], 1, "$\\rho=RA/\\ell$."),
      Q("q3", "main", "In a balanced Wheatstone bridge the galvanometer current is", ["maximum", "zero", "equal to battery current", "undefined"], 1, "Definition of balance."),
      Q("q4", "advanced", "Just after a series RC circuit is connected to emf $E$, the current is", ["0", "$E/R$", "$E/(2R)$", "infinite"], 1, "Uncharged capacitor behaves as a short."),
      Q("q5", "boards", "An ideal ammeter has resistance", ["infinite", "zero", "equal to the load", "equal to $G$"], 1, "It must not steal voltage."),
    ],
    [{ title: "Lab bridge", body: "Metre-bridge end-error: use the inverse relation $X=R(100-\\ell)/\\ell$ if the unknown sits on the other side. Always swap and average." }],
    ["I can write $I=nqAv_d$ and $\\rho(T)$.", "Kirchhoff with signs, not hope.", "Shunt vs multiplier.", "RC: $t=0^+$ vs steady DC."],
    "Main: terminal voltage, wheatstone/metre bridge, colour-code, and a simple RC. Advanced: multi-loop with a capacitor, heating during charge, and potentiometer gradient problems.",
  ),

  "phy-moving": pack(
    "phy-moving",
    [
      T("t1", "Lorentz force", "$\\vec F=q(\\vec E+\\vec v\\times\\vec B)$. Magnetic force is always perpendicular to $\\vec v$, does no work, cannot change speed. Helix: $T=2\\pi m/(qB)$, $r=mv_\\perp/(qB)$, pitch $=v_\\parallel T$. Cyclotron: $f=qB/(2\\pi m)$ independent of speed (until relativity).", { diagram: "circular" }),
      T("t2", "Biot–Savart and Ampere", "Biot–Savart: $dB=\\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}$. Finite wire: $B=\\frac{\\mu_0 I}{4\\pi d}(\\sin\\theta_1+\\sin\\theta_2)$. Infinite wire $B=\\mu_0 I/(2\\pi d)$. Loop centre $B=\\mu_0 I/(2R)$. Ampere: $\\oint B\\cdot dl=\\mu_0 I_{\\mathrm{encl}}$ — solenoid $B=\\mu_0 n I$, toroid $B=\\mu_0 NI/(2\\pi r)$."),
      T("t3", "Force on wires and moments", "A straight wire: $F=I\\ell B\\sin\\theta$. Parallel wires: $F/\\ell=\\mu_0 I_1 I_2/(2\\pi d)$ (attract if currents same way). Loop: $\\vec\\mu=IA\\hat n$, $\\vec\\tau=\\vec\\mu\\times\\vec B$, $U=-\\mu B\\cos\\theta$."),
      T("t4", "Charged particle recipes", "Perpendicular $\\vec B$: circle. Parallel: undeflected. Crossed $\\vec E$ and $\\vec B$: undeflected if $v=E/B$ (velocity selector). Hall effect: $V_H=IB/(ne d)$."),
    ],
    [
      F("Lorentz", "\\vec F=q(\\vec E+\\vec v\\times\\vec B)"),
      F("Cyclotron radius", "r=mv/(qB)"),
      F("Infinite wire", "B=\\mu_0 I/(2\\pi d)"),
      F("Loop centre", "B=\\mu_0 I/(2R)"),
      F("Solenoid", "B=\\mu_0 n I"),
      F("Wire force", "F=I\\ell B\\sin\\theta"),
      F("Parallel wires", "F/\\ell=\\mu_0 I_1 I_2/(2\\pi d)"),
    ],
    [
      "Using $F=qvB$ when $\\vec v$ is not perpendicular to $\\vec B$.",
      "Putting $B=\\mu_0 I/(2\\pi R)$ at the centre of a loop (that is a wire).",
      "Thinking magnetic force can speed a particle up.",
      "Right-hand rule for $\\vec v\\times\\vec B$ with the wrong hand on the current.",
    ],
    [
      "Work by magnetic force is identically 0. If kinetic energy changes, an electric field is in the story.",
      "For Ampere, the Amperian loop is a circle/rectangle that copies the symmetry.",
      "Velocity selector $v=E/B$ is a one-line filter for mass-spec questions.",
    ],
    [
      W("w1", "main", "Electron, $v=10^6$ m/s, perpendicular $B=0.1$ T. $r$? $m=9\\times10^{-31}$, $e=1.6\\times10^{-19}$.", ["$r=mv/(eB)=9\\times10^{-31}\\times10^6/(1.6\\times10^{-19}\\times0.1)$.", "$r\\approx 5.6\\times10^{-5}$ m."], "$5.6\\times10^{-5}\\,\\mathrm{m}$", "Perpendicular: whole $v$ is $v_\\perp$."),
      W("w2", "boards", "Direction of $\\vec B$ inside a long solenoid carrying current.", ["Along the axis, given by right-hand grip."], "Axial, uniform in the ideal limit.", "Outside an ideal long solenoid $B=0$."),
    ],
    [
      Q("q1", "main", "Magnetic force never changes a charged particle’s", ["direction", "speed", "velocity vector", "path curvature"], 1, "Always perpendicular to $\\vec v$."),
      Q("q2", "boards", "SI unit of magnetic field is", ["tesla", "weber", "henry", "gauss only"], 0, "$1\\,\\mathrm{T}=1\\,\\mathrm{N\\,A^{-1}\\,m^{-1}}$. Gauss is cgs."),
      Q("q3", "main", "Two parallel currents in the same sense", ["repel", "attract", "exert no force", "torque only"], 1, "Ampère’s force law."),
      Q("q4", "advanced", "Pitch of a helical path is", ["$2\\pi m v_\\perp/(qB)$", "$v_\\parallel\\cdot 2\\pi m/(qB)$", "$mv/qB$", "zero always"], 1, "Pitch = parallel distance in one cyclotron period."),
      Q("q5", "main", "Field at the centre of a circular loop is", ["$\\mu_0 I/(2R)$", "$\\mu_0 I/(2\\pi R)$", "$\\mu_0 I/(4\\pi R)$", "0"], 0, "Biot–Savart integrated."),
    ],
    [{ title: "Mass spectrometer", body: "Selector $v=E/B_1$ then a pure $B_2$ chamber: $r=mv/(qB_2)$ so $m=qB_2 r/v$. Isotope questions are this formula twice." }],
    ["Lorentz work is zero.", "I have the four standard $B$ formulae.", "Helix: $r$ from $v_\\perp$, pitch from $v_\\parallel$.", "Solenoid $n$ is turns per metre, not total $N$."],
    "Main: infinite wire, loop centre, $r=mv/qB$, parallel-wire force. Advanced: helix pitch, non-uniform $B$, and current-sheet Ampere.",
  ),

  "phy-mag-matter": pack(
    "phy-mag-matter",
    [
      T("t1", "Three magnetic materials", "Diamagnetic: $\\chi$ small and negative, $\\mu_r$ slightly $<1$, weakly expelled from a field (superconductor: perfect diamagnet, Meissner). Paramagnetic: $\\chi$ small positive, Curie $1/T$. Ferromagnetic: $\\chi$ huge, domains, hysteresis, Curie temperature $T_C$ above which it becomes para."),
      T("t2", "Definitions", "$\\vec B=\\mu_0(\\vec H+\\vec M)$, $\\chi=M/H$, $\\mu_r=1+\\chi$. Intensity of magnetisation $M$ is magnetic moment per volume. A bar magnet: $B$ lines come out of the north pole; $H$ lines inside a bar magnet run south to north (opposite to $B$)."),
      T("t3", "Earth’s magnetism", "Declination, inclination (dip), horizontal component $B_H=B_E\\cos\\delta$. Apparent dip in a plane not magnetic meridian. Tangent galvanometer and vibration magnetometer are the lab tools."),
    ],
    [
      F("Constitutive", "B=\\mu_0(H+M),\\quad \\mu_r=1+\\chi"),
      F("Dip", "B_H=B_E\\cos\\delta,\\quad B_V=B_E\\sin\\delta"),
      F("Curie para", "\\chi=C/T"),
    ],
    ["Calling aluminium ferromagnetic.", "Using $\\mu_r<1$ for para.", "Mixing $B$ and $H$ inside a bar magnet."],
    ["Classify a material by $\\chi$ sign and order of magnitude, not by a story.", "Hysteresis area is energy lost per cycle per volume."],
    [
      W("w1", "main", "A material with $\\chi=-9\\times10^{-6}$ is classified as?", ["Negative and of order $10^{-5}$ means diamagnetic."], "diamagnetic", "Sign of $\\chi$ is the classifier: dia negative, para small positive, ferro huge."),
    ],
    [
      Q("q1", "main", "Superconductors in the Meissner state are", ["perfect paramagnets", "perfect diamagnets", "ferromagnets", "unmagnetisable"], 1, "$\\chi=-1$, $B=0$ inside."),
      Q("q2", "boards", "Curie temperature is where a ferromagnet becomes", ["dia", "para", "a superconductor", "unmagnetised forever"], 1, "Domains scramble; $\\chi$ follows Curie–Weiss above $T_C$."),
      Q("q3", "advanced", "Area of a $B$–$H$ loop equals", ["coercivity", "retentivity", "hysteresis loss per cycle per volume", "Curie constant"], 2, "Energy dissipated as heat."),
      Q("q4", "main", "Which is ferromagnetic?", ["Cu", "Na", "Fe", "Au"], 2, "Fe, Co, Ni, Gd."),
    ],
    [{ title: "Main vs Advanced", body: "Main: classify and Curie. Advanced: boundary conditions on $B_\\perp$ and $H_\\parallel$, and the demagnetising field of an ellipsoid (rare)." }],
    ["I classify dia/para/ferro by $\\chi$.", "I know dip and $B_H$.", "Hysteresis area is a loss."],
    "A 1–2 mark classifier plus one earth-magnetism numerical. Do not over-study; do not skip the table in NCERT.",
  ),

  "phy-emi": pack(
    "phy-emi",
    [
      T("t1", "Faraday and Lenz", "$\\mathcal{E}=-d\\Phi_B/dt$ with $\\Phi=N\\int B\\cdot dA$. Lenz: the induced current fights the change of flux. Motional: a rod of length $\\ell$ sliding at $v$ on rails, $B$ into the page, $\\mathcal{E}=B\\ell v$. Power $=$ magnetic drag force $\\times v$.", { diagram: "circuit-series" }),
      T("t2", "Inductance", "Self: $\\Phi=LI$, $\\mathcal{E}=-L dI/dt$. Solenoid $L=\\mu_0 n^2 A\\ell$. Mutual $M=k\\sqrt{L_1 L_2}$. Energy $U=\\frac12 LI^2$. Series inductors add if uncoupled; mutual adds $2M$ with sign."),
      T("t3", "RL transients and AC seed", "Growth $I=(E/R)(1-e^{-tR/L})$, decay $I=I_0 e^{-tR/L}$, $\\tau=L/R$. At $t=0^+$ an inductor is an open (current cannot jump); in DC steady state it is a wire."),
      T("t4", "Eddy currents and applications", "Eddy currents in bulk metal dissipate heat (induction furnace, damping of a galvanometer, electromagnetic braking) and are reduced by laminating the core. AC generator $\\mathcal{E}=NBA\\omega\\sin\\omega t$."),
    ],
    [
      F("Faraday", "\\mathcal{E}=-N d\\Phi/dt"),
      F("Motional", "\\mathcal{E}=B\\ell v"),
      F("Self", "\\mathcal{E}=-L dI/dt,\\quad U=\\tfrac12 L I^2"),
      F("RL growth", "I=(E/R)(1-e^{-tR/L})"),
      F("Generator", "\\mathcal{E}=NBA\\omega\\sin\\omega t"),
    ],
    [
      "Forgetting the minus of Lenz and then guessing the current direction.",
      "Using $\\Phi=BA$ when the loop is not perpendicular.",
      "Treating $L$ as a resistor in a DC loop at $t=\\infty$ (it is a short).",
      "Writing $B\\ell v$ when $\\vec v$, $\\vec\\ell$, $\\vec B$ are not mutually perpendicular.",
    ],
    [
      "Flux change can come from $B$, from area, or from orientation — list which one.",
      "Lenz is a direction rule, not an extra formula.",
      "Energy stored in $L$ came from the battery fighting back-emf.",
    ],
    [
      W("w1", "main", "A loop of area $0.1\\,\\mathrm{m}^2$, $B$ from 0.2 T to 0 in 10 ms, 50 turns. $|\\mathcal{E}|$?", ["$\\Delta\\Phi=0.02\\,\\mathrm{Wb}$.", "$|\\mathcal{E}|=50\\times0.02/0.01=100\\,\\mathrm{V}$."], "$100\\,\\mathrm{V}$", "Average emf is $\\Delta\\Phi/\\Delta t$ times $N$."),
      W("w2", "advanced", "Rod $B\\ell v$ on rails of resistance $R$. Magnetic drag?", ["$I=B\\ell v/R$.", "$F=I\\ell B=B^2\\ell^2 v/R$ opposing $v$."], "$B^2\\ell^2 v/R$", "Power $Fv=I^2 R$ matches."),
    ],
    [
      Q("q1", "main", "Lenz’s law is a consequence of conservation of", ["charge", "momentum", "energy", "mass"], 2, "Induced current would otherwise be a free energy source."),
      Q("q2", "boards", "SI unit of flux is", ["tesla", "weber", "henry", "volt"], 1, "$1\\,\\mathrm{Wb}=1\\,\\mathrm{T\\,m}^2$."),
      Q("q3", "main", "Self inductance of a long solenoid is proportional to", ["$n$", "$n^2$", "$1/n$", "$I$"], 1, "$L=\\mu_0 n^2 Al$."),
      Q("q4", "advanced", "Just after an RL circuit is connected, current is", ["$E/R$", "0", "infinite", "$E/L$"], 1, "Inductor keeps $I(0^+)=I(0^-)=0$."),
      Q("q5", "boards", "Eddy currents are reduced by", ["using a solid core", "laminating the core", "increasing thickness", "using iron filings"], 1, "Break the current paths."),
    ],
    [{ title: "Rank", body: "A sliding bar plus a capacitor, or a rotating rod about one end ($\\mathcal{E}=\\frac12 B\\omega\\ell^2$), is the Advanced upgrade of $B\\ell v$." }],
    ["I compute $\\Phi$ with a cosine of the angle.", "Lenz by ‘fight the change’.", "RL dual to RC with $L\\leftrightarrow R$ time-constant swap.", "I know $t=0^+$ vs DC steady for $L$."],
    "Main: $N\\Delta\\Phi/\\Delta t$, $B\\ell v$, and $L$ of a solenoid. Advanced: motional-plus-circuit, mutual inductance sign, and energy accounting.",
  ),

  "phy-ac": pack(
    "phy-ac",
    [
      T("t1", "Phasors, not memory chants", "Treat $v=V_m\\sin\\omega t$ as a rotating vector. $R$: $I$ in phase with $V$. $L$: $I$ lags $V$ by $\\pi/2$, $X_L=\\omega L$. $C$: $I$ leads $V$ by $\\pi/2$, $X_C=1/(\\omega C)$. Series LCR: $Z=\\sqrt{R^2+(X_L-X_C)^2}$, $\\tan\\phi=(X_L-X_C)/R$.", { diagram: "circuit-series" }),
      T("t2", "Resonance and power", "Resonance $X_L=X_C$, $\\omega_0=1/\\sqrt{LC}$, $Z=R$, current max. $Q=\\omega_0 L/R=1/(\\omega_0 CR)$. Sharpness: $\\Delta\\omega=R/L$. Average power $P=V_{\\mathrm{rms}}I_{\\mathrm{rms}}\\cos\\phi=I_{\\mathrm{rms}}^2 R$. $\\cos\\phi=R/Z$ is the power factor. Ideal $L$ or $C$ consumes no average power."),
      T("t3", "rms and transformers", "$V_{\\mathrm{rms}}=V_m/\\sqrt{2}$ for sinusoids. Transformer (ideal) $V_s/V_p=N_s/N_p=I_p/I_s$. Step-up raises $V$, lowers $I$, cuts $I^2R$ in transmission. Real transformer: eddy, hysteresis, flux leakage, copper loss."),
    ],
    [
      F("Reactances", "X_L=\\omega L,\\quad X_C=1/(\\omega C)"),
      F("Impedance", "Z=\\sqrt{R^2+(X_L-X_C)^2}"),
      F("Resonance", "\\omega_0=1/\\sqrt{LC}"),
      F("Power", "P=V_{\\mathrm{rms}}I_{\\mathrm{rms}}\\cos\\phi"),
      F("rms", "V_{\\mathrm{rms}}=V_m/\\sqrt{2}"),
      F("Transformer", "V_s/V_p=N_s/N_p"),
    ],
    [
      "Using peak and rms in the same Ohm’s-law line.",
      "Writing $P=VI$ for AC without $\\cos\\phi$.",
      "Resonance condition as $L=C$ instead of $X_L=X_C$.",
      "Transformer: swapping $N$ ratio with $I$ ratio the wrong way.",
    ],
    [
      "Draw the phasor triangle $R$ vs $X_L-X_C$ every time.",
      "At resonance, source sees a pure $R$.",
      "Wattless current is the reactive component $I\\sin\\phi$.",
    ],
    [
      W("w1", "main", "$R=30\\,\\Omega$, $X_L=40\\,\\Omega$, $X_C=0$. $Z$ and $\\cos\\phi$?", ["$Z=50\\,\\Omega$.", "$\\cos\\phi=R/Z=3/5=0.6$."], "$Z=50\\,\\Omega$, pf $=0.6$ lag", "Lag because net inductive."),
      W("w2", "boards", "Why is power transmitted at high voltage?", ["$P=VI$ so $I=P/V$ falls.", "Loss $I^2 R$ in the lines falls as $1/V^2$."], "High $V$, low $I$, low $I^2R$.", "Transformers make the step-up/step-down cheap."),
    ],
    [
      Q("q1", "main", "In a pure capacitor AC circuit, current", ["lags $V$ by $90^\\circ$", "leads $V$ by $90^\\circ$", "is in phase", "is zero"], 1, "ICE: $I$ leads in $C$."),
      Q("q2", "boards", "Power factor of a pure inductor is", ["1", "0", "0.5", "infinite"], 1, "$\\phi=90^\\circ$, $\\cos\\phi=0$."),
      Q("q3", "main", "Resonant frequency of series LCR is", ["$R/L$", "$1/(2\\pi\\sqrt{LC})$ in hertz if using $f$", "$LC$", "$\\sqrt{L/C}$"], 1, "$\\omega_0=1/\\sqrt{LC}$, $f_0=\\omega_0/(2\\pi)$."),
      Q("q4", "advanced", "At resonance, voltage across $L$ is", ["zero", "$Q$ times source voltage (quality)", "equal to voltage across $R$ always", "undefined"], 1, "$V_L=I X_L=Q V$ at $\\omega_0$."),
      Q("q5", "boards", "A step-down transformer has $N_s/N_p$", ["$>1$", "$<1$", "$=1$", "negative"], 1, "Fewer secondary turns."),
    ],
    [{ title: "Advanced", body: "Parallel (anti-)resonance, bandwidth, and the phasor of a driven LCR with a square-wave Fourier cameo. Main stays series LCR plus transformer ratios." }],
    ["Phasor triangle every time.", "rms vs peak.", "Resonance $\\omega_0$ and $Q$.", "Transformer ratios and why high-voltage lines exist."],
    "Main: $Z$, $\\phi$, resonance, transformer. One numerical on $P=VI\\cos\\phi$ almost every year. Advanced: $Q$-factor and a parallel combination.",
  ),

  "phy-emw": pack(
    "phy-emw",
    [
      T("t1", "Displacement current", "Ampère–Maxwell: $\\oint B\\cdot dl=\\mu_0(I+I_d)$ with $I_d=\\varepsilon_0 d\\Phi_E/dt$. Between charging capacitor plates $I_d=I_{\\mathrm{conduction}}$. This single term makes a changing $E$ source a $B$, completing Maxwell’s equations."),
      T("t2", "Plane waves", "In vacuum $E=cB$, $c=1/\\sqrt{\\mu_0\\varepsilon_0}$, $\\vec E\\perp\\vec B\\perp\\vec k$. Intensity (Poynting) $S=E\\times H$, average $I=\\frac12 c\\varepsilon_0 E_0^2=cB_0^2/(2\\mu_0)$. Energy is shared equally between $E$ and $B$ fields."),
      T("t3", "Spectrum", "Radio → microwave → IR → visible (400–700 nm) → UV → X → $\\gamma$, increasing $f$ and $E=hf$. Atmosphere windows, greenhouse IR, UV damage, X-ray diffraction — NCERT table is the syllabus."),
    ],
    [
      F("Speed", "c=1/\\sqrt{\\mu_0\\varepsilon_0}"),
      F("Amplitudes", "E_0=c B_0"),
      F("Displacement current", "I_d=\\varepsilon_0 d\\Phi_E/dt"),
      F("Poynting avg", "I=\\tfrac12 c\\varepsilon_0 E_0^2"),
    ],
    ["Writing $E=B$ without $c$.", "Ordering the spectrum by wavelength instead of frequency and mixing the ends.", "Thinking displacement current exists only in vacuum."],
    ["Memorise the spectrum as a sentence, not a poster.", "If a capacitor is charging, $I_d$ between plates equals $I$ in the wires."],
    [
      W("w1", "main", "$E_0=60\\,\\mathrm{V/m}$. $B_0$?", ["$B_0=E_0/c=60/(3\\times10^8)=2\\times10^{-7}\\,\\mathrm{T}$."], "$2\\times10^{-7}\\,\\mathrm{T}$", "$E=cB$ for amplitudes too."),
    ],
    [
      Q("q1", "main", "EM waves are", ["longitudinal in vacuum", "transverse in vacuum", "mechanical", "unable to travel in vacuum"], 1, "Both $E$ and $B$ perpendicular to propagation."),
      Q("q2", "boards", "The ozone layer absorbs", ["radio", "visible", "UV", "microwaves"], 2, "NCERT atmosphere paragraph."),
      Q("q3", "advanced", "Displacement current density is", ["$\\sigma E$", "$\\varepsilon_0 \\partial E/\\partial t$", "$\\nabla\\times B$", "$J$ only"], 1, "Maxwell’s correction."),
      Q("q4", "main", "Wavelength of visible light is of order", ["nm", "mm", "km", "Å only for γ"], 0, "400–700 nm. X-rays are Å."),
    ],
    [{ title: "Boards gold", body: "The NCERT uses table and the ‘greenhouse / radar / oven / remote’ matching list. Recite it once a week in Class 12." }],
    ["$E=cB$ in vacuum.", "Spectrum order.", "Displacement current equals conduction current in a charging capacitor."],
    "A short, high-accuracy chapter. Main asks $E=cB$ or a spectrum match. Advanced asks Maxwell correction or Poynting.",
  ),

  "phy-ray": pack(
    "phy-ray",
    [
      T("t1", "New Cartesian and mirrors", "Sign rule (NCERT): light travels $+x$; distances to the left of the optical device are negative for a rightward incident beam on a mirror/lens in the usual setup — actually: follow NCERT strictly: object distance $u$ is negative when the object is on the incoming side. Mirror: $1/v+1/u=1/f$, $f=R/2$. Concave $f<0$ in this convention. Magnification $m=-v/u$.", { diagram: "lens" }),
      T("t2", "Refraction", "Snell $n_1\\sin i=n_2\\sin r$. Apparent depth $d_{\\mathrm{app}}=d/n$. TIR when $i>\\sin^{-1}(n_2/n_1)$ going denser → rarer. Prism: $\\delta=i+e-A$, $n=\\sin((A+\\delta_m)/2)/\\sin(A/2)$."),
      T("t3", "Lenses and combinations", "Lens maker: $1/f=(n-1)(1/R_1-1/R_2)$. Thin lens $1/v-1/u=1/f$. Two thin lenses in contact $1/F=1/f_1+1/f_2$. Power $P=1/f_{\\mathrm{metre}}$ in dioptre. Silvering a lens, a lens in a medium $n_m$, and a glass plate shifting a real image by $t(1-1/n)$ are the three extras."),
      T("t4", "Optical instruments", "Simple microscope $m=1+D/f$. Compound: $m=m_o m_e$. Telescope $m=f_o/f_e$, length $f_o+f_e$ in normal adjustment. Resolving power of telescope $\\propto D/\\lambda$."),
    ],
    [
      F("Mirror", "\\frac{1}{v}+\\frac{1}{u}=\\frac{1}{f},\\quad f=R/2"),
      F("Snell", "n_1\\sin i=n_2\\sin r"),
      F("Lens", "\\frac{1}{v}-\\frac{1}{u}=\\frac{1}{f}"),
      F("Lens maker", "\\frac{1}{f}=(n-1)\\left(\\frac{1}{R_1}-\\frac{1}{R_2}\\right)"),
      F("Prism", "n=\\frac{\\sin((A+\\delta_m)/2)}{\\sin(A/2)}"),
      F("Power", "P=1/f(\\mathrm{in\\,m})"),
    ],
    [
      "Mixing mirror and lens formulae ($+$ vs $-$).",
      "Using $f=+10$ cm for a concave mirror in NCERT signs.",
      "Forgetting that $u$ is almost always negative for a real object.",
      "Telescope length $f_o-f_e$ in normal adjustment (that is reflecting / Huygens extras).",
    ],
    [
      "Write the sign convention at the top of every solution, then substitute with signs.",
      "Ray diagram first: which side is the image? Then the algebra will match.",
      "A glass slab does not change ray direction, only lateral/longitudinal shift.",
    ],
    [
      W("w1", "main", "Concave mirror $f=15$ cm, object 40 cm in front. Image?", ["NCERT: $u=-40$, $f=-15$.", "$1/v=1/f-1/u=-1/15+1/40=(-8+3)/120=-5/120$.", "$v=-24$ cm, real, $m=-v/u=-0.6$ inverted."], "Real, 24 cm in front, $m=-0.6$", "Both $u$ and $f$ negative for a real object on a concave mirror."),
      W("w2", "boards", "A lens of $+2$ D and one of $-1$ D in contact. Power?", ["$P=2-1=+1$ D.", "$F=1$ m convex."], "$+1$ D", "Powers add in contact."),
    ],
    [
      Q("q1", "main", "Critical angle air–glass ($n=1.5$) is $\\sin^{-1}$ of", ["$1.5$", "$2/3$", "$1$", "$0.5$"], 1, "$\\sin c=1/n=2/3$."),
      Q("q2", "boards", "A concave mirror always forms a virtual image of a", ["distant object", "object at $C$", "object between $F$ and the pole", "object at infinity"], 2, "Erect, magnified, behind the mirror."),
      Q("q3", "main", "Lens maker, biconvex equal radii $R$ in air: $f=$", ["$R$", "$R/2$", "$R/(2(n-1))$", "$R/(n-1)$"], 2, "$1/f=(n-1)(1/R+1/R)=2(n-1)/R$, so $f=R/(2(n-1))$. Plano-convex is $R/(n-1)$."),
      Q("q4", "advanced", "A glass plate of thickness $t$, index $n$, shifts a real image by", ["$t$", "$t/n$", "$t(1-1/n)$", "$nt$"], 2, "Toward the plate."),
      Q("q5", "boards", "SI unit of power of a lens is", ["watt", "dioptre", "lux", "candela"], 1, "$1\\,\\mathrm{D}=1\\,\\mathrm{m^{-1}}$."),
    ],
    [
      { title: "Fix Q3 carefully", body: "Biconvex equal radii: $f=R/(2(n-1))$. Plano-convex: $f=R/(n-1)$. Do not mix them — Main does." },
      { title: "Silvered lens", body: "A thin lens silvered on the back is a mirror of power $P_{\\mathrm{mirror}}=2P_{\\mathrm{lens}}+P_{\\mathrm{surface}}$. Advanced classic." },
    ],
    ["Signs written before numbers.", "Mirror $+$ vs lens $-$ in the formula.", "Prism $\\delta_m$ formula.", "TIR condition with the correct rarer medium."],
    "Highest-weight optics chapter in Main. Sign errors are the entire game. Advanced adds silvered lenses, refraction at a spherical surface, and aplanatic points.",
  ),

  "phy-wave-opt": pack(
    "phy-wave-opt",
    [
      T("t1", "Huygens and YDSE", "Every point on a wavefront is a source of secondary wavelets. YDSE: path difference $d\\sin\\theta\\approx dx/D$. Bright $d\\sin\\theta=m\\lambda$, fringe width $\\beta=\\lambda D/d$. Intensity $I=4I_0\\cos^2(\\phi/2)$ with $\\phi=2\\pi\\delta/\\lambda$.", { diagram: "young-slits" }),
      T("t2", "Thin films and a sheet in YDSE", "A sheet of thickness $t$, index $n$ in front of one slit: extra path $(n-1)t$, shift $N=(n-1)t/\\lambda$ fringes. Thin-film: extra $\\lambda/2$ on reflection from a denser medium. $2\\mu t=(m+1/2)\\lambda$ or $m\\lambda$ depending on the two reflections."),
      T("t3", "Diffraction and polarisation", "Single slit: central width $2\\lambda D/a$, first minimum $a\\sin\\theta=\\lambda$. Resolving power of a slit/grating $\\propto N$ (grating) or $D/\\lambda$ (telescope, Rayleigh). Polarisation: Malus $I=I_0\\cos^2\\theta$. Brewster $n=\\tan i_p$, reflected light fully polarised."),
    ],
    [
      F("Fringe width", "\\beta=\\lambda D/d"),
      F("Bright", "d\\sin\\theta=m\\lambda"),
      F("Sheet shift", "N=(n-1)t/\\lambda"),
      F("Single-slit min", "a\\sin\\theta=m\\lambda"),
      F("Malus", "I=I_0\\cos^2\\theta"),
      F("Brewster", "\\tan i_p=n"),
    ],
    [
      "Using $\\beta=\\lambda d/D$.",
      "Forgetting the extra $\\lambda/2$ on reflection from denser.",
      "YDSE in water: $\\lambda$ in the medium is $\\lambda_0/n$, so $\\beta$ shrinks.",
      "Malus with $\\theta$ the polariser–source angle instead of the two-polariser angle.",
    ],
    [
      "Path difference in millimetres, $\\lambda$ in millimetres. One unit system.",
      "If a slit is covered by a sheet, the whole pattern translates, $\\beta$ unchanged.",
      "Diffraction is the envelope; interference is the filling. A single slit has a diffraction envelope even in YDSE.",
    ],
    [
      W("w1", "main", "$d=0.5$ mm, $D=1$ m, $\\lambda=500$ nm. $\\beta$?", ["$\\beta=\\lambda D/d=5\\times10^{-7}\\times1 / 5\\times10^{-4}=10^{-3}$ m $=1$ mm."], "$1$ mm", "Convert everything to metres first."),
      W("w2", "advanced", "A mica sheet $(n-1)t=\\lambda/2$ on $S_1$. Centre of screen becomes?", ["Path extra $\\lambda/2$.", "Central (zero path) fringe moves; the geometrical centre is now a dark fringe."], "Dark at the geometric centre", "A half-wavelength sheet inverts the central fringe."),
    ],
    [
      Q("q1", "main", "If $d$ is doubled in YDSE, $\\beta$", ["doubles", "halves", "unchanged", "quadruples"], 1, "$\\beta\\propto 1/d$."),
      Q("q2", "boards", "Polaroid sunglasses work by", ["Malus / polarisation of glare", "diffraction", "TIR", "interference"], 0, "Glare off horizontal surfaces is partly polarised."),
      Q("q3", "advanced", "Two coherent sources of intensities $I$ and $4I$. $I_{\\max}/I_{\\min}=$", ["$25/1$", "$9/1$", "$4/1$", "$5/3$"], 1, "$(\\sqrt{I_1}\\pm\\sqrt{I_2})^2$ → $(3)^2:(1)^2=9:1$."),
      Q("q4", "main", "Brewster angle for $n=\\sqrt{3}$ is", ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], 2, "$\\tan i_p=\\sqrt{3}$."),
      Q("q5", "boards", "The colour of a thin oil film is due to", ["dispersion only", "interference", "diffraction at a wire", "polarisation"], 1, "Thin-film interference, wavelength-dependent."),
    ],
    [{ title: "Coherence", body: "Sources must be coherent — that is why one source is split in YDSE. Two independent bulbs never make stable fringes." }],
    ["$\\beta=\\lambda D/d$ in one line.", "Sheet $(n-1)t$.", "Malus and Brewster.", "Single-slit first minimum $a\\theta=\\lambda$."],
    "Main: $\\beta$ scaling, a sheet, Malus. Advanced: intensity with unequal slits, thin-film phase, and diffraction plus interference together.",
  ),

  "phy-dual": pack(
    "phy-dual",
    [
      T("t1", "Photoelectric effect", "Einstein: $hf=\\phi+K_{\\max}$. $K_{\\max}=eV_s$. Threshold $f_0=\\phi/h$. Intensity changes the number of photons, hence photocurrent (above threshold), not $K_{\\max}$. $K_{\\max}$ depends on $f$, not on intensity. A plot of $V_s$ vs $f$ has slope $h/e$, intercept $f_0$.", { diagram: "bohr" }),
      T("t2", "Photon and de Broglie", "Photon $E=hf=pc$, $p=h/\\lambda$. de Broglie $\\lambda=h/p$ for matter. Electron accelerated by $V$: $\\lambda=h/\\sqrt{2meV}=12.27/\\sqrt{V}$ Å. Davisson–Germer confirmed electron diffraction."),
      T("t3", "Radiation facts", "Stopping potential is independent of intensity. Photocurrent saturates at high collecting $V$. Below $f_0$, zero current at any intensity (within the Einstein model). Compton (Advanced extra): $\\Delta\\lambda=(h/m_e c)(1-\\cos\\theta)$."),
    ],
    [
      F("Einstein", "hf=\\phi + K_{\\max}"),
      F("Stopping", "K_{\\max}=e V_s"),
      F("de Broglie", "\\lambda=h/p"),
      F("Electron λ", "\\lambda=12.27/\\sqrt{V}\\ \\text{Å}"),
    ],
    [
      "Saying intensity raises $K_{\\max}$.",
      "Using $E=hf$ for an electron’s kinetic energy after acceleration (use $eV$).",
      "Threshold wavelength vs frequency mix-up ($\\lambda_0=c/f_0$).",
      "Writing $\\lambda=h/mv$ with $v$ the speed of light for an electron.",
    ],
    [
      "Photons: intensity = number per second. Colour = energy of each.",
      "If the graph of $V_s$ vs $f$ is asked, slope is a universal constant $h/e$.",
    ],
    [
      W("w1", "main", "$\\phi=2$ eV, light $300$ nm. $K_{\\max}$? Take $hc=1240$ eV·nm.", ["$hf=1240/300\\approx4.13$ eV.", "$K=4.13-2=2.13$ eV.", "$V_s=2.13$ V."], "$\\approx 2.13$ eV", "Keep $hc=1240$ eV·nm in the error book."),
    ],
    [
      Q("q1", "main", "If intensity doubles (above threshold), $K_{\\max}$", ["doubles", "halves", "unchanged", "becomes zero"], 2, "Einstein: $K$ depends on $f$ only."),
      Q("q2", "boards", "de Broglie wavelength is $h$ over", ["energy", "momentum", "frequency", "charge"], 1, "$\\lambda=h/p$."),
      Q("q3", "advanced", "Slope of $V_s$ vs $f$ is", ["$h$", "$e$", "$h/e$", "$\\phi$"], 2, "$eV_s=hf-\\phi$."),
      Q("q4", "main", "A photon’s rest mass is", ["$hf/c^2$", "0", "$h/c$", "equal to electron"], 1, "Rest mass zero; relativistic mass $E/c^2$ is a disputed phrase — JEE wants rest mass 0."),
    ],
    [{ title: "Graphs", body: "Photocurrent vs $V$, $V_s$ vs $f$, and $K_{\\max}$ vs intensity: three graphs, three facts. Draw them from memory every revision." }],
    ["Einstein equation with eV.", "Intensity vs frequency roles.", "Electron $\\lambda$ in Å.", "Threshold condition."],
    "A guaranteed Main cluster: photoelectric graphs + one $\\lambda=12.27/\\sqrt{V}$. Advanced adds Compton or a photon-electron collision.",
  ),

  "phy-atoms": pack(
    "phy-atoms",
    [
      T("t1", "Bohr model", "Postulates: circular orbits, $mvr=nh/(2\\pi)$, $hf=E_i-E_f$. Hydrogen-like: $r_n=n^2 a_0/Z$, $E_n=-13.6 Z^2/n^2$ eV, $v_n=\\alpha c Z/n$. Lyman to $n=1$ (UV), Balmer to $n=2$ (visible), Paschen to $n=3$ (IR).", { diagram: "bohr" }),
      T("t2", "Spectra and series limits", "$1/\\lambda=R Z^2(1/n_1^2-1/n_2^2)$. Series limit $n_2\\to\\infty$. Number of emission lines from level $n$ down: $n(n-1)/2$. Absorption from ground state: only Lyman for H at room temperature."),
      T("t3", "What Bohr cannot do", "Fine structure, multi-electron atoms, intensities, and the fact that orbits are standing de Broglie waves (de Broglie + Bohr: $2\\pi r=n\\lambda$). Advanced may ask this last identity."),
    ],
    [
      F("Energy", "E_n=-13.6\\,Z^2/n^2\\ \\mathrm{eV}"),
      F("Radius", "r_n=n^2 a_0/Z"),
      F("Rydberg", "1/\\lambda=RZ^2\\left(\\frac{1}{n_1^2}-\\frac{1}{n_2^2}\\right)"),
      F("Angular momentum", "mvr=nh/2\\pi"),
    ],
    [
      "Using $-13.6/n^2$ for He$^+$ without $Z^2=4$.",
      "Balmer photons called UV.",
      "Counting absorption lines as $n(n-1)/2$ from an excited sample.",
    ],
    [
      "$hc=12400$ eV·Å $=1240$ eV·nm. Convert $E$ in eV to $\\lambda$ in one move.",
      "He$^+$ is hydrogen-like with $Z=2$; Li$^{2+}$ with $Z=3$.",
    ],
    [
      W("w1", "main", "Photon for H, $n=3\\to 2$. Energy and series?", ["$\\Delta E=13.6(1/4-1/9)=13.6\\times5/36=1.89$ eV.", "Balmer, red H-$\\alpha$."], "$1.89$ eV, Balmer", "First Balmer line is the most famous visible line."),
    ],
    [
      Q("q1", "main", "Ground-state energy of He$^+$ is", ["$-13.6$ eV", "$-54.4$ eV", "$-27.2$ eV", "0"], 1, "$Z^2=4$ times $-13.6$."),
      Q("q2", "boards", "Bohr’s quantisation is", ["$L=nh$", "$L=nh/2\\pi$", "$L=n^2 h$", "$E=nhf$"], 1, "Second postulate."),
      Q("q3", "advanced", "Number of emission lines from $n=5$ to ground is", ["5", "10", "4", "15"], 1, "$5\\times4/2=10$."),
      Q("q4", "main", "Lyman series lies in", ["visible", "UV", "IR", "X-ray"], 1, "To $n=1$."),
    ],
    [{ title: "Ionisation", body: "Ionisation energy from level $n$ is $+13.6 Z^2/n^2$ eV. From ground H it is $13.6$ eV — the series limit of Lyman." }],
    ["$E\\propto Z^2/n^2$, $r\\propto n^2/Z$.", "Series names.", "Line count $n(n-1)/2$.", "He$^+$ is not helium atom."],
    "Main: energy differences and series. Advanced: hydrogen-like ions, reduced mass (rarely), and the de Broglie standing-wave picture.",
  ),

  "phy-nuclei": pack(
    "phy-nuclei",
    [
      T("t1", "Composition and binding", "$A=Z+N$. Radius $R=R_0 A^{1/3}$, $R_0\\approx 1.2$ fm. Binding energy $B=(Zm_H+Nm_n-M)c^2$. BE per nucleon peaks near $^{56}$Fe; that is why fusion of light and fission of heavy both release energy."),
      T("t2", "Decay laws", "$N=N_0 e^{-\\lambda t}$, $T_{1/2}=\\ln 2/\\lambda$, mean life $\\tau=1/\\lambda$. Activity $\\mathcal{A}=\\lambda N$. $\\alpha$: $^A_Z\\to {}^{A-4}_{Z-2}$. $\\beta^-$: $Z\\to Z+1$, $\\bar\\nu$. $\\beta^+$: $Z\\to Z-1$, $\\nu$. $\\gamma$: nucleus drops in excitation, $Z,A$ unchanged."),
      T("t3", "Q-value and fission/fusion", "$Q=\\Delta m c^2$. If $Q>0$ the reaction is exoergic. Neutrinos make $\\beta$ spectra continuous. Pair production threshold $2m_e c^2=1.022$ MeV."),
    ],
    [
      F("Radius", "R=R_0 A^{1/3}"),
      F("Decay", "N=N_0 e^{-\\lambda t},\\quad T_{1/2}=\\ln 2/\\lambda"),
      F("Activity", "\\mathcal{A}=\\lambda N"),
      F("Q-value", "Q=\\Delta m\\,c^2"),
    ],
    [
      "Using $T_{1/2}=\\lambda\\ln 2$.",
      "Mass number changing in $\\gamma$ decay.",
      "Forgetting the neutrino in $\\beta$ and expecting a unique $e^-$ energy.",
      "$1$ u $=931$ MeV, not $931$ eV.",
    ],
    [
      "Always convert $\\Delta m$ in u to MeV with $931$.",
      "Activity questions: $\\mathcal{A}/\\mathcal{A}_0=(1/2)^{t/T_{1/2}}$.",
    ],
    [
      W("w1", "main", "A sample’s activity falls to $1/8$ in 15 h. $T_{1/2}$?", ["$1/8=(1/2)^3$ so 3 half-lives.", "$T_{1/2}=5$ h."], "$5$ h", "Powers of two, not log tables, when the fraction is nice."),
    ],
    [
      Q("q1", "main", "Nuclear density is approximately", ["$\\propto A$", "independent of $A$", "$\\propto A^{1/3}$", "$\\propto 1/A$"], 1, "Volume $\\propto R^3\\propto A$, so $\\rho$ is roughly constant."),
      Q("q2", "boards", "$\\alpha$ particle is", ["$e^-$", "$^4_2$He nucleus", "photon", "neutrino"], 1, "Two p + two n."),
      Q("q3", "advanced", "Mean life $\\tau$ equals", ["$T_{1/2}$", "$1/\\lambda$", "$\\lambda$", "$T_{1/2}/\\ln 2$ wait — $\\tau=T_{1/2}/\\ln 2$"], 1, "$\\tau=1/\\lambda=T_{1/2}/\\ln 2$."),
      Q("q4", "main", "Fusion is favourable for", ["$A\\approx 56$ → bigger", "light nuclei combining", "all $A>56$", "only uranium"], 1, "Towards the Fe peak from below."),
    ],
    [{ title: "Conservation checklist", body: "Charge, baryon number (mass number, ignoring the neutrino’s lepton number which is also conserved), energy-momentum, lepton number. Mass is not conserved — $Q=\\Delta m c^2$." }],
    ["$R\\propto A^{1/3}$.", "Half-life algebra with powers of 2.", "$\\alpha,\\beta,\\gamma$ changes of $Z,A$.", "$931$ MeV/u."],
    "Main: half-life numerical + BE per nucleon curve. Advanced: $Q$-value of a reaction and a neutrino argument.",
  ),

  "phy-semiconductors": pack(
    "phy-semiconductors",
    [
      T("t1", "Bonds and doping", "Si, Ge: four valence electrons, diamond lattice, $E_g\\approx 1.1$ eV (Si). Intrinsic $n_i^2=n_e n_h$. n-type: pentavalent donors (P, As, Sb), majority electrons. p-type: trivalent acceptors (B, Al, Ga, In), majority holes. Mass-action still holds in equilibrium."),
      T("t2", "p–n junction", "Depletion region, barrier $V_0$. Forward: barrier falls, $I=I_0(e^{eV/kT}-1)$. Reverse: tiny $I_0$ until breakdown. Dynamic resistance $dV/dI$ at the operating point. LED: forward, $h\\nu\\approx E_g$. Photodiode: reverse, illuminated. Solar cell: unbiased, illuminated, $I$–$V$ in the fourth quadrant."),
      T("t3", "Transistor and logic (as in NCERT)", "npn: emitter-base forward, collector-base reverse. $\\alpha=I_C/I_E$, $\\beta=I_C/I_B$, $\\beta=\\alpha/(1-\\alpha)$. CE amplifier: inverting, high gain. Gates: NAND/NOR are universal. Zener as a reverse-biased regulator with a series resistor."),
    ],
    [
      F("Mass action", "n_e n_h=n_i^2"),
      F("Diode", "I=I_0(e^{eV/kT}-1)"),
      F("Beta", "\\beta=I_C/I_B=\\alpha/(1-\\alpha)"),
    ],
    [
      "Forward-biasing a Zener to regulate (it regulates in reverse breakdown).",
      "LED in reverse.",
      "Saying holes are protons.",
      "$\\beta\\approx 1$ (that is $\\alpha$).",
    ],
    [
      "Draw the battery so that $p$ is connected to $+$ for forward.",
      "Zener: reverse + series $R$. Voltage across the diode stays $V_Z$.",
      "Transistor: currents $I_E=I_C+I_B$.",
    ],
    [
      W("w1", "main", "$\\alpha=0.98$. $\\beta$?", ["$\\beta=\\alpha/(1-\\alpha)=0.98/0.02=49$."], "$49$", "A 2% miss in $\\alpha$ is a huge miss in $\\beta$."),
    ],
    [
      Q("q1", "main", "n-type Si is obtained by doping with", ["B", "In", "P", "Al"], 2, "Pentavalent donor."),
      Q("q2", "boards", "A hole in a semiconductor is", ["a proton", "an absence of an electron in the valence band", "a positron", "a neutron"], 1, "Effective positive charge carrier."),
      Q("q3", "main", "Zener diode as regulator is", ["forward biased", "reverse biased in breakdown", "unbiased", "used as an LED"], 1, "Series resistor mandatory."),
      Q("q4", "advanced", "In CE amplifier the output is", ["in phase with input", "inverted", "at double frequency", "zero"], 1, "180° phase reverse."),
    ],
    [{ title: "Boards diagrams", body: "I–V of p–n, Zener, and the CE input/output waveforms are drawn-from-memory marks. Practise them as diagrams, not as paragraphs." }],
    ["Doping table.", "Forward vs reverse vs Zener vs LED vs photodiode.", "$\\alpha,\\beta$ relation.", "NAND/NOR universal."],
    "Main: doping, diode bias, Zener, LED. Advanced: a numerical on $\\beta$ and a truth-table. NCERT diagrams are the notes.",
  ),

  "phy-experimental": pack(
    "phy-experimental",
    [
      T("t1", "Metre stick tools", "Vernier LC $=1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}$. Screw gauge LC $=$ pitch / number of circular divisions. Zero error: true = observed − zero error, with sign (positive zero error: zeros coincide after the true zero, reading is too large)."),
      T("t2", "Electrical", "Ohm’s law board: $V$ vs $I$ through origin, slope $R$. Metre bridge $X=R\\,\\ell/(100-\\ell)$. Potentiometer: $\\varepsilon\\propto$ null length; compare two cells, measure internal $r$, find $E$ of a thermocouple. Galvanometer $\\to$ ammeter (shunt) / voltmeter (multiplier)."),
      T("t3", "Optical and thermal", "Sonometer $f=\\frac1{2\\ell}\\sqrt{T/\\mu}$. Resonance tube: first and second resonance, end correction. Focal length of a convex lens by u–v, $f=uv/(u+v)$ with signs, or displacement method. Specific heat by mixtures. Searle / Lee for $K$."),
    ],
    [
      F("Vernier LC", "\\mathrm{LC}=1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}"),
      F("Screw LC", "\\mathrm{LC}=\\mathrm{pitch}/n"),
      F("Metre bridge", "X=R\\frac{\\ell}{100-\\ell}"),
      F("Sonometer", "f=\\frac{1}{2\\ell}\\sqrt{T/\\mu}"),
    ],
    [
      "Adding zero error instead of subtracting.",
      "Metre-bridge $\\ell$ from the unknown side without flipping the formula.",
      "Using a voltmeter to ‘measure emf’ as if it drew no current.",
    ],
    [
      "Every experimental-skills Main item is arithmetic plus a definition. Slow down.",
      "Draw the circuit: which instrument is in series (ammeter) vs parallel (voltmeter).",
    ],
    [
      W("w1", "main", "Pitch 0.5 mm, 50 circular divisions, reading 2 MSR + 35. Zero error $+0.02$ mm. Diameter?", ["LC $=0.5/50=0.01$ mm.", "Observed $=2\\times0.5+35\\times0.01=1.35$ mm.", "True $=1.35-0.02=1.33$ mm."], "$1.33$ mm", "Positive zero error is subtracted."),
    ],
    [
      Q("q1", "main", "Least count of a typical lab vernier is", ["1 mm", "0.1 mm", "0.01 mm", "1 cm"], 1, "10 VSD = 9 mm → 0.1 mm."),
      Q("q2", "boards", "A potentiometer is preferred over a voltmeter to measure emf because", ["it is cheaper", "it draws (ideally) no current at null", "it has a moving coil", "Ohm’s law fails"], 1, "Null method."),
      Q("q3", "advanced", "In a metre bridge, sensitivity is highest when", ["$\\ell\\approx 0$", "$\\ell\\approx 50$ cm", "the unknown is huge", "the battery is off"], 1, "Balance near the centre."),
      Q("q4", "boards", "Sonometer verifies", ["Ohm’s law", "$f\\propto\\sqrt{T}$, $f\\propto 1/\\ell$", "Snell’s law", "Bohr’s law"], 1, "Transverse waves on a string."),
    ],
    [{ title: "Error chapter overlap", body: "This chapter is Units & Errors applied to named instruments. If you can propagate errors, you can finish every numerical here." }],
    ["LC formulae.", "Zero error sign.", "Metre bridge and potentiometer why.", "Ammeter shunt vs voltmeter multiplier."],
    "NTA has turned experimental skills into a regular 1–2 questions in Main. Treat it as a scoring gift, not an afterthought.",
  ),
};
