/** Extra conceptual stems mixed into the mill bank. */
type Row = readonly [stem: string, correct: string, w1: string, w2: string, w3: string, why: string];

export const PLUS: Record<string, readonly Row[]> = {
  "phy-units": [
    ["Significant figures in 0.00250 are", "3", "2", "5", "1", "Leading zeros after the decimal are not significant; trailing zeros in a decimal are."],
    ["1 eV in joules is of order", "10⁻¹⁹", "10⁻¹⁶", "10⁻¹³", "1", "1.6×10⁻¹⁹ J. Charge × 1 volt."],
    ["Steradian is the SI unit of", "solid angle (dimensionless)", "plane angle", "luminous intensity", "energy density", "Like the radian, it is a dimensionless derived unit."],
  ],
  "phy-motion-1d": [
    ["Instantaneous velocity is the slope of", "x–t", "v–t", "a–t", "a–x", "Displacement–time. a is slope of v–t."],
    ["A body thrown up has, at the top,", "v=0, a=g down", "v=0, a=0", "v max, a=0", "v=g", "Velocity turns; gravity does not switch off."],
    ["Relative velocity of A w.r.t. B in 1-D is", "v_A − v_B", "v_A + v_B always", "0", "v_A v_B", "Signed speeds on a line."],
  ],
  "phy-motion-2d": [
    ["Time of flight on level ground is", "2u sinθ / g", "u sinθ / g", "u² sin 2θ / g", "2u / g", "Up and down each take u sinθ / g."],
    ["Angular speed ω =", "v/r = 2π/T", "vr", "v²/r", "r/v²", "a_n = ω² r = v²/r."],
    ["A river-boat problem is solved with", "vector addition of velocities", "energy", "Gauss", "Snell", "v_boat relative to ground = v_boat,water + v_water."],
  ],
  "phy-nlm": [
    ["Action–reaction pairs never cancel because they act on", "different bodies", "the same body", "the earth only", "massless strings only", "You never put both on one FBD."],
    ["Limiting friction is", "μ_s N", "μ_k N always even at rest", "0", "mg", "Kinetic is μ_k N while sliding, usually smaller."],
    ["A lift accelerating down with a: apparent weight is", "m(g−a)", "m(g+a)", "mg", "0 always", "Free fall a=g ⇒ weightlessness."],
  ],
  "phy-wep": [
    ["Conservative force: work on a closed loop is", "0", "mgh", "max", "undefined", "Path independence ⇔ loop work 0 ⇔ F=−∇U."],
    ["Inelastic collision conserves", "momentum (if no ext. impulse)", "kinetic energy", "neither", "both always", "e<1; K is lost to heat/deformation."],
    ["Variable force work is", "∫ F dx", "F x always", "F/x", "0", "Area under F–x."],
  ],
  "phy-rotation": [
    ["Moment of inertia of a thin ring about its central axis is", "MR²", "½ MR²", "⅖ MR²", "⅓ ML²", "All mass at r=R. Disc is ½; solid sphere ⅖."],
    ["Angular impulse equals", "ΔL", "Δp", "ΔK", "τ / t", "∫τ dt = ΔL."],
    ["Toppling vs sliding: a body topples if the line of weight falls", "outside the base", "inside the base", "on the CM", "vertical always", "Also compare μ with the geometric ratio."],
  ],
  "phy-gravitation": [
    ["g at depth d is", "g(1−d/R)", "g(1−2d/R)", "g(1+d/R)", "0", "Height uses (1+h/R)⁻² ≈ 1−2h/R."],
    ["Gravitational PE of two point masses is", "−GMm/r", "GMm/r", "−GMm/r²", "0 at the surface always", "Zero at infinity by convention."],
    ["Geostationary orbit is equatorial with T =", "24 h", "12 h", "27 days", "90 min", "Polar sun-synchronous is a different animal."],
  ],
  "phy-solids": [
    ["Poisson ratio σ is", "lateral strain / longitudinal strain", "Y/B", "stress/strain", "ΔV/V", "Typically 0.2–0.4 for metals; 0.5 for incompressible."],
    ["Breaking stress is", "force at break / original area", "Y", "strain", "energy", "Ultimate strength on the stress–strain curve."],
  ],
  "phy-fluids": [
    ["Archimedes: buoyant force equals", "weight of displaced fluid", "weight of the body", "mg always", "pressure at the bottom times area only if you forget the top", "Sinking if weight > buoyancy max."],
    ["Venturi: the narrow section has", "higher v, lower P", "lower v, higher P", "same P", "vacuum always", "Bernoulli + continuity."],
    ["Terminal velocity: net force is", "0 (drag + buoyancy = weight)", "mg", "6π η r v only", "∞", "Then a=0, v constant."],
  ],
  "phy-thermal": [
    ["A constrained rod heated by ΔT develops stress", "Y α ΔT", "α ΔT", "Y ΔT", "0", "Strain αΔT is killed by compression."],
    ["Latent heat is heat for", "phase change at constant T", "1 K rise", "radiation", "conduction", "Do not use mcΔT through a plateau."],
  ],
  "phy-thermo": [
    ["Adiabatic reversible: TV^{γ−1} =", "constant", "P", "0", "R", "Also PV^γ and T^γ P^{1−γ}."],
    ["For a cycle, ΔU =", "0 so Q_net = W_net", "Q", "W", "∞", "State function on a closed path."],
  ],
  "phy-ktg": [
    ["Order of molecular speeds is", "v_mp < <v> < v_rms", "v_rms < <v> < v_mp", "all equal", "v_mp largest", "√2 : √(8/π) : √3."],
    ["Mixture of gases: C_V is a", "mole-fraction weighted average", "mass average always", "the larger C_V", "R", "Internal energy is extensive."],
  ],
  "phy-oscillations": [
    ["At x = A/2, KE/E in SHM is", "3/4", "1/2", "1/4", "1", "K = E(1 − x²/A²) = E(1−1/4)."],
    ["Series springs: k_eq⁻¹ =", "k₁⁻¹ + k₂⁻¹", "k₁+k₂", "k₁k₂", "0", "Parallel: k_eq = k₁+k₂."],
  ],
  "phy-waves": [
    ["End correction per open end is about", "0.6 r", "r", "2r", "0", "Resonance tube: subtract two resonances to kill e."],
    ["Sound in a gas: v =", "√(γRT/M)", "√(RT/M)", "√(P/ρ) without γ", "√(γP)", "Laplace vs Newton."],
  ],
  "phy-charges": [
    ["A conductor’s excess charge resides", "on the outer surface (electrostatics)", "in the bulk", "on the inner cavity wall always even with no charge inside", "nowhere", "A charge in a cavity induces −q on the inner wall."],
    ["Flux through a closed surface depends on", "enclosed charge only", "where that charge sits inside", "charges outside", "the shape in a nonlinear way for Gauss’s law", "Shape matters for finding E, not for flux."],
  ],
  "phy-potential": [
    ["Equipotentials are perpendicular to", "field lines", "each other", "charges always", "the ground", "No work along an equipotential."],
    ["Two capacitors joined share charge so that", "V becomes common (if connected in parallel)", "Q becomes common always", "U increases always", "C vanishes", "Isolated combination: Q conserved, U falls."],
  ],
  "phy-current": [
    ["Drift speed v_d is", "J / (n e)", "c", "thermal speed", "E/B", "I = n e A v_d."],
    ["Colour code: gold band is", "5% tolerance (or ×0.1 multiplier)", "1%", "10%", "the value 4", "Silver 10%; none 20%."],
  ],
  "phy-moving": [
    ["Force on a charge in B is", "q v × B", "q v · B", "q B", "0 always", "Zero if v ∥ B. Helix if there is a parallel component."],
    ["Ampère: ∮ B · dl =", "μ₀ I_encl", "Q/ε₀", "0 always", "B · A", "Displacement current is Maxwell’s add-on."],
  ],
  "phy-mag-matter": [
    ["Diamagnetic χ is", "small and negative", "large positive", "∞", "0 exactly", "Superconductors are perfect diamagnets (Meissner)."],
    ["Earth’s magnetic field: dip is 90° at the", "magnetic poles", "equator", "tropics", "everywhere", "Inclination 0° at the magnetic equator."],
  ],
  "phy-emi": [
    ["Self inductance L from ε =", "−L dI/dt", "L I", "B A", "IR", "Also Φ = L I for a single loop set."],
    ["Eddy currents are reduced by", "laminating the core", "using solid iron", "higher frequency only", "removing B", "Thin sheets cut the current loops."],
  ],
  "phy-ac": [
    ["Q-factor of a series LCR is", "ω₀ L / R", "R / ω₀ L", "1", "C/L", "High Q ⇒ sharp resonance, small bandwidth."],
    ["Transformer: V_s / V_p =", "N_s / N_p", "N_p / N_s", "I_s / I_p", "1", "Ideal: I_p / I_s = N_s / N_p (power in = power out)."],
  ],
  "phy-emw": [
    ["c =", "1/√(μ₀ ε₀)", "μ₀ ε₀", "√(μ₀/ε₀)", "E/B²", "Also E/B = c for a plane wave."],
    ["Displacement current is", "ε₀ dΦ_E / dt", "I through a wire only", "0 in a capacitor", "B", "Maxwell’s fix of Ampère."],
  ],
  "phy-ray": [
    ["Mirror formula (New Cartesian) 1/v + 1/u =", "1/f", "1/v − 1/u", "f", "0", "Lenses: 1/v − 1/u = 1/f."],
    ["Magnifying power of a simple microscope is about", "D/f", "f/D", "1", "D f", "D = 25 cm near point."],
  ],
  "phy-wave-opt": [
    ["Single-slit first minima: a sinθ =", "λ", "λ/2", "2λ", "0", "YDSE bright is mλ; slit minima are nλ, n≠0."],
    ["Coherence is needed for", "stable interference", "reflection", "Snell", "polarisation only", "Young’s slits need a common source / small source."],
  ],
  "phy-dual": [
    ["Photon momentum is", "h/λ = E/c", "hλ", "mc²", "0", "Radiation pressure ≈ I/c (absorbing)."],
    ["Davisson–Germer showed", "electron diffraction (waves)", "photoelectric", "α scattering", "pair production", "Ni crystal, 54° , 54 eV classic."],
  ],
  "phy-atoms": [
    ["Bohr radius a₀ ≈", "0.53 Å", "1 fm", "1 nm", "1 mm", "r_n = n² a₀ / Z."],
    ["Angular momentum in Bohr is", "n ħ", "n h", "n h / 2", "0", "L = n h / 2π."],
  ],
  "phy-nuclei": [
    ["1 amu mass defect ≈", "931 MeV", "1 eV", "13.6 eV", "938 eV", "E = mc² with the nuclear mass unit."],
    ["Activity A =", "λ N", "N", "1/λ", "τ N²", "SI unit becquerel = 1 decay/s. Curie is 3.7×10¹⁰ Bq."],
  ],
  "phy-semiconductors": [
    ["Zener is used in", "reverse breakdown as a voltage regulator", "forward bias as a rectifier only", "as a battery", "as an inductor", "Sharp reverse I–V knee."],
    ["NAND and NOR are", "universal gates", "linear analog devices", "always high", "memory cells only", "You can build any Boolean function from one of them."],
  ],
  "phy-experimental": [
    ["Vernier LC =", "1 MSD − 1 VSD", "pitch / n", "1 mm always", "MSD + VSD", "Screw gauge: pitch / circular divisions."],
    ["Meter bridge is a", "Wheatstone with a 100 cm wire", "potentiometer", "capacitor", "galvanometer shunt", "Balance length l: R/S = l/(100−l)."],
  ],
  "chem-basic": [
    ["1 mol of O₂ molecules is", "6.022×10²³ molecules, 32 g", "16 g", "2 atoms", "22.4 molecules", "Entity must be named."],
    ["ppm aqueous ≈", "mg L⁻¹", "g L⁻¹", "mol L⁻¹", "mass %", "For dilute water solutions."],
  ],
  "chem-atom": [
    ["Azimuthal quantum number ℓ =", "0,1,…,n−1", "1 to n", "±½", "n", "s,p,d,f ↔ 0,1,2,3."],
    ["Radial nodes of an orbital =", "n−ℓ−1", "n", "ℓ", "n+ℓ", "Angular nodes = ℓ."],
  ],
  "chem-periodic": [
    ["IE generally increases", "across a period (left to right)", "down a group", "always with Z", "never", "Exceptions: Be>B, N>O (subshell)."],
    ["Electron gain enthalpy of Cl vs F:", "Cl more negative", "F more negative", "equal", "both positive", "F’s small size → crowding / repulsion."],
  ],
  "chem-bonding": [
    ["Fajan: covalent character rises with", "small cation, large anion, high charge", "large cation", "low charge", "inert gases", "Also pseudo-noble configuration (Cu⁺, Zn²⁺)."],
    ["H-bond is strongest in", "HF (among HX)", "HCl", "HI", "H₂", "FON. Ice is less dense because of the open H-bond lattice."],
  ],
  "chem-states": [
    ["van der Waals b is related to", "excluded volume / four times molecular volume", "attractions", "T_c only", "R", "a measures attractions; T_B = a/Rb."],
    ["Most probable speed v_mp =", "√(2RT/M)", "√(3RT/M)", "√(8RT/πM)", "0", "Maxwell peak."],
  ],
  "chem-thermo": [
    ["Standard enthalpy of formation of an element in its standard state is", "0", "positive", "RT", "∞", "By definition. Allotropes: the standard one is 0."],
    ["Entropy of the universe for a spontaneous process", "increases", "decreases", "is 0", "is ΔH", "ΔS_sys can be negative if the surroundings compensate."],
  ],
  "chem-eq": [
    ["K_p = K_c (RT)^{Δn_g}. Δn_g is", "gaseous moles products − reactants", "all moles", "0 always", "negative always", "Solids/liquids omitted from K."],
    ["For a weak acid, pH of 0.01 M HA with K_a=10⁻⁶ is about", "4", "2", "6", "8", "√(K_a c)=10⁻⁴, pH=4. Check α≪1."],
  ],
  "chem-redox": [
    ["n-factor of KMnO₄ in acid is", "5", "1", "3", "7", "Mn(VII) → Mn(II). Neutral: 3; strong alkali: 1."],
    ["Oxidation number of S in S₂O₃²⁻ is", "+2", "+6", "−2", "0", "Average; the two S are not equivalent in the structure."],
  ],
  "chem-goc": [
    ["−I effect of −NO₂ is", "electron-withdrawing through σ bonds", "electron-donating", "hyperconjugation", "none", "−R is the resonance withdrawal."],
    ["Meso compounds are", "achiral despite stereocentres (internal compensation)", "always optically active", "enantiomers", "alkenes", "A plane of symmetry."],
  ],
  "chem-hc": [
    ["Markovnikov: H of HX goes to the carbon with", "more hydrogens already", "fewer hydrogens", "the halogen", "the chain end always", "More stable carbocation. Peroxide: anti-Markovnikov for HBr."],
    ["EAS on benzene: the electrophile is attacked by", "the π cloud, forming a σ-complex (arenium)", "a nucleophile", "a radical only", "light", "Rate step is often the σ-complex formation."],
  ],
  "chem-hydrogen": [
    ["H₂O₂ is both oxidising and reducing because of", "O at −1 (peroxide)", "H at +1", "O at −2", "being a gas", "Disproportionation is possible."],
    ["Ionic hydrides are formed by", "s-block metals", "p-block only", "noble gases", "O₂", "Covalent: B,C,N,O; interstitial: d-block."],
  ],
  "chem-sblock": [
    ["Li resembles Mg by", "diagonal relationship", "being a gas", "inert pair", "lanthanoid contraction", "Similar size/charge density."],
    ["Alkali metals in liquid NH₃ give", "blue, paramagnetic, conducting solutions (e⁻)", "red solutions", "nothing", "precipitates only", "Dilute: solvated electrons. Concentrated: bronze, metallic."],
  ],
  "chem-solutions": [
    ["Osmotic pressure π =", "iCRT", "CRT without i", "iC/RT", "iRT/C", "Morse. Used for molar mass of polymers."],
    ["Positive deviation from Raoult: A–B interactions are", "weaker than A–A / B–B", "stronger", "equal", "ionic", "Azeotrope with min boiling point (alcohol–water)."],
  ],
  "chem-electro": [
    ["SHE potential is defined as", "0 at all T by convention", "1 V", "−1 V", "kT/e", "Pt, 1 bar H₂, [H⁺]=1."],
    ["A concentration cell has E° =", "0", "the usual table value", "∞", "RT", "E = (0.059/n) log (c_dilute/c_conc) with care of sign — actually E = (0.059/n) log (c_higher/c_lower) for the spontaneous direction."],
  ],
  "chem-kinetics": [
    ["Half-life of a first-order reaction", "does not depend on [A]₀", "∝ [A]₀", "∝ 1/[A]₀", "is 0", "Radioactivity is first order."],
    ["A catalyst", "lowers E_a, does not change ΔG° or K", "changes K", "is consumed net", "always heterogeneous", "Appears in the mechanism, regenerates."],
  ],
  "chem-solid": [
    ["Packing fraction of fcc is", "0.74", "0.68", "0.52", "1", "bcc 0.68; simple cubic 0.52; hcp 0.74."],
    ["Schottky defect is", "cation+anion vacancy pair", "cation in interstitial", "an extra electron", "dislocation", "Frenkel: ion displaced to interstitial (AgCl, ZnS)."],
  ],
  "chem-surface": [
    ["Physisorption is", "multilayer possible, ΔH small, no activation", "monolayer covalent", "irreversible always", "high E_a", "Chemisorption: monolayer, high ΔH, may need E_a."],
    ["Hardy–Schulze: coagulating power rises with", "charge of the opposite ion", "mass", "volume", "colour", "Al³⁺ beats Na⁺ for a negative sol."],
  ],
  "chem-pblock": [
    ["Inert pair effect is prominent in", "Tl(I), Pb(II), Bi(III)", "B, C, N", "F", "He", "ns² stays unoxidised down the group."],
    ["Structure of white phosphorus is", "P₄ tetrahedra", "layers", "chains of P₈", "atomic", "Red P is polymeric; black P is layered."],
  ],
  "chem-dblock": [
    ["KMnO₄ in acid oxidises to", "Mn²⁺ (n=5)", "MnO₂", "MnO₄²⁻", "Mn", "Neutral/weak alkali: MnO₂ (n=3); strong alkali: manganate (n=1)."],
    ["Lanthanoid contraction is due to", "poor shielding by 4f", "5d electrons", "relativity only", "inert pair", "Zr/Hf, Nb/Ta nearly identical radii."],
  ],
  "chem-coord": [
    ["Spectrochemical series (high field) includes", "CN⁻, CO", "I⁻, Br⁻", "Cl⁻ only", "H₂O as the strongest", "I⁻ < Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < CN⁻ < CO (typical)."],
    ["Linkage isomerism needs", "an ambidentate ligand (NO₂⁻, SCN⁻)", "two metals", "optical activity", "a hydrate", "Ionisation isomerism swaps a ligand with a counterion."],
  ],
  "chem-metallurgy": [
    ["Ellingham: a metal oxide is reduced by another metal if the latter’s line is", "below (more negative ΔG) at that T", "above", "horizontal", "crossing 0 only", "C reduces many oxides at high T because 2C+O₂→2CO has negative slope."],
    ["Hall–Héroult extracts", "Al from Al₂O₃ in cryolite", "Fe", "Cu", "Zn", "Electrolysis of molten cryolite solution."],
  ],
  "chem-halo": [
    ["SN2 is favoured by", "primary substrate, polar aprotic, strong nucleophile", "tertiary, polar protic", "heat and bulky base (that is E2)", "hv", "Back-side attack, inversion."],
    ["Aryl halides resist SN because", "C–X has partial double-bond character / poor C⁺ on sp²", "they are ionic", "they are too reactive", "no halogen", "NAS needs −M groups ortho/para (NO₂)."],
  ],
  "chem-alcohol": [
    ["Lucas: tertiary alcohols give turbidity", "immediately", "in 5–10 min", "never", "only on heating with KMnO₄", "ZnCl₂/HCl. 1° stay dissolved (unless heated)."],
    ["Williamson: alkoxide + alkyl halide is", "SN2 (use 1° halide)", "E1", "Friedel–Crafts", "ozonolysis", "3° halide eliminates."],
  ],
  "chem-carbonyl": [
    ["Tollens’ test is given by", "aldehydes (Ag mirror)", "ketones (usually)", "alkanes", "ethers", "Fehling: aliphatic aldehydes. Benzaldehyde: Tollens yes, Fehling no."],
    ["HVZ reaction puts a halogen on the", "α-carbon of a carboxylic acid", "benzene ring", "carbonyl oxygen", "chain end always", "Red P / X₂, then water."],
  ],
  "chem-amines": [
    ["Hinsberg: 1° amine product is", "soluble in alkali (sulphonamide with leftover H)", "insoluble", "a gas", "a dye", "2°: insoluble sulphonamide; 3°: no reaction (or a salt that hydrolyses)."],
    ["Aniline is a weaker base than methylamine because", "lone pair is delocalised into the ring", "N is sp³", "it is a 3° amine", "steric only", "Gas phase vs aqueous ranking also involves solvation."],
  ],
  "chem-bio": [
    ["α-D-glucose and β-D-glucose are", "anomers", "enantiomers", "chain isomers", "metamers", "Differ at C1. Mutarotation."],
    ["Peptide bond is", "amide, planar, partial double bond", "ester", "ether", "ionic always", "2° structure: H-bonds (α-helix, β-sheet)."],
  ],
  "chem-polymers": [
    ["Nylon-6,6 is", "condensation, hexamethylenediamine + adipic acid", "addition of ethene", "a polyene", "bakelite", "Bakelite: phenol + HCHO."],
    ["Natural rubber is", "cis-1,4-polyisoprene", "trans teflon", "PVC", "nylon", "Vulcanisation: S cross-links."],
  ],
  "chem-everyday": [
    ["Soaps are", "sodium/potassium salts of long-chain fatty acids", "alkyl benzene sulphonates", "enzymes", "vitamins", "Hard water → scum (Ca/Mg salts). Detergents work in hard water."],
    ["Antipyretic example:", "paracetamol / aspirin", "chloramphenicol", "morphine", "ranitidine as the fever drug", "Know class → example from NCERT table."],
  ],
  "chem-env": [
    ["Ozone in stratosphere is broken by", "Cl radicals from CFCs (among others)", "N₂", "He", "argon", "Chapman cycle vs pollutants."],
    ["BOD measures", "oxygen demand of biodegradable organics", "CO₂", "pH", "heavy metals", "High BOD = more polluted water."],
  ],
  "chem-qual": [
    ["Group IV cations (basic radical) include", "Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺ (H₂S + NH₄OH)", "Ag⁺", "Ba²⁺ only", "NH₄⁺", "Group I: Ag, Pb, Hg₂²⁺ (dil HCl)."],
    ["Brown-ring test is for", "nitrate", "sulphate", "halide", "phosphate", "FeSO₄ + conc H₂SO₄, [Fe(H₂O)₅NO]²⁺."],
  ],
  "chem-practical": [
    ["Lassaigne (Na fusion) detects", "N, S, X in organic compounds", "C, H only", "metals", "unsaturation", "Prussian blue for N; violet with sodium nitroprusside for S."],
    ["Phenolphthalein end-point is", "colourless → pink (acid→base)", "red → yellow", "always pink", "blue", "Methyl orange: red (acid) to yellow (base), ~4."],
  ],
  "math-sets": [
    ["If A ⊂ B then A ∪ B =", "B", "A", "∅", "A ∩ B", "Union with a subset does nothing."],
    ["n(A Δ B) =", "n(A)+n(B)−2n(A∩B)", "n(A)+n(B)", "0", "n(A∩B)", "Symmetric difference."],
  ],
  "math-rel-11": [
    ["A function is one-one if", "f(x₁)=f(x₂) ⇒ x₁=x₂", "every image has two preimages", "it is onto", "it is even", "Horizontal line test on graphs."],
    ["(f∘g)(x) =", "f(g(x))", "g(f(x)) always", "f+g", "fg", "Composition is not commutative."],
  ],
  "math-trig": [
    ["sin(A+B) =", "sin A cos B + cos A sin B", "sin A sin B", "cos A cos B", "tan A + tan B", "The addition formula."],
    ["Range of sin is", "[−1,1]", "ℝ", "(0,1)", "[0,π]", "Principal values of sin⁻¹ live in [−π/2,π/2]."],
  ],
  "math-complex": [
    ["z z̄ =", "|z|²", "|z|", "0", "arg z", "Polar: z=r(cosθ+i sinθ)."],
    ["De Moivre: (cosθ+i sinθ)ⁿ =", "cos nθ + i sin nθ", "cos θⁿ", "n (cosθ+i sinθ)", "eⁿ", "Roots: divide the argument."],
  ],
  "math-ineq": [
    ["Multiplying an inequality by a negative number", "reverses the inequality", "leaves it", "zeros it", "is forbidden", "The whole reason −x > 2 ⇒ x < −2."],
    ["|x| < a (a>0) means", "−a < x < a", "x < a", "x > a", "x = ±a", "A band about 0."],
  ],
  "math-pnc": [
    ["n identical objects in a line: arrangements", "1", "n!", "(n−1)!", "n", "Distinct: n!."],
    ["Number of ways to choose r from n with repetition (combinations) is", "binom(n+r−1, r)", "n^r", "P(n,r)", "n!", "Stars and bars, non-negative."],
  ],
  "math-binom": [
    ["Sum of binomial coefficients of (1+x)ⁿ is", "2ⁿ", "n", "n!", "0", "Put x=1. Alternating: (1−1)ⁿ=0 (n>0)."],
    ["Greatest term in (1+x)ⁿ depends on", "the ratio T_{r+1}/T_r vs 1", "n only", "x only if x=0", "e", "Set the ratio ≥1 and solve for r."],
  ],
  "math-seq": [
    ["Sum of first n cubes is", "(n(n+1)/2)²", "n²(n+1)² / 2", "n³", "n(n+1)(2n+1)/6", "Squares: n(n+1)(2n+1)/6."],
    ["GP infinite |r|<1: S =", "a/(1−r)", "a r", "∞", "na", "Diverges if |r|≥1 (unless a=0)."],
  ],
  "math-straight": [
    ["Angle bisectors of two lines: formula uses", "normalised linear forms equal ±", "slopes added", "product of intercepts", "the origin only", "Same sign vs opposite sign: the two bisectors."],
    ["Image of a point in a line: the line is the", "perpendicular bisector of segment to the image", "angle bisector", "median", "tangent", "Foot first, then double it."],
  ],
  "math-conic": [
    ["Director circle of x²/a²+y²/b²=1 is", "x²+y²=a²+b²", "x²+y²=a²−b²", "the auxiliary circle", "the latus rectum", "Locus of points with perpendicular tangents."],
    ["xy=c² is a", "rectangular hyperbola", "ellipse", "circle", "parabola", "Rotated 45° from the standard hyperbola."],
  ],
  "math-3d-11": [
    ["Direction cosines satisfy", "l²+m²+n²=1", "l+m+n=1", "lmn=1", "l=m=n", "DRs are proportional, not unit."],
    ["Octant with all coordinates negative is the", "seventh (usual numbering) / all-negative octant", "first", "xy plane", "origin", "First octant: all positive."],
  ],
  "math-limits": [
    ["Squeeze theorem needs a function trapped between two others with the", "same limit", "same value at the point", "same derivative", "polynomial growth", "sin x sandwich is the prototype."],
    ["∞/∞ or 0/0 are", "indeterminate forms", "equal to 1", "equal to 0", "forbidden forever", "Algebra or L’Hôpital after checking the form."],
  ],
  "math-stats": [
    ["If every observation is multiplied by 3, variance is multiplied by", "9", "3", "1", "0", "Var(aX+b)=a² Var(X)."],
    ["Mode of a unimodal grouped series uses the", "modal class (highest frequency)", "median class", "first class", "open ends", "Different formula from the median."],
  ],
  "math-prob-11": [
    ["P(at least one head in 3 coins) =", "7/8", "1/8", "1/2", "3/8", "1 − P(TTT)."],
    ["A pack of 52: P(king or queen) =", "8/52=2/13", "4/52", "16/52", "1/13", "8 face cards of those ranks."],
  ],
  "math-rel-12": [
    ["An equivalence relation is", "reflexive, symmetric, transitive", "only symmetric", "a function", "one-one", "It partitions the set into classes."],
    ["Number of bijections of an n-set is", "n!", "2ⁿ", "n²", "nⁿ", "Also the number of invertible functions onto itself."],
  ],
  "math-invtrig": [
    ["Range of cos⁻¹ is", "[0, π]", "[−π/2,π/2]", "ℝ", "[−π,π]", "sin⁻¹ is [−π/2,π/2]; tan⁻¹ is (−π/2,π/2)."],
    ["tan⁻¹ x + tan⁻¹(1/x) for x>0 is", "π/2", "0", "π", "−π/2", "For x<0 it is −π/2."],
  ],
  "math-matrices": [
    ["A square matrix with Aᵀ = −A is", "skew-symmetric (diagonal 0)", "symmetric", "orthogonal", "singular always", "Over reals, odd order ⇒ det 0."],
    ["Elementary row ops can compute", "the inverse and the rank", "eigenvalues by staring", "the trace only", "nothing", "Gauss–Jordan."],
  ],
  "math-dets": [
    ["A repeated row in a determinant makes it", "0", "1", "the product of diagonals", "n", "Linear dependence of rows."],
    ["Area of a triangle with vertices (xᵢ,yᵢ) is (1/2)|det of the 3×3 with 1s|", "true", "false, it is a volume", "false, 2×2", "only if origin is a vertex", "Absolute value, so orientation is dropped."],
  ],
  "math-cont": [
    ["IVT: a continuous f on [a,b] hits every value between", "f(a) and f(b)", "0 and 1", "its derivative", "±∞", "Used to prove a root exists."],
    ["Parametric dy/dx =", "(dy/dt)/(dx/dt)", "dx/dt · dy/dt", "d²y/dx²", "0", "Provided dx/dt ≠ 0."],
  ],
  "math-aod": [
    ["Normal to y=f(x) at x₀ has slope", "−1/f′(x₀) if f′≠0", "f′(x₀)", "0", "∞ always", "Negative reciprocal of the tangent."],
    ["On a closed interval, extrema of a differentiable f occur at", "critical points or endpoints", "inflection points only", "the origin", "nowhere", "The closed-interval method."],
  ],
  "math-int": [
    ["d/dx ∫₀ˣ f(t) dt =", "f(x)", "f′(x)", "0", "F(x)−F(0) differentiated wrong", "FTC. Upper limit x²: 2x f(x²)."],
    ["∫ dx/(a²+x²) =", "(1/a) tan⁻¹(x/a)+C", "ln|a²+x²|", "sin⁻¹", "0", "Standard. a²−x² under a sqrt is sin⁻¹."],
  ],
  "math-aoi": [
    ["Area in polar coordinates is", "½ ∫ r² dθ", "∫ r dθ", "π r² always", "∫ r dr", "From the Jacobian / triangle slice."],
    ["Parametric area: ∫ y dx =", "∫ y(t) x′(t) dt", "∫ x y dt", "0", "π ab", "Watch the orientation / limits."],
  ],
  "math-de": [
    ["Homogeneous dy/dx = f(y/x): substitute", "y = v x", "x = v y always first", "y = eˣ", "v = xy", "Then v + x v′ = f(v)."],
    ["Degree of √(y′) + y = 0 is", "1 after isolating and squaring (with care)", "1/2", "0", "undefined always", "Degree is defined when the DE is polynomial in derivatives."],
  ],
  "math-vec": [
    ["|a × b| is the area of the", "parallelogram they span", "triangle ×1", "cube", "circle", "Triangle is half of that."],
    ["Scalar triple [a,b,c] changes sign under an", "odd permutation", "even permutation", "scaling by +2 only", "translation", "It is the volume, signed."],
  ],
  "math-3d-12": [
    ["A plane ax+by+cz+d=0 has normal", "(a,b,c)", "(d,0,0)", "any in-plane vector", "the origin", "Unit normal for the p-form."],
    ["Two lines with b₁ × b₂ = 0 are", "parallel (or coincident)", "always skew", "perpendicular", "intersecting always", "Then check a point to distinguish coincident."],
  ],
  "math-lpp": [
    ["Corner-point method evaluates z at", "vertices of the feasible polygon", "the centroid only", "infinity always", "the origin only", "Fundamental theorem of LPP."],
    ["A redundant constraint", "does not change the feasible set", "always binds", "removes a vertex", "makes z unbounded", "Graphically it misses the polygon."],
  ],
  "math-prob-12": [
    ["Total probability: P(B) =", "Σ P(B|Aᵢ) P(Aᵢ) on a partition", "P(B|A)", "1", "P(A)P(B)", "The law of alternatives. Bayes is the reverse."],
    ["Var(X) =", "E[X²] − (E X)²", "E X", "E[X²]", "0 always", "Never negative. Binomial: npq."],
  ],
};
