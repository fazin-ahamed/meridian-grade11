import type { PlayItem } from "../types";
import { cycle, mcq, nint, num } from "./build";

/** Extra mill templates for chapters the first extra table left thin. */
export const MORE_TABLE: Record<string, (n: number) => PlayItem> = {
  "phy-solids": solids,
  "phy-thermal": thermal,
  "phy-ktg": ktg,
  "phy-mag-matter": magMatter,
  "phy-moving": moving,
  "phy-emw": emw,
  "phy-semiconductors": semi,
  "phy-experimental": experimental,
  "math-sets": sets,
  "math-rel-11": rel11,
  "math-ineq": ineq,
  "math-3d-11": threeD,
  "math-stats": stats,
  "math-prob-11": prob11,
  "math-rel-12": rel12,
  "math-invtrig": invtrig,
  "math-aoi": aoi,
  "math-de": de,
  "math-vec": vec,
  "math-3d-12": threeD12,
  "math-lpp": lpp,
};

function solids(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const F = cycle([50, 100, 200], i);
    const A = cycle([1, 2, 0.5], i);
    const L = cycle([2, 1, 4], i);
    const Y = 2e11;
    const dl = (F * L) / (A * 1e-6 * Y);
    return num({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: `A steel wire, $Y=2\\times10^{11}\\,\\mathrm{Pa}$, length ${L} m, area ${A} mm$^2$, load ${F} N. $\\Delta L$ in µm is`,
      answer: nint(dl * 1e6),
      tolerance: 1,
      why: `$\\Delta L=FL/(AY)=${F}\\times${L}/(${A}\\times10^{-6}\\times2\\times10^{11})$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Poisson’s ratio is",
      correct: "lateral strain / longitudinal strain",
      wrong: ["Y / G", "stress / strain", "ΔV / V"],
      why: "Definition. It is dimensionless.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Elastic energy density in the Hooke region is",
      correct: "$\\tfrac12$ stress $\\times$ strain",
      wrong: ["stress $\\times$ strain", "$Y(\\Delta L)$", "$F\\Delta L$"],
      why: "U = ½ × stress × strain × volume.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Young’s modulus has dimensions of",
      correct: "stress (pressure)",
      wrong: ["strain", "force", "energy"],
      why: "Strain is dimensionless, so [Y] = [stress].",
    });
  }
  return mcq({
    chapterId: "phy-solids",
    i,
    subject: "physics",
    stem: "The linear portion of a stress–strain curve is",
    correct: "Hooke’s law region",
    wrong: ["plastic flow", "necking", "UTS only"],
    why: "Y is the slope of that straight bit.",
  });
}

function thermal(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const L = cycle([1, 2, 0.5], i);
    const a = cycle([12, 10, 19], i);
    const dT = cycle([50, 80, 100], i);
    const dL = L * a * 1e-6 * dT;
    return num({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: `A rod $L=${L}$ m, $\\alpha=${a}\\times10^{-6}$ /K, heated by ${dT} K. $\\Delta L$ in mm is`,
      answer: nint(dL * 1e4) / 10,
      tolerance: 0.05,
      why: `$\\Delta L=L\\alpha\\Delta T$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Wien’s displacement law is",
      correct: "$\\lambda_m T = b$",
      wrong: ["$P=\\sigma AT^4$", "$H=KA\\Delta T/\\ell$", "$Q=mc\\Delta T$"],
      why: "Hotter body, smaller λ_m.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Anomalous expansion of water: density is maximum at",
      correct: "$4^\\circ$C",
      wrong: ["$0^\\circ$C", "$100^\\circ$C", "$-4^\\circ$C"],
      why: "Lakes freeze from the top.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Stefan’s law uses temperature in",
      correct: "kelvin",
      wrong: ["Celsius", "Fahrenheit", "any scale"],
      why: "T⁴ is meaningless in Celsius.",
    });
  }
  return mcq({
    chapterId: "phy-thermal",
    i,
    subject: "physics",
    stem: "Latent heat is absorbed",
    correct: "at constant temperature during a change of state",
    wrong: ["only when T rises", "only in gases", "never in ice"],
    why: "Plateau on the heating curve.",
  });
}

