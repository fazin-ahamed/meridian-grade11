import type { PlayItem } from "../types";
import { choiceOf, cycle, mcq, nint, num } from "./build";

const G = 10;

export function physicsItem(id: string, i: number): PlayItem | null {
  switch (id) {
    case "phy-units":
      return units(i);
    case "phy-motion-1d":
      return mot1d(i);
    case "phy-motion-2d":
      return mot2d(i);
    case "phy-nlm":
      return nlm(i);
    case "phy-wep":
      return wep(i);
    case "phy-rotation":
      return rot(i);
    case "phy-gravitation":
      return grav(i);
    case "phy-solids":
      return solids(i);
    case "phy-fluids":
      return fluids(i);
    case "phy-thermal":
      return thermal(i);
    case "phy-thermo":
      return thermo(i);
    case "phy-ktg":
      return ktg(i);
    case "phy-oscillations":
      return osc(i);
    case "phy-waves":
      return waves(i);
    case "phy-charges":
      return charges(i);
    case "phy-potential":
      return potential(i);
    case "phy-current":
      return current(i);
    case "phy-moving":
      return moving(i);
    case "phy-mag-matter":
      return magMatter(i);
    case "phy-emi":
      return emi(i);
    case "phy-ac":
      return ac(i);
    case "phy-emw":
      return emw(i);
    case "phy-ray":
      return ray(i);
    case "phy-wave-opt":
      return waveOpt(i);
    case "phy-dual":
      return dual(i);
    case "phy-atoms":
      return atoms(i);
    case "phy-nuclei":
      return nuclei(i);
    case "phy-semiconductors":
      return semi(i);
    case "phy-experimental":
      return experimental(i);
    default:
      return null;
  }
}

function units(i: number): PlayItem {
  const m = i % 8;
  if (m === 0) {
    const rows = [
      ["force", "MLT^{-2}", "ML^2T^{-2}", "MT^{-2}", "MLT^{-1}"],
      ["energy", "ML^2T^{-2}", "MLT^{-2}", "ML^2T^{-1}", "MT^{-2}"],
      ["power", "ML^2T^{-3}", "ML^2T^{-2}", "MLT^{-2}", "MT^{-3}"],
      ["pressure", "ML^{-1}T^{-2}", "MLT^{-2}", "ML^2T^{-2}", "MT^{-2}"],
      ["impulse", "MLT^{-1}", "MLT^{-2}", "ML^2T^{-1}", "MT^{-1}"],
      ["angular momentum", "ML^2T^{-1}", "ML^2T^{-2}", "MLT^{-1}", "MLT^{-2}"],
    ] as const;
    const r = cycle(rows, i);
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `Dimensional formula of ${r[0]} is`,
      correct: `$${r[1]}$`,
      wrong: [`$${r[2]}$`, `$${r[3]}$`, `$${r[4]}$`],
      why: `Standard SI dimensional formula of ${r[0]} is $${r[1]}$.`,
      tags: ["dimensions"],
    });
  }
  if (m === 1) {
    const L = cycle([100, 80, 90, 120], i);
    const dL = cycle([0.1, 0.2, 0.5], i);
    const T = cycle([2, 2, 1.6, 2.4], i);
    const dT = cycle([0.01, 0.02, 0.01], i);
    const rel = dL / L + 2 * (dT / T);
    const pct = nint(rel * 1000) / 10;
    return num({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `Simple pendulum: $L=${L}\\pm${dL}$ cm, $T=${T}\\pm${dT}$ s. Percentage error in $g=4\\pi^2 L/T^2$ is (one decimal, e.g. 1.1 for 1.1%)`,
      answer: pct,
      tolerance: 0.05,
      why: `$\\Delta g/g=\\Delta L/L+2\\Delta T/T=${dL}/${L}+2(${dT}/${T})=${rel}$. Percentage $= ${pct}\\%$.`,
      tags: ["errors"],
    });
  }
  if (m === 2) {
    const pairs = [
      ["work and torque", true],
      ["impulse and momentum", true],
      ["stress and pressure", true],
      ["force and energy", false],
      ["power and energy", false],
      ["Planck constant and angular momentum", true],
    ] as const;
    const p = cycle(pairs, i);
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `Are ${p[0]} dimensionally identical?`,
      correct: p[1] ? "Yes" : "No",
      wrong: p[1] ? ["No", "Only in SI", "Only in cgs"] : ["Yes", "Only in SI", "Cannot say"],
      why: p[1]
        ? `${p[0]} share the same MLT combination.`
        : `${p[0]} do not share dimensions.`,
    });
  }
  if (m === 3) {
    const n = cycle([2, 3, 4], i);
    const e = cycle([1, 2, 3], i);
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `If $x=a^{${n}}$ and $\\Delta a/a=${e}\\%$, the percentage error in $x$ is`,
      correct: `${n * e}%`,
      wrong: [`${e}%`, `${n + e}%`, `${n * e * 2}%`],
      why: `$\\Delta x/x=|n|\\Delta a/a=${n}\\times${e}\\%=${n * e}\\%$.`,
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      exam: "boards",
      stem: "Which of the following is a dimensionless quantity?",
      correct: cycle(["Strain", "Refractive index", "Relative permeability", "Coefficient of friction"], i),
      wrong: ["Stress", "Young’s modulus", "Surface tension", "Impulse"].filter(
        (x, idx) => idx !== i % 4,
      ),
      why: "Ratios of like quantities (or μ/μ0, n) are dimensionless.",
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Least count of a vernier with 10 VSD = 9 MSD and 1 MSD = 1 mm is",
      correct: "0.1 mm",
      wrong: ["0.01 mm", "1 mm", "0.9 mm"],
      why: "LC = 1 MSD − 1 VSD = 1 − 0.9 = 0.1 mm.",
    });
  }
  if (m === 6) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "SI unit of luminous intensity is",
      correct: "candela",
      wrong: ["lumen", "lux", "watt"],
      why: "The seventh SI base unit is candela (cd).",
    });
  }
  const facts = [
    ["Charge is a base SI quantity.", "No — current is base; charge = A s."],
    ["Angle is dimensionless.", "Yes — radian is a dimensionless derived unit."],
    ["Torque and energy are the same physical quantity.", "No — same dimensions, different tensor character."],
  ] as const;
  const f = cycle(facts, i);
  return mcq({
    chapterId: "phy-units",
    i,
    subject: "physics",
    exam: "advanced",
    stem: f[0] + " The correct verdict is",
    correct: f[1].startsWith("Yes") ? "True, with the stated reason" : "False, with the stated reason",
    wrong: ["Always true with no caveat", "Meaningless in SI", "True only in cgs"],
    why: f[1],
  });
}

