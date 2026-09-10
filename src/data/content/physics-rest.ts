import type { ChapterContent, ExamTag, Formula, QuizItem, TheoryBlock, WorkedProblem } from "../types";

function T(id: string, heading: string, body: string, extra?: Partial<TheoryBlock>): TheoryBlock {
  return { id, heading, body, ...extra };
}
function F(name: string, latex: string, note?: string): Formula {
  return { name, latex, note };
}
function W(id: string, exam: ExamTag, prompt: string, steps: string[], answer: string, insight: string): WorkedProblem {
  return { id, exam, prompt, steps, answer, insight };
}
function Q(id: string, exam: ExamTag, stem: string, options: string[], correct: number, why: string): QuizItem {
  return { id, exam, stem, options, correct, why };
}

function pack(
  id: string,
  theory: TheoryBlock[],
  formulas: Formula[],
  traps: string[],
  tricks: string[],
  worked: WorkedProblem[],
  quiz: QuizItem[],
  extras: { title: string; body: string }[],
  checklist: string[],
  pyqInsight: string,
  starter?: ChapterContent["starter"],
): ChapterContent {
  return { id, theory, formulas, traps, tricks, worked, quiz, extras, checklist, pyqInsight, starter };
}

export const PHYSICS_REST: Record<string, ChapterContent> = {
  "phy-thermal": pack(
    "phy-thermal",
    [
      T("t1", "Temperature and expansion", "Celsius and Kelvin intervals are equal; $T_K=T_C+273.15$. Linear expansion $\\Delta L=L\\alpha\\Delta T$, area $\\beta=2\\alpha$, volume $\\gamma=3\\alpha$ for isotropic solids. When a rod is constrained, strain $\\alpha\\Delta T$ produces stress $Y\\alpha\\Delta T$. Bimetallic strips bend toward the smaller $\\alpha$.", { diagram: "expansion", callout: { kind: "main", text: "A steel scale measures a ‘wrong’ length on a hot day — both object and scale expand. Track which $\\alpha$ is whose." } }),
      T("t2", "Calorimetry", "$Q=mc\\Delta T$ with no phase change; $Q=mL$ at a change of state. Method of mixtures: heat lost = heat gained if insulated. Water’s $c=1\\,\\mathrm{cal/g\\,K}=4184\\,\\mathrm{J/kg\\,K}$. Beware two-phase problems: you cannot assign a temperature to a mixture that is still melting."),
      T("t3", "Conduction, convection, radiation", "Steady conduction $H=KA\\Delta T/\\ell$. Series slabs: add $R=\\ell/KA$. Radiation $P=e\\sigma A T^4$ (Stefan); net $e\\sigma A(T^4-T_0^4)$. Newton’s cooling $dT/dt=-k(T-T_0)$ is the small-excess limit of that. Wien $\\lambda_m T=b$.", { callout: { kind: "advanced", text: "A black body in a cavity: energy density $u=aT^4$, pressure $u/3$. Advanced cameo with Kirchhoff." } }),
      T("t4", "Thermal conductivity traps", "In the $k$ vs $T$ graph, metals fall slowly; gases rise with $T$. A composite wall’s effective $K$ is not the arithmetic mean. For a cylindrical pipe, $H=2\\pi K L\\Delta T/\\ln(r_2/r_1)$."),
    ],
    [
      F("Linear expansion", "\\Delta L = L\\alpha\\Delta T"),
      F("Volume expansion", "\\Delta V = V\\gamma\\Delta T,\\quad \\gamma=3\\alpha"),
      F("Thermal stress", "\\sigma = Y\\alpha\\Delta T", "Rod fixed at both ends."),
      F("Conduction", "H = KA\\Delta T/\\ell"),
      F("Stefan", "P = e\\sigma A T^4"),
      F("Newton cooling", "\\frac{dT}{dt}=-k(T-T_0)"),
      F("Wien", "\\lambda_m T = b"),
    ],
    ["Using $T_C$ in Stefan ($T$ is kelvin).", "Forgetting the scale also expands.", "Applying $mc\\Delta T$ through a latent-heat plateau.", "Series slabs: using $K_{\\mathrm{avg}}=(K_1+K_2)/2$."],
    ["Convert every temperature to kelvin before $T^4$.", "Draw the heat-current circuit; $R_{\\mathrm{th}}=\\ell/KA$.", "Ice-water-steam: locate the mixture on the heating curve first."],
    [
      W("w1", "main", "A 1 m steel rod, $\\alpha=10^{-5}$, $Y=2\\times10^{11}$, ends fixed, heated by 50 K. Stress?", ["Strain $=\\alpha\\Delta T=5\\times10^{-4}$.", "$\\sigma=Y\\times$ strain $=10^8$ Pa."], "$10^8$ Pa compressive.", "Fixed ends: expansion is killed by compression."),
      W("w2", "boards", "100 g ice at 0 °C + 100 g water at 40 °C. $L_f=334$ J/g, $c=4.2$ J/g K. Final state?", ["Heat to melt ice $=33400$ J.", "Heat from water cooling to 0 °C $=100\\times4.2\\times40=16800$ J, not enough.", "Ice melted $=16800/334\\approx50$ g. Mixture: 50 g ice + 150 g water at 0 °C."], "50 g ice remains at $0^\\circ$C.", "Never assign 10 °C to a two-phase mix."),
    ],
    [
      Q("q1", "main", "Two rods of equal length, $K$ and $2K$, in series. Effective $K$ is", ["$3K$", "$1.5K$", "$\\frac{4K}{3}$", "$K$"], 2, "$R\\propto 1/K$, $R_{\\mathrm{eq}}=3/(2K)$ per unit geometry, $K_{\\mathrm{eq}}=2K/3\\times2?$ Equal $A,\\ell$: $K_{\\mathrm{eq}}=2K_1K_2/(K_1+K_2)=4K^2/(3K)=4K/3$."),
      Q("q2", "boards", "Absolute zero on Celsius is", ["0", "−100", "−273.15", "273"], 2, "Kelvin zero."),
      Q("q3", "advanced", "Wien: if $T$ doubles, $\\lambda_m$", ["doubles", "halves", "quadruples", "unchanged"], 1, "$\\lambda_m T=b$."),
      Q("q4", "main", "Newton’s law of cooling is a linearisation of", ["conduction only", "Stefan’s net power for small $T-T_0$", "Wien", "calorimetry"], 1, "$T^4-T_0^4\\approx 4T_0^3(T-T_0)$."),
      Q("q5", "boards", "$\\beta$ (area) $\\approx$", ["$\\alpha$", "$2\\alpha$", "$3\\alpha$", "$\\alpha/2$"], 1, "Two dimensions."),
    ],
    [{ title: "Rank", body: "A brass scale measures a steel rod — expand both. Thermal resistance networks. Black-body in a cube of side $a$, energy $a^3 a T^4$." }],
    ["I convert to kelvin before $T^4$.", "I know $\\gamma=3\\alpha$ and thermal stress $Y\\alpha\\Delta T$.", "I never skip latent heat.", "I can add thermal resistances in series/parallel."],
    "Main loves thermal stress, calorimetry with ice, and $K_{\\mathrm{eq}}$ of two slabs. Radiation numericals are $T^4$ ratios. Advanced adds cylindrical conduction and Newton-cooling integrals.",
    { heading: "If you just started XI", body: "This chapter is numbers plus pictures: a rod getting longer, ice not changing temperature while it melts. Do not skip the constrained-rod stress — it is the JEE version of the chapter.", bullets: ["Memorise $\\alpha,\\beta,\\gamma$ relations.", "One ice+water mixture every day for three days."] },
  ),
  "phy-thermo": pack(
    "phy-thermo",
    [
      T("t1", "First law and signs", "Physics NCERT: $Q=\\Delta U+W$ with $W$ the work *by* the system ($W=\\int P\\,dV$ for quasi-static). Chemistry NCERT uses $\\Delta U=q+w$ with $w=-P\\Delta V$. Same physics; pick one convention and label it. $U$ of an ideal gas is $U(T)$ only.", { callout: { kind: "trap", text: "Mixing the two signs in one solution is the most expensive thermodynamics mistake in PCM." } }),
      T("t2", "Processes", "Isochoric: $W=0$, $Q=\\Delta U=nC_V\\Delta T$. Isobaric: $W=P\\Delta V=nR\\Delta T$, $Q=nC_P\\Delta T$. Isothermal ideal: $\\Delta U=0$, $Q=W=nRT\\ln(V_2/V_1)$. Adiabatic reversible: $PV^\\gamma=\\mathrm{const}$, $W=(P_1V_1-P_2V_2)/(\\gamma-1)$."),
      T("t3", "Heat engines and Carnot", "$\\eta=1-Q_C/Q_H\\le 1-T_C/T_H$. Refrigerator $COP=Q_C/W$. Reversible engines between the same two reservoirs have equal $\\eta$. Clausius: you cannot dump heat to a hotter body without work.", { diagram: "pv-cycle", callout: { kind: "advanced", text: "A cycle’s $W_{\\mathrm{net}}$ is the $P$–$V$ area. Clockwise engines, counterclockwise refrigerators." } }),
      T("t4", "$C_P$, $C_V$, $\\gamma$", "Mayer $C_P-C_V=R$ (molar, ideal). $\\gamma=C_P/C_V=1+2/f$. Monatomic $f=3$, $\\gamma=5/3$; diatomic $f=5$ (near room T), $\\gamma=1.4$."),
    ],
    [
      F("First law (physics)", "Q=\\Delta U+W"),
      F("Ideal gas U", "\\Delta U=n C_V\\Delta T"),
      F("Mayer", "C_P-C_V=R"),
      F("Adiabatic", "PV^\\gamma=\\mathrm{const}"),
      F("Carnot", "\\eta=1-T_C/T_H"),
      F("Isothermal work", "W=nRT\\ln(V_2/V_1)"),
    ],
    ["Using $C_P$ at constant volume.", "Adiabatic $TV^{\\gamma-1}$ with Celsius.", "Carnot $\\eta$ with $t_C,t_H$ not kelvin.", "Free expansion: $W=0,Q=0,\\Delta U=0$ even though $V$ changes — $P$ is not uniform."],
    ["Sketch the process on $P$–$V$ before computing.", "Free expansion of ideal gas: $T$ unchanged.", "For a cycle $\\Delta U=0$ so $Q_{\\mathrm{net}}=W_{\\mathrm{net}}$."],
    [
      W("w1", "main", "1 mol ideal monatomic, isothermal expansion 300 K, $V\\to 2V$. $Q$?", ["$\\Delta U=0$.", "$W=RT\\ln 2=8.3\\times300\\times0.693\\approx1.73$ kJ.", "$Q=W$."], "$RT\\ln 2$", "Isothermal ideal: heat in equals work out."),
      W("w2", "advanced", "Carnot between 400 K and 300 K. $\\eta$? If $Q_H=800$ J, $W$?", ["$\\eta=1-300/400=0.25$.", "$W=0.25\\times800=200$ J.", "$Q_C=600$ J."], "$\\eta=25\\%$, $W=200$ J.", "Kelvin only."),
    ],
    [
      Q("q1", "main", "In an adiabatic reversible process for an ideal gas", ["$PV=\\mathrm{const}$", "$PV^\\gamma=\\mathrm{const}$", "$P/T=\\mathrm{const}$", "$\\Delta U=Q$"], 1, "Definition + first law with $Q=0$."),
      Q("q2", "boards", "$C_P/C_V$ for a monatomic ideal gas is", ["5/3", "7/5", "4/3", "1"], 0, "$f=3$, $\\gamma=1+2/f$."),
      Q("q3", "main", "Work in an isochoric process is", ["$P\\Delta V$", "$nRT\\ln(V_2/V_1)$", "0", "$nC_P\\Delta T$"], 2, "No volume change."),
      Q("q4", "advanced", "Free expansion of an ideal gas into vacuum. $\\Delta T$ is", ["positive", "negative", "zero", "undefined"], 2, "$Q=W=0\\Rightarrow\\Delta U=0\\Rightarrow\\Delta T=0$."),
      Q("q5", "boards", "First law is conservation of", ["charge", "momentum", "energy", "entropy"], 2, "Energy, including heat as a transfer."),
    ],
    [{ title: "Mix-chapter", body: "Adiabatic + SHM of a piston, or $C_V$ from KTG $f$, is a standard Advanced sandwich." }],
    ["I never mix physics and chemistry signs.", "I know the four standard processes including free expansion.", "Carnot uses kelvin.", "I can read $W$ as a $P$–$V$ area."],
    "Main: identify the process, pick the right $C$, compute $Q,W,\\Delta U$. Advanced: cycles, efficiency inequalities, polytropic $PV^n$.",
  ),
  "phy-ktg": pack(
    "phy-ktg",
    [
      T("t1", "Pressure from molecules", "Momentum transfer on a wall gives $P=\\frac13\\rho v_{\\mathrm{rms}}^2=\\frac13 nm\\langle v^2\\rangle$. Combined with $PV=nRT$ you get $\\frac12 m v_{\\mathrm{rms}}^2=\\frac32 kT$ per molecule translational."),
      T("t2", "Three speeds", "$v_{\\mathrm{rms}}=\\sqrt{3RT/M}$, $\\langle v\\rangle=\\sqrt{8RT/\\pi M}$, $v_{\\mathrm{mp}}=\\sqrt{2RT/M}$. Order $v_{\\mathrm{mp}}<\\langle v\\rangle<v_{\\mathrm{rms}}$. Maxwell distribution’s tail grows with $T$."),
      T("t3", "Degrees of freedom and $\\gamma$", "Equipartition: each quadratic term in energy gets $\\frac12 kT$. Translational 3, rotational 2 for linear / 3 for nonlinear, vibration 2 per mode (at high $T$). $\\gamma=1+2/f$.", { callout: { kind: "main", text: "Room-temperature diatomic: $f=5$, $C_V=5R/2$, $C_P=7R/2$." } }),
      T("t4", "Mean free path", "$\\lambda=1/(\\sqrt{2}\\,n\\pi d^2)$. Higher $P$ (higher $n$) shortens $\\lambda$. Viscosity of gases $\\eta\\propto\\sqrt{T}$ and is roughly $P$-independent in a window — kinetic-theory classic."),
    ],
    [
      F("Pressure", "P=\\frac13\\rho v_{\\mathrm{rms}}^2"),
      F("rms", "v_{\\mathrm{rms}}=\\sqrt{3RT/M}"),
      F("mean", "\\langle v\\rangle=\\sqrt{8RT/\\pi M}"),
      F("mp", "v_{\\mathrm{mp}}=\\sqrt{2RT/M}"),
      F("gamma", "\\gamma=1+2/f"),
      F("mean free path", "\\lambda=1/(\\sqrt{2} n \\pi d^2)"),
    ],
    ["Using $R$ instead of $k$ per molecule.", "Confusing the three speeds.", "Assigning $f=6$ to O2 at 300 K (vibration is frozen)."],
    ["$PV=\\frac13 N m v_{\\mathrm{rms}}^2$ is the fastest way to $v_{\\mathrm{rms}}$.", "Ratio of rms speeds = $\\sqrt{T_1 M_2/T_2 M_1}$."],
    [
      W("w1", "main", "rms speed of O2 ($M=32$ g/mol) at 300 K. $R=8.3$.", ["$v=\\sqrt{3RT/M}=\\sqrt{3\\times8.3\\times300/0.032}=\\sqrt{2.334\\times10^5}\\approx483$ m/s."], "≈ 480 m/s", "M in kg/mol."),
    ],
    [
      Q("q1", "main", "$v_{\\mathrm{rms}}$ is proportional to", ["$T$", "$\\sqrt{T}$", "$T^2$", "$1/T$"], 1, "Square root of T/M."),
      Q("q2", "boards", "Average translational KE per molecule is", ["$kT$", "$\\frac32 kT$", "$\\frac12 kT$", "$\\frac32 RT$"], 1, "Per mole $\\frac32 RT$."),
      Q("q3", "advanced", "For a gas, $C_P-C_V=$", ["$R/2$", "$R$", "$\\gamma R$", "0"], 1, "Mayer, molar."),
      Q("q4", "main", "Diatomic $\\gamma$ near room temperature is", ["5/3", "7/5", "4/3", "9/7"], 1, "$f=5$."),
    ],
    [{ title: "Stretch", body: "Law of corresponding speeds: the same Maxwell curve in units of $v/v_{\\mathrm{rms}}$." }],
    ["I can write all three speeds.", "I know $f$ and $\\gamma$ for mono/dia.", "M is in kg/mol when SI speeds are asked."],
    "A $v_{\\mathrm{rms}}$ ratio or $\\gamma$ identification is almost guaranteed in Main. Advanced: mixture of gases, $C_V$ weighted by mole fraction, mean free path.",
  ),
  "phy-oscillations": pack(
    "phy-oscillations",
    [
      T("t1", "Defining SHM", "$\\ddot x+\\omega^2 x=0$. Solution $x=A\\sin(\\omega t+\\phi)$. $v=\\omega A\\cos(\\omega t+\\phi)$, $a=-\\omega^2 x$. $v_{\\max}=\\omega A$ at mean position; $a_{\\max}=\\omega^2 A$ at extremes.", { diagram: "spring-mass" }),
      T("t2", "Energy", "$E=\\frac12 k A^2=\\frac12 m\\omega^2 A^2$ constant. $U=\\frac12 kx^2$, $K=E-U$. Mean-position: all kinetic. Average $K$ over a period is $E/2$."),
      T("t3", "Spring and pendulum", "$T=2\\pi\\sqrt{m/k}$ for a mass-spring (horizontal or vertical — $g$ only shifts the equilibrium). Simple pendulum small-angle $T=2\\pi\\sqrt{L/g}$. Seconds pendulum: $T=2$ s, $L\\approx 1$ m.", { diagram: "pendulum", callout: { kind: "main", text: "In a lift of acceleration $a$ upward, $g_{\\mathrm{eff}}=g+a$. Time period falls." } }),
      T("t4", "Physical pendulum and combinations", "$T=2\\pi\\sqrt{I/(mgd)}$. Parallel springs $k_{\\mathrm{eq}}=k_1+k_2$; series $1/k_{\\mathrm{eq}}=1/k_1+1/k_2$. Two masses with a spring: reduced mass $\\mu=m_1 m_2/(m_1+m_2)$."),
    ],
    [
      F("SHM law", "a=-\\omega^2 x"),
      F("Mass-spring", "T=2\\pi\\sqrt{m/k}"),
      F("Pendulum", "T=2\\pi\\sqrt{L/g}"),
      F("Energy", "E=\\frac12 k A^2"),
      F("Velocity", "v=\\omega\\sqrt{A^2-x^2}"),
      F("Physical pendulum", "T=2\\pi\\sqrt{I/(mgd)}"),
    ],
    ["Using $g$ in the horizontal spring period.", "Writing $T=2\\pi\\sqrt{k/m}$.", "Large-angle pendulum is not SHM.", "Phase: $x=A\\cos\\omega t$ vs sin — pick one and stick."],
    ["Always shift coordinates to the equilibrium of the loaded spring.", "If $F\\propto -x$ after a coordinate change, it is SHM and $\\omega^2$ is the coefficient."],
    [
      W("w1", "main", "m=0.4 kg, k=100 N/m. T? Amplitude 10 cm, max speed?", ["$T=2\\pi\\sqrt{0.4/100}=2\\pi\\times0.063\\approx0.4$ s.", "$\\omega=\\sqrt{k/m}=15.8$ rad/s.", "$v_{\\max}=\\omega A=1.58$ m/s."], "$T\\approx0.4$ s, $v_{\\max}\\approx1.6$ m/s", "Do not mix cm and m."),
    ],
    [
      Q("q1", "boards", "Acceleration in SHM is proportional to", ["$v$", "$-x$", "$x^2$", "constant"], 1, "Defining."),
      Q("q2", "main", "If amplitude doubles, total energy", ["doubles", "quadruples", "halves", "unchanged"], 1, "$E\\propto A^2$."),
      Q("q3", "main", "Seconds pendulum has period", ["1 s", "2 s", "π s", "0.5 s"], 1, "One second each way."),
      Q("q4", "advanced", "A pendulum in a freely falling lift has T", ["0", "∞ (no restoring, $g_{\\mathrm{eff}}=0$)", "same", "halved"], 1, "Effective gravity vanishes."),
      Q("q5", "boards", "Phase difference between y and a in SHM is", ["0", "π/2", "π", "π/4"], 2, "a = −ω²x, opposite to displacement."),
    ],
    [{ title: "Advanced mix", body: "Liquid in a U-tube: $T=2\\pi\\sqrt{L/2g}$ with $L$ the total column. Physical pendulum minimum $T$ at $k=\\sqrt{I_{\\mathrm{cm}}/m}$ from the CM." }],
    ["I derive $T$ from $F=-kx$ or $\\tau=-\\kappa\\theta$, not from memory only.", "Lift problems use $g_{\\mathrm{eff}}$.", "Energy pie-chart at a general $x$ is automatic."],
    "Main: mass-spring T, pendulum in a lift, energy at a given x. Advanced: physical pendulum, coupled oscillators, damped $Q$-factor cameos.",
  ),
  "phy-waves": pack(
    "phy-waves",
    [
      T("t1", "Travelling wave", "$y=A\\sin(kx-\\omega t)$ travels $+x$ at $v=\\omega/k=f\\lambda$. On a string $v=\\sqrt{T/\\mu}$. Intensity $\\propto A^2\\omega^2$.", { diagram: "wave-string" }),
      T("t2", "Standing waves", "Two opposite waves: $y=2A\\sin kx\\cos\\omega t$. Nodes $kx=n\\pi$. String both ends fixed: $L=n\\lambda/2$, $f_n=nv/(2L)$. Closed pipe: odd harmonics, $L=(2n-1)\\lambda/4$."),
      T("t3", "Beats and Doppler", "Beats $|f_1-f_2|$. Doppler 1-D: $f'=f(v\\pm v_o)/(v\\pm v_s)$ with signs ‘toward = higher’. Source toward observer: denominator $v-v_s$.", { callout: { kind: "trap", text: "Wall reflection: image source. Wind: add $v_w$ to $v$ in both numerator and denominator if along the line." } }),
      T("t4", "Sound", "Longitudinal. In air $v=\\sqrt{\\gamma P/\\rho}=\\sqrt{\\gamma RT/M}$. Open pipe $f=v/(2L)$; end correction $0.6 r$ added to $L$ per open end."),
    ],
    [
      F("Wave speed string", "v=\\sqrt{T/\\mu}"),
      F("v = f λ", "v=f\\lambda=\\omega/k"),
      F("Fixed string", "f_n=n v/(2L)"),
      F("Closed pipe", "f_n=(2n-1)v/(4L)"),
      F("Beats", "f_{\\mathrm{beat}}=|f_1-f_2|"),
      F("Doppler", "f'=f\\frac{v\\pm v_o}{v\\pm v_s}"),
      F("Sound in gas", "v=\\sqrt{\\gamma RT/M}"),
    ],
    ["$+x$ wave written as $kx+\\omega t$.", "Open vs closed harmonics mixed.", "Doppler sign from a mnemonic without a picture.", "Using $v=\\sqrt{P/\\rho}$ without $\\gamma$ (Newton vs Laplace)."],
    ["Draw the source, observer, and velocity arrows, then assign signs.", "End correction before you compute $L$ from a resonance tube."],
    [
      W("w1", "main", "String 2 m, μ=4 g/m, T=64 N. Fundamental?", ["$v=\\sqrt{64/0.004}=\\sqrt{16000}=126.5$ m/s.", "$f=v/(2L)=31.6$ Hz."], "≈ 32 Hz", "μ in kg/m."),
    ],
    [
      Q("q1", "boards", "A wave travelling in +x is", ["$A\\sin(kx+\\omega t)$", "$A\\sin(kx-\\omega t)$", "$A\\cos(kx+\\omega t)$ only", "$A\\sin(\\omega t)$"], 1, "Phase constancy: $kx-\\omega t$ const ⇒ x increases with t."),
      Q("q2", "main", "Beats from 256 and 260 Hz", ["4 Hz", "258 Hz", "516 Hz", "2 Hz"], 0, "Difference."),
      Q("q3", "main", "Closed pipe fundamental compared with open of same L", ["same", "half", "double", "four times"], 1, "Open $v/2L$, closed $v/4L$."),
      Q("q4", "advanced", "Source toward a wall at $v_s$, observer at the source. Beat of direct and reflected is", ["$2 f v_s/v$", "0", "$f v_s/v$", "$f$"], 0, "Reflected ≈ image source behind the wall, approaching at $v_s$; two Doppler factors."),
    ],
    [{ title: "Organ pipes", body: "Resonance tube: first resonance $L_1+e=\\lambda/4$, second $L_2+e=3\\lambda/4$, subtract to kill $e$." }],
    ["I can write a travelling wave with the correct sign.", "Fixed/free ends: node vs antinode.", "Doppler from a diagram, not a chant."],
    "Main: string harmonics, beats, a Doppler numerical with one moving body. Advanced: Doppler with a wall, superposition phase, group vs phase velocity cameo.",
  ),
};