function ktg(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "rms speed is proportional to",
      correct: "$\\sqrt{T/M}$",
      wrong: ["$T/M$", "$T$", "$1/T$"],
      why: "$v_{rms}=\\sqrt{3RT/M}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "For a room-temperature diatomic gas, f is",
      correct: "5",
      wrong: ["3", "6", "7"],
      why: "3 trans + 2 rot; vibration frozen.",
    });
  }
  if (m === 2) {
    const T = cycle([300, 400, 273], i);
    const ratio = Math.sqrt(2);
    return num({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: `If T doubles from ${T} K, $v_{rms}$ is multiplied by (one decimal)`,
      answer: nint(ratio * 10) / 10,
      tolerance: 0.05,
      why: "√2 ≈ 1.4, independent of the starting T.",
    });
  }
  return mcq({
    chapterId: "phy-ktg",
    i,
    subject: "physics",
    stem: "Mean free path falls if you",
    correct: "raise the pressure (more n)",
    wrong: ["raise T at fixed n", "use smaller molecules only as 1/T", "lower n"],
    why: "$\\lambda=1/(\\sqrt{2} n \\pi d^2)$.",
  });
}

function magMatter(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "A superconductor is",
      correct: "perfectly diamagnetic ($\\chi=-1$)",
      wrong: ["ferromagnetic", "paramagnetic", "an insulator only"],
      why: "Meissner: B = 0 inside.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Curie’s law ($\\chi\\propto 1/T$) is for",
      correct: "paramagnets",
      wrong: ["diamagnets", "ferromagnets below $T_C$ only as is", "vacuum"],
      why: "Thermal agitation vs aligned dipoles.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Which is ferromagnetic?",
      correct: "Fe",
      wrong: ["Cu", "Bi", "Al"],
      why: "Fe, Co, Ni, Gd.",
    });
  }
  return mcq({
    chapterId: "phy-mag-matter",
    i,
    subject: "physics",
    stem: "Diamagnetic χ is",
    correct: "small and negative",
    wrong: ["large and positive", "zero", "infinite"],
    why: "Weakly repelled.",
  });
}

function moving(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const I = cycle([2, 5, 10], i);
    const d = cycle([0.5, 1, 2], i);
    const F = (2e-7 * I * I) / d;
    return num({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: `Force per metre between two long parallel wires, each ${I} A, ${d} m apart, in µN/m is (µ₀/4π = 10⁻⁷)`,
      answer: nint(F * 1e6),
      tolerance: 1,
      why: "$F/\\ell=\\mu_0 I^2/(2\\pi d)=2\\times10^{-7} I^2/d$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "A galvanometer is converted to an ammeter by a",
      correct: "low-resistance shunt in parallel",
      wrong: ["high R in series", "capacitor", "transformer"],
      why: "S = Ig G / (I − Ig).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "The SI definition of 1 A uses",
      correct: "force between two infinite parallel currents 1 m apart",
      wrong: ["charge of an electron", "Ohm’s law", "Faraday’s law"],
      why: "2 × 10⁻⁷ N/m by definition (older SI; still the JEE sentence).",
    });
  }
  return mcq({
    chapterId: "phy-moving",
    i,
    subject: "physics",
    stem: "Torque on a current loop is",
    correct: "$\\vec m \\times \\vec B$",
    wrong: ["$q\\vec v\\times\\vec B$", "$I\\ell B$", "zero always"],
    why: "m = I A; same as a dipole.",
  });
}

function emw(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Displacement current in a capacitor is",
      correct: "$\\varepsilon_0 d\\Phi_E/dt$",
      wrong: ["$\\sigma A$", "$I_{conduction}$ in the dielectric only if leaking", "$qv$"],
      why: "Maxwell’s correction; equals the wire current while charging.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Increasing frequency, the first after infrared is",
      correct: "visible",
      wrong: ["microwave", "radio", "γ-rays"],
      why: "radio → micro → IR → vis → UV → X → γ.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "In an EM wave in vacuum, $E/B$ equals",
      correct: "$c$",
      wrong: ["$1/c$", "$\\mu_0$", "1"],
      why: "And c = 1/√(μ₀ε₀).",
    });
  }
  return mcq({
    chapterId: "phy-emw",
    i,
    subject: "physics",
    stem: "EM waves are",
    correct: "transverse",
    wrong: ["longitudinal", "a mix always", "pressure waves"],
    why: "E, B, k mutually perpendicular.",
  });
}