function mot1d(i: number): PlayItem {
  const u = choiceOf("phy-motion-1d", i, [0, 2, 4, 5, 8, 10, 12]);
  const a = choiceOf("phy-motion-1d", i + 1, [1, 2, 4, 5, 10]);
  const t = choiceOf("phy-motion-1d", i + 2, [2, 3, 4, 5, 6]);
  const m = i % 6;
  if (m === 0) {
    const v = u + a * t;
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `A particle starts at $u=${u}\\,\\mathrm{m/s}$ with constant $a=${a}\\,\\mathrm{m/s^2}$. Speed after $${t}\\,\\mathrm{s}$ (m/s) is`,
      answer: v,
      why: `$v=u+at=${u}+${a}\\times${t}=${v}$.`,
    });
  }
  if (m === 1) {
    const s = u * t + 0.5 * a * t * t;
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `Displacement in $${t}\\,\\mathrm{s}$ if $u=${u}\\,\\mathrm{m/s}$, $a=${a}\\,\\mathrm{m/s^2}$. Answer in metres.`,
      answer: s,
      why: `$s=ut+\\frac12 at^2=${u}\\times${t}+\\frac12(${a})(${t})^2=${s}$.`,
    });
  }
  if (m === 2) {
    const s = cycle([10, 20, 25, 40, 50], i);
    const v2 = u * u + 2 * a * s;
    const v = Math.sqrt(v2);
    if (Number.isInteger(v)) {
      return num({
        chapterId: "phy-motion-1d",
        i,
        subject: "physics",
        stem: `$u=${u}$, $a=${a}$, displacement $s=${s}$ m. Final speed (m/s) is`,
        answer: v,
        why: `$v^2=u^2+2as=${u * u}+2\\times${a}\\times${s}=${v2}\\Rightarrow v=${v}$.`,
      });
    }
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `$v^2=u^2+2as$ with $u=${u}$, $a=${a}$, $s=${s}$. $v^2$ equals`,
      correct: `${v2}`,
      wrong: [`${u * u + a * s}`, `${2 * a * s}`, `${u * u - 2 * a * s}`],
      why: `$v^2=${u * u}+2\\times${a}\\times${s}=${v2}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "Slope of a $v$–$t$ graph is",
      correct: "acceleration",
      wrong: ["displacement", "jerk", "velocity"],
      why: "$a=dv/dt$ is the slope of $v$–$t$. Area under $v$–$t$ is displacement.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "A body thrown up with $u$ returns in time $T$. Maximum height is ($g$ constant)",
      correct: "$u^2/2g$",
      wrong: ["$uT$", "$u^2/g$", "$gT^2/2$"],
      why: "At top $v=0$, $0=u^2-2gH\\Rightarrow H=u^2/2g$. Also $T=2u/g$.",
    });
  }
  return mcq({
    chapterId: "phy-motion-1d",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "If $a=kv$ with $v=v_0$ at $t=0$, then $v(t)$ is",
    correct: "$v_0 e^{kt}$",
    wrong: ["$v_0 e^{-kt}$", "$v_0+kt$", "$v_0(1+kt)$"],
    why: "$dv/dt=kv\\Rightarrow dv/v=k\\,dt\\Rightarrow \\ln v=kt+C\\Rightarrow v=v_0 e^{kt}$. (If drag $a=-kv$, the minus appears.)",
  });
}

function mot2d(i: number): PlayItem {
  const u = choiceOf("phy-motion-2d", i, [10, 20, 30, 40, 50]);
  const m = i % 7;
  if (m === 0) {
    const T = (2 * u * 0.5) / G; // 30°
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Projectile, $u=${u}\\,\\mathrm{m/s}$, $\\theta=30^\\circ$, $g=${G}$. Time of flight (s) is`,
      answer: T,
      why: `$T=2u\\sin\\theta/g=2\\times${u}\\times 1/2 / ${G}=${T}$.`,
    });
  }
  if (m === 1) {
    const R = (u * u) / G; // 45°
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Maximum range on horizontal ground for $u=${u}\\,\\mathrm{m/s}$, $g=${G}$ (metres) is`,
      answer: R,
      why: "$R_{\\max}=u^2/g$ at $45^\\circ$.",
    });
  }
  if (m === 2) {
    const H = (u * u) / (8 * G); // 30°
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Max height for $u=${u}\\,\\mathrm{m/s}$ at $30^\\circ$, $g=${G}$, is`,
      correct: `${H} m`,
      wrong: [`${(u * u) / (2 * G)} m`, `${(u * u) / (4 * G)} m`, `${u} m`],
      why: `$H=u^2\\sin^2\\theta/(2g)=${u}^2 (1/2)^2 / (2\\times${G})=${H}$.`,
    });
  }
  if (m === 3) {
    const v = choiceOf("phy-motion-2d", i, [4, 5, 6, 8, 10]);
    const r = choiceOf("phy-motion-2d", i + 3, [2, 4, 5, 8]);
    const ac = (v * v) / r;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Uniform circular motion: $v=${v}\\,\\mathrm{m/s}$, $r=${r}\\,\\mathrm{m}$. Centripetal acceleration (m/s²) is`,
      answer: ac,
      why: `$a_c=v^2/r=${v * v}/${r}=${ac}$.`,
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "At the highest point of a projectile (no air), the acceleration is",
      correct: "$g$ downward",
      wrong: ["zero", "$g$ along the trajectory", "horizontal"],
      why: "Gravity never switches off. Velocity is horizontal; acceleration is still $g$ down.",
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "Range is the same for complementary angles",
      correct: "$\\theta$ and $90^\\circ-\\theta$",
      wrong: ["$\\theta$ and $2\\theta$", "$\\theta$ and $-\\theta$", "$30^\\circ$ and $45^\\circ$ only"],
      why: "$\\sin 2(90-\\theta)=\\sin(180-2\\theta)=\\sin 2\\theta$.",
    });
  }
  return mcq({
    chapterId: "phy-motion-2d",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Projectile on an incline of angle $\\beta$, launched up the slope at $\\theta$ to the horizontal. Flight time is proportional to",
    correct: "$1/(g\\cos\\beta)$ times a sine factor",
    wrong: ["$1/g$ only, independent of $\\beta$", "$g\\sin\\beta$ in the numerator only", "range formula $u^2/g$ unchanged"],
    why: "Effective $g_\\perp=g\\cos\\beta$. Standard result $T=2u\\sin(\\theta-\\beta)/[g\\cos^2\\beta]$.",
  });
}

function nlm(i: number): PlayItem {
  const m = i % 7;
  if (m === 0) {
    const mass = choiceOf("phy-nlm", i, [2, 4, 5, 8, 10]);
    const F = choiceOf("phy-nlm", i + 1, [10, 20, 40, 50]);
    const a = F / mass;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Net force $${F}\\,\\mathrm{N}$ on mass $${mass}\\,\\mathrm{kg}$. Acceleration (m/s²) is`,
      answer: a,
      why: `$a=F/m=${F}/${mass}=${a}$.`,
    });
  }
  if (m === 1) {
    const m1 = choiceOf("phy-nlm", i, [3, 4, 5, 6]);
    const m2 = choiceOf("phy-nlm", i + 2, [1, 2, 3]);
    if (m1 <= m2) return nlm(i + 3);
    const a = nint(((m1 - m2) / (m1 + m2)) * G * 100) / 100;
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Atwood: $m_1=${m1}\\,\\mathrm{kg}$, $m_2=${m2}\\,\\mathrm{kg}$, $g=${G}$. Acceleration magnitude is`,
      correct: `${((m1 - m2) / (m1 + m2)) * G} m/s²`,
      wrong: [`${G} m/s²`, `${((m1 + m2) / (m1 - m2)) * G} m/s²`, `${(m1 / m2) * G} m/s²`],
      why: `$a=(m_1-m_2)g/(m_1+m_2)=(${m1}-${m2})${G}/(${m1}+${m2})=${a}\\,\\mathrm{m/s^2}$.`,
    });
  }
  if (m === 2) {
    const mu = cycle([0.2, 0.3, 0.4, 0.5], i);
    const N = cycle([10, 20, 50, 100], i);
    const f = mu * N;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Limiting friction: $\\mu=${mu}$, $N=${N}\\,\\mathrm{N}$. $f_{\\max}$ (N) is`,
      answer: f,
      why: `$f_{\\max}=\\mu N=${mu}\\times${N}=${f}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Pseudo force on mass $m$ in a frame accelerating at $\\vec a_0$ is",
      correct: "$-m\\vec a_0$",
      wrong: ["$+m\\vec a_0$", "$-m\\vec g$", "zero if the body is at rest in that frame"],
      why: "Non-inertial frame: every mass feels $-m a_0$, even if it is at rest in that frame.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "A block on a rough horizontal floor is pulled by $P$ at angle $\\theta$ above the horizontal. Normal is",
      correct: "$mg - P\\sin\\theta$",
      wrong: ["$mg$", "$mg + P\\sin\\theta$", "$P\\cos\\theta$"],
      why: "Vertical: $N + P\\sin\\theta = mg$. Pulling up unloads the floor.",
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Minimum speed at the top of a vertical loop of radius $R$ (inside a smooth track) is",
      correct: "$\\sqrt{gR}$",
      wrong: ["$\\sqrt{2gR}$", "$\\sqrt{5gR}$", "0"],
      why: "At top $N+mg=mv^2/R$. Leaving contact $N=0\\Rightarrow v=\\sqrt{gR}$. At the bottom you need $\\sqrt{5gR}$.",
    });
  }
  return mcq({
    chapterId: "phy-nlm",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Banking of a curve, no friction, speed $v$, radius $r$. The correct relation is",
    correct: "$\\tan\\theta=v^2/(rg)$",
    wrong: ["$\\tan\\theta=rg/v^2$", "$\\sin\\theta=v^2/(rg)$", "$\\theta=v^2/r$"],
    why: "Resolve $N$ : $N\\sin\\theta=mv^2/r$, $N\\cos\\theta=mg$.",
  });
}

function wep(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const mass = choiceOf("phy-wep", i, [2, 4, 5, 8]);
    const v = choiceOf("phy-wep", i + 1, [4, 5, 10, 20]);
    const K = 0.5 * mass * v * v;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Kinetic energy of ${mass} kg moving at ${v} m/s, in joules, is`,
      answer: K,
      why: `$K=\\frac12 mv^2=\\frac12\\times${mass}\\times${v * v}=${K}$.`,
    });
  }
  if (m === 1) {
    const k = choiceOf("phy-wep", i, [100, 200, 400, 50]);
    const x = choiceOf("phy-wep", i + 2, [0.1, 0.2, 0.4, 0.5]);
    const U = 0.5 * k * x * x;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Spring $k=${k}\\,\\mathrm{N/m}$, stretch ${x} m. Elastic energy (J) is`,
      answer: U,
      why: `$U=\\frac12 kx^2=${U}$.`,
    });
  }
  if (m === 2) {
    const F = choiceOf("phy-wep", i, [10, 20, 50]);
    const s = choiceOf("phy-wep", i + 1, [2, 4, 5, 10]);
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Constant force ${F} N along a ${s} m displacement. Work (J) is`,
      answer: F * s,
      why: "$W=\\vec F\\cdot\\vec s$ here $=Fs$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "Work–energy theorem states that net work equals",
      correct: "change in kinetic energy",
      wrong: ["change in potential energy", "change in mechanical energy", "power × time always"],
      why: "$W_{\\mathrm{net}}=\\Delta K$. Conservative work is also $-\\Delta U$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "A perfectly inelastic 1-D collision of equal masses, one at rest. Fraction of KE lost is",
      correct: "$1/2$",
      wrong: ["$0$", "$1/4$", "$1$"],
      why: "COM speed $v/2$. Final KE $=\\frac14 mv^2$, initial $\\frac12 mv^2$, loss 50%.",
    });
  }
  return mcq({
    chapterId: "phy-wep",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "On a $U(x)$ graph, stable equilibrium requires",
    correct: "$dU/dx=0$ and $d^2U/dx^2>0$",
    wrong: ["$dU/dx=0$ only", "$U$ maximum", "$F$ maximum"],
    why: "$F=-dU/dx$. A well ($U$ min) is restoring.",
  });
}

