import type { PlayItem } from "../types";
import { choiceOf, cycle, mcq, nint, num } from "./build";

export function chemistryItem(id: string, i: number): PlayItem | null {
  const table: Record<string, (n: number) => PlayItem> = {
    "chem-basic": basic,
    "chem-atom": atom,
    "chem-periodic": periodic,
    "chem-bonding": bonding,
    "chem-states": states,
    "chem-thermo": thermo,
    "chem-eq": eq,
    "chem-redox": redox,
    "chem-goc": goc,
    "chem-hc": hc,
    "chem-hydrogen": hydrogen,
    "chem-sblock": sblock,
    "chem-solutions": solutions,
    "chem-electro": electro,
    "chem-kinetics": kinetics,
    "chem-solid": solid,
    "chem-surface": surface,
    "chem-pblock": pblock,
    "chem-dblock": dblock,
    "chem-coord": coord,
    "chem-metallurgy": metallurgy,
    "chem-halo": halo,
    "chem-alcohol": alcohol,
    "chem-carbonyl": carbonyl,
    "chem-amines": amines,
    "chem-bio": bio,
    "chem-polymers": polymers,
    "chem-everyday": everyday,
    "chem-env": env,
    "chem-qual": qual,
    "chem-practical": practical,
  };
  return table[id]?.(i) ?? null;
}

function basic(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const g = choiceOf("chem-basic", i, [2, 4, 8, 16, 18, 32]);
    const M = choiceOf("chem-basic", i + 1, [2, 16, 18, 32, 44]);
    const n = g / M;
    if (!Number.isInteger(n) && n !== 0.5 && n !== 0.25 && n !== 2 && n !== 4) {
      return mcq({
        chapterId: "chem-basic",
        i,
        subject: "chemistry",
        stem: `${g} g of a substance with molar mass ${M} g/mol. Moles =`,
        correct: `${n}`,
        wrong: [`${g * M}`, `${M / g}`, `${g + M}`],
        why: "$n=m/M$.",
      });
    }
    return num({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: `${g} g of molar mass ${M} g mol⁻¹. Number of moles is`,
      answer: n,
      tolerance: 0.01,
      why: `$n=m/M=${g}/${M}=${n}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: "1 mole of any gas at STP (old convention 22.4 L) occupies",
      correct: "22.4 L",
      wrong: ["22.4 mL", "1 L", "6.022 L"],
      why: "IUPAC STP is 1 bar, 22700 mL approx. JEE still uses 22.4 L at 1 atm, 273 K unless told.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: "Empirical formula is",
      correct: "simplest whole-number ratio of atoms",
      wrong: ["actual molecular formula always", "percentage composition only", "oxidation number"],
      why: "Molecular = (empirical)×n, n=M/empirical mass.",
    });
  }
  if (m === 3) {
    const V = cycle([25, 50, 20], i);
    const M1 = cycle([0.2, 0.4, 1], i);
    const M2 = cycle([0.1, 0.05, 0.2], i);
    const V2 = (M1 * V) / M2;
    return num({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: `Dilute ${V} mL of ${M1} M to ${M2} M. Final volume (mL) is`,
      answer: V2,
      why: "$M_1 V_1=M_2 V_2$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-basic",
      i,
      subject: "chemistry",
      stem: "Limiting reagent is the reactant that",
      correct: "is consumed first and decides the product amount",
      wrong: ["is in excess", "has the largest mass always", "has the largest molar mass"],
      why: "Convert to moles, divide by stoichiometric coefficient, the smallest is limiting.",
    });
  }
  return mcq({
    chapterId: "chem-basic",
    i,
    subject: "chemistry",
    stem: "Number of atoms in 0.5 mol O₂ is",
    correct: "$N_A$ (because 0.5 mol molecules × 2)",
    wrong: ["$0.5 N_A$", "$2 N_A$", "$0.25 N_A$"],
    why: "0.5 mol O₂ = 0.5 N_A molecules = N_A atoms.",
  });
}

function atom(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const n = cycle([1, 2, 3, 4], i);
    const l = cycle([0, 1, 2], i);
    if (l >= n) return atom(i + 1);
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: `For $n=${n}$, possible $\\ell$ values are`,
      correct: `0 to ${n - 1}`,
      wrong: [`1 to ${n}`, `0 to ${n}`, `only 0`],
      why: "$\\ell=0,1,\\ldots,n-1$.",
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
      why: "Orbitals in shell $n^2$, two electrons each.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: "de Broglie wavelength of an electron in Bohr orbit $n$ is such that",
      correct: "$2\\pi r=n\\lambda$",
      wrong: ["$r=n\\lambda$", "$\\lambda=n/r$", "$2\\pi r=\\lambda$"],
      why: "Standing wave condition. Same as $mvr=nh/2\\pi$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: "Heisenberg: $\\Delta x\\,\\Delta p\\ge$",
      correct: "$h/4\\pi$",
      wrong: ["$h$", "$h/2\\pi$", "$h/\\pi$"],
      why: "Cannot assign a definite path to an electron — Bohr’s orbits are an approximation.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-atom",
      i,
      subject: "chemistry",
      stem: "Radial nodes in an orbital $n,\\ell$ =",
      correct: "$n-\\ell-1$",
      wrong: ["$n-\\ell$", "$\\ell$", "$n-1$"],
      why: "Angular nodes $=\\ell$. Total nodes $=n-1$.",
    });
  }
  return mcq({
    chapterId: "chem-atom",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Which set is not allowed?",
    correct: cycle(["n=2, ℓ=2", "n=1, ℓ=1", "n=3, ℓ=3"], i),
    wrong: ["n=3, ℓ=2, m=−2", "n=2, ℓ=1, m=0", "n=4, ℓ=0, m=0"],
    why: "$\\ell$ max is $n-1$.",
  });
}

function periodic(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-periodic",
      i,
      subject: "chemistry",
      stem: "Across a period, atomic radius generally",
      correct: "decreases (Z_eff up)",
      wrong: ["increases", "is constant", "decreases then jumps up at each block"],
      why: "Down a group, extra shells win — radius increases.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-periodic",
      i,
      subject: "chemistry",
      stem: "First ionisation enthalpy is unusually high for",
      correct: "noble gases (and half-filled / full-filled extra stability)",
      wrong: ["alkali metals", "group 13 vs 2, always lower with no exception", "all metals"],
      why: "Be > B, N > O (first IE) because of subshell stability.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-periodic",
      i,
      subject: "chemistry",
      stem: "Electronegativity of F, O, N, Cl — highest is",
      correct: "F",
      wrong: ["O", "N", "Cl"],
      why: "Pauling: F 4.0, O 3.5, N=Cl 3.0. Electron gain enthalpy of Cl > F (size/repulsion).",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-periodic",
      i,
      subject: "chemistry",
      stem: "Isoelectronic species: radius falls with",
      correct: "increasing nuclear charge",
      wrong: ["decreasing nuclear charge", "mass number only", "period number only"],
      why: "O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺.",
    });
  }
  return mcq({
    chapterId: "chem-periodic",
    i,
    subject: "chemistry",
    stem: "Modern periodic law is based on",
      correct: "atomic number",
    wrong: ["atomic mass", "mass number", "valency only"],
    why: "Moseley. Atomic mass still almost works, except Ar/K, Co/Ni, Te/I.",
  });
}

function bonding(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const rows = [
      ["CH4", "sp³, tetrahedral"],
      ["BF3", "sp², trigonal planar"],
      ["PCl5", "sp³d, trigonal bipyramidal"],
      ["SF6", "sp³d², octahedral"],
      ["BeCl2", "sp, linear"],
      ["NH3", "sp³, pyramidal"],
      ["H2O", "sp³, bent"],
      ["XeF2", "sp³d, linear"],
    ] as const;
    const r = cycle(rows, i);
    const wrongs = rows.filter((x) => x[0] !== r[0]).map((x) => x[1]);
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: `Hybridisation and shape of ${r[0]}`,
      correct: r[1],
      wrong: wrongs.slice(0, 3),
      why: `VSEPR + hybridisation for ${r[0]}: ${r[1]}.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Formal charge =",
      correct: "valence − nonbonding − ½ bonding",
      wrong: ["oxidation number", "valence − bonding", "group number only"],
      why: "Best Lewis structure minimises |FC| and puts negative FC on the more electronegative atom.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Bond order in MOT for N₂ is",
      correct: "3",
      wrong: ["2", "2.5", "1"],
      why: "N₂: $KK(\\sigma2s)^2(\\sigma^*2s)^2(\\pi2p)^4(\\sigma2p)^2$. BO=$(8-2)/2=3$. O₂ is 2 and paramagnetic.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Hydrogen bond is strongest in",
      correct: "HF (among HF, H2O, NH3 — actually H2O has higher b.p. due to more bonds, but H-bond strength HF > H2O > NH3)",
      wrong: ["CH4", "HCl", "PH3"],
      why: "FON. HF has the strongest individual H-bond; water has a network.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-bonding",
      i,
      subject: "chemistry",
      stem: "Dipole moment of CO₂ is",
      correct: "zero (linear, bond dipoles cancel)",
      wrong: ["nonzero because C=O is polar", "same as SO2", "same as H2O"],
      why: "SO₂ is bent, μ ≠ 0. Vector sum matters.",
    });
  }
  return mcq({
    chapterId: "chem-bonding",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Back-bonding is expected in",
      correct: "BF₃ (empty p on B, filled p on F)",
    wrong: ["CH4", "NH4⁺", "NaCl"],
    why: "Also BeCl₂, C–F no, G13–G17 classics. Explains short B–F and Lewis acidity order BBr₃ > BCl₃ > BF₃.",
  });
}

