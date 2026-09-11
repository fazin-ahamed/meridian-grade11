import type { PlayItem } from "../types";
import { cycle, mcq, nint, num } from "./build";

/** Official-syllabus mill: extra shapes so 220 slots are not six templates on loop. */
export function officialItem(id: string, i: number): PlayItem | null {
  return TABLE[id]?.(i) ?? null;
}

const TABLE: Record<string, (n: number) => PlayItem> = {
  "phy-motion-1d": mot1,
  "phy-motion-2d": mot2,
  "phy-wep": wep,
  "phy-gravitation": grav,
  "phy-fluids": fluids,
  "phy-solids": solids,
  "phy-charges": charges,
  "phy-current": current,
  "phy-atoms": atoms,
  "phy-semiconductors": semi,
  "phy-emw": emw,
  "phy-mag-matter": mag,
  "phy-oscillations": osc,
  "phy-waves": waves,
  "phy-thermo": thermo,
  "phy-ktg": ktg,
  "phy-ray": ray,
  "phy-wave-opt": wo,
  "phy-dual": dual,
  "phy-nuclei": nuclei,
  "phy-ac": ac,
  "phy-potential": pot,
  "phy-nlm": nlm,
  "phy-rotation": rot,
  "phy-units": units,
  "math-sets": sets,
  "math-rel-11": rel11,
  "math-rel-12": rel12,
  "math-trig": trig,
  "math-ineq": ineq,
  "math-pnc": pnc,
  "math-binom": binom,
  "math-seq": seq,
  "math-straight": straight,
  "math-conic": conic,
  "math-3d-11": d11,
  "math-limits": limits,
  "math-stats": stats,
  "math-prob-11": p11,
  "math-invtrig": inv,
  "math-matrices": mat,
  "math-dets": dets,
  "math-cont": cont,
  "math-aod": aod,
  "math-int": integ,
  "math-aoi": aoi,
  "math-de": de,
  "math-vec": vec,
  "math-3d-12": d12,
  "math-lpp": lpp,
  "math-prob-12": p12,
  "math-complex": cplx,
};

function mot1(i: number): PlayItem {
  const m = i % 8;
  if (m === 0) {
    const u = cycle([10, 20, 5], i);
    const t = cycle([2, 4, 3], i);
    const a = cycle([2, 5, 10], i);
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `$u=${u}\\,\\mathrm{m/s}$, $a=${a}\\,\\mathrm{m/s^2}$, $t=${t}\\,\\mathrm{s}$. Displacement $s$ (m) is`,
      answer: u * t + 0.5 * a * t * t,
      why: "$s=ut+\\tfrac12 at^2$ — official uniformly accelerated relation.",
    });
  }
  if (m === 1) {
    const u = cycle([20, 30, 10], i);
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      exam: "boards",
      stem: `Free fall, $u=${u}\\,\\mathrm{m/s}$ up, $g=10$. Time of flight (s) back to the throw point is`,
      answer: (2 * u) / 10,
      why: "$T=2u/g$. Signed $a=-g$ if up is positive.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "Area under a $v$–$t$ graph equals",
      correct: "displacement (signed)",
      wrong: ["distance always", "acceleration", "jerk"],
      why: "Distance needs $\\int|v|\\,dt$. Official graph treatment.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: "Instantaneous velocity is",
      correct: "slope of the $x$–$t$ tangent",
      wrong: ["area under $x$–$t$", "slope of $a$–$t$", "chord of $v$–$t$"],
      why: "$v=dx/dt$. Elementary differentiation as listed.",
    });
  }
  if (m === 4) {
    const v = cycle([8, 12, 6], i);
    const t = cycle([4, 3, 2], i);
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      stem: `A $v$–$t$ triangle from 0 to ${v} m/s$ in ${t} s then back to 0 in another ${t} s. Distance (m)?`,
      answer: v * t,
      why: "Two triangles, each $\\tfrac12 v t$. $v$ never negative ⇒ distance = displacement = $vt$.",
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "If $a=a(x)$, the useful rewrite is",
      correct: "$v\\,dv=a\\,dx$",
      wrong: ["$v=u+at$ always", "$s=ut$", "$a=0$"],
      why: "Chain rule. SUVAT dies when $a$ is not constant.",
    });
  }
  if (m === 6) {
    const u = cycle([5, 8, 10], i);
    const a = cycle([2, 4, 1], i);
    const n = cycle([3, 4, 5], i);
    const sn = u + 0.5 * a * (2 * n - 1);
    return num({
      chapterId: "phy-motion-1d",
      i,
      subject: "physics",
      exam: "boards",
      stem: `$u=${u}$, $a=${a}$. Displacement in the ${n}th second (m) is`,
      answer: sn,
      why: "$s_n=u+\\tfrac12 a(2n-1)$. Official uniformly accelerated extra.",
    });
  }
  return mcq({
    chapterId: "phy-motion-1d",
    i,
    subject: "physics",
    stem: "Average speed on a round trip with equal times at $v$ and $2v$ is",
    correct: "$1.5 v$",
    wrong: ["$1.5$ only if equal distances", "$2v$", "$v$"],
    why: "Equal times: arithmetic mean. Equal distances would be harmonic $4v/3$.",
  });
}

function mot2(i: number): PlayItem {
  const m = i % 8;
  if (m === 0) {
    const u = cycle([20, 10, 30], i);
    const R = (u * u) / 10;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `Level projectile, $u=${u}\\,\\mathrm{m/s}$, $\\theta=45^{\\circ}$, $g=10$. Range (m) is`,
      answer: R,
      why: "$R=u^2/g$ at $45^{\\circ}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "$\\vec a\\cdot\\vec b=0$ (neither zero) means",
      correct: "the vectors are perpendicular",
      wrong: ["parallel", "equal", "anti-parallel"],
      why: "Official scalar product. Cross = 0 means parallel.",
    });
  }
  if (m === 2) {
    const a = cycle([3, 4, 5], i);
    const b = cycle([4, 3, 12], i);
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `$\\vec a=(${a},0)$, $\\vec b=(0,${b})$. $|\\vec a\\times\\vec b|$ is`,
      answer: a * b,
      why: "Perpendicular in the plane: $ab\\sin 90^{\\circ}=ab$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "In UCM, centripetal acceleration is",
      correct: "$v^2/r$ toward the centre",
      wrong: ["$v/r$ tangential", "zero because speed is constant", "$g$ always"],
      why: "Kinematic. The force that provides it is the next chapter.",
    });
  }
  if (m === 4) {
    const u = cycle([20, 40, 10], i);
    const H = (u * u * 0.25) / 20;
    return num({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: `$u=${u}\\,\\mathrm{m/s}$, $\\theta=30^{\\circ}$, $g=10$. Max height (m) is`,
      answer: H,
      why: "$H=u^2\\sin^2\\theta/(2g)$. $\\sin 30=1/2$.",
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      stem: "Complementary projection angles share",
      correct: "range on level ground",
      wrong: ["max height", "time of flight", "speed at top"],
      why: "$\\sin(180^{\\circ}-2\\theta)=\\sin 2\\theta$. $H$ and $T$ prefer the larger $\\sin\\theta$.",
    });
  }
  if (m === 6) {
    return mcq({
      chapterId: "phy-motion-2d",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "A unit vector in the $xy$ plane at angle $\\theta$ to $+x$ is",
      correct: "$\\cos\\theta\\,\\hat\\imath+\\sin\\theta\\,\\hat\\jmath$",
      wrong: ["$\\sin\\theta\\,\\hat\\imath+\\cos\\theta\\,\\hat\\jmath$", "$\\theta\\,\\hat\\imath$", "$\\hat\\imath+\\hat\\jmath$"],
      why: "Official: resolution into rectangular components.",
    });
  }
  return mcq({
    chapterId: "phy-motion-2d",
    i,
    subject: "physics",
    stem: "Trajectory of a projectile (no air) is",
    correct: "a parabola",
    wrong: ["a circle", "a hyperbola", "a straight line always"],
    why: "$y=ax-bx^2$. Official ‘uniform acceleration in a plane’.",
  });
}