function rot(i: number): PlayItem {
  const m = i % 7;
  if (m === 0) {
    const rows = [
      ["solid sphere about diameter", "$\\frac25 MR^2$"],
      ["hollow sphere about diameter", "$\\frac23 MR^2$"],
      ["solid cylinder about axis", "$\\frac12 MR^2$"],
      ["thin ring about axis", "$MR^2$"],
      ["thin rod about centre, ⊥", "$\\frac1{12}ML^2$"],
      ["thin rod about end, ⊥", "$\\frac13 ML^2$"],
      ["disc about axis", "$\\frac12 MR^2$"],
    ] as const;
    const r = cycle(rows, i);
    const wrongs = rows.filter((x) => x[0] !== r[0]).map((x) => x[1]);
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `Moment of inertia of a ${r[0]} is`,
      correct: r[1],
      wrong: wrongs.slice(0, 3),
      why: `Standard result: ${r[0]} → ${r[1]}.`,
    });
  }
  if (m === 1) {
    const I = choiceOf("phy-rotation", i, [2, 4, 5, 8]);
    const a = choiceOf("phy-rotation", i + 1, [2, 4, 5, 10]);
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `$\\tau=I\\alpha$. If $I=${I}\\,\\mathrm{kg\\,m^2}$ and $\\alpha=${a}\\,\\mathrm{rad/s^2}$, torque (N m) is`,
      answer: I * a,
      why: `$\\tau=${I}\\times${a}=${I * a}$.`,
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Rolling without slipping on a fixed surface means",
      correct: "$v=\\omega R$ at the centre, contact point instantaneously at rest",
      wrong: ["$v=0$ of the centre", "friction is necessarily kinetic", "$\\omega=0$"],
      why: "Pure rolling: $v=\\omega R$. Static friction, which may be zero on a horizontal with no acceleration.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Parallel-axis theorem requires the first axis to pass through",
      correct: "the centre of mass, parallel to the new axis",
      wrong: ["any point", "the geometric centre even if CM is elsewhere", "a point on the surface"],
      why: "$I=I_{\\mathrm{cm}}+Md^2$. The reference axis is CM.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "A solid sphere and a disc roll from rest down the same incline. Who wins?",
      correct: "sphere (smaller $k^2/R^2$)",
      wrong: ["disc", "tie", "the heavier one"],
      why: "$a=g\\sin\\theta/(1+k^2/R^2)$. Sphere $2/5$, disc $1/2$. Smaller inertial factor → larger $a$.",
    });
  }
  if (m === 5) {
    const M = 2;
    const R = 1;
    const Icm = 0.4 * M * R * R;
    const I = Icm + M * R * R;
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `Solid sphere $M=2$ kg, $R=1$ m. $I$ about a tangent (kg m²) is`,
      answer: I,
      why: "$I_{\\mathrm{cm}}=2/5 MR^2=0.8$, plus $MR^2=2$, total $2.8$.",
    });
  }
  return mcq({
    chapterId: "phy-rotation",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Angular momentum of a particle about a point is",
    correct: "$\\vec r\\times\\vec p$",
    wrong: ["$I\\omega$ always", "$mvR$ always", "$\\vec r\\cdot\\vec p$"],
    why: "Definition $\\vec L=\\vec r\\times\\vec p$. $I\\omega$ is a rigid-body component about a fixed axis.",
  });
}

function grav(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Escape speed from the surface of a planet is",
      correct: "$\\sqrt{2GM/R}$",
      wrong: ["$\\sqrt{GM/R}$", "$\\sqrt{GM/2R}$", "$2GM/R$"],
      why: "Set $\\frac12 mv_e^2 - GMm/R=0$. Orbital LEO is $\\sqrt{GM/R}=v_e/\\sqrt{2}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Acceleration due to gravity at height $h\\ll R$ is approximately",
      correct: "$g(1-2h/R)$",
      wrong: ["$g(1-h/R)$", "$g(1+2h/R)$", "$g(1-h/R)^2$"],
      why: "$g(h)=g(1+h/R)^{-2}\\approx g(1-2h/R)$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "At depth $d$, $g(d)=$",
      correct: "$g(1-d/R)$",
      wrong: ["$g(1-2d/R)$", "$g(1+d/R)$", "$GM/(R-d)^2$"],
      why: "Inside a uniform sphere $g(r)=GMr/R^3=g r/R$, so $g(1-d/R)$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Kepler’s third law for circular orbits: $T^2$ is proportional to",
      correct: "$a^3$",
      wrong: ["$a$", "$a^2$", "$1/a^3$"],
      why: "$T^2=4\\pi^2 a^3/(GM)$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Gravitational potential due to a point mass is (zero at infinity)",
      correct: "$-GM/r$",
      wrong: ["$+GM/r$", "$-GM/r^2$", "$GM/r^2$"],
      why: "Potential is negative, field is $-dV/dr=-GM/r^2$ inward.",
    });
  }
  return mcq({
    chapterId: "phy-gravitation",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A satellite in a circular orbit has total energy $E$. Kinetic energy is",
    correct: "$-E$",
    wrong: ["$E$", "$2E$", "$-2E$"],
    why: "$K=+GMm/(2r)$, $U=-GMm/r$, $E=-K$. So $K=-E$, $U=2E$.",
  });
}

