import type { PlayItem } from "../types";
import { choiceOf, cycle, mcq, nint, num } from "./build";

const G = 10;

/** Extra high-yield templates so 160 mill slots per chapter are not 6 shapes on repeat. */
export function masteryItem(id: string, i: number): PlayItem | null {
  return TABLE[id]?.(i) ?? null;
}

const TABLE: Record<string, (n: number) => PlayItem> = {
  "phy-units": units,
  "phy-motion-1d": mot1,
  "phy-motion-2d": mot2,
  "phy-nlm": nlm,
  "phy-wep": wep,
  "phy-rotation": rot,
  "phy-gravitation": grav,
  "phy-solids": solids,
  "phy-fluids": fluids,
  "phy-thermal": thermal,
  "phy-thermo": thermo,
  "phy-ktg": ktg,
  "phy-oscillations": osc,
  "phy-waves": waves,
  "phy-charges": charges,
  "phy-potential": pot,
  "phy-current": current,
  "phy-moving": moving,
  "phy-emi": emi,
  "phy-ac": ac,
  "phy-ray": ray,
  "phy-wave-opt": wo,
  "phy-dual": dual,
  "phy-atoms": atoms,
  "phy-nuclei": nuclei,
  "phy-experimental": experimental,
  "math-trig": trig,
  "math-binom": binom,
  "math-seq": seq,
  "math-pnc": pnc,
  "math-straight": straight,
  "math-conic": conic,
  "math-limits": limits,
  "math-int": integ,
  "math-de": de,
  "math-vec": vec,
  "math-invtrig": inv,
  "math-matrices": mat,
  "math-dets": dets,
  "math-prob-12": prob,
  "math-aod": aod,
  "math-cont": cont,
};

function units(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Which pair is dimensionally identical?",
      correct: cycle(["Work and torque", "Pressure and stress", "Impulse and momentum"], i),
      wrong: ["Force and energy", "Power and pressure", "Charge and current"],
      why: "Same MLT (and I) combination. Same dimensions ≠ same quantity.",
    });
  }
  if (m === 1) {
    const n = cycle([2, 3, 4], i);
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `Significant figures in $2.40\\times10^{${n}}$ are`,
      correct: "3",
      wrong: ["1", "2", String(n)],
      why: "Trailing zeros after the decimal in scientific notation count.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "Planck length $\\sqrt{\\hbar G/c^3}$ is constructed so that it has dimensions of",
      correct: "length",
      wrong: ["time", "mass", "energy"],
      why: "The unique combination of h, G, c with [L].",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Angle (radian) is",
      correct: "a dimensionless derived unit",
      wrong: ["an SI base unit", "dimension T⁻¹", "dimension L"],
      why: "Arc/radius. sin, cos of an angle are therefore dimensionless.",
    });
  }
  if (m === 4) {
    const msd = 1;
    const n = cycle([10, 20, 50], i);
    const vsd = ((n - 1) / n) * msd;
    const lc = msd - vsd;
    return num({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: `${n} VSD = ${n - 1} MSD, 1 MSD = 1 mm. Least count in mm is`,
      answer: nint(lc * 1000) / 1000,
      why: `LC = 1 − ${(n - 1) / n} = ${1 / n} mm.`,
    });
  }
  return mcq({
    chapterId: "phy-units",
    i,
    subject: "physics",
    stem: "Current is an SI base quantity. Charge is",
    correct: "derived (A s)",
    wrong: ["base", "dimensionless", "a vector base"],
    why: "Ampere is base; coulomb = A s.",
  });
}