function wep(i: number): PlayItem {
  const m = i % 7;
  if (m === 0) {
    const m1 = cycle([2, 4, 1], i);
    const v = cycle([3, 4, 6], i);
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Kinetic energy of ${m1} kg at ${v} m/s, in joule, is`,
      answer: 0.5 * m1 * v * v,
      why: "$K=\\tfrac12 mv^2$.",
    });
  }
  if (m === 1) {
    const k = cycle([100, 200, 50], i);
    const x = cycle([0.1, 0.2, 0.4], i);
    const U = 0.5 * k * x * x;
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Spring $k=${k}\\,\\mathrm{N/m}$, stretch ${x} m. $U$ (J) is`,
      answer: U,
      why: "$U=\\tfrac12 kx^2$. Official potential energy of a spring.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "Work–energy theorem says $W_{\\mathrm{net}}$ equals",
      correct: "$\\Delta K$",
      wrong: ["$\\Delta U$ always", "$P$", "0"],
      why: "Always, including non-conservative work.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      exam: "advanced",
      stem: "Equal-mass 2-D elastic collision, target at rest: the departure velocities are",
      correct: "perpendicular",
      wrong: ["parallel", "always equal", "undefined"],
      why: "Official 2-D collision extra. $u_1^2=v_1^2+v_2^2$ plus momentum.",
    });
  }
  if (m === 4) {
    const r = cycle([2, 5, 1], i);
    const v = nint(Math.sqrt(5 * 10 * r));
    return num({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: `Vertical loop, $g=10$, radius ${r} m. Minimum speed at the bottom for a full loop (m/s), nearest integer, is`,
      answer: v,
      why: "$\\sqrt{5gr}$. Energy + $T\\ge 0$ at the top.",
      tolerance: 1,
    });
  }
  if (m === 5) {
    return mcq({
      chapterId: "phy-wep",
      i,
      subject: "physics",
      stem: "A conservative force is one for which",
      correct: "work around every closed loop is zero",
      wrong: ["friction is an example", "power is always zero", "$K$ is constant"],
      why: "Then $U$ exists with $F=-dU/dx$.",
    });
  }
  return mcq({
    chapterId: "phy-wep",
    i,
    subject: "physics",
    stem: "Power delivered by a force is",
    correct: "$\\vec F\\cdot\\vec v$",
    wrong: ["$Fv$ always", "$F/v$", "$mv$"],
    why: "$P=dW/dt$. Official.",
  });
}

function grav(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Kepler’s second law is equivalent to conservation of",
      correct: "angular momentum about the sun",
      wrong: ["energy only", "linear momentum of the sun", "mass"],
      why: "Equal areas in equal times.",
    });
  }
  if (m === 1) {
    const hR = cycle([1, 2, 3], i);
    const factor = 1 / ((1 + hR) * (1 + hR));
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: `g at height $h=${hR}R$ compared with surface g is`,
      correct: `${factor.toFixed(3)} g`.replace(/0+$/, "").replace(/\.$/, ""),
      wrong: ["g/2", "2g", "0"],
      why: "$g_h=g R^2/(R+h)^2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Escape speed from a planet’s surface is",
      correct: "$\\sqrt{2GM/R}$",
      wrong: ["$\\sqrt{GM/R}$", "$GM/R$", "$2gR$"],
      why: "Orbital circular is $\\sqrt{GM/R}$. Escape is $\\sqrt{2}$ times that.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      stem: "Total energy of a satellite in a circular orbit of radius r is",
      correct: "$-GMm/(2r)$",
      wrong: ["$-GMm/r$", "$+GMm/(2r)$", "0"],
      why: "$K=+GMm/(2r)$, $U=-GMm/r$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-gravitation",
      i,
      subject: "physics",
      exam: "boards",
      stem: "g at depth $d$ (uniform sphere) is",
      correct: "$g(1-d/R)$",
      wrong: ["$g(1-2d/R)$", "$g R^2/(R+d)^2$", "0 for any d"],
      why: "The $(1-2h/R)$ form is altitude, not depth.",
    });
  }
  return mcq({
    chapterId: "phy-gravitation",
    i,
    subject: "physics",
    stem: "Kepler III for circles follows from Newton as",
    correct: "$T^2=4\\pi^2 r^3/(GM)$",
    wrong: ["$T\\propto r$", "$T^2\\propto 1/r$", "$T\\propto r^3$"],
    why: "Centripetal $GM/r^2=\\omega^2 r$.",
  });
}

function fluids(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
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
  if (m === 1) {
    const h = cycle([5, 10, 20], i);
    return num({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: `Torricelli: hole ${h} m below the free surface, $g=10$. Efflux speed (m/s) is`,
      answer: nint(Math.sqrt(2 * 10 * h)),
      why: "$v=\\sqrt{2gh}$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Hydraulic lift multiplies force by",
      correct: "the area ratio $A_2/A_1$",
      wrong: ["the height ratio", "viscosity", "surface tension"],
      why: "Pascal. Official application.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Stokes’ law for a sphere is $F=$",
      correct: "$6\\pi\\eta r v$",
      wrong: ["$6\\pi\\eta r^2 v$", "$4\\pi\\eta r v$", "$\\eta v/r$"],
      why: "Terminal $v_t=2r^2(\\rho-\\sigma)g/(9\\eta)$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-fluids",
      i,
      subject: "physics",
      stem: "Bernoulli along a streamline (ideal, steady) conserves",
      correct: "$P+\\rho gh+\\tfrac12\\rho v^2$",
      wrong: ["$P$ only", "$v$ only", "$P/\\rho+v$"],
      why: "Energy per volume. Torricelli and dynamic lift are applications.",
    });
  }
  return mcq({
    chapterId: "phy-fluids",
    i,
    subject: "physics",
    stem: "Capillary rise $h$ is proportional to",
    correct: "$1/r$",
    wrong: ["$r$", "$r^2$", "independent of $r$"],
    why: "$h=2S\\cos\\theta/(\\rho g r)$. Narrower tube, higher climb.",
  });
}

function solids(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Young’s modulus is",
      correct: "longitudinal stress / longitudinal strain",
      wrong: ["strain / stress", "bulk modulus", "a dimensionless ratio"],
      why: "Hooke’s law in the linear region. Strain is dimensionless.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Elastic energy density is",
      correct: "$\\tfrac12\\times$ stress $\\times$ strain",
      wrong: ["stress $\\times$ strain", "$Y$ only", "Poisson’s ratio"],
      why: "Official elastic energy.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Poisson’s ratio is",
      correct: "lateral strain / longitudinal strain",
      wrong: ["$Y/B$", "stress / strain", "always 1"],
      why: "Qualitative in the syllabus; the definition is still asked.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-solids",
      i,
      subject: "physics",
      stem: "Strain is",
      correct: "dimensionless",
      wrong: ["MLT⁻²", "a force", "always 1"],
      why: "Ratio of two lengths (or two volumes, or an angle).",
    });
  }
  return mcq({
    chapterId: "phy-solids",
    i,
    subject: "physics",
    stem: "A large Young’s modulus means the material is",
    correct: "stiff",
    wrong: ["always strong", "always ductile", "a fluid"],
    why: "Stiffness ≠ strength. Strength is breaking stress.",
  });
}

function charges(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Gauss: field of an infinite plane sheet is",
      correct: "$\\sigma/(2\\varepsilon_0)$",
      wrong: ["$\\sigma/\\varepsilon_0$", "$\\lambda/(2\\pi\\varepsilon_0 r)$", "0"],
      why: "Independent of distance. Official application.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Field inside a uniformly charged thin spherical shell is",
      correct: "0",
      wrong: ["$kq/r^2$", "$kq/R^2$", "$\\sigma/\\varepsilon_0$"],
      why: "Gauss, $q_{\\mathrm{enc}}=0$. Outside it is a point charge.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Torque on a dipole in a uniform electric field is",
      correct: "$\\vec p\\times\\vec E$",
      wrong: ["$\\vec p\\cdot\\vec E$", "0 always", "$qE$"],
      why: "Net force is 0; net torque is not, unless aligned.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Infinite line charge: $E$ equals",
      correct: "$\\lambda/(2\\pi\\varepsilon_0 r)$",
      wrong: ["$\\lambda/(4\\pi\\varepsilon_0 r^2)$", "$\\sigma/(2\\varepsilon_0)$", "$kq/r^2$"],
      why: "Cylindrical Gauss pill.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-charges",
      i,
      subject: "physics",
      stem: "Superposition for Coulomb forces means",
      correct: "vector sum over every pair",
      wrong: ["only the nearest charge counts", "scalars add", "forces cancel in pairs always"],
      why: "Official: forces between multiple charges.",
    });
  }
  return mcq({
    chapterId: "phy-charges",
    i,
    subject: "physics",
    stem: "On the axis of an electric dipole, $E$ is proportional to",
    correct: "$1/r^3$ (far field)",
    wrong: ["$1/r^2$", "$1/r$", "constant"],
    why: "$2kp/r^3$ along $\\vec p$. Equator is half and opposite.",
  });
}

function current(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "$I=neAv_d$ identifies $v_d$ as",
      correct: "drift speed",
      wrong: ["thermal speed", "speed of light", "Fermi speed"],
      why: "Official relation of drift with current.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Wheatstone is balanced when",
      correct: "$P/Q=R/S$",
      wrong: ["$P+Q=R+S$", "$P=Q=R=S$ only", "$I_g$ is maximum"],
      why: "Then $I_g=0$. Meter bridge is this on a wire.",
    });
  }
  if (m === 2) {
    const E = cycle([2, 3, 6], i);
    const r = cycle([1, 2, 0.5], i);
    const R = cycle([3, 4, 5], i);
    const I = E / (r + R);
    return num({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: `Cell $\\mathcal{E}=${E}\\,\\mathrm{V}$, $r=${r}\\,\\Omega$, load $R=${R}\\,\\Omega$. Current (A) is`,
      answer: Math.round(I * 1000) / 1000,
      why: "$I=\\mathcal{E}/(R+r)$. Terminal $V=\\mathcal{E}-Ir$.",
      tolerance: 0.01,
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
      why: "Loop rule is energy. Official pair.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "phy-current",
      i,
      subject: "physics",
      stem: "Resistivity $\\rho$ of a metal generally, on heating,",
      correct: "increases",
      wrong: ["decreases", "is constant", "becomes negative"],
      why: "$\\rho=\\rho_0(1+\\alpha\\Delta T)$, $\\alpha>0$ for metals.",
    });
  }
  return mcq({
    chapterId: "phy-current",
    i,
    subject: "physics",
      stem: "A linear $V$–$I$ graph through the origin means",
    correct: "ohmic behaviour, slope $=R$",
    wrong: ["a diode", "$R=0$", "superconductor only"],
    why: "Official linear vs non-linear characteristics.",
  });
}