function solids(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const F = choiceOf("phy-solids", i, [100, 200, 50]);
    const A = choiceOf("phy-solids", i + 1, [2e-4, 1e-4, 5e-4]);
    const stress = F / A;
    return num({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: `Force ${F} N on area ${A} m². Longitudinal stress (N/m²) is`,
      answer: stress,
      why: `$\\mathrm{stress}=F/A=${stress}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Young’s modulus $Y$ is",
      correct: "longitudinal stress / longitudinal strain",
      wrong: ["strain / stress", "shear stress / shear strain", "volume stress / volume strain"],
      why: "$Y=\\sigma/\\varepsilon$ for linear stretch. $B$ is bulk, $\\eta$ is shear.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Poisson’s ratio $\\sigma$ is",
      correct: "lateral strain / longitudinal strain (magnitude, with a sign convention)",
      wrong: ["$Y/B$", "stress / $Y$", "always 0.5 for solids"],
      why: "$\\sigma=-\\varepsilon_{\\perp}/\\varepsilon_{\\parallel}$. For incompressible $0.5$; metals ~0.3.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Energy density stored in a stretched wire is",
      correct: "$\\frac12 \\times$ stress $\\times$ strain",
      wrong: ["stress × strain", "$Y \\times$ strain", "stress / 2"],
      why: "$u=\\frac12 Y \\varepsilon^2=\\frac12 \\sigma\\varepsilon$.",
    });
  }
  return mcq({
    chapterId: "phy-solids",
    i,
    subject: "physics",
    stem: "Relation among $Y,B,\\eta$ (approximately, isotropic) includes",
    correct: "$Y=3B(1-2\\sigma)=2\\eta(1+\\sigma)$",
    wrong: ["$Y=B+\\eta$", "$Y=B\\eta$", "$Y=3B+2\\eta$ only, with no $\\sigma$"],
    why: "Two independent elastic constants for isotropic solids. Learn $Y=2\\eta(1+\\sigma)$ and $Y=3B(1-2\\sigma)$.",
  });
}

function fluids(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const h = choiceOf("phy-fluids", i, [5, 10, 20]);
    const v = Math.sqrt(2 * G * h);
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Torricelli: hole at depth ${h} m, $g=${G}$. Efflux speed (m/s) is`,
      answer: v,
      why: `$v=\\sqrt{2gh}=\\sqrt{2\\times${G}\\times${h}}=${v}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Excess pressure inside a soap bubble is",
      correct: "$4S/r$",
      wrong: ["$2S/r$", "$S/r$", "$8S/r$"],
      why: "Two surfaces. A liquid drop is $2S/r$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "A body floats with fraction $f$ immersed. Density relative to the liquid is",
      correct: "$f$",
      wrong: ["$1-f$", "$1/f$", "$f^2$"],
      why: "Archimedes: $fV\\rho g = V\\sigma g\\Rightarrow \\sigma/\\rho=f$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Poiseuille volume flow rate $Q$ is proportional to",
      correct: "$r^4$",
      wrong: ["$r$", "$r^2$", "$r^3$"],
      why: "$Q=\\pi r^4 \\Delta P/(8\\eta L)$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Bernoulli along a streamline (ideal, incompressible, steady) is conservation of",
      correct: "mechanical energy per unit volume",
      wrong: ["mass only", "momentum only", "entropy"],
      why: "$P+\\rho g h+\\frac12\\rho v^2=\\mathrm{const}$. Continuity is mass.",
    });
  }
  return mcq({
    chapterId: "phy-fluids",
    i,
    subject: "physics",
    stem: "Stokes drag on a sphere is",
    correct: "$6\\pi\\eta r v$",
    wrong: ["$6\\pi\\eta r^2 v$", "$4\\pi\\eta r v$", "$2\\pi\\eta r v$"],
    why: "Linear in $r$ and $v$, low Reynolds number.",
  });
}

function thermal(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const L = choiceOf("phy-thermal", i, [1, 2, 0.5]);
    const a = choiceOf("phy-thermal", i + 1, [1e-5, 2e-5, 1.2e-5]);
    const dT = choiceOf("phy-thermal", i + 2, [50, 100, 80]);
    const dL = L * a * dT;
    return num({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: `Rod length ${L} m, $\\alpha=${a}\\,\\mathrm{K^{-1}}$, $\\Delta T=${dT}$ K. Expansion $\\Delta L$ in metres (scientific: report as ${dL}) is`,
      answer: dL,
      tolerance: dL * 0.01 || 1e-8,
      why: `$\\Delta L=L\\alpha\\Delta T=${dL}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "For isotropic solids, $\\gamma$ (volume) relates to $\\alpha$ (linear) by",
      correct: "$\\gamma=3\\alpha$",
      wrong: ["$\\gamma=\\alpha$", "$\\gamma=2\\alpha$", "$\\gamma=\\alpha^3$"],
      why: "$V=L^3\\Rightarrow \\Delta V/V=3\\Delta L/L$. Area $\\beta=2\\alpha$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Newton’s law of cooling: rate of temperature fall is proportional to",
      correct: "$T-T_0$ (excess over surroundings)",
      wrong: ["$T$", "$T^4$", "$T^2$"],
      why: "$dT/dt=-k(T-T_0)$ for small excess. Stefan is $T^4$ for radiation.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Thermal conductivity $K$ appears in",
      correct: "$H=KA\\Delta T/\\ell$",
      wrong: ["$H=\\sigma AT^4$", "$H=mc\\Delta T$", "$PV=nRT$"],
      why: "Conduction (steady). Radiation is Stefan; calorimetry is $mc\\Delta T$.",
    });
  }
  return mcq({
    chapterId: "phy-thermal",
    i,
    subject: "physics",
    stem: "Water’s anomalous expansion is crucial between",
    correct: "$0^\\circ\\mathrm{C}$ and $4^\\circ\\mathrm{C}$",
    wrong: ["$4^\\circ$ and $100^\\circ$", "only at $0^\\circ$", "$-4^\\circ$ to $0^\\circ$"],
    why: "Density maximum at $4^\\circ\\mathrm{C}$. Lakes freeze from the top.",
  });
}

function thermo(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const Q = choiceOf("phy-thermo", i, [100, 200, 400]);
    const W = choiceOf("phy-thermo", i + 1, [40, 50, 80, 100]);
    return num({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: `First law, $\\Delta U=Q-W$ (physics sign). $Q=${Q}$ J, $W=${W}$ J. $\\Delta U$ (J) is`,
      answer: Q - W,
      why: "Physics NCERT: $Q=\\Delta U+W$ with $W$ work by the system.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "For an ideal gas isothermal process",
      correct: "$\\Delta U=0$ and $Q=W$",
      wrong: ["$Q=0$", "$W=0$", "$\\Delta U=Q$"],
      why: "$U=U(T)$ for ideal gas. $Q=W$ (physics sign).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Adiabatic reversible ideal gas",
      correct: "$PV^\\gamma=\\mathrm{const}$",
      wrong: ["$PV=\\mathrm{const}$", "$P/T=\\mathrm{const}$", "$TV=\\mathrm{const}$"],
      why: "$PV^\\gamma=T V^{\\gamma-1}=T^\\gamma P^{1-\\gamma}=\\mathrm{const}$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "$C_P-C_V$ for an ideal gas equals",
      correct: "$R$ (per mole)",
      wrong: ["$0$", "$\\gamma$", "$R/\\gamma$"],
      why: "Mayer’s relation. $\\gamma=C_P/C_V$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Carnot efficiency between $T_H$ and $T_C$ is",
      correct: "$1-T_C/T_H$",
      wrong: ["$1-T_H/T_C$", "$T_H-T_C$", "$(T_H-T_C)/T_C$"],
      why: "Kelvin temperatures. Independent of working substance.",
    });
  }
  return mcq({
    chapterId: "phy-thermo",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Work in a cyclic process equals",
    correct: "area enclosed on the $P$–$V$ diagram",
    wrong: ["$\\Delta U$", "zero always", "area on $T$–$S$ only, never $P$–$V$"],
    why: "$\\oint dU=0\\Rightarrow W_{\\mathrm{net}}=Q_{\\mathrm{net}}=\\oint P\\,dV$.",
  });
}

function ktg(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Pressure of an ideal gas from kinetic theory is",
      correct: "$P=\\frac13\\rho v_{\\mathrm{rms}}^2$",
      wrong: ["$P=\\rho v_{\\mathrm{rms}}^2$", "$P=\\frac12\\rho v_{\\mathrm{rms}}^2$", "$P=\\frac13 mv_{\\mathrm{rms}}$"],
      why: "Standard derivation from momentum transfer on a wall.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Average translational KE per molecule is",
      correct: "$\\frac32 kT$",
      wrong: ["$\\frac12 kT$", "$kT$", "$\\frac32 RT$"],
      why: "$\\frac32 kT$ per molecule, $\\frac32 RT$ per mole. $R=N_A k$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "$v_{\\mathrm{rms}}$ is",
      correct: "$\\sqrt{3RT/M}$",
      wrong: ["$\\sqrt{2RT/M}$", "$\\sqrt{8RT/(\\pi M)}$", "$\\sqrt{RT/M}$"],
      why: "$v_{\\mathrm{rms}}=\\sqrt{3RT/M}$, $v_{\\mathrm{mp}}=\\sqrt{2RT/M}$, $\\langle v\\rangle=\\sqrt{8RT/\\pi M}$.",
    });
  }
  if (m === 3) {
    const f = cycle([3, 5, 6], i);
    const gamma = (f + 2) / f;
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: `Ideal gas with $f=${f}$ degrees of freedom. $\\gamma=C_P/C_V$ is`,
      correct: `${gamma}`,
      wrong: [`${f / (f + 2)}`, `${f}`, `${1 + f}`],
      why: `$C_V=fR/2$, $C_P=C_V+R$, $\\gamma=1+2/f=${gamma}$.`,
    });
  }
  return mcq({
    chapterId: "phy-ktg",
    i,
    subject: "physics",
    stem: "Mean free path $\\lambda$ is proportional to",
    correct: "$1/(n\\pi d^2)$",
    wrong: ["$n\\pi d^2$", "$T$ only, independent of $n$", "$d^2$"],
    why: "$\\lambda=1/(\\sqrt{2}\\, n\\pi d^2)$. Higher density, shorter path.",
  });
}

