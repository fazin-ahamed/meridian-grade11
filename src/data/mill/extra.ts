import { MORE_TABLE } from "./extra-more";
import type { PlayItem } from "../types";
import { cycle, mcq, nint, num } from "./build";

/** Extra computed templates so the mill is not eight shapes on repeat. */
export function extraItem(id: string, i: number): PlayItem | null {
  const fn = TABLE[id];
  return fn ? fn(i) : null;
}

const TABLE: Record<string, (n: number) => PlayItem> = {
  "phy-units": units,
  "phy-motion-1d": mot1,
  "phy-motion-2d": mot2,
  "phy-nlm": nlm,
  "phy-wep": wep,
  "phy-rotation": rot,
  "phy-gravitation": grav,
  "phy-fluids": fluids,
  "phy-thermo": thermo,
  "phy-oscillations": osc,
  "phy-waves": waves,
  "phy-charges": charges,
  "phy-potential": cap,
  "phy-current": current,
  "phy-emi": emi,
  "phy-ac": ac,
  "phy-ray": ray,
  "phy-wave-opt": yds,
  "phy-dual": dual,
  "phy-atoms": atoms,
  "phy-nuclei": nuclei,
  "chem-basic": basic,
  "chem-atom": atom,
  "chem-bonding": bonding,
  "chem-thermo": cthermo,
  "chem-eq": eq,
  "chem-goc": goc,
  "chem-solutions": sol,
  "chem-electro": electro,
  "chem-kinetics": kin,
  "chem-coord": coord,
  "chem-carbonyl": carb,
  "math-trig": trig,
  "math-complex": cplx,
  "math-pnc": pnc,
  "math-seq": seq,
  "math-conic": conic,
  "math-limits": lim,
  "math-matrices": mat,
  "math-cont": cont,
  "math-aod": aod,
  "math-int": integ,
  "math-prob-12": prob,
  "math-dets": dets,
  "math-binom": binom,
  "math-straight": line,
  ...MORE_TABLE,
};

function units(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const a = cycle([2, 3, 4, 5], i);
    const da = cycle([1, 2, 3], i);
    const b = cycle([3, 4, 2], i);
    const db = cycle([2, 1, 4], i);
    const pct = a * da + b * db;
    return num({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `If $x=A^{${a}} B^{${b}}$ and $\\Delta A/A=${da}\\%$, $\\Delta B/B=${db}\\%$, the percentage error in $x$ is`,
      answer: pct,
      why: `$\\Delta x/x=|${a}|\\Delta A/A+|${b}|\\Delta B/B=${a}\\times${da}+${b}\\times${db}=${pct}\\%$.`,
      tags: ["errors"],
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Which pair is dimensionally identical?",
      correct: cycle(
        ["impulse and momentum", "Planck’s $h$ and angular momentum", "stress and pressure", "work and torque"],
        i,
      ),
      wrong: ["force and energy", "power and pressure", "frequency and velocity"],
      why: "Match MLT powers, not the names.",
      tags: ["dimensions"],
    });
  }
  if (m === 2) {
    const n = cycle([10, 20, 50], i);
    const msd = 1;
    const lc = msd / n;
    return num({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `A screw gauge has pitch $1\\,\\mathrm{mm}$ and ${n} circular divisions. Least count in mm is`,
      answer: lc,
      tolerance: 0.001,
      why: `LC = pitch/$n$ = $1/${n}=${lc}$ mm.`,
      tags: ["lab"],
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Argument of $\\sin$, $\\exp$, $\\ln$ in a physical formula must be",
      correct: "dimensionless",
      wrong: ["a length", "a time", "an angle in degrees only"],
      why: "Taylor series of those functions require a pure number.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "SI base unit of electric current is the",
      correct: "ampere",
      wrong: ["coulomb", "volt", "ohm"],
      why: "Current is base; charge is derived (C = A s).",
    });
  }
  return mcq({
    chapterId: "phy-units",
    i,
    subject: "physics",
    stem: "$[G]$ is",
    correct: "$\\mathrm{M^{-1}L^{3}T^{-2}}$",
    wrong: ["$\\mathrm{MLT^{-2}}$", "$\\mathrm{M^{-1}L^{2}T^{-2}}$", "$\\mathrm{ML^{2}T^{-1}}$"],
    why: "From $F=Gm_1m_2/r^2$.",
  });
}

function mot1(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const u = cycle([10, 12, 15, 20], i);
    const a = cycle([2, 4, 5], i);
    const t = cycle([2, 3, 4], i);
    const s = u * t + 0.5 * a * t * t;
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `A particle starts at $u=${u}\\,\\mathrm{m/s}$, $a=${a}\\,\\mathrm{m/s^2}$ constant. Displacement in ${t} s (metres) is`,
      answer: s,
      why: `$s=ut+\\frac12 at^2=${u}\\cdot${t}+\\frac12\\cdot${a}\\cdot${t}^2=${s}$.`,
    });
  }
  if (m === 1) {
    const u = cycle([20, 25, 30], i);
    const t = cycle([2, 4, 5], i);
    const v = u; // uniform
    const s = v * t;
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `Uniform speed ${u} m/s for ${t} s. Distance in metres?`,
      answer: s,
      why: "No acceleration: $s=vt$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "Slope of an $x$–$t$ graph is",
      correct: "instantaneous velocity",
      wrong: ["acceleration", "jerk", "displacement"],
      why: "$v=dx/dt$. Slope of $v$–$t$ is $a$.",
    });
  }
  if (m === 3) {
    const u = cycle([10, 14, 20], i);
    const v = 0;
    const a = -cycle([2, 5, 10], i);
    const s = (v * v - u * u) / (2 * a);
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `A body with $u=${u}$ m/s decelerates at ${-a} m/s² to rest. Distance (m) is`,
      answer: s,
      why: `$v^2=u^2+2as\\Rightarrow 0=${u}^2+2(${a})s\\Rightarrow s=${s}$.`,
    });
  }
  return mcq({
    chapterId: "phy-motion-1d",
    i,
    subject: "physics",
    stem: "If velocity and acceleration have opposite signs, the particle is",
    correct: "slowing down",
    wrong: ["speeding up", "at rest", "in uniform motion"],
    why: "Speed falls when $a$ is against $v$.",
  });
}

function mot2(i: number): PlayItem {
  const m = i % 5;
  const g = 10;
  if (m === 0) {
    const u = cycle([10, 20, 30, 40], i);
    const th = cycle([30, 45, 60], i);
    const rad = (th * Math.PI) / 180;
    const R = nint((u * u * Math.sin(2 * rad)) / g);
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Level ground, $u=${u}$ m/s, $\\theta=${th}^\\circ$, $g=10$. Range in metres (nearest integer) is`,
      answer: R,
      why: `$R=u^2\\sin 2\\theta/g$.`,
      tolerance: 1,
    });
  }
  if (m === 1) {
    const u = cycle([20, 30, 40], i);
    const H = (u * u) / (2 * g);
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Vertical throw $u=${u}$ m/s, $g=10$. Max height (m) is`,
      answer: H,
      why: `$H=u^2/2g=${u}^2/20=${H}$.`,
    });
  }
  if (m === 2) {
    const v = cycle([4, 5, 6, 10], i);
    const r = cycle([2, 4, 5], i);
    const a = (v * v) / r;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `UCM: $v=${v}$ m/s, $r=${r}$ m. Centripetal acceleration (m/s²) is`,
      answer: a,
      why: `$a=v^2/r=${v * v}/${r}=${a}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "Complementary projection angles on level ground share",
      correct: "the same range",
      wrong: ["the same max height", "the same time of flight", "the same trajectory"],
      why: "$\\sin 2\\theta=\\sin 2(90^\\circ-\\theta)$. Height and $T$ differ.",
    });
  }
  return mcq({
    chapterId: "phy-motion-2d",
    i,
    subject: "physics",
    stem: "At the top of a projectile (no air), acceleration is",
    correct: "$g$ downward",
    wrong: ["zero", "along the velocity", "horizontal"],
    why: "Velocity is horizontal; $a$ is still $g$.",
  });
}

function nlm(i: number): PlayItem {
  const m = i % 6;
  const g = 10;
  if (m === 0) {
    const m1 = cycle([3, 4, 5], i);
    const m2 = cycle([1, 2, 3], i);
    if (m1 === m2) return nlm(i + 1);
    const a = nint(((m1 - m2) * g * 10) / (m1 + m2)) / 10;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Atwood: $m_1=${m1}$ kg, $m_2=${m2}$ kg, $g=10$, light frictionless pulley. $|a|$ in m/s² (one decimal ok) is`,
      answer: Math.abs((m1 - m2) * g) / (m1 + m2),
      tolerance: 0.05,
      why: `$a=(m_1-m_2)g/(m_1+m_2)$. Got ${a}.`,
    });
  }
  if (m === 1) {
    const mass = cycle([2, 4, 5], i);
    const mu = cycle([0.2, 0.4, 0.5], i);
    const f = mu * mass * g;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `A ${mass} kg block, $\\mu=${mu}$, $g=10$. Max static friction on a horizontal floor (N) is`,
      answer: f,
      why: "$f_s^{\\max}=\\mu N=\\mu mg$.",
    });
  }
  if (m === 2) {
    const mass = cycle([1, 2, 3], i);
    const a = cycle([2, 3, 4], i);
    const F = mass * a;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Net force (N) on ${mass} kg accelerating at ${a} m/s² is`,
      answer: F,
      why: "$F=ma$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Pseudo force on mass $m$ in a frame accelerating at $\\vec a$ is",
      correct: "$-m\\vec a$",
      wrong: ["$m\\vec a$ (same sense)", "zero", "$\\mu m a$"],
      why: "Opposite to the frame’s acceleration.",
    });
  }
  if (m === 4) {
    const th = cycle([30, 45], i);
    const tan = th === 30 ? 1 / Math.sqrt(3) : 1;
    const r = cycle([10, 20, 40], i);
    const v2 = 10 * r * tan;
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Banking without friction, $\\theta=${th}^\\circ$, $r=${r}$ m, $g=10$. $v^2$ (m²/s²) is`,
      answer: nint(v2),
      tolerance: 1,
      why: "$v^2=rg\\tan\\theta$.",
    });
  }
  return mcq({
    chapterId: "phy-nlm",
    i,
    subject: "physics",
    stem: "A free-body diagram of a body includes",
    correct: "only forces on that body",
    wrong: ["forces it exerts on others", "its acceleration as a force", "only gravity"],
    why: "Newton 3 pairs live on different FBDs.",
  });
}