function atoms(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Bohr radius of H in the ground state is about",
      correct: "$0.529\\,\\mathrm{\\AA}$",
      wrong: ["$1\\,\\mathrm{fm}$", "$13.6\\,\\mathrm{\\AA}$", "$3\\times 10^8\\,\\mathrm{m}$"],
      why: "$r_n=n^2 a_0$. Official radius of the nth orbit.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "$E_n$ for hydrogen is",
      correct: "$-13.6/n^2\\,\\mathrm{eV}$",
      wrong: ["$-13.6 n^2$", "$+13.6/n$", "0"],
      why: "Photon $h\\nu=13.6(1/n_1^2-1/n_2^2)$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Balmer lines of hydrogen land on",
      correct: "$n=2$ (visible)",
      wrong: ["$n=1$ (Lyman, UV)", "$n=3$ (Paschen, IR)", "the nucleus"],
      why: "Qualitative hydrogen spectrum, official.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-atoms",
      i,
      subject: "physics",
      stem: "Rutherford’s $\\alpha$-scattering showed",
      correct: "a tiny positive nucleus",
      wrong: ["electrons in shells as Bohr", "neutrons", "quark structure"],
      why: "Most $\\alpha$ pass; a few bounce.",
    });
  }
  return num({
    chapterId: "phy-atoms",
    i,
    subject: "physics",
    stem: "Energy (eV, magnitude) of H in $n=2$ is 13.6 / what integer?",
    answer: 4,
    why: "$n^2=4$, $|E|=3.4\\,\\mathrm{eV}$.",
  });
}

function semi(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "n-type doping uses",
      correct: "pentavalent donors",
      wrong: ["trivalent acceptors", "insulators", "noble gases"],
      why: "P, As, Sb in Si. Majority carriers are electrons. Crystal stays neutral.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "A p–n diode as a rectifier",
      correct: "passes one half-cycle of AC",
      wrong: ["amplifies", "oscillates", "stores charge like a cell"],
      why: "Official application.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "In reverse bias the depletion layer",
      correct: "widens",
      wrong: ["vanishes", "is unchanged", "becomes a short"],
      why: "Barrier grows; tiny reverse current until breakdown.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-semiconductors",
      i,
      subject: "physics",
      stem: "A semiconductor’s band gap compared with an insulator is",
      correct: "smaller (about 1 eV vs several eV)",
      wrong: ["larger", "zero like a metal", "negative"],
      why: "Qualitative bands, official.",
    });
  }
  return mcq({
    chapterId: "phy-semiconductors",
    i,
    subject: "physics",
    stem: "Si forward knee is about",
    correct: "$0.7\\,\\mathrm{V}$",
    wrong: ["$0\\,\\mathrm{V}$", "$5\\,\\mathrm{V}$", "$12\\,\\mathrm{V}$"],
    why: "Ge is ~0.3 V. I–V official.",
  });
}

function emw(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Wavelength order, long to short, starts",
      correct: "radio → microwave → IR → visible → UV → X → γ",
      wrong: ["γ first", "visible → IR → radio", "UV between IR and visible"],
      why: "Official spectrum including uses.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Displacement current is",
      correct: "$\\varepsilon_0 d\\Phi_E/dt$",
      wrong: ["conduction in a wire only", "$dq/dt$ in a resistor", "0 in a capacitor"],
      why: "Keeps Ampere consistent between charging plates.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "EM waves are",
      correct: "transverse, $E\\perp B\\perp k$",
      wrong: ["longitudinal in vacuum", "mechanical", "need air"],
      why: "Official qualitative transverse nature.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-emw",
      i,
      subject: "physics",
      stem: "Sterilisation and sunburn belong to",
      correct: "ultraviolet",
      wrong: ["microwaves", "radio", "IR remotes"],
      why: "X-rays image; microwaves cook; IR heats.",
    });
  }
  return mcq({
    chapterId: "phy-emw",
    i,
    subject: "physics",
    stem: "$c$ in vacuum equals",
    correct: "$1/\\sqrt{\\mu_0\\varepsilon_0}$",
    wrong: ["$\\sqrt{\\mu_0\\varepsilon_0}$", "$E/B$ only in SI nonsense", "330 m/s"],
    why: "And $E/B=c$.",
  });
}

function mag(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Diamagnetic substances are",
      correct: "weakly repelled; $\\chi<0$",
      wrong: ["strongly attracted", "always ferrous", "$\\chi\\gg 0$"],
      why: "Bi, Cu, water. Independent of T, roughly.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Ferromagnetism disappears above the",
      correct: "Curie temperature (becomes para)",
      wrong: ["melting point only", "0 K", "Bohr magneton"],
      why: "Official: effect of temperature on magnetic properties.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "A bar magnet as an equivalent solenoid is",
      correct: "qualitative in the syllabus — field-line pattern matches",
      wrong: ["a Gauss derivation they want in full", "false", "only for electrets"],
      why: "Official wording: qualitative treatment only.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-mag-matter",
      i,
      subject: "physics",
      stem: "Torque on a magnetic dipole in uniform B is",
      correct: "$\\vec m\\times\\vec B$",
      wrong: ["$\\vec m\\cdot\\vec B$ as a vector", "0 always", "$q v B$"],
      why: "Tries to align $\\vec m$ with $\\vec B$.",
    });
  }
  return mcq({
    chapterId: "phy-mag-matter",
    i,
    subject: "physics",
    stem: "Paramagnetism of a typical salt, on heating,",
    correct: "weakens ($\\chi\\propto 1/T$)",
    wrong: ["strengthens", "becomes ferro", "flips sign"],
    why: "Curie’s law. Official temperature effect.",
  });
}