function semi(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "n-type doping uses a",
      correct: "pentavalent impurity",
      wrong: ["trivalent impurity", "noble gas", "metal only"],
      why: "Extra electron → donor level.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "A p–n diode conducts when",
      correct: "forward biased (p to +)",
      wrong: ["reverse biased", "unbiased only", "either way equally"],
      why: "Barrier thins; I rises exponentially.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "Full-wave rectification uses (minimum)",
      correct: "two diodes (or a bridge of four)",
      wrong: ["one diode", "a resistor only", "an inductor only"],
      why: "Both half-cycles.",
    });
  }
  return mcq({
    chapterId: "phy-semiconductors",
    i,
    subject: "physics",
    stem: "The energy gap of a typical semiconductor is of order",
    correct: "1 eV",
    wrong: ["100 eV", "1 keV", "0 (overlap)"],
    why: "Insulators ≳ 3 eV; metals overlap.",
  });
}

function experimental(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Least count of a typical vernier is",
      correct: "$1\\,\\mathrm{MSD}-1\\,\\mathrm{VSD}$",
      wrong: ["1 MSD", "10 MSD", "the zero error"],
      why: "Usually 0.01 cm on a school vernier.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "A screw gauge’s pitch is 1 mm and there are 100 divisions. LC is",
      correct: "0.01 mm",
      wrong: ["0.1 mm", "1 mm", "0.001 mm"],
      why: "LC = pitch / n = 1/100 mm.",
    });
  }
  return num({
    chapterId: "phy-experimental",
    i,
    subject: "physics",
    stem: "True diameter = observed − zero error. Observed 5.12 mm, zero error +0.03 mm. True reading (mm) is",
    answer: 5.09,
    tolerance: 0.01,
    why: "Subtract a positive zero error.",
  });
}

function sets(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const a = cycle([10, 12, 8], i);
    const b = cycle([7, 9, 6], i);
    const both = cycle([3, 4, 2], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `$n(A)=${a}$, $n(B)=${b}$, $n(A\\cap B)=${both}$. $n(A\\cup B)$ is`,
      answer: a + b - both,
      why: "Inclusion-exclusion.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: "$(A\\cup B)'$ equals",
      correct: "$A'\\cap B'$",
      wrong: ["$A'\\cup B'$", "$A\\cap B$", "$U$"],
      why: "De Morgan.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: "The interval $[2,5)$ is",
      correct: "closed at 2, open at 5",
      wrong: ["open at both", "closed at both", "empty"],
      why: "Square vs round bracket.",
    });
  }
  return mcq({
    chapterId: "math-sets",
    i,
    subject: "maths",
    stem: "$A\\setminus B$ is",
    correct: "$A\\cap B'$",
    wrong: ["$A\\cup B$", "$A'$", "$B\\setminus A$ always"],
    why: "Elements of A not in B.",
  });
}

function rel11(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    const n = cycle([3, 4, 5], i);
    const p = cycle([2, 3, 2], i);
    return num({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: `$n(A)=${n}$, $n(B)=${p}$. $n(A\\times B)$ is`,
      answer: n * p,
      why: "Ordered pairs.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "The greatest-integer function $[x]$ is",
      correct: "continuous from the right, jumps at integers",
      wrong: ["continuous everywhere", "differentiable everywhere", "constant"],
      why: "A step graph.",
    });
  }
  return mcq({
    chapterId: "math-rel-11",
    i,
    subject: "maths",
    stem: "A function f: A → B assigns",
    correct: "exactly one image in B to each element of A",
    wrong: ["one or more images", "possibly none", "a subset of A to B"],
    why: "Definition.",
  });
}