function wep(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const F = cycle([10, 20, 50], i);
    const s = cycle([2, 4, 5], i);
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Constant force ${F} N along displacement ${s} m. Work (J) is`,
      answer: F * s,
      why: "$W=\\vec F\\cdot\\vec s$.",
    });
  }
  if (m === 1) {
    const k = cycle([100, 200, 400], i);
    const x = cycle([0.1, 0.2, 0.05], i);
    const U = 0.5 * k * x * x;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Spring $k=${k}$ N/m compressed by ${x} m. Elastic PE (J) is`,
      answer: U,
      tolerance: 0.01,
      why: "$U=\\frac12 kx^2$.",
    });
  }
  if (m === 2) {
    const m0 = cycle([2, 4, 5], i);
    const v = cycle([3, 4, 10], i);
    const K = 0.5 * m0 * v * v;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Mass ${m0} kg at ${v} m/s. Kinetic energy (J) is`,
      answer: K,
      why: "$K=\\frac12 mv^2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "Work–energy theorem: net work equals",
      correct: "$\\Delta K$",
      wrong: ["$\\Delta U$ always", "$\\Delta E_{\\mathrm{mech}}$ always", "power"],
      why: "Holds with non-conservative work too; then mechanical energy is not conserved.",
    });
  }
  return mcq({
    chapterId: "phy-wep",
    i,
    subject: "physics",
    stem: "Power of a constant force is",
    correct: "$\\vec F\\cdot\\vec v$",
    wrong: ["$F\\cdot a$", "$F/v$", "$Fv^2$"],
    why: "$P=dW/dt=F v\\cos\\theta$.",
  });
}

function rot(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const I = cycle([2, 4, 5], i);
    const w = cycle([3, 4, 6], i);
    const L = I * w;
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `$I=${I}\\,\\mathrm{kg\\,m^2}$, $\\omega=${w}$ rad/s about a principal axis. $L$ (SI) is`,
      answer: L,
      why: "$L=I\\omega$.",
    });
  }
  if (m === 1) {
    const M = cycle([2, 4, 6], i);
    const R = cycle([1, 2], i);
    const Icm = (M * R * R) / 2;
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `Solid disc $M=${M}$ kg, $R=${R}$ m. $I_{\\mathrm{cm}}$ about the axis (kg m²) is`,
      answer: Icm,
      why: "Disc about central axis: $\\frac12 MR^2$.",
    });
  }
  if (m === 2) {
    const Icm = cycle([2, 3, 4], i);
    const M = cycle([2, 4], i);
    const d = cycle([1, 2], i);
    const I = Icm + M * d * d;
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `Parallel-axis: $I_{\\mathrm{cm}}=${Icm}$, $M=${M}$ kg, $d=${d}$ m. $I$ is`,
      answer: I,
      why: "$I=I_{\\mathrm{cm}}+Md^2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Rolling without slip means",
      correct: "$v=\\omega R$",
      wrong: ["$v=\\omega/R$", "pure sliding", "$a=0$"],
      why: "Contact point instantaneously at rest.",
    });
  }
  return mcq({
    chapterId: "phy-rotation",
    i,
    subject: "physics",
    stem: "$\\vec\\tau=$",
    correct: "$\\vec r\\times\\vec F$",
    wrong: ["$\\vec r\\cdot\\vec F$", "$I\\vec v$", "$mvr$ always as a scalar product"],
    why: "Right-hand rule; analogue of force.",
  });
}

function grav(i: number): PlayItem {
  const m = i % 5;
  const g = 10;
  if (m === 0) {
    const R = cycle([6400, 6400, 6000], i);
    const h = cycle([R / 2, R, 2 * R], i);
    // g' = g (R/(R+h))^2
    const gp = g * (R / (R + h)) ** 2;
    return num({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: `If $g=10$ at the surface, $R=${R}$ km, at height $h=${h}$ km, $g'$ (m/s², one decimal) is`,
      answer: nint(gp * 10) / 10,
      tolerance: 0.15,
      why: "$g'=g(R/(R+h))^2$.",
    });
  }
  if (m === 1) {
    const g0 = 10;
    const R = 6.4e6;
    const vesc = Math.sqrt(2 * g0 * R);
    return num({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Escape speed from Earth using $g=10$, $R=6.4\\times10^6$ m, in km/s (nearest integer) is",
      answer: nint(vesc / 1000),
      tolerance: 1,
      why: "$v_e=\\sqrt{2gR}\\approx 11$ km/s.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Kepler’s third law: $T^2\\propto$",
      correct: "$a^3$",
      wrong: ["$a^2$", "$a$", "$1/a^3$"],
      why: "For a given central mass.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Weightlessness in orbit is because the satellite is",
      correct: "in free fall",
      wrong: ["outside gravity", "massless", "at $g=0$"],
      why: "Gravity supplies the centripetal acceleration.",
    });
  }
  const r = cycle([2, 4, 8], i);
  // v = sqrt(GM/r); leave as comparison
  return mcq({
    chapterId: "phy-gravitation",
    i,
    subject: "physics",
    stem: `Orbital speed $\\propto$ $r^{n}$. For circular orbits $n=$ (the exponent on $r$ in $v\\propto r^{n}$)`,
    correct: "$-1/2$",
    wrong: ["$-2$", "$1/2$", "$1$"],
    why: `$v=\\sqrt{GM/r}$ so $n=-1/2$. (This item ignores the dummy $r=${r}$.)`,
  });
}