function osc(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const L = cycle([1, 0.25, 4], i);
    const T = 2 * Math.PI * Math.sqrt(L / 10);
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Simple pendulum $L=${L}\\,\\mathrm{m}$, $g=10$. $T$ (s) ≈`,
      answer: Math.round(T * 100) / 100,
      why: "$T=2\\pi\\sqrt{L/g}$. Official derivation chapter.",
      tolerance: 0.05,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "SHM is the projection of",
      correct: "uniform circular motion",
      wrong: ["uniform rectilinear motion", "a parabola", "free fall"],
      why: "Official: UCM and its equations of motion; phase.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: "Energy in SHM at amplitude A is",
      correct: "$\\tfrac12 k A^2$",
      wrong: ["0", "$kA$", "$\\tfrac12 k x$ at the mean"],
      why: "Splits as $U=\\tfrac12 kx^2$, $K=E-U$.",
    });
  }
  if (m === 3) {
    const k = cycle([100, 400, 25], i);
    const m0 = cycle([1, 4, 1], i);
    const T = 2 * Math.PI * Math.sqrt(m0 / k);
    return num({
      chapterId: "phy-oscillations",
      i,
      subject: "physics",
      stem: `Loaded spring $m=${m0}\\,\\mathrm{kg}$, $k=${k}\\,\\mathrm{N/m}$. $T$ (s) ≈`,
      answer: Math.round(T * 100) / 100,
      why: "$T=2\\pi\\sqrt{m/k}$. $g$ cancelled after you measure from the new equilibrium.",
      tolerance: 0.05,
    });
  }
  return mcq({
    chapterId: "phy-oscillations",
    i,
    subject: "physics",
    stem: "Phase of SHM $x=A\\sin(\\omega t+\\phi)$ is",
    correct: "$\\omega t+\\phi$",
    wrong: ["$A$", "$\\omega$ only", "$x$"],
    why: "The angle on the reference circle. Official.",
  });
}

function waves(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "A closed organ pipe supports",
      correct: "odd harmonics only",
      wrong: ["all harmonics", "even only", "no standing wave"],
      why: "Node at closed end, antinode at open. $f=(2n-1)v/(4L)$.",
    });
  }
  if (m === 1) {
    const f1 = cycle([256, 512, 440], i);
    const f2 = f1 + cycle([4, 6, 3], i);
    return num({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: `Beats: ${f1} Hz and ${f2} Hz. Beat frequency (Hz) is`,
      answer: f2 - f1,
      why: "$|f_1-f_2|$. Official harmonics and beats.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Speed of a transverse wave on a string is",
      correct: "$\\sqrt{T/\\mu}$",
      wrong: ["$\\sqrt{\\mu/T}$", "$T\\mu$", "$\\sqrt{\\gamma P/\\rho}$"],
      why: "The last is sound (Laplace). Official travelling-wave speed.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-waves",
      i,
      subject: "physics",
      stem: "Reflection at a rigid boundary of a string",
      correct: "inverts (phase π, a node)",
      wrong: ["never inverts", "always doubles speed", "kills the wave"],
      why: "Free boundary: antinode, no inversion.",
    });
  }
  return mcq({
    chapterId: "phy-waves",
    i,
    subject: "physics",
    stem: "A progressive wave $y=A\\sin(kx-\\omega t)$ travels",
    correct: "towards $+x$",
    wrong: ["towards $-x$", "not at all", "on a circle"],
    why: "Argument $kx+\\omega t$ travels $-x$. Official displacement relation.",
  });
}

function thermo(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "Zeroth law lets us define",
      correct: "temperature as a state variable",
      wrong: ["entropy", "work", "the joule"],
      why: "Thermal equilibrium is transitive. Official.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "First law (physics sign) is",
      correct: "$Q=\\Delta U+W$",
      wrong: ["$\\Delta U=Q+W$ (that is chemistry)", "$W=Q$", "$Q=0$ always"],
      why: "Work by the system is $+W$ in NCERT physics.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "On a $P$–$V$ plot an adiabatic, vs the isothermal through the same point, is",
      correct: "steeper",
      wrong: ["flatter", "identical", "horizontal"],
      why: "$\\gamma>1$. Official processes list.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-thermo",
      i,
      subject: "physics",
      stem: "A cyclic process has",
      correct: "$\\Delta U=0$ so $Q_{\\mathrm{net}}=W_{\\mathrm{net}}$",
      wrong: ["$Q=0$", "$W=0$", "$T=0$"],
      why: "State function $U$ returns.",
    });
  }
  return mcq({
    chapterId: "phy-thermo",
    i,
    subject: "physics",
    stem: "Kelvin statement of the second law: you cannot",
    correct: "convert heat from a single reservoir entirely into work in a cycle",
    wrong: ["have Carnot engines", "define temperature", "compress a gas"],
      why: "Clausius: heat does not flow cold → hot unaided.",
  });
}

function ktg(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Kinetic interpretation of temperature is",
      correct: "$\\langle\\tfrac12 mv^2\\rangle=\\tfrac32 kT$",
      wrong: ["$PV=nRT$ only", "$T$ is a force", "$v_{\\mathrm{rms}}=0$"],
      why: "Official. Then $v_{\\mathrm{rms}}=\\sqrt{3RT/M}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "For a diatomic ideal gas at 300 K, $f$ is",
      correct: "5 (vibration frozen)",
      wrong: ["3", "6", "7 always"],
      why: "Equipartition, official application to $C_V$. $C_V=fR/2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Mean free path at fixed T is proportional to",
      correct: "$1/P$",
      wrong: ["$P$", "$P^2$", "$T^0 P^0$"],
      why: "$\\lambda=1/(\\sqrt{2} n\\pi d^2)$, $n=P/kT$. Official concept.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-ktg",
      i,
      subject: "physics",
      stem: "Pressure in kinetic theory is",
      correct: "$P=\\tfrac13\\rho v_{\\mathrm{rms}}^2$",
      wrong: ["$P=\\rho v$", "$P=nkT/3$ only with a missing 1", "independent of speed"],
      why: "Momentum dumped on the wall per second per area.",
    });
  }
  return mcq({
    chapterId: "phy-ktg",
    i,
    subject: "physics",
    stem: "Work to compress an ideal gas isothermally (by the gas) is",
    correct: "$nRT\\ln(V_2/V_1)$",
    wrong: ["$P\\Delta V$ with $P$ const", "0", "$C_V\\Delta T$"],
    why: "Official: work done in compressing a gas, plus $PV=nRT$.",
  });
}

function ray(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Lens-maker for a double convex thin lens in air has",
      correct: "$1/f=(\\mu-1)(1/R_1-1/R_2)$ with New Cartesian signs",
      wrong: ["$f=R/2$ always", "$1/f=\\mu(1/R_1+1/R_2)$", "no $R$"],
      why: "Official thin-lens / lens-maker pair.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "TIR needs",
      correct: "denser → rarer and $i>i_c$",
      wrong: ["rarer → denser", "$i=0$", "a mirror"],
      why: "Fibres are this. $i_c=\\sin^{-1}(1/\\mu)$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: "Astronomical telescope in normal adjustment: $m=$",
      correct: "$-f_o/f_e$",
      wrong: ["$f_o f_e$", "$1+D/f$", "$L/f_o$"],
      why: "Length $f_o+f_e$. Compound microscope is the other official instrument.",
    });
  }
  if (m === 3) {
    const A = cycle([6, 4, 5], i);
    const dm = cycle([4, 2, 3], i);
    return mcq({
      chapterId: "phy-ray",
      i,
      subject: "physics",
      stem: `Prism $A=${A}^{\\circ}$, $\\delta_m=${dm}^{\\circ}$. $\\mu=\\sin((A+\\delta_m)/2)/\\sin(A/2)$ is the`,
      correct: "official prism formula (minimum deviation)",
      wrong: ["mirror formula", "lens-maker", "Snell at a plane only"],
      why: "Memorise the sine form. Small-angle $\\delta=(\\mu-1)A$.",
    });
  }
  return mcq({
    chapterId: "phy-ray",
    i,
    subject: "physics",
    stem: "Two thin lenses in contact: $1/F=$",
    correct: "$1/f_1+1/f_2$",
    wrong: ["$f_1+f_2$", "$f_1 f_2$", "$f_1-f_2$"],
    why: "Official combination of thin lenses in contact.",
  });
}

function wo(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const lam = cycle([500, 600, 400], i);
    const D = cycle([1, 2, 1.5], i);
    const d = cycle([0.5, 1, 0.25], i);
    const beta = ((lam * 1e-9) * D) / (d * 1e-3);
    return num({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: `YDSE $\\lambda=${lam}\\,\\mathrm{nm}$, $D=${D}\\,\\mathrm{m}$, $d=${d}\\,\\mathrm{mm}$. Fringe width in μm is`,
      answer: nint(beta * 1e6),
      why: "$\\beta=\\lambda D/d$. Official final expression only.",
      tolerance: 1,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Huygens’ principle: the new wavefront is",
      correct: "the envelope of secondary wavelets",
      wrong: ["a ray always", "a photon", "the old front"],
      why: "Recovers $i=r$ and Snell. Official proof.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Sustained interference needs",
      correct: "coherent sources",
      wrong: ["two bulbs", "white light only", "a prism"],
      why: "Official: coherent sources and sustained interference.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-wave-opt",
      i,
      subject: "physics",
      stem: "Single-slit central max is wider if the slit is",
      correct: "narrower",
      wrong: ["wider", "replaced by a mirror", "illuminated by X-rays only"],
      why: "Width $\\sim 2\\lambda D/a$. Qualitative official.",
    });
  }
  return mcq({
    chapterId: "phy-wave-opt",
    i,
    subject: "physics",
    stem: "Two independent ordinary bulbs",
    correct: "do not make stable YDSE fringes",
    wrong: ["always fringe", "are coherent", "have constant phase difference"],
    why: "Coherence is the official word.",
  });
}

function dual(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Einstein’s photoelectric equation is",
      correct: "$h\\nu=\\phi+K_{\\max}$",
      wrong: ["$K=h\\nu$ with no $\\phi$", "$eV=h/\\lambda$", "$\\lambda=h/p$ only"],
      why: "Particle nature of light. Official.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "Stopping potential vs frequency has slope",
      correct: "$h/e$",
      wrong: ["$h$", "$e/h$", "0"],
      why: "Experimental study of the photoelectric effect.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-dual",
      i,
      subject: "physics",
      stem: "de Broglie wavelength is",
      correct: "$h/p$",
      wrong: ["$h\\nu$", "$p/h$", "$hc$"],
      why: "Matter waves. Official relation.",
    });
  }
  return mcq({
    chapterId: "phy-dual",
    i,
    subject: "physics",
    stem: "Intensity of light, above threshold, controls",
    correct: "saturation current, not $K_{\\max}$",
    wrong: ["$K_{\\max}$ linearly", "$\\nu_0$", "nothing"],
    why: "Lenard. Hertz first saw the spark.",
  });
}

function nuclei(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Binding energy per nucleon is largest near",
      correct: "iron-56",
      wrong: ["hydrogen", "uranium", "a free neutron"],
      why: "Official variation with A. Fusion below, fission above.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Mass defect $\\Delta m$ gives",
      correct: "$BE=\\Delta m c^2$",
      wrong: ["charge", "half-life directly", "spin"],
      why: "Official mass–energy.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-nuclei",
      i,
      subject: "physics",
      stem: "Nuclear force is",
      correct: "short-range, charge-independent, saturating",
      wrong: ["$1/r^2$ like Coulomb", "long-range only", "repulsive at all r"],
      why: "Official composition, size, nuclear force.",
    });
  }
  return mcq({
    chapterId: "phy-nuclei",
    i,
    subject: "physics",
    stem: "Fission vs fusion: energy is released when",
    correct: "BE/nucleon of products is larger",
    wrong: ["mass increases", "A always falls", "photons are absorbed only"],
    why: "Both official.",
  });
}

function ac(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "RMS of a sinusoid is peak over",
      correct: "$\\sqrt{2}$",
      wrong: ["2", "$\\pi$", "1"],
      why: "Official peak and RMS.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Series LCR resonance: $Z=$",
      correct: "$R$",
      wrong: ["$X_L$", "0 always", "$X_C$"],
      why: "$X_L=X_C$, current max, $\\cos\\phi=1$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-ac",
      i,
      subject: "physics",
      stem: "Wattless current is the",
      correct: "reactive component $I\\sin\\phi$",
      wrong: ["$I\\cos\\phi$", "dc", "rms of V"],
      why: "Average power $VI\\cos\\phi$. Official power factor.",
    });
  }
  return mcq({
    chapterId: "phy-ac",
    i,
    subject: "physics",
    stem: "Ideal transformer: $V_s/V_p=$",
    correct: "$N_s/N_p=I_p/I_s$",
    wrong: ["$N_p/N_s$", "$I_s/I_p$ equal to $V_s/V_p$", "1 always"],
    why: "Power conserved. Laminated core kills eddy loss. Official generator + transformer.",
  });
}

function pot(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Energy stored in a capacitor is",
      correct: "$\\tfrac12 CV^2$",
      wrong: ["$CV$", "$Q/C$", "$C/V$"],
      why: "Official: formulae only, no derivation.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Equipotential surfaces are",
      correct: "perpendicular to field lines",
      wrong: ["parallel to field lines", "the same as field lines", "undefined in electrostatics"],
      why: "Work along them is 0.",
    });
  }
  if (m === 2) {
    const n = cycle([2, 3, 4], i);
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: `${n} identical capacitors in series: equivalent C is`,
      correct: `C/${n}`,
      wrong: [`${n}C`, "C", "0"],
      why: "Parallel: nC. Official combinations.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-potential",
      i,
      subject: "physics",
      stem: "Inserting a dielectric $K$ into an isolated capacitor",
      correct: "drops $V$ and $U$ by $K$; $Q$ fixed",
      wrong: ["raises $Q$", "leaves $U$ unchanged", "shorts the plates"],
      why: "Connected to a battery: $V$ fixed, $Q$ and $U$ rise.",
    });
  }
  return mcq({
    chapterId: "phy-potential",
    i,
    subject: "physics",
    stem: "Potential due to a point charge is",
    correct: "$kq/r$ (zero at infinity)",
    wrong: ["$kq/r^2$", "$q/\\varepsilon_0$", "path-dependent"],
    why: "Official: point charge, dipole, system of charges.",
  });
}

function nlm(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Newton’s first law defines",
      correct: "inertia and an inertial frame",
      wrong: ["$F=ma$ as a formula for $m$", "action-reaction", "friction"],
      why: "Official: intuitive force, inertia, first law.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Impulse equals",
      correct: "$\\Delta\\vec p=\\int\\vec F\\,dt$",
      wrong: ["$\\vec F\\cdot\\vec s$", "$mv^2$", "torque"],
      why: "Official: momentum and the second law; impulse.",
    });
  }
  if (m === 2) {
    const m0 = cycle([2, 5, 10], i);
    const v = cycle([10, 4, 6], i);
    return num({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: `A ${m0} kg cart at ${v} m/s is stopped in 0.5 s. Average force (N) is`,
      answer: (m0 * v) / 0.5,
      why: "$F_{\\mathrm{avg}}\\Delta t=\\Delta p$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-nlm",
      i,
      subject: "physics",
      stem: "Vehicle on a banked curve (ideal, no friction): $v^2=$",
      correct: "$rg\\tan\\theta$",
      wrong: ["$rg$", "$g\\tan\\theta$", "$r/g$"],
      why: "Official: level road vs banked road.",
    });
  }
  return mcq({
    chapterId: "phy-nlm",
    i,
    subject: "physics",
    stem: "Static friction vs kinetic, typically",
    correct: "$\\mu_s\\ge\\mu_k$",
    wrong: ["$\\mu_k>\\mu_s$ always", "both zero on a rough road", "rolling friction is the largest"],
      why: "Official friction list including rolling and lubrication.",
  });
}

function rot(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "MOI of a solid sphere about a diameter is",
      correct: "$\\tfrac25 MR^2$",
      wrong: ["$\\tfrac12 MR^2$", "$MR^2$", "$\\tfrac23 MR^2$"],
      why: "Official: values for simple objects, no derivation. Shell is 2/3.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Radius of gyration $k$ is defined by",
      correct: "$I=Mk^2$",
      wrong: ["$I=k^2$", "$k=I$", "$k=R$ always"],
      why: "Official definition.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "Angular momentum of a particle about O is",
      correct: "$\\vec r\\times\\vec p$",
      wrong: ["$\\vec r\\cdot\\vec p$", "$I$ only", "$mv$"],
      why: "Torque $=dL/dt$. Conservation when $\\tau_{\\mathrm{ext}}=0$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "phy-rotation",
      i,
      subject: "physics",
      stem: "COM of a uniform rod is",
      correct: "at the midpoint",
      why: "Official: COM of a two-particle system, of a rigid body, of a uniform rod.",
      wrong: ["at an end", "outside the rod", "undefined"],
    });
  }
  return mcq({
    chapterId: "phy-rotation",
    i,
    subject: "physics",
    stem: "Linear $F=ma$ is to rotation as",
    correct: "$\\tau=I\\alpha$",
    wrong: ["$F=mv$", "$p=mv$", "$W=Fs$ only"],
    why: "Official comparison of linear and rotational motion.",
  });
}

function units(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "SI fundamental units include",
      correct: "kg, m, s, A, K, mol, cd",
      wrong: ["N, J, W as base", "g, cm, s", "only m, kg, s"],
      why: "Official: systems of units; SI; fundamental and derived.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Dimensional analysis cannot catch",
      correct: "a missing dimensionless factor like $2\\pi$",
      wrong: ["adding force to energy", "wrong powers of M,L,T", "sin of a dimensional argument"],
      why: "Necessary, not sufficient. Official applications.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "phy-units",
      i,
      subject: "physics",
      stem: "Significant figures in 0.00240 are",
      correct: "3",
      wrong: ["5", "2", "1"],
      why: "Leading zeros after the decimal don’t count; trailing zeros after a non-zero do.",
    });
  }
  return mcq({
    chapterId: "phy-units",
    i,
    subject: "physics",
    stem: "If $x=ab$, maximum relative error is",
    correct: "$\\Delta a/a+\\Delta b/b$",
    wrong: ["$\\Delta a+\\Delta b$", "$\\Delta a\\,\\Delta b$", "0"],
    why: "Official: determining the uncertainty in a result.",
  });
}

function sets(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const n = cycle([3, 5, 6], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `A set with ${n} elements has how many subsets?`,
      answer: 2 ** n,
      why: "Power set. Official representations; empty set is one of them.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: "$(A\\cup B)'=$",
      correct: "$A'\\cap B'$",
      wrong: ["$A'\\cup B'$", "$A\\cap B$", "$U$"],
      why: "De Morgan. Official properties of complement.",
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
      why: "Official: subsets of reals especially intervals with notations.",
    });
  }
  if (m === 3) {
    const a = cycle([12, 10, 20], i);
    const b = cycle([8, 15, 9], i);
    const inter = cycle([3, 4, 5], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `$n(A)=${a}$, $n(B)=${b}$, $n(A\\cap B)=${inter}$. $n(A\\cup B)=$`,
      answer: a + b - inter,
      why: "Inclusion-exclusion. Draw the Venn.",
    });
  }
  return mcq({
    chapterId: "math-sets",
    i,
    subject: "maths",
    stem: "$A\\setminus B$ equals",
    correct: "$A\\cap B'$",
    wrong: ["$A\\cup B$", "$B\\setminus A$", "$A'$"],
    why: "Official difference of sets.",
  });
}

function rel11(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const n = cycle([3, 4, 2], i);
    const k = cycle([2, 3, 5], i);
    return num({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: `$n(A)=${n}$, $n(B)=${k}$. $n(A\\times B)=$`,
      answer: n * k,
      why: "Official Cartesian product of finite sets.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "Range of $|x|$ is",
      correct: "$[0,\\infty)$",
      wrong: ["$\\mathbb R$", "$(0,\\infty)$", "$\\{-1,1\\}$"],
      why: "Official modulus graph.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "Greatest-integer $[x]$ has range",
      correct: "$\\mathbb Z$",
      wrong: ["$\\mathbb R$", "$[0,1)$", "$\\{0,1\\}$"],
      why: "Staircase. Official catalogue.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "Domain of $\\ln x$ is",
      correct: "$(0,\\infty)$",
      wrong: ["$\\mathbb R$", "$[0,\\infty)$", "$[-1,1]$"],
      why: "Official logarithmic function.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "Signum function takes values",
      correct: "$-1,0,1$",
      wrong: ["all of $\\mathbb R$", "only $\\pm 1$", "only 0"],
      why: "Official signum with its graph.",
    });
  }
  return mcq({
    chapterId: "math-rel-11",
    i,
    subject: "maths",
    stem: "A function is a relation in which",
    correct: "each domain element has exactly one image",
    wrong: ["each image has one preimage (that is 1-1)", "the graph is a circle", "range = codomain always"],
    why: "Official: function as a special type of relation.",
  });
}

function rel12(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "An equivalence relation is",
      correct: "reflexive, symmetric and transitive",
      wrong: ["only symmetric", "a function", "empty"],
      why: "It partitions the set. Official types of relations.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "One-one means",
      correct: "$f(a)=f(a')\\Rightarrow a=a'$",
      wrong: ["range = codomain", "not a function", "$f$ constant"],
      why: "Onto is range = codomain. Official.",
    });
  }
  if (m === 2) {
    const n = cycle([3, 4, 5], i);
    const k = cycle([3, 4, 5], i);
    const ans = k ** n;
    return num({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: `Number of functions from a ${n}-set to a ${k}-set is`,
      answer: ans,
      why: "$k^n$. One-one would be $P(k,n)$ if $k\\ge n$.",
    });
  }
  return mcq({
    chapterId: "math-rel-12",
    i,
    subject: "maths",
    stem: "On a finite set, $f:A\\to A$ is one-one iff",
    correct: "it is onto",
    wrong: ["it is constant", "it is empty", "never"],
    why: "Pigeonhole. Useful counting extra.",
  });
}

function trig(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$180^{\\circ}$ in radians is",
      correct: "$\\pi$",
      wrong: ["$2\\pi$", "$1$", "$180$"],
      why: "Official conversion. Calculus uses radians.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin^2 x+\\cos^2 x=$",
      correct: "$1$ for all $x$",
      wrong: ["$0$", "$\\sin 2x$", "only in Q1"],
      why: "Pythagoras on the unit circle. Official identity.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\cos 2x$ equals all of except",
      correct: "$2\\sin x\\cos x$ (that is sin 2x)",
      wrong: ["$\\cos^2 x-\\sin^2 x$", "$2\\cos^2 x-1$", "$1-2\\sin^2 x$"],
      why: "Official double-angle list.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\cos\\alpha-\\cos\\beta=$",
      correct: "$-2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}$",
      wrong: ["$2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}$", "$\\sin(\\alpha-\\beta)$", "0"],
      why: "Official sum-to-product.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "In Q2 the positive trig functions are",
      correct: "sin and csc",
      wrong: ["all", "tan and cot", "cos and sec"],
      why: "CAST / ASTC from the unit-circle point. Official signs.",
    });
  }
  return mcq({
    chapterId: "math-trig",
    i,
    subject: "maths",
    stem: "$\\sin 3x=$",
    correct: "$3\\sin x-4\\sin^3 x$",
    wrong: ["$3\\sin x$", "$4\\cos^3 x-3\\cos x$", "$2\\sin x\\cos x$"],
    why: "Official triple-angle list.",
  });
}

function ineq(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "Multiplying an inequality by $-1$",
      correct: "reverses the inequality",
      wrong: ["does nothing", "makes it an equation", "is illegal"],
      why: "Official algebraic solutions in one variable.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "$x^2-5x+6>0$ solves to",
      correct: "$(-\\infty,2)\\cup(3,\\infty)$",
      wrong: ["$(2,3)$", "$\\mathbb R$", "$\\{2,3\\}$"],
      why: "U-parabola positive outside the roots.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "On the number line, $x>2$ is drawn with",
      correct: "an open circle at 2, ray to $+\\infty$",
      wrong: ["a filled circle at 2", "only the point 2", "the whole line"],
      why: "Official representation on the number line.",
    });
  }
  return mcq({
    chapterId: "math-ineq",
    i,
    subject: "maths",
    stem: "$|x-3|<2$ is",
    correct: "$1<x<5$",
    wrong: ["$x<1$ or $x>5$", "$x=3$", "$x>2$"],
    why: "Distance to 3 is less than 2.",
  });
}

function pnc(i: number): PlayItem {
  const n = cycle([5, 6, 7], i);
  const r = cycle([2, 3, 2], i);
  const m = i % 4;
  const fact = (k: number) => {
    let p = 1;
    for (let j = 2; j <= k; j++) p *= j;
    return p;
  };
  if (m === 0) {
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `${n}! equals`,
      answer: fact(n),
      why: "Official factorial n.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `${n}P${r} equals`,
      answer: fact(n) / fact(n - r),
      why: "Derived as $n(n-1)\\cdots(n-r+1)$. Official.",
    });
  }
  if (m === 2) {
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `${n}C${r} equals`,
      answer: fact(n) / (fact(r) * fact(n - r)),
      why: "$nPr / r!$. Official connection.",
    });
  }
  return num({
    chapterId: "math-pnc",
    i,
    subject: "maths",
    stem: `Circular permutations of ${n} distinct people is (n−1)! =`,
    answer: fact(n - 1),
    why: "Rotations identified. Simple application.",
  });
}

function binom(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    const n = cycle([5, 6, 8], i);
    return num({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: `Number of terms in $(x+y)^{${n}}$ is`,
      answer: n + 1,
      why: "r from 0 to n. Official positive integral index.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "Pascal: $\\binom{n}{r}+\\binom{n}{r-1}=$",
      correct: "$\\binom{n+1}{r}$",
      wrong: ["$\\binom{n}{r+1}$", "$n$", "0"],
      why: "Official Pascal’s triangle.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "General term $T_{r+1}$ of $(x+y)^n$ is",
      correct: "$\\binom{n}{r}x^{n-r}y^r$",
      wrong: ["$x^n$", "$y^r$", "$n^r$"],
      why: "Official.",
    });
  }
  return mcq({
    chapterId: "math-binom",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "For non-integer $\\alpha$, $(1+x)^\\alpha$ needs",
    correct: "$|x|<1$",
    wrong: ["any $x$", "$x>1$", "integer n only"],
    why: "Boards stop at positive integral n. Advanced does not.",
  });
}

function seq(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const a = cycle([2, 3, 5], i);
    const r = cycle([2, 3, 2], i);
    const n = cycle([4, 5, 3], i);
    let s = 0;
    let t = a;
    for (let k = 0; k < n; k++) {
      s += t;
      t *= r;
    }
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `GP $a=${a}$, $r=${r}$, $S_{${n}}=$`,
      answer: s,
      why: "$S_n=a(r^n-1)/(r-1)$. Official.",
    });
  }
  if (m === 1) {
    const a = cycle([8, 18, 32], i);
    const r = 0.5;
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `Infinite GP first term ${a}, $r=${r}$. $S_\\infty=$`,
      answer: a / (1 - r),
      why: "$a/(1-r)$ for $|r|<1$. Official.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: "AM of $a,b>0$ vs GM",
      correct: "AM $\\ge$ GM, equality iff $a=b$",
      wrong: ["GM $>$ AM always", "they are unrelated", "AM $=ab$"],
      why: "Official relation between A.M. and G.M.",
    });
  }
  if (m === 3) {
    const n = cycle([10, 20, 5], i);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `$\\sum_{k=1}^{${n}} k=$`,
      answer: (n * (n + 1)) / 2,
      why: "AP of 1 to n. Main still uses $\\sum k^2$ as well.",
    });
  }
  return mcq({
    chapterId: "math-seq",
    i,
    subject: "maths",
    stem: "Geometric mean of $a,b>0$ is",
    correct: "$\\sqrt{ab}$",
    wrong: ["$(a+b)/2$", "$ab$", "$|a-b|$"],
    why: "Official G.M.",
  });
}

function straight(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Slope-intercept form is",
      correct: "$y=mx+c$",
      wrong: ["$x/a+y/b=1$ only", "$x=a$", "$(y-y_1)=m(x-x_1)$ only"],
      why: "Official various forms.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Distance of $(x_0,y_0)$ from $ax+by+c=0$ is",
      correct: "$|ax_0+by_0+c|/\\sqrt{a^2+b^2}$",
      wrong: ["$ax_0+by_0$", "$c$", "0 always"],
      why: "Official distance of a point from a line.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Two lines with slopes $m_1 m_2=-1$ are",
      correct: "perpendicular",
      wrong: ["parallel", "the same", "horizontal"],
      why: "Parallel: equal slopes. Official angle between two lines.",
    });
  }
  return mcq({
    chapterId: "math-straight",
    i,
    subject: "maths",
    stem: "Intercept form is",
    correct: "$x/a+y/b=1$",
    wrong: ["$y=mx$", "$x=y$", "$xy=1$"],
    why: "Official.",
  });
}

function conic(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Eccentricity of a parabola is",
      correct: "1",
      wrong: ["0", "$<1$", "$>1$"],
      why: "Circle 0, ellipse <1, hyperbola >1. Official sections of a cone.",
    });
  }
  if (m === 1) {
    const a = cycle([2, 3, 4], i);
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: `Parabola $y^2=${4 * a}x$: focus is`,
      correct: `$(${a},0)$`,
      wrong: ["origin", `$(0,${a})$`, "a line"],
      why: "$y^2=4ax$, focus $(a,0)$. Official standard equation.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Standard circle $(x-h)^2+(y-k)^2=r^2$ has centre",
      correct: "$(h,k)$",
      wrong: ["origin always", "$(r,r)$", "$(-h,-k)$ always"],
      why: "Official standard equation of a circle.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Ellipse $x^2/a^2+y^2/b^2=1$ ($a>b$): $e=$",
      correct: "$\\sqrt{1-b^2/a^2}$",
      wrong: ["$\\sqrt{1+b^2/a^2}$", "1", "0 always"],
      why: "Hyperbola flips the sign. Official simple properties.",
    });
  }
  return mcq({
    chapterId: "math-conic",
    i,
    subject: "maths",
    stem: "A plane through the vertex of a cone can give",
    correct: "degenerate: a point, a line, or two intersecting lines",
    wrong: ["only a circle", "never a line", "a sphere"],
    why: "Official degenerated cases.",
  });
}

function d11(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return num({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Distance from origin to $(2,3,6)$ is",
      answer: 7,
      why: "$\\sqrt{4+9+36}=7$. Official distance between two points.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Number of octants is",
      correct: "8",
      wrong: ["4", "2", "6"],
      why: "Official coordinate axes and planes in three dimensions.",
    });
  }
  return mcq({
    chapterId: "math-3d-11",
    i,
    subject: "maths",
    stem: "The plane $z=0$ is",
    correct: "the $xy$-plane",
    wrong: ["$yz$", "$zx$", "a point"],
    why: "Official coordinates of a point.",
  });
}

function limits(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{\\theta\\to 0}\\sin\\theta/\\theta=$",
      correct: "1 (θ in radians)",
      wrong: ["0", "$\\pi/180$", "does not exist"],
      why: "Official standard limit.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "Derivative of a product $uv$ is",
      correct: "$u'v+uv'$",
      wrong: ["$u'v'$", "$u+v$", "0"],
      why: "Official sum, difference, product, quotient.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$d/dx\\,\\sin x=$",
      correct: "$\\cos x$",
      wrong: ["$-\\sin x$", "$\\sin x$", "1"],
      why: "Official derivatives of trigonometric functions.",
    });
  }
  return mcq({
    chapterId: "math-limits",
    i,
    subject: "maths",
    stem: "Geometrically $f'(a)$ is",
    correct: "slope of the tangent at $x=a$",
    wrong: ["the intercept", "the area", "always 0"],
    why: "Official: relate derivative to slope of the tangent; also rate of change of distance.",
  });
}

function stats(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Variance $\\sigma^2$ equals",
      correct: "$\\frac1n\\sum x_i^2-\\bar x^2$",
      wrong: ["$\\bar x$", "range", "always 0"],
      why: "Official computational form. SD is $\\sigma$.",
    });
  }
  if (m === 1) {
    return num({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Range of 2, 9, 4, 7 is",
      answer: 7,
      why: "max − min. Official crude measure.",
    });
  }
  if (m === 2) {
    return num({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Mean of 2, 4, 6, 8 is",
      answer: 5,
      why: "Then variance uses $(x-\\bar x)^2$.",
    });
  }
  return mcq({
    chapterId: "math-stats",
    i,
    subject: "maths",
    stem: "Grouped data uses",
    correct: "class marks $x_i$ with frequencies $f_i$",
    wrong: ["only the range", "the mode as mean always", "no $\\sum f_i$"],
    why: "Official ungrouped / grouped.",
  });
}

function p11(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "$P(A')=$",
      correct: "$1-P(A)$",
      wrong: ["$P(A)$", "0", "$P(A)^2$"],
      why: "Official probability of ‘not’.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "Mutually exclusive means",
      correct: "$A\\cap B=\\varnothing$",
      wrong: ["$P(A)P(B)=P(A\\cap B)$", "$A=B$", "$P=1$"],
      why: "Then $P(A\\cup B)=P(A)+P(B)$. Independent is the product.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "Axiomatic $P(S)=$",
      correct: "1",
      wrong: ["0", "$n(S)$", "infinite"],
      why: "Official set-theoretic probability.",
    });
  }
  return num({
    chapterId: "math-prob-11",
    i,
    subject: "maths",
    stem: "A fair die. Number of even faces (so P(even) = this / 6) is",
    answer: 3,
    why: "2, 4, 6. P = 1/2. Official equally likely outcomes.",
  });
}

function inv(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Principal range of $\\sin^{-1}$ is",
      correct: "$[-\\pi/2,\\pi/2]$",
      wrong: ["$[0,\\pi]$", "$\\mathbb R$", "$(0,\\pi/2)$"],
      why: "Official principal value branch. $\\cos^{-1}$ is $[0,\\pi]$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "$\\sin^{-1}x+\\cos^{-1}x=$",
      correct: "$\\pi/2$",
      wrong: ["0", "$\\pi$", "$x$"],
      why: "Official identity.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Domain of $\\tan^{-1}$ is",
      correct: "$\\mathbb R$",
      wrong: ["$[-1,1]$", "$(-1,1)$", "$[0,\\infty)$"],
      why: "Range $(-\\pi/2,\\pi/2)$. Official.",
    });
  }
  return mcq({
    chapterId: "math-invtrig",
    i,
    subject: "maths",
    stem: "Graph of $\\cos^{-1}x$ is",
      correct: "decreasing from $\\pi$ at $x=-1$ to $0$ at $x=1$",
      wrong: ["odd through the origin", "a straight line", "undefined"],
    why: "Official graphs of inverse trigonometric functions.",
  });
}

function mat(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "Matrix multiplication is",
      correct: "not commutative in general",
      wrong: ["always commutative", "never defined", "the same as addition"],
      why: "Official: non-commutativity; also AB=O with A,B ≠ O possible.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "If an inverse exists it is",
      correct: "unique",
      wrong: ["never unique", "always 0", "A itself"],
      why: "Official uniqueness proof (restrict to real entries).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "A skew-symmetric matrix has",
      correct: "zeros on the diagonal ($A^T=-A$)",
      wrong: ["$A^T=A$", "all entries 1", "order 1 only"],
      why: "Official types: zero, identity, transpose, symmetric, skew.",
    });
  }
  return mcq({
    chapterId: "math-matrices",
    i,
    subject: "maths",
    stem: "$(AB)^{-1}=$",
    correct: "$B^{-1}A^{-1}$",
    wrong: ["$A^{-1}B^{-1}$", "$AB$", "$I$"],
    why: "Reverse the order. Same as functions.",
  });
}

function dets(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return num({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "det $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ is",
      answer: 6,
      why: "Diagonal product. Official up to 3×3.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "$A^{-1}=$",
      correct: "$(\\mathrm{adj} A)/\\det A$ when det ≠ 0",
      wrong: ["adj A", "A", "0"],
      why: "Official adjoint and inverse.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "Area of a triangle via a 3×3 determinant uses rows",
      correct: "$(x_i,\\,y_i,\\,1)$",
      wrong: ["only $x_i$", "$(1,1,1)$", "velocities"],
      why: "Official application.",
    });
  }
  return mcq({
    chapterId: "math-dets",
    i,
    subject: "maths",
    stem: "If $\\det A=0$, the system $AX=B$",
    correct: "is inconsistent or has infinitely many solutions",
    wrong: ["always has a unique solution", "is impossible to discuss", "has $X=A^{-1}B$"],
    why: "Official: consistency by examples.",
  });
}

function cont(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "$d/dx\\,\\tan^{-1}x=$",
      correct: "$1/(1+x^2)$",
      wrong: ["$1/\\sqrt{1-x^2}$", "$\\sec^2 x$", "0"],
      why: "Official inverse-trig list: sin⁻¹, cos⁻¹, tan⁻¹.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Logarithmic differentiation is built for",
      correct: "$y=[u(x)]^{v(x)}$",
      wrong: ["$y=x+1$", "matrices", "definite integrals"],
      why: "Official.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "$d/dx\\,e^x=$",
      correct: "$e^x$",
      wrong: ["$x e^{x-1}$", "$1/x$", "0"],
      why: "Official exponential and logarithmic functions.",
    });
  }
  return mcq({
    chapterId: "math-cont",
    i,
    subject: "maths",
    stem: "Second-order derivative of a parametric curve uses",
      correct: "$\\dfrac{d}{dt}(dy/dx)\\Big/\\dfrac{dx}{dt}$",
      wrong: ["$\\ddot y$ only", "$y/x$", "0"],
    why: "Official parametric forms and second-order derivatives.",
  });
}

function aod(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "First-derivative test: $f'$ changes + to − at c means",
      correct: "local maximum",
      wrong: ["local minimum", "always inflection", "f(c)=0"],
      why: "Official, motivated geometrically.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "If $f'(c)=0$ and $f''(c)>0$ then c is a",
      correct: "local minimum",
      wrong: ["local maximum", "neither ever", "root of f"],
      why: "Second-derivative test, official provable tool.",
    });
  }
  return mcq({
    chapterId: "math-aod",
    i,
    subject: "maths",
    stem: "Rate of change of $y=f(x)$ w.r.t. $t$ is",
    correct: "$f'(x)\\,dx/dt$",
    wrong: ["$f(t)$", "$x/t$", "0"],
    why: "Official rate of change of quantities.",
  });
}

function integ(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int dx/(x^2+a^2)=$",
      correct: "$(1/a)\\tan^{-1}(x/a)+C$",
      wrong: ["$\\sin^{-1}(x/a)$", "$\\ln|x|$", "$x^3/3$"],
      why: "Official menu.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int dx/\\sqrt{a^2-x^2}=$",
      correct: "$\\sin^{-1}(x/a)+C$",
      wrong: ["$\\tan^{-1}(x/a)$", "$\\ln|x+\\sqrt{x^2-a^2}|$", "0"],
      why: "Official.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "Integration by parts is",
      correct: "$\\int u\\,dv=uv-\\int v\\,du$",
      wrong: ["$u'v'$", "FTC", "partial fractions only"],
      why: "Official three techniques: substitution, partial fractions, parts.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "FTC (without proof): $\\frac{d}{dx}\\int_a^x f=$",
      correct: "$f(x)$",
      wrong: ["0", "$F(a)$", "$\\int f$"],
      why: "And $\\int_a^b f=F(b)-F(a)$. Official.",
    });
  }
  return mcq({
    chapterId: "math-int",
    i,
    subject: "maths",
    stem: "A quadratic $ax^2+bx+c$ under the integral is handled by",
    correct: "completing the square, then the official list",
    wrong: ["always parts", "always ignoring $b$", "numerical only"],
    why: "That is the whole method.",
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
      wrong: ["$\\pi a^2$", "$ab$", "$4ab$"],
      why: "Official standard-form ellipse.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area between $y=f$ and $y=g$ on $[a,b]$ is",
      correct: "$\\int_a^b |f-g|$",
      why: "Split at crossings. Official simple curves: lines, circles, parabolas, ellipses.",
      wrong: ["$\\int(f+g)$", "$f(b)-g(a)$", "0"],
    });
  }
  return mcq({
    chapterId: "math-aoi",
    i,
    subject: "maths",
    stem: "Official restriction: the curves are",
    correct: "standard-form lines / circles / parabolas / ellipses",
    wrong: ["any parametric monster", "only $y=e^x$", "3-D surfaces"],
    why: "Keep the sketch honest.",
  });
}

function de(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Linear $dy/dx+Py=Q$ has IF",
      correct: "$e^{\\int P\\,dx}$",
      wrong: ["$P$", "$Q$", "1"],
      why: "Official. Also the $dx/dy + Px = Q$ twin.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Homogeneous first-order means $dy/dx=$",
      correct: "$f(y/x)$",
      wrong: ["$f(x)$ only", "$y$", "a constant only"],
      why: "Put $y=vx$. Official.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Order of a DE is",
      correct: "the highest derivative’s order",
      wrong: ["the power of y", "the number of terms", "always 1"],
      why: "Degree is the power of that derivative once polynomial in derivatives. Official.",
    });
  }
  return mcq({
    chapterId: "math-de",
    i,
    subject: "maths",
    stem: "Separation of variables needs",
      correct: "$dy/dx=f(x)g(y)$",
      wrong: ["a linear IF always", "second order", "a matrix"],
    why: "Official method.",
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
      wrong: ["$l+m+n=1$", "$lmn=1$", "0"],
      why: "Official DC and DR.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "Section formula, internal $m:n$, is",
      correct: "$(n\\vec a+m\\vec b)/(m+n)$",
      wrong: ["$(\\vec a+\\vec b)/2$ only", "$\\vec a-\\vec b$", "0"],
      why: "Official position vector dividing a segment.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$\\vec a\\cdot\\vec b=0$ (nonzero) means",
      correct: "perpendicular",
      wrong: ["parallel", "equal", "zero vectors"],
      why: "Official geometrical interpretation of the dot product.",
    });
  }
  return mcq({
    chapterId: "math-vec",
    i,
    subject: "maths",
    stem: "Area of the parallelogram spanned by $\\vec a,\\vec b$ is",
    correct: "$|\\vec a\\times\\vec b|$",
    wrong: ["$\\vec a\\cdot\\vec b$", "$|\\vec a|+|\\vec b|$", "0"],
    why: "Official cross-product application.",
  });
}

function d12(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Skew lines are",
      correct: "neither parallel nor intersecting (not coplanar)",
      wrong: ["parallel", "always intersecting", "2-D objects"],
      why: "Official.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Shortest distance between $\\vec r=\\vec a_i+\\lambda\\vec b_i$ is",
      correct: "$|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|/|\\vec b_1\\times\\vec b_2|$",
      wrong: ["$|\\vec a_2-\\vec a_1|$", "0 always", "$|\\vec b_1\\cdot\\vec b_2|$"],
      why: "Official SD of two lines.",
    });
  }
  return mcq({
    chapterId: "math-3d-12",
    i,
    subject: "maths",
    stem: "Cartesian equation of a line through $(x_0,y_0,z_0)$ with DR $l,m,n$ is",
    correct: "$(x-x_0)/l=(y-y_0)/m=(z-z_0)/n$",
    wrong: ["$x=l$", "a plane", "$\\vec r\\cdot\\vec n=d$"],
    why: "Official Cartesian and vector equation of a line.",
  });
}

function lpp(i: number): PlayItem {
  const m = i % 3;
  if (m === 0) {
    return mcq({
      chapterId: "math-lpp",
      i,
      subject: "maths",
      stem: "A linear objective on a polygonal feasible region attains max/min at",
      correct: "a corner (vertex)",
      wrong: ["the centroid always", "infinity always", "a random interior point"],
      why: "Official graphical method, two variables.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-lpp",
      i,
      subject: "maths",
      stem: "An unbounded feasible region",
      correct: "may have no maximum",
      wrong: ["always has both max and min", "is infeasible", "is a point"],
      why: "Official feasible/infeasible, bounded/unbounded.",
    });
  }
  return mcq({
    chapterId: "math-lpp",
    i,
    subject: "maths",
    stem: "Syllabus cap on non-trivial constraints is",
    correct: "three",
    wrong: ["thirty", "none", "one"],
    why: "Official: up to three non-trivial constraints.",
  });
}

function p12(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "$P(A|B)=$",
      correct: "$P(A\\cap B)/P(B)$",
      wrong: ["$P(A)P(B)$", "$P(A)+P(B)$", "1"],
      why: "Official conditional probability.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Bayes reverses",
      correct: "the tree: posterior from prior × likelihood",
      wrong: ["independence", "the mean", "a determinant"],
      why: "Official Bayes’ theorem.",
    });
  }
  if (m === 2) {
    const n = cycle([4, 5, 10], i);
    return num({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: `Binomial $B(${n},1/2)$: mean $np=$`,
      answer: n / 2,
      why: "Official random variable, mean. Binomial is the Main extra.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Independent events satisfy",
      correct: "$P(A\\cap B)=P(A)P(B)$",
      wrong: ["$A\\cap B=\\varnothing$", "$P(A|B)=0$", "$P(A\\cup B)=1$"],
      why: "Official independent events. Exclusive is the empty intersection.",
    });
  }
  return mcq({
    chapterId: "math-prob-12",
    i,
    subject: "maths",
    stem: "Mean of a discrete RV is",
    correct: "$\\sum x_i p_i$",
    wrong: ["$\\sum p_i$", "$\\max x_i$", "0 always"],
    why: "Official: random variable and its probability distribution, mean.",
  });
}

function cplx(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "Need for $i$ is motivated by",
      correct: "quadratics like $x^2+1=0$",
      wrong: ["trigonometry", "sets", "LPP"],
      why: "Official need for complex numbers.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "Argand plane plots",
      correct: "$(x,y)$ for $x+iy$",
      why: "Official Argand plane. Algebraic properties: addition, conjugate, modulus.",
      wrong: ["only $x$", "polar only without a point", "a matrix"],
    });
  }
  if (m === 2) {
    return num({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "$|3+4i|$ is",
      answer: 5,
      why: "Modulus $\\sqrt{x^2+y^2}$. Algebraic property.",
    });
  }
  return mcq({
    chapterId: "math-complex",
    i,
    subject: "maths",
    stem: "$z\\bar z=$",
    correct: "$|z|^2$",
    wrong: ["0", "$z^2$", "$2z$"],
    why: "Official algebraic properties.",
  });
}