function ineq(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "Multiplying an inequality by −3",
      correct: "reverses the inequality",
      wrong: ["preserves it", "makes it an equation", "is illegal"],
      why: "Negative multiplier flips.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "The largest integer x satisfying $2x-1\\le 9$ is",
      answer: 5,
      why: "2x ≤ 10, x ≤ 5.",
    });
  }
  return mcq({
    chapterId: "math-ineq",
    i,
    subject: "maths",
    stem: "$x>2$ on the number line is",
    correct: "an open ray to the right of 2",
    wrong: ["a closed ray", "the point 2", "the whole line"],
    why: "Open circle at 2.",
  });
}

function threeD(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return num({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Distance from $(1,2,2)$ to $(1,2,7)$ is",
      answer: 5,
      why: "Only z changes by 5.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "The plane z = 0 is the",
      correct: "xy-plane",
      wrong: ["yz-plane", "zx-plane", "origin"],
      why: "z vanished.",
    });
  }
  return mcq({
    chapterId: "math-3d-11",
    i,
    subject: "maths",
    stem: "A point in 3-D is an ordered",
    correct: "triple (x, y, z)",
    wrong: ["pair", "quadruple", "scalar"],
    why: "Three axes.",
  });
}

function stats(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return num({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Data 2, 4, 6, 8. Variance (population, /n) is",
      answer: 5,
      why: "Mean 5; deviations −3,−1,1,3; squares 9+1+1+9=20; /4 = 5.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Standard deviation is",
      correct: "the square root of variance",
      wrong: ["the range", "the mean", "the mean deviation always"],
      why: "σ = √(σ²).",
    });
  }
  return mcq({
    chapterId: "math-stats",
    i,
    subject: "maths",
    stem: "Range of 3, 9, 4, 11, 6 is",
    correct: "8",
    wrong: ["11", "3", "7"],
    why: "11 − 3 = 8.",
  });
}

function prob11(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return num({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "A fair die. P(even) as a decimal 0.x is",
      answer: 0.5,
      tolerance: 0.01,
      why: "3/6.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "P(A′) equals",
      correct: "$1-P(A)$",
      wrong: ["$P(A)$", "0", "$P(A)^2$"],
      why: "Complement.",
    });
  }
  return mcq({
    chapterId: "math-prob-11",
    i,
    subject: "maths",
    stem: "Mutually exclusive events satisfy",
    correct: "$P(A\\cap B)=0$",
    wrong: ["$P(A\\cap B)=P(A)P(B)$", "$P(A)=P(B)$", "they are independent"],
    why: "Cannot occur together. Independent is a different statement.",
  });
}

function rel12(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "An equivalence relation is",
      correct: "reflexive, symmetric and transitive",
      wrong: ["only symmetric", "only reflexive", "a function"],
      why: "It partitions the set.",
    });
  }
  if (m === 1) {
    const n = cycle([3, 4, 5], i);
    const fact = n === 3 ? 6 : n === 4 ? 24 : 120;
    return num({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: `Number of bijections of a ${n}-element set to itself is`,
      answer: fact,
      why: "n!.",
    });
  }
  return mcq({
    chapterId: "math-rel-12",
    i,
    subject: "maths",
    stem: "A one-one function is also called",
    correct: "injective",
    wrong: ["surjective", "constant", "even"],
    why: "Onto = surjective.",
  });
}

function invtrig(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Range of $\\sin^{-1}x$ is",
      correct: "$[-\\pi/2,\\pi/2]$",
      wrong: ["$[0,\\pi]$", "$\\mathbb R$", "$(0,\\pi)$"],
      why: "Principal branch.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "$\\sin^{-1}x+\\cos^{-1}x$ equals",
      correct: "$\\pi/2$",
      wrong: ["0", "$\\pi$", "$x$"],
      why: "On [−1, 1].",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Range of $\\tan^{-1}x$ is",
      correct: "$(-\\pi/2,\\pi/2)$",
      wrong: ["$[-\\pi/2,\\pi/2]$", "$[0,\\pi]$", "$\\mathbb R$"],
      why: "Open, because tan never attains those vertical asymptotes.",
    });
  }
  return num({
    chapterId: "math-invtrig",
    i,
    subject: "maths",
    stem: "$\\tan^{-1}1$ in degrees is",
    answer: 45,
    why: "Principal value.",
  });
}