function mot1(i: number): PlayItem {
  const u = choiceOf("phy-motion-1d", i, [0, 5, 10, 20]);
  const a = choiceOf("phy-motion-1d", i + 1, [2, 4, 5, 10]);
  const n = cycle([2, 3, 4, 5], i);
  const sn = u + 0.5 * a * (2 * n - 1);
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `Displacement in the ${n}th second if $u=${u}\\,\\mathrm{m/s}$, $a=${a}\\,\\mathrm{m/s^2}$ (metres) is`,
      answer: sn,
      why: `$s_n=u+\\tfrac12 a(2n-1)=${u}+\\tfrac12(${a})(${2 * n - 1})=${sn}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "Area under a v–t graph equals",
      correct: "displacement (signed)",
      wrong: ["distance always", "average speed", "jerk"],
      why: "∫v dt is Δx. Distance is ∫|v| dt.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "If a = a(x), the useful rewrite is",
      correct: "$v\\,dv=a\\,dx$",
      wrong: ["$v=u+at$ always", "$s=ut+\\tfrac12 at^2$ always", "$a=dv/dx$"],
      why: "Chain rule: a = v dv/dx. SUVAT needs constant a.",
    });
  }
  const h = cycle([20, 45, 80], i);
  const t = Math.sqrt((2 * h) / G);
  return num({
    chapterId: "phy-motion-1d",
    i,
    subject: "physics",
    stem: `Time to fall ${h} m from rest, g=${G} m/s², in seconds, is`,
    answer: t,
    why: `$h=\\tfrac12 gt^2\\Rightarrow t=\\sqrt{2h/g}=\\sqrt{${(2 * h) / G}}$.`,
  });
}

function mot2(i: number): PlayItem {
  const u = choiceOf("phy-motion-2d", i, [10, 20, 30]);
  const m = i % 5;
  if (m === 0) {
    const R = (u * u) / G;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Max range on level ground for $u=${u}\\,\\mathrm{m/s}$, $g=${G}$, in metres, is`,
      answer: R,
      why: `$R_{\\max}=u^2/g$ at $45^\\circ$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "$\\vec A\\cdot\\vec B=0$ means the vectors are",
      correct: "perpendicular",
      wrong: ["parallel", "equal", "anti-parallel"],
      why: "Dot product is AB cos θ.",
    });
  }
  if (m === 2) {
    const r = cycle([2, 4, 5], i);
    const v = cycle([4, 8, 10], i);
    const ac = (v * v) / r;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Centripetal acceleration for v=${v} m/s, r=${r} m, in m/s², is`,
      answer: ac,
      why: `$a_c=v^2/r=${v * v}/${r}=${ac}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "Trajectory of a projectile (no drag, uniform g) is a",
      correct: "parabola",
      wrong: ["circle", "ellipse", "straight line always"],
      why: "y = x tanθ − gx²/(2u² cos²θ).",
    });
  }
  return mcq({
    chapterId: "phy-motion-2d",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A man walks at v_m in rain falling vertically at v_r. Umbrella tilt from vertical is",
    correct: "$\\tan^{-1}(v_m/v_r)$",
    wrong: ["$\\tan^{-1}(v_r/v_m)$", "$\\sin^{-1}(v_m/v_r)$", "0"],
    why: "Relative velocity of rain w.r.t. man has a backward horizontal component v_m.",
  });
}

function nlm(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const mass = cycle([2, 4, 5], i);
    const a0 = cycle([2, 3, 4], i);
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `Pseudo force on ${mass} kg in a frame accelerating at ${a0} m/s² (magnitude, N) is`,
      answer: mass * a0,
      why: "$F_{pseudo}=m a_0$, opposite to the frame's acceleration.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "On a banked curve with no friction, $v^2=$",
      correct: "$rg\\tan\\theta$",
      wrong: ["$rg$", "$rg/\\tan\\theta$", "$r/g$"],
      why: "N sinθ = mv²/r, N cosθ = mg.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Impulse equals",
      correct: "change in momentum",
      wrong: ["change in KE", "force × distance", "power × time"],
      why: "J = ∫F dt = Δp.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Kinetic friction, once sliding, is",
      correct: "$\\mu_k N$, opposite velocity, roughly independent of speed",
      wrong: ["$\\mu_s N$ in the direction of F", "zero", "mg always"],
      why: "Laws of friction at JEE depth.",
    });
  }
  return mcq({
    chapterId: "phy-nlm",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "A string constraint on two masses over a pulley implies",
    correct: "the accelerations are related by string length being constant",
    wrong: ["both accelerations equal g", "tensions unequal on a massless string", "no relation"],
    why: "Differentiate ℓ₁+ℓ₂=const twice.",
  });
}

function wep(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const k = cycle([100, 200, 400], i);
    const x = cycle([0.1, 0.2, 0.05], i);
    const U = 0.5 * k * x * x;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Spring k=${k} N/m, stretch ${x} m. Elastic PE in joules is`,
      answer: U,
      why: `$U=\\tfrac12 kx^2=\\tfrac12(${k})(${x})^2=${U}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "Work–energy theorem states that net work equals",
      correct: "ΔK",
      wrong: ["ΔU", "ΔE mechanical always", "power"],
      why: "W_net = K_f − K_i, including work by friction.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "For a vertical loop on a string, minimum speed at the bottom is",
      correct: "$\\sqrt{5gR}$",
      wrong: ["$\\sqrt{gR}$", "$\\sqrt{2gR}$", "$\\sqrt{3gR}$"],
      why: "Top needs √(gR); energy then needs √(5gR) at the bottom.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "Equal-mass 2-D elastic collision: the scatter angle between the two velocities after is",
      correct: "$90^{\\circ}$",
      wrong: ["$0^{\\circ}$", "$45^{\\circ}$ always", "$180^{\\circ}$"],
      why: "From v₁·v₂ = 0 when m₁=m₂ and u₂=0.",
    });
  }
  const F = cycle([10, 20, 50], i);
  const v = cycle([2, 4, 5], i);
  return num({
    chapterId: "phy-wep",
    i,
    subject: "physics",
    stem: `Instantaneous power if F=${F} N along v=${v} m/s, in watts, is`,
    answer: F * v,
    why: "P = F·v.",
  });
}

function rot(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "MOI of a solid sphere about a diameter is",
      correct: "$\\tfrac25 MR^2$",
      wrong: ["$\\tfrac12 MR^2$", "$\\tfrac23 MR^2$", "$MR^2$"],
      why: "Standard table (no derivation in boards).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Rolling without slip on an incline: the fastest of ring, disc, solid sphere is the",
      correct: "solid sphere",
      wrong: ["ring", "disc", "all same"],
      why: "a = g sinθ / (1+k²/R²); sphere has smallest k/R.",
    });
  }
  if (m === 2) {
    const M = cycle([2, 4, 6], i);
    const R = cycle([0.2, 0.5, 1], i);
    const I = 0.5 * M * R * R;
    return num({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: `Disc mass ${M} kg, radius ${R} m, I about axis in kg m² is`,
      answer: I,
      why: `$I=\\tfrac12 MR^2=${I}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Parallel-axis theorem requires the new axis to be",
      correct: "parallel to a cm axis",
      wrong: ["any axis through the body", "perpendicular to the plane only", "through a rim point only"],
      why: "I = I_cm + Md², axes parallel.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Angular momentum of a rigid body about a fixed axis is",
      correct: "$L=I\\omega$",
      wrong: ["$L=mv$", "$L=I\\alpha$", "$L=\\tau t$ always"],
      why: "The rotational analogue of p = mv.",
    });
  }
  return mcq({
    chapterId: "phy-rotation",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Conservation of angular momentum needs",
    correct: "net external torque about that point/axis = 0",
    wrong: ["net external force = 0 always", "KE conserved", "massless objects only"],
    why: "τ_ext = dL/dt.",
  });
}

function grav(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "g at height h (h ≪ R) is approximately",
      correct: "$g(1-2h/R)$",
      wrong: ["$g(1-h/R)$", "$g(1+2h/R)$", "$g(1-h^2/R^2)$"],
      why: "g' = GM/(R+h)² ≈ g(1−2h/R).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "g at depth d is",
      correct: "$g(1-d/R)$",
      wrong: ["$g(1-2d/R)$", "$g(1+d/R)$", "0"],
      why: "Inside a uniform sphere E ∝ r, so g(r) = g r/R.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Escape speed from a planet’s surface is",
      correct: "$\\sqrt{2gR}$",
      wrong: ["$\\sqrt{gR}$", "$\\sqrt{GM/R}$", "$2gR$"],
      why: "½mv² = GMm/R ⇒ v=√(2GM/R)=√(2gR).",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Kepler’s 3rd law for circular orbits is",
      correct: "$T^2\\propto r^3$",
      wrong: ["$T^2\\propto r^2$", "$T\\propto r^3$", "$T^2\\propto 1/r$"],
      why: "From GMm/r² = mω²r and T=2π/ω.",
    });
  }
  return mcq({
    chapterId: "phy-gravitation",
    i,
    subject: "physics",
    stem: "Total energy of a satellite in circular orbit is",
    correct: "negative, $E=-GMm/(2r)$",
    wrong: ["zero", "positive $GMm/r$", "$-GMm/r$"],
    why: "K = GMm/(2r), U = −GMm/r, E = −K.",
  });
}

function solids(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Young’s modulus is",
      correct: "longitudinal stress / longitudinal strain",
      wrong: ["strain / stress", "shear stress / shear strain", "ΔV/V"],
      why: "Definition. Y has dimensions of pressure.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Elastic energy density (within Hooke) is",
      correct: "$\\tfrac12 \\times$ stress $\\times$ strain",
      wrong: ["stress × strain", "Y × strain", "½ Y"],
      why: "U = ½ × stress × strain × volume, so density is ½ σ ε.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Poisson’s ratio σ is",
      correct: "lateral strain / longitudinal strain, dimensionless",
      wrong: ["Y/B", "stress/strain", "ΔL/L"],
      why: "Definition. Typical metals ~0.3.",
    });
  }
  return mcq({
    chapterId: "phy-solids",
    i,
    subject: "physics",
    stem: "On a typical stress–strain curve, Hooke’s law holds",
    correct: "in the initial linear (elastic) region",
    wrong: ["past the yield point", "only at the breaking point", "never for metals"],
    why: "Stress ∝ strain only up to the proportional limit.",
  });
}