function osc(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const mass = choiceOf("phy-oscillations", i, [1, 2, 4, 0.25]);
    const k = choiceOf("phy-oscillations", i + 1, [100, 400, 16, 64]);
    const T = 2 * Math.PI * Math.sqrt(mass / k);
    const rounded = nint(T * 100) / 100;
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Mass ${mass} kg on $k=${k}\\,\\mathrm{N/m}$. Time period is`,
      correct: `$2\\pi\\sqrt{${mass}/${k}}$`,
      wrong: [`$2\\pi\\sqrt{${k}/${mass}}$`, `$2\\pi ${mass}/${k}$`, `$\\sqrt{${k}/${mass}}$`],
      why: `$T=2\\pi\\sqrt{m/k}\\approx${rounded}\\,\\mathrm{s}$.`,
    });
  }
  if (m === 1) {
    const L = cycle([1, 2.5, 0.4, 0.9], i);
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Simple pendulum, $L=${L}$ m, $g=${G}$. $T$ is`,
      correct: `$2\\pi\\sqrt{${L}/${G}}$`,
      wrong: [`$2\\pi\\sqrt{${G}/${L}}$`, `$2\\pi ${L}$`, `$\\sqrt{${L}}$`],
      why: "$T=2\\pi\\sqrt{L/g}$, small angle.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "In SHM, acceleration is",
      correct: "$-\\omega^2 x$",
      wrong: ["$-\\omega x$", "$\\omega^2 x$", "constant"],
      why: "Defining equation $\\ddot x+\\omega^2 x=0$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "Total energy of SHM is",
      correct: "$\\frac12 k A^2 = \\frac12 m\\omega^2 A^2$",
      wrong: ["$\\frac12 k x^2$ only", "$\\frac12 m v^2$ only", "$m\\omega A$"],
      why: "E is constant. $K$ and $U$ trade. At mean position $K=E$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "A second’s pendulum has $T=$",
      correct: "2 s",
      wrong: ["1 s", "π s", "0.5 s"],
      why: "Time from one extreme to the other is 1 s, full period 2 s. $L\\approx 1$ m.",
    });
  }
  return mcq({
    chapterId: "phy-oscillations",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "For small oscillations, $T=2\\pi\\sqrt{m_{\\mathrm{eff}}/k_{\\mathrm{eff}}}$. A physical pendulum of $I$ about pivot, distance $d$ of CM, has $T=$",
    correct: "$2\\pi\\sqrt{I/(mgd)}$",
    wrong: ["$2\\pi\\sqrt{I/mg}$", "$2\\pi\\sqrt{d/g}$", "$2\\pi\\sqrt{I d/mg}$"],
    why: "$\\tau=-mgd\\sin\\theta\\approx -mgd\\,\\theta=I\\ddot\\theta$.",
  });
}

function waves(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const f = choiceOf("phy-waves", i, [50, 100, 200, 440]);
    const lam = choiceOf("phy-waves", i + 1, [2, 4, 0.5, 0.8]);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `Wave speed if $f=${f}\\,\\mathrm{Hz}$, $\\lambda=${lam}\\,\\mathrm{m}$ (m/s) is`,
      answer: f * lam,
      why: "$v=f\\lambda$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Speed of a transverse wave on a string is",
      correct: "$\\sqrt{T/\\mu}$",
      wrong: ["$\\sqrt{\\mu/T}$", "$T/\\mu$", "$\\sqrt{T\\mu}$"],
      why: "Tension over linear density. Independent of amplitude (linear wave).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Fundamental of a string fixed at both ends, length $L$, is",
      correct: "$\\lambda=2L$, $f=v/(2L)$",
      wrong: ["$\\lambda=L$", "$\\lambda=4L$", "$f=v/L$"],
      why: "Two nodes, one loop. Open organ pipe also $2L$; closed pipe $4L$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Beats frequency from $f_1$ and $f_2$ is",
      correct: "$|f_1-f_2|$",
      wrong: ["$f_1+f_2$", "$(f_1+f_2)/2$ only", "$f_1 f_2$"],
      why: "Amplitude modulation at the difference. Average is the heard pitch.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Intensity of a sound wave is proportional to",
      correct: "$A^2$ and $f^2$ (for a given medium)",
      wrong: ["$A$ only", "$1/A^2$", "$f$ only"],
      why: "$I=\\frac12 \\rho v \\omega^2 A^2$.",
    });
  }
  return mcq({
    chapterId: "phy-waves",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Doppler, source moving towards a stationary observer: observed $f'$ is",
    correct: "$f\\,v/(v-v_s)$",
    wrong: ["$f(v+v_s)/v$", "$f(v-v_s)/v$", "$f v/(v+v_s)$"],
    why: "Wavelength compresses: $\\lambda'=(v-v_s)/f$. Observer motion goes in the numerator.",
  });
}