function aoi(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area of the ellipse $x^2/a^2+y^2/b^2=1$ is",
      correct: "$\\pi ab$",
      wrong: ["$\\pi a^2$", "$4ab$", "$2\\pi ab$"],
      why: "Stretches the unit circle.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area under y = x from 0 to 2 is",
      answer: 2,
      why: "Triangle, (1/2)*2*2 = 2, or ∫x dx = 2.",
    });
  }
  return mcq({
    chapterId: "math-aoi",
    i,
    subject: "maths",
    stem: "Geometric area uses",
    correct: "$\\int |f|$ (or split at zeros)",
    wrong: ["always $\\int f$ even if f is negative", "the derivative", "a determinant only"],
    why: "Signed integral can cancel.",
  });
}

function de(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Order of $y'' + (y')^3 + y = 0$ is",
      correct: "2",
      wrong: ["3", "1", "0"],
      why: "Highest derivative is y''.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Degree of that same equation is",
      correct: "1",
      wrong: ["3", "2", "undefined"],
      why: "y'' appears to power 1; the cube is on y'.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "IF for $dy/dx + P(x)y = Q(x)$ is",
      correct: "$e^{\\int P\\,dx}$",
      wrong: ["$\\int P$", "$e^Q$", "$P'$"],
      why: "Then d/dx (y IF) = Q IF.",
    });
  }
  return mcq({
    chapterId: "math-de",
    i,
    subject: "maths",
    stem: "A homogeneous first-order DE is solved by",
    correct: "$y = vx$",
    wrong: ["Laplace transforms", "always by parts", "Cramer"],
    why: "Reduces to separable in v, x.",
  });
}

function vec(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$\\hat i\\cdot\\hat j + \\hat j\\cdot\\hat j$ equals",
      answer: 1,
      why: "0 + 1.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$l^2+m^2+n^2$ for direction cosines is",
      correct: "1",
      wrong: ["0", "3", "depends on the vector"],
      why: "cos²α + cos²β + cos²γ = 1.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$|\\vec a\\times\\vec b|$ is the area of the",
      correct: "parallelogram they span",
      wrong: ["triangle they span only (that is half)", "cube", "circle"],
      why: "ab sinθ.",
    });
  }
  return mcq({
    chapterId: "math-vec",
    i,
    subject: "maths",
    stem: "Two non-zero vectors are perpendicular iff",
    correct: "their dot product is 0",
    wrong: ["their cross product is 0", "they are equal", "their magnitudes are 1"],
    why: "Parallel ⇔ cross 0.",
  });
}

function threeD12(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Skew lines",
      correct: "are neither parallel nor intersecting",
      wrong: ["always intersect", "are coplanar", "are parallel"],
      why: "A 3-D phenomenon.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Vector equation of a line through $\\vec a$ along $\\vec b$ is",
      correct: "$\\vec r = \\vec a + \\lambda\\vec b$",
      wrong: ["$\\vec r\\cdot\\vec b = 0$", "$\\vec r = \\vec a\\times\\vec b$", "$\\vec r = \\lambda\\vec a$"],
      why: "Definition.",
    });
  }
  return mcq({
    chapterId: "math-3d-12",
    i,
    subject: "maths",
    stem: "Shortest distance between two skew lines uses",
    correct: "the unit vector along $\\vec b_1\\times\\vec b_2$",
    wrong: ["their sum", "a 2-D formula", "integration"],
    why: "The common perpendicular.",
  });
}

function lpp(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-lpp",
      i,
      subject: "maths",
      stem: "A linear objective on a polygonal feasible region attains its max at",
      correct: "a vertex (corner point)",
      wrong: ["the centroid always", "an interior point", "infinity always"],
      why: "Corner-point theorem.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-lpp",
      i,
      subject: "maths",
      stem: "An empty intersection of half-planes means the LPP is",
      correct: "infeasible",
      wrong: ["unbounded", "optimal at 0", "solved by Bayes"],
      why: "No feasible point.",
    });
  }
  return mcq({
    chapterId: "math-lpp",
    i,
    subject: "maths",
    stem: "Boards / Main LPP is solved by the",
    correct: "graphical method in two variables",
    wrong: ["simplex in ten variables", "Fourier series", "Laplace"],
      why: "Up to three non-trivial constraints.",
  });
}