function fluids(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const h = cycle([2, 5, 10], i);
    const P = 1000 * G * h;
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Gauge pressure at ${h} m depth in water (ρ=1000), g=${G}, in pascal, is`,
      answer: P,
      why: "P = ρgh.",
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
      why: "Two surfaces. A liquid drop has 2S/r.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Stokes’ law: viscous drag on a sphere is",
      correct: "$6\\pi\\eta r v$",
      wrong: ["$6\\pi\\eta r^2 v$", "$4\\pi\\eta r v$", "$2\\pi\\eta r v$"],
      why: "Linear in r and v, low Reynolds.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Torricelli’s law: speed of efflux at depth h is",
      correct: "$\\sqrt{2gh}$",
      wrong: ["$\\sqrt{gh}$", "$2gh$", "$\\sqrt{2g/h}$"],
      why: "Bernoulli: P+ρgh = P + ½ρv².",
    });
  }
  return mcq({
    chapterId: "phy-fluids",
    i,
    subject: "physics",
    stem: "Pascal’s law is the working idea of a",
    correct: "hydraulic lift",
    wrong: ["venturi meter only", "pendulum", "transformer"],
    why: "Pressure is transmitted equally; F₂ = F₁ (A₂/A₁).",
  });
}

function thermal(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Density of water is maximum at",
      correct: "$4^{\\circ}\\mathrm{C}$",
      wrong: ["$0^{\\circ}\\mathrm{C}$", "$100^{\\circ}\\mathrm{C}$", "$-4^{\\circ}\\mathrm{C}$"],
      why: "Anomalous expansion.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "Wien’s displacement law is",
      correct: "$\\lambda_m T = $ constant",
      wrong: ["$P\\propto T^4$", "$H=KA\\Delta T/\\ell$", "$Q=mc\\Delta T$"],
      why: "Peak wavelength times T is b.",
    });
  }
  if (m === 2) {
    const T1 = cycle([300, 400, 600], i);
    const T2 = 2 * T1;
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: `A black body’s temperature doubles from ${T1} K to ${T2} K. Radiated power becomes`,
      correct: "16 times",
      wrong: ["2 times", "4 times", "8 times"],
      why: "P ∝ T⁴, 2⁴ = 16.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermal",
      i,
      subject: "physics",
      stem: "For isotropic solids, γ (volume expansion) is about",
      correct: "$3\\alpha$",
      wrong: ["$2\\alpha$", "$\\alpha$", "$\\alpha/3$"],
      why: "Three dimensions; β_area = 2α.",
    });
  }
  return mcq({
    chapterId: "phy-thermal",
    i,
    subject: "physics",
    stem: "Thermal stress in a rod fixed at both ends, heated by ΔT, is",
    correct: "$Y\\alpha\\Delta T$",
    wrong: ["$\\alpha\\Delta T$", "$Y\\Delta T$", "$Y/\\alpha\\Delta T$"],
    why: "Strain prevented = αΔT, stress = Y × strain.",
  });
}

function thermo(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Zeroth law of thermodynamics defines",
      correct: "temperature (thermal equilibrium is transitive)",
      wrong: ["entropy", "internal energy", "heat"],
      why: "If A~B and B~C then A~C.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "For an ideal gas, U depends on",
      correct: "T only",
      wrong: ["V only", "P only", "path"],
      why: "U is a state function of T for an ideal gas.",
    });
  }
  if (m === 2) {
    const Th = cycle([400, 500, 600], i);
    const Tc = cycle([300, 250, 200], i);
    const eta = nint((1 - Tc / Th) * 100);
    return num({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: `Carnot efficiency (%) between ${Th} K and ${Tc} K is`,
      answer: eta,
      why: `$\\eta=1-T_C/T_H=${1 - Tc / Th}$, as a percent ${eta}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Work by the system in a cyclic process equals",
      correct: "the area enclosed on the P–V diagram (and Q_net)",
      wrong: ["ΔU", "0 always", "nC_V ΔT"],
      why: "ΔU=0 on a cycle so Q_net = W_net = ∮ P dV.",
    });
  }
  return mcq({
    chapterId: "phy-thermo",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Free expansion of an ideal gas into vacuum: ΔT is",
    correct: "0",
    wrong: ["positive", "negative", "undefined"],
    why: "Q=W=0 ⇒ ΔU=0 ⇒ ΔT=0.",
  });
}

function ktg(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Order of the three speeds is",
      correct: "$v_{mp}<\\langle v\\rangle<v_{rms}$",
      wrong: ["$v_{rms}<\\langle v\\rangle<v_{mp}$", "all equal", "$\\langle v\\rangle<v_{mp}<v_{rms}$"],
      why: "√2 < √(8/π) < √3, times √(RT/M).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Average translational KE per molecule is",
      correct: "$\\tfrac32 kT$",
      wrong: ["$kT$", "$\\tfrac12 kT$", "$\\tfrac32 RT$"],
      why: "Equipartition, 3 translational quadratics. Per mole: 3/2 RT.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Room-temperature diatomic γ is",
      correct: "$7/5$",
      wrong: ["$5/3$", "$4/3$", "$9/7$"],
      why: "f=5, γ=1+2/f=1.4.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "v_rms is proportional to",
      correct: "$\\sqrt{T/M}$",
      wrong: ["$T/M$", "$T$", "$1/T$"],
      why: "v_rms = √(3RT/M).",
    });
  }
  return mcq({
    chapterId: "phy-ktg",
    i,
    subject: "physics",
    stem: "Mean free path at fixed T is proportional to",
    correct: "$1/P$",
    wrong: ["$P$", "$P^2$", "independent of P"],
    why: "λ ∝ 1/n and n=P/kT.",
  });
}

function osc(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const L = cycle([1, 0.25, 4], i);
    const T = 2 * Math.PI * Math.sqrt(L / G);
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Simple pendulum L=${L} m, g=${G}. Period in seconds (2 d.p. ok) is`,
      answer: nint(T * 100) / 100,
      tolerance: 0.05,
      why: `$T=2\\pi\\sqrt{L/g}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "In a lift accelerating upward at a, a pendulum’s T",
      correct: "decreases ($g_{\\mathrm{eff}}=g+a$)",
      wrong: ["increases", "unchanged", "becomes infinite"],
      why: "T=2π√(L/g_eff).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "Total energy of SHM is proportional to",
      correct: "$A^2$",
      wrong: ["$A$", "$A^3$", "independent of A"],
      why: "E = ½ k A².",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "A seconds pendulum has period",
      correct: "2 s",
      wrong: ["1 s", "π s", "0.5 s"],
      why: "One second each way.",
    });
  }
  return mcq({
    chapterId: "phy-oscillations",
    i,
    subject: "physics",
    stem: "v at displacement x in SHM of amplitude A is",
    correct: "$\\omega\\sqrt{A^2-x^2}$",
    wrong: ["$\\omega A$", "$\\omega x$", "$\\omega^2 x$"],
    why: "From E conservation, or v = ωA cos(ωt+φ).",
  });
}