function charges(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const q = cycle([1, 2, 3, 4], i);
    const r = cycle([1, 2, 0.5], i);
    const F = 9 * (q * q) / (r * r); // μC-scale: use 9e9 * (q e-6)^2 / r^2
    // Use q in μC, r in m, k=9e9: F = 9e9 * q^2 e-12 / r^2 = 9 q^2 / r^2 * 1e-3
    const force = (9 * q * q) / (r * r) * 0.001;
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: `Two charges ${q} μC each, ${r} m apart in air. Force magnitude is`,
      correct: `${force} N`,
      wrong: [`${9 * q * q / (r * r)} N`, `${force * 10} N`, `${force / 9} N`],
      why: `$F=9\\times10^9 (q\\times10^{-6})^2/r^2=9q^2\\times10^{-3}/r^2=${force}\\,\\mathrm{N}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Electric field of a point charge is",
      correct: "$k q/r^2$ radially",
      wrong: ["$k q/r$", "$k q/r^3$ as the field (not the vector form)", "zero outside"],
      why: "$\\vec E=kq\\hat r/r^2$. The vector form $kq\\vec r/r^3$ is the same.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Gauss’s law: flux through a closed surface is",
      correct: "$Q_{\\mathrm{encl}}/\\varepsilon_0$",
      wrong: ["$Q_{\\mathrm{total}}/\\varepsilon_0$ including outside charges", "$E\\cdot A$ only if $E$ is constant, as the definition of flux (law is more)", "zero always"],
      why: "Outside charges contribute zero net flux. $\\oint\\vec E\\cdot d\\vec A=Q_{\\mathrm{in}}/\\varepsilon_0$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Field of an infinite line charge $\\lambda$ is",
      correct: "$\\lambda/(2\\pi\\varepsilon_0 r)$",
      wrong: ["$\\lambda/(4\\pi\\varepsilon_0 r^2)$", "$\\lambda/(2\\varepsilon_0)$", "$\\lambda/(4\\pi\\varepsilon_0 r)$"],
      why: "Cylindrical Gauss surface. Infinite sheet is $\\sigma/(2\\varepsilon_0)$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Field inside a uniformly charged insulating sphere, $r<R$, is proportional to",
      correct: "$r$",
      wrong: ["$1/r^2$", "$1/r$", "constant"],
      why: "$Q_{\\mathrm{in}}\\propto r^3$, $E\\cdot 4\\pi r^2 \\propto r^3\\Rightarrow E\\propto r$.",
    });
  }
  return mcq({
    chapterId: "phy-charges",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Dipole $\\vec p$ in uniform $\\vec E$: net force and torque are",
    correct: "force $0$, torque $\\vec p\\times\\vec E$",
    wrong: ["both zero", "force $qE$, torque 0", "force $p\\,dE/dx$ even if $E$ is strictly uniform"],
    why: "Uniform field: equal and opposite forces. Non-uniform: $F=(\\vec p\\cdot\\nabla)\\vec E$.",
  });
}

function potential(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Potential of a point charge (zero at $\\infty$) is",
      correct: "$kq/r$",
      wrong: ["$kq/r^2$", "$-kq/r^2$", "$kq r$"],
      why: "$V=\\int_r^\\infty E\\,dr=kq/r$. Scalar.",
    });
  }
  if (m === 1) {
    const C = choiceOf("phy-potential", i, [2, 4, 5, 10]);
    const V = choiceOf("phy-potential", i + 1, [2, 4, 5, 10, 12]);
    const U = 0.5 * C * V * V;
    return num({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: `Capacitor ${C} μF at ${V} V. Energy in μJ is`,
      answer: U,
      why: `$U=\\frac12 CV^2$ with $C$ in μF, $V$ in V gives μJ: ${U}$.`,
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Two capacitors $C$ in series. Equivalent is",
      correct: "$C/2$",
      wrong: ["$2C$", "$C$", "$C^2$"],
      why: "$1/C_s=1/C+1/C$. Parallel: $2C$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Parallel-plate $C=$",
      correct: "$\\varepsilon_0 A/d$",
      wrong: ["$\\varepsilon_0 Ad$", "$\\varepsilon_0 d/A$", "$A/(\\varepsilon_0 d)$"],
      why: "Inserting dielectric $K$ multiplies $C$ by $K$ (battery disconnected vs connected: $Q$ vs $V$ fixed).",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "$\\vec E$ and $V$ are related by",
      correct: "$\\vec E=-\\nabla V$",
      wrong: ["$\\vec E=+\\nabla V$", "$V=-\\nabla E$", "$E=V/r^2$ always"],
      why: "Field points to decreasing potential. Equipotentials are perpendicular to field lines.",
    });
  }
  return mcq({
    chapterId: "phy-potential",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A dielectric slab filling a disconnected capacitor",
    correct: "decreases $V$ and $U$, $Q$ fixed",
    wrong: ["increases $V$", "increases $U$", "changes $Q$"],
    why: "$Q$ fixed, $C\\to KC$, $V=Q/C$ falls, $U=Q^2/(2C)$ falls. Battery-connected: $V$ fixed, $U$ rises.",
  });
}

function current(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const V = choiceOf("phy-current", i, [2, 4, 6, 12]);
    const R = choiceOf("phy-current", i + 1, [2, 4, 6, 8, 10]);
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `Ohm: $V=${V}\\,\\mathrm{V}$, $R=${R}\\,\\Omega$. Current in amperes is`,
      answer: V / R,
      why: "$I=V/R$.",
    });
  }
  if (m === 1) {
    const r = cycle([1, 2, 4], i);
    const L = cycle([1, 2, 4], i + 1);
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `Resistance of a wire $\\propto L/A$. If length is scaled by ${L} and radius by ${r}, $R$ scales by`,
      correct: `${L / (r * r)}`,
      wrong: [`${L / r}`, `${L * r * r}`, `${1 / (L * r * r)}`],
      why: `$A\\propto r^2$, so factor $L/r^2=${L}/${r * r}$.`,
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Kirchhoff’s junction rule is conservation of",
      correct: "charge",
      wrong: ["energy", "momentum", "mass"],
      why: "Loop rule is energy (around a closed loop, $\\sum \\Delta V=0$).",
    });
  }
  if (m === 3) {
    const emf = cycle([2, 6, 12], i);
    const r = cycle([1, 2], i);
    const R = cycle([3, 4, 5], i);
    const I = emf / (R + r);
    const V = nint(I * R * 100) / 100;
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `Cell $\\mathcal{E}=${emf}$ V, $r=${r}\\,\\Omega$, load $R=${R}\\,\\Omega$. Terminal voltage (V) is`,
      answer: V,
      tolerance: 0.05,
      why: `$I=\\mathcal{E}/(R+r)$, $V=IR=${V}$.`,
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Wheatstone bridge is balanced when",
      correct: "$P/Q=R/S$",
      wrong: ["$P+Q=R+S$", "$P/R=Q+S$", "$P=Q=R=S$ only"],
      why: "No current in the galvanometer branch. Metre bridge is the same ratio.",
    });
  }
  return mcq({
    chapterId: "phy-current",
    i,
    subject: "physics",
    stem: "Drift speed $v_d$ is related to current by",
    correct: "$I=neAv_d$",
    wrong: ["$I=nev_d$", "$I=neA/v_d$", "$I=nAv_d$"],
    why: "Definition of current as charge flux. $v_d\\ll$ thermal speed.",
  });
}

function moving(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Force on a charge in $\\vec B$ is",
      correct: "$q\\,\\vec v\\times\\vec B$",
      wrong: ["$q\\vec B$", "$q v B$ always, any angle", "$q\\vec v\\cdot\\vec B$"],
      why: "Magnetic force is perpendicular to $\\vec v$ and does no work.",
    });
  }
  if (m === 1) {
    const r = cycle([0.1, 0.2, 0.5], i);
    const I = cycle([2, 4, 5, 10], i);
    // B = 2e-7 I / r = 2e-7 * I / r
    const B = (2e-7 * I) / r;
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: `Biot–Savart, infinite wire $I=${I}$ A, $r=${r}$ m. $B$ is`,
      correct: `${B} T`,
      wrong: [`${B * 2} T`, `${B / 2} T`, `${(1e-7 * I) / r} T`],
      why: "$B=\\mu_0 I/(2\\pi r)=2\\times10^{-7} I/r$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Cyclotron frequency $\\omega$ is",
      correct: "$qB/m$",
      wrong: ["$qB$", "$m/qB$", "$qBm$"],
      why: "$qvB=mv^2/r\\Rightarrow \\omega=v/r=qB/m$. Independent of $v$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Force on a current element is",
      correct: "$I\\,d\\vec\\ell\\times\\vec B$",
      wrong: ["$I d\\ell B$ along the wire", "$I\\vec B$", "$q\\vec v\\cdot\\vec B$"],
      why: "Ampère’s force law. Parallel currents attract.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Magnetic field at the centre of a single loop of radius $R$ is",
      correct: "$\\mu_0 I/(2R)$",
      wrong: ["$\\mu_0 I/(2\\pi R)$", "$\\mu_0 I/(4\\pi R)$", "$\\mu_0 I/R$"],
      why: "Infinite wire is $\\mu_0 I/(2\\pi R)$. Don’t swap them.",
    });
  }
  return mcq({
    chapterId: "phy-moving",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A charged particle in crossed uniform $E$ and $B$ (mutually perpendicular) has undeflected velocity",
    correct: "$E/B$",
    wrong: ["$B/E$", "$EB$", "$\\sqrt{E/B}$"],
    why: "$qE=qvB\\Rightarrow v=E/B$. Velocity selector.",
  });
}

function magMatter(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Among the three, which has $\\mu_r$ slightly greater than 1?",
      correct: "paramagnetic",
      wrong: ["diamagnetic", "ferromagnetic", "superconductor (Meissner)"],
      why: "Dia: $\\mu_r<1$ slightly. Para: $>1$ slightly. Ferro: $\\gg 1$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Curie’s law for paramagnets: $\\chi$ is proportional to",
      correct: "$1/T$",
      wrong: ["$T$", "$T^2$", "constant"],
      why: "$\\chi=C/T$. Ferro: Curie–Weiss $C/(T-T_C)$ above $T_C$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "$B=\\mu_0(H+M)$. In vacuum $M=0$, so $B=$",
      correct: "$\\mu_0 H$",
      wrong: ["$H$", "$M$", "$\\mu_0 M$"],
      why: "H is ampere-turns per metre. $B$ is the field that appears in $F=qvB$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Earth’s magnetic field: dip angle is $90^\\circ$ at the",
      correct: "magnetic poles",
      wrong: ["magnetic equator", "geographic poles always", "everywhere"],
      why: "At magnetic equator dip is $0$. $B_H=B\\cos\\delta$, $B_V=B\\sin\\delta$.",
    });
  }
  return mcq({
    chapterId: "phy-mag-matter",
    i,
    subject: "physics",
    stem: "Hysteresis loop area is a measure of",
    correct: "energy dissipated per cycle per unit volume",
    wrong: ["remanence only", "coercivity only", "μr"],
    why: "Transformer cores want a thin loop (soft iron). Permanent magnets want a fat loop.",
  });
}

function emi(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "Faraday: induced emf is",
      correct: "$-d\\Phi_B/dt$",
      wrong: ["$-\\Phi_B$", "$B\\ell v$ only, never $d\\Phi/dt$", "$IR$"],
      why: "Lenz supplies the minus. Motional $B\\ell v$ is a special case of $d\\Phi/dt$.",
    });
  }
  if (m === 1) {
    const B = cycle([0.2, 0.5, 1], i);
    const ell = cycle([0.2, 0.5, 1], i + 1);
    const v = cycle([2, 4, 5, 10], i + 2);
    const emf = B * ell * v;
    return num({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: `Rod $\\ell=${ell}$ m, $B=${B}$ T, $v=${v}$ m/s perpendicular. Motional emf (V) is`,
      answer: emf,
      why: "$\\mathcal{E}=B\\ell v$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "Self inductance $L$ is defined by",
      correct: "$\\mathcal{E}=-L\\,dI/dt$ and $\\Phi=LI$",
      wrong: ["$\\mathcal{E}=L I$", "$\\Phi=L dI/dt$", "$U=LI$"],
      why: "Energy $\\frac12 LI^2$. Solenoid $L=\\mu_0 n^2 A\\ell$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "Lenz’s law is a statement of conservation of",
      correct: "energy (and charge, via the induced current’s field)",
      wrong: ["momentum only", "mass", "entropy only"],
      why: "If the induced current aided the change, you’d get free energy.",
    });
  }
  return mcq({
    chapterId: "phy-emi",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A superconducting ring in a changing $B$ will",
    correct: "keep $\\Phi$ through it constant (induced current cancels $d\\Phi$)",
    wrong: ["have zero current always", "have $E=0$ inside the bulk and therefore $d\\Phi=0$ is optional", "dissipate as $I^2R$"],
    why: "$R=0$ so any $d\\Phi$ would give infinite current; the current adjusts to freeze flux.",
  });
}

function ac(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const f = cycle([50, 50, 60], i);
    const L = cycle([0.1, 0.2, 0.5], i);
    const XL = 2 * Math.PI * f * L;
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: `Inductive reactance of $L=${L}$ H at $f=${f}$ Hz is`,
      correct: `${2 * Math.PI * f * L} $\\Omega$`,
      wrong: [`${f * L} $\\Omega$`, `${L / f} $\\Omega$`, `${2 * Math.PI * f / L} $\\Omega$`],
      why: `$X_L=\\omega L=2\\pi f L\\approx${nint(XL)}\\,\\Omega$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Capacitive reactance $X_C$ is",
      correct: "$1/(\\omega C)$",
      wrong: ["$\\omega C$", "$C/\\omega$", "$\\omega/C$"],
      why: "Falls with frequency. DC capacitor is open ($X_C\\to\\infty$).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Series LCR impedance is",
      correct: "$\\sqrt{R^2+(X_L-X_C)^2}$",
      wrong: ["$R+X_L+X_C$", "$R+X_L-X_C$", "$\\sqrt{R^2+X_L^2+X_C^2}$"],
      why: "Reactances oppose. Resonance $X_L=X_C$, $Z=R$, $f_0=1/(2\\pi\\sqrt{LC})$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Average power in AC is",
      correct: "$V_{\\mathrm{rms}} I_{\\mathrm{rms}}\\cos\\phi$",
      wrong: ["$V_0 I_0$", "$V_{\\mathrm{rms}} I_{\\mathrm{rms}}$ always", "0 always"],
      why: "$\\cos\\phi=R/Z$ is the power factor. Pure L or C: $P_{\\mathrm{av}}=0$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "$V_{\\mathrm{rms}}$ in terms of peak $V_0$ (sinusoid) is",
      correct: "$V_0/\\sqrt{2}$",
      wrong: ["$V_0/2$", "$V_0\\sqrt{2}$", "$V_0$"],
      why: "Mains 220 V is rms. Peak $\\approx 311$ V.",
    });
  }
  return mcq({
    chapterId: "phy-ac",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Transformer equation (ideal) includes",
    correct: "$V_s/V_p=N_s/N_p=I_p/I_s$",
    wrong: ["$V_s/V_p=N_p/N_s$", "$I_s=I_p$", "$P$ is not conserved"],
    why: "Power in = power out. Step-up increases $V$, decreases $I$.",
  });
}

