import type { ChapterContent } from "../types";
import { F, pack, Q, T, W } from "./pack";

/** Extra Class 11–12 Physics depth: official CBSE bullets plus the JEE layer. */
export const PHYSICS_MASTERY: Record<string, Partial<ChapterContent>> = {
  "phy-units": {
    theory: [
      T(
        "phy-units-sigfig",
        "Significant figures and quoting an uncertainty",
        "A measured 2.40 cm has three significant figures; trailing zeros after a decimal count. Scientific notation $2.40\\times10^{-2}\\,\\mathrm{m}$ makes the count unambiguous. The uncertainty in a result is written as $x\\pm\\Delta x$ with $\\Delta x$ to one (occasionally two) significant figures, and $x$ rounded to the same decimal place. When a calculation mixes measured numbers, the result cannot be more precise than the coarsest input. Boards still want the rule list; Main hides it inside a least-count arithmetic item.",
        {
          bullets: [
            "Exact numbers (2 in $2\\pi r$, a counted 10 turns) carry infinite significant figures.",
            "Logarithms: the mantissa’s figures match the argument; the characteristic is not a measured figure.",
            "Never round intermediate steps; round once at the end to the uncertainty’s place.",
          ],
          callout: {
            kind: "board",
            text: "Write ‘the result is $1.23\\pm0.04$’ not ‘1.2345 with some error’. JEE numericals want the conservative maximum-error percentage.",
          },
        },
      ),
    ],
  },
  "phy-thermal": {
    theory: [
      T(
        "phy-th-anomalous",
        "Anomalous expansion of water, Cp vs Cv, calorimetry with a phase change",
        "Water contracts from $0^{\\circ}\\mathrm{C}$ to $4^{\\circ}\\mathrm{C}$ then expands — density peaks at $4^{\\circ}\\mathrm{C}$. Lakes freeze from the top because the $4^{\\circ}\\mathrm{C}$ water sinks and the colder layer floats. $C_p$ and $C_v$ for solids/liquids are nearly equal (the $P\\Delta V$ work is tiny); for an ideal gas $C_p-C_v=R$ per mole. Calorimetry: if a phase change is possible, spend $mL$ first. You cannot assign a temperature other than the plateau to a two-phase mixture.",
        {
          bullets: [
            "Apparent expansion of a liquid in a glass vessel is $\\gamma_{\\mathrm{app}}=\\gamma_{\\mathrm{liq}}-\\gamma_{\\mathrm{vessel}}$.",
            "A hole in a plate expands as if the missing disc were still there.",
            "Latent heat of fusion of ice $\\approx 334\\,\\mathrm{J/g}$; vaporisation of water $\\approx 2260\\,\\mathrm{J/g}$.",
          ],
          diagram: "expansion",
        },
      ),
      T(
        "phy-th-radiation",
        "Blackbody radiation, Wien, Stefan, Newton’s cooling as a limit",
        "A blackbody absorbs every wavelength and emits a spectrum that depends only on $T$. Wien: $\\lambda_m T=b\\approx2.9\\times10^{-3}\\,\\mathrm{m\\,K}$ — hotter objects peak bluer. Stefan: $P=e\\sigma A T^4$ with $\\sigma=5.67\\times10^{-8}$. Net power to surroundings $e\\sigma A(T^4-T_0^4)$. For $T-T_0\\ll T_0$ this linearises to Newton’s law of cooling $dT/dt=-k(T-T_0)$. Convection is bulk transport; it has no simple $H=KA\\Delta T/\\ell$ formula — do not fake one.",
        {
          callout: {
            kind: "main",
            text: "Main’s radiation numerical is almost always a $T^4$ ratio (same body, two temperatures) or $\\lambda_m$ of the sun vs a furnace.",
          },
        },
      ),
    ],
    formulas: [
      F("Apparent expansion", "\\gamma_{\\mathrm{app}}=\\gamma_{\\ell}-\\gamma_{\\mathrm{g}}"),
      F("Net radiation", "P_{\\mathrm{net}}=e\\sigma A(T^4-T_0^4)"),
      F("Wien constant", "\\lambda_m T = 2.9\\times10^{-3}\\,\\mathrm{m\\,K}"),
    ],
    worked: [
      W(
        "phy-th-w3",
        "main",
        "A black body at 600 K radiates 81 times the power it would at temperature T. Find T. (same area, same e)",
        [
          "$P\\propto T^4$, so $600^4 / T^4 = 81 = 3^4$.",
          "$600/T = 3\\Rightarrow T=200\\,\\mathrm{K}$.",
        ],
        "$200\\,\\mathrm{K}$",
        "Fourth-root the ratio. Do not write $T^4=81\\times600$.",
      ),
    ],
    quiz: [
      Q(
        "phy-th-q6",
        "boards",
        "Density of water is maximum at",
        ["$0^{\\circ}\\mathrm{C}$", "$4^{\\circ}\\mathrm{C}$", "$100^{\\circ}\\mathrm{C}$", "$-4^{\\circ}\\mathrm{C}$"],
        1,
        "Anomalous expansion: maximum density at $4^{\\circ}\\mathrm{C}$.",
      ),
    ],
  },
  "phy-thermo": {
    theory: [
      T(
        "phy-thermo-zeroth",
        "Zeroth law, state variables, reversible vs irreversible",
        "Zeroth law: if A is in thermal equilibrium with B and B with C, then A with C — that is the definition of temperature as a state variable. A state variable ($P,V,T,U,S$) depends only on the current state; $Q$ and $W$ are path functions. An equation of state (ideal: $PV=nRT$) links the state variables. A reversible process is a chain of equilibrium states, so $P$ of the system equals $P$ of the surroundings at every instant and $W=\\int P\\,dV$ is well-defined. Free expansion, a sudden stop, friction, and unrestrained heat flow are irreversible; $W$ is not $\\int P_{\\mathrm{gas}}dV$ because $P$ is not uniform.",
        {
          bullets: [
            "Cyclic process: $\\Delta U=0$ so $Q_{\\mathrm{net}}=W_{\\mathrm{net}}$ (physics sign).",
            "Isothermal vs adiabatic on $P$–$V$: the adiabatic is steeper ($\\gamma>1$).",
            "Second law, Kelvin: you cannot convert heat from a single reservoir entirely into work in a cycle.",
            "Second law, Clausius: heat does not flow from cold to hot without work.",
          ],
          diagram: "pv-cycle",
          callout: {
            kind: "board",
            text: "Write both statements of the second law in one line each. Boards award the sentence; Main uses Carnot $\\eta=1-T_C/T_H$ in kelvin.",
          },
        },
      ),
    ],
    formulas: [
      F("Adiabatic T–V", "T V^{\\gamma-1}=\\mathrm{const}"),
      F("Adiabatic T–P", "T^\\gamma P^{1-\\gamma}=\\mathrm{const}"),
      F("Polytropic work", "W=\\frac{P_1 V_1-P_2 V_2}{n-1}\\quad(n\\neq 1)"),
    ],
    worked: [
      W(
        "phy-thermo-w3",
        "main",
        "1 mol diatomic ideal gas, $\\gamma=1.4$, compressed reversibly and adiabatically from 300 K, $V$ to $V/8$. Final T?",
        [
          "$T V^{\\gamma-1}=\\mathrm{const}$, $\\gamma-1=0.4$.",
          "$T_2=T_1(V_1/V_2)^{0.4}=300\\times 8^{0.4}=300\\times(2^3)^{0.4}=300\\times 2^{1.2}$.",
          "$2^{1.2}\\approx 2.30$, $T_2\\approx 690\\,\\mathrm{K}$.",
        ],
        "$300\\times 2^{1.2}\\approx 690\\,\\mathrm{K}$",
        "Adiabatic compression heats the gas. IsoT would have stayed 300 K.",
      ),
    ],
  },
  "phy-ktg": {
    theory: [
      T(
        "phy-ktg-assumptions",
        "Kinetic-theory assumptions, pressure, Avogadro, work of compression",
        "Assumptions JEE expects by name: point molecules, no intermolecular force except elastic collisions, random motion, collision time $\\ll$ flight time, Newtonian mechanics. Pressure on a wall is the momentum dumped per second per area: $P=\\frac13\\rho v_{\\mathrm{rms}}^2$. Avogadro’s number $N_A$ converts $R=N_A k_B$. Work to compress a gas slowly is still $\\int P\\,dV$; for an isothermal ideal compression $W=nRT\\ln(V_1/V_2)$ (work by the gas is negative if $V$ falls). Mean free path $\\lambda=1/(\\sqrt{2}\\,n\\pi d^2)$ falls if you raise $P$ at fixed $T$ (more $n$).",
        {
          bullets: [
            "Temperature is the translational KE: $\\langle\\tfrac12 mv^2\\rangle=\\tfrac32 kT$. That is the kinetic interpretation of $T$.",
            "A mixture: $C_V=\\sum \\nu_i C_{V,i}/\\sum\\nu_i$ (mole-weighted).",
            "Vibration of O₂ is frozen at 300 K, so $f=5$ not 7.",
          ],
          diagram: "maxwell",
        },
      ),
    ],
    quiz: [
      Q(
        "phy-ktg-q5",
        "advanced",
        "Mean free path of an ideal gas, at fixed T, is proportional to",
        ["$P$", "$1/P$", "$P^2$", "independent of $P$"],
        1,
        "$n=P/kT$, so $\\lambda\\propto 1/n\\propto 1/P$.",
      ),
    ],
  },
  "phy-oscillations": {
    theory: [
      T(
        "phy-osc-phase",
        "Periodic functions, phase, loaded spring, pendulum derivation",
        "A motion is periodic if $x(t+T)=x(t)$. SHM is the special case $x=A\\sin(\\omega t+\\phi)$ — the projection of uniform circular motion of radius $A$ and angular speed $\\omega$. Phase $\\omega t+\\phi$ is the angle on that reference circle; $\\phi$ is fixed by $x(0)$ and $v(0)$. Loaded spring: hang $m$, equilibrium stretches by $\\delta=mg/k$. Measuring $y$ from that equilibrium, $m\\ddot y=-ky$, so $g$ disappeared — $T=2\\pi\\sqrt{m/k}$ is the same as the horizontal spring. Simple pendulum: for small $\\theta$, $\\tau=-mgL\\sin\\theta\\approx-mgL\\theta$, $I=mL^2$, so $\\ddot\\theta+(g/L)\\theta=0$ and $T=2\\pi\\sqrt{L/g}$. Energy: $E=\\tfrac12 kA^2$ splits as $U=\\tfrac12 kx^2$, $K=E-U$.",
        {
          bullets: [
            "Write $x(0)=A\\sin\\phi$ and $v(0)=\\omega A\\cos\\phi$ and solve for $A,\\phi$.",
            "Seconds pendulum: $T=2\\,\\mathrm{s}$, $L=g/\\pi^2\\approx 1\\,\\mathrm{m}$.",
            "U-tube of total column $L$: $T=2\\pi\\sqrt{L/2g}$.",
          ],
          diagram: "pendulum",
          callout: {
            kind: "board",
            text: "Boards want the pendulum derivation with the small-angle step written. Main wants $g_{\\mathrm{eff}}$ in a lift.",
          },
        },
      ),
    ],
    formulas: [
      F("Phase from IC", "A=\\sqrt{x_0^2+(v_0/\\omega)^2},\\quad\\tan\\phi=\\omega x_0/v_0"),
      F("U-tube", "T=2\\pi\\sqrt{L/2g}"),
    ],
  },
  "phy-waves": {
    theory: [
      T(
        "phy-waves-types",
        "Transverse vs longitudinal, superposition, reflection, harmonics, beats",
        "Transverse: displacement $\\perp$ velocity of the wave (string, EM). Longitudinal: displacement $\\parallel$ (sound). Speed on a string $\\sqrt{T/\\mu}$; of sound $\\sqrt{\\gamma P/\\rho}$ (Laplace; Newton missed $\\gamma$). A progressive wave $y=A\\sin(kx-\\omega t)$ travels $+x$; $kx+\\omega t$ travels $-x$. Superposition is linear: displacements add. Reflection at a rigid boundary inverts (phase $\\pi$, node); at a free boundary it does not (antinode). Standing waves are the superposition of two equal opposite progressive waves. String fixed–fixed: $f_n=nv/(2L)$. Closed pipe (closed–open): only odd harmonics $f=(2n-1)v/(4L)$. Beats: two close frequencies, loudness oscillates at $|f_1-f_2|$.",
        {
          bullets: [
            "End correction $e\\approx 0.6 r$ per open end; subtract two resonances to kill $e$.",
            "Doppler: draw arrows, then ‘observer toward = numerator $+$, source toward = denominator $-$’.",
            "Wall: image source. Wind along the line: replace $v$ by $v\\pm v_w$ in both.",
          ],
          diagram: "organ-pipe",
        },
      ),
    ],
    worked: [
      W(
        "phy-waves-w2",
        "main",
        "A closed pipe 25 cm long, end correction 1 cm, speed of sound 330 m/s. Fundamental frequency?",
        [
          "Effective $L+e=0.26\\,\\mathrm{m}$.",
          "$f=v/(4\\ell)=330/(4\\times0.26)=317.3\\,\\mathrm{Hz}$.",
        ],
        "$\\approx 317\\,\\mathrm{Hz}$",
        "Closed pipe uses $4(L+e)$, not $2L$.",
      ),
    ],
  },
  "phy-rotation": {
    theory: [
      T(
        "phy-rot-table",
        "MOI table (no derivation) and radius of gyration",
        "Boards list standard $I$ without proof; JEE still uses the values every week. Thin ring/hoop about axis: $MR^2$. Disc/cylinder (solid) about axis: $\\tfrac12 MR^2$. Hollow thin cylinder about axis: $MR^2$. Solid sphere about diameter: $\\tfrac25 MR^2$. Thin spherical shell: $\\tfrac23 MR^2$. Rod about centre $\\perp$: $ML^2/12$; about end: $ML^2/3$. Radius of gyration $k$ is defined by $I=Mk^2$, so a disc about its axis has $k=R/\\sqrt{2}$. Parallel-axis $I=I_{\\mathrm{cm}}+Md^2$ requires the new axis parallel to a cm axis. Perpendicular-axis (planar lamina) $I_z=I_x+I_y$.",
        {
          diagram: "rolling",
          bullets: [
            "Rolling without slip: $v=\\omega R$ and $a=\\alpha R$, same contact point instantaneously at rest.",
            "Acceleration down an incline $a=g\\sin\\theta/(1+I/mR^2)=g\\sin\\theta/(1+k^2/R^2)$.",
            "A sphere always beats a disc beats a ring on the same rough incline (smallest $k/R$ wins).",
          ],
        },
      ),
    ],
    formulas: [
      F("Solid sphere", "I_{\\mathrm{diam}}=\\tfrac25 MR^2"),
      F("Disc about axis", "I=\\tfrac12 MR^2"),
      F("Rod about end", "I=ML^2/3"),
      F("Rolling on incline", "a=\\frac{g\\sin\\theta}{1+k^2/R^2}"),
    ],
  },
  "phy-moving": {
    theory: [
      T(
        "phy-mov-helix",
        "Lorentz force, helix, cyclotron, definition of the ampere",
        "A charge in uniform $\\vec B$ feels $\\vec F=q(\\vec v\\times\\vec B)$. Speed is constant (force $\\perp\\vec v$). If $\\vec v\\perp\\vec B$, the path is a circle of radius $r=mv/|q|B$ and cyclotron frequency $\\omega=|q|B/m$ (independent of $v$). A parallel component rides along $\\vec B$: helix of pitch $p=v_\\parallel T=2\\pi m v_\\parallel/|q|B$. Cyclotron: two Dees, AC at $\\omega_c$, kinetic energy after $n$ turns $n q V$ (non-relativistic). Force on a wire $F=I\\ell B\\sin\\theta$. Two long parallel currents: $F/L=\\mu_0 I_1 I_2/(2\\pi d)$ — this is the SI definition of the ampere (historically). Torque on a loop $\\vec\\tau=\\vec m\\times\\vec B$ with $\\vec m=IA\\hat n$.",
        {
          diagram: "solenoid",
          callout: {
            kind: "main",
            text: "Main: $r=mv/qB$, pitch of a helix, and galvanometer $\\to$ ammeter (small shunt $S=G/(n-1)$). Advanced: a charged particle in crossed E and B (Wien filter $v=E/B$).",
          },
        },
      ),
    ],
    formulas: [
      F("Cyclotron radius", "r=mv/|q|B"),
      F("Cyclotron frequency", "\\omega=|q|B/m"),
      F("Pitch of helix", "p=2\\pi m v_\\parallel/|q|B"),
      F("Force between wires", "\\frac{F}{L}=\\frac{\\mu_0 I_1 I_2}{2\\pi d}"),
      F("Ammeter shunt", "S=G/(n-1)"),
    ],
  },
  "phy-emi": {
    theory: [
      T(
        "phy-emi-motional",
        "Motional emf, rails, Lenz, self and mutual inductance",
        "Faraday: $\\mathcal{E}=-d\\Phi_B/dt$ with $\\Phi=\\int\\vec B\\cdot d\\vec A$ (include $\\cos\\theta$). Lenz: the induced current fights the change — flux-up through a loop makes the loop a magnet pointing against the increase. Motional: a rod of length $\\ell$ sliding at $v$ on rails in $\\vec B$ has $\\mathcal{E}=B\\ell v$ (charges feel $qvB$ until $E=vB$). Self inductance $L=\\Phi/I$, $\\mathcal{E}=-L dI/dt$, energy $\\tfrac12 LI^2$. Mutual $M=M_{12}=M_{21}$. RL growth $I=I_0(1-e^{-t/\\tau})$, $\\tau=L/R$. Eddy currents: a metal moving in $B$ dissipates $I^2R$ as heat — laminations cut the path.",
        {
          bullets: [
            "Rotate a coil in $B$: $\\Phi=BA\\cos\\omega t$, $\\mathcal{E}=BA\\omega\\sin\\omega t$ (the AC generator).",
            "A shrinking loop: $\\mathcal{E}=B\\,dA/dt$ even if $B$ is static.",
            "Open circuit: emf still exists; current does not.",
          ],
        },
      ),
    ],
    formulas: [
      F("Motional rod", "\\mathcal{E}=B\\ell v"),
      F("RL time constant", "\\tau=L/R"),
      F("Inductor energy", "U=\\tfrac12 L I^2"),
    ],
  },
  "phy-ac": {
    theory: [
      T(
        "phy-ac-transformer",
        "Phasors, resonance, wattless current, generator, transformer",
        "Peak and RMS: $I_{\\mathrm{rms}}=I_0/\\sqrt{2}$ for a sinusoid. Reactances $X_L=\\omega L$, $X_C=1/(\\omega C)$. Series LCR impedance $Z=\\sqrt{R^2+(X_L-X_C)^2}$, $\\tan\\phi=(X_L-X_C)/R$. Resonance $\\omega_0=1/\\sqrt{LC}$, $Z=R$, current max, $Q=\\omega_0 L/R$. Average power $P=V_{\\mathrm{rms}}I_{\\mathrm{rms}}\\cos\\phi=I_{\\mathrm{rms}}^2 R$. Wattless current is the reactive component $I\\sin\\phi$. Transformer (ideal): $V_s/V_p=N_s/N_p=I_p/I_s$, power conserved. Laminated core kills eddy loss; the AC generator is Faraday on a rotating coil.",
        { diagram: "transformer" },
      ),
    ],
  },
  "phy-emw": {
    theory: [
      T(
        "phy-emw-spectrum",
        "Displacement current, transverse EM waves, spectrum and uses",
        "Ampere–Maxwell: $\\oint B\\cdot dl=\\mu_0(I+I_d)$ with displacement current $I_d=\\varepsilon_0 d\\Phi_E/dt$. Between charging capacitor plates $I_d$ equals the conduction current in the wires, so $B$ is consistent. EM waves: $\\vec E\\perp\\vec B\\perp\\vec k$, $c=1/\\sqrt{\\mu_0\\varepsilon_0}$, $E/B=c$, intensity $I=\\tfrac12\\varepsilon_0 c E_0^2$. Spectrum, long to short $\\lambda$: radio (communication), microwave (radar, ovens), infrared (heat lamps, remote), visible (400–700 nm), UV (sterilisation), X-rays (imaging), $\\gamma$ (nuclear). Uses are a board one-marker and a Main assertion-reason.",
        {
          bullets: [
            "Visible is a tiny window; do not put UV between IR and visible.",
            "A plane wave travelling $+x$ has $E_y$ and $B_z$ in phase.",
          ],
        },
      ),
    ],
    formulas: [
      F("Speed of EM wave", "c=1/\\sqrt{\\mu_0\\varepsilon_0}"),
      F("E and B", "E/B=c"),
      F("Intensity", "I=\\tfrac12\\varepsilon_0 c E_0^2"),
    ],
  },
  "phy-ray": {
    theory: [
      T(
        "phy-ray-instruments",
        "TIR, fibres, thin-lens combo, prism, microscope and telescope",
        "TIR when going denser→rarer with $i>i_c=\\sin^{-1}(n_r/n_i)$. Optical fibre: a high-$n$ core, cladding of smaller $n$, acceptance by TIR. Thin lens $1/v-1/u=1/f$, lens-maker $1/f=(n-1)(1/R_1-1/R_2)$ with New Cartesian signs. Two thin lenses in contact $1/F=1/f_1+1/f_2$. Prism $\\delta=(i+e)-A$, $\\mu=\\sin((A+\\delta_m)/2)/\\sin(A/2)$. Simple microscope $m=1+D/f$. Compound microscope $m=m_o m_e=-(L/f_o)(1+D/f_e)$ (image at D). Astronomical telescope $m=-f_o/f_e$ (normal adjustment, image at infinity); length $f_o+f_e$. Reflecting telescopes replace the objective by a mirror (no chromatic error).",
        {
          diagram: "prism",
          callout: {
            kind: "trap",
            text: "Signs: real object $u$ is negative in the New Cartesian convention NCERT uses. Mixing ‘real positive’ from class 10 with New Cartesian is the classic miss.",
          },
        },
      ),
    ],
    formulas: [
      F("Critical angle", "i_c=\\sin^{-1}(1/\\mu)"),
      F("Lens maker", "\\frac1f=(\\mu-1)\\left(\\frac1{R_1}-\\frac1{R_2}\\right)"),
      F("Telescope (normal)", "m=-f_o/f_e,\\quad L=f_o+f_e"),
      F("Compound microscope", "m=-\\frac{L}{f_o}\\left(1+\\frac{D}{f_e}\\right)"),
    ],
  },
  "phy-wave-opt": {
    theory: [
      T(
        "phy-wo-huygens",
        "Huygens, YDSE, coherence, single-slit diffraction",
        "Huygens: every point of a wavefront is a source of secondary wavelets; the envelope is the new front. Reflection: equal triangles give $i=r$. Refraction: the ratio of speeds is $\\sin i/\\sin r=v_1/v_2=\\mu_2/\\mu_1$ (Snell). YDSE: coherent sources (same $\\omega$, constant $\\Delta\\phi$) from one parent wave. Fringe width $\\beta=\\lambda D/d$. A glass slab of thickness $t$, index $\\mu$ in front of one slit shifts the pattern by $\\Delta y=(\\mu-1)t\\,D/d$ toward the slab. Single-slit diffraction: central max width $2\\lambda D/a$ (to the first min $a\\sin\\theta=\\lambda$). Qualitative: narrower slit, wider pattern.",
        {
          diagram: "huygens",
          bullets: [
            "Sustained interference needs coherence — two independent bulbs will not fringe.",
            "Intensity $I=4I_0\\cos^2(\\phi/2)$ at a point with phase $\\phi=2\\pi d\\sin\\theta/\\lambda$.",
          ],
        },
      ),
    ],
  },
  "phy-dual": {
    theory: [
      T(
        "phy-dual-graphs",
        "Photoelectric graphs and de Broglie",
        "Hertz: UV on a metal spark gap. Lenard: emission current saturates with intensity; a maximum KE exists; a cutoff frequency $\\nu_0$ below which nothing comes, independent of intensity. Einstein: $h\\nu=\\phi+K_{\\max}$, $eV_0=K_{\\max}$. Graphs: $V_0$ vs $\\nu$ is a straight line of slope $h/e$, intercept $\\nu_0$. Saturation current $\\propto$ intensity, independent of $\\nu$ (above threshold). de Broglie $\\lambda=h/p$; an electron accelerated by $V$ has $\\lambda=h/\\sqrt{2meV}=12.27/\\sqrt{V}\\,\\mathrm{\\AA}$.",
        { diagram: "photoelectric" },
      ),
    ],
  },
  "phy-nlm": {
    theory: [
      T(
        "phy-nlm-impulse-mom",
        "Impulse, momentum conservation, FBD until it is boring",
        "Impulse $\\vec J=\\int\\vec F dt=\\Delta\\vec p$. A large force for a short time (bat on a ball, a kick) is handled as $J$, not as a finite $a$. For a system of particles, internal impulses cancel in pairs if they obey the third law, so $\\Delta\\vec P_{\\mathrm{cm}}=\\vec J_{\\mathrm{ext}}$. That is conservation of linear momentum when $\\vec J_{\\mathrm{ext}}=0$ — explosions, recoils, a man on a cart, a bullet in a block (then energy is not conserved). Always: (1) isolate one body, (2) draw every force on that body, (3) pick axes, (4) write $F_x=ma_x$ and $F_y=ma_y$, (5) add constraint $a$’s. Skip any of those and Advanced will eat the attempt.",
        { diagram: "pulley" },
      ),
    ],
  },
};