function states(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-states",
      i,
      subject: "chemistry",
      stem: "Ideal gas law is",
      correct: "$PV=nRT$",
      wrong: ["$P=nRT$", "$PV=RT$", "$P/T=nRV$"],
      why: "R = 0.0821 L atm mol⁻¹ K⁻¹ = 8.314 J mol⁻¹ K⁻¹.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-states",
      i,
      subject: "chemistry",
      stem: "van der Waals $(P+an^2/V^2)(V-nb)=nRT$. $a$ accounts for",
      correct: "intermolecular attraction",
      wrong: ["finite volume of molecules ($b$)", "gravity", "ionisation"],
      why: "Easily liquefiable gases (NH₃, CO₂) have large $a$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-states",
      i,
      subject: "chemistry",
      stem: "Graham’s law: rate of diffusion $\\propto$",
      correct: "$1/\\sqrt{M}$",
      wrong: ["$M$", "$\\sqrt{M}$", "$1/M$"],
      why: "Also $\\propto 1/\\sqrt{d}$. Same T,P.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-states",
      i,
      subject: "chemistry",
      stem: "Critical temperature is",
      correct: "the temperature above which a gas cannot be liquefied by pressure alone",
      wrong: ["boiling point", "Boyle temperature always equal to Tc", "0 K"],
      why: "$T_c=8a/27Rb$. At $T_c$, liquid–gas meniscus vanishes.",
    });
  }
  return mcq({
    chapterId: "chem-states",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Compressibility $Z=PV/nRT$. For an ideal gas $Z=$",
    correct: "1",
    wrong: ["0", "a/b", "∞"],
    why: "$Z<1$ attractions dominate; $Z>1$ excluded volume dominates (high P).",
  });
}

function thermo(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "First law of thermodynamics (chemistry sign, w on the system)",
      correct: "$\\Delta U=q+w$",
      wrong: ["$\\Delta U=q-w$ always in chemistry NCERT? (NCERT chemistry uses ΔU=q+w with w=−PΔV)", "$q=\\Delta U+w$ with w by the system as in physics — mix the books carefully", "$\\Delta U=q$"],
      why: "Chemistry NCERT: ΔU=q+w, w=−PΔV for expansion. Physics NCERT: Q=ΔU+W with W by the system. Same physics, opposite W sign.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "Enthalpy $H=$",
      correct: "$U+PV$",
      wrong: ["$U-PV$", "$U+P/V$", "$q$ at constant volume"],
      why: "$\\Delta H=q_p$. $\\Delta U=q_v$. $\\Delta H=\\Delta U+\\Delta n_g RT$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "Hess’s law is a consequence of $H$ being a",
      correct: "state function",
      wrong: ["path function", "intensive property only", "sixth parameter"],
      why: "Cycle the formation enthalpies. Born–Haber is Hess on ionic solids.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "Spontaneous in isolation: $\\Delta S_{\\mathrm{univ}}$ is",
      correct: "positive",
      wrong: ["zero", "negative", "undefined"],
      why: "Second law. At equilibrium $\\Delta S_{\\mathrm{univ}}=0$. $\\Delta G=\\Delta H-T\\Delta S$ at constant T,P.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-thermo",
      i,
      subject: "chemistry",
      stem: "For a spontaneous cell reaction $\\Delta G^\\circ$ is",
      correct: "negative, and $E^\\circ>0$",
      wrong: ["positive", "zero if $E^\\circ>0$", "$\\Delta G^\\circ=+nFE^\\circ$"],
      why: "$\\Delta G^\\circ=-nFE^\\circ=-RT\\ln K$.",
    });
  }
  return mcq({
    chapterId: "chem-thermo",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Entropy of a perfect crystal at 0 K is",
      correct: "0 (third law)",
    wrong: ["R", "∞", "k ln 2 always"],
    why: "Absolute entropies in tables are third-law values. Residual entropy exists if disorder freezes in (CO, ice).",
  });
}