function emw(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Speed of EM waves in vacuum is",
      correct: "$1/\\sqrt{\\mu_0\\varepsilon_0}$",
      wrong: ["$\\sqrt{\\mu_0\\varepsilon_0}$", "$\\mu_0/\\varepsilon_0$", "$E/B$ only in media"],
      why: "Also $c=E/B$ for a plane wave in vacuum.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "In a plane EM wave, $\\vec E$, $\\vec B$, and $\\vec k$ are",
      correct: "mutually perpendicular, with $\\vec E\\times\\vec B$ along $\\vec k$",
      wrong: ["$\\vec E\\parallel\\vec B$", "longitudinal", "$\\vec B$ along $\\vec k$"],
      why: "Transverse waves. Poynting $\\vec S=\\vec E\\times\\vec B/\\mu_0$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Which has the shortest wavelength?",
      correct: "γ-rays",
      wrong: ["radio", "microwaves", "visible"],
      why: "Radio → micro → IR → vis → UV → X → γ. Energy $hc/\\lambda$ climbs.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Displacement current in a charging capacitor is",
      correct: "$\\varepsilon_0 d\\Phi_E/dt$",
      wrong: ["$\\sigma A$", "$\\varepsilon_0 E$", "zero always between plates"],
      why: "Maxwell’s fix of Ampère. Continuity of $I$ through the capacitor.",
    });
  }
  return mcq({
    chapterId: "phy-emw",
    i,
    subject: "physics",
    stem: "Intensity of a plane EM wave in vacuum is",
    correct: "$\\frac12 c\\varepsilon_0 E_0^2 = E_0 B_0/(2\\mu_0)$",
    wrong: ["$E_0/c$", "$c B_0$", "$\\varepsilon_0 E_0$"],
    why: "Time-averaged Poynting. Peak vs rms: watch the 1/2.",
  });
}

