import sys
sys.path.insert(0, "/workspace/scripts")
from _phy_append import append_chapter

append_chapter(r'''
  "phy-thermal": {
    id: "phy-thermal",
    theory: [
      {
        id: "phy-th-exp",
        heading: "Thermal expansion of solids and liquids",
        body: "Linear expansion is $\\Delta L=L\\alpha\\Delta T$, area $\\Delta A=A\\gamma\\Delta T$ with $\\gamma=2\\alpha$, volume $\\Delta V=V\\gamma\\Delta T$ with $\\gamma=3\\alpha$ for isotropic solids. A hole expands as if it were filled with the same material. Apparent expansion of a liquid in a vessel is $\\gamma_{\\mathrm{app}}=\\gamma_L-\\gamma_V$, so the true $\\gamma_L=\\gamma_{\\mathrm{app}}+\\gamma_{\\mathrm{vessel}}$. A bimetallic strip bends toward the lower-$\\alpha$ metal on heating. Thermal stress in a rod with fixed ends is $Y\\alpha\\Delta T$, already met in solids.",
        bullets: [
          "Clocks with metal pendulums run slow in summer ($T\\propto\\sqrt{L}$ increases).",
          "A scale expands, so a true length is $L_{\\mathrm{true}}=L_{\\mathrm{read}}[1+\\alpha(T-T_0)]$ when the scale is calibrated at $T_0$.",
          "Anisotropic crystals have different $\\alpha$ along different axes; volume $\\gamma=\\alpha_1+\\alpha_2+\\alpha_3$.",
          "Water has a density maximum at $4^{\\circ}\\mathrm{C}$; lakes freeze from the top.",
        ],
        callout: {
          kind: "board",
          text: "Boards want $\\gamma=3\\alpha$ and the apparent-expansion formula. Main asks a metal scale measuring a rod of a different $\\alpha$.",
        },
      },
      {
        id: "phy-th-cal",
        heading: "Calorimetry and latent heat",
        body: "Heat capacity $C=dQ/dT$; specific heat $c=C/m$; molar heat $C_m=C/n$. Water’s $c=1\\,\\mathrm{cal\\,g^{-1}\\,^{\\circ}C^{-1}}=4200\\,\\mathrm{J\\,kg^{-1}\\,K^{-1}}$. Latent heat of fusion of ice is $3.34\\times 10^{5}\\,\\mathrm{J/kg}$, of vaporisation $2.26\\times 10^{6}\\,\\mathrm{J/kg}$. A mixture problem is energy balance: heat lost = heat gained, including $mL$ whenever a phase change is possible. Always check whether the available heat is enough to complete the phase change before assigning a final temperature between $0^{\\circ}\\mathrm{C}$ and $100^{\\circ}\\mathrm{C}$.",
        bullets: [
          "Principle of calorimetry assumes an isolated mixture and no radiation loss.",
          "If $m_{\\mathrm{steam}}L_v$ exceeds the heat needed to take ice all the way to $100^{\\circ}\\mathrm{C}$ steam, the final state is steam plus water at $100^{\\circ}\\mathrm{C}$.",
          "Water equivalent of a calorimeter is $m_{\\mathrm{cal}}c_{\\mathrm{cal}}$.",
          "$1\\,\\mathrm{cal}=4.186\\,\\mathrm{J}$ (Joule’s mechanical equivalent of heat).",
        ],
        callout: {
          kind: "trap",
          text: "Dumping steam into ice and writing a single $mc\\Delta T$ without latent heats is the standard calorimetry fail.",
        },
      },
      {
        id: "phy-th-cond",
        heading: "Conduction, convection and thermal resistance",
        body: "Steady conduction along a rod is $\\frac{dQ}{dt}=KA\\Delta T/L$. Thermal resistance $R_{\\mathrm{th}}=L/(KA)$ lets you treat slabs in series ($R$ adds, same flux) and parallel ($1/R$ adds, same $\\Delta T$). The temperature of the interface of two slabs in series divides $\\Delta T$ in the ratio of the $R$’s. A lagged rod (insulated sides) is one-dimensional; an unlagged rod leaks heat from the sides and is not in JEE algebra. Convection is heat carried by bulk motion of a fluid; Newton’s law of cooling is the practical model.",
        bullets: [
          "Series: $H=(T_1-T_2)/(R_1+R_2)$, interface $T=(R_2 T_1+R_1 T_2)/(R_1+R_2)$.",
          "Good conductors (Cu, Ag) have large $K$; wood, air, vacuum have small $K$.",
          "A composite wall of equal area is series; two rods between the same two baths are parallel.",
        ],
      },
      {
        id: "phy-th-rad",
        heading: "Radiation, Stefan–Boltzmann and Newton’s law of cooling",
        body: "A black body absorbs every incident radiation; it emits $E=\\sigma T^{4}$ (Stefan–Boltzmann), with $\\sigma=5.67\\times 10^{-8}\\,\\mathrm{W\\,m^{-2}\\,K^{-4}}$. A grey body of emissivity $e$ emits $e\\sigma T^{4}$ and, in surroundings at $T_0$, has net power $e\\sigma A(T^{4}-T_0^{4})$. Wien’s displacement law $\\lambda_{\\mathrm{max}}T=b\\approx 2.9\\times 10^{-3}\\,\\mathrm{m\\,K}$ locates the spectral peak. Newton’s law of cooling $dT/dt=-k(T-T_0)$ is the linearisation of Stefan when $T\\approx T_0$; it holds for forced convection and for small excess temperature. A rate curve of $T$ vs $t$ is exponential; a plot of $dT/dt$ vs $T-T_0$ is a straight line through the origin.",
        bullets: [
          "Energy flux, not $\\lambda_{\\mathrm{max}}$, decides which star is brighter; colour follows Wien.",
          "A good absorber is a good emitter (Kirchhoff): $e=a$ in equilibrium.",
          "Newton’s law uses Celsius or kelvin interchangeably for differences.",
          "The fourth-power law uses absolute temperature only.",
        ],
        callout: {
          kind: "main",
          text: "Main asks $\\lambda_{\\max}T=\\mathrm{const}$ ratios, a net-power $T^{4}-T_0^{4}$ numerical, and a Newton-cooling graph.",
        },
      },
    ],
    formulas: [
      { name: "Linear expansion", latex: "\\Delta L = L\\alpha\\Delta T" },
      { name: "Volume expansion", latex: "\\Delta V = V\\gamma\\Delta T,\\quad \\gamma=3\\alpha" },
      { name: "Apparent expansion of a liquid", latex: "\\gamma_{\\mathrm{app}} = \\gamma_L - \\gamma_{\\mathrm{vessel}}" },
      { name: "Calorimetry", latex: "\\sum m c\\Delta T + \\sum m L = 0" },
      { name: "Conduction rate", latex: "H = \\dfrac{KA\\Delta T}{L} = \\dfrac{\\Delta T}{R_{\\mathrm{th}}}" },
      { name: "Thermal resistance", latex: "R_{\\mathrm{th}} = \\dfrac{L}{KA}" },
      { name: "Stefan–Boltzmann net power", latex: "P = e\\sigma A(T^{4}-T_0^{4})" },
      { name: "Wien’s law", latex: "\\lambda_{\\max} T = b" },
      { name: "Newton’s law of cooling", latex: "\\dfrac{dT}{dt} = -k(T-T_0)" },
      { name: "Thermal stress", latex: "\\sigma = Y\\alpha\\Delta T" },
    ],
    traps: [
      "Using Celsius in σT⁴ (must be kelvin) while using kelvin differences as if they differed from Celsius differences (they don’t).",
      "Forgetting latent heat in a mixture that crosses 0 °C or 100 °C.",
      "Taking γ = 2α for volume, or forgetting that a hole expands with the material.",
      "Adding thermal resistances in the wrong series/parallel analogy.",
      "Applying Newton’s law of cooling to a red-hot body far from T0, where T⁴ − T0⁴ is not linear.",
    ],
    tricks: [
      "A hole is a filled disc of the same α: it grows on heating.",
      "Two slabs: same H in series, same ΔT in parallel — draw the thermal circuit.",
      "For Wien, only the product λ_max T is fixed; a hotter black body peaks at smaller λ.",
      "Steam at 100 °C dumps L_v + c ΔT; it is a much bigger heat source than the same mass of water at 100 °C.",
      "Time to cool from T1 to T2 under Newton: ln((T1−T0)/(T2−T0)) = k Δt.",
    ],
    worked: [
      {
        id: "phy-th-w1",
        exam: "boards",
        prompt: "A copper rod (α = 1.7×10⁻⁵ /°C) of length 1 m at 20 °C is heated to 70 °C. Find ΔL.",
        steps: [
          "ΔT = 50 °C, ΔL = L α ΔT = 1 · 1.7e-5 · 50 = 8.5×10⁻⁴ m = 0.85 mm.",
        ],
        answer: "0.85 mm.",
        insight: "ΔT is the same number in °C and in K. L must be the original length.",
      },
      {
        id: "phy-th-w2",
        exam: "main",
        prompt: "100 g of ice at 0 °C is mixed with 100 g of water at 80 °C. Find the final temperature. L_f = 336 J/g, c_w = 4.2 J/g°C.",
        steps: [
          "Heat to melt all ice: 100·336 = 33600 J.",
          "Heat the water can give to fall to 0 °C: 100·4.2·80 = 33600 J.",
          "Exactly enough to melt the ice and leave 200 g of water at 0 °C.",
        ],
        answer: "0 °C, all water (no ice left).",
        insight: "Always compare the latent-heat budget with the available mcΔT before assigning a final T > 0.",
      },
      {
        id: "phy-th-w3",
        exam: "advanced",
        prompt: "A black body of area A at 27 °C sits in a large enclosure at −73 °C. Find the net power. σ = 5.67×10⁻⁸. (Leave A in the answer.)",
        steps: [
          "T = 300 K, T0 = 200 K.",
          "P = σ A (300⁴ − 200⁴) = 5.67e-8 · A · (8.1×10⁹ − 1.6×10⁹) = 5.67e-8 · A · 6.5×10⁹.",
          "P = 5.67·6.5 · 10¹ · A = 36.855 × 10 A ≈ 369 A watts.",
        ],
        answer: "P ≈ 369 A watt, with A in m².",
        insight: "Convert to kelvin first. 300⁴ = 81×10⁸ = 8.1×10⁹; 200⁴ = 16×10⁸ = 1.6×10⁹.",
      },
    ],
    quiz: [
      {
        id: "phy-th-q1",
        exam: "boards",
        stem: "If α is the linear expansivity, the volume expansivity of an isotropic solid is",
        options: ["α", "2α", "3α", "α/3"],
        correct: 2,
        why: "V = L³, dV/V = 3 dL/L, so γ = 3α.",
      },
      {
        id: "phy-th-q2",
        exam: "main",
        stem: "Two identical slabs of thermal resistances R and 2R are in series between 100 °C and 0 °C. The interface temperature is",
        options: ["33 °C", "50 °C", "67 °C", "75 °C"],
        correct: 2,
        why: "Same H: (100−T)/R = (T−0)/(2R) ⇒ 2(100−T) = T ⇒ 200 = 3T ⇒ T = 200/3 ≈ 67 °C. The larger R takes the larger ΔT.",
      },
      {
        id: "phy-th-q3",
        exam: "main",
        stem: "A black body peaks at 500 nm. If its temperature is doubled, the new λ_max is",
        options: ["250 nm", "500 nm", "1000 nm", "125 nm"],
        correct: 0,
        why: "λ_max T = const ⇒ λ_max halves to 250 nm.",
      },
      {
        id: "phy-th-q4",
        exam: "advanced",
        stem: "Newton’s law of cooling is a linearisation of Stefan’s law when",
        options: [
          "T ≫ T0",
          "T − T0 ≪ T0",
          "the body is a black body only",
          "conduction dominates",
        ],
        correct: 1,
        why: "T⁴ − T0⁴ = (T−T0)(T³+T²T0+TT0²+T0³) ≈ 4 T0³ (T−T0) when T ≈ T0.",
      },
      {
        id: "phy-th-q5",
        exam: "boards",
        stem: "Latent heat of fusion is the heat required to",
        options: [
          "raise the temperature of 1 kg by 1 °C",
          "convert 1 kg of solid to liquid at the melting point",
          "convert 1 kg of liquid to gas at any temperature",
          "raise 1 kg of ice from −10 °C to 0 °C",
        ],
        correct: 1,
        why: "L_f is the heat per unit mass for the solid→liquid change at the melting temperature, with ΔT = 0.",
      },
    ],
    extras: [
      {
        title: "Rank booster — metal scale measuring a different rod",
        body: "A scale of α_s calibrated at T0, measuring a rod of α_r at temperature T: true length = (reading) [1 + (α_r − α_s)(T − T0)] relative to the T0-length of the rod, depending on whether the reading is being converted to true size or to the rod’s 0-length. Draw both expansions from a common T0.",
      },
      {
        title: "Olympiad stretch — solar constant and Wien",
        body: "Solar constant S ≈ 1.4 kW/m² at 1 AU. Treating the Sun as a black body of radius R, σ T⁴ · 4π R² = S · 4π r² gives T_sun ≈ 5800 K, consistent with λ_max ≈ 500 nm via Wien. JEE has asked the T⁴ ratio of two stars from their λ_max values together with a radii ratio for luminosity.",
      },
    ],
    checklist: [
      "I use γ = 3α and γ_app = γ_L − γ_vessel.",
      "I include latent heats and check that a phase change actually completes.",
      "I treat conduction as a thermal circuit with R = L/(KA).",
      "I use kelvin in σT⁴ and Wien, and I know Newton is the small-excess linearisation.",
      "I can compute thermal stress Y α ΔT for a clamped rod.",
    ],
    pyqInsight:
      "Main’s thermal items are Wien ratios, Stefan net power with T in kelvin, a two-slab interface temperature, and ice–water calorimetry with latent heat. Expansion of a scale vs a rod, and a bimetallic strip direction, are one-markers. Advanced rarely isolates this chapter; it appears as a radiation T⁴ paragraph or as the thermal-stress mix with Young’s modulus. Newton’s-law graphs (ln(T−T0) vs t) showed up in 2020–23 assertion-reason items.",
  }
''')