function eq(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "For $aA+bB\\rightleftharpoons cC+dD$, $K_c$ is",
      correct: "$[C]^c[D]^d/[A]^a[B]^b$",
      wrong: ["$[A]^a[B]^b/[C]^c[D]^d$", "$K_p$ always equal to $K_c$", "sum of concentrations"],
      why: "$K_p=K_c(RT)^{\\Delta n_g}$. Solids/liquids omitted (unit activity).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "Le Chatelier: increasing P on a gas equilibrium shifts to the side with",
      correct: "fewer moles of gas",
      wrong: ["more moles of gas", "no shift ever", "the exothermic side always"],
      why: "Temperature: exo favoured by cooling. Catalyst: no shift, faster both ways.",
    });
  }
  if (m === 2) {
    const c = cycle([0.01, 0.001, 0.1, 1e-4], i);
    const pH = nint(-Math.log10(c) * 10) / 10;
    return num({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: `pH of ${c} M strong monobasic acid (assume complete, 25 °C) is`,
      answer: pH,
      tolerance: 0.05,
      why: `$\\mathrm{pH}=-\\log_{10}[H^+]=-\\log_{10}(${c})=${pH}$.`,
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "Buffer of weak acid + salt: pH ≈",
      correct: "$\\mathrm{p}K_a+\\log([\\mathrm{salt}]/[\\mathrm{acid}])$",
      wrong: ["$\\mathrm{p}K_a$ only", "$-\\log C$", "$\\mathrm{p}K_b$"],
      why: "Henderson–Hasselbalch. Maximum capacity when pH=pKa.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-eq",
      i,
      subject: "chemistry",
      stem: "$K_w$ at 25 °C is",
      correct: "$10^{-14}$",
      wrong: ["$10^{-7}$", "1", "$10^{-1}$"],
      why: "pH of pure water 7. $K_w$ rises with T, so neutrality is not pH 7 at 100 °C.",
    });
  }
  return mcq({
    chapterId: "chem-eq",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Degree of dissociation of a weak acid is $\\approx$",
    correct: "$\\sqrt{K_a/C}$",
    wrong: ["$K_a C$", "$K_a/C$", "$C/K_a$"],
    why: "Ostwald. Valid if $\\alpha\\ll 1$. Solubility of sparingly soluble AB is $\\sqrt{K_{sp}}$.",
  });
}

