import type { ChapterContent } from "../types";
import { F, Q, T, W } from "./pack";

export const MATHS_DEPTH: Record<string, Partial<ChapterContent>> = {
  "math-sets": {
    theory: [
      T(
        "math-sets-interval",
        "Representations, intervals, complement properties",
        "A set is a well-defined collection. Roster $\\{1,2,3\\}$ vs set-builder $\\{x\\in\\mathbb N:x<4\\}$. Intervals: $[a,b]$ closed, $(a,b)$ open, $[a,b)$ half. $\\mathbb R= (-\\infty,\\infty)$. Complement: $A'=U\\setminus A$. De Morgan: $(A\\cup B)'=A'\\cap B'$ and $(A\\cap B)'=A'\\cup B'$. $A\\cup A'=U$, $A\\cap A'=\\varnothing$, $(A')'=A$. Difference $A\\setminus B=A\\cap B'$. Draw the Venn before you write an $n(\\cdot)$ equation.",
        { diagram: "venn" },
      ),
    ],
    formulas: [
      F("n(A∪B)", "n(A\\cup B)=n(A)+n(B)-n(A\\cap B)"),
      F("De Morgan", "(A\\cup B)'=A'\\cap B'"),
    ],
  },
  "math-rel-11": {
    theory: [
      T(
        "math-rel11-fun",
        "Cartesian products and the standard graphs",
        "$A\\times B=\\{(a,b):a\\in A, b\\in B\\}$, so $n(A\\times B)=n(A)\\,n(B)$. A relation $R\\subset A\\times B$. A function $f:A\\to B$ assigns exactly one $f(a)\\in B$ to each $a\\in A$. Domain is $A$; co-domain is $B$; range is $\\{f(a)\\}\\subset B$. Standard graphs you must be able to draw from a blank page: $y=x$, $y=x^2$, $y=|x|$, $y=\\mathrm{sgn}(x)$, $y=[x]$ (greatest integer, jump discontinuities), $y=e^x$, $y=\\ln x$, $y=1/x$. Sum/product of functions: $(f+g)(x)=f(x)+g(x)$ on the intersection of domains.",
      ),
    ],
  },
  "math-trig": {
    theory: [
      T(
        "math-trig-ids",
        "The identity sheet boards actually list",
        "$\\tan(x\\pm y)=(\\tan x\\pm\\tan y)/(1\\mp\\tan x\\tan y)$, $\\cot(x\\pm y)=(\\cot x\\cot y\\mp 1)/(\\cot y\\pm\\cot x)$. Sum-to-product: $\\sin\\alpha\\pm\\sin\\beta=2\\sin\\frac{\\alpha\\pm\\beta}{2}\\cos\\frac{\\alpha\\mp\\beta}{2}$, $\\cos\\alpha+\\cos\\beta=2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}$, $\\cos\\alpha-\\cos\\beta=-2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}$. Double: $\\sin 2x=2\\sin x\\cos x$, $\\cos 2x=\\cos^2 x-\\sin^2 x=2\\cos^2 x-1=1-2\\sin^2 x$, $\\tan 2x=2\\tan x/(1-\\tan^2 x)$. Triple: $\\sin 3x=3\\sin x-4\\sin^3 x$, $\\cos 3x=4\\cos^3 x-3\\cos x$, $\\tan 3x=(3\\tan x-\\tan^3 x)/(1-3\\tan^2 x)$.",
        {
          diagram: "unit-circle",
          callout: {
            kind: "board",
            text: "This block is the official identity list. Main uses it without naming it. Recite the three forms of cos 2x every night for a week.",
          },
        },
      ),
    ],
    formulas: [
      F("sin 3x", "\\sin 3x = 3\\sin x - 4\\sin^3 x"),
      F("cos 3x", "\\cos 3x = 4\\cos^3 x - 3\\cos x"),
      F("sin α + sin β", "2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"),
    ],
  },
  "math-complex": {
    theory: [
      T(
        "math-cplx-why",
        "Why √−1, and the Argand picture",
        "The quadratic $x^2+1=0$ has no real root. Adjoin $i$ with $i^2=-1$, and every quadratic $ax^2+bx+c=0$ has roots in $\\mathbb C$. Algebra: $z=x+iy$, $\\bar z=x-iy$, $|z|^2=z\\bar z$, $1/z=\\bar z/|z|^2$. Argand: the point $(x,y)$. Addition is vector addition; multiplication by $r(\\cos\\theta+i\\sin\\theta)$ is scale-$r$ plus rotate-$\\theta$. This is the picture Advanced then uses for $|z-z_0|=r$ (a circle) and $\\arg((z-a)/(z-b))=\\alpha$ (an arc).",
        { diagram: "argand" },
      ),
    ],
  },
  "math-ineq": {
    theory: [
      T(
        "math-ineq-line",
        "One-variable linear inequalities on the number line",
        "Adding the same number to both sides preserves the inequality. Multiplying by a negative number reverses it — that is the only landmine. $ax+b>0$ with $a>0$ is $x>-b/a$, an open ray. Closed vs open: $\\le$ includes the endpoint (a filled dot). Two inequalities at once: intersect the rays. Double inequality $-2<3x-1\\le 5$ is two rays, solved together.",
      ),
    ],
    worked: [
      W(
        "math-ineq-dw1",
        "boards",
        "Solve $3x-5\\le 7-x$ and show it on the number line.",
        ["$3x+x\\le 7+5$", "$4x\\le 12$", "$x\\le 3$."],
        "$x\\le 3$, closed ray to the left of 3.",
        "Direction stays because the coefficient of x stayed positive.",
      ),
    ],
  },
  "math-pnc": {
    theory: [
      T(
        "math-pnc-derive",
        "Why nPr and nCr look like that",
        "Fundamental principle: if task A has m ways and then task B has n, the pair has $mn$ ways (independent). $n! = n(n-1)\\cdots 1$, with $0!=1$. A permutation is an arrangement: $nP_r=n!/(n-r)!$ (r slots, no repetition). A combination is a selection: $nC_r=nP_r/r!=n!/(r!(n-r)!)$ because the r! orders of a given selection are identified. $nC_r=nC_{n-r}$. $nC_r + nC_{r-1} = {}^{n+1}C_r$ (Pascal).",
      ),
    ],
  },
  "math-binom": {
    theory: [
      T(
        "math-binom-pascal",
        "Pascal’s triangle and the general term",
        "$(a+b)^n=\\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r$. The general term is $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$. Pascal’s triangle is the $\\binom{n}{r}$ table: each entry is the sum of the two above it, which is the identity $\\binom{n}{r}+\\binom{n}{r-1}=\\binom{n+1}{r}$. Middle term: one if n even ($T_{n/2+1}$), two if n odd.",
      ),
    ],
  },
  "math-seq": {
    theory: [
      T(
        "math-seq-infinite",
        "Infinite GP and AM–GM",
        "GP $a, ar, ar^2,\\ldots$. Sum of n terms $S_n=a(r^n-1)/(r-1)$ for $r\\ne 1$. Infinite GP converges only for $|r|<1$, to $S=a/(1-r)$. GM of a, b is $\\sqrt{ab}$ (positive). AM–GM: $(a+b)/2\\ge\\sqrt{ab}$, equality iff $a=b>0$. This is the inequality that later runs AOD max/min and many Advanced estimates.",
        { diagram: "ap-gp" },
      ),
    ],
    formulas: [F("Infinite GP", "S=a/(1-r)\\quad(|r|<1)"), F("AM–GM", "(a+b)/2\\ge\\sqrt{ab}")],
  },
  "math-straight": {
    theory: [
      T(
        "math-st-forms",
        "Every form of a line, once",
        "Slope $m=\\tan\\theta=(y_2-y_1)/(x_2-x_1)$. Point-slope $y-y_1=m(x-x_1)$. Slope-intercept $y=mx+c$. Two-point as above. Intercept $x/a+y/b=1$. Parallel to x-axis: $y=k$; to y-axis: $x=k$. General $ax+by+c=0$ with $m=-a/b$. Distance $|ax_0+by_0+c|/\\sqrt{a^2+b^2}$. Angle $\\tan\\theta=|(m_1-m_2)/(1+m_1 m_2)|$ (undefined if $1+m_1 m_2=0$, i.e. perpendicular).",
      ),
    ],
  },
  "math-conic": {
    theory: [
      T(
        "math-conic-degen",
        "Degenerate sections and the circle",
        "A plane cutting a cone can give a point, a line, or a pair of intersecting lines — those are degenerate conics. Circle: $x^2+y^2+2gx+2fy+c=0$, centre $(-g,-f)$, radius $\\sqrt{g^2+f^2-c}$. Standard $(x-h)^2+(y-k)^2=r^2$. Tangent at $(x_1,y_1)$ on $x^2+y^2=r^2$ is $xx_1+yy_1=r^2$. Parabola $y^2=4ax$, ellipse $x^2/a^2+y^2/b^2=1$ ($e<1$), hyperbola $x^2/a^2-y^2/b^2=1$ ($e>1$).",
      ),
    ],
  },
  "math-3d-11": {
    theory: [
      T(
        "math-3d11-axes",
        "Axes, planes, distance",
        "Three mutually perpendicular axes. The coordinate planes are $xy$ ($z=0$), $yz$ ($x=0$), $zx$ ($y=0$). A point is an ordered triple $(x,y,z)$. Distance $PQ=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$. The eight octants are signed like quadrants. Section formula (internal $\\lambda:\\mu$): $(\\mu x_1+\\lambda x_2)/(\\lambda+\\mu)$, and cyclic.",
      ),
    ],
    formulas: [F("3D distance", "PQ=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}")],
  },
  "math-limits": {
    theory: [
      T(
        "math-lim-def",
        "Limit intuition and the derivative as a tangent",
        "A limit is the value f approaches, not necessarily the value f takes. Polynomials and rationals (away from a zero denominator) are continuous, so $\\lim_{x\\to a}f(x)=f(a)$. Standard: $\\lim_{\\theta\\to 0}\\sin\\theta/\\theta=1$ (θ in radians), $\\lim_{x\\to 0}(e^x-1)/x=1$, $\\lim_{x\\to 0}\\ln(1+x)/x=1$. The derivative $f'(x)=\\lim_{h\\to 0}[f(x+h)-f(x)]/h$ is the slope of the tangent. Product rule $(uv)'=u'v+uv'$, quotient $(u/v)'=(u'v-uv')/v^2$.",
        { diagram: "tangent-curve" },
      ),
    ],
    formulas: [
      F("sin θ / θ", "\\lim_{\\theta\\to 0}\\frac{\\sin\\theta}{\\theta}=1"),
      F("Product rule", "(uv)'=u'v+uv'"),
    ],
  },
  "math-stats": {
    theory: [
      T(
        "math-stats-disp",
        "Range, mean deviation, variance",
        "Range = max − min (crude). Mean deviation about mean: $\\frac1n\\sum |x_i-\\bar x|$ (or about median). Variance $\\sigma^2=\\frac1n\\sum(x_i-\\bar x)^2=\\frac1n\\sum x_i^2-\\bar x^2$. Standard deviation is $\\sigma$. For grouped data replace $x_i$ by class marks and weight by frequency. Variance is translation-invariant; multiplying the data by $k$ multiplies $\\sigma$ by $|k|$.",
      ),
    ],
    formulas: [F("Variance", "\\sigma^2 = \\frac1n\\sum x_i^2 - \\bar x^2")],
  },
  "math-prob-11": {
    theory: [
      T(
        "math-prob11-axioms",
        "Axiomatic probability and the ‘not / and / or’ calculus",
        "An event is a subset of the sample space S. $P(S)=1$, $P(\\varnothing)=0$, $0\\le P(A)\\le 1$. $P(A')=1-P(A)$. If A, B mutually exclusive, $P(A\\cup B)=P(A)+P(B)$. In general $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. Exhaustive events cover S. ‘And’ is intersection, ‘or’ is union. Classical (equally likely) $P=n(A)/n(S)$ is the XI counting version of the same axioms.",
      ),
    ],
  },
  "math-rel-12": {
    theory: [
      T(
        "math-rel12-eq",
        "Equivalence relations, one-one and onto",
        "Reflexive: $aRa$ for all a. Symmetric: $aRb\\Rightarrow bRa$. Transitive: $aRb$ and $bRc\\Rightarrow aRc$. Equivalence = all three; it partitions the set into classes. One-one (injective): $f(a)=f(b)\\Rightarrow a=b$. Onto (surjective): range = co-domain. A finite set to itself: one-one ⇔ onto ⇔ bijective. Number of bijections of an n-set is $n!$.",
      ),
    ],
  },
  "math-invtrig": {
    theory: [
      T(
        "math-inv-pv",
        "Principal values and the graphs",
        "sin⁻¹: domain $[-1,1]$, range $[-\\pi/2,\\pi/2]$. cos⁻¹: $[-1,1]\\to[0,\\pi]$. tan⁻¹: $\\mathbb R\\to(-\\pi/2,\\pi/2)$. These ranges are the principal branches — without them the inverse is multi-valued and every identity breaks. Graphs: rotate the restricted trig graph about y=x. Standard: $\\sin^{-1}x+\\cos^{-1}x=\\pi/2$ for $x\\in[-1,1]$. $\\tan^{-1}x+\\tan^{-1}y=\\tan^{-1}\\frac{x+y}{1-xy}$ when $xy<1$.",
        { diagram: "unit-circle" },
      ),
    ],
    formulas: [F("sin⁻¹ + cos⁻¹", "\\sin^{-1}x+\\cos^{-1}x=\\pi/2")],
  },
  "math-matrices": {
    theory: [
      T(
        "math-mat-zero",
        "AB = 0 with A, B ≠ 0, and uniqueness of inverse",
        "Matrix multiplication is not commutative: $AB\\ne BA$ in general. It is possible that $AB=0$ with neither A nor B the zero matrix (order 2 is enough — boards want an example). Inverse: if A is invertible then the inverse is unique (if $AB=BA=I$ and $AC=CA=I$ then $B=C$). $(AB)^{-1}=B^{-1}A^{-1}$. Transpose: $(AB)^T=B^T A^T$. Symmetric $A^T=A$; skew $A^T=-A$ (diagonal of a skew matrix is 0).",
        { callout: { kind: "board", text: "Write one explicit 2×2 pair with AB=0, A≠0, B≠0. It is a two-mark classic." } },
      ),
    ],
    worked: [
      W(
        "math-mat-dw1",
        "boards",
        "Give 2×2 matrices A, B, neither zero, with AB=0.",
        [
          "Take $A=\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$, $B=\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$.",
          "Direct multiply: each entry of AB is 0.",
        ],
        "Such pairs exist because matrix rings have zero divisors.",
        "Do not confuse with det A = 0, which is the reason A is not invertible.",
      ),
    ],
  },
  "math-dets": {
    theory: [
      T(
        "math-det-cramer",
        "Minors, cofactors, area, inverse via adjoint",
        "Minor $M_{ij}$ is the det after deleting row i, column j. Cofactor $C_{ij}=(-1)^{i+j}M_{ij}$. $A^{-1}=\\mathrm{adj} A/\\det A$ with $\\mathrm{adj} A=(C_{ij})^T$. Area of a triangle with vertices $(x_i,y_i)$ is $\\frac12|\\det|$ of the 3×3 with a column of 1s. A system $AX=B$ has a unique solution iff $\\det A\\ne 0$, namely $X=A^{-1}B$. If $\\det A=0$ and adj A · B ≠ 0, inconsistent; if also 0, infinitely many or none — check by rows.",
      ),
    ],
    formulas: [F("Inverse", "A^{-1}=(\\mathrm{adj} A)/\\det A")],
  },
  "math-cont": {
    theory: [
      T(
        "math-cont-logdiff",
        "Chain rule, inverse trig, log-diff, parametric, second order",
        "Chain: $(f\\circ g)'=(f'\\circ g)\\,g'$. Inverse trig: $(\\sin^{-1}x)'=1/\\sqrt{1-x^2}$, $(\\tan^{-1}x)'=1/(1+x^2)$. Implicit: differentiate both sides, solve for $dy/dx$. Logarithmic: $y=u^v$ ⇒ $\\ln y=v\\ln u$, then differentiate (the only sane way). Parametric: $dy/dx=(dy/dt)/(dx/dt)$. Second order: $d^2y/dx^2=d(y')/dx$. Exponential and log are inverses: $(e^x)'=e^x$, $(\\ln x)'=1/x$.",
      ),
    ],
    formulas: [
      F("d(sin⁻¹x)/dx", "1/\\sqrt{1-x^2}"),
      F("d(tan⁻¹x)/dx", "1/(1+x^2)"),
      F("(ln x)'", "1/x"),
    ],
  },
  "math-aod": {
    theory: [
      T(
        "math-aod-maxmin",
        "Rate, monotonicity, maxima and minima",
        "If $y=f(x)$ and $x=x(t)$, $dy/dt=f'(x)\\,dx/dt$. $f$ increasing on I if $f'\\ge 0$ there. First-derivative test: $f'$ changes + to − at a local max, − to + at a local min. Second-derivative test: $f'(c)=0$ and $f''(c)<0$ ⇒ local max; $f''(c)>0$ ⇒ local min; $f''(c)=0$ is inconclusive. Closed interval: check critical points and the endpoints — the global max is the largest of those values.",
        { diagram: "tangent-curve" },
      ),
    ],
  },
  "math-int": {
    theory: [
      T(
        "math-int-std",
        "The official standard integrals",
        "Boards list these by name. $\\int dx/(x^2+a^2)=\\frac1a\\tan^{-1}(x/a)$, $\\int dx/(x^2-a^2)=\\frac1{2a}\\ln|(x-a)/(x+a)|$, $\\int dx/\\sqrt{a^2-x^2}=\\sin^{-1}(x/a)$, $\\int dx/\\sqrt{x^2\\pm a^2}=\\ln|x+\\sqrt{x^2\\pm a^2}|$. Complete the square for $ax^2+bx+c$. Split $(px+q)$ into a multiple of the derivative of the quadratic plus a constant, then those two integrals. By parts: $\\int u\\,dv=uv-\\int v\\,du$ (ILATE). Partial fractions for proper rationals. FTC: $\\frac{d}{dx}\\int_a^x f= f(x)$. $\\int_a^b f= F(b)-F(a)$.",
      ),
    ],
    formulas: [
      F("∫ dx/(x²+a²)", "\\frac1a\\tan^{-1}(x/a)"),
      F("∫ dx/√(a²−x²)", "\\sin^{-1}(x/a)"),
      F("By parts", "\\int u\\,dv = uv-\\int v\\,du"),
    ],
  },
  "math-aoi": {
    theory: [
      T(
        "math-aoi-std",
        "Area under standard curves",
        "Area under $y=f(x)$ from a to b is $\\int_a^b |f|$ if you want geometric area, $\\int_a^b f$ if you want signed. Circle $x^2+y^2=a^2$: a quadrant is $\\pi a^2/4$. Parabola $y^2=4ax$ between $x=0$ and $x=a$: $\\frac83 a^2$. Ellipse $x^2/a^2+y^2/b^2=1$: full area $\\pi ab$. Two curves: $\\int |f-g|$ between intersection points. Always sketch; the integral without a sketch is how sign errors happen.",
        { diagram: "area-curve" },
      ),
    ],
  },
  "math-de": {
    theory: [
      T(
        "math-de-types",
        "Order, degree, the three official methods",
        "Order = highest derivative present. Degree = power of that highest derivative after the equation is polynomial in the derivatives. Separation: $dy/dx=f(x)g(y)$ ⇒ $\\int dy/g=\\int f\\,dx$. Homogeneous of degree 0 in (x,y): put $y=vx$. Linear $dy/dx+Py=Q$: integrating factor $e^{\\int P\\,dx}$, then $y\\cdot IF=\\int Q\\,IF\\,dx$. The swapped form $dx/dy+Px=Q$ is the same with x as dependent.",
      ),
    ],
    formulas: [F("IF for y'+Py=Q", "e^{\\int P\\,dx}")],
  },
  "math-vec": {
    theory: [
      T(
        "math-vec-dc",
        "Direction cosines, section, dot and cross",
        "If $\\vec a$ makes angles $\\alpha,\\beta,\\gamma$ with the axes, $l=\\cos\\alpha$, $m=\\cos\\beta$, $n=\\cos\\gamma$ and $l^2+m^2+n^2=1$. Direction ratios are any triple proportional to (l, m, n). Position vector of the point dividing AB in $\\lambda:\\mu$ is $(\\mu\\vec a+\\lambda\\vec b)/(\\lambda+\\mu)$. Dot: $\\vec a\\cdot\\vec b=ab\\cos\\theta=a_1b_1+a_2b_2+a_3b_3$; projection of b on a is $(\\vec a\\cdot\\vec b)/|a|$. Cross: $|\\vec a\\times\\vec b|=ab\\sin\\theta$, direction perpendicular, component form the 3×3 det with $\\hat i\\hat j\\hat k$.",
        { diagram: "vector-3d" },
      ),
    ],
    formulas: [F("DC identity", "l^2+m^2+n^2=1")],
  },
  "math-3d-12": {
    theory: [
      T(
        "math-3d12-skew",
        "Lines in space: skew, angle, shortest distance",
        "A line through $\\vec a$ along $\\vec b$: $\\vec r=\\vec a+\\lambda\\vec b$, or $(x-x_1)/l=(y-y_1)/m=(z-z_1)/n$. Two lines are skew if they are neither parallel nor intersecting (possible only in 3D). Angle: $\\cos\\theta=|\\vec b_1\\cdot\\vec b_2|/(|b_1||b_2|)$. Shortest distance between $\\vec r=\\vec a_1+\\lambda\\vec b_1$ and $\\vec r=\\vec a_2+\\mu\\vec b_2$ is $|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|/|\\vec b_1\\times\\vec b_2|$. If that numerator is 0 they are coplanar.",
      ),
    ],
    formulas: [
      F("SD of skew lines", "\\frac{|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|}{|\\vec b_1\\times\\vec b_2|}"),
    ],
  },
  "math-lpp": {
    theory: [
      T(
        "math-lpp-graph",
        "Graphical LPP in two variables",
        "Write constraints as half-planes. The feasible region is their intersection — bounded (a polygon) or unbounded. Corner-point theorem: a linear objective on a closed convex polygon attains max/min at a vertex. Evaluate Z at each vertex (and, if unbounded, check a ray — Z may be unbounded). Infeasible: empty intersection. Up to three non-trivial constraints is the board / Main scope.",
      ),
    ],
  },
  "math-prob-12": {
    theory: [
      T(
        "math-prob12-bayes",
        "Conditional probability, Bayes, random variables",
        "$P(A|B)=P(A\\cap B)/P(B)$. Multiplication: $P(A\\cap B)=P(A)P(B|A)$. Independent: $P(A\\cap B)=P(A)P(B)$ (this is stronger than mutually exclusive, which is $P(A\\cap B)=0$ and is almost the opposite for positive-probability events). Total probability: $P(B)=\\sum P(B|A_i)P(A_i)$ for a partition. Bayes inverts it. A random variable X assigns a number to each outcome; its distribution is $P(X=x_i)$. Mean $E[X]=\\sum x_i P(X=x_i)$.",
        {
          callout: {
            kind: "main",
            text: "A bag-and-ball or a disease-test story is Bayes. Write the partition on line 1. Mutually exclusive ≠ independent — that trap is still live.",
          },
        },
      ),
    ],
    formulas: [
      F("Bayes", "P(A_i|B)=\\frac{P(B|A_i)P(A_i)}{\\sum P(B|A_j)P(A_j)}"),
      F("Mean of RV", "E[X]=\\sum x_i P(X=x_i)"),
    ],
    quiz: [
      Q(
        "math-p12-dq1",
        "main",
        "If A and B are independent with P(A), P(B)>0, then they are mutually exclusive?",
        ["always", "never (since P(A∩B)=P(A)P(B)>0)", "iff P(A)=1", "iff P(B)=0"],
        1,
        "Independent with positive probability forces a non-empty intersection.",
      ),
    ],
  },
};