function fluids(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const h = cycle([2, 5, 10], i);
    const p = 1000 * 10 * h;
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Gauge pressure (Pa) at depth ${h} m in water, $g=10$, $\\rho=10^3$ is`,
      answer: p,
      why: "$P=\\rho g h$.",
    });
  }
  if (m === 1) {
    const A1 = cycle([4, 8, 10], i);
    const v1 = cycle([2, 3, 4], i);
    const A2 = cycle([1, 2], i);
    const v2 = (A1 * v1) / A2;
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Continuity: $A_1=${A1}$, $v_1=${v1}$, $A_2=${A2}$ (SI). $v_2$ is`,
      answer: v2,
      why: "$A_1 v_1=A_2 v_2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Bernoulli along a streamline (ideal, incompressible, steady) conserves",
      correct: "$P+\\rho g h+\\frac12\\rho v^2$",
      wrong: ["only $P$", "only $v$", "$P/\\rho + v$"],
      why: "Energy per volume.",
    });
  }
  if (m === 3) {
    const r = cycle([2, 3, 4], i);
    const eta = cycle([0.1, 0.2], i);
    const v = cycle([0.1, 0.2], i);
    const F = 6 * Math.PI * eta * r * v;
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Stokes: $\\eta=${eta}$, $r=${r}$, $v=${v}$ (SI). Viscous force (N), use $\\pi=3.14$, nearest 0.1 is`,
      answer: nint(F * 10) / 10,
      tolerance: 0.3,
      why: "$F=6\\pi\\eta r v$.",
    });
  }
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

function thermo(i: number): PlayItem {
  const m = i % 5;
  const R = 8.3;
  if (m === 0) {
    const T = cycle([300, 400, 600], i);
    const W = nint(R * T * Math.log(2));
    return num({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: `1 mol ideal gas, isothermal expansion $V\\to 2V$ at $T=${T}$ K, $R=8.3$. $W$ by the gas (J, nearest integer) is`,
      answer: W,
      tolerance: 5,
      why: "$W=nRT\\ln 2$.",
    });
  }
  if (m === 1) {
    const Th = cycle([400, 500, 600], i);
    const Tc = cycle([300, 300, 200], i);
    const eta = nint((1 - Tc / Th) * 100);
    return num({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: `Carnot between ${Th} K and ${Tc} K. Efficiency in % (integer) is`,
      answer: eta,
      why: "$\\eta=1-T_C/T_H$. Kelvin only.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Mayer’s relation (molar, ideal) is",
      correct: "$C_P-C_V=R$",
      wrong: ["$C_P+C_V=R$", "$C_P/C_V=R$", "$C_V-C_P=R$"],
      why: "Enthalpy vs internal energy for one mole.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Free expansion of an ideal gas into vacuum: $\\Delta T$ is",
      correct: "zero",
      wrong: ["positive", "negative", "undefined"],
      why: "$Q=W=0\\Rightarrow\\Delta U=0\\Rightarrow\\Delta T=0$.",
    });
  }
  return mcq({
    chapterId: "phy-thermo",
    i,
    subject: "physics",
    stem: "Monatomic ideal $\\gamma$ is",
    correct: "$5/3$",
    wrong: ["$7/5$", "$4/3$", "$1$"],
    why: "$f=3$, $\\gamma=1+2/f$.",
  });
}

function osc(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const mass = cycle([0.25, 0.4, 1], i);
    const k = cycle([100, 400, 25], i);
    const T = 2 * Math.PI * Math.sqrt(mass / k);
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Mass-spring: $m=${mass}$ kg, $k=${k}$ N/m. $T$ in seconds (two decimals) is`,
      answer: nint(T * 100) / 100,
      tolerance: 0.05,
      why: "$T=2\\pi\\sqrt{m/k}$.",
    });
  }
  if (m === 1) {
    const L = cycle([1, 4, 0.25], i);
    const T = 2 * Math.PI * Math.sqrt(L / 10);
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Simple pendulum $L=${L}$ m, $g=10$. $T$ (s, two decimals) is`,
      answer: nint(T * 100) / 100,
      tolerance: 0.08,
      why: "$T=2\\pi\\sqrt{L/g}$.",
    });
  }
  if (m === 2) {
    const k = cycle([50, 100, 200], i);
    const A = cycle([0.1, 0.2], i);
    const E = 0.5 * k * A * A;
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `SHM energy: $k=${k}$ N/m, $A=${A}$ m. Total $E$ (J) is`,
      answer: E,
      tolerance: 0.01,
      why: "$E=\\frac12 k A^2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "In a lift accelerating upward with $a$, pendulum $T$",
      correct: "decreases ($g_{\\mathrm{eff}}=g+a$)",
      wrong: ["increases", "unchanged", "becomes infinite"],
      why: "$T=2\\pi\\sqrt{L/g_{\\mathrm{eff}}}$.",
    });
  }
  return mcq({
    chapterId: "phy-oscillations",
    i,
    subject: "physics",
    stem: "Acceleration in SHM is proportional to",
    correct: "$-x$",
    wrong: ["$v$", "$x^2$", "a constant"],
    why: "The definition $a=-\\omega^2 x$.",
  });
}

function waves(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const T = cycle([16, 36, 64], i);
    const mu = cycle([0.01, 0.04, 0.16], i);
    const v = Math.sqrt(T / mu);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `String: tension ${T} N, $\\mu=${mu}$ kg/m. Wave speed (m/s) is`,
      answer: v,
      why: "$v=\\sqrt{T/\\mu}$.",
    });
  }
  if (m === 1) {
    const f1 = cycle([256, 300, 440], i);
    const f2 = f1 + cycle([2, 4, 6], i);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `Beats between ${f1} Hz and ${f2} Hz, in Hz, is`,
      answer: f2 - f1,
      why: "$f_{\\mathrm{beat}}=|f_1-f_2|$.",
    });
  }
  if (m === 2) {
    const L = cycle([0.5, 1, 2], i);
    const v = 340;
    const f = v / (2 * L);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `Open pipe $L=${L}$ m, $v=340$ m/s. Fundamental (Hz) is`,
      answer: f,
      why: "$f=v/(2L)$ for open pipe.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "A wave $y=A\\sin(kx-\\omega t)$ travels",
      correct: "in $+x$",
      wrong: ["in $-x$", "as a standing wave", "nowhere"],
      why: "Phase $kx-\\omega t$ constant ⇒ $x$ grows with $t$.",
    });
  }
  return mcq({
    chapterId: "phy-waves",
    i,
    subject: "physics",
    stem: "Closed pipe (one end) supports",
    correct: "only odd harmonics",
    wrong: ["all harmonics", "only even", "no harmonics"],
    why: "$L=(2n-1)\\lambda/4$.",
  });
}

function charges(i: number): PlayItem {
  const m = i % 5;
  const k = 9e9;
  if (m === 0) {
    const q = cycle([1, 2, 4], i) * 1e-6;
    const r = cycle([0.1, 0.2, 0.3], i);
    const F = (k * q * q) / (r * r);
    return num({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: `Two charges ${q * 1e6} $\\mu$C each, ${r} m apart in vacuum. Force (N, nearest integer) is`,
      answer: nint(F),
      tolerance: 1,
      why: "$F=kq^2/r^2$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Gauss: $\\oint\\vec E\\cdot d\\vec A=$",
      correct: "$Q_{\\mathrm{encl}}/\\varepsilon_0$",
      wrong: ["$Q_{\\mathrm{total}}/\\varepsilon_0$ always including exterior charge", "$\\sigma$", "0 always"],
      why: "Only enclosed charge. Exterior contributes 0 net flux.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Field of an infinite sheet (one, isolated) is",
      correct: "$\\sigma/(2\\varepsilon_0)$",
      wrong: ["$\\sigma/\\varepsilon_0$", "$\\sigma/(4\\varepsilon_0)$", "0"],
      why: "Conductor surface just outside is $\\sigma/\\varepsilon_0$.",
    });
  }
  if (m === 3) {
    const r = cycle([1, 2, 4], i);
    // inside uniform insulating sphere E ∝ r
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: `Inside a uniformly charged insulating sphere, $E\\propto r^{n}$. $n=$ (ignore dummy ${r})`,
      correct: "$1$",
      wrong: ["$-2$", "$0$", "$-1$"],
      why: "Gauss: $E\\cdot 4\\pi r^2 = Q (r^3/R^3)/\\varepsilon_0$ ⇒ $E\\propto r$.",
    });
  }
  return mcq({
    chapterId: "phy-charges",
    i,
    subject: "physics",
    stem: "Dipole field on axis $\\propto$",
    correct: "$1/r^3$",
    wrong: ["$1/r^2$", "$1/r$", "$1/r^4$"],
    why: "Leading term of two inverse-squares.",
  });
}

function cap(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const C = cycle([2, 4, 5], i);
    const V = cycle([10, 20, 50], i);
    const U = 0.5 * C * 1e-6 * V * V;
    return num({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: `$C=${C}\\,\\mu$F, $V=${V}$ V. Energy stored (mJ) is`,
      answer: nint(U * 1000 * 100) / 100,
      tolerance: 0.05,
      why: "$U=\\frac12 CV^2$. Convert µF carefully: result in mJ.",
    });
  }
  if (m === 1) {
    const c1 = cycle([2, 3, 4], i);
    const c2 = cycle([2, 6, 12], i);
    const cs = (c1 * c2) / (c1 + c2);
    return num({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: `Two capacitors ${c1} and ${c2} µF in series. $C_{\\mathrm{eq}}$ (µF) is`,
      answer: nint(cs * 100) / 100,
      tolerance: 0.05,
      why: "$1/C=1/C_1+1/C_2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Inserting a dielectric $\\kappa$ into an isolated charged capacitor",
      correct: "decreases $V$ and $U$, $Q$ fixed",
      wrong: ["increases $V$", "increases $U$", "changes $Q$"],
      why: "Isolated: $Q$ fixed, $C\\to\\kappa C$, $V=Q/C$ falls, $U=Q^2/2C$ falls.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "$E=-dV/dx$ in 1-D means field points",
      correct: "toward decreasing potential",
      wrong: ["toward increasing $V$", "along equipotentials", "nowhere"],
      why: "Positive charge falls downhill in $V$.",
    });
  }
  return mcq({
    chapterId: "phy-potential",
    i,
    subject: "physics",
    stem: "Parallel-plate $C=$",
    correct: "$\\varepsilon_0 A/d$",
    wrong: ["$\\varepsilon_0 d/A$", "$\\sigma A$", "$Q/A$"],
    why: "$E=\\sigma/\\varepsilon_0$, $V=Ed$, $C=Q/V$.",
  });
}

function current(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const V = cycle([6, 12, 24], i);
    const R = cycle([2, 3, 4], i);
    const I = V / R;
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `$V=${V}$ V across $R=${R}\\,\\Omega$. Current (A) is`,
      answer: I,
      why: "$I=V/R$.",
    });
  }
  if (m === 1) {
    const r1 = cycle([2, 3, 6], i);
    const r2 = cycle([2, 6, 3], i);
    const rp = (r1 * r2) / (r1 + r2);
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `${r1} Ω and ${r2} Ω in parallel. $R_{\\mathrm{eq}}$ (Ω) is`,
      answer: nint(rp * 100) / 100,
      tolerance: 0.05,
      why: "$1/R=1/R_1+1/R_2$.",
    });
  }
  if (m === 2) {
    const E = cycle([2, 4, 6], i);
    const r = cycle([1, 2], i);
    const R = cycle([3, 5, 7], i);
    const I = E / (R + r);
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `Cell $\\mathcal{E}=${E}$ V, $r=${r}\\,\\Omega$, load $R=${R}\\,\\Omega$. Current (A) is`,
      answer: nint(I * 100) / 100,
      tolerance: 0.02,
      why: "$I=\\mathcal{E}/(R+r)$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Kirchhoff’s junction rule is conservation of",
      correct: "charge",
      wrong: ["energy", "momentum", "mass"],
      why: "Loop rule is energy / potential.",
    });
  }
  return mcq({
    chapterId: "phy-current",
    i,
    subject: "physics",
    stem: "Wheatstone is balanced when",
    correct: "$P/Q=R/S$",
    wrong: ["$P+Q=R+S$", "$P=Q=R=S$ only", "$I_{\\mathrm{galvanometer}}$ is maximum"],
    why: "$I_g=0$ iff the ratio arms match.",
  });
}

function emi(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const B = cycle([0.2, 0.5, 1], i);
    const ell = cycle([0.2, 0.4, 0.5], i);
    const v = cycle([2, 4, 5], i);
    const emf = B * ell * v;
    return num({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: `Rod of length ${ell} m slides at ${v} m/s on rails in $B=${B}$ T perpendicular. Motional emf (V) is`,
      answer: nint(emf * 100) / 100,
      tolerance: 0.02,
      why: "$\\mathcal{E}=B\\ell v$.",
    });
  }
  if (m === 1) {
    const L = cycle([2, 4, 5], i);
    const I = cycle([2, 3, 4], i);
    const U = 0.5 * L * I * I;
    return num({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: `Inductor $L=${L}$ H, $I=${I}$ A. Energy stored (J) is`,
      answer: U,
      why: "$U=\\frac12 L I^2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "Lenz’s law is a restatement of conservation of",
      correct: "energy",
      wrong: ["charge", "mass", "momentum only"],
      why: "Induced current opposes the change that caused it.",
    });
  }
  return mcq({
    chapterId: "phy-emi",
    i,
    subject: "physics",
    stem: "Faraday: $\\mathcal{E}=$",
    correct: "$-d\\Phi_B/dt$",
    wrong: ["$B\\cdot A$ always", "$LI$", "$IR$"],
    why: "The minus is Lenz.",
  });
}

function ac(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const L = cycle([0.1, 0.2, 0.5], i);
    const f = cycle([50, 100], i);
    const XL = 2 * Math.PI * f * L;
    return num({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: `$X_L$ of $L=${L}$ H at $f=${f}$ Hz (Ω, nearest integer; $\\pi=3.14$) is`,
      answer: nint(XL),
      tolerance: 2,
      why: "$X_L=2\\pi f L$.",
    });
  }
  if (m === 1) {
    const L = cycle([0.1, 0.2], i);
    const C = cycle([10, 20, 40], i) * 1e-6;
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
    return num({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: `Series LCR: $L=${L}$ H, $C=${C * 1e6}\\,\\mu$F. Resonant $f_0$ (Hz, nearest 10) is`,
      answer: nint(f0 / 10) * 10,
      tolerance: 20,
      why: "$f_0=1/(2\\pi\\sqrt{LC})$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "At series resonance, impedance is",
      correct: "$R$ (minimum)",
      wrong: ["$X_L$", "infinite", "$X_C$"],
      why: "$X_L=X_C$, $Z=R$, current max.",
    });
  }
  return mcq({
    chapterId: "phy-ac",
    i,
    subject: "physics",
    stem: "Average power in AC is",
    correct: "$V_{\\mathrm{rms}} I_{\\mathrm{rms}}\\cos\\phi$",
    wrong: ["$V_0 I_0$", "$VI\\sin\\phi$", "always 0"],
    why: "$\\cos\\phi$ is the power factor.",
  });
}

function ray(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const u = cycle([-30, -40, -20], i);
    const f = cycle([10, 15, 20], i);
    const v = 1 / (1 / f + 1 / u);
    return num({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: `Convex lens, New Cartesian: $u=${u}$ cm, $f=+${f}$ cm. $v$ (cm, nearest integer) is`,
      answer: nint(v),
      tolerance: 1,
      why: "$1/v-1/u=1/f$.",
    });
  }
  if (m === 1) {
    const mu = cycle([1.5, 1.33, 1.6], i);
    const C = cycle([42, 48, 40], i);
    const ic = nint((Math.asin(1 / mu) * 180) / Math.PI);
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: `Critical angle from $\\mu=${mu}$ to air is nearest`,
      correct: `${ic}°`,
      wrong: [`${C}°`, `${nint(ic / 2)}°`, "90°"],
      why: "$\\sin i_c=1/\\mu$. Dummy ${C} is a distractor.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Lens maker (thin, air): $1/f=$",
      correct: "$(\\mu-1)(1/R_1-1/R_2)$",
      wrong: ["$(\\mu+1)(1/R_1-1/R_2)$", "$\\mu/R$", "$1/R_1+1/R_2$"],
      why: "New Cartesian signs on $R$.",
    });
  }
  if (m === 3) {
    const A = cycle([60, 45], i);
    const mu = 1.5;
    const dm = nint((mu - 1) * A);
    return num({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: `Thin prism $A=${A}^\\circ$, $\\mu=1.5$. $\\delta_m$ (degrees) is`,
      answer: dm,
      why: "$\\delta_m=(\\mu-1)A$ for thin prisms.",
    });
  }
  return mcq({
    chapterId: "phy-ray",
    i,
    subject: "physics",
    stem: "TIR needs light going",
    correct: "denser → rarer, $i>i_c$",
    wrong: ["rarer → denser", "any $i$", "along the normal"],
    why: "Also $\\mu$ large enough that $i_c$ exists.",
  });
}

function yds(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const lam = cycle([500, 600, 400], i) * 1e-9;
    const D = cycle([1, 2], i);
    const d = cycle([0.5, 1, 2], i) * 1e-3;
    const beta = (lam * D) / d;
    return num({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: `YDSE: $\\lambda=${lam * 1e9}$ nm, $D=${D}$ m, $d=${d * 1e3}$ mm. Fringe width in mm (nearest 0.1) is`,
      answer: nint(beta * 1e3 * 10) / 10,
      tolerance: 0.15,
      why: "$\\beta=\\lambda D/d$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Brewster: reflected light is fully polarised when $\\tan i_p=$",
      correct: "$\\mu$",
      wrong: ["$1/\\mu$", "$\\sin\\mu$", "1"],
      why: "Reflected and refracted are perpendicular.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Malus: intensity after a polariser–analyser pair is",
      correct: "$I\\cos^2\\theta$",
      wrong: ["$I\\cos\\theta$", "$I\\sin^2\\theta$ only", "$I/2$ always"],
      why: "$\\theta$ is the angle between axes. Unpolarised into a polariser: $I/2$.",
    });
  }
  return mcq({
    chapterId: "phy-wave-opt",
    i,
    subject: "physics",
    stem: "A thin transparent sheet $(n-1)t$ in front of one slit",
    correct: "shifts the fringe pattern",
    wrong: ["changes $\\beta$ to first order", "kills interference", "reverses bright/dark always"],
    why: "Path increase $(n-1)t$; $\\beta$ stays $\\lambda D/d$.",
  });
}

function dual(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const f = cycle([8, 10, 12], i) * 1e14;
    const phi_eV = cycle([2, 2.5, 3], i);
    const h_eV = 4.14e-15;
    const K = h_eV * f - phi_eV;
    return num({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: `Photoelectric: $f=${f / 1e14}\\times10^{14}$ Hz, $\\phi=${phi_eV}$ eV. Use $h=4.14\\times10^{-15}$ eV s. $K_{\\max}$ (eV, one decimal) is`,
      answer: nint(K * 10) / 10,
      tolerance: 0.2,
      why: "$hf=\\phi+K_{\\max}$.",
    });
  }
  if (m === 1) {
    const V = cycle([100, 150, 200], i);
    // lambda (nm) ≈ 12.27 / sqrt(V)
    const lam = 12.27 / Math.sqrt(V);
    return num({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: `de Broglie of an electron accelerated by ${V} V, in Å (use $12.27/\\sqrt{V}$ in Å, two decimals) is`,
      answer: nint(lam * 100) / 100,
      tolerance: 0.08,
      why: "$\\lambda=h/\\sqrt{2meV}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Increasing intensity (same $f>f_0$) increases",
      correct: "the number of photoelectrons",
      wrong: ["$K_{\\max}$", "$f_0$", "$\\phi$"],
      why: "Einstein: $K_{\\max}$ depends on $f$, not on intensity.",
    });
  }
  return mcq({
    chapterId: "phy-dual",
    i,
    subject: "physics",
    stem: "Threshold frequency $f_0=$",
    correct: "$\\phi/h$",
    wrong: ["$h/\\phi$", "$\\phi h$", "$hc$"],
    why: "$K_{\\max}=0$ at threshold.",
  });
}

function atoms(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const n = cycle([2, 3, 4], i);
    const E = -13.6 / (n * n);
    return num({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: `H-atom, $E_n$ for $n=${n}$ in eV is`,
      answer: nint(E * 100) / 100,
      tolerance: 0.05,
      why: "$E_n=-13.6/n^2$ eV.",
    });
  }
  if (m === 1) {
    const n1 = 1;
    const n2 = cycle([2, 3, 4], i);
    const dE = 13.6 * (1 / n1 ** 2 - 1 / n2 ** 2);
    return num({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: `Lyman photon for $n=${n2}\\to 1$ in H, energy (eV, two decimals) is`,
      answer: nint(dE * 100) / 100,
      tolerance: 0.05,
      why: "$\\Delta E=13.6(1-1/n^2)$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Balmer series of H ends on",
      correct: "$n=2$",
      wrong: ["$n=1$", "$n=3$", "$n=\\infty$ as the lower level"],
      why: "Lyman → 1 (UV), Balmer → 2 (visible), Paschen → 3 (IR).",
    });
  }
  return mcq({
    chapterId: "phy-atoms",
    i,
    subject: "physics",
    stem: "For hydrogen-like ions, energies scale as",
    correct: "$Z^2$",
    wrong: ["$Z$", "$1/Z$", "$Z^3$"],
    why: "$E=-13.6 Z^2/n^2$ eV.",
  });
}

function nuclei(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const T = cycle([2, 4, 8], i);
    const t = 2 * T;
    const left = 1 / 4;
    return num({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: `Half-life ${T} h. Fraction remaining after ${t} h is`,
      answer: left,
      tolerance: 0.001,
      why: "Two half-lives: $(1/2)^2=1/4$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Mean life $\\tau$ vs half-life $T_{1/2}$",
      correct: "$T_{1/2}=\\tau\\ln 2$",
      wrong: ["$\\tau=T_{1/2}\\ln 2$", "they are equal", "$\\tau=2 T_{1/2}$"],
      why: "$N=N_0 e^{-\\lambda t}$, $T_{1/2}=\\ln 2/\\lambda$, $\\tau=1/\\lambda$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Binding energy per nucleon is maximum near",
      correct: "iron-56",
      wrong: ["hydrogen", "uranium", "helium only"],
      why: "That is why fusion of light and fission of heavy both release energy.",
    });
  }
  return mcq({
    chapterId: "phy-nuclei",
    i,
    subject: "physics",
    stem: "$\\alpha$ decay decreases $A$ by",
    correct: "4, and $Z$ by 2",
    wrong: ["2 and 2", "4 and 1", "0 and 1"],
    why: "Helium nucleus $^{4}_{2}\\mathrm{He}$.",
  });
}

function basic(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const g = cycle([9, 18, 36], i);
    const M = 18;
    const n = g / M;
    return num({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: `${g} g of $\\mathrm{H_2O}$ ($M=18$). Amount in mol is`,
      answer: n,
      why: "$n=m/M$.",
    });
  }
  if (m === 1) {
    const M = cycle([0.1, 0.2, 0.5], i);
    const V = cycle([0.25, 0.5, 1], i);
    const n = M * V;
    return num({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: `$M=${M}$ mol/L, $V=${V}$ L. Moles of solute are`,
      answer: n,
      tolerance: 0.001,
      why: "$n=MV$.",
    });
  }
  if (m === 2) {
    const nA = 6.022e23;
    const mol = cycle([0.5, 1, 2], i);
    return num({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: `Molecules in ${mol} mol, in units of $N_A$ (so answer ${mol}) — wait: number of moles of molecules is`,
      answer: mol,
      why: `${mol} mol contains ${mol}$ × $N_A$ molecules ($N_A=${nA}$).`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: "Molality is preferred over molarity when temperature changes because",
      correct: "mass does not expand; volume does",
      wrong: ["moles change with $T$", "molality is always larger", "IUPAC forbids molarity"],
      why: "$m$ uses kg of solvent.",
    });
  }
  return mcq({
    chapterId: "chem-basic",
    i,
    subject: "chemistry",
    stem: "Limiting reagent is the reactant that",
    correct: "produces the smaller amount of product",
    wrong: ["has the smaller mass always", "is in excess", "has the larger coefficient"],
    why: "Convert each to product moles separately.",
  });
}

function atom(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: "An orbital is labelled by",
      correct: "$n,\\ell,m_\\ell$",
      wrong: ["$n$ only", "$m_s$ only", "$Z$ only"],
      why: "Spin $m_s$ labels the electron in that orbital.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: "Maximum electrons in a shell $n$ is",
      correct: "$2n^2$",
      wrong: ["$n^2$", "$2n$", "$n(n+1)$"],
      why: "Orbitals $n^2$, two spins each.",
    });
  }
  if (m === 2) {
    const n = cycle([2, 3, 4], i);
    return num({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: `Number of orbitals in shell $n=${n}$ is`,
      answer: n * n,
      why: "$n^2$ orbitals.",
    });
  }
  return mcq({
    chapterId: "chem-atom",
    i,
    subject: "chemistry",
    stem: "Hund: electrons occupy degenerate orbitals",
    correct: "singly with parallel spin first",
    wrong: ["paired first", "randomly", "only in s"],
    why: "Maximise $S$ before pairing.",
  });
}

function bonding(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Shape of $\\mathrm{SF_6}$ is",
      correct: "octahedral",
      wrong: ["tetrahedral", "trigonal bipyramidal", "square planar"],
      why: "$sp^3d^2$, no lone pair.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Bond order of $\\mathrm{N_2}$ is",
      correct: "3",
      wrong: ["2", "2.5", "1"],
      why: "MO: $(\\sigma 2s)^2(\\sigma^*2s)^2(\\pi 2p)^4(\\sigma 2p)^2$ ⇒ BO 3. $\\mathrm{O_2}$ is 2 and paramagnetic.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "$\\mathrm{O_2}$ is paramagnetic because it has",
      correct: "two unpaired electrons in $\\pi^*$",
      wrong: ["no unpaired electrons", "one unpaired in $\\sigma$", "unpaired on atoms only in VB"],
      why: "MOT, not Lewis.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Lone-pair–bond-pair repulsion vs bond-pair–bond-pair is",
      correct: "larger (VSEPR)",
      wrong: ["smaller", "equal", "undefined"],
      why: "That is why $\\mathrm{NH_3}$ is pyramidal, not tetrahedral with 109.5° exactly.",
    });
  }
  return mcq({
    chapterId: "chem-bonding",
    i,
    subject: "chemistry",
    stem: "Hybridisation of C in $\\mathrm{CO_2}$ is",
    correct: "$sp$",
    wrong: ["$sp^2$", "$sp^3$", "$dsp^2$"],
    why: "Linear, two $\\sigma$ domains.",
  });
}

function cthermo(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const q = cycle([100, 200, 50], i);
    const w = cycle([-20, -40, 0], i);
    const dU = q + w;
    return num({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: `Chemistry sign: $q=${q}$ J, $w=${w}$ J. $\\Delta U$ (J) is`,
      answer: dU,
      why: "$\\Delta U=q+w$ (chemistry NCERT).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "$\\Delta G<0$ at constant $T,P$ means the process is",
      correct: "spontaneous",
      wrong: ["at equilibrium", "impossible", "endothermic"],
      why: "$\\Delta G=0$ at equilibrium.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "$\\Delta G^\\circ=-RT\\ln K$. If $K>1$ then $\\Delta G^\\circ$ is",
      correct: "negative",
      wrong: ["positive", "zero", "infinite"],
      why: "Products favoured at standard state.",
    });
  }
  return mcq({
    chapterId: "chem-thermo",
    i,
    subject: "chemistry",
    stem: "Hess’s law works because $H$ is a",
    correct: "state function",
    wrong: ["path function", "a force", "undefined for cycles"],
    why: "Cycle $\\Delta H=0$; any path between two states shares $\\Delta H$.",
  });
}

function eq(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const pKa = cycle([4.74, 4.2, 5], i);
    const ratio = 1;
    const pH = pKa + Math.log10(ratio);
    return num({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: `Henderson: $\\mathrm{p}K_a=${pKa}$, $[\\mathrm{A}^-]/[\\mathrm{HA}]=1$. pH is`,
      answer: pH,
      tolerance: 0.02,
      why: "$\\mathrm{pH}=\\mathrm{p}K_a+\\log([\\mathrm{A}^-]/[\\mathrm{HA}])$. Dummy ratio ${ratio}.",
    });
  }
  if (m === 1) {
    const Kw = 1e-14;
    const pH = 7;
    return num({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: `Pure water at 25 °C, $K_w=${Kw}$. pH is`,
      answer: pH,
      why: "$[H^+]=10^{-7}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "Le Chatelier: adding a product at equilibrium shifts the system",
      correct: "toward reactants",
      wrong: ["toward products", "nowhere", "to completion"],
      why: "$Q>K$ until $Q=K$ again.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "A buffer of weak acid + salt works because",
      correct: "both HA and A⁻ are present in comparable amounts",
      wrong: ["pH is always 7", "it is a strong acid", "$K_w$ changes"],
      why: "Henderson region: $\\mathrm{pH}\\approx\\mathrm{p}K_a\\pm 1$.",
    });
  }
  return mcq({
    chapterId: "chem-eq",
    i,
    subject: "chemistry",
    stem: "Common-ion effect on a sparingly soluble salt",
    correct: "decreases solubility",
    wrong: ["increases solubility", "no effect", "changes $K_{\\mathrm{sp}}$"],
    why: "$K_{\\mathrm{sp}}$ is constant at a given $T$; $[\\mathrm{ion}]$ from outside kills the dissolved amount.",
  });
}

function goc(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "The most stable carbocation among the usual set is",
      correct: "tertiary (or resonance-stabilised benzyl/allyl)",
      wrong: ["methyl", "primary unrearranged", "vinyl"],
      why: "Inductive + hyperconjugation; resonance can beat a 3° alkyl.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "$-\\mathrm{NO_2}$ on a benzene ring is",
      correct: "meta-directing, deactivating",
      wrong: ["o/p directing, activating", "o/p, deactivating", "meta, activating"],
      why: "Electron-withdrawing resonance.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Enantiomers are",
      correct: "nonsuperimposable mirror images",
      wrong: ["identical in all properties including optical rotation sign", "diastereomers", "conformers only"],
      why: "They rotate plane-polarised light equally, opposite ways.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Hyperconjugation needs",
      correct: "an $\\alpha$-H on a carbon adjacent to an unsaturated/charge centre",
      wrong: ["a lone pair only", "a metal", "UV light"],
      why: "No-bond resonance.",
    });
  }
  return mcq({
    chapterId: "chem-goc",
    i,
    subject: "chemistry",
    stem: "Among HCl, HBr, HI in water, the strongest acid is",
    correct: "HI",
    wrong: ["HCl", "HBr", "they are equal"],
    why: "Bond strength falls down the group; HI ionises most.",
  });
}

function sol(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const iVan = cycle([2, 3], i);
    const m0 = cycle([0.1, 0.2], i);
    const Kf = 1.86;
    const dT = iVan * Kf * m0;
    return num({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: `Freezing: $i=${iVan}$, $m=${m0}$, $K_f=1.86$. $\\Delta T_f$ (°C, two decimals) is`,
      answer: nint(dT * 100) / 100,
      tolerance: 0.02,
      why: "$\\Delta T_f=i K_f m$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "Van’t Hoff $i$ for $\\mathrm{K_2SO_4}$ (complete dissociation) is",
      correct: "3",
      wrong: ["1", "2", "4"],
      why: "$2\\,K^++\\mathrm{SO_4^{2-}}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "Raoult: $p_A=$",
      correct: "$x_A p_A^\\circ$",
      wrong: ["$x_B p_A^\\circ$", "$p_A^\\circ / x_A$", "$K_H x_A$ always"],
      why: "Henry is $p=K_H x$ for gases; Raoult is the solvent limit.",
    });
  }
  return mcq({
    chapterId: "chem-solutions",
    i,
    subject: "chemistry",
    stem: "Azeotropes cannot be separated by",
    correct: "simple fractional distillation",
    wrong: ["any method", "chromatography always", "crystallisation of a salt"],
    why: "They boil as a mixture of fixed composition.",
  });
}

function electro(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const n = cycle([1, 2, 3], i);
    const E = cycle([0.34, 0.76, 1.1], i);
    const dG = -n * 96500 * E;
    return num({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: `$n=${n}$, $E^\\circ=${E}$ V. $\\Delta G^\\circ$ in kJ (nearest integer, $F=96500$) is`,
      answer: nint(dG / 1000),
      tolerance: 2,
      why: "$\\Delta G^\\circ=-nFE^\\circ$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "Nernst at 298 K: $E=E^\\circ-\\frac{0.059}{n}\\log Q$. If $Q=1$ then",
      correct: "$E=E^\\circ$",
      wrong: ["$E=0$", "$E\\to\\infty$", "$E=-E^\\circ$"],
      why: "Standard state.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "Faraday: moles of $e^-$ =",
      correct: "$It/F$",
      wrong: ["$I/t$", "$F/It$", "$nF$"],
      why: "$Q=It=nF$ for $n$ moles of electrons.",
    });
  }
  return mcq({
    chapterId: "chem-electro",
    i,
    subject: "chemistry",
    stem: "Kohlrausch: $\\Lambda_m^\\circ$ of acetic acid is obtained from",
    correct: "NaAc, HCl, NaCl limiting values",
    wrong: ["a single measurement at high $c$", "$K_w$ only", "Faraday’s law"],
    why: "Weak electrolytes: $\\Lambda_m^\\circ$ by additivity, not by infinite dilution of the weak acid itself (too little ionisation tracking).",
  });
}

function kin(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const k = cycle([0.693, 0.0693], i);
    const t12 = 0.693 / k;
    return num({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: `First order, $k=${k}$ (same time unit). $t_{1/2}$ is`,
      answer: nint(t12 * 1000) / 1000,
      tolerance: 0.02,
      why: "$t_{1/2}=\\ln 2/k$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "Order of a reaction is",
      correct: "determined experimentally",
      wrong: ["always equal to molecularity", "always 1", "the stoichiometric sum always"],
      why: "Molecularity is for an elementary step.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "Arrhenius: a plot of $\\ln k$ vs $1/T$ has slope",
      correct: "$-E_a/R$",
      wrong: ["$E_a/R$", "$-R/E_a$", "$A$"],
      why: "$k=A e^{-E_a/RT}$.",
    });
  }
  return mcq({
    chapterId: "chem-kinetics",
    i,
    subject: "chemistry",
    stem: "Zero-order $t_{1/2}$ is",
    correct: "proportional to $[A]_0$",
    wrong: ["independent of $[A]_0$", "$\\propto 1/[A]_0$", "$\\ln 2/k$"],
    why: "$t_{1/2}=[A]_0/(2k)$. First-order $t_{1/2}$ is independent of $[A]_0$.",
  });
}

function coord(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "In octahedral CFT, the $e_g$ set is",
      correct: "$d_{z^2}$ and $d_{x^2-y^2}$ (higher energy)",
      wrong: ["$d_{xy},d_{yz},d_{zx}$ higher", "all five degenerate", "only $d_{z^2}$"],
      why: "Ligands on the axes raise $e_g$. $t_{2g}$ sits $4 D_q$ below the barycentre.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "Spin-only $\\mu$ (BM) is",
      correct: "$\\sqrt{n(n+2)}$",
      wrong: ["$n$", "$2n$", "$\\sqrt{n}$"],
      why: "$n$ = unpaired electrons.",
    });
  }
  if (m === 2) {
    const n = cycle([1, 2, 3, 5], i);
    const mu = Math.sqrt(n * (n + 2));
    return num({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: `Spin-only moment for $n=${n}$ unpaired electrons, in BM (one decimal) is`,
      answer: nint(mu * 10) / 10,
      tolerance: 0.15,
      why: "$\\mu=\\sqrt{n(n+2)}$.",
    });
  }
  return mcq({
    chapterId: "chem-coord",
    i,
    subject: "chemistry",
    stem: "$[\\mathrm{Co}(\\mathrm{NH_3})_6]^{3+}$ is usually",
    correct: "low-spin $d^6$, diamagnetic",
    wrong: ["high-spin $d^6$", "paramagnetic with 4 unpaired", "tetrahedral"],
    why: "$\\mathrm{NH_3}$ is a moderately strong field; Co(III) low-spin.",
  });
}

function carb(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Aldol needs",
      correct: "an $\\alpha$-H on at least one carbonyl partner",
      wrong: ["no $\\alpha$-H (that is Cannizzaro)", "a nitro group always", "UV"],
      why: "Enolate/enolate-equivalent.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Cannizzaro is for aldehydes with",
      correct: "no $\\alpha$-H, in concentrated alkali",
      wrong: ["many $\\alpha$-H", "acid only", "free radicals"],
      why: "Hydride transfer: one molecule oxidised, one reduced.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Haloform test is given by",
      correct: "methyl ketones (and acetaldehyde)",
      wrong: ["all ketones", "all aldehydes", "carboxylic acids only"],
      why: "$\\mathrm{CH_3CO}-$ or $\\mathrm{CH_3CH(OH)}-$ that oxidises to it.",
    });
  }
  return mcq({
    chapterId: "chem-carbonyl",
    i,
    subject: "chemistry",
    stem: "Nucleophilic addition to C=O is easier for",
    correct: "aldehydes than ketones (steric + inductive)",
    wrong: ["ketones than aldehydes always", "alkanes", "CO₂ only"],
    why: "H vs alkyl on the carbonyl carbon.",
  });
}

function trig(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin 2\\theta=$",
      correct: "$2\\sin\\theta\\cos\\theta$",
      wrong: ["$\\sin^2\\theta$", "$2\\cos^2\\theta-1$", "$1-2\\sin^2\\theta$"],
      why: "Double-angle. $\\cos 2\\theta=2\\cos^2\\theta-1=1-2\\sin^2\\theta=\\cos^2\\theta-\\sin^2\\theta$.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin^2 30^\\circ+\\cos^2 30^\\circ$ equals",
      answer: 1,
      why: "Pythagorean identity, any angle.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "General solution of $\\sin\\theta=0$ is",
      correct: "$\\theta=n\\pi$",
      wrong: ["$\\theta=2n\\pi$", "$\\theta=(2n+1)\\pi/2$", "$\\theta=n\\pi/2$"],
      why: "Integer $n$. Cosine zero is $(2n+1)\\pi/2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\tan(\\pi/4+x)\\tan(\\pi/4-x)=$",
      correct: "1",
      wrong: ["0", "$-1$", "$\\tan 2x$"],
      why: "Complements: product of tans around 45°.",
    });
  }
  return num({
    chapterId: "math-trig",
    i,
    subject: "maths",
    stem: "$\\cos 60^\\circ$ equals (decimal 0.5)",
    answer: 0.5,
    tolerance: 0.001,
    why: "Exact $1/2$.",
  });
}

function cplx(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a = cycle([3, 4, 5], i);
    const b = cycle([4, 3, 12], i);
    const mod = Math.hypot(a, b);
    return num({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: `$|${a}+${b}i|$ is`,
      answer: mod,
      why: "$|z|=\\sqrt{a^2+b^2}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "Cube roots of unity satisfy",
      correct: "$1+\\omega+\\omega^2=0$",
      wrong: ["$\\omega^2=1$", "$\\omega=1$ only", "$1+\\omega=\\omega^2$"],
      why: "And $\\omega^3=1$, $\\omega\\neq 1$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "$|z_1 z_2|=$",
      correct: "$|z_1||z_2|$",
      wrong: ["$|z_1|+|z_2|$", "$|z_1+z_2|$", "1"],
      why: "Modulus is multiplicative. Triangle: $|z_1+z_2|\\le|z_1|+|z_2|$.",
    });
  }
  return mcq({
    chapterId: "math-complex",
    i,
    subject: "maths",
    stem: "Argument of a negative real number is",
    correct: "$\\pi$ (principal)",
    wrong: ["$0$", "$\\pi/2$", "undefined always"],
    why: "Principal Arg $\\in(-\\pi,\\pi]$.",
  });
}

function pnc(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const n = cycle([5, 6, 7], i);
    const r = cycle([2, 3], i);
    const C = fact(n) / (fact(r) * fact(n - r));
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `$\\binom{${n}}{${r}}$ is`,
      answer: C,
      why: "$n!/(r!(n-r)!)$.",
    });
  }
  if (m === 1) {
    const n = cycle([5, 6, 4], i);
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `Number of permutations of ${n} distinct objects is`,
      answer: fact(n),
      why: "$n!$.",
    });
  }
  if (m === 2) {
    const n = cycle([5, 6, 8], i);
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `Circular permutations of ${n} distinct people (necklace not flipping) is`,
      answer: fact(n - 1),
      why: "$(n-1)!$.",
    });
  }
  return mcq({
    chapterId: "math-pnc",
    i,
    subject: "maths",
    stem: "$P(n,r)=$",
    correct: "$n!/(n-r)!$",
    wrong: ["$n!/r!$", "$\\binom{n}{r}$", "$n^r$ always"],
    why: "Arrangements. $n^r$ is with repetition.",
  });
}

function fact(n: number): number {
  let p = 1;
  for (let k = 2; k <= n; k++) p *= k;
  return p;
}

function seq(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a = cycle([2, 3, 5], i);
    const d = cycle([2, 3, 4], i);
    const n = cycle([10, 15, 20], i);
    const S = (n / 2) * (2 * a + (n - 1) * d);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `AP: $a=${a}$, $d=${d}$, $n=${n}$. $S_n$ is`,
      answer: S,
      why: "$S_n=\\frac n2(2a+(n-1)d)$.",
    });
  }
  if (m === 1) {
    const a = cycle([2, 3], i);
    const r = cycle([2, 3], i);
    const n = cycle([4, 5], i);
    const S = (a * (r ** n - 1)) / (r - 1);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `GP: $a=${a}$, $r=${r}$, $n=${n}$. $S_n$ is`,
      answer: S,
      why: "$S_n=a(r^n-1)/(r-1)$.",
    });
  }
  if (m === 2) {
    const n = cycle([5, 10, 8], i);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `$\\sum_{k=1}^{${n}} k$ is`,
      answer: (n * (n + 1)) / 2,
      why: "$n(n+1)/2$.",
    });
  }
  return mcq({
    chapterId: "math-seq",
    i,
    subject: "maths",
    stem: "AM–GM: equality holds when the positive numbers are",
    correct: "equal",
    wrong: ["in AP only", "in GP with $r\\neq 1$ only", "zero"],
    why: "For nonnegative reals, AM ≥ GM.",
  });
}

function conic(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a4 = cycle([8, 12, 16], i);
    const a = a4 / 4;
    return num({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: `Focus of $y^2=${a4}x$ has $x$-coordinate`,
      answer: a,
      why: "$4a=$ coefficient of $x$.",
    });
  }
  if (m === 1) {
    const A = cycle([25, 16, 9], i);
    const B = cycle([9, 4, 4], i);
    const e = Math.sqrt(1 - B / A);
    return num({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: `Ellipse $x^2/${A}+y^2/${B}=1$ ($A>B$). $e$ (two decimals) is`,
      answer: nint(e * 100) / 100,
      tolerance: 0.02,
      why: "$e=\\sqrt{1-b^2/a^2}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Asymptotes of $x^2/a^2-y^2/b^2=1$ are",
      correct: "$y=\\pm(b/a)x$",
      wrong: ["$y=\\pm(a/b)x$", "$x=\\pm a$", "none"],
      why: "Set the quadratic part to 0.",
    });
  }
  return mcq({
    chapterId: "math-conic",
    i,
    subject: "maths",
    stem: "Focal chord of $y^2=4ax$ joining $t_1,t_2$ has",
    correct: "$t_1 t_2=-1$",
    wrong: ["$t_1+t_2=0$", "$t_1 t_2=1$", "$t_1=t_2$"],
    why: "The chord through $(a,0)$.",
  });
}

function lim(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a = cycle([2, 3, 5], i);
    const b = cycle([4, 6, 7], i);
    return num({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: `$\\lim_{x\\to 0}\\sin ${a}x / \\sin ${b}x$ equals (as a simplified rational ${a}/${b})`,
      answer: a / b,
      tolerance: 0.001,
      why: "$(a/b)\\cdot(\\sin(ax)/(ax))\\cdot(bx/\\sin(bx))\\to a/b$.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{x\\to 0}(1-\\cos x)/x^2$ equals",
      answer: 0.5,
      tolerance: 0.001,
      why: "Standard $1/2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{x\\to 0}\\sin x/x$ requires $x$ in",
      correct: "radians",
      wrong: ["degrees", "any unit", "gradians"],
      why: "The derivative of sin is cos only in radians.",
    });
  }
  return mcq({
    chapterId: "math-limits",
    i,
    subject: "maths",
    stem: "$\\lim_{x\\to 0^+} x\\ln x$ is",
    correct: "0",
    wrong: ["$\\infty$", "1", "does not exist (finite nonzero)"],
    why: "Write $\\ln x/(1/x)$, L’Hôpital.",
  });
}

function mat(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "$(AB)^T=$",
      correct: "$B^T A^T$",
      wrong: ["$A^T B^T$", "$AB$", "$BA$"],
      why: "Reverse the product, then transpose each.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "$A^{-1}$ exists iff",
      correct: "$\\det A\\neq 0$",
      wrong: ["$\\det A=0$", "$A$ is rectangular", "$A=A^T$"],
      why: "Nonsingular ⇔ invertible.",
    });
  }
  if (m === 2) {
    const a = cycle([2, 3, 4], i);
    return num({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: `$\\mathrm{tr}\\,I_{${a}}$ is`,
      answer: a,
      why: "Trace of identity is the order.",
    });
  }
  return mcq({
    chapterId: "math-matrices",
    i,
    subject: "maths",
    stem: "If $AB=BA=I$ then $B$ is",
    correct: "$A^{-1}$",
    wrong: ["$A^T$", "$\\mathrm{adj}\\,A$ only", "$A$"],
    why: "Definition of inverse. $\\mathrm{adj}\\,A=(\\det A)A^{-1}$.",
  });
}

function dets(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a = cycle([1, 2, 3], i);
    const b = cycle([4, 5, 6], i);
    const c = cycle([2, 1, 0], i);
    const d = cycle([3, 2, 4], i);
    const det = a * d - b * c;
    return num({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: `$\\det\\begin{pmatrix}${a}&${b}\\\\${c}&${d}\\end{pmatrix}$ is`,
      answer: det,
      why: "$ad-bc$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "Swapping two rows of a determinant",
      correct: "multiplies it by $-1$",
      wrong: ["leaves it unchanged", "zeros it", "squares it"],
      why: "Alternating property.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "$\\det(kA)$ for $n\\times n$ $A$ is",
      correct: "$k^n\\det A$",
      wrong: ["$k\\det A$", "$n k\\det A$", "$\\det A$"],
      why: "Each of $n$ rows contributes a $k$.",
    });
  }
  return mcq({
    chapterId: "math-dets",
    i,
    subject: "maths",
    stem: "A system $AX=B$ with $\\det A=0$ is",
    correct: "either inconsistent or has infinitely many solutions",
    wrong: ["always unique", "always inconsistent", "always infinite without checking $B$"],
    why: "Look at $\\mathrm{adj}\\,A\\cdot B$ / ranks.",
  });
}

function cont(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "$|x|$ at 0 is",
      correct: "continuous but not differentiable",
      wrong: ["differentiable", "discontinuous", "not defined"],
      why: "Left derivative $-1$, right $+1$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Differentiable at $a$ implies",
      correct: "continuous at $a$",
      wrong: ["discontinuous", "analytic always", "constant"],
      why: "The converse is false.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Chain rule: $(f\\circ g)'=$",
      correct: "$(f'\\circ g)\\,g'$",
      wrong: ["$f' g'$", "$f\\circ g'$", "$f'+g'$"],
      why: "Derivative of the outer, evaluated at inner, times inner derivative.",
    });
  }
  return mcq({
    chapterId: "math-cont",
    i,
    subject: "maths",
    stem: "Rolle needs $f(a)=f(b)$ and $f$",
    correct: "continuous on $[a,b]$, differentiable on $(a,b)$",
    wrong: ["only integrable", "polynomial", "bounded only"],
    why: "Then $f'(c)=0$.",
  });
}

function aod(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "Maximum of $x(1-x)$ on $[0,1]$ is",
      answer: 0.25,
      tolerance: 0.001,
      why: "$f'=1-2x=0\\Rightarrow x=1/2$, $f=1/4$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "If $f'(c)=0$ and $f''(c)>0$ then $c$ is a",
      correct: "local min",
      wrong: ["local max", "inflection always", "jump"],
      why: "Second-derivative test. Still check endpoints on a closed interval.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "$d/dx(x^x)=$",
      correct: "$x^x(\\ln x+1)$",
      wrong: ["$x\\, x^{x-1}$", "$\\ln x$", "$x^x$"],
      why: "Write $x^x=e^{x\\ln x}$.",
    });
  }
  return mcq({
    chapterId: "math-aod",
    i,
    subject: "maths",
    stem: "A point of inflection typically has $f''$",
    correct: "changing sign",
    wrong: ["always zero and staying zero", "undefined always", "equal to $f'$"],
    why: "$f''=0$ is neither necessary nor sufficient alone.",
  });
}

function integ(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return num({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int_{-1}^{1} x^3\\,dx$ equals",
      answer: 0,
      why: "Odd integrand, symmetric limits.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int_0^1 x\\,dx$ equals",
      answer: 0.5,
      tolerance: 0.001,
      why: "$[x^2/2]_0^1=1/2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "King property: $\\int_a^b f(x)\\,dx=$",
      correct: "$\\int_a^b f(a+b-x)\\,dx$",
      wrong: ["$\\int_b^a f$", "0", "$f(a)+f(b)$"],
      why: "The 0-to-$\\pi/2$ sin/cos swap is the celebrity case.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int u\\,dv=$",
      correct: "$uv-\\int v\\,du$",
      wrong: ["$uv+\\int v\\,du$", "$u'v'$", "$u/v$"],
      why: "Parts. LIATE is a default, not a law.",
    });
  }
  return num({
    chapterId: "math-int",
    i,
    subject: "maths",
    stem: "$\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx$ equals (as a multiple of $\\pi$, enter $\\pi/4$ as 0.785, two decimals ok)",
    answer: Math.PI / 4,
    tolerance: 0.01,
    why: "King: $2I=\\pi/2$.",
  });
}

function prob(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const n = cycle([5, 6, 8], i);
    const p = 0.5;
    const mu = n * p;
    return num({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: `Binomial $n=${n}$, $p=1/2$. Mean is`,
      answer: mu,
      why: "$\\mu=np$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Independent events: $P(A\\cap B)=$",
      correct: "$P(A)P(B)$",
      wrong: ["0", "$P(A)+P(B)$", "1"],
      why: "Not the same as mutually exclusive.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Mutually exclusive events of positive probability are",
      correct: "not independent",
      wrong: ["independent", "the whole space", "complements always"],
      why: "$P(A\\cap B)=0\\neq P(A)P(B)$.",
    });
  }
  return num({
    chapterId: "math-prob-12",
    i,
    subject: "maths",
    stem: "Two fair coins. $P(\\text{exactly one head})$ is",
    answer: 0.5,
    tolerance: 0.001,
    why: "HT, TH out of HH,HT,TH,TT.",
  });
}

function binom(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    const n = cycle([5, 6, 8], i);
    const r = cycle([2, 3], i);
    const term = fact(n) / (fact(r) * fact(n - r));
    return num({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: `Coefficient of $x^{${r}}$ in $(1+x)^{${n}}$ is`,
      answer: term,
      why: "$T_{r+1}=\\binom{n}{r} x^r$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "Middle term(s) of $(1+x)^{2n}$ : there is",
      correct: "one middle term $T_{n+1}$",
      wrong: ["two middle terms", "no middle", "$T_n$ only"],
      why: "Even power $2n$: one middle. Odd power $2n+1$: two middles.",
    });
  }
  return mcq({
    chapterId: "math-binom",
    i,
    subject: "maths",
    stem: "$(1+x)^n=\\sum$",
    correct: "$\\binom{n}{r} x^r$",
    wrong: ["$n^r x^r$", "$r^n$", "$n! x^n$"],
    why: "Binomial theorem, $r=0$ to $n$.",
  });
}

function line(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Distance of $(1,2)$ from $3x+4y-5=0$ equals (as a rational 1.2)",
      answer: 1.2,
      tolerance: 0.01,
      why: "$|3+8-5|/5=6/5$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Two lines with slopes $m_1,m_2$ are perpendicular iff",
      correct: "$m_1 m_2=-1$",
      wrong: ["$m_1=m_2$", "$m_1 m_2=1$", "$m_1+m_2=0$ always"],
      why: "Unless one is vertical.",
    });
  }
  if (m === 2) {
    const x1 = cycle([1, 2, 0], i);
    const y1 = cycle([1, 3, 4], i);
    const x2 = cycle([4, 5, 6], i);
    const y2 = cycle([5, 7, 8], i);
    const slope = (y2 - y1) / (x2 - x1);
    return num({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: `Slope through $(${x1},${y1})$ and $(${x2},${y2})$ is`,
      answer: nint(slope * 100) / 100,
      tolerance: 0.02,
      why: "$m=\\Delta y/\\Delta x$.",
    });
  }
  return mcq({
    chapterId: "math-straight",
    i,
    subject: "maths",
    stem: "Family of lines through the intersection of $L_1=0,L_2=0$ is",
    correct: "$L_1+\\lambda L_2=0$",
    wrong: ["$L_1 L_2=0$ only", "$L_1=L_2$", "a circle"],
    why: "One parameter, all lines through the point.",
  });
}