function redox(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const rows = [
      ["Mn in KMnO4", "+7"],
      ["Cr in K2Cr2O7", "+6"],
      ["S in H2SO4", "+6"],
      ["N in HNO3", "+5"],
      ["O in OF2", "+2"],
      ["O in H2O2", "-1"],
      ["C in CO2", "+4"],
      ["Fe in Fe3O4", "+8/3"],
    ] as const;
    const r = cycle(rows, i);
    const wrongs = rows.filter((x) => x[1] !== r[1]).map((x) => x[1]);
    return mcq({
      chapterId: "chem-redox",
      i,
      subject: "chemistry",
      stem: `Oxidation number of ${r[0]} is`,
      correct: r[1],
      wrong: wrongs.slice(0, 3),
      why: `Assign O as −2 (except peroxides/OF2), H as +1 (except hydrides). ${r[0]} → ${r[1]}.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-redox",
      i,
      subject: "chemistry",
      stem: "n-factor of KMnO4 in acidic medium is",
      correct: "5",
      wrong: ["3", "1", "7"],
      why: "Mn(VII) → Mn(II), 5e. Neutral/weakly alkaline: 3. Strong alkaline: 1.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-redox",
      i,
      subject: "chemistry",
      stem: "Equivalent mass of an oxidant is",
      correct: "molar mass / n-factor",
      wrong: ["molar mass × n", "molar mass", "n-factor"],
      why: "Normality = molarity × n. $N_1 V_1=N_2 V_2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-redox",
      i,
      subject: "chemistry",
      stem: "A disproportionation reaction is one in which",
      correct: "the same element is oxidised and reduced",
      wrong: ["two elements swap", "only oxidation occurs", "catalysis"],
      why: "2H₂O₂ → 2H₂O+O₂; 2Cu⁺ → Cu+Cu²⁺.",
    });
  }
  return mcq({
    chapterId: "chem-redox",
    i,
    subject: "chemistry",
    stem: "In balancing redox (ion-electron), you may add H2O, H⁺, e⁻ in acid, and in base also",
      correct: "OH⁻",
    wrong: ["Na⁺ only", "Cl⁻", "nothing else"],
    why: "Alkaline: add OH⁻ to both sides after the acid skeleton, cancel water.",
  });
}

function goc(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Order of carbocation stability (simple aliphatic)",
      correct: "3° > 2° > 1° > methyl",
      wrong: ["methyl > 1° > 2° > 3°", "2° > 3° > 1°", "all equal"],
      why: "Hyperconjugation + inductive. Allylic/benzylic can beat aliphatic 3°.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Aromatic by Hückel: planar cyclic conjugated with",
      correct: "$(4n+2)\\,\\pi$ electrons",
      wrong: ["$4n\\,\\pi$ (that's antiaromatic if planar)", "any even number", "$n^2$"],
      why: "Benzene 6, cyclopentadienyl anion 6, tropylium 6. Cyclobutadiene is 4.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Inductive effect of −NO2 is",
      correct: "−I (electron withdrawing)",
      wrong: ["+I", "only −R, no I", "+R"],
      why: "−I and −R. Alkyls are +I. Halogens −I but +R (o,p directors, deactivators).",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Enantiomers are",
      correct: "nonsuperimposable mirror images",
      wrong: ["identical in all properties including plane-polarised light", "cis–trans on a ring always", "conformers"],
      why: "Diastereomers: not mirrors. Meso: chiral centres but achiral molecule.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-goc",
      i,
      subject: "chemistry",
      stem: "Acidity: which is strongest among the set?",
      correct: "CF3COOH (vs CH3COOH, HCOOH)",
      wrong: ["CH3COOH", "ethanol", "acetylene"],
      why: "−I of CF3. Order: carboxylic >> phenol > alcohol. Alkynes > alkenes > alkanes for C–H.",
    });
  }
  return mcq({
    chapterId: "chem-goc",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "Hyperconjugation needs",
      correct: "α-H on a carbon attached to an unsaturated/electron-deficient centre",
    wrong: ["only lone pairs", "only rings", "isotopes"],
    why: "No-bond resonance. Explains 3° carbocation, o,p of toluene, heat of hydrogenation of alkenes.",
  });
}

function hc(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-hc",
      i,
      subject: "chemistry",
      stem: "Markovnikov addition of HBr to propene gives",
      correct: "2-bromopropane",
      wrong: ["1-bromopropane", "1,2-dibromopropane", "propane"],
      why: "Unless ROOR (peroxide) — then anti-Markovnikov via radical.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-hc",
      i,
      subject: "chemistry",
      stem: "Benzene + CH3Cl / AlCl3 is",
      correct: "Friedel–Crafts alkylation → toluene",
      wrong: ["nitration", "sulfonation", "Wurtz"],
      why: "FC acylation is cleaner (no rearrange). Excess benzene, dry AlCl3.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-hc",
      i,
      subject: "chemistry",
      stem: "Baeyer’s reagent (cold dilute KMnO4) is used to test",
      correct: "unsaturation (alkenes/alkynes)",
      wrong: ["alkanes", "benzene (easily oxidised thus)", "CO2"],
      why: "Purple decolorises. Benzene does not, unless forcing oxidation of side chains.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-hc",
      i,
      subject: "chemistry",
      stem: "Acidic H of ethyne can be detected with",
      correct: "AgNO3 / ammoniacal Cu2Cl2 (white/red ppt of acetylide)",
      wrong: ["Br2 water only", "Tollen’s on the C–C triple always even internal", "FeCl3"],
      why: "Only terminal alkynes. Internal alkynes fail this test.",
    });
  }
  return mcq({
    chapterId: "chem-hc",
    i,
    subject: "chemistry",
    stem: "Nitration of benzene uses",
      correct: "conc. HNO3 + conc. H2SO4 (NO2⁺)",
    wrong: ["dil HNO3 only", "NO2 gas", "NaNO2 / HCl (that's diazotisation of aniline)"],
    why: "Electrophile nitronium. Meta for −NO2 further substitution.",
  });
}

function hydrogen(i: number): PlayItem {
  return mcq({
    chapterId: "chem-hydrogen",
    i,
    subject: "chemistry",
    exam: i % 3 === 0 ? "advanced" : "boards",
    stem: cycle(
      [
        "H2O2 is stored in",
        "Temporary hardness is due to",
        "Ionic hydride example",
        "Heavy water is",
        "Hydrogen peroxide is",
      ],
      i,
    ),
    correct: cycle(
      ["plastic / dark, stabilised, wax-lined bottles", "Ca(HCO3)2, Mg(HCO3)2", "NaH", "D2O", "an oxidising and reducing agent"],
      i,
    ),
    wrong: cycle(
      [
        ["open iron cans", "glass in sunlight", "copper vessels at 100 °C"],
        ["CaCl2 only", "NaCl", "silica"],
        ["CH4", "HCl", "NH3"],
        ["H2O2", "T2O only", "H3O+"],
        ["only oxidising", "only reducing", "neither"],
      ],
      i,
    ),
    why: "Advanced still asks hydrogen, hardness, H2O2 structure (open book, ~94°).",
  });
}

function sblock(i: number): PlayItem {
  return mcq({
    chapterId: "chem-sblock",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: cycle(
      [
        "Diagonal relationship is shown by",
        "Solvay process manufactures",
        "Gypsum is",
        "Alkali metal that forms superoxide",
        "Flame test of potassium is",
      ],
      i,
    ),
    correct: cycle(["Li and Mg", "Na2CO3", "CaSO4·2H2O", "K, Rb, Cs", "violet (viewed through cobalt glass)"], i),
    wrong: cycle(
      [
        ["Be and K", "Na and Al", "B and Si only"],
        ["NaOH", "KCl", "CaO"],
        ["CaOCl2", "CaSO4 (anhydrite only)", "MgSO4·7H2O"],
        ["Li only", "Na only", "all equally"],
        ["crimson", "apple green", "brick red"],
      ],
      i,
    ),
    why: "s-block is Main-deleted, Advanced-live. NCERT tables still win.",
  });
}

function solutions(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "Raoult’s law (volatile A): $p_A=$",
      correct: "$x_A p_A^\\circ$",
      wrong: ["$x_A / p_A^\\circ$", "$p_A^\\circ / x_A$", "$x_A+p_A^\\circ$"],
      why: "Ideal solutions obey. Positive deviation: A–B weaker (alcohol+water).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "Relative lowering of vapour pressure is equal to",
      correct: "mole fraction of solute (non-volatile, dilute)",
      wrong: ["molality", "molarity", "mole fraction of solvent"],
      why: "$(p^\\circ-p)/p^\\circ=x_{\\mathrm{solute}}$. Colligative.",
    });
  }
  if (m === 2) {
    const Kf = 1.86;
    const mola = cycle([0.5, 1, 2], i);
    const dT = Kf * mola;
    return num({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: `Depression of freezing point of water, $K_f=1.86$, molality ${mola} (i=1). $\\Delta T_f$ in K is`,
      answer: dT,
      why: "$\\Delta T_f=i K_f m$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "van ’t Hoff factor $i$ for complete dissociation of Al2(SO4)3 is",
      correct: "5",
      wrong: ["2", "3", "4"],
      why: "2 Al³⁺ + 3 SO4²⁻. For association of benzoic acid in benzene, i=0.5 ideally.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-solutions",
      i,
      subject: "chemistry",
      stem: "Osmotic pressure $\\pi=$",
      correct: "$CRT$ (van ’t Hoff)",
      wrong: ["$C/RT$", "$RT/C$", "$iC$ without T"],
      why: "Best colligative for molar mass of polymers. Reverse osmosis: apply P>π.",
    });
  }
  return mcq({
    chapterId: "chem-solutions",
    i,
    subject: "chemistry",
    stem: "Henry’s law: $p=K_H x$. At higher T, gas solubility generally",
      correct: "decreases (K_H increases)",
    wrong: ["increases", "is unchanged", "becomes 1"],
    why: "Warm soda goes flat. Scuba: N2 solubility at high P — decompression.",
  });
}

function electro(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "Nernst for $M^{n+}+ne\\to M$: $E=$",
      correct: "$E^\\circ+\\frac{0.059}{n}\\log[M^{n+}]$ (25 °C, solid M)",
      wrong: ["$E^\\circ-0.059\\log[M^{n+}]$ always n=1", "$E^\\circ$", "$0.059/n$ only"],
      why: "Q for reduction. For 2H⁺+2e→H2, $E=0-0.059\\,\\mathrm{pH}$ at 1 bar H2.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "Kohlrausch’s law: $\\Lambda_m^\\circ=$",
      correct: "sum of ionic conductivities $\\lambda_+^\\circ+\\lambda_-^\\circ$",
      wrong: ["product of λ", "difference", "molarity × κ"],
      why: "Lets you get $\\Lambda_m^\\circ$ of weak electrolytes from strong ones.",
    });
  }
  if (m === 2) {
    const t = cycle([965, 1930, 2895], i);
    const n = t / 965;
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: `Charge ${t} C. Faraday F≈96500 C mol⁻¹. Moles of electrons ≈`,
      correct: `${n / 100}`,
      wrong: [`${n}`, `${t}`, `${1 / n}`],
      why: "$n_e=Q/F$. 965 C ≈ 0.01 mol e⁻.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "In electrolysis of aq. NaCl (dilute) at cathode you get",
      correct: "H2 (not Na) in preference, unless molten",
      wrong: ["Na always", "Cl2 at cathode", "O2 at cathode"],
      why: "Discharge depends on E°, concentration, overpotential. Anode: Cl⁻ vs OH⁻.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-electro",
      i,
      subject: "chemistry",
      stem: "Conductivity $\\kappa$ of a strong electrolyte vs concentration",
      correct: "falls on dilution, while $\\Lambda_m$ rises",
      wrong: ["both rise", "both fall", "κ rises, Λm falls"],
      why: "$\\Lambda_m=\\kappa/C$. Infinite dilution: $\\Lambda_m^\\circ$.",
    });
  }
  return mcq({
    chapterId: "chem-electro",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "A primary cell that cannot be recharged: example",
      correct: "dry cell / mercury cell",
    wrong: ["lead-acid", "Ni-Cd", "Li-ion"],
    why: "Fuel cell: H2–O2, 2H2+O2→2H2O, E°=1.23 V, by-product water.",
  });
}

function kinetics(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "First-order half-life is",
      correct: "$0.693/k$, independent of $[A]_0$",
      wrong: ["$1/k[A]_0$ (that's second order, 2A)", "$[A]_0/2k$ (zero order)", "$k/0.693$"],
      why: "Zero: $t_{1/2}=[A]_0/(2k)$. Second (2A): $1/(k[A]_0)$.",
    });
  }
  if (m === 1) {
    const k = cycle([0.693, 1.386, 0.0693], i);
    const t = 0.693 / k;
    return num({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: `First order, $k=${k}\\,\\mathrm{s^{-1}}$. $t_{1/2}$ in seconds is`,
      answer: nint(t * 1000) / 1000,
      tolerance: 0.01,
      why: `$t_{1/2}=0.693/k=${t}$.`,
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "Arrhenius: $k=A e^{-E_a/RT}$. A plot of $\\ln k$ vs $1/T$ has slope",
      correct: "$-E_a/R$",
      wrong: ["$E_a/R$", "$-E_a$", "$A$"],
      why: "Higher T, faster. Catalyst lowers $E_a$ (alternate path).",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "Units of $k$ for an nth-order reaction (conc in mol L⁻¹, time s)",
      correct: "$\\mathrm{mol}^{1-n} L^{n-1} s^{-1}$",
      wrong: ["always s⁻¹", "always mol L⁻¹ s⁻¹", "dimensionless"],
      why: "First: s⁻¹. Second: L mol⁻¹ s⁻¹. Zero: mol L⁻¹ s⁻¹.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-kinetics",
      i,
      subject: "chemistry",
      stem: "Molecularity is",
      correct: "the number of molecules in an elementary step; integer",
      wrong: ["always equal to order", "can be 1.5", "defined for a complex reaction as a whole"],
      why: "Order is experimental and can be 0, 1.5, negative. Molecularity is mechanism.",
    });
  }
  return mcq({
    chapterId: "chem-kinetics",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "For a first-order reaction, a plot of $\\ln[A]$ vs $t$ is",
      correct: "linear, slope $-k$",
    wrong: ["linear, slope $+k$", "a curve always", "linear vs $1/[A]$ (that's second)"],
    why: "Zero: $[A]$ vs $t$. Second (2A): $1/[A]$ vs $t$.",
  });
}

function solid(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-solid",
      i,
      subject: "chemistry",
      exam: "advanced",
      stem: "Packing efficiency of ccp/fcc is",
      correct: "74%",
      wrong: ["68% (bcc)", "52% (simple cubic)", "100%"],
      why: "hcp also 74%. CN: sc 6, bcc 8, fcc/hcp 12.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-solid",
      i,
      subject: "chemistry",
      exam: "advanced",
      stem: "Number of atoms per unit cell in bcc is",
      correct: "2",
      wrong: ["1", "4", "8"],
      why: "fcc 4, sc 1, hcp 6. Corner 1/8, face 1/2, body 1.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-solid",
      i,
      subject: "chemistry",
      exam: "advanced",
      stem: "Schottky defect is",
      correct: "cation+anion vacancy pair (density down)",
      wrong: ["cation in interstitial (Frenkel, density ~same)", "extra electron (F-centre)", "nonstoichiometry of metal excess only"],
      why: "NaCl, KCl Schottky. AgCl, ZnS Frenkel.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-solid",
      i,
      subject: "chemistry",
      exam: "advanced",
      stem: "$d=ZM/(N_A a^3)$. For fcc, $Z=$",
      correct: "4",
      wrong: ["2", "1", "8"],
      why: "Also $4r=a\\sqrt{2}$ in fcc, $4r=a\\sqrt{3}$ in bcc.",
    });
  }
  return mcq({
    chapterId: "chem-solid",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "F-centres are",
      correct: "electron trapped in an anion vacancy — colour",
    wrong: ["proton excess", "metal vacancy only", "a type of Schottky in metals"],
    why: "NaCl heated in Na vapour goes yellow.",
  });
}

function surface(i: number): PlayItem {
  return mcq({
    chapterId: "chem-surface",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: cycle(
      [
        "Physisorption is characterised by",
        "Freundlich isotherm is",
        "A catalyst",
        "Tyndall effect is shown by",
        "Hardy–Schulze: coagulating power of an ion increases with",
      ],
      i,
    ),
    correct: cycle(
      [
        "low enthalpy, reversible, multilayer possible, no activation",
        "$x/m=k P^{1/n}$",
        "lowers activation energy, does not shift equilibrium",
        "colloids (not true solutions)",
        "charge (Al³⁺ >> Na⁺ for negative sols)",
      ],
      i,
    ),
    wrong: cycle(
      [
        ["high Ea, monolayer only always", "chemical bonds always", "increases with T strongly like chemisorption"],
        ["$x/m=kP$", "Langmuir only", "linear always"],
        ["is consumed", "changes K", "must be solid"],
        ["NaCl solution", "glucose(aq)", "all true solutions"],
        ["only mass", "only size", "nothing systematic"],
      ],
      i,
    ),
    why: "Surface chemistry is Main-deleted, Advanced-live. Langmuir, colloids, emulsions, catalysis.",
  });
}

function pblock(i: number): PlayItem {
  return mcq({
    chapterId: "chem-pblock",
    i,
    subject: "chemistry",
    stem: cycle(
      [
        "Inert pair effect is most pronounced in",
        "Structure of P4 is",
        "Oleum is",
        "Noble gas that forms most compounds",
        "Ammonia is a",
      ],
      i,
    ),
    correct: cycle(["Tl / Pb (6s² reluctant)", "tetrahedral molecule", "H2S2O7", "Xe", "Lewis base (lone pair)"], i),
    wrong: cycle(
      [
        ["B", "C", "N"],
        ["square planar P4", "linear", "octahedral"],
        ["H2SO3", "H2S2O8 only", "SO2"],
        ["He", "Ne", "Ar exclusively"],
        ["Lewis acid", "aprotic solvent only", "oxidising agent only"],
      ],
      i,
    ),
    why: "Stick to the current NTA list (group 13–18 as notified) plus NCERT lines.",
  });
}

function dblock(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-dblock",
      i,
      subject: "chemistry",
      stem: "Transition metals are d-block elements with",
      correct: "partly filled d in atoms or ions",
      wrong: ["always 2+ only", "empty d always", "no variable oxidation states"],
      why: "Zn, Cd, Hg are d-block but not typical transition (d¹⁰).",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-dblock",
      i,
      subject: "chemistry",
      stem: "Highest oxidation state of Mn is",
      correct: "+7 (KMnO4)",
      wrong: ["+6", "+4", "+2"],
      why: "Equals group number for 3d early. Cr +6, Mn +7, Fe +6 rare.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-dblock",
      i,
      subject: "chemistry",
      stem: "KMnO4 in acid oxidises Fe²⁺. n-factor of KMnO4 is",
      correct: "5",
      wrong: ["3", "1", "7"],
      why: "Same as redox chapter. Titration self-indicator.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-dblock",
      i,
      subject: "chemistry",
      stem: "Lanthanoid contraction is due to",
      correct: "poor shielding by 4f",
      wrong: ["poor shielding by 3d only", "increasing s-electron", "relativistic 7s only"],
      why: "Zr/Hf nearly same size. Also the reason 5d resembles 4d.",
    });
  }
  return mcq({
    chapterId: "chem-dblock",
    i,
    subject: "chemistry",
    stem: "Interstitial compounds form when",
      correct: "small atoms (H, C, N) sit in metal voids — hard, high m.p.",
    wrong: ["two metals mix (that's alloy substitutional too)", "ionic crystals", "noble gases freeze"],
    why: "Steel is interstitial carbon in iron, plus more metallurgy.",
  });
}

function coord(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "Coordination number of Co in [Co(NH3)6]³⁺ is",
      correct: "6",
      wrong: ["3", "2", "9"],
      why: "CN = number of ligand donor atoms attached. EDTA is hexadentate, CN 6.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "IUPAC name of [Pt(NH3)2Cl2] includes",
      correct: "diammine / dichlorido platinum(II) (cisplatin is the cis isomer)",
      wrong: ["platinum dichloride ammonia", "platinate always", "Pt(IV)"],
      why: "Ligands alphabetical, metal + oxidation state. Anionic complex: −ate.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "According to CFT, [Fe(CN)6]⁴⁻ is",
      correct: "low spin d⁶, t2g⁶, diamagnetic",
      wrong: ["high spin d⁶, four unpaired", "d⁵", "tetrahedral"],
      why: "CN⁻ strong field. [FeF6]³⁻ / [Fe(H2O)6]³⁺ high spin.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "Linkage isomerism requires",
      correct: "ambidentate ligand (NO2⁻, SCN⁻)",
      wrong: ["only hydrate isomerism", "optical pair", "cis–trans only"],
      why: "Ionisation isomerism: [Co(NH3)5Br]SO4 vs [Co(NH3)5SO4]Br.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-coord",
      i,
      subject: "chemistry",
      stem: "Tetrahedral complexes are usually",
      correct: "high spin (Δt = 4/9 Δo, pairing energy wins)",
      wrong: ["always low spin", "square planar always", "CN 6"],
      why: "Square planar d⁸ (Ni²⁺, Pd²⁺, Pt²⁺) especially with strong field.",
    });
  }
  return mcq({
    chapterId: "chem-coord",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "EAN (18-electron) of [Ni(CO)4]: Ni is",
      correct: "Ni(0), 10+8=18",
    wrong: ["Ni(II)", "16e", "Ni(IV)"],
    why: "Carbonyl complexes love 18e. Ferrocene, Cr(CO)6 too.",
  });
}

function metallurgy(i: number): PlayItem {
  return mcq({
    chapterId: "chem-metallurgy",
    i,
    subject: "chemistry",
    exam: i % 2 ? "advanced" : "main",
    stem: cycle(
      [
        "Froth floatation is typically for",
        "Hall–Héroult extracts",
        "Mond process is for",
        "Zone refining is for",
        "Self-reduction is used for",
      ],
      i,
    ),
    correct: cycle(["sulphide ores", "aluminium", "nickel", "semiconductors (Ge, Si, Ga, B)", "Cu / Pb / Hg sulphides (after roasting)"], i),
    wrong: cycle(
      [
        ["bauxite only", "sea water Mg", "halide ores always"],
        ["iron in blast furnace", "gold cyanide", "zinc"],
        ["iron", "Al", "Cu"],
        ["pig iron", "NaCl", "limestone"],
        ["alkali metals", "Al always", "Au"],
      ],
      i,
    ),
    why: "NCERT flowsheets: concentration → conversion → reduction → refining.",
  });
}

function halo(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-halo",
      i,
      subject: "chemistry",
      stem: "SN2 is favoured by",
      correct: "1° (or methyl), polar aprotic, strong nucleophile",
      wrong: ["3° in polar protic", "bulky base / heat (that's E2)", "radical peroxide"],
      why: "Inversion. 3° → SN1, racemisation, polar protic, C+ rearrange.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-halo",
      i,
      subject: "chemistry",
      stem: "Aryl halides are less reactive to SN because",
      correct: "C–X has partial double-bond character from resonance; C is sp²",
      wrong: ["they are ionic", "X is +I only", "benzene is antiaromatic"],
      why: "Need benzyne (KNH2) or addition–elimination with EWG o/p.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-halo",
      i,
      subject: "chemistry",
      stem: "Williamson ether synthesis is",
      correct: "RONa + R'CH2X → ROR′ (SN2)",
      wrong: ["phenol + Br2", "Wurtz", "HVZ"],
      why: "Don’t use 3° halide (E2). Phenoxide + CH3I works for anisole.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-halo",
      i,
      subject: "chemistry",
      stem: "Finkelstein reaction is",
      correct: "RCl/RBr → RI using NaI in acetone",
      wrong: ["Swarts (fluorination with AgF/SbF3)", "Sandmeyer", "Gattermann"],
      why: "NaCl/NaBr ppt from acetone, pulls SN2.",
    });
  }
  return mcq({
    chapterId: "chem-halo",
    i,
    subject: "chemistry",
    stem: "CHCl3 + air + light →",
      correct: "phosgene (COCl2) — reason to store in dark, alcohol as inhibitor",
    wrong: ["only CCl4", "CH4", "no reaction"],
    why: "Iodoform test: methyl ketones and CH3CH(OH)– give yellow CHI3.",
  });
}

function alcohol(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-alcohol",
      i,
      subject: "chemistry",
      stem: "Lucas test: fastest turbidity with",
      correct: "3° alcohol",
      wrong: ["1° alcohol", "methanol", "phenol"],
      why: "ZnCl2/HCl, SN1. Phenols don’t give Lucas the same way.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-alcohol",
      i,
      subject: "chemistry",
      stem: "Phenol + Br2 (aq) gives",
      correct: "2,4,6-tribromophenol (white ppt)",
      wrong: ["only o-bromophenol in water", "no reaction", "picric acid"],
      why: "OH is strongly activating. In CS2 / low T / nonpolar, monobromo.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-alcohol",
      i,
      subject: "chemistry",
      stem: "Reimer–Tiemann on phenol gives",
      correct: "salicylaldehyde (o-CHO)",
      wrong: ["salicylic acid only (that's Kolbe)", "anisole", "picric acid"],
      why: "CHCl3 / NaOH, dichlorocarbene. Kolbe: CO2 / phenol → salicylic acid.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-alcohol",
      i,
      subject: "chemistry",
      stem: "Order of acidity",
      correct: "phenol > water > alcohol",
      wrong: ["alcohol > water > phenol", "all equal", "alcohol > phenol > water"],
      why: "Phenoxide resonance. Nitrophenols even stronger (picric ~ mineral acid).",
    });
  }
  return mcq({
    chapterId: "chem-alcohol",
    i,
    subject: "chemistry",
    stem: "Vicinal diol cleavage uses",
      correct: "HIO4 (periodic acid) / Pb(OAc)4",
    wrong: ["LiAlH4", "NaBH4", "Tollen"],
    why: "Pinacol–pinacolone is acid-catalysed rearrangement of 3° 1,2-diols.",
  });
}

function carbonyl(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Tollen’s reagent distinguishes",
      correct: "aldehyde (silver mirror) from ketone",
      wrong: ["alcohol from phenol", "alkene from alkyne", "1° from 2° halide"],
      why: "Fehling works for aliphatic aldehydes. Benzaldehyde: Tollen’s +, Fehling −.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Aldol condensation needs",
      correct: "α-H on a carbonyl, dilute base or acid",
      wrong: ["no α-H + conc. NaOH (that's Cannizzaro)", "only esters (Claisen is related)", "peroxide"],
      why: "Crossed aldol: use one partner without α-H (HCHO, PhCHO) to keep it clean.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Cannizzaro is",
      correct: "disproportionation of aldehydes with no α-H in conc. base",
      wrong: ["oxidation of ketones", "reduction with LiAlH4 only", "halogenation"],
      why: "HCHO, PhCHO, (CH3)3CCHO. Crossed Cannizzaro: HCHO as reductant.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Haloform test is given by",
      correct: "methyl ketones and CH3CH(OH)–",
      wrong: ["benzophenone", "HCHO", "acetic acid only without iodoform of acetone"],
      why: "I2/NaOH, yellow CHI3. Ethanol and acetaldehyde too.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "chem-carbonyl",
      i,
      subject: "chemistry",
      stem: "Clemmensen vs Wolff–Kishner: pick",
      correct: "Clemmensen is acidic (Zn–Hg/HCl); WK is basic (NH2NH2 / KOH)",
      wrong: ["both acidic", "both with LiAlH4", "WK uses Zn–Hg"],
      why: "Choose the medium the rest of the molecule survives.",
    });
  }
  return mcq({
    chapterId: "chem-carbonyl",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: "HVZ reaction puts Br on",
      correct: "α-carbon of a carboxylic acid (red P / Br2)",
    wrong: ["benzene ring always", "the OH of COOH", "β-carbon only"],
    why: "Hell–Volhard–Zelinsky. Need α-H.",
  });
}

function amines(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "chem-amines",
      i,
      subject: "chemistry",
      stem: "Hoffmann bromamide: RCONH2 / Br2 / KOH gives",
      correct: "RNH2 with one carbon less",
      wrong: ["RCONHBr as the end product", "RCOOH", "alkane"],
      why: "Isocyanate intermediate. Loss of one C. Useful for 1° amines.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "chem-amines",
      i,
      subject: "chemistry",
      stem: "Carbylamine test is given by",
      correct: "1° amines (alcoholic KOH + CHCl3, foul RNC)",
      wrong: ["only 2° amines", "only 3° amines", "amides"],
      why: "Aliphatic and aromatic 1°. Hinsberg distinguishes 1°/2°/3°.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "chem-amines",
      i,
      subject: "chemistry",
      stem: "Aniline does not undergo FC reaction easily because",
      correct: "the lone pair complexes with AlCl3 (deactivating)",
      wrong: ["aniline is meta director", "NH2 is deactivating by −I only", "it is a gas"],
      why: "Acetylate first (protection), then FC, then hydrolyse.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "chem-amines",
      i,
      subject: "chemistry",
      stem: "Sandmeyer: ArN2⁺ + CuCl gives",
      correct: "ArCl",
      wrong: ["ArH (that's H3PO2)", "ArOH (warm water)", "ArF (Balz–Schiemann, HBF4)"],
      why: "CuBr, CuCN similarly. Gattermann: Cu powder + HX.",
    });
  }
  return mcq({
    chapterId: "chem-amines",
    i,
    subject: "chemistry",
    stem: "Aqueous basicity of methylamines vs aniline: aniline is",
      correct: "weaker (lone pair delocalised into the ring)",
    wrong: ["stronger than MeNH2", "equal to NH3 always", "not a base"],
    why: "Gas phase vs aqueous orders differ (solvation). pKb aniline 9.4, aliphatic ~3–4.",
  });
}

function bio(i: number): PlayItem {
  return mcq({
    chapterId: "chem-bio",
    i,
    subject: "chemistry",
    exam: "main",
    stem: cycle(
      [
        "Glucose + Tollen’s gives",
        "Peptide bond is",
        "DNA base pair A–T has",
        "Vitamin C is",
        "Sucrose on hydrolysis gives",
        "Kwashiorkor is related to",
      ],
      i,
    ),
    correct: cycle(
      ["silver mirror (aldehyde in open-chain)", "–CO–NH–", "2 H-bonds (G–C has 3)", "ascorbic acid, water-soluble", "glucose + fructose", "protein deficiency"],
      i,
    ),
    wrong: cycle(
      [
        ["no reaction (it's a polyol only)", "Fehling never works", "only Benedict on sucrose"],
        ["ether", "ester only", "glycoside only"],
        ["3 H-bonds", "covalent C–C", "ionic"],
        ["calciferol", "fat-soluble always", "phylloquinone"],
        ["two glucose (that's maltose)", "galactose + glucose (lactose)", "only glucose"],
        ["vitamin A", "iodine", "iron only"],
      ],
      i,
    ),
    why: "Biomolecules in Main is NCERT verbatim. Invert sugar, mutarotation, essential amino acids, denaturation.",
  });
}

function polymers(i: number): PlayItem {
  return mcq({
    chapterId: "chem-polymers",
    i,
    subject: "chemistry",
    exam: i % 2 ? "advanced" : "boards",
    stem: cycle(
      [
        "Nylon-6,6 is a",
        "Buna-S contains",
        "Bakelite is from",
        "Natural rubber is",
        "Teflon monomer is",
      ],
      i,
    ),
    correct: cycle(
      ["polyamide of hexamethylenediamine + adipic acid", "butadiene + styrene", "phenol + HCHO", "cis-1,4-polyisoprene", "tetrafluoroethene"],
      i,
    ),
    wrong: cycle(
      [
        ["polyester", "PE", "PVC"],
        ["isoprene only", "acrylonitrile only (Buna-N)", "phenol"],
        ["urea only", "ethene", "caprolactam (nylon-6)"],
        ["trans-polychloroprene (neoprene)", "PVC", "PMMA"],
        ["ethene", "vinyl chloride", "styrene"],
      ],
      i,
    ),
    why: "Main-deleted, Advanced/boards may still touch. Addition vs condensation, vulcanisation.",
  });
}

function everyday(i: number): PlayItem {
  return mcq({
    chapterId: "chem-everyday",
    i,
    subject: "chemistry",
    exam: "boards",
    stem: cycle(
      [
        "Soap in hard water gives",
        "An anionic detergent example is",
        "Antipyretic example",
        "Broad-spectrum antibiotic example",
        "Antihistamine is used for",
      ],
      i,
    ),
    correct: cycle(["scum (Ca/Mg salts)", "sodium lauryl sulphate", "paracetamol / aspirin", "chloramphenicol", "allergy"], i),
    wrong: cycle(
      [
        ["more lather", "nothing", "only CO2"],
        ["CTAB (that's cationic)", "glyceryl oleate (soap-like ester of fat)", "sorbital"],
        ["ranitidine (ulcer, H2 blocker)", "insulin", "morphine (analgesic narcotic)"],
        ["penicillin G only (narrow, gram +)", "aspirin", "serotonin"],
        ["diabetes", "blood pressure only", "constipation"],
      ],
      i,
    ),
    why: "NCERT chemistry in everyday life — Main-deleted, boards still.",
  });
}

function env(i: number): PlayItem {
  return mcq({
    chapterId: "chem-env",
    i,
    subject: "chemistry",
    exam: "boards",
    stem: cycle(
      [
        "Ozone in stratosphere is formed by",
        "Greenhouse gas among the following",
        "BOD measures",
        "Acid rain pH is typically",
        "Which depletes ozone?",
      ],
      i,
    ),
    correct: cycle(["O2 + hν → 2O, then O+O2+M → O3", "CO2 / CH4 / N2O / CFCs / H2O", "oxygen demand of organic pollution", "below 5.6", "CFCs (Cl radicals)"], i),
    wrong: cycle(
      [
        ["N2 + O2 lightning only", "photosynthesis", "H2O2 rain"],
        ["N2", "O2", "Ar"],
        ["only metal ions", "pH only", "COD is identical always"],
        ["7", "14", "8.2 of oceans"],
        ["He", "N2", "H2 only"],
      ],
      i,
    ),
    why: "Environmental chemistry is Main-deleted. Know BOD vs COD, PAN, eutrophication.",
  });
}

function qual(i: number): PlayItem {
  return mcq({
    chapterId: "chem-qual",
    i,
    subject: "chemistry",
    exam: "advanced",
    stem: cycle(
      [
        "Group II cations are precipitated as sulphides in",
        "Brown ring test is for",
        "Nessler’s reagent detects",
        "Which gives chromyl chloride test?",
        "Prussian blue is",
      ],
      i,
    ),
    correct: cycle(["acidic medium (dil. HCl)", "nitrate", "NH4⁺", "Cl⁻", "Fe4[Fe(CN)6]3"], i),
    wrong: cycle(
      [
        ["alkaline medium (that's gp IV)", "neutral only", "aqua regia first"],
        ["sulphate", "halide", "NH4⁺"],
        ["Fe³⁺", "Al³⁺", "Zn²⁺"],
        ["Br⁻ (that gives Br2)", "I⁻", "F⁻"],
        ["Turnbull only as a different formula in old texts — now same", "Cu2[Fe(CN)6]", "Co(AlO2)2"],
      ],
      i,
    ),
    why: "Qualitative analysis is Advanced-only. Learn gp I–V, interfering anions, borax bead, charcoal cavity.",
  });
}

function practical(i: number): PlayItem {
  return mcq({
    chapterId: "chem-practical",
    i,
    subject: "chemistry",
    exam: "main",
    stem: cycle(
      [
        "A burette reading should be recorded to",
        "Phenolphthalein end point (strong acid–strong base) is",
        "KMnO4 titration is carried out in",
        "A hygroscopic substance in a weighing bottle should be weighed",
        "Rf in chromatography is",
      ],
      i,
    ),
    correct: cycle(["0.05 mL / 0.1 mL as marked, consistently", "pink → colourless or the reverse, pH ~ 8–10", "dilute H2SO4 (not HCl — Cl⁻ is oxidised)", "by difference, quickly", "distance by spot / distance by solvent"], i),
    wrong: cycle(
      [
        ["1 mL only", "as an integer mL", "to 0.001 mL"],
        ["methyl orange in the same range always", "pH 3 always", "no indicator needed"],
        ["conc. HCl", "HNO3", "NaOH"],
        ["after overnight open air", "on filter paper", "hot"],
        ["always 2", "solvent / spot", "a mass ratio"],
      ],
      i,
    ),
    why: "Experimental skills in Main: least count, indicators, errors, salt analysis observations.",
  });
}