function waves(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "A +x travelling wave is written",
      correct: "$A\\sin(kx-\\omega t)$",
      wrong: ["$A\\sin(kx+\\omega t)$", "$A\\sin\\omega t$ only", "$A\\cos kx$ only"],
      why: "kx−ωt constant ⇒ x increases with t.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Closed pipe of length L, fundamental is",
      correct: "$v/(4L)$",
      wrong: ["$v/(2L)$", "$v/L$", "$2v/L$"],
      why: "Quarter wavelength. Open is v/(2L).",
    });
  }
  if (m === 2) {
    const f1 = cycle([256, 300, 440], i);
    const f2 = f1 + cycle([4, 6, 8], i);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `Beat frequency of ${f1} Hz and ${f2} Hz is`,
      answer: f2 - f1,
      why: "|f1−f2|.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Wave speed on a string is",
      correct: "$\\sqrt{T/\\mu}$",
      wrong: ["$\\sqrt{\\mu/T}$", "$T/\\mu$", "$\\sqrt{T\\mu}$"],
      why: "Linear density μ = m/L.",
    });
  }
  return mcq({
    chapterId: "phy-waves",
    i,
    subject: "physics",
    exam: "advanced",
    stem: "Source moving toward a wall at v_s, observer at the source. Beat of direct and reflected is about",
    correct: "$2f v_s/v$",
    wrong: ["0", "$f v_s/v$", "$f$"],
    why: "Image source behind the wall, two Doppler shifts.",
  });
}

function charges(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Field inside a uniformly charged insulating sphere, r < R, is proportional to",
      correct: "$r$",
      wrong: ["$1/r^2$", "$1/r$", "constant"],
      why: "Gauss: Q_encl ∝ r³, E ∝ r.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Infinite non-conducting sheet: E on each side is",
      correct: "$\\sigma/(2\\varepsilon_0)$",
      wrong: ["$\\sigma/\\varepsilon_0$", "$\\sigma/(4\\pi\\varepsilon_0)$", "0"],
      why: "Conductor surface is σ/ε₀ just outside.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Torque on a dipole $\\vec p$ in uniform $\\vec E$ is",
      correct: "$\\vec p\\times\\vec E$",
      wrong: ["$pE$", "0 always", "$\\vec p\\cdot\\vec E$"],
      why: "τ = pE sinθ. Net force is 0 in a uniform field.",
    });
  }
  return mcq({
    chapterId: "phy-charges",
    i,
    subject: "physics",
    stem: "Gauss’s law is useful when the charge distribution has",
    correct: "spherical, cylindrical or planar symmetry",
    wrong: ["any shape", "only a point charge", "only a cube"],
    why: "|E| constant on the Gaussian surface is the whole trick.",
  });
}

function pot(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Inserting a dielectric κ with the battery connected: V is fixed, C becomes",
      correct: "$\\kappa C_0$, energy rises",
      wrong: ["$C_0/\\kappa$, energy falls", "unchanged", "κ² C_0"],
      why: "Isolated: Q fixed, V and U fall.",
    });
  }
  if (m === 1) {
    const C1 = cycle([2, 3, 4], i);
    const C2 = cycle([6, 6, 12], i);
    const Cs = (C1 * C2) / (C1 + C2);
    return num({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: `Series of ${C1} μF and ${C2} μF. Equivalent in μF is`,
      answer: Cs,
      why: "1/C = 1/C1+1/C2.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Energy stored in a capacitor is",
      correct: "$\\tfrac12 C V^2$",
      wrong: ["$CV$", "$C/V$", "$V/C$"],
      why: "Also Q²/(2C) = ½ QV.",
    });
  }
  return mcq({
    chapterId: "phy-potential",
    i,
    subject: "physics",
    stem: "Equipotential surfaces are",
    correct: "perpendicular to $\\vec E$; no work to move a charge on one",
    wrong: ["parallel to $\\vec E$", "the same as field lines", "undefined for a point charge"],
    why: "E = −∇V, so E ⊥ equipotential.",
  });
}

function current(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Drift speed v_d is related to current by",
      correct: "$I=neAv_d$",
      wrong: ["$I=nev_d$", "$I=nAv_d$", "$I=eAv_d$"],
      why: "n carriers per volume, charge e, area A.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Wheatstone is balanced when",
      correct: "$P/Q=R/S$",
      wrong: ["$P+Q=R+S$", "$P=Q=R=S$ only", "$PQ=RS$"],
      why: "Kirchhoff on the bridge, I_g = 0.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Emf ε, internal r, load R. Terminal V is",
      correct: "$\\varepsilon R/(R+r)$",
      wrong: ["$\\varepsilon$", "$\\varepsilon r/(R+r)$", "$\\varepsilon(R+r)/R$"],
      why: "I=ε/(R+r), V=IR.",
    });
  }
  return mcq({
    chapterId: "phy-current",
    i,
    subject: "physics",
    stem: "Kirchhoff’s junction rule is conservation of",
    correct: "charge",
    wrong: ["energy", "momentum", "mass"],
    why: "Loop rule is energy (or potential).",
  });
}

function moving(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Cyclotron frequency ω is",
      correct: "$|q|B/m$, independent of v",
      wrong: ["$mv/qB$", "$qB/v$", "dependent on radius only"],
      why: "r = mv/qB, ω = v/r = qB/m.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Force between two long parallel currents is attractive if the currents are",
      correct: "in the same direction",
      wrong: ["opposite", "always repulsive", "zero"],
      why: "Ampere’s definition setup; F/L = μ₀ I₁ I₂ /(2π d).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "To convert a galvanometer of resistance G to an ammeter of n times range, shunt S is",
      correct: "$G/(n-1)$",
      wrong: ["$(n-1)G$", "$nG$", "$G/n$"],
      why: "I_g G = (I−I_g)S with I = n I_g.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-moving",
      i,
      subject: "physics",
      stem: "Biot–Savart for a current element is proportional to",
      correct: "$I\\,dl\\sin\\theta/r^2$",
      wrong: ["$I\\,dl/r$", "$I/r^2$", "$q v B$"],
      why: "dB = (μ₀/4π) I dl sinθ / r².",
    });
  }
  return mcq({
    chapterId: "phy-moving",
    i,
    subject: "physics",
    stem: "Pitch of a helical path in uniform B is",
    correct: "$2\\pi m v_\\parallel / |q|B$",
    wrong: ["$mv_\\perp/qB$", "$2\\pi r$", "0"],
    why: "T = 2πm/qB, pitch = v_∥ T.",
  });
}

