import type { Booster } from "./types";

export const BOOSTERS: Booster[] = [
  {
    id: "error-lab",
    title: "Error analysis that actually scores",
    subject: "physics",
    minutes: 35,
    blurb: "Least count, combination of errors, which quantity dominates — Main numericals and Advanced paragraph labs live here.",
    sections: [
      {
        heading: "Absolute, relative, percentage",
        body: "If $x = x_{\\mathrm{true}} + \\Delta x$, the absolute error is $\\Delta x$, relative is $\\Delta x / x$, percentage is $100\\Delta x/x$. JEE never wants a signed error unless it asks maximum possible error. Always take moduli before adding.",
        bullets: [
          "Sum/difference: add absolute errors. $\\Delta(a\\pm b) = \\Delta a + \\Delta b$.",
          "Product/quotient: add relative errors. $\\Delta(ab)/|ab| = \\Delta a/|a| + \\Delta b/|b|$.",
          "Power: $\\Delta(a^n)/|a^n| = |n|\\Delta a/|a|$. The exponent is a lever — $T^2$ in a pendulum experiment doubles the relative error of $T$.",
        ],
      },
      {
        heading: "Which measurement should you improve?",
        body: "In $Y = \\frac{MgL}{\\pi r^2 \\ell}$, the radius $r$ is squared and usually the smallest length (screw gauge). It dominates. Advanced loves asking which instrument’s least count you should tighten. Compute each term $n_i \\Delta x_i / x_i$ and rank them.",
      },
      {
        heading: "Significant figures in numericals",
        body: "NTA numericals are usually integers or one decimal as notified. Do not over-round mid-solution. Carry three extra digits, round at the end to the paper’s instruction. Least count of a vernier is $1\\,\\mathrm{MSD} - 1\\,\\mathrm{VSD}$, not ‘0.01 always’.",
      },
    ],
    formulas: [
      { name: "Pendulum g", latex: "\\frac{\\Delta g}{g} = \\frac{\\Delta L}{L} + 2\\frac{\\Delta T}{T}", note: "Time period error is doubled." },
      { name: "Vernier least count", latex: "\\mathrm{LC} = 1\\,\\mathrm{MSD} - 1\\,\\mathrm{VSD}", note: "If 10 VSD = 9 MSD and MSD = 1 mm, LC = 0.1 mm." },
    ],
    drills: [
      {
        id: "e1",
        exam: "main",
        stem: "g from a simple pendulum. L = 100.0 ± 0.1 cm, T = 2.00 ± 0.01 s. Relative error in g is",
        options: ["0.6%", "1.1%", "2.1%", "0.2%"],
        correct: 1,
        why: "Δg/g = 0.1/100 + 2*(0.01/2.00) = 0.001 + 0.01 = 0.011 = 1.1%.",
      },
    ],
  },
  {
    id: "approx-binomial",
    title: "Approximations & binomial physics",
    subject: "physics",
    minutes: 30,
    blurb: "Most ‘elegant’ Main answers are $(1+x)^n \\approx 1+nx$ with $|x|\\ll 1$. Gravity, resistance, optics, relativity-lite.",
    sections: [
      {
        heading: "The only expansion you need",
        body: "For $|x|\\ll 1$, $(1+x)^n \\approx 1 + nx + n(n-1)x^2/2$. JEE Main almost always stops at first order. Keep the second order when the first-order term cancels (e.g. some time-period shifts).",
        bullets: [
          "$g(h) = g(1+h/R)^{-2} \\approx g(1-2h/R)$.",
          "$g(d)$ at depth $d$: $g(1-d/R)$.",
          "Lens in medium, small-angle pendulum, binomial in $\\Delta T/T$ for a clock.",
        ],
      },
      {
        heading: "When not to expand",
        body: "If the option is exact ($GM/r^2$ etc.) and $h$ is not given as $h\\ll R$, do not expand. Advanced sometimes plants an exact option and a first-order option — read the stem’s ‘approximately’.",
      },
    ],
    formulas: [
      { name: "Binomial", latex: "(1+x)^n = 1 + nx + \\frac{n(n-1)}{2}x^2+\\cdots", note: "|x|<1; first order if |nx|≪1." },
    ],
  },
  {
    id: "vector-mechanics",
    title: "Vector methods in mechanics",
    subject: "physics",
    minutes: 40,
    blurb: "Stop resolving everything into two ugly scalars. Angular momentum, torque, and relative velocity are cleaner as vectors.",
    sections: [
      {
        heading: "Angular momentum about a point",
        body: "$\\vec L = \\vec r \\times \\vec p$ even for a particle. For a rigid body about a fixed axis, $L_z = I\\omega$ is the z-component, not the whole vector. Advanced will ask $L$ of a particle in a cone or a bead on a rod — use the cross product, then project.",
      },
      {
        heading: "Instantaneous axis",
        body: "Rolling without slipping: the contact point is instantaneously at rest. $v = \\omega r$ and $a = \\alpha r$ about that axis, with $I$ about the contact (parallel-axis). This kills most ‘sphere on a plank’ problems in half the algebra.",
      },
      {
        heading: "Pseudo force is a vector",
        body: "In a frame accelerating at $\\vec a_0$, every mass $m$ gets $-m\\vec a_0$. On a wedge accelerating horizontally, the effective gravity is the resultant of $g$ down and $a$ opposite the acceleration — the pendulum in an accelerating car is the same picture.",
      },
    ],
    formulas: [
      { name: "Torque", latex: "\\vec\\tau = \\vec r \\times \\vec F = I\\vec\\alpha" },
      { name: "Parallel axis", latex: "I = I_{\\mathrm{cm}} + Md^2" },
    ],
  },
  {
    id: "mechanism-atlas",
    title: "Organic mechanism atlas",
    subject: "chemistry",
    minutes: 45,
    blurb: "Every JEE organic question is ‘what is the intermediate and what does it want?’. This is the map.",
    sections: [
      {
        heading: "The five intermediates",
        body: "Carbocation (trigonal, 6e, Lewis acid, rearranges), carbanion (nucleophile, often sp3, no rearrange), radical (odd e, no charge, allylic/benzylic favoured), carbene (6e neutral, singlet vs triplet), benzyne (Advanced, not Main).",
        bullets: [
          "If the step is in acid / polar protic / 3° substrate: think C+.",
          "If strong bulky base / heat: think E2, not C+.",
          "If peroxide + HBr on alkene: radical, anti-Markovnikov.",
        ],
      },
      {
        heading: "Decision tree: substitution vs elimination",
        body: "Primary + good nucleophile, polar aprotic: SN2. Tertiary + weak nucleophile, polar protic: SN1. Primary + bulky base (t-BuOK): E2. Tertiary + heat + strong base: E2. Secondary is the grey zone — look at temperature and base strength. Never write SN1 on methyl.",
      },
      {
        heading: "Carbonyl fork",
        body: "Aldehyde with no α-H + concentrated base: Cannizzaro. Carbonyl with α-H + dilute base or acid: aldol. Methyl ketone + I2/NaOH: haloform. Those three forks decide half of carbonyl PYQs.",
      },
    ],
  },
  {
    id: "named-reactions",
    title: "Named reactions that still appear",
    subject: "chemistry",
    minutes: 30,
    blurb: "Not a vanity list. The ones NTA and IITs still write into options.",
    sections: [
      {
        heading: "Must-tick list",
        body: "Aldol, Cannizzaro, Haloform, Wittig is rare, Wolff–Kishner vs Clemmensen (acid vs base medium), Hoffmann bromamide, Gabriel, Sandmeyer, Gattermann, Balz–Schiemann, Reimer–Tiemann, Kolbe, Williamson, Wurtz / Fittig, Friedel–Crafts, Gattermann–Koch (Adv), Carbylamine, HVZ, Hell–Volhard–Zelinsky.",
        bullets: [
          "Clemmensen: Zn–Hg/HCl, acid-stable substrates.",
          "Wolff–Kishner: NH2NH2/KOH, base-stable, acid-sensitive groups.",
          "Hoffmann: amide → amine with one fewer carbon. Gabriel: phthalimide → 1° alkyl amine, not aryl.",
        ],
      },
    ],
  },
  {
    id: "salt-analysis",
    title: "Salt analysis in one sitting",
    subject: "chemistry",
    minutes: 50,
    blurb: "JEE Advanced qualitative analysis is a free 8–12 marks if the group table is in muscle memory.",
    sections: [
      {
        heading: "Cation groups (only listed ions)",
        body: "Advanced syllabus names the ions — do not memorise the entire qualitative bible.",
        bullets: [
          "Group I (dil. HCl): Ag+, Pb2+, Hg2^2+ — white chlorides. AgCl dissolves in NH4OH.",
          "Group II (H2S / acid): Cu2+, Pb2+, Hg2+ — black/coloured sulphides.",
          "Group III (NH4Cl + NH4OH): Fe3+, Al3+, Cr3+ — hydroxides.",
          "Group IV (H2S / alkaline): Zn2+, Mn2+ — ZnS white, MnS buff.",
          "Group V ((NH4)2CO3): Ca2+, Ba2+ — carbonates. Flame: Ca brick red, Ba apple green.",
          "Mg2+ often left to phosphate test.",
        ],
      },
      {
        heading: "Anions",
        body: "Carbonate: CO2 turns lime water milky. Sulphide: lead acetate paper black. Sulphate: BaCl2 white ppt insoluble in acid. Halides: AgNO3 — AgCl white, AgBr pale yellow, AgI yellow; then NH4OH solubility. Nitrate: brown-ring test.",
      },
    ],
  },
  {
    id: "inequality-kit",
    title: "Inequality toolkit",
    subject: "maths",
    minutes: 35,
    blurb: "AM–GM, Cauchy, Titu’s lemma, rearrangement — Advanced short-answers hide here.",
    sections: [
      {
        heading: "AM–GM–HM",
        body: "For positive reals, AM ≥ GM ≥ HM with equality iff all equal. Weighted AM–GM: $(a_1x_1+\\cdots)/(\\sum a_i) \\ge (x_1^{a_1}\\cdots)^{1/\\sum a_i}$. To minimise $x+1/x$ for $x>0$, equality at $x=1$, value 2.",
      },
      {
        heading: "Cauchy and Titu",
        body: "Cauchy: $(a_1^2+\\cdots)(b_1^2+\\cdots)\\ge (a_1b_1+\\cdots)^2$. Titu (Cauchy in Engel form): $\\sum a_i^2/b_i \\ge (\\sum a_i)^2 / \\sum b_i$ for $b_i>0$. Nesbitt is Titu in a costume.",
      },
      {
        heading: "When not to flex",
        body: "Main almost never needs Cauchy. If the question is a quadratic inequality or a graph, complete the square or sign-chart. Save this kit for Advanced and for maxima-minima without calculus.",
      },
    ],
    formulas: [
      { name: "AM–GM", latex: "\\frac{x_1+\\cdots+x_n}{n} \\ge \\sqrt[n]{x_1\\cdots x_n}" },
      { name: "Titu", latex: "\\frac{a^2}{x}+\\frac{b^2}{y}\\ge\\frac{(a+b)^2}{x+y}\\quad(x,y>0)" },
    ],
  },
  {
    id: "king-integrals",
    title: "Definite integral properties",
    subject: "maths",
    minutes: 30,
    blurb: "King, queen, even-odd, periodic — the 2-minute definite integral in Main.",
    sections: [
      {
        heading: "The properties",
        body: "Let $I = \\int_a^b f(x)\\,dx$.",
        bullets: [
          "King: $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$. For $0$ to $a$, $f(x)+f(a-x)$ is the trick.",
          "Even/odd on $[-a,a]$: even doubles, odd vanishes (if it exists).",
          "Periodic with $T$: $\\int_0^{nT} = n\\int_0^T$.",
          "Newton–Leibniz after a substitution that linearises the argument.",
        ],
      },
      {
        heading: "Standard Main forms",
        body: "$\\int_0^{\\pi/2} \\sin^n x\\,dx$ reduction, $\\int_0^\\infty e^{-ax}dx$, and $\\int_0^1 x^{m}(1-x)^{n}$ as beta-lite. Do not invoke beta function in Main; reduce by parts or walls.",
      },
    ],
    formulas: [
      { name: "King 0 to a", latex: "\\int_0^a f(x)\\,dx = \\int_0^a f(a-x)\\,dx" },
      { name: "Average of pair", latex: "\\int_0^a f(x)dx = \\int_0^a \\frac{f(x)+f(a-x)}{2}\\,dx" },
    ],
  },
  {
    id: "complex-geometry",
    title: "Complex numbers as geometry",
    subject: "maths",
    minutes: 35,
    blurb: "Argand plane is coordinate geometry with multiplication as rotation. Advanced writes loci as |z−z1|/|z−z2| = k.",
    sections: [
      {
        heading: "Dictionary",
        body: "$|z-z_1|=r$ circle. $\\arg((z-z_1)/(z-z_2))=\\alpha$ arc. $|z-z_1|=|z-z_2|$ perpendicular bisector. $\\mathrm{Re}(z\\bar z_0)=c$ a line. Multiplication by $e^{i\\theta}$ rotates about origin; by $(z-z_0)\\mapsto e^{i\\theta}(z-z_0)$ rotates about $z_0$.",
      },
      {
        heading: "Roots of unity",
        body: "$1,\\omega,\\omega^2$ are vertices of an equilateral triangle on the unit circle. $1+\\omega+\\omega^2=0$ is used more as an algebraic identity than as geometry, but both views kill different problems.",
      },
    ],
    formulas: [
      { name: "Rotation", latex: "\\frac{z-z_1}{z_2-z_1} = e^{i\\theta}\\frac{w-z_1}{z_2-z_1}" },
      { name: "ω", latex: "\\omega^3=1,\\quad 1+\\omega+\\omega^2=0,\\quad \\omega^2+\\omega+1=0" },
    ],
  },
  {
    id: "triangles-adv",
    title: "Solution of triangles (Advanced)",
    subject: "maths",
    minutes: 40,
    blurb: "Sine/cosine rules, formulae for r, R, Δ — often dropped from Main, still in Advanced trigonometry.",
    sections: [
      {
        heading: "Core",
        body: "$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$. Cosine: $c^2=a^2+b^2-2ab\\cos C$. Area $\\Delta=\\frac12 bc\\sin A=\\sqrt{s(s-a)(s-b)(s-c)}=r s = abc / 4R$.",
      },
      {
        heading: "r and R extras",
        body: "$r=(s-a)\\tan(A/2)=4R\\sin(A/2)\\sin(B/2)\\sin(C/2)$. $r_a = \\Delta/(s-a)$. These appear as integer-answer identities more than as ‘find the side’.",
      },
    ],
    formulas: [
      { name: "Extended sine", latex: "\\frac{a}{\\sin A}=2R" },
      { name: "Area", latex: "\\Delta = rs = \\frac{abc}{4R}" },
    ],
  },
  {
    id: "pyq-mining",
    title: "How to mine PYQs",
    subject: "all",
    minutes: 20,
    blurb: "Solving 10,000 questions is a hobby. Extracting the 40 templates NTA recycles is a method.",
    sections: [
      {
        heading: "The 3-pass",
        body: "Pass 1: timed, as a paper. Pass 2: every wrong + every guess, write the template in one line (‘YDSE + slab in front of one slit’). Pass 3 a week later: only the template list, regenerate a fresh numerical yourself.",
      },
      {
        heading: "What to ignore",
        body: "Pre-2005 Advanced with expired syllabus. Random Telegram ‘expected 2026’ papers. Questions whose chapter was deleted from Main unless you are on the Advanced track.",
      },
      {
        heading: "Official sources",
        body: "NTA website papers, IIT JEE Advanced official archive (jeeadv.ac.in), NCERT exemplar. Coaching grand tests are mocks, not PYQs — log them separately so you do not warp the template list.",
      },
    ],
  },
  {
    id: "mock-protocol",
    title: "Mock analysis protocol",
    subject: "all",
    minutes: 25,
    blurb: "A mock without a 90-minute post-mortem is entertainment. This is the protocol used by people who actually move percentile.",
    sections: [
      {
        heading: "The four buckets",
        body: "Tag every wrong or lucky-correct as: (1) Concept missing, (2) Calculation, (3) Misread / unit / marking, (4) Time — knew it, didn’t reach it. If bucket 1 dominates, you need chapters, not more mocks. If 3–4 dominate, you need paper tactics.",
      },
      {
        heading: "The 48-hour rule",
        body: "Re-solve the entire mock from scratch after two nights, not by reading the solution. If you fail the same question, it goes to the error book as a template, not as a question number.",
      },
    ],
  },
  {
    id: "three-hour",
    title: "The 3-hour paper",
    subject: "all",
    minutes: 20,
    blurb: "A time split you can actually hold under adrenaline.",
    sections: [
      {
        heading: "Main default split",
        body: "Chemistry 40 min, Physics 70, Maths 70, buffer 0. The buffer is a myth unless you finish a subject early. If chemistry is your floor, protect it first. If maths is your ceiling, do not let it eat chemistry’s 40.",
        bullets: [
          "Sweep 1: all ‘I can do this in 90 seconds’ across subjects.",
          "Sweep 2: 3–5 minute problems in your strong subject.",
          "Sweep 3: numericals you have an equation for.",
          "Never Sweep-2 a rotation problem in minute 10.",
        ],
      },
      {
        heading: "Advanced",
        body: "Read the marking scheme before question 1. A +4/−2 multi-correct with four options is not the same as +3 with partial. Plan the paper around the high-certainty single-correct and integer first, then multi-correct you can fully defend.",
      },
    ],
  },
  {
    id: "books-stack",
    title: "Books, and when to stop",
    subject: "all",
    minutes: 15,
    blurb: "The stack that finishes beats the stack that impresses.",
    sections: [
      {
        heading: "Default stack",
        body: "NCERT (all three, chemistry especially) → this atlas → official PYQs. Then one problem book per subject: HCV / Irodov (selected) for physics, MS Chauhan or Himanshu Pandey for organic, Cengage or Arihant for maths — pick one, not both.",
      },
      {
        heading: "Irodov / Krotov",
        body: "Only after HCV-level mechanics and electrostatics are clean, and only the chapters tagged in this atlas as Advanced-heavy. If a problem takes 40 minutes and you cannot name the principle, skip and return. Rank 500 protocol uses them; 60-day crash does not.",
      },
      {
        heading: "NCERT is not optional",
        body: "Main inorganic and biomolecules are NCERT sentences with a question mark. If you have not highlighted the tables in d-block, p-block (as per current syllabus), and biomolecules, you are donating marks.",
      },
    ],
  },
  {
    id: "boards-95",
    title: "Scoring 95+ in CBSE PCM",
    subject: "all",
    minutes: 20,
    blurb: "Boards are a writing exam. JEE speed without derivations caps you at 80.",
    sections: [
      {
        heading: "Physics",
        body: "Memorise the exact NCERT derivation skeletons: Gauss for a sphere/plane/line, lens maker, SHM energy, Biot–Savart for a wire/loop, Einstein photoelectric. Draw the diagram first; half the marks are the diagram + labelled axes.",
      },
      {
        heading: "Chemistry",
        body: "Inorganic: NCERT wording. Organic: named reaction + equation with conditions. Physical: formula, substitution, unit, three-significant-figure answer. Don’t skip the reason-for-the-trend sentences.",
      },
      {
        heading: "Maths",
        body: "Step marks. Write ‘Let’, the formula, the substitution, the boxed answer. Linear programming (boards-only in this atlas) is free if you sketch the feasible region large enough to read.",
      },
    ],
  },
];

export const BOOSTER_BY_ID = Object.fromEntries(BOOSTERS.map((b) => [b.id, b]));