function ray(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Snell: $n_1\\sin i=$",
      correct: "$n_2\\sin r$",
      wrong: ["$n_2\\sin i$", "$n_1\\sin r$", "$\\sin i/\\sin r=n_1/n_2$"],
      why: "$n\\sin\\theta$ is conserved. $n=c/v=\\lambda_{\\mathrm{vac}}/\\lambda$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Critical angle $i_c$ for $n_1>n_2$ is",
      correct: "$\\sin i_c=n_2/n_1$",
      wrong: ["$\\sin i_c=n_1/n_2$", "$i_c=n_1/n_2$", "$\\tan i_c=n_2/n_1$"],
      why: "TIR when $i>i_c$ going denser → rarer.",
    });
  }
  if (m === 2) {
    const u = cycle([-20, -30, -15], i);
    const f = cycle([10, 15, 20], i);
    const v = 1 / (1 / f + 1 / u); // wait: 1/v - 1/u = 1/f ⇒ 1/v = 1/f + 1/u
    const V = 1 / (1 / f + 1 / u);
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: `Thin lens, $u=${u}$ cm, $f=+${f}$ cm (New Cartesian). $v$ is`,
      correct: `${V} cm`,
      wrong: [`${f} cm`, `${u} cm`, `${-V} cm`],
      why: `$1/v=1/f+1/u=1/${f}+1/(${u})$. $v=${V}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Mirror formula $1/v+1/u=$",
      correct: "$1/f$ with $f=R/2$",
      wrong: ["$1/R$", "$2/R$ as $1/v-1/u$", "$f=R$"],
      why: "Sign convention is the whole exam. Concave $f<0$ in New Cartesian for mirrors.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Lens maker (air): $1/f=(n-1)$ times",
      correct: "$(1/R_1-1/R_2)$",
      wrong: ["$(1/R_1+1/R_2)$ always", "$R_1 R_2$", "$(R_2-R_1)$"],
      why: "Signs: for a double-convex lens, $R_1>0$, $R_2<0$ in the usual convention, so both terms add.",
    });
  }
  return mcq({
    chapterId: "phy-ray",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "For a combination of two thin lenses in contact",
    correct: "$1/F=1/f_1+1/f_2$",
    wrong: ["$F=f_1+f_2$", "$F=f_1 f_2$", "$1/F=1/f_1-1/f_2$ always"],
    why: "Separated by $d$: $1/F=1/f_1+1/f_2-d/(f_1 f_2)$.",
  });
}

function waveOpt(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Young’s fringe width $\\beta$ is",
      correct: "$\\lambda D/d$",
      wrong: ["$\\lambda d/D$", "$D d/\\lambda$", "$\\lambda D d$"],
      why: "Linear in $\\lambda$ and $D$, inverse in slit separation $d$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "A single-slit central maximum has angular half-width about",
      correct: "$\\lambda/a$",
      wrong: ["$a/\\lambda$", "$\\lambda a$", "$1.22\\lambda/a$ (that’s circular aperture)"],
      why: "First min $a\\sin\\theta=\\lambda$. Circular aperture: $1.22\\lambda/D$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Malus’s law: intensity through a polariser is",
      correct: "$I_0\\cos^2\\theta$",
      wrong: ["$I_0\\cos\\theta$", "$I_0\\sin^2\\theta$ only", "$I_0/2$ always"],
      why: "Unpolarised through one polariser: $I_0/2$. Then Malus on the second.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Brewster’s law: $\\tan i_p=$",
      correct: "$n$",
      wrong: ["$1/n$", "$\\sin n$", "$n^2$"],
      why: "Reflected light is fully polarised. $i_p+r=90^\\circ$.",
    });
  }
  return mcq({
    chapterId: "phy-wave-opt",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "In YDSE, a thin sheet of thickness $t$, refractive index $n$, in front of one slit shifts fringes by",
    correct: "$(n-1)t D/d$ (or $(n-1)t/\\lambda$ fringes)",
    wrong: ["$nt D/d$", "$(n+1)t$", "zero because intensity is unchanged"],
    why: "Optical path $(n-1)t$. Direction: toward the slit with the sheet.",
  });
}

function dual(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Einstein photoelectric equation is",
      correct: "$h\\nu=\\phi+K_{\\max}$",
      wrong: ["$h\\nu=\\phi-K_{\\max}$", "$K_{\\max}=h\\nu+\\phi$", "$\\phi=h\\nu K_{\\max}$"],
      why: "Stopping potential: $eV_0=K_{\\max}=h(\\nu-\\nu_0)$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "de Broglie wavelength is",
      correct: "$h/p$",
      wrong: ["$h/E$", "$p/h$", "$h\\nu$"],
      why: "For an electron accelerated by $V$, $\\lambda=h/\\sqrt{2meV}=12.27/\\sqrt{V}$ Å.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "If intensity of light increases at fixed $\\nu>\\nu_0$, photoelectric",
      correct: "current saturates higher; $K_{\\max}$ unchanged",
      wrong: ["$K_{\\max}$ increases", "threshold falls", "no electrons if intensity was low"],
      why: "Intensity = number of photons. Energy per photon is $h\\nu$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Photon momentum is",
      correct: "$h/\\lambda=E/c$",
      wrong: ["$h\\lambda$", "$E c$", "$mc^2$ with $m$ the rest mass (photon rest mass is 0)"],
      why: "Radiation pressure $I/c$ (absorbing) or $2I/c$ (reflecting).",
    });
  }
  return mcq({
    chapterId: "phy-dual",
    i,
      subject: "physics",
    exam: "advanced",
    stem: "Davisson–Germer demonstrated",
    correct: "electron diffraction (wave nature of electrons)",
    wrong: ["photoelectric effect", "Compton effect", "pair production"],
    why: "Ni crystal, 54 eV electrons, Bragg peak at $50^\\circ$.",
  });
}

function atoms(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Bohr radius of hydrogen $n$-th orbit is",
      correct: "$n^2 a_0$",
      wrong: ["$n a_0$", "$a_0/n$", "$a_0/n^2$"],
      why: "$r_n=n^2 a_0 / Z$. $a_0=0.529$ Å.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Energy of H-atom level $n$ is",
      correct: "$-13.6/n^2$ eV",
      wrong: ["$-13.6 n^2$ eV", "$-13.6/n$ eV", "$+13.6/n^2$ eV"],
      why: "$E_n=-13.6 Z^2/n^2$ eV. Ionisation from ground is 13.6 eV.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Lyman series involves jumps to",
      correct: "$n=1$",
      wrong: ["$n=2$ (Balmer)", "$n=3$ (Paschen)", "$n=\\infty$"],
      why: "Lyman UV, Balmer visible, Paschen IR.",
    });
  }
  if (m === 3) {
    const n1 = 1;
    const n2 = cycle([2, 3, 4], i);
    const E = 13.6 * (1 - 1 / (n2 * n2));
    return num({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: `Photon energy (eV) for H-atom $n=${n2}\\to n=${n1}$ (positive), 1 decimal if needed, is`,
      answer: nint(E * 10) / 10,
      tolerance: 0.1,
      why: `$E=13.6(1/1-1/${n2}^2)=${E}\\,\\mathrm{eV}$.`,
    });
  }
  return mcq({
    chapterId: "phy-atoms",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Bohr’s quantisation is equivalent to the de Broglie standing-wave condition",
    correct: "$2\\pi r=n\\lambda$",
    wrong: ["$r=n\\lambda$", "$2\\pi r=\\lambda$", "$n r=\\lambda$"],
    why: "$mvr=nh/2\\pi$ and $\\lambda=h/p$ give $2\\pi r=n\\lambda$.",
  });
}

function nuclei(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Radioactive decay law",
      correct: "$N=N_0 e^{-\\lambda t}$",
      wrong: ["$N=N_0 e^{\\lambda t}$", "$N=N_0\\lambda t$", "$N=N_0/\\lambda$"],
      why: "$T_{1/2}=\\ln 2/\\lambda$. Activity $A=\\lambda N$.",
    });
  }
  if (m === 1) {
    const n = cycle([1, 2, 3, 4], i);
    const left = 100 / 2 ** n;
    return num({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: `A sample after ${n} half-lives. Percentage remaining is`,
      answer: left,
      why: "$(1/2)^n\\times 100\\%=${left}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "1 amu mass defect corresponds to",
      correct: "931 MeV",
      wrong: ["13.6 eV", "1 MeV", "931 keV"],
      why: "$E=mc^2$. Binding energy per nucleon peaks near $^{56}$Fe.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "α, β, γ penetrating power (least to most) is",
      correct: "α < β < γ",
      wrong: ["γ < β < α", "β < α < γ", "α < γ < β"],
      why: "α is helium nucleus, stopped by paper. γ is photon.",
    });
  }
  return mcq({
    chapterId: "phy-nuclei",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "In a nuclear reaction, conserved quantities include",
      correct: "charge, baryon number (mass number, ignoring neutrinos’ details), energy-momentum",
    wrong: ["only mass", "only charge", "element name"],
    why: "Q-value $=\\Delta m c^2$. Neutrinos carry energy in β decay (continuous spectrum).",
  });
}

function semi(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "n-type doping of Si uses",
      correct: "pentavalent impurities (P, As, Sb)",
      wrong: ["trivalent (B, Al, Ga, In)", "noble gases", "tetravalent Sn only"],
      why: "Extra electron → donor level. p-type: holes from acceptors.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "In forward bias of a p–n diode, the barrier",
      correct: "decreases and current rises exponentially",
      wrong: ["increases", "is unchanged", "reverses the p and n sides"],
      why: "$I=I_0(e^{eV/kT}-1)$. Reverse: tiny $I_0$ until breakdown.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "A Zener diode is used as a",
      correct: "voltage regulator (reverse breakdown)",
      wrong: ["amplifier", "oscillator only", "forward-bias rectifier only"],
      why: "Sharp reverse breakdown at $V_Z$. Series resistor is mandatory.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "For an intrinsic semiconductor, $n_i^2=$",
      correct: "$n_e n_h$",
      wrong: ["$n_e+n_h$", "$n_e/n_h$", "$n_e-n_h$"],
      why: "Mass-action. Doped: $n_e n_h=n_i^2$ still holds in equilibrium.",
    });
  }
  return mcq({
    chapterId: "phy-semiconductors",
    i,
    subject: "physics",
    stem: "LED emits when",
    correct: "forward-biased; recombination of e and hole releases $h\\nu\\approx E_g$",
    wrong: ["reverse-biased only", "unbiased", "the gap is metal-like"],
    why: "Photodiode is reverse-biased. Solar cell is unbiased, illuminated.",
  });
}

function experimental(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Screw gauge: pitch 1 mm, 100 divisions. Least count is",
      correct: "0.01 mm",
      wrong: ["0.1 mm", "0.001 mm", "1 mm"],
      why: "LC = pitch / n = 1/100 mm = 0.01 mm = 10 μm.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "A metre bridge measures",
      correct: "unknown resistance (Wheatstone)",
      wrong: ["current only", "e.m.f. of a cell without a pair", "magnetic field"],
      why: "Unknown $X=R\\,\\ell/(100-\\ell)$ with the wire 100 cm.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Potentiometer can measure emf of a cell because",
      correct: "it draws (ideally) zero current at null",
      wrong: ["it has a very large current", "it is a moving-coil meter", "Ohm’s law fails"],
      why: "A voltmeter loads the cell. Potentiometer is a comparison method.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "In a sonometer, $f\\propto$",
      correct: "$\\sqrt{T}/(\\ell\\sqrt{\\mu})$",
      wrong: ["$\\ell$", "$1/\\sqrt{T}$", "$\\mu$"],
      why: "Verify $f=\\frac{1}{2\\ell}\\sqrt{T/\\mu}$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Ohm’s-law experiment: the graph of $V$ vs $I$ for an ohmic resistor is",
      correct: "a straight line through origin, slope $R$",
      wrong: ["a parabola", "a circle", "a vertical line"],
      why: "Plot $V$ on $y$, $I$ on $x$: slope $=R$. Non-ohmic: curve.",
    });
  }
  return mcq({
    chapterId: "phy-experimental",
    i,
      subject: "physics",
    exam: "advanced",
    stem: "Vernier LC = 0.1 mm. Observed reading 3.60 mm, zero error $+0.03$ mm. True reading is",
    correct: "3.57 mm",
    wrong: ["3.63 mm", "3.60 mm", "3.03 mm"],
    why: "True = observed − zero error = 3.60 − 0.03 = 3.57 mm. Positive zero error means the vernier zero is ahead of the main-scale zero.",
  });
}