function emi(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const B = cycle([0.2, 0.5, 1], i);
    const ell = cycle([0.2, 0.5, 1], i);
    const v = cycle([2, 4, 10], i);
    const emf = B * ell * v;
    return num({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: `Motional emf: B=${B} T, ℓ=${ell} m, v=${v} m/s. Emf in volts is`,
      answer: emf,
      why: "ℰ = Bℓv.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "Lenz’s law is a consequence of conservation of",
      correct: "energy",
      wrong: ["charge only", "mass", "momentum only"],
      why: "Induced current fights the change; otherwise you would get free energy.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emi",
      i,
      subject: "physics",
      stem: "RL circuit time constant is",
      correct: "$L/R$",
      wrong: ["$RC$", "$\\sqrt{LC}$", "$R/L$"],
      why: "I = I₀(1−e^{−t/τ}), τ=L/R.",
    });
  }
  return mcq({
    chapterId: "phy-emi",
    i,
    subject: "physics",
    stem: "Energy stored in an inductor is",
    correct: "$\\tfrac12 L I^2$",
    wrong: ["$LI$", "$\\tfrac12 C V^2$", "$B^2/2\\mu_0$ only for a capacitor"],
    why: "Magnetic analogue of ½CV². Energy density B²/2μ₀ in the field.",
  });
}

function ac(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "RMS of I = I₀ sin ωt is",
      correct: "$I_0/\\sqrt{2}$",
      wrong: ["$I_0$", "$I_0/2$", "$I_0\\sqrt{2}$"],
      why: "Average of sin² over a cycle is ½.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Series LCR resonates at",
      correct: "$\\omega=1/\\sqrt{LC}$",
      wrong: ["$\\omega=R/L$", "$\\omega=\\sqrt{LC}$", "$\\omega=L/C$"],
      why: "X_L = X_C.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Average power in an AC circuit is",
      correct: "$V_{\\mathrm{rms}}I_{\\mathrm{rms}}\\cos\\phi$",
      wrong: ["$V_0 I_0$", "$V_{\\mathrm{rms}}I_{\\mathrm{rms}}$ always", "0 always"],
      why: "cosφ is the power factor. Wattless current is I sinφ.",
    });
  }
  return mcq({
    chapterId: "phy-ac",
    i,
    subject: "physics",
    stem: "Ideal transformer: V_s/V_p equals",
    correct: "$N_s/N_p$",
    wrong: ["$N_p/N_s$", "$I_s/I_p$", "$N_s N_p$"],
    why: "Also I_p/I_s. Power conserved.",
  });
}

function ray(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Critical angle for TIR, denser μ to air, is",
      correct: "$\\sin^{-1}(1/\\mu)$",
      wrong: ["$\\tan^{-1}\\mu$", "$\\mu$", "$\\sin^{-1}\\mu$"],
      why: "μ sin i_c = 1.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Two thin lenses in contact: 1/F =",
      correct: "$1/f_1+1/f_2$",
      wrong: ["$f_1+f_2$", "$f_1 f_2$", "$1/f_1-1/f_2$"],
      why: "Powers add (in contact, same medium).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Astronomical telescope in normal adjustment: magnifying power is",
      correct: "$-f_o/f_e$",
      wrong: ["$f_o+f_e$", "$f_e/f_o$", "$1+D/f$"],
      why: "Length f_o+f_e. Microscope is the 1+D/f family.",
    });
  }
  return mcq({
    chapterId: "phy-ray",
    i,
    subject: "physics",
    stem: "Prism μ in terms of A and δ_m is",
    correct: "$\\sin\\frac{A+\\delta_m}{2}\\big/\\sin\\frac A2$",
    wrong: ["$\\sin A/\\sin\\delta_m$", "$A/\\delta_m$", "$\\delta_m/A$"],
    why: "Minimum deviation formula.",
  });
}

function wo(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const lam = cycle([500, 600, 400], i);
    const D = cycle([1, 2, 1.5], i);
    const d = cycle([0.5, 1, 0.2], i);
    const beta = ((lam * 1e-9) * D) / (d * 1e-3);
    return num({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: `YDSE: λ=${lam} nm, D=${D} m, d=${d} mm. Fringe width in mm is`,
      answer: nint(beta * 1e3 * 100) / 100,
      tolerance: 0.05,
      why: "β = λD/d.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Huygens’ principle recovers",
      correct: "laws of reflection and refraction",
      wrong: ["Coulomb’s law", "Ampere’s law", "Bohr’s postulate"],
      why: "Envelope of secondary wavelets; equal triangles / speed ratio.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Sustained interference needs",
      correct: "coherent sources",
      wrong: ["two independent bulbs", "white light only", "a single slit only"],
      why: "Constant phase difference. YDSE derives two sources from one parent.",
    });
  }
  return mcq({
    chapterId: "phy-wave-opt",
    i,
    subject: "physics",
    stem: "Single-slit central maximum is wider if the slit is",
    correct: "narrower",
    wrong: ["wider", "unchanged", "infinitely wide"],
    why: "Width ~ λD/a. Qualitative treatment in the official list.",
  });
}

function dual(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Stopping potential vs frequency is a straight line of slope",
      correct: "$h/e$",
      wrong: ["$h$", "$e/h$", "φ"],
      why: "eV₀ = hν − φ.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Saturation photocurrent is proportional to",
      correct: "intensity (above threshold)",
      wrong: ["frequency", "stopping potential", "work function"],
      why: "More photons/sec ⇒ more electrons/sec. K_max depends on ν, not intensity.",
    });
  }
  return mcq({
    chapterId: "phy-dual",
    i,
    subject: "physics",
    stem: "de Broglie wavelength of an electron accelerated by V is proportional to",
    correct: "$1/\\sqrt{V}$",
    wrong: ["$V$", "$\\sqrt{V}$", "$1/V$"],
    why: "λ = h/√(2meV).",
  });
}

function atoms(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Bohr radius of the nth orbit in hydrogen is proportional to",
      correct: "$n^2$",
      wrong: ["$n$", "$1/n^2$", "$1/n$"],
      why: "r_n = n² a₀ / Z.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Energy of hydrogen’s nth orbit is",
      correct: "$-13.6/n^2$ eV",
      wrong: ["$-13.6 n^2$ eV", "$13.6/n$ eV", "$0$"],
      why: "E_n = −13.6 Z²/n². Photon from n₂→n₁ is the difference.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Balmer series is transitions to",
      correct: "n=2 (visible)",
      wrong: ["n=1 (UV, Lyman)", "n=3 (Paschen, IR)", "n=∞"],
      why: "Lyman UV, Balmer visible, Paschen IR.",
    });
  }
  return mcq({
    chapterId: "phy-atoms",
    i,
    subject: "physics",
    stem: "Rutherford’s model failed to explain",
      correct: "stability and the discrete spectrum",
      wrong: ["the nucleus being small", "most α going through", "large-angle scattering"],
    why: "Orbiting electrons would radiate classically. Bohr postulated stationary orbits.",
  });
}

