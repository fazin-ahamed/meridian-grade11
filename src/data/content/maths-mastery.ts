import type { ChapterContent } from "../types";
import { F, Q, T, W } from "./pack";

/** Extra Class 11–12 Maths depth matching the official CBSE identity / method list. */
export const MATHS_MASTERY: Record<string, Partial<ChapterContent>> = {
  "math-trig": {
    theory: [
      T(
        "math-trig-circle",
        "Radians, unit circle, signs, domain and range",
        "One radian is the angle that cuts an arc equal to the radius: $180^{\\circ}=\\pi$ rad, so $1^{\\circ}=\\pi/180$. On the unit circle a point at angle $x$ (from the positive $x$-axis, anticlockwise) is $(\\cos x,\\sin x)$. That is the definition — SOH-CAH-TOA is the right-triangle special case in Q1. Then $\\sin^2 x+\\cos^2 x=1$ is Pythagoras on the circle, true for all $x$. Signs follow the quadrant of the point: Q1 all +, Q2 sin +, Q3 tan +, Q4 cos +. Domain of $\\sin,\\cos$ is $\\mathbb R$, range $[-1,1]$; $\\tan$ is undefined at $\\tfrac\\pi2+n\\pi$, range $\\mathbb R$. Graphs: sine is odd, cosine even, period $2\\pi$; tan period $\\pi$.",
        {
          diagram: "unit-circle",
          bullets: [
            "Convert before you differentiate or integrate: $x$ in the formula is radians.",
            "CAST (or ASTC) is a memory aid; the circle is the reason.",
            "Standard values $0,30,45,60,90$ must be automatic in both degrees and radians.",
          ],
        },
      ),
    ],
    formulas: [
      F("Degree–radian", "x^{\\circ}=x\\pi/180\\ \\mathrm{rad}"),
      F("tan(x±y)", "\\tan(x\\pm y)=\\frac{\\tan x\\pm\\tan y}{1\\mp\\tan x\\tan y}"),
      F("cos 2x three ways", "\\cos 2x=\\cos^2 x-\\sin^2 x=2\\cos^2 x-1=1-2\\sin^2 x"),
    ],
    worked: [
      W(
        "math-trig-w3",
        "main",
        "Prove $\\cos\\alpha-\\cos\\beta=-2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}$ from the sum formulae.",
        [
          "$\\cos(x+y)=\\cos x\\cos y-\\sin x\\sin y$, $\\cos(x-y)=\\cos x\\cos y+\\sin x\\sin y$.",
          "Subtract: $\\cos(x+y)-\\cos(x-y)=-2\\sin x\\sin y$.",
          "Set $x=(\\alpha+\\beta)/2$, $y=(\\alpha-\\beta)/2$.",
        ],
        "The official sum-to-product identity.",
        "Do this once from scratch; do not only memorise the boxed line.",
      ),
    ],
  },
  "math-binom": {
    theory: [
      T(
        "math-binom-proof",
        "Binomial theorem for n ∈ ℕ, Pascal, general term",
        "For a positive integer $n$, $(x+y)^n=\\sum_{r=0}^{n}\\binom{n}{r}x^{n-r}y^r$. Proof: the coefficient of $x^{n-r}y^r$ is the number of ways to choose $y$ from $r$ of the $n$ factors, which is $\\binom{n}{r}$. Pascal’s identity $\\binom{n}{r}+\\binom{n}{r-1}=\\binom{n+1}{r}$ is the triangle’s construction rule. General term $T_{r+1}=\\binom{n}{r}x^{n-r}y^r$. Middle term: if $n$ even, one middle $T_{n/2+1}$; if $n$ odd, two, $T_{(n+1)/2}$ and $T_{(n+3)/2}$. Numerically greatest term: look at $|T_{r+1}/T_r|$ and find the last $r$ for which this is $\\ge 1$.",
        {
          diagram: "pascal",
          callout: {
            kind: "advanced",
            text: "Advanced uses the any-index form $(1+x)^\\alpha=1+\\alpha x+\\alpha(\\alpha-1)x^2/2!+\\cdots$ for $|x|<1$. Boards stop at positive integral n.",
          },
        },
      ),
    ],
    formulas: [
      F("General term", "T_{r+1}=\\binom{n}{r}x^{n-r}y^r"),
      F("Pascal", "\\binom{n}{r}+\\binom{n}{r-1}=\\binom{n+1}{r}"),
    ],
    quiz: [
      Q(
        "math-binom-q6",
        "main",
        "The middle term in $(x+1)^{10}$ is",
        ["$T_5$", "$T_6=\\binom{10}{5}x^5$", "$T_5$ and $T_6$", "$T_{10}$"],
        1,
        "n=10 even: one middle term T_{6}.",
      ),
    ],
  },
  "math-seq": {
    theory: [
      T(
        "math-seq-gp-amgm",
        "GP sums, infinite GP, AM–GM",
        "AP: $a_n=a+(n-1)d$, $S_n=\\tfrac n2[2a+(n-1)d]$. GP: $a_n=ar^{n-1}$, $S_n=a(r^n-1)/(r-1)$ for $r\\neq1$. Infinite GP with $|r|<1$: $S_\\infty=a/(1-r)$. Geometric mean of $a,b>0$ is $\\sqrt{ab}$; AM $\\ge$ GM with equality iff $a=b$. Inserting $n$ geometric means between $a$ and $b$ means a GP of $n+2$ terms from $a$ to $b$. $\\sum_{k=1}^{n}k=n(n+1)/2$, $\\sum k^2=n(n+1)(2n+1)/6$, $\\sum k^3=[n(n+1)/2]^2$ — these are the Advanced extras boards dropped but Main still uses.",
        { diagram: "ap-gp" },
      ),
    ],
    formulas: [
      F("Infinite GP", "S_\\infty=a/(1-r),\\quad |r|<1"),
      F("AM–GM", "\\frac{a+b}{2}\\ge\\sqrt{ab}"),
      F("Σ k²", "\\sum_{k=1}^n k^2=n(n+1)(2n+1)/6"),
    ],
  },
  "math-pnc": {
    theory: [
      T(
        "math-pnc-derive",
        "Fundamental counting, nPr and nCr derived",
        "FPC: if task A has $m$ ways and B has $n$ independent ways, A then B has $mn$ ways. $n!=n(n-1)\\cdots 1$, $0!=1$. A permutation of $n$ distinct taken $r$ at a time is an injection $\{1,\\dots,r\\}\\to$ the $n$-set: $n$ choices for the first, $n-1$ for the second, … so ${}^{n}P_{r}=n!/(n-r)!$. A combination forgets order: each $r$-subset was counted $r!$ times as a permutation, so ${}^{n}C_{r}={}^{n}P_{r}/r!=n!/(r!(n-r)!)$. Then ${}^{n}C_{r}={}^{n}C_{n-r}$. Circular permutations of $n$ distinct: $(n-1)!$ (rotations identified). Identical objects: $n!/(n_1!n_2!\\cdots)$.",
        {
          callout: {
            kind: "board",
            text: "Boards want the derivation in words, not only the formula. Write ‘first seat n ways, … divide by r! because order is irrelevant’.",
          },
        },
      ),
    ],
  },
  "math-ineq": {
    theory: [
      T(
        "math-ineq-line",
        "Linear inequalities on the number line, and the quadratic extra",
        "A linear inequality $ax+b>0$ is solved exactly like an equation, except that multiplying or dividing by a negative reverses the inequality. Graph on a number line: open circle for $<,>$; filled for $\\le,\\ge$. Double inequalities $c<ax+b<d$ are two walls. JEE immediately upgrades this to quadratic inequalities: factor, put roots on the line, sign-chart the parabola. Modulus $|x-a|<b$ is $a-b<x<a+b$.",
        { diagram: "number-line" },
      ),
    ],
    worked: [
      W(
        "math-ineq-w3",
        "main",
        "Solve $x^2-5x+6>0$.",
        ["$(x-2)(x-3)>0$.", "Critical points 2, 3. Sign + outside.", "$x\\in(-\\infty,2)\\cup(3,\\infty)$."],
        "$(-\\infty,2)\\cup(3,\\infty)$",
        "A U-shaped parabola is positive outside the roots.",
      ),
    ],
  },
  "math-straight": {
    theory: [
      T(
        "math-st-forms",
        "Every form of a line, and the distance formula",
        "A line is fixed by a point and a slope, or by two intercepts. Parallel to axes: $x=a$, $y=b$. Point-slope: $y-y_1=m(x-x_1)$. Slope-intercept: $y=mx+c$. Two-point: $y-y_1=\\frac{y_2-y_1}{x_2-x_1}(x-x_1)$. Intercept: $x/a+y/b=1$. Distance of $(x_0,y_0)$ from $ax+by+c=0$ is $|ax_0+by_0+c|/\\sqrt{a^2+b^2}$. Angle between slopes $m_1,m_2$: $\\tan\\theta=|(m_1-m_2)/(1+m_1 m_2)|$, undefined (i.e. $90^{\\circ}$) when $m_1 m_2=-1$.",
        { diagram: "line-forms" },
      ),
    ],
  },
  "math-conic": {
    theory: [
      T(
        "math-conic-degen",
        "Sections of a cone, circle, and the three standard conics",
        "A double cone cut by a plane: circle (plane $\\perp$ axis), ellipse (slight tilt), parabola (parallel to a generator), hyperbola (steeper, both nappes). Degenerate: a point, a line, a pair of intersecting lines — the plane through the vertex. Circle $(x-h)^2+(y-k)^2=r^2$ or $x^2+y^2+2gx+2fy+c=0$ with centre $(-g,-f)$, $r=\\sqrt{g^2+f^2-c}$. Parabola $y^2=4ax$: focus $(a,0)$, directrix $x=-a$, parametric $(at^2,2at)$. Ellipse $x^2/a^2+y^2/b^2=1$ ($a>b$): $e=\\sqrt{1-b^2/a^2}$, foci $(\\pm ae,0)$. Hyperbola $x^2/a^2-y^2/b^2=1$: $e=\\sqrt{1+b^2/a^2}$, asymptotes $y=\\pm(b/a)x$.",
        {
          diagram: "ellipse",
          bullets: [
            "Eccentricity: parabola $e=1$, ellipse $e<1$, hyperbola $e>1$, circle $e=0$.",
            "Definition: PF = e · (distance to directrix).",
          ],
        },
      ),
    ],
  },
  "math-3d-11": {
    theory: [
      T(
        "math-3d11-dist",
        "Axes, octants, distance",
        "Three mutually perpendicular axes divide space into eight octants. A point is $(x,y,z)$. Distance $PQ=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$. Section formula dividing $A,B$ in $m:n$ internally: $\\bigl(\\frac{nx_1+mx_2}{m+n},\\ldots\\bigr)$. The three coordinate planes are $x=0$, $y=0$, $z=0$.",
        { diagram: "vector-3d" },
      ),
    ],
  },
  "math-limits": {
    theory: [
      T(
        "math-lim-def",
        "Limit as a number, derivative as slope and as rate",
        "We say $\\lim_{x\\to a}f(x)=L$ if $f(x)$ can be made as close to $L$ as we like by taking $x$ close to $a$ (not necessarily equal). Polynomials and rationals (denominator $\\neq0$) are continuous, so the limit is $f(a)$. Standard: $\\lim_{\\theta\\to0}\\sin\\theta/\\theta=1$ ($\\theta$ in radians), $\\lim(1+x)^{1/x}=e$. The derivative $f'(a)=\\lim_{h\\to0}[f(a+h)-f(a)]/h$ is the slope of the tangent and, if $s(t)$ is distance, the instantaneous velocity. Sum, product, quotient rules; $(\\sin x)'=\\cos x$, $(\\cos x)'=-\\sin x$, $(x^n)'=nx^{n-1}$.",
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
        "math-stats-grouped",
        "Range, mean deviation, variance — ungrouped and grouped",
        "Range = max − min (crude). Mean deviation about the mean $\\mathrm{MD}=\\frac1n\\sum|x_i-\\bar x|$. Variance $\\sigma^2=\\frac1n\\sum(x_i-\\bar x)^2=\\frac1n\\sum x_i^2-\\bar x^2$ (the computational form). Standard deviation is $\\sigma$. Grouped data: use class marks $x_i$ and frequencies $f_i$, replace $n$ by $\\sum f_i$, and $\\bar x=\\sum f_i x_i/\\sum f_i$. Combined two groups: $\\bar x=(n_1\\bar x_1+n_2\\bar x_2)/(n_1+n_2)$ and a similar (longer) formula for combined $\\sigma^2$.",
      ),
    ],
    formulas: [
      F("Variance (computational)", "\\sigma^2=\\frac1n\\sum x_i^2-\\bar x^2"),
      F("Grouped mean", "\\bar x=\\sum f_i x_i/\\sum f_i"),
    ],
  },
  "math-prob-11": {
    theory: [
      T(
        "math-prob11-axioms",
        "Events, axioms, not / and / or",
        "An event is a subset of the sample space $S$. ‘Not A’ is $A'$. ‘A or B’ is $A\\cup B$. ‘A and B’ is $A\\cap B$. Exhaustive: union is $S$. Mutually exclusive: $A\\cap B=\\varnothing$. Axioms: $P\\ge0$, $P(S)=1$, $P(A\\cup B)=P(A)+P(B)$ when disjoint. Then $P(A')=1-P(A)$, $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. Equally likely outcomes: $P=n(A)/n(S)$. This is the set chapter with a number in $[0,1]$ on each region.",
        { diagram: "venn" },
      ),
    ],
  },
  "math-rel-12": {
    theory: [
      T(
        "math-rel12-eq",
        "Reflexive, symmetric, transitive, equivalence; 1-1 and onto",
        "On a set $A$: reflexive iff $aRa$ for every $a$; symmetric iff $aRb\\Rightarrow bRa$; transitive iff $aRb$ and $bRc\\Rightarrow aRc$. Equivalence = all three; it partitions $A$ into classes. A function $f:A\\to B$ is one-one (injective) iff $f(a)=f(a')\\Rightarrow a=a'$; onto (surjective) iff range $=B$. Finite sets: $f:A\\to A$ is 1-1 iff onto. Number of 1-1 maps from an $n$-set to an $m$-set ($m\\ge n$) is ${}^{m}P_{n}$. Onto: inclusion-exclusion $m!\\,S(n,m)$.",
      ),
    ],
  },
  "math-invtrig": {
    theory: [
      T(
        "math-inv-pv",
        "Principal values, domain, range, graphs",
        "Each inverse trig function is the inverse of a restricted branch so that it is 1-1. $\\sin^{-1}x$: domain $[-1,1]$, range $[-\pi/2,\\pi/2]$. $\\cos^{-1}x$: domain $[-1,1]$, range $[0,\\pi]$. $\\tan^{-1}x$: domain $\\mathbb R$, range $(-\\pi/2,\\pi/2)$. Graphs: $\\sin^{-1}$ is odd, increasing through the origin; $\\cos^{-1}$ is decreasing from $\\pi$ to $0$; $\\tan^{-1}$ looks like a squeezed odd step. Identities: $\\sin^{-1}x+\\cos^{-1}x=\\pi/2$, $\\tan^{-1}x+\\cot^{-1}x=\\pi/2$.",
        { diagram: "unit-circle" },
      ),
    ],
    formulas: [
      F("sin⁻¹ + cos⁻¹", "\\sin^{-1}x+\\cos^{-1}x=\\pi/2"),
      F("tan⁻¹ sum", "\\tan^{-1}x+\\tan^{-1}y=\\tan^{-1}\\frac{x+y}{1-xy}\\ (xy<1)"),
    ],
  },
  "math-matrices": {
    theory: [
      T(
        "math-mat-ops",
        "Types, operations, non-commutativity, inverse uniqueness",
        "Order $m\\times n$. Equal matrices: same order, entrywise equal. Zero $O$, identity $I$ (square). Transpose $(A^T)_{ij}=A_{ji}$. Symmetric $A^T=A$, skew $A^T=-A$ (diagonal of a skew matrix is 0). Addition is entrywise (same order); scalar $kA$. Product $AB$ needs $n_A=m_B$; $(AB)_{ij}=\\mathrm{row}_i(A)\\cdot\\mathrm{col}_j(B)$. $AB\\neq BA$ in general; you can have $AB=O$ with $A,B\\neq O$ (order 2 examples exist — that is an official bullet). If an inverse exists it is unique: if $AB=BA=I$ and $AC=CA=I$ then $B=C$. $(AB)^{-1}=B^{-1}A^{-1}$, $(A^T)^{-1}=(A^{-1})^T$.",
        { diagram: "matrix-mult" },
      ),
    ],
    quiz: [
      Q(
        "math-mat-q6",
        "advanced",
        "There exist non-zero 2×2 matrices A, B with AB = O. This statement is",
        ["false", "true, and listed in the official syllabus", "true only over ℂ", "true only if A = B"],
        1,
        "Official Class 12 Algebra bullet. Example: row-zero times column-zero patterns.",
      ),
    ],
  },
  "math-dets": {
    theory: [
      T(
        "math-det-cramer",
        "Minors, cofactors, area of a triangle, inverse, Cramer",
        "For $3\\times3$, expand along a row: $\\det A=\\sum_j a_{ij}C_{ij}$ with cofactor $C_{ij}=(-1)^{i+j}M_{ij}$. Area of a triangle with vertices $(x_i,y_i)$ is $\\tfrac12\\bigl|\\det\\begin{pmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{pmatrix}\\bigr|$. Adjoint $\\mathrm{adj}\\,A=(C_{ij})^T$, $A(\\mathrm{adj}A)=(\\det A)I$, so $A^{-1}=(\\mathrm{adj}A)/\\det A$ when $\\det A\\neq0$. A $2$ or $3$ variable system $AX=B$ has a unique solution iff $\\det A\\neq0$, namely $X=A^{-1}B$. If $\\det A=0$ the system is either inconsistent or has infinitely many solutions — check by examples, as the syllabus says.",
      ),
    ],
    formulas: [
      F("Inverse via adjoint", "A^{-1}=\\frac1{\\det A}\\,\\mathrm{adj}\\,A"),
      F("Area of triangle", "\\Delta=\\tfrac12\\lvert \\det[x\\ y\\ 1]\\rvert"),
    ],
  },
  "math-cont": {
    theory: [
      T(
        "math-cont-rules",
        "Continuity, chain rule, inverse trig, log, parametric, second derivative",
        "Continuous at $a$: $\\lim_{x\\to a}f(x)=f(a)$ (both one-sided limits exist and match). Differentiable $\\Rightarrow$ continuous; the converse fails at $|x|$ at 0. Chain rule $(f\\circ g)'=(f'\\circ g)\\,g'$. Inverse trig: $(\\sin^{-1}x)'=1/\\sqrt{1-x^2}$, $(\\tan^{-1}x)'=1/(1+x^2)$. Exponential/log: $(e^x)'=e^x$, $(\\ln x)'=1/x$. Logarithmic differentiation: for $y=[u(x)]^{v(x)}$, take $\\ln y=v\\ln u$ then differentiate. Parametric $x(t),y(t)$: $dy/dx=(dy/dt)/(dx/dt)$. Second derivative $d^2y/dx^2$ of a parametric curve uses $\\frac{d}{dx}(dy/dx)=\\frac{d}{dt}(dy/dx)\\big/\\frac{dx}{dt}$. Implicit: differentiate both sides w.r.t. $x$, treating $y=y(x)$.",
        { diagram: "tangent-curve" },
      ),
    ],
    formulas: [
      F("Chain", "\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}"),
      F("(sin⁻¹x)′", "\\frac1{\\sqrt{1-x^2}}"),
      F("(tan⁻¹x)′", "\\frac1{1+x^2}"),
      F("Parametric", "\\frac{dy}{dx}=\\frac{\\dot y}{\\dot x}"),
    ],
  },
  "math-aod": {
    theory: [
      T(
        "math-aod-tests",
        "Rate, increasing/decreasing, maxima and minima",
        "If $y=f(x)$ and $x=x(t)$, rate $dy/dt=f'(x)\\,dx/dt$. $f$ is increasing on an interval if $f'\\ge0$ there (strict if $f'>0$). First-derivative test: $f'$ changes + to − at $c$ ⇒ local max; − to + ⇒ local min. Second-derivative test: $f'(c)=0$ and $f''(c)<0$ ⇒ local max; $f''(c)>0$ ⇒ local min; $f''(c)=0$ is inconclusive (use the first test). Word problems: one variable, one function to optimise, domain first (a length cannot be negative), then $f'=0$.",
      ),
    ],
  },
  "math-int": {
    theory: [
      T(
        "math-int-types",
        "The official menu of integrals, and FTC",
        "Integration is the inverse of differentiation. Three techniques: substitution, partial fractions, parts $\\int u\\,dv=uv-\\int v\\,du$. Official types you must finish in one line each: $\\int dx/(x^2\\pm a^2)$, $\\int dx/\\sqrt{x^2\\pm a^2}$, $\\int dx/\\sqrt{a^2-x^2}$, $\\int dx/(ax^2+bx+c)$, $\\int dx/\\sqrt{ax^2+bx+c}$, $\\int(px+q)/(ax^2+bx+c)\\,dx$ and the same under a square root, $\\int\\sqrt{a^2\\pm x^2}\\,dx$, $\\int\\sqrt{x^2-a^2}\\,dx$, $\\int\\sqrt{ax^2+bx+c}\\,dx$. Completing the square turns every quadratic into one of those. FTC (without proof): $\\frac{d}{dx}\\int_a^x f=f(x)$, and $\\int_a^b f=F(b)-F(a)$. Properties: additivity over intervals, $\\int_a^b=\\int_a^c+\\int_c^b$, and the even/odd tricks on $[-a,a]$.",
        { diagram: "area-curve" },
      ),
    ],
    formulas: [
      F("1/(x²+a²)", "\\int\\frac{dx}{x^2+a^2}=\\frac1a\\tan^{-1}\\frac x a"),
      F("1/√(a²−x²)", "\\int\\frac{dx}{\\sqrt{a^2-x^2}}=\\sin^{-1}\\frac x a"),
      F("parts", "\\int u\\,dv=uv-\\int v\\,du"),
    ],
  },
  "math-aoi": {
    theory: [
      T(
        "math-aoi-std",
        "Area under lines, circles, parabolas, ellipses (standard form)",
        "Area between $y=f(x)$, the $x$-axis, $x=a$ to $x=b$ is $\\int_a^b|f|$ (split at zeros). Area between two curves $\\int|f-g|$. Official restriction: standard forms — a line, $x^2+y^2=r^2$ (or a quarter/half), $y^2=4ax$, $x^2/a^2+y^2/b^2=1$. The ellipse’s full area is $\\pi ab$. A parabola $y^2=4ax$ from $x=0$ to $x=a$ is a standard $\\tfrac83 a^2$ (wait: $y=\\pm2\\sqrt{ax}$, area $2\\int_0^a 2\\sqrt{ax}\\,dx=\\tfrac83 a^{3/2}\\sqrt{a}=\\tfrac83 a^2$). Sketch first, then integrate; do not integrate through a crossing without splitting.",
        { diagram: "area-curve" },
      ),
    ],
    formulas: [F("Ellipse area", "\\pi a b"), F("Parabola y²=4ax to x=a", "\\tfrac83 a^2")],
  },
  "math-de": {
    theory: [
      T(
        "math-de-methods",
        "Order, degree, separation, homogeneous, linear IF",
        "Order = highest derivative; degree = power of that derivative once the equation is polynomial in derivatives. General solution has as many arbitrary constants as the order; a particular solution pins them. Separation: $dy/dx=f(x)g(y)\\Rightarrow\\int dy/g=\\int f\\,dx$. Homogeneous of degree 0: $dy/dx=f(y/x)$, put $y=vx$. Linear $\\frac{dy}{dx}+P(x)y=Q(x)$: integrating factor $e^{\\int P\\,dx}$, then $\\frac{d}{dx}\\bigl(y\\,\\mathrm{IF}\\bigr)=Q\\,\\mathrm{IF}$. The syllabus also lists $\\frac{dx}{dy}+P(y)x=Q(y)$ — same method with $x$ as the dependent variable (use when the equation is linear in $x$, not in $y$).",
      ),
    ],
    formulas: [
      F("Integrating factor", "\\mathrm{IF}=e^{\\int P\\,dx}"),
      F("Linear solution", "y\\,\\mathrm{IF}=\\int Q\\,\\mathrm{IF}\\,dx+C"),
    ],
    worked: [
      W(
        "math-de-w3",
        "main",
        "Solve $dy/dx + y = e^{-x}$.",
        ["$P=1$, IF $=e^{\\int dx}=e^x$.", "$\\frac{d}{dx}(y e^x)=1$.", "$y e^x=x+C$, $y=(x+C)e^{-x}$."],
        "$y=(x+C)e^{-x}$",
        "Always multiply through by the IF before integrating.",
      ),
    ],
  },
  "math-vec": {
    theory: [
      T(
        "math-vec-products",
        "DC/DR, section formula, dot and cross applications",
        "Direction cosines $l,m,n$ of a vector satisfy $l^2+m^2+n^2=1$; direction ratios are any scalar multiple. Position vector of a point dividing $A,B$ in $m:n$ is $(n\\vec a+m\\vec b)/(m+n)$. Dot: $\\vec a\\cdot\\vec b=|a||b|\\cos\\theta=a_1b_1+a_2b_2+a_3b_3$ — used for angle, projection, perpendicularity ($=0$), work. Cross: $\\vec a\\times\\vec b$ is perpendicular to both, $|a||b|\\sin\\theta$ = parallelogram area, direction by right-hand rule. Component form is the $3\\times3$ determinant with $\\hat\\imath,\\hat\\jmath,\\hat k$. Applications: area of triangle $\\tfrac12|\\vec{AB}\\times\\vec{AC}|$, moment, velocity in circular motion.",
        { diagram: "vector-3d" },
      ),
    ],
    formulas: [
      F("Direction cosines", "l^2+m^2+n^2=1"),
      F("Section (internal)", "\\vec r=\\frac{n\\vec a+m\\vec b}{m+n}"),
      F("Area of parallelogram", "|\\vec a\\times\\vec b|"),
    ],
  },
  "math-3d-12": {
    theory: [
      T(
        "math-3d12-skew",
        "Line in space, skew lines, shortest distance, angle",
        "A line through $\\vec a$ along $\\vec b$: $\\vec r=\\vec a+\\lambda\\vec b$, or $(x-x_0)/l=(y-y_0)/m=(z-z_0)/n$. Two lines in 3D are parallel, intersecting, or skew (neither parallel nor intersecting, not coplanar). Shortest distance between $\\vec r=\\vec a_1+\\lambda\\vec b_1$ and $\\vec r=\\vec a_2+\\mu\\vec b_2$ is $|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|/|\\vec b_1\\times\\vec b_2|$. Angle: $\\cos\\theta=|\\vec b_1\\cdot\\vec b_2|/(|b_1||b_2|)$. Planes are Main-deleted but Advanced still asks the SD of two skew lines, which is the plane story in disguise.",
      ),
    ],
    formulas: [
      F("SD of skew lines", "d=\\frac{|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|}{|\\vec b_1\\times\\vec b_2|}"),
    ],
  },
  "math-lpp": {
    theory: [
      T(
        "math-lpp-corner",
        "Constraints, feasible region, corner-point theorem",
        "A linear objective $Z=ax+by$ on a polygonal feasible region (intersection of half-planes, up to three non-trivial constraints in the syllabus) attains its max/min at a corner. Draw each line, shade the allowed side, mark vertices, evaluate $Z$ at each feasible vertex (and along an unbounded edge if the region is unbounded — then a max may not exist). Infeasible: empty intersection. This is a 1-mark Main item most years: identify the feasible polygon or read $Z$ at a labelled corner.",
      ),
    ],
  },
  "math-prob-12": {
    theory: [
      T(
        "math-prob12-rv",
        "Conditional, Bayes, random variable and mean",
        "Conditional $P(A|B)=P(A\\cap B)/P(B)$. Multiplication: $P(A\\cap B)=P(A)P(B|A)$. Independent: $P(A\\cap B)=P(A)P(B)$, equivalently $P(A|B)=P(A)$. Total probability: $P(A)=\\sum P(E_i)P(A|E_i)$ on a partition. Bayes: $P(E_i|A)=P(E_i)P(A|E_i)/P(A)$ — reverse the tree. A random variable $X$ assigns a number to each outcome. Distribution: $P(X=x_i)=p_i$ with $\\sum p_i=1$. Mean $E[X]=\\sum x_i p_i$. (Variance is the Advanced extra: $E[X^2]-(E[X])^2$. Binomial $B(n,p)$ is the Main extra: $P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}$, mean $np$.)",
        { diagram: "venn" },
      ),
    ],
    formulas: [
      F("Bayes", "P(E_i|A)=\\frac{P(E_i)P(A|E_i)}{\\sum P(E_j)P(A|E_j)}"),
      F("Mean of RV", "E[X]=\\sum x_i p_i"),
      F("Binomial mean", "E[X]=np"),
    ],
  },
};