export const PHYSICS_EXPERIMENTAL: Record<string, ChapterContent> = {
  "phy-experimental": pack(
    "phy-experimental",
    [
      T(
        "phy-ex-0",
        "If you just started Class 11 lab",
        "Every JEE Main paper has 2–3 experimental-skills items. They are not ‘extra’. Least count, zero error with sign, a graph’s slope, and which quantity dominates $\\Delta x/x$ — that is the whole chapter. Practise with numbers, not with a photograph of the apparatus.",
      ),
      T(
        "phy-ex-vernier",
        "Vernier, screw gauge, spherometer",
        "Vernier LC $= 1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}$. If 10 VSD = 9 MSD and 1 MSD = 1 mm, LC = 0.1 mm. Reading = MSR + (VSD coinciding)$\\times$LC, then subtract zero error with sign (positive zero error means the zeros match when the jaws are already closed a little — true size is smaller). Screw gauge: LC = pitch / divisions on the head. Spherometer: $R=l^2/(6h)+h/2$ for a spherical surface.",
        { diagram: "vernier" },
      ),
      T(
        "phy-ex-list",
        "The standard experiments Main actually names",
        "Simple pendulum $g=4\\pi^2 L/T^2$ (use $L$ to the centre of the bob; $T$ from 20 oscillations). Ohm’s law: $V$–$I$ slope is $R$. Meter bridge: $R=R_B\\ell/(100-\\ell)$, LC of the wire is 1 mm, unknown from the balance point. Potentiometer: $\\varepsilon_1/\\varepsilon_2=\\ell_1/\\ell_2$; internal $r=R(\\ell_1/\\ell_2-1)$. Focal length of a convex lens by $u$–$v$, $f=uv/(u+v)$ with signs, or from $1/v$ vs $1/u$. Young’s modulus by Searle: $Y=MgL/(\\pi r^2\\Delta L)$ with $r$ from a screw gauge (that $r^2$ dominates the error). Surface tension by capillary $S=\\tfrac12\\rho g r h$.",
        {
          bullets: [
            "The measurement with the largest relative error dominates. For $Y$, $r$ is measured small, so $2\\Delta r/r$ wins.",
            "A graph is better than one pair: slope of $T^2$ vs $L$ is $4\\pi^2/g$.",
            "Parallax error: eye must be in line with the mark. Main still asks this in words.",
          ],
          callout: {
            kind: "main",
            text: "NTA’s 2022–25 experimental items cluster on: zero error sign, which graph is linear, and ‘which quantity’s error is doubled because of a square’.",
          },
        },
      ),
    ],
    [
      F("Vernier LC", "\\mathrm{LC}=1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}"),
      F("Screw gauge LC", "\\mathrm{LC}=\\mathrm{pitch}/N_{\\mathrm{head}}"),
      F("Meter bridge", "X=R\\,\\ell/(100-\\ell)"),
      F("Pendulum g", "g=4\\pi^2 L/T^2"),
      F("Searle Y", "Y=F L/(\\pi r^2\\Delta L)"),
    ],
    [
      "Ignoring the sign of zero error.",
      "Using diameter as radius in $Y\\propto 1/r^2$.",
      "Taking 10 oscillations as $T$ rather than $10T$.",
    ],
    [
      "Write true reading = observed − zero error, with the sign of the zero error defined on the diagram.",
      "For a product, add relative errors; the squared quantity is the one to measure more carefully.",
    ],
    [
      W(
        "phy-ex-w1",
        "main",
        "Vernier: 10 VSD = 9 MSD, 1 MSD = 1 mm. Main scale 2.3 cm, 6th VSD coincides, zero error $+0.03$ cm. True length?",
        [
          "LC = 0.1 mm = 0.01 cm.",
          "Observed = 2.3 + 6×0.01 = 2.36 cm.",
          "True = 2.36 − 0.03 = 2.33 cm.",
        ],
        "$2.33\\,\\mathrm{cm}$",
        "Positive zero error is subtracted.",
      ),
      W(
        "phy-ex-w2",
        "main",
        "In $Y\\propto M/(r^2\\Delta L)$, relative errors: $\\Delta M/M=1\\%$, $\\Delta r/r=2\\%$, $\\Delta(\\Delta L)/\\Delta L=3\\%$. Percentage error in $Y$?",
        ["$\\Delta Y/Y=1\\%+2\\times2\\%+3\\%=8\\%$."],
        "$8\\%$",
        "The square on $r$ doubles its relative error.",
      ),
    ],
    [
      Q("phy-ex-q1", "main", "Least count of a screw gauge of pitch 1 mm and 100 head divisions is", ["0.01 mm", "0.1 mm", "1 mm", "0.001 mm"], 0, "pitch/N = 0.01 mm."),
      Q("phy-ex-q2", "boards", "A simple pendulum’s T is best taken as", ["one oscillation on a stopwatch", "time of 20 oscillations / 20", "time of 20 oscillations", "period of the stopwatch"], 1, "Reduces random timing error by 20."),
      Q("phy-ex-q3", "main", "Meter-bridge wire of 1 m, 100 cm scale. Unknown X vs known R. Balance at 40 cm from X. X/R is", ["2/3", "3/2", "2/5", "5/2"], 0, "X/R = ℓ/(100−ℓ) = 40/60 = 2/3."),
      Q("phy-ex-q4", "advanced", "Zero of the vernier is to the right of the main-scale zero when jaws are closed. Zero error is", ["positive", "negative", "zero", "equal to LC"], 0, "Positive zero error: zeros coincide only after the jaws have already ‘eaten’ a little."),
      Q("phy-ex-q5", "main", "Graph of T² versus L for a pendulum is", ["a parabola through origin", "a straight line through origin, slope 4π²/g", "a hyperbola", "T² ∝ 1/L"], 1, "T² = (4π²/g) L."),
    ],
    [
      {
        title: "Rank booster",
        body: "Potentiometer comparison of emf is independent of the galvanometer resistance — that is why it beats a voltmeter. If the driver battery sags, both ℓ₁ and ℓ₂ scale and the ratio survives.",
      },
    ],
    [
      "I can compute LC of vernier and screw gauge without a formula sheet.",
      "I apply zero error with sign.",
      "I know which measurement dominates Y, g, and meter-bridge X.",
    ],
    "Experimental skills is a guaranteed 8–12 marks in Main if you count Section A assertion items plus Section B numericals. Advanced asks a paragraph on error or a graph. Treat this chapter as Units + a list of ten labs.",
    {
      heading: "Day-one lab",
      body: "Sit with a ruler. Measure this page. Quote the reading the way a vernier would, then write the uncertainty as ± half the smallest division. That single habit is half of JEE experimental.",
      bullets: ["Least count first.", "Zero error second.", "Dominant error third."],
    },
  ),
};