function nuclei(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "BE per nucleon peaks near",
      correct: "iron-56",
      wrong: ["hydrogen", "uranium", "helium only"],
      why: "Why fission of heavy and fusion of light both release energy.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "1 u is about",
      correct: "931 MeV/c²",
      wrong: ["1 MeV/c²", "13.6 eV/c²", "1 GeV/c²"],
      why: "Mass defect Δm in u times 931 is BE in MeV.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Decay law: activity A is",
      correct: "$\\lambda N = A_0 e^{-\\lambda t}$",
      wrong: ["$N_0 t$", "$1/\\lambda$", "$N/t$"],
      why: "Half-life T_{1/2}=ln2/λ. Mean life 1/λ.",
    });
  }
  return mcq({
    chapterId: "phy-nuclei",
    i,
    subject: "physics",
    stem: "Nuclear force is",
    correct: "short-range, charge-independent, saturating",
    wrong: ["1/r² like Coulomb", "long-range only", "always repulsive"],
    why: "Official qualitative list.",
  });
}

function experimental(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Screw gauge, pitch 1 mm, 100 divisions. LC is",
      correct: "0.01 mm",
      wrong: ["0.1 mm", "1 mm", "0.001 mm"],
      why: "pitch/N.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "In Y ∝ 1/r², if Δr/r = 2% the contribution to ΔY/Y is",
      correct: "4%",
      wrong: ["2%", "1%", "8%"],
      why: "Power 2 multiplies the relative error.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Meter bridge: X/R =",
      correct: "$\\ell/(100-\\ell)$",
      wrong: ["$(100-\\ell)/\\ell$", "$\\ell/100$", "1"],
      why: "Wheatstone on a 100 cm wire.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-experimental",
      i,
      subject: "physics",
      stem: "Graph of T² vs L for a pendulum is a straight line of slope",
      correct: "$4\\pi^2/g$",
      wrong: ["$g/4\\pi^2$", "$2\\pi/g$", "$g$"],
      why: "T² = (4π²/g) L.",
    });
  }
  return mcq({
    chapterId: "phy-experimental",
    i,
    subject: "physics",
    stem: "Positive zero error of a vernier is",
    correct: "subtracted from the observed reading",
    wrong: ["added", "ignored", "equal to LC always"],
    why: "True = observed − zero error, with the sign defined on the closed-jaw diagram.",
  });
}

function trig(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$180^{\\circ}$ in radians is",
      correct: "$\\pi$",
      wrong: ["$2\\pi$", "$\\pi/2$", "$1$"],
      why: "π rad = 180°.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "In Q2, the positive trigonometric function is",
      correct: "sin (and csc)",
      wrong: ["cos", "tan", "all of them"],
      why: "ASTC / unit-circle signs.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin 2x$ equals",
      correct: "$2\\sin x\\cos x$",
      wrong: ["$\\sin^2 x$", "$2\\sin x$", "$\\cos^2 x-\\sin^2 x$"],
      why: "Double-angle. cos 2x has three forms.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\cos\\alpha-\\cos\\beta$ equals",
      correct: "$-2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}$",
      wrong: ["$2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}$", "$2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}$", "0"],
      why: "Official sum-to-product list.",
    });
  }
  return mcq({
    chapterId: "math-trig",
    i,
    subject: "maths",
    stem: "Range of $y=\\sin x$ is",
    correct: "$[-1,1]$",
    wrong: ["$\\mathbb R$", "$(0,1)$", "$[0,\\pi]$"],
    why: "Domain ℝ, period 2π.",
  });
}

function binom(i: number): PlayItem {
  const n = cycle([4, 5, 6, 8], i);
  const r = cycle([1, 2, 3], i);
  const m = i % 4;
  if (m === 0) {
    const c = fact(n) / (fact(r) * fact(n - r));
    return num({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: `$\\binom{${n}}{${r}}$ equals`,
      answer: c,
      why: "n! / (r!(n−r)!).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "General term of (x+y)^n is",
      correct: "$T_{r+1}=\\binom{n}{r}x^{n-r}y^r$",
      wrong: ["$T_r=x^n$", "$ny^{n}$", "$\\binom{n}{r}x^r$ only"],
      why: "r from 0 to n.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "Pascal’s identity is",
      correct: "$\\binom{n}{r}+\\binom{n}{r-1}=\\binom{n+1}{r}$",
      wrong: ["$\\binom{n}{r}=\\binom{n}{r+1}$", "$n!=n^n$", "no such identity"],
      why: "The triangle’s construction.",
    });
  }
  return mcq({
    chapterId: "math-binom",
    i,
    subject: "maths",
    stem: "Number of terms in (x+y)^n is",
    correct: "$n+1$",
    wrong: ["$n$", "$2n$", "$n!$"],
    why: "r = 0 to n.",
  });
}

function fact(n: number): number {
  let p = 1;
  for (let k = 2; k <= n; k++) p *= k;
  return p;
}

function seq(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const a = cycle([2, 3, 5], i);
    const r = cycle([2, 3, 0.5], i);
    if (Math.abs(r) >= 1) {
      const S = a * (1 - r ** 4) / (1 - r);
      return num({
        chapterId: "math-seq",
        i,
        subject: "maths",
        stem: `GP a=${a}, r=${r}. Sum of first 4 terms is`,
        answer: S,
        why: "S_n = a(r^n−1)/(r−1).",
      });
    }
    const Sinf = a / (1 - r);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `Infinite GP a=${a}, r=${r}. Sum is`,
      answer: Sinf,
      why: "S_∞ = a/(1−r) for |r|<1.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: "AM of a, b versus GM is",
      correct: "AM ≥ GM, equality iff a=b (a,b>0)",
      wrong: ["AM ≤ GM always", "AM = (a−b)/2", "GM = a+b"],
      why: "Official relation between AM and GM.",
    });
  }
  if (m === 2) {
    const n = cycle([5, 10, 20], i);
    const S = (n * (n + 1)) / 2;
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `$\\sum_{k=1}^{${n}} k$ equals`,
      answer: S,
      why: "n(n+1)/2.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: "Infinite GP converges only if",
      correct: "$|r|<1$",
      wrong: ["$r>1$", "$r=1$", "$r=0$ only"],
      why: "S_∞ = a/(1−r).",
    });
  }
  const a = cycle([2, 5, 10], i);
  const d = cycle([2, 3, 4], i);
  const n = cycle([5, 8, 10], i);
  const an = a + (n - 1) * d;
  return num({
    chapterId: "math-seq",
    i,
    subject: "maths",
    stem: `AP: a=${a}, d=${d}. The ${n}th term is`,
    answer: an,
    why: "a_n = a+(n−1)d.",
  });
}

