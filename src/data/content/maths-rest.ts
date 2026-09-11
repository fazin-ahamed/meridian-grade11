import type { ChapterContent } from "../types";
import { F, pack, Q, T, W } from "./pack";

export const MATHS_REST: Record<string, ChapterContent> = {
  "math-straight": pack(
    "math-straight",
    [
      T("t0", "If you just started Class 11", "A straight line is the shortest distance between two points, and in the coordinate plane it is completely fixed by a point and a slope. Every formula in this chapter is that one fact, rewritten. Slope is $\\tan\\theta$ with the $x$-axis; parallel lines share $m$; perpendicular lines have $m_1 m_2=-1$."),
      T("t1", "All the forms, one object", "Slope-intercept $y=mx+c$. Point-slope $y-y_1=m(x-x_1)$. Two-point $y-y_1=\\frac{y_2-y_1}{x_2-x_1}(x-x_1)$. Intercept $x/a+y/b=1$. Normal $x\\cos\\omega+y\\sin\\omega=p$. General $ax+by+c=0$ with slope $-a/b$."),
      T("t2", "Distance, angle, family", "Distance from $(x_0,y_0)$ to $ax+by+c=0$ is $|ax_0+by_0+c|/\\sqrt{a^2+b^2}$. Angle $\\tan\\theta=|(m_1-m_2)/(1+m_1 m_2)|$. Family through the intersection of $L_1=0,L_2=0$: $L_1+\\lambda L_2=0$. Pair of lines $ax^2+2hxy+by^2+2gx+2fy+c=0$ when the determinant condition holds.", { diagram: "vector-3d" }),
      T("t3", "Locus habits", "A point $P$ that stays equidistant from two fixed points lives on the perpendicular bisector. Equidistant from two lines: angle bisectors. Distance to a point equals distance to a line: parabola, which is the next chapter — do not solve it with a linear equation."),
    ],
    [
      F("Slope", "m=\\tan\\theta=\\frac{y_2-y_1}{x_2-x_1}"),
      F("Perpendicular", "m_1 m_2=-1"),
      F("Distance point–line", "d=\\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}"),
      F("Angle", "\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1 m_2}\\right|"),
      F("Normal form", "x\\cos\\omega+y\\sin\\omega=p"),
    ],
    [
      "Using $m_1 m_2=+1$ for perpendicular (that is for $45^\\circ$ only in a special frame).",
      "Dropping the absolute value in the distance formula and then ‘fixing’ the sign by hope.",
      "Writing $y=mx+c$ for a vertical line.",
    ],
    [
      "If a line is $ax+by+c=0$, the vector $(a,b)$ is normal, $(-b,a)$ is direction.",
      "Family $L_1+\\lambda L_2$ is the fastest ‘through the intersection’ move.",
    ],
    [
      W("w1", "main", "Distance of $(1,2)$ from $3x+4y-5=0$?", ["$|3+8-5|/5=6/5$."], "$6/5$", "Denominator is $\\sqrt{3^2+4^2}=5$, a 3-4-5 gift."),
      W("w2", "boards", "Slope of the line through $(1,2)$ and $(3,8)$?", ["$m=(8-2)/(3-1)=3$."], "$3$", "Rise over run."),
    ],
    [
      Q("q1", "main", "Lines $y=2x+1$ and $y=-\\frac12 x+3$ are", ["parallel", "perpendicular", "coincident", "neither"], 1, "$2\\times(-1/2)=-1$."),
      Q("q2", "boards", "Intercept form of a line with intercepts 2 and 3 is", ["$x/2+y/3=1$", "$2x+3y=1$", "$x/3+y/2=1$", "$xy=6$"], 0, "Definition."),
      Q("q3", "advanced", "The combined equation of the pair of axes is", ["$x^2+y^2=0$", "$xy=0$", "$x^2-y^2=0$", "$x+y=0$"], 1, "$x=0$ or $y=0$."),
      Q("q4", "main", "Slope of $ax+by+c=0$ is", ["$a/b$", "$-a/b$", "$b/a$", "$-b/a$"], 1, "$y=-(a/b)x-c/b$."),
    ],
    [{ title: "Image of a point", body: "The reflection of $(x_1,y_1)$ in $ax+by+c=0$ is a two-line formula. Main asks it once every two years. Derive it as ‘foot of perpendicular, then mid-point’ rather than memorising." }],
    ["All five forms of a line.", "Distance formula with modulus.", "Parallel / perpendicular tests.", "Family $L_1+\\lambda L_2$."],
    "A 1-question Main chapter unless it is bundled with a conic. Distance from a point and a perpendicular-pair are the two templates.",
  ),

  "math-conic": pack(
    "math-conic",
    [
      T("t1", "Parabola $y^2=4ax$", "Focus $(a,0)$, directrix $x=-a$, parametric $(at^2,2at)$. Tangent at $t$: $ty=x+at^2$. Tangent of slope $m$: $y=mx+a/m$. Two tangents from a point are perpendicular if the point lies on the directrix. Focal chord joining $t_1,t_2$ has $t_1 t_2=-1$.", { diagram: "parabola" }),
      T("t2", "Ellipse $x^2/a^2+y^2/b^2=1$, $a>b$", "Foci $(\\pm ae,0)$, $e=\\sqrt{1-b^2/a^2}$, $b^2=a^2(1-e^2)$. Parametric $(a\\cos\\theta,b\\sin\\theta)$. Sum of focal distances $=2a$. Tangent $xx_1/a^2+yy_1/b^2=1$. Auxiliary circle $x^2+y^2=a^2$.", { diagram: "ellipse" }),
      T("t3", "Hyperbola $x^2/a^2-y^2/b^2=1$", "Foci $(\\pm ae,0)$, $e=\\sqrt{1+b^2/a^2}$, $b^2=a^2(e^2-1)$. Difference of focal distances $=2a$. Asymptotes $y=\\pm(b/a)x$. Rectangular: $a=b$, $e=\\sqrt{2}$, asymptotes perpendicular. Parametric $(a\\sec\\theta,b\\tan\\theta)$ or $(a\\cosh t,b\\sinh t)$.", { diagram: "hyperbola" }),
      T("t4", "Circle as a warm-up", "Not always a named JEE chapter, but $x^2+y^2+2gx+2fy+c=0$ has centre $(-g,-f)$, radius $\\sqrt{g^2+f^2-c}$. Tangent $xx_1+yy_1=r^2$. Chord of contact, director circle $x^2+y^2=2r^2$ (pair of perpendicular tangents)."),
    ],
    [
      F("Parabola focus", "y^2=4ax:\\ (a,0),\\ x=-a"),
      F("Ellipse e", "e=\\sqrt{1-b^2/a^2},\\quad PF_1+PF_2=2a"),
      F("Hyperbola e", "e=\\sqrt{1+b^2/a^2},\\quad |PF_1-PF_2|=2a"),
      F("Parametric parabola", "(at^2,2at)"),
      F("Director circle (ellipse)", "x^2+y^2=a^2+b^2"),
    ],
    [
      "Using $e=\\sqrt{1+b^2/a^2}$ on an ellipse.",
      "Parametric of hyperbola as $(\\cos,\\sin)$.",
      "Forgetting $t_1 t_2=-1$ for a focal chord of a parabola.",
      "Writing $b^2=a^2(e^2-1)$ for an ellipse.",
    ],
    [
      "Identify the conic by the eccentricity story (sum vs difference vs equal-distance) before coordinates.",
      "Parametric beats Cartesian for chords and tangents.",
      "A standard parabola opening left is $y^2=-4ax$; swap $x\\leftrightarrow y$ for up/down.",
    ],
    [
      W("w1", "main", "Focus of $y^2=12x$ is", ["$4a=12$, $a=3$, focus $(3,0)$."], "$(3,0)$", "Read $4a$ first, always."),
      W("w2", "advanced", "Eccentricity of $x^2/25+y^2/9=1$", ["$a^2=25,b^2=9$.", "$e=\\sqrt{1-9/25}=4/5$."], "$4/5$", "$b^2=a^2(1-e^2)$ rearranged."),
    ],
    [
      Q("q1", "main", "Directrix of $y^2=4ax$ is", ["$x=a$", "$x=-a$", "$y=a$", "$x=0$"], 1, "Definition."),
      Q("q2", "boards", "For an ellipse, $e$ is", ["$=1$", "$>1$", "$<1$", "0 always"], 2, "Circle is $e=0$, parabola $1$, hyperbola $>1$."),
      Q("q3", "main", "Asymptotes of $x^2/a^2-y^2/b^2=1$ are", ["$y=\\pm(b/a)x$", "$y=\\pm(a/b)x$", "$x=\\pm a$", "none"], 0, "Set the quadratic part to 0."),
      Q("q4", "advanced", "A focal chord of $y^2=4ax$ joining $t_1,t_2$ satisfies", ["$t_1+t_2=0$", "$t_1 t_2=-1$", "$t_1 t_2=1$", "$t_1=t_2$"], 1, "The chord through $(a,0)$."),
    ],
    [{ title: "Pair of tangents", body: "From $(x_1,y_1)$ to a conic $S=0$, the pair is $SS_1=T^2$. This one identity runs circle, parabola, ellipse, hyperbola. Advanced loves it; Main rarely names it." }],
    ["$4a$, focus, directrix of a parabola.", "Ellipse vs hyperbola $e$ formulae.", "Parametric points.", "Asymptotes of a hyperbola."],
    "A high-weight Main chapter if you count all three conics. Parabola parametric + ellipse $e$ + a rectangular hyperbola $xy=c^2$ cover most papers.",
  ),

  "math-3d-11": pack(
    "math-3d-11",
    [
      T("t1", "Coordinates in space", "A point $(x,y,z)$. Distance $\\sqrt{(x_1-x_2)^2+\\cdots}$. Section formula identical to 2-D with three coordinates. Direction cosines $l,m,n$ with $l^2+m^2+n^2=1$. Direction ratios are proportional to DCs.", { diagram: "vector-3d" }),
      T("t2", "The plane as a preview", "Class 11 3-D stops at coordinates, DCs, and the octants. The equation of a line and a plane is Class 12. Do not skip DCs — they are the language of the next year."),
    ],
    [
      F("Distance", "d=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}"),
      F("DCs", "l^2+m^2+n^2=1"),
      F("Section", "\\vec r=\\frac{m\\vec r_2+n\\vec r_1}{m+n}"),
    ],
    ["Treating direction ratios as if they already squared-sum to 1.", "Sign of octants."],
    ["Convert DR to DC by dividing by $\\sqrt{a^2+b^2+c^2}$."],
    [W("w1", "boards", "DCs of a line with DRs $2,3,6$", ["$\\sqrt{4+9+36}=7$.", "$2/7,3/7,6/7$."], "$\\frac{2}{7},\\frac{3}{7},\\frac{6}{7}$", "Always normalise.")],
    [
      Q("q1", "boards", "The $xy$-plane has equation", ["$x=0$", "$y=0$", "$z=0$", "$x=y$"], 2, "Every point has $z=0$."),
      Q("q2", "main", "$l^2+m^2+n^2$ for DCs is", ["0", "1", "3", "undefined"], 1, "Cosines of angles with the axes."),
    ],
    [{ title: "Bridge", body: "Revisit this the week you start Class 12 vectors. The same $(l,m,n)$ will be $\\hat d$." }],
    ["Distance in 3-D.", "DR vs DC.", "Octants."],
    "Boards chapter, short Main cameo as a DC question hiding inside a vector item.",
  ),

  "math-limits": pack(
    "math-limits",
    [
      T("t1", "What a limit is", "$\\lim_{x\\to a}f(x)=L$ means $f$ can be made arbitrarily close to $L$ by taking $x$ close to $a$, not necessarily equal. Left and right limits must agree. A value $f(a)$ is irrelevant to the limit. Standard: $\\lim_{\\theta\\to 0}\\sin\\theta/\\theta=1$ with $\\theta$ in radians."),
      T("t2", "Algebra of limits and standard forms", "Sum, product, quotient (denominator limit $\\neq 0$). $1^\\infty$, $0/0$, $\\infty/\\infty$ are the three JEE factories. Tools: factor, rationalise, expand $\\sin,\\tan,\\ln,e$ to first order, L’Hôpital (use sparingly — Advanced sometimes forbids the spirit), squeeze."),
      T("t3", "The list you actually need", "$\\lim (\\sin x)/x=1$, $(\\tan x)/x=1$, $(1-\\cos x)/x^2=1/2$, $(e^x-1)/x=1$, $(\\ln(1+x))/x=1$, $((1+x)^n-1)/x=n$, $(a^x-1)/x=\\ln a$, $(1+x)^{1/x}\\to e$. At infinity: divide by the highest power."),
    ],
    [
      F("sin", "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1"),
      F("1-cos", "\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2}=\\frac12"),
      F("e", "\\lim_{x\\to 0}\\frac{e^x-1}{x}=1"),
      F("ln", "\\lim_{x\\to 0}\\frac{\\ln(1+x)}{x}=1"),
      F("e form", "\\lim_{n\\to\\infty}\\left(1+\\frac{x}{n}\\right)^n=e^x"),
    ],
    [
      "Degrees in $\\sin x/x$.",
      "Plugging $x=0$ into $0/0$ and writing 0.",
      "L’Hôpital on a product that is not an indeterminate form.",
    ],
    [
      "Rewrite every $0/0$ until a standard form appears.",
      "If $x\\to\\infty$, set $t=1/x$ so $t\\to 0$ and use the Class 11 list.",
    ],
    [
      W("w1", "main", "$\\lim_{x\\to 0}(1-\\cos 2x)/x^2$", ["$1-\\cos 2x=2\\sin^2 x$.", "$2(\\sin x/x)^2 \\to 2$."], "$2$", "Or standard $(1-\\cos\\theta)/\\theta^2=1/2$ with $\\theta=2x$: $(1/2)\\cdot 4=2$."),
    ],
    [
      Q("q1", "main", "$\\lim_{x\\to 0}\\sin 5x / \\sin 3x$ is", ["$5/3$", "$3/5$", "0", "1"], 0, "Write as $5/3\\cdot(\\sin 5x/(5x))\\cdot(3x/\\sin 3x)$."),
      Q("q2", "boards", "$\\lim_{x\\to 0}\\frac{\\tan x}{x}$ is", ["0", "1", "$\\infty$", "$\\pi/180$"], 1, "Radians."),
      Q("q3", "advanced", "$\\lim_{x\\to 0^+} x\\ln x$ is", ["$\\infty$", "0", "1", "does not exist"], 1, "Write $\\ln x/(1/x)$, L’Hôpital: $0$."),
    ],
    [{ title: "Continuity runway", body: "A function is continuous at $a$ iff the limit exists and equals $f(a)$. That sentence is the entire next chapter." }],
    ["Standard six limits in radians.", "Left vs right.", "$\\infty$ by dividing powers.", "No plugging into $0/0$."],
    "Main: a standard form dressed in a coefficient. Advanced: a $0\\cdot\\infty$ or a definition of $e$.",
  ),

  "math-invtrig": pack(
    "math-invtrig",
    [
      T("t1", "Principal values", "$\\sin^{-1}:[-1,1]\\to[-\\pi/2,\\pi/2]$, $\\cos^{-1}:[-1,1]\\to[0,\\pi]$, $\\tan^{-1}:\\mathbb{R}\\to(-\\pi/2,\\pi/2)$. The range is the whole game: $\\cos^{-1}(-1)=\\pi$, not $0$.", { diagram: "unit-circle" }),
      T("t2", "Identities", "$\\sin^{-1}x+\\cos^{-1}x=\\pi/2$ on $[-1,1]$. $\\tan^{-1}x+\\tan^{-1}y=\\tan^{-1}\\frac{x+y}{1-xy}$ when $xy<1$. Watch the $xy>1$ case: an extra $\\pm\\pi$. $2\\tan^{-1}x=\\sin^{-1}\\frac{2x}{1+x^2}$ with domain restrictions."),
      T("t3", "How Main asks it", "A nested $\\sin(\\cos^{-1}x)$, a $\\tan^{-1}a+\\tan^{-1}b$ that crosses $1$, or a principal-value inequality. Convert to a right triangle: $\\sin(\\cos^{-1}x)=\\sqrt{1-x^2}$ for $x\\in[-1,1]$ with the correct sign from the range."),
    ],
    [
      F("Complement", "\\sin^{-1}x+\\cos^{-1}x=\\pi/2"),
      F("tan sum", "\\tan^{-1}x+\\tan^{-1}y=\\tan^{-1}\\frac{x+y}{1-xy}\\ (xy<1)"),
      F("triangle", "\\sin(\\cos^{-1}x)=\\sqrt{1-x^2}"),
    ],
    [
      "Writing $\\cos^{-1}(-x)=\\cos^{-1}x$. Correct: $\\pi-\\cos^{-1}x$.",
      "Applying the tan-sum formula when $xy>1$ without the $\\pi$ correction.",
      "Range of $\\mathrm{cosec}^{-1}$ mixed with $\\sin^{-1}$.",
    ],
    ["Triangle first, identity second.", "Check $xy$ against 1 before summing arctans."],
    [W("w1", "main", "$\\tan^{-1}1+\\tan^{-1}2+\\tan^{-1}3$", ["$\\tan^{-1}1=\\pi/4$.", "$\\tan^{-1}2+\\tan^{-1}3=\\pi+\\tan^{-1}\\frac{5}{1-6}=\\pi-\\pi/4$ wait: $xy=6>1$, both positive, so $\\pi+\\tan^{-1}(5/-5)=\\pi-\\pi/4=3\\pi/4$.", "Total $\\pi$."], "$\\pi$", "The $xy>1$ correction is the whole question.")],
    [
      Q("q1", "main", "Principal value of $\\cos^{-1}(-1)$ is", ["$0$", "$\\pi$", "$-\\pi$", "$\\pi/2$"], 1, "Range of $\\cos^{-1}$ is $[0,\\pi]$."),
      Q("q2", "boards", "$\\sin^{-1}x+\\cos^{-1}x=$", ["0", "$\\pi$", "$\\pi/2$", "$2\\pi$"], 2, "On the common domain."),
      Q("q3", "advanced", "Domain of $\\sin^{-1}(2x)$ is", ["$[-1,1]$", "$[-1/2,1/2]$", "$\\mathbb{R}$", "$[0,1]$"], 1, "$|2x|\\le 1$."),
    ],
    [{ title: "Formula sheet", body: "Keep one page: ranges of all six inverse functions, and the three tan-sum cases. That page is 80% of the chapter." }],
    ["Ranges of sin/cos/tan inverse.", "Tan-sum with $xy>1$.", "Triangle evaluation of compositions."],
    "A short Main chapter that punishes a wrong range. One carefully written formula sheet beats ten lectures.",
  ),

  "math-cont": pack(
    "math-cont",
    [
      T("t1", "Continuity", "$f$ continuous at $a$ iff $\\lim_{x\\to a}f(x)=f(a)$. Continuous on $[a,b]$: at every interior point, and one-sided at the ends. Sum/product/quotient/composition of continuous functions are continuous where defined. Intermediate value theorem: a continuous $f$ on $[a,b]$ hits every value between $f(a)$ and $f(b)$."),
      T("t2", "Differentiability", "$f'(a)=\\lim_{h\\to 0}(f(a+h)-f(a))/h$. Left and right derivatives must agree. Differentiable $\\Rightarrow$ continuous; the converse is false ($|x|$ at 0). A corner, a vertical tangent, or a jump kills $f'$."),
      T("t3", "The JEE piecewise", "Define $f$ differently on $x<0$, $x=0$, $x>0$. Match limits for continuity; match derivatives for differentiability. A parameter $k$ is often chosen so that both happen."),
    ],
    [
      F("Derivative", "f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}"),
      F("Chain", "(f\\circ g)'=(f'\\circ g)\\,g'"),
      F("Product", "(uv)'=u'v+uv'"),
    ],
    [
      "Checking only $f(0)$ and ignoring left/right limits.",
      "Claiming $|x|$ is differentiable at 0.",
      "IVT used as if a discontinuous function still hits the intermediate value.",
    ],
    ["Always write LDL, RHL, $f(a)$ as a three-cell table.", "Differentiability is a stronger matching of slopes, not of values."],
    [W("w1", "main", "$f(x)=|x|$ at 0: continuous? differentiable?", ["Limits both 0, $f(0)=0$: continuous.", "Left derivative $-1$, right $+1$: not differentiable."], "Continuous, not differentiable", "The standard counter-example.")],
    [
      Q("q1", "main", "If $f$ is differentiable at $a$, then $f$ is", ["discontinuous", "continuous at $a$", "constant", "polynomial"], 1, "Theorem."),
      Q("q2", "boards", "The derivative of $\\sin x$ is", ["$\\cos x$", "$-\\cos x$", "$\\sec x$", "$-\\sin x$"], 0, "Standard."),
      Q("q3", "advanced", "Rolle’s theorem requires $f(a)=f(b)$ and $f$", ["only continuous", "continuous on $[a,b]$, differentiable on $(a,b)$", "bounded", "polynomial"], 1, "Then $f'(c)=0$ for some $c$."),
    ],
    [{ title: "Mean value", body: "Lagrange: $f'(c)=(f(b)-f(a))/(b-a)$. Rolle is the $f(a)=f(b)$ case. Advanced uses MVT to prove inequalities." }],
    ["Three-cell continuity table.", "Differentiable $\\Rightarrow$ continuous.", "Piecewise parameter $k$.", "Rolle / Lagrange statements."],
    "Main: a piecewise $k$ so that $f$ is differentiable. Advanced: MVT inequality.",
  ),

  "math-aod": pack(
    "math-aod",
    [
      T("t1", "Tangents, increasing, extrema", "Slope of tangent $=f'(x)$. Increasing on an interval if $f'\\ge 0$. Critical points $f'=0$ or undefined. First-derivative test / second-derivative test $f''>0$ min, $f''<0$ max. Endpoints of a closed interval must be checked separately."),
      T("t2", "Maxima of the JEE list", "AM–GM for positive reals. For $x+y=s$ constant, $xy$ max at $x=y$. Rectangle of max area in a triangle, cylinder in a sphere, cone in a sphere — all ‘one-variable after a substitution’."),
      T("t3", "Approximations and errors", "$\\Delta y\\approx f'(x)\\Delta x$. Log differentiation for $y=x^x$, $y=u^v$. Parametric $dy/dx=(dy/dt)/(dx/dt)$. Implicit $F(x,y)=0 \\Rightarrow dy/dx=-F_x/F_y$."),
    ],
    [
      F("Tangent", "Y-y_0=f'(x_0)(X-x_0)"),
      F("Second test", "f'(c)=0,\\ f''(c)>0\\Rightarrow\\min"),
      F("Error", "\\Delta y\\approx f'(x)\\Delta x"),
      F("Implicit", "\\frac{dy}{dx}=-\\frac{F_x}{F_y}"),
    ],
    [
      "Declaring a critical point a max without a test or an endpoint check.",
      "AM–GM on numbers that can be negative.",
      "Forgetting the chain rule in $x^x=e^{x\\ln x}$.",
    ],
    ["Draw $f'$ sign chart. A table beats a memory of the second-derivative test.", "Word problems: one equation of constraint, substitute, then $d/dx=0$."],
    [W("w1", "main", "Max of $x(1-x)$ on $[0,1]$?", ["$f'=1-2x=0\\Rightarrow x=1/2$.", "$f=1/4$. Ends give 0."], "$1/4$", "The parabola $-x^2+x$.")],
    [
      Q("q1", "main", "If $f'(x)>0$ on $(a,b)$, then $f$ is", ["decreasing", "increasing", "constant", "concave"], 1, "Definition / MVT."),
      Q("q2", "boards", "The derivative of $e^{kx}$ is", ["$e^{kx}$", "$k e^{kx}$", "$k^2 e^{kx}$", "0"], 1, "Chain rule."),
      Q("q3", "advanced", "A point of inflection has", ["$f'=0$ always", "$f''$ changing sign", "$f=0$", "a corner"], 1, "$f''=0$ is neither necessary nor sufficient alone."),
    ],
    [{ title: "Rank", body: "Maxima of $\\sin x/x$, of a triangle inscribed in a circle, of $r^2 h$ with $2r+h$ fixed — keep a private list of ten solved word problems." }],
    ["Sign chart for $f'$.", "Closed-interval endpoint check.", "Log-diff for $x^x$.", "One-constraint substitution."],
    "Main: a max/min numerical and a tangent. Advanced: inequalities via MVT or a parameter-heavy extremum.",
  ),

  "math-int": pack(
    "math-int",
    [
      T("t1", "Indefinite as anti-derivative", "$\\int f=F+C$ means $F'=f$. Linearity. Standard: $x^n$, trig, $e^{ax}$, $1/x$, $1/(a^2+x^2)$, $1/\\sqrt{a^2-x^2}$. Substitution is the chain rule backwards. Parts: $\\int u\\,dv=uv-\\int v\\,du$ (LIATE). Partial fractions for rational functions."),
      T("t2", "Definite integrals", "$\\int_a^b f=F(b)-F(a)$ if $F'=f$ on $[a,b]$. Even $f$ on $[-a,a]$: $2\\int_0^a$. Odd: $0$. $\\int_0^a f(x)\\,dx=\\int_0^a f(a-x)\\,dx$. King: $\\int_a^b f=\\int_a^b f(a+b-x)$. Leibnitz rule for variable limits."),
      T("t3", "The properties that win Main", "King property on $0$ to $\\pi/2$ with $\\sin/\\cos$ swaps. Wallis-type $\\int_0^{\\pi/2}\\sin^n$. A definite integral of an odd function around 0 is 0 even when you cannot find the anti-derivative."),
    ],
    [
      F("FTC", "\\int_a^b f=F(b)-F(a)"),
      F("King", "\\int_a^b f(x)\\,dx=\\int_a^b f(a+b-x)\\,dx"),
      F("Parts", "\\int u\\,dv=uv-\\int v\\,du"),
      F("Even/odd", "\\int_{-a}^a \\text{odd}=0,\\ \\text{even}=2\\int_0^a"),
    ],
    [
      "Dropping $+C$ in an indefinite that is later differentiated — harmless — but dropping it in a differential-equation integral is fatal.",
      "Using King without the limits matching $a,b$.",
      "Parts with $u=\\sin$ when $u=x$ was the polynomial that dies.",
    ],
    ["If you cannot anti-differentiate, look for even/odd or King.", "LIATE is a default, not a law — pick the $u$ that gets simpler."],
    [W("w1", "main", "$\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx$", ["King: $x\\to \\pi/2-x$ swaps sin and cos.", "Add to original: $2I=\\int_0^{\\pi/2}1=\\pi/2$, so $I=\\pi/4$."], "$\\pi/4$", "The standard King gift.")],
    [
      Q("q1", "main", "$\\int_{-1}^1 x^3\\,dx$ is", ["$1/2$", "0", "2", "1"], 1, "Odd integrand, symmetric limits."),
      Q("q2", "boards", "$\\int x^n\\,dx$ ($n\\neq -1$) is", ["$n x^{n-1}$", "$x^{n+1}/(n+1)+C$", "$\\ln|x|$", "0"], 1, "Power rule."),
      Q("q3", "advanced", "Leibnitz: $d/dx\\int_0^{x^2} f(t)\\,dt=$", ["$f(x^2)$", "$2x f(x^2)$", "$f'(x^2)$", "0"], 1, "Chain rule on the upper limit."),
    ],
    [{ title: "Reduction", body: "A reduction formula for $\\int\\sin^n$ is Advanced / Boards extra. Main prefers King and a substitution." }],
    ["Standard anti-derivatives.", "King on $0$ to $\\pi/2$.", "Even/odd.", "Parts with a polynomial that dies."],
    "A very-high weight Main chapter. King + even/odd + one substitution is the scoring core. Advanced adds a reduction or a parameter under the integral sign.",
  ),

  "math-aoi": pack(
    "math-aoi",
    [
      T("t1", "Area as a definite integral", "Area between $y=f$ and $y=g$ from $x=a$ to $b$ is $\\int_a^b |f-g|\\,dx$. Split wherever they cross. For $x=g(y)$, integrate $dy$.", { diagram: "area-curve" }),
      T("t2", "Standard pictures", "Area of a circle $x^2+y^2=r^2$ in the first quadrant $\\int_0^r\\sqrt{r^2-x^2}=\\pi r^2/4$. Ellipse $\\pi ab$. Parabola $y^2=4ax$ and its latus rectum. Area under one arch of $\\sin$."),
      T("t3", "What ‘bounded by’ means", "Sketch first. The bounded region is the finite pocket, not the infinite wings. If the question says ‘in the first quadrant’, believe it and put limits $0$ to the intercept."),
    ],
    [
      F("Between curves", "A=\\int_a^b |f-g|\\,dx"),
      F("Circle quadrant", "\\int_0^r\\sqrt{r^2-x^2}\\,dx=\\pi r^2/4"),
    ],
    ["Integrating $f-g$ without a modulus and getting a negative area, then taking abs at the end of a crossing pair — split instead.", "Using $dx$ when the functions are $x=$ of $y$ and a $dy$ integral is shorter."],
    ["Sketch, mark intersections, split, integrate.", "A circle or ellipse: use the known area formula if the region is a standard fraction."],
    [W("w1", "main", "Area in first quadrant under $y=x(2-x)$", ["Roots 0, 2.", "$\\int_0^2(2x-x^2)=[x^2-x^3/3]_0^2=4-8/3=4/3$."], "$4/3$", "A parabola cap.")],
    [
      Q("q1", "main", "Area between $y=x$ and $y=x^2$ is", ["$1/2$", "$1/6$", "$1/3$", "$1$"], 1, "Intersections 0,1; $\\int(x-x^2)=[x^2/2-x^3/3]_0^1=1/6$."),
      Q("q2", "boards", "Area of $x^2+y^2=r^2$ is", ["$2\\pi r$", "$\\pi r^2$", "$\\pi r$", "$4r^2$"], 1, "Standard."),
    ],
    [{ title: "Advanced", body: "Area in polar $A=\\frac12\\int r^2\\,d\\theta$, or a curve given parametrically $A=\\int y\\,dx=\\int y(t) x'(t)\\,dt$." }],
    ["Sketch first.", "Split at crossings.", "Standard circle/ellipse shortcuts."],
    "Main: two curves, one bounded pocket. The algebra is a Class 12 integral; the marks are in the sketch.",
  ),

  "math-de": pack(
    "math-de",
    [
      T("t1", "Order, degree, family", "Order = highest derivative. Degree = power of that derivative after the equation is polynomial in derivatives. A one-parameter family $F(x,y,c)=0$ differentiates to a first-order DE; two parameters to a second-order. Forming a DE = eliminate constants by differentiating."),
      T("t2", "The solvable types", "Variable separable $dy/dx=f(x)g(y)$. Homogeneous: $dy/dx=f(y/x)$, put $y=vx$. Linear first order $dy/dx+P(x)y=Q(x)$, IF $=e^{\\int P\\,dx}$. Exact $M\\,dx+N\\,dy=0$ when $M_y=N_x$ (Advanced extra)."),
      T("t3", "Growth, cooling, orthogonal trajectories", "Newton cooling and population $dy/dt=ky$ give exponentials. Orthogonal trajectory: replace $m$ by $-1/m$ in the slope, i.e. $dy/dx \\to -dx/dy$."),
    ],
    [
      F("Separable", "\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx"),
      F("Linear IF", "\\mu=e^{\\int P\\,dx},\\quad \\frac{d}{dx}(\\mu y)=\\mu Q"),
      F("Homogeneous", "y=vx\\ \\Rightarrow\\ v+x v'=f(v)"),
    ],
    [
      "Degree of $\\sqrt{y'}$ as 1 without isolating and squaring.",
      "Forgetting the IF multiplies $Q$ as well.",
      "Treating $y=vx$ as $x=vy$ in a DE that is homogeneous in the wrong way.",
    ],
    ["Identify the type in ten seconds: separable / homogeneous / linear. That is 90% of Main.", "IF is a function of $x$ alone only when $P$ is a function of $x$ alone."],
    [W("w1", "main", "$dy/dx=y$, $y(0)=2$", ["$dy/y=dx$.", "$\\ln|y|=x+C$.", "$y=2e^x$."], "$y=2e^x$", "The exponential prototype.")],
    [
      Q("q1", "main", "The IF of $y'+y=e^x$ is", ["$e^x$", "$e^{-x}$ wait: $P=1$, IF $=e^{\\int 1 dx}=e^x$", "$x$", "1"], 0, "$P=1$, $\\mu=e^x$. Then $e^x y=\\int e^{2x}$."),
      Q("q2", "boards", "Order of $y''+y=0$ is", ["1", "2", "0", "3"], 1, "Highest derivative $y''$."),
      Q("q3", "advanced", "Orthogonal trajectories of $y=cx$ are", ["$y=c/x$", "$x^2+y^2=k$", "$y=c x^2$", "circles centred on $y$-axis? $x^2+y^2=k$"], 1, "Circles centred at origin. $y=cx$ has slope $y/x$; orthogonal slope $-x/y$."),
    ],
    [{ title: "Q1 note", body: "IF is $e^x$. Multiply: $(e^x y)'=e^{2x}$, $e^x y=\\frac12 e^{2x}+C$, $y=\\frac12 e^x+C e^{-x}$." }],
    ["Order vs degree.", "Separable, homogeneous, linear.", "IF formula.", "One exponential IVP."],
    "Main: linear first order or separable with an initial condition. Advanced: orthogonal trajectories or a homogeneous that needs a substitution $v=y/x$.",
  ),

  "math-vec": pack(
    "math-vec",
    [
      T("t1", "Dot and cross", "$\\vec a\\cdot\\vec b=|a||b|\\cos\\theta=a_i b_i$. $\\vec a\\times\\vec b$ is perpendicular to both, $|a||b|\\sin\\theta$, right-hand, in coordinates the determinant with $\\hat i\\hat j\\hat k$. $\\vec a\\cdot(\\vec a\\times\\vec b)=0$.", { diagram: "vector-3d" }),
      T("t2", "Triple products", "Scalar $[\\vec a,\\vec b,\\vec c]=\\vec a\\cdot(\\vec b\\times\\vec c)$ = volume of parallelepiped, zero iff coplanar. Vector $\\vec a\\times(\\vec b\\times\\vec c)=(\\vec a\\cdot\\vec c)\\vec b-(\\vec a\\cdot\\vec b)\\vec c$ (BAC–CAB)."),
      T("t3", "Geometry", "Projection of $\\vec a$ on $\\vec b$ is $(\\vec a\\cdot\\hat b)\\hat b$. Work $=\\vec F\\cdot\\vec s$. Area of parallelogram $|\\vec a\\times\\vec b|$. Unit vector $\\hat a=\\vec a/|a|$."),
    ],
    [
      F("Dot", "\\vec a\\cdot\\vec b=|a||b|\\cos\\theta"),
      F("Cross mag", "|\\vec a\\times\\vec b|=|a||b|\\sin\\theta"),
      F("BAC–CAB", "\\vec a\\times(\\vec b\\times\\vec c)=(\\vec a\\cdot\\vec c)\\vec b-(\\vec a\\cdot\\vec b)\\vec c"),
      F("Coplanar", "[\\vec a,\\vec b,\\vec c]=0"),
    ],
    [
      "Writing $\\vec a\\times\\vec b=\\vec b\\times\\vec a$.",
      "BAC–CAB with the wrong pairing.",
      "Taking $|\\vec a\\cdot\\vec b|$ as a vector.",
    ],
    ["Cross is a vector; dot is a scalar. Write the type before the algebra.", "A 3×3 determinant is the scalar triple in components."],
    [W("w1", "main", "$\\vec a=\\hat i+\\hat j$, $\\vec b=\\hat i-\\hat j$. $\\vec a\\cdot\\vec b$ and $\\vec a\\times\\vec b$", ["Dot: $1-1=0$.", "Cross: $\\hat k( -1-1)=-2\\hat k$."], "Perpendicular, $-2\\hat k$", "Dot zero ⇔ perpendicular.")],
    [
      Q("q1", "main", "$\\vec a\\cdot(\\vec a\\times\\vec b)$ is", ["$|a|^2|b|$", "0", "$\\vec a\\times\\vec b$", "1"], 1, "A vector dotted with a perpendicular vector."),
      Q("q2", "boards", "If $\\vec a\\cdot\\vec b=0$ then $\\vec a,\\vec b$ are", ["parallel", "perpendicular", "equal", "opposite"], 1, "Provided neither is zero."),
      Q("q3", "advanced", "The vectors $\\vec a,\\vec b,\\vec a\\times\\vec b$ are", ["coplanar", "mutually perpendicular if $a\\perp b$", "always linearly dependent", "always coplanar with $\\vec a+\\vec b$"], 1, "Cross is perpendicular to both; if $a\\perp b$ the three are an orthogonal triple."),
    ],
    [{ title: "Physics bridge", body: "This is the language of torque, angular momentum, and flux. Studying it as only algebra is a wasted week." }],
    ["Dot vs cross types.", "BAC–CAB.", "Coplanarity as a determinant.", "Unit vector and projection."],
    "Main: a cross-product component and a coplanarity check. Advanced: a vector identity plus a line/plane in the next chapter.",
  ),

  "math-3d-12": pack(
    "math-3d-12",
    [
      T("t1", "Line", "Symmetric: $(x-x_0)/l=(y-y_0)/m=(z-z_0)/n=\\lambda$. Vector: $\\vec r=\\vec a+\\lambda\\vec b$. Two lines: intersecting (a common point), parallel ($\\vec b_1\\parallel\\vec b_2$), skew (neither). Shortest distance between skew lines $|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|/|\\vec b_1\\times\\vec b_2|$.", { diagram: "vector-3d" }),
      T("t2", "Plane", "$\\vec r\\cdot\\hat n=p$ (normal form). $ax+by+cz+d=0$ with normal $(a,b,c)$. Plane through three points: $(\\vec r-\\vec a)\\cdot((\\vec b-\\vec a)\\times(\\vec c-\\vec a))=0$. Angle between planes = angle between normals. Angle between a line and a plane: $\\sin\\theta=|\\vec b\\cdot\\hat n|$ (complement of the angle with the normal)."),
      T("t3", "Line and plane together", "A line is parallel to a plane if $\\vec b\\cdot\\vec n=0$. It lies in the plane if additionally a point of the line satisfies the plane. Foot of perpendicular from a point to a plane: walk along the normal. Image of a point: twice the foot minus the point."),
    ],
    [
      F("Line", "\\vec r=\\vec a+\\lambda\\vec b"),
      F("Skew distance", "d=\\frac{|(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)|}{|\\vec b_1\\times\\vec b_2|}"),
      F("Plane", "\\vec r\\cdot\\vec n=d"),
      F("Line–plane angle", "\\sin\\theta=\\frac{|\\vec b\\cdot\\vec n|}{|\\vec b||\\vec n|}"),
    ],
    [
      "Using $\\cos$ instead of $\\sin$ for the line–plane angle.",
      "Skew-distance formula with a dot of $\\vec b_1$ and $\\vec b_2$ only (that tests parallel).",
      "A plane $ax+by+cz=d$ with $n$ not unit in the $p$ form.",
    ],
    ["Always write a line as point + parameter × direction.", "For two lines, first check $\\vec b_1\\times\\vec b_2$; if zero they are parallel, then distance is the formula with a unit normal in the plane of directions."],
    [W("w1", "main", "Plane through $(1,1,1)$ with normal $\\hat i+\\hat j+\\hat k$", ["$1(x-1)+1(y-1)+1(z-1)=0$.", "$x+y+z=3$."], "$x+y+z=3$", "Point-normal form.")],
    [
      Q("q1", "main", "Two lines with parallel direction vectors are", ["always intersecting", "parallel (or coincident)", "always skew", "perpendicular"], 1, "Then check a point."),
      Q("q2", "boards", "A plane with intercepts $a,b,c$ is", ["$x/a+y/b+z/c=1$", "$ax+by+cz=1$", "$x+y+z=abc$", "none"], 0, "Intercept form."),
      Q("q3", "advanced", "Shortest distance between two intersecting lines is", ["the skew formula still", "0", "the parallel-line formula", "undefined"], 1, "They meet; distance 0. The triple product in the numerator vanishes."),
    ],
    [{ title: "Coplanarity of two lines", body: "$(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)=0$. Same numerator as skew distance. If it is 0 they are coplanar (intersecting or parallel)." }],
    ["Parametric line.", "Skew-distance numerator is a scalar triple.", "Line–plane $\\sin\\theta$.", "Intercept form of a plane."],
    "High-weight Main + Advanced. Skew distance and a plane through three points are the two templates. Mix with vectors without changing the algebra.",
  ),

  "math-lpp": pack(
    "math-lpp",
    [
      T("t1", "Feasible region", "A linear programming problem: max/min $z=ax+by$ subject to linear inequalities. Graph each half-plane, take the intersection (feasible region). If it is a closed polygon, the optimum is at a vertex (fundamental theorem of LPP). If unbounded, $z$ may be unbounded."),
      T("t2", "How to actually compute", "Find corner points by solving two lines at a time. Evaluate $z$ at each vertex. Report the point and the value. Integer constraints (if any) mean you cannot just take the vertex — check nearby lattice points (rare in JEE)."),
    ],
    [
      F("Objective", "z=ax+by"),
      F("Optimum", "\\text{at a vertex of the feasible polygon}"),
    ],
    ["Shading the wrong side of an inequality.", "Forgetting a non-negativity $x\\ge 0,y\\ge 0$.", "Declaring an unbounded region has no maximum without checking the open direction of $z$."],
    ["Draw at a scale that makes intercepts integers.", "List vertices in a table: $(x,y)$ | $z$."],
    [W("w1", "boards", "Max $z=3x+4y$ on $x+y\\le 4$, $x,y\\ge 0$", ["Vertices $(0,0),(4,0),(0,4)$.", "$z=0,12,16$. Max $16$ at $(0,4)$."], "$16$ at $(0,4)$", "Evaluate every corner.")],
    [
      Q("q1", "boards", "The optimum of a linear $z$ on a closed polygonal feasible set is attained at", ["the centroid", "a vertex", "the origin always", "infinity"], 1, "Fundamental theorem of LPP."),
      Q("q2", "main", "If the feasible region is unbounded, $z$ ", ["always has a max", "may be unbounded", "is always 0", "cannot have a min"], 1, "Depends on the objective’s direction."),
    ],
    [{ title: "Boards vs Main", body: "This is a boards-heavy chapter. Main rarely asks a full LPP; when it does, it is a four-vertex evaluation." }],
    ["Shade correctly.", "Vertices table.", "Unbounded check."],
    "A gift chapter for boards. One drawing, four substitutions, full marks.",
  ),

  "math-prob-12": pack(
    "math-prob-12",
    [
      T("t1", "Conditional and Bayes", "$P(A|B)=P(A\\cap B)/P(B)$. Multiplication $P(A\\cap B)=P(A)P(B|A)$. Total probability: $P(B)=\\sum P(B|A_i)P(A_i)$ on a partition. Bayes: $P(A_i|B)=P(B|A_i)P(A_i)/P(B)$. Draw the tree; do not chant."),
      T("t2", "Independence vs mutually exclusive", "Independent: $P(A\\cap B)=P(A)P(B)$ (so $P(A|B)=P(A)$). Mutually exclusive: $A\\cap B=\\emptyset$. These are not synonyms. Two exclusive events of positive probability cannot be independent."),
      T("t3", "Random variable and binomial", "A discrete RV: $P(X=x_i)=p_i$, $\\sum p_i=1$. Mean $\\mu=\\sum x_i p_i$, variance $\\sum x_i^2 p_i-\\mu^2$. Binomial: $P(X=r)=\\binom{n}{r}p^r(1-p)^{n-r}$, $\\mu=np$, $\\sigma^2=npq$."),
    ],
    [
      F("Conditional", "P(A|B)=P(A\\cap B)/P(B)"),
      F("Bayes", "P(A_i|B)=\\frac{P(B|A_i)P(A_i)}{\\sum P(B|A_j)P(A_j)}"),
      F("Binomial", "P(X=r)=\\binom{n}{r}p^r q^{n-r},\\ \\mu=np"),
    ],
    [
      "Using $P(A|B)=P(A)/P(B)$.",
      "Independent ⇔ exclusive.",
      "Binomial with $p>1$ after a misread.",
      "Variance as $\\sum x p_i$ (that is the mean).",
    ],
    ["Tree diagram for Bayes, every time.", "Write $np$ and $npq$ only after checking trials are independent and two-outcome."],
    [W("w1", "main", "Two bags: (3R,2B) and (1R,4B). Pick a bag, then a red. $P$ it came from bag 1?", ["$P(R)=\\frac12\\cdot3/5+\\frac12\\cdot1/5=2/5$.", "$P(B_1|R)=(\\frac12\\cdot3/5)/(2/5)=3/4$."], "$3/4$", "Bayes with equal bag priors.")],
    [
      Q("q1", "main", "If $A,B$ independent, $P(A\\cap B)=$", ["$P(A)+P(B)$", "$P(A)P(B)$", "0", "1"], 1, "Definition."),
      Q("q2", "boards", "Mean of a binomial $(n,p)$ is", ["$p$", "$np$", "$npq$", "$\\sqrt{npq}$"], 1, "Standard."),
      Q("q3", "advanced", "Mutually exclusive events of positive probability are", ["independent", "not independent", "the whole space", "complements always"], 1, "$P(A\\cap B)=0\\neq P(A)P(B)$."),
    ],
    [{ title: "Rank", body: "A three-box Bayes plus a binomial $P(X\\le 2)$ is a full Main question. Practice with numbers that do not cancel, so the arithmetic is honest." }],
    ["Tree for Bayes.", "Independent vs exclusive.", "Binomial mean and variance.", "RV mean from a table."],
    "High-weight, high-accuracy. Bayes is the Advanced-looking Main item that is actually a tree. Binomial is a formula with a condition check.",
  ),
};