function pnc(i: number): PlayItem {
  const n = cycle([5, 6, 7], i);
  const r = cycle([2, 3], i);
  const m = i % 4;
  if (m === 0) {
    const p = fact(n) / fact(n - r);
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `${n}P${r} equals`,
      answer: p,
      why: "n!/(n−r)!.",
    });
  }
  if (m === 1) {
    const c = fact(n) / (fact(r) * fact(n - r));
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `${n}C${r} equals`,
      answer: c,
      why: "n!/(r!(n−r)!). Also nPr / r!.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: "Circular permutations of n distinct objects:",
      correct: "$(n-1)!$",
      wrong: ["$n!$", "$n$", "$n^n$"],
      why: "Rotations identified; fix one seat.",
    });
  }
  return mcq({
    chapterId: "math-pnc",
    i,
    subject: "maths",
    stem: "0! equals",
    correct: "1",
    wrong: ["0", "undefined", "∞"],
    why: "By the recursive definition n! = n(n−1)! and 1!=1.",
  });
}

function straight(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Distance of (1,2) from 3x+4y−5=0 is (as a decimal, e.g. 1.2)",
      answer: 1.2,
      tolerance: 0.05,
      why: "|3+8−5|/5 = 6/5 = 1.2.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Slope of ax+by+c=0 is",
      correct: "$-a/b$",
      wrong: ["$a/b$", "$-b/a$", "$b/a$"],
      why: "y = −(a/b)x − c/b.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Two lines are perpendicular if",
      correct: "$m_1 m_2=-1$",
      wrong: ["$m_1=m_2$", "$m_1 m_2=1$", "$m_1+m_2=0$ always"],
      why: "tanθ infinite when 1+m1 m2=0.",
    });
  }
  return mcq({
    chapterId: "math-straight",
    i,
    subject: "maths",
    stem: "Intercept form with intercepts a, b is",
      correct: "$x/a+y/b=1$",
      wrong: ["$ax+by=1$", "$xy=ab$", "$y=ax+b$"],
    why: "Official list of forms.",
  });
}

function conic(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Eccentricity of a parabola is",
      correct: "1",
      wrong: ["0", "<1", ">1"],
      why: "Ellipse e<1, parabola 1, hyperbola >1, circle 0.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Focus of y²=4ax is",
      correct: "$(a,0)$",
      wrong: ["$(0,a)$", "$(2a,0)$", "$(0,0)$"],
      why: "Directrix x=−a. Parametric (at², 2at).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "A plane through the vertex of a cone can give the degenerate case of",
      correct: "a point, a line, or a pair of intersecting lines",
      wrong: ["only a circle", "a sphere", "nothing"],
      why: "Official degenerate list.",
    });
  }
  return mcq({
    chapterId: "math-conic",
    i,
    subject: "maths",
    stem: "x²+y²+2gx+2fy+c=0 has radius",
    correct: "$\\sqrt{g^2+f^2-c}$",
    wrong: ["$g+f$", "$\\sqrt{c}$", "$g^2+f^2$"],
    why: "Centre (−g,−f).",
  });
}

function limits(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{\\theta\\to0}\\sin\\theta/\\theta$ (θ in radians) is",
      correct: "1",
      wrong: ["0", "∞", "π/180"],
      why: "Standard. Degrees would give π/180.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "d/dx (sin x) is",
      correct: "$\\cos x$",
      wrong: ["$-\\sin x$", "$\\sin x$", "$-\\cos x$"],
      why: "And (cos x)' = −sin x.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "The derivative at a is the slope of the",
      correct: "tangent to y=f(x) at x=a",
      wrong: ["chord from 0 to a", "normal always", "secant at infinity"],
      why: "Official: derivative as slope and as rate of change of distance.",
    });
  }
  return mcq({
    chapterId: "math-limits",
    i,
    subject: "maths",
    stem: "(uv)' equals",
    correct: "$u'v+uv'$",
    wrong: ["$u'v'$", "$u'+v'$", "$uv$"],
    why: "Product rule. Quotient is (u'v−uv')/v².",
  });
}

function integ(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int dx/(x^2+a^2)$ equals",
      correct: "$(1/a)\\tan^{-1}(x/a)+C$",
      wrong: ["$\\ln|x^2+a^2|$", "$\\sin^{-1}(x/a)$", "$x^3/3$"],
      why: "Official type. 1/√(a²−x²) is sin⁻¹.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "Integration by parts is",
      correct: "$\\int u\\,dv=uv-\\int v\\,du$",
      wrong: ["$\\int uv=u\\int v$", "chain rule", "L'Hôpital"],
      why: "Official technique list: substitution, partial fractions, parts.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "FTC (without proof) says d/dx ∫_a^x f =",
      correct: "$f(x)$",
      wrong: ["$f(a)$", "$F(a)$", "0"],
      why: "And ∫_a^b f = F(b)−F(a).",
    });
  }
  return mcq({
    chapterId: "math-int",
    i,
    subject: "maths",
    stem: "$\\int dx/\\sqrt{a^2-x^2}$ equals",
    correct: "$\\sin^{-1}(x/a)+C$",
    wrong: ["$\\tan^{-1}(x/a)$", "$\\ln|x+\\sqrt{x^2-a^2}|$", "$\\sec^{-1}(x/a)$"],
    why: "Official type.",
  });
}

function de(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Integrating factor of dy/dx + P(x)y = Q(x) is",
      correct: "$e^{\\int P\\,dx}$",
      wrong: ["$e^{\\int Q\\,dx}$", "$\\int P$", "$P/Q$"],
      why: "Official linear type.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Homogeneous first-order: the substitution is",
      correct: "$y=vx$",
      wrong: ["$x=v^2$", "$y=e^x$", "$y'=v$"],
      why: "dy/dx = f(y/x).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Order of y'' + (y')³ + y = 0 is",
      correct: "2",
      wrong: ["1", "3", "0"],
      why: "Highest derivative is the second. Degree is 1 (power of y'').",
    });
  }
  return mcq({
    chapterId: "math-de",
    i,
    subject: "maths",
    stem: "The syllabus also lists the linear equation with x as dependent variable, of the form",
    correct: "$dx/dy + P(y)x = Q(y)$",
    wrong: ["$y''=0$ only", "$x^2+y^2=1$", "no such form"],
    why: "Same IF method, roles reversed.",
  });
}

function vec(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "Direction cosines satisfy",
      correct: "$l^2+m^2+n^2=1$",
      wrong: ["$l+m+n=1$", "$lmn=1$", "$l=m=n$"],
      why: "They are the components of a unit vector.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "a·b = 0 (nonzero vectors) means",
      correct: "perpendicular",
      wrong: ["parallel", "equal", "collinear"],
      why: "Cross product = 0 means parallel.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "Area of the parallelogram spanned by a, b is",
      correct: "$|\\vec a\\times\\vec b|$",
      wrong: ["$\\vec a\\cdot\\vec b$", "$|a|+|b|$", "$|a||b|$"],
      why: "|a||b|sinθ.",
    });
  }
  return mcq({
    chapterId: "math-vec",
    i,
    subject: "maths",
    stem: "Section formula, internal m:n, position vector is",
    correct: "$(n\\vec a+m\\vec b)/(m+n)$",
    wrong: ["$(\\vec a+\\vec b)/2$ always", "$m\\vec a+n\\vec b$", "$\\vec a-\\vec b$"],
    why: "Official applications list.",
  });
}

function inv(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Range of sin⁻¹ x is",
      correct: "$[-\\pi/2,\\pi/2]$",
      wrong: ["$[0,\\pi]$", "$\\mathbb R$", "$(-\\pi,\\pi)$"],
      why: "Principal value branch. cos⁻¹ is [0,π].",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "sin⁻¹x + cos⁻¹x equals",
      correct: "$\\pi/2$",
      wrong: ["0", "$\\pi$", "$x$"],
      why: "Standard identity on [−1,1].",
    });
  }
  return mcq({
    chapterId: "math-invtrig",
    i,
    subject: "maths",
    stem: "Domain of tan⁻¹ x is",
    correct: "$\\mathbb R$",
    wrong: ["$(-1,1)$", "$[0,\\pi]$", "$[-1,1]$"],
    why: "Range (−π/2, π/2).",
  });
}

function mat(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "AB = BA for all square A, B of order 2?",
      correct: "No — multiplication is not commutative",
      wrong: ["Yes always", "Yes if det=0", "Only over ℕ"],
      why: "Official bullet. Also AB=O with A,B ≠ O is possible.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "If an inverse exists, it is",
      correct: "unique",
      wrong: ["one of many", "A itself", "undefined"],
      why: "Official uniqueness proof (restrict to real entries, order 2 for the zero-product example).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "A skew-symmetric matrix has diagonal entries",
      correct: "all 0",
      wrong: ["all 1", "all equal to det", "arbitrary"],
      why: "A^T = −A ⇒ a_ii = −a_ii.",
    });
  }
  return mcq({
    chapterId: "math-matrices",
    i,
    subject: "maths",
    stem: "(AB)⁻¹ equals",
    correct: "$B^{-1}A^{-1}$",
    wrong: ["$A^{-1}B^{-1}$", "$AB$", "$BA$"],
    why: "Reverse the product.",
  });
}

function dets(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "A⁻¹, when it exists, is",
      correct: "$(\\mathrm{adj} A)/\\det A$",
      wrong: ["$\\mathrm{adj} A$", "$\\det A$", "$A^T$"],
      why: "A (adj A) = (det A) I.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "Area of a triangle with vertices (x_i,y_i) uses",
      correct: "½ |det of the 3×3 matrix with a column of 1s|",
      wrong: ["trace", "only the product x1 y2", "inverse"],
      why: "Official application of determinants.",
    });
  }
  return mcq({
    chapterId: "math-dets",
    i,
    subject: "maths",
    stem: "AX=B has a unique solution when",
    correct: "det A ≠ 0",
    wrong: ["det A = 0", "A is zero", "B is zero"],
    why: "Then X = A⁻¹ B. If det=0, inconsistent or infinitely many — check by example.",
  });
}

function prob(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "P(A|B) equals",
      correct: "$P(A\\cap B)/P(B)$",
      wrong: ["$P(A)/P(B)$", "$P(A)P(B)$", "$P(A\\cup B)$"],
      why: "Definition of conditional probability.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Independent events satisfy",
      correct: "$P(A\\cap B)=P(A)P(B)$",
      wrong: ["$P(A\\cup B)=P(A)P(B)$", "$P(A|B)=0$", "$A\\cap B=\\varnothing$"],
      why: "Mutually exclusive is the empty-intersection story, not independence.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Mean of a random variable X is",
      correct: "$\\sum x_i p_i$",
      wrong: ["$\\sum p_i$", "$\\sum x_i$", "$\\max x_i$"],
      why: "Official: random variable, distribution, mean.",
    });
  }
  return mcq({
    chapterId: "math-prob-12",
    i,
    subject: "maths",
    stem: "Bayes’ theorem reverses",
    correct: "the probability tree (posterior from prior × likelihood)",
    wrong: ["independence", "the mean", "a permutation"],
    why: "P(E_i|A) = P(E_i)P(A|E_i) / P(A).",
  });
}

function aod(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "If f'(c)=0 and f''(c)<0 then c is a",
      correct: "local maximum",
      wrong: ["local minimum", "neither", "point of inflection always"],
      why: "Second-derivative test. f''(c)=0 is inconclusive.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "f is increasing where",
      correct: "$f'\\ge 0$",
      wrong: ["$f'<0$", "$f''>0$ always", "$f=0$"],
      why: "Official: increasing/decreasing via the first derivative.",
    });
  }
  return mcq({
    chapterId: "math-aod",
    i,
    subject: "maths",
    stem: "Rate of change of y=f(x) with respect to t is",
    correct: "$f'(x)\\,dx/dt$",
    wrong: ["$f'(t)$ only", "$f(x)/t$", "0"],
    why: "Chain rule. Official ‘rate of change of quantities’.",
  });
}

function cont(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "d/dx sin⁻¹ x is",
      correct: "$1/\\sqrt{1-x^2}$",
      wrong: ["$1/(1+x^2)$", "$\\sqrt{1-x^2}$", "$-1/\\sqrt{1-x^2}$"],
      why: "tan⁻¹ is 1/(1+x²). Official inverse-trig list.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Differentiable at a implies",
      correct: "continuous at a",
      wrong: ["discontinuous", "f'' exists", "f is polynomial"],
      why: "Converse fails: |x| at 0.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Parametric dy/dx equals",
      correct: "$(dy/dt)/(dx/dt)$",
      wrong: ["$(dx/dt)/(dy/dt)$", "$xy$", "$t$"],
      why: "Official parametric forms.",
    });
  }
  return mcq({
    chapterId: "math-cont",
    i,
    subject: "maths",
    stem: "Logarithmic differentiation is the tool for",
    correct: "$y=[u(x)]^{v(x)}$",
    wrong: ["linear functions only", "definite integrals", "matrices"],
    why: "ln y = v ln u, then differentiate.",
  });
}
