import type { PlayItem } from "../types";
import { choiceOf, cycle, mcq, nint, num } from "./build";

export function mathsItem(id: string, i: number): PlayItem | null {
  const table: Record<string, (n: number) => PlayItem> = {
    "math-sets": sets,
    "math-rel-11": rel11,
    "math-trig": trig,
    "math-complex": complex,
    "math-ineq": ineq,
    "math-pnc": pnc,
    "math-binom": binom,
    "math-seq": seq,
    "math-straight": straight,
    "math-conic": conic,
    "math-3d-11": threeD11,
    "math-limits": limits,
    "math-stats": stats,
    "math-prob-11": prob11,
    "math-rel-12": rel12,
    "math-invtrig": invtrig,
    "math-matrices": matrices,
    "math-dets": dets,
    "math-cont": cont,
    "math-aod": aod,
    "math-int": integ,
    "math-aoi": aoi,
    "math-de": de,
    "math-vec": vec,
    "math-3d-12": threeD12,
    "math-lpp": lpp,
    "math-prob-12": prob12,
  };
  return table[id]?.(i) ?? null;
}

function sets(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const n = cycle([3, 4, 5, 6], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `Number of subsets of a set with ${n} elements is`,
      answer: 2 ** n,
      why: `$2^{${n}}=${2 ** n}$. Power set.`,
    });
  }
  if (m === 1) {
    const a = cycle([10, 12, 20], i);
    const b = cycle([8, 15, 18], i);
    const inter = cycle([3, 4, 5], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `$n(A)=${a}$, $n(B)=${b}$, $n(A\\cap B)=${inter}$. $n(A\\cup B)$ is`,
      answer: a + b - inter,
      why: "Inclusion-exclusion.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: "De Morgan: $(A\\cup B)'=$",
      correct: "$A'\\cap B'$",
      wrong: ["$A'\\cup B'$", "$A\\cap B$", "$(A\\cap B)'$ is $A'\\cap B'$"],
      why: "Complement of union is intersection of complements.",
    });
  }
  if (m === 3) {
    const mA = cycle([2, 3, 4], i);
    const nB = cycle([3, 4, 5], i);
    return num({
      chapterId: "math-sets",
      i,
      subject: "maths",
      stem: `$n(A)=${mA}$, $n(B)=${nB}$. $n(A\\times B)$ is`,
      answer: mA * nB,
      why: "Cartesian product counts ordered pairs.",
    });
  }
  return mcq({
    chapterId: "math-sets",
    i,
    subject: "maths",
    stem: "$\\emptyset$ compared with $\\{\\emptyset\\}$",
    correct: "the first is empty; the second is a singleton whose element is empty",
    wrong: ["they are equal", "both have one element", "neither is a set"],
    why: "$n(\\emptyset)=0$, $n(\\{\\emptyset\\})=1$.",
  });
}

function rel11(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const n = cycle([3, 4, 5], i);
    return num({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: `Number of relations on a set with ${n} elements is $2^{n^2}$. That number is`,
      answer: 2 ** (n * n),
      why: `$A\\times A$ has ${n * n} pairs; each in or out.`,
    });
  }
  if (m === 1) {
    const n = cycle([2, 3, 4], i);
    return num({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: `Number of functions from a set of ${n} elements to a set of 2 elements is`,
      answer: 2 ** n,
      why: "Each domain element has 2 choices: $2^n$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "A function $f:A\\to B$ is one-one if",
      correct: "$f(x)=f(y)\\Rightarrow x=y$",
      wrong: ["onto only", "every $b$ has two preimages", "$A$ empty always"],
      why: "Injective. Onto: every $b$ has a preimage. Bijection: both.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-rel-11",
      i,
      subject: "maths",
      stem: "Number of bijections from a finite set of $n$ elements onto itself is",
      correct: "$n!$",
      wrong: ["$2^n$", "$n^n$", "$n^2$"],
      why: "Permutations of $n$ letters.",
    });
  }
  return mcq({
    chapterId: "math-rel-11",
    i,
    subject: "maths",
    stem: "The inverse of $y=2x+3$ is",
    correct: "$x=(y-3)/2$",
    wrong: ["$y=2x-3$", "$x=2y+3$", "$y=(x+3)/2$"],
    why: "Swap and solve. Linear with nonzero slope is bijective on $\\mathbb{R}$.",
  });
}

function trig(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const rows = [
      ["$\\sin 30^\\circ$", "1/2"],
      ["$\\cos 30^\\circ$", "$\\sqrt{3}/2$"],
      ["$\\tan 45^\\circ$", "1"],
      ["$\\sin 90^\\circ$", "1"],
      ["$\\cos 120^\\circ$", "-1/2"],
      ["$\\tan 60^\\circ$", "$\\sqrt{3}$"],
      ["$\\sin 0^\\circ$", "0"],
      ["$\\cos 180^\\circ$", "-1"],
    ] as const;
    const r = cycle(rows, i);
    const wrongs = rows.filter((x) => x[1] !== r[1]).map((x) => x[1]);
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: `${r[0]} =`,
      correct: r[1],
      wrong: wrongs.slice(0, 3),
      why: "Standard angles. CAST for signs.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin^2\\theta+\\cos^2\\theta=$",
      correct: "1",
      wrong: ["0", "2", "$\\tan^2\\theta$"],
      why: "Also $1+\\tan^2=\\sec^2$, $1+\\cot^2=\\csc^2$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "$\\sin 2A=$",
      correct: "$2\\sin A\\cos A$",
      wrong: ["$\\sin^2 A$", "$2\\cos^2 A-1$", "$\\cos^2 A-\\sin^2 A$"],
      why: "$\\cos 2A=\\cos^2 A-\\sin^2 A=2\\cos^2 A-1=1-2\\sin^2 A$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "General solution of $\\sin\\theta=0$ is",
      correct: "$\\theta=n\\pi$",
      wrong: ["$\\theta=2n\\pi$", "$\\theta=(2n+1)\\pi/2$", "$\\theta=n\\pi/2$"],
      why: "$\\sin\\theta=\\sin\\alpha\\Rightarrow \\theta=n\\pi+(-1)^n\\alpha$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-trig",
      i,
      subject: "maths",
      stem: "In a triangle, $\\frac{a}{\\sin A}=$",
      correct: "$2R$",
      wrong: ["$R$", "$\\Delta$", "$s$"],
      why: "Law of sines $a/\\sin A=b/\\sin B=c/\\sin C=2R$. Cosine: $c^2=a^2+b^2-2ab\\cos C$.",
    });
  }
  return mcq({
    chapterId: "math-trig",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "$\\sin A+\\sin B=$",
    correct: "$2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$",
    wrong: ["$2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$", "$\\sin(A+B)$", "0"],
    why: "Prosthaphaeresis. Product-to-sum for the reverse direction.",
  });
}

function complex(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const a = cycle([3, 4, 5, 6], i);
    const b = cycle([4, 3, 12, 8], i);
    return num({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: `$|${a}+${b}i|$ is`,
      answer: Math.hypot(a, b),
      why: `$\\sqrt{${a}^2+${b}^2}=${Math.hypot(a, b)}$.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "$i^2=$",
      correct: "$-1$",
      wrong: ["$1$", "$i$", "$0$"],
      why: "$i^4=1$ cycle: $i,-1,-i,1$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "$z\\bar z=$",
      correct: "$|z|^2$",
      wrong: ["$z^2$", "$0$", "$2\\operatorname{Re}z$"],
      why: "If $z=x+iy$, $\\bar z=x-iy$, product $x^2+y^2$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "Argument of a negative real number is",
      correct: "$\\pi$ (principal)",
      wrong: ["$0$", "$\\pi/2$", "undefined always"],
      why: "Principal Arg $\\in(-\\pi,\\pi]$. Negative real: $\\pi$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-complex",
      i,
      subject: "maths",
      stem: "De Moivre: $(\\cos\\theta+i\\sin\\theta)^n=$",
      correct: "$\\cos n\\theta+i\\sin n\\theta$",
      wrong: ["$\\cos\\theta^n+i\\sin\\theta^n$", "$n(\\cos\\theta+i\\sin\\theta)$", "$\\cos\\theta+i n\\sin\\theta$"],
      why: "Roots: $n$th roots of $r(\\cos\\theta+i\\sin\\theta)$ equally spaced on a circle.",
    });
  }
  return mcq({
    chapterId: "math-complex",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "The equation $|z-1|=|z+1|$ represents",
    correct: "the y-axis (perpendicular bisector of $1$ and $-1$)",
    wrong: ["the unit circle", "the x-axis", "a point"],
    why: "Locus: equidistant from $1$ and $-1$. $|z-z_0|=r$ is a circle.",
  });
}

function ineq(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const a = cycle([1, 2, 3], i);
    const b = cycle([4, 5, 9], i);
    const d = b * b - 4 * a * 0;
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: `For $f(x)=${a}x^2+${b}x$, the parabola`,
      correct: "opens upward ($a>0$)",
      wrong: ["opens downward", "is a line", "has no vertex"],
      why: `Leading coefficient ${a}>0. Discriminant of $ax^2+bx=0$ is ${d}.`,
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "AM–GM: for positive $a,b$",
      correct: "$(a+b)/2\\ge\\sqrt{ab}$, equality iff $a=b$",
      wrong: ["$ab\\ge(a+b)/2$", "always strict", "only for integers"],
      why: "Equality at equality of terms. Weighted AM–GM for more.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "Solution of $|x|<2$ is",
      correct: "$-2<x<2$",
      wrong: ["$x<-2$ or $x>2$", "$x>2$", "$x=-2$"],
      why: "$|x|\\ge 2$ is the outside. $|x-a|<r$ is $(a-r,a+r)$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-ineq",
      i,
      subject: "maths",
      stem: "A quadratic $ax^2+bx+c>0$ for all x if",
      correct: "$a>0$ and $D<0$",
      wrong: ["$D>0$", "$a<0$ and $D<0$", "$c>0$ only"],
      why: "Always-positive: above the axis. Always-negative: $a<0,D<0$.",
    });
  }
  return mcq({
    chapterId: "math-ineq",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Cauchy–Schwarz in Engel form (Titu) is",
    correct: "$\\sum a_i^2/b_i \\ge (\\sum a_i)^2/\\sum b_i$ for $b_i>0$",
    wrong: ["$\\sum a_i b_i \\ge \\sum a_i^2$", "AM–HM without weights", "only for n=2 with equality always"],
    why: "Advanced inequality standard. Equality when a/b constant.",
  });
}

function pnc(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const n = cycle([5, 6, 7, 8], i);
    const r = cycle([2, 3], i);
    const P = Array.from({ length: r }, (_, k) => n - k).reduce((a, b) => a * b, 1);
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `$^{${n}}P_{${r}}$ equals`,
      answer: P,
      why: `$n!/(n-r)! = ${P}$.`,
    });
  }
  if (m === 1) {
    const n = cycle([5, 6, 7, 8, 10], i);
    const r = cycle([2, 3], i);
    const C = (function () {
      let nume = 1,
        den = 1;
      for (let k = 0; k < r; k++) {
        nume *= n - k;
        den *= k + 1;
      }
      return nume / den;
    })();
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `$^{${n}}C_{${r}}$ equals`,
      answer: C,
      why: `$n!/(r!(n-r)!)=${C}$.`,
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: "$^n C_r = ^n C_{n-r}$ is",
      correct: "true",
      wrong: ["false", "true only for even n", "true only for r=1"],
      why: "Choosing r is choosing the complement.",
    });
  }
  if (m === 3) {
    const n = cycle([4, 5, 6], i);
    return num({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: `Number of ways to arrange ${n} distinct books in a line is`,
      answer: [1, 1, 2, 6, 24, 120, 720, 5040][n]!,
      why: `${n}! . Circular: (n-1)!.`,
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-pnc",
      i,
      subject: "maths",
      stem: "Number of ways to arrange n distinct beads on a necklace (flips allowed) is",
      correct: "$(n-1)!/2$ (Dihedral, n>2)",
      wrong: ["$n!$", "$(n-1)!$", "$2^n$"],
      why: "Circular (n-1)!, then divide by 2 if the necklace can be flipped.",
    });
  }
  return mcq({
    chapterId: "math-pnc",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Stars and bars: positive integer solutions of $x_1+\\cdots+x_k=n$ is",
    correct: "$^{n-1}C_{k-1}$",
    wrong: ["$^{n}C_{k}$", "$^{n+k-1}C_{k-1}$ (that's non-negative)", "$k^n$"],
    why: "Non-negative: $^{n+k-1}C_{k-1}$. Positive: give 1 each first.",
  });
}

function binom(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    const n = cycle([4, 5, 6, 7], i);
    return num({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: `Sum of binomial coefficients $^n C_0+\\cdots+^n C_n$ for $n=${n}$ is`,
      answer: 2 ** n,
      why: "$(1+1)^n=2^n$. Alternating sum is 0.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "The general term in $(a+b)^n$ is",
      correct: "$T_{r+1}=^n C_r a^{n-r} b^r$",
      wrong: ["$T_r=^n C_r a^r b^{n-r}$ always as first term index 0", "$a^n+b^n$", "$n a b$"],
      why: "r from 0 to n. Middle term(s) when r=n/2 or two middles if n odd.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "$^n C_r / ^n C_{r-1}=$",
      correct: "$(n-r+1)/r$",
      wrong: ["$r/(n-r)$", "$n/r$", "1"],
      why: "Useful to find greatest coefficient: compare $T_{r+1}/T_r$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-binom",
      i,
      subject: "maths",
      stem: "$(1+x)^n \\approx 1+nx$ for",
      correct: "$|x|\\ll 1$ (any real n, binomial series)",
      wrong: ["$|x|\\gg 1$", "only integer n<0", "never"],
      why: "Physics approximation workhorse. Next term $n(n-1)x^2/2$.",
    });
  }
  return mcq({
    chapterId: "math-binom",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Coefficient of $x^r$ in $(1-x)^{-n}$ (n positive integer) is",
    correct: "$^{n+r-1}C_r$",
    wrong: ["$^n C_r$", "$^{n}C_{r-1}$", "$2^n$"],
    why: "Negative binomial series. Generating function for stars and bars.",
  });
}

function seq(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const a = cycle([2, 3, 5], i);
    const d = cycle([2, 3, 4], i);
    const n = cycle([5, 10, 8], i);
    const an = a + (n - 1) * d;
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `AP: first term ${a}, common difference ${d}. Term number ${n} is`,
      answer: an,
      why: "$a_n=a+(n-1)d$.",
    });
  }
  if (m === 1) {
    const a = cycle([1, 2, 3], i);
    const n = cycle([5, 10, 20], i);
    const d = cycle([1, 2], i);
    const S = (n / 2) * (2 * a + (n - 1) * d);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `Sum of first ${n} terms of AP with $a=${a}$, $d=${d}$ is`,
      answer: S,
      why: "$S_n=n/2\\,[2a+(n-1)d]$.",
    });
  }
  if (m === 2) {
    const a = cycle([2, 3, 1], i);
    const r = cycle([2, 3], i);
    const n = cycle([4, 5, 6], i);
    const an = a * r ** (n - 1);
    return num({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: `GP: $a=${a}$, $r=${r}$. Term ${n} is`,
      answer: an,
      why: "$a_n=ar^{n-1}$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: "Infinite GP sum $|r|<1$ is",
      correct: "$a/(1-r)$",
      wrong: ["$a/(1+r)$", "$na$", "$a r$"],
      why: "$S=a+ar+ar^2+\\cdots$. If $|r|\\ge 1$ it diverges (a≠0).",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-seq",
      i,
      subject: "maths",
      stem: "AM, GM, HM of two positive numbers satisfy",
      correct: "AM $\\ge$ GM $\\ge$ HM",
      wrong: ["HM $\\ge$ AM", "GM $\\ge$ AM", "always equality"],
      why: "Equality iff the numbers are equal. $GM^2=AM\\cdot HM$.",
    });
  }
  return mcq({
    chapterId: "math-seq",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Sum $\\sum_{k=1}^n k^2=$",
    correct: "$n(n+1)(2n+1)/6$",
    wrong: ["$n(n+1)/2$", "$[n(n+1)/2]^2$ (that's k^3)", "$n^2$"],
    why: "Standard. $\\sum k=n(n+1)/2$, $\\sum k^3=[n(n+1)/2]^2$.",
  });
}

function straight(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Slope of the line through $(1,2)$ and $(3,6)$ is",
      correct: "2",
      wrong: ["1", "3", "4"],
      why: "$m=(6-2)/(3-1)=2$. Angle $\\tan\\theta=m$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Two lines with slopes $m_1,m_2$ are perpendicular if",
      correct: "$m_1 m_2=-1$",
      wrong: ["$m_1=m_2$", "$m_1+m_2=0$ always", "$m_1 m_2=1$"],
      why: "Parallel: $m_1=m_2$. Vertical line has undefined slope.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "Distance from $(x_0,y_0)$ to $ax+by+c=0$ is",
      correct: "$|ax_0+by_0+c|/\\sqrt{a^2+b^2}$",
      wrong: ["$ax_0+by_0+c$", "$\\sqrt{a^2+b^2}$", "$c/\\sqrt{a^2+b^2}$ always"],
      why: "Normal form: $x\\cos\\omega+y\\sin\\omega=p$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-straight",
      i,
      subject: "maths",
      stem: "The intercept form of a line is",
      correct: "$x/a+y/b=1$",
      wrong: ["$y=mx+c$ only", "$x=my+c$", "$(y-y_1)=m(x-x_1)$ only"],
      why: "Point-slope, two-point, normal, parametric are the other four you need.",
    });
  }
  return mcq({
    chapterId: "math-straight",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Family of lines through intersection of $L_1=0$ and $L_2=0$ is",
    correct: "$L_1+\\lambda L_2=0$",
    wrong: ["$L_1 L_2=0$", "$L_1=\\lambda$", "$\\nabla L_1$"],
    why: "Angle bisectors: $(L_1)/\\sqrt{a_1^2+b_1^2}=\\pm L_2/\\sqrt{a_2^2+b_2^2}$.",
  });
}

function conic(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Circle $x^2+y^2=r^2$ has radius",
      correct: "$r$",
      wrong: ["$r^2$", "$2r$", "1"],
      why: "General $x^2+y^2+2gx+2fy+c=0$, centre $(-g,-f)$, $r=\\sqrt{g^2+f^2-c}$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Parabola $y^2=4ax$ has focus",
      correct: "$(a,0)$",
      wrong: ["$(0,a)$", "$(2a,0)$", "$(0,0)$"],
      why: "Directrix $x=-a$, latus rectum $4a$. Parametric $(at^2,2at)$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Ellipse $x^2/a^2+y^2/b^2=1$ ($a>b$) has eccentricity",
      correct: "$e=\\sqrt{1-b^2/a^2}$",
      wrong: ["$e=\\sqrt{1-a^2/b^2}$", "$e=a/b$", "$e=1$"],
      why: "Foci $(\\pm ae,0)$. $b^2=a^2(1-e^2)$. Area $\\pi ab$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Hyperbola $x^2/a^2-y^2/b^2=1$ has $e$",
      correct: "$>1$, with $b^2=a^2(e^2-1)$",
      wrong: ["$<1$", "$=1$", "$=0$"],
      why: "Asymptotes $y=\\pm(b/a)x$. Rectangular if $a=b$, $e=\\sqrt{2}$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-conic",
      i,
      subject: "maths",
      stem: "Eccentricity of a parabola is",
      correct: "1",
      wrong: ["0", "<1", ">1"],
      why: "Definition PF=e·PM. Circle e=0, ellipse e<1, parabola 1, hyperbola >1.",
    });
  }
  return mcq({
    chapterId: "math-conic",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "The chord of the parabola $y^2=4ax$ joining $t_1,t_2$ has slope",
    correct: "$2/(t_1+t_2)$",
    wrong: ["$t_1+t_2$", "$t_1 t_2$", "$a(t_1+t_2)$"],
    why: "Focal chord: $t_1 t_2=-1$. Tangent at $t$: $ty=x+at^2$.",
  });
}

function threeD11(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Distance between $(1,2,3)$ and $(1,2,7)$ is",
      correct: "4",
      wrong: ["5", "3", "0"],
      why: "$\\sqrt{0+0+16}=4$. Section formula as in 2-D with a third coordinate.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Direction cosines $l,m,n$ satisfy",
      correct: "$l^2+m^2+n^2=1$",
      wrong: ["$l+m+n=1$", "$lmn=1$", "$l^2+m^2=n^2$"],
      why: "Direction ratios are proportional. Angle: $\\cos\\theta=|l_1 l_2+m_1 m_2+n_1 n_2|$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-3d-11",
      i,
      subject: "maths",
      stem: "Octant in which $(-1,2,-3)$ lies is the one with signs",
      correct: "$-,+,-$",
      wrong: ["$+,+,+$", "$-,-,-$", "$+,-,+$"],
      why: "Eight octants. XY, YZ, ZX planes divide space.",
    });
  }
  return mcq({
    chapterId: "math-3d-11",
    i,
    subject: "maths",
    stem: "The xy-plane has equation",
    correct: "$z=0$",
    wrong: ["$x=0$", "$y=0$", "$x+y+z=0$"],
    why: "Coordinate planes: $x=0$ (yz), $y=0$ (zx), $z=0$ (xy).",
  });
}

function limits(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{x\\to 0}\\sin x/x=$",
      correct: "1",
      wrong: ["0", "∞", "$x$"],
      why: "Standard. Also $\\tan x/x\\to 1$, $(1-\\cos x)/x^2\\to 1/2$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{x\\to 0}(e^x-1)/x=$",
      correct: "1",
      wrong: ["0", "$e$", "∞"],
      why: "Also $\\lim (a^x-1)/x=\\ln a$, $\\lim \\ln(1+x)/x=1$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "$\\lim_{n\\to\\infty}(1+x/n)^n=$",
      correct: "$e^x$",
      wrong: ["$1$", "$x$", "$e$ always regardless of x"],
      why: "Definition of $e^x$. $(1+1/n)^n\\to e$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-limits",
      i,
      subject: "maths",
      stem: "A left-hand limit equals the right-hand limit if the two-sided limit",
      correct: "exists (and then equals both)",
      wrong: ["never", "exists even if they differ", "equals 0"],
      why: "Jump discontinuities: LHL ≠ RHL. Removable: limit exists, f(a) differs.",
    });
  }
  return mcq({
    chapterId: "math-limits",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "L’Hôpital applies to",
    correct: "$0/0$ or $\\infty/\\infty$ indeterminate forms (after checking hypotheses)",
    wrong: ["any quotient", "$0\\times 0$", "polynomials only"],
    why: "Rewrite $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$ into a quotient first.",
  });
}

function stats(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Mean of 2, 4, 6, 8, 10 is",
      correct: "6",
      wrong: ["5", "8", "10"],
      why: "Sum 30 / 5 = 6. Median is also 6. This set is symmetric.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "Variance is",
      correct: "mean squared deviation from the mean",
      wrong: ["mean", "median − mean", "always equal to SD"],
      why: "$\\sigma^2=\\frac1n\\sum (x_i-\\bar x)^2=\\bar{x^2}-\\bar x^2$. SD is $\\sigma$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-stats",
      i,
      subject: "maths",
      stem: "If every observation is increased by 5, variance",
      correct: "is unchanged",
      wrong: ["increases by 5", "increases by 25", "is multiplied by 5"],
      why: "Shift invariance. Scale by k: variance × k², SD × |k|.",
    });
  }
  return mcq({
    chapterId: "math-stats",
    i,
    subject: "maths",
    stem: "The mode is",
    correct: "the most frequent value",
    wrong: ["always the mean", "the middle when sorted (median)", "σ"],
    why: "Empirical: mean − mode ≈ 3 (mean − median) for mildly skewed data.",
  });
}

function prob11(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "A fair coin twice. P(two heads) is",
      correct: "$1/4$",
      wrong: ["$1/2$", "$1/3$", "$1$"],
      why: "HH, HT, TH, TT equally likely.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "Two dice. n(S) =",
      correct: "36",
      wrong: ["12", "6", "18"],
      why: "Ordered pairs. P(sum 7)=6/36=1/6.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "$P(A\\cup B)=$",
      correct: "$P(A)+P(B)-P(A\\cap B)$",
      wrong: ["$P(A)+P(B)$ always", "$P(A)P(B)$", "1"],
      why: "If mutually exclusive, intersection is 0. Independent: $P(A\\cap B)=P(A)P(B)$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-prob-11",
      i,
      subject: "maths",
      stem: "P(at least one head in 3 fair coins) is",
      correct: "$7/8$",
      wrong: ["$1/8$", "$3/8$", "$1/2$"],
      why: "Complement: TTT has probability 1/8.",
    });
  }
  return mcq({
    chapterId: "math-prob-11",
    i,
    subject: "maths",
    stem: "A card from 52. P(ace) is",
    correct: "$1/13$",
    wrong: ["$1/4$", "$4/13$", "$1/52$"],
    why: "4 aces. P(heart)=1/4. P(ace of hearts)=1/52. P(ace or heart)=16/52.",
  });
}

function rel12(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "An equivalence relation is",
      correct: "reflexive, symmetric, transitive",
      wrong: ["only reflexive", "only symmetric", "antisymmetric and reflexive (that's partial order with trans)"],
      why: "Partitions the set into classes. Congruence mod n on integers.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "$f(x)=x^2$ on $\\mathbb{R}\\to\\mathbb{R}$ is",
      correct: "neither one-one nor onto",
      wrong: ["bijective", "one-one not onto", "onto not one-one"],
      why: "Restrict domain to $[0,\\infty)$ and codomain to $[0,\\infty)$ to make it bijective.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "$(f\\circ g)^{-1}=$",
      correct: "$g^{-1}\\circ f^{-1}$",
      wrong: ["$f^{-1}\\circ g^{-1}$", "$f\\circ g$", "$g\\circ f$"],
      why: "Reverse the order. Socks then shoes; inverse: shoes off then socks.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-rel-12",
      i,
      subject: "maths",
      stem: "Number of onto functions from a set of 3 to a set of 2 is",
      correct: "6",
      wrong: ["8", "9", "2"],
      why: "$2^3-2=6$ (exclude two constants). Formula $n! S(m,n)$ or inclusion-exclusion.",
    });
  }
  return mcq({
    chapterId: "math-rel-12",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Binary operation $*$ on $\\mathbb{R}$ given by $a*b=a+b+ab$ has identity",
    correct: "0",
    wrong: ["1", "−1", "none"],
    why: "a*e=a ⇒ a+e+ae=a ⇒ e(1+a)=0 for all a ⇒ e=0. Inverse: $a*b=0⇒b=-a/(1+a)$, $a≠-1$.",
  });
}

function invtrig(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "Principal range of $\\sin^{-1}$ is",
      correct: "$[-\\pi/2,\\pi/2]$",
      wrong: ["$[0,\\pi]$ (that's cos⁻¹)", "$(-\\pi,\\pi]$", "$[0,\\pi/2]$"],
      why: "tan⁻¹ also $[-\\pi/2,\\pi/2]$. cos⁻¹ is $[0,\\pi]$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "$\\sin^{-1}x+\\cos^{-1}x=$",
      correct: "$\\pi/2$",
      wrong: ["$0$", "$\\pi$", "$x$"],
      why: "Also $\\tan^{-1}x+\\tan^{-1}(1/x)=\\pi/2$ for $x>0$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "$\\tan^{-1}x+\\tan^{-1}y$, when $xy<1$, is",
      correct: "$\\tan^{-1}\\frac{x+y}{1-xy}$",
      wrong: ["$\\tan^{-1}(x+y)$", "$\\tan^{-1}xy$", "$\\pi$ always"],
      why: "If $xy>1$, add or subtract $\\pi$ according to signs. Classic trap.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-invtrig",
      i,
      subject: "maths",
      stem: "$\\sin^{-1}(1/2)$ equals",
      correct: "$\\pi/6$",
      wrong: ["$\\pi/3$", "$\\pi/2$", "$\\pi$"],
      why: "sin 30°=1/2, and π/6 is in the principal range.",
    });
  }
  return mcq({
    chapterId: "math-invtrig",
    i,
    subject: "maths",
    stem: "Domain of $\\cos^{-1}x$ is",
    correct: "$[-1,1]$",
    wrong: ["$\\mathbb{R}$", "$[0,1]$", "$(-\\infty,\\infty)$"],
    why: "Same domain as sin⁻¹. tan⁻¹ has domain ℝ.",
  });
}

function matrices(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "If A is m×n and B is n×p, AB is",
      correct: "m×p",
      wrong: ["n×n", "m×n", "p×m"],
      why: "Inner dimensions must match. BA may not even exist.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "A square matrix with $A^T=A$ is",
      correct: "symmetric",
      wrong: ["skew-symmetric ($A^T=-A$)", "orthogonal ($A^T A=I$)", "singular"],
      why: "Skew: diagonal 0. Orthogonal: columns orthonormal, $A^{-1}=A^T$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "$(AB)^{-1}=$",
      correct: "$B^{-1}A^{-1}$",
      wrong: ["$A^{-1}B^{-1}$", "$AB$", "$(BA)^{-1}$ always equal"],
      why: "Reverse order, same as functions. $(AB)^T=B^T A^T$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-matrices",
      i,
      subject: "maths",
      stem: "A is invertible iff",
      correct: "$\\det A\\ne 0$",
      wrong: ["$\\det A=0$", "A is singular", "A is 1×1 only"],
      why: "Singular ⇔ det 0 ⇔ rows dependent ⇔ 0 is an eigenvalue.",
    });
  }
  return mcq({
    chapterId: "math-matrices",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "If $A^2=A$ (idempotent) then eigenvalues are",
    correct: "0 or 1",
    wrong: ["any real", "only 1", "only 0"],
    why: "$\\lambda^2=\\lambda$. Projections. Trace = rank for diagonalisable idempotents.",
  });
}

function dets(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "$\\det\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}=$",
      correct: "6",
      wrong: ["5", "0", "1"],
      why: "Diagonal matrix: product of diagonal entries.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "$\\det(AB)=$",
      correct: "$\\det A\\,\\det B$",
      wrong: ["$\\det A+\\det B$", "$\\det(A+B)$", "$\\det A^T / \\det B$"],
      why: "Also det A^T = det A, det(kA)=k^n det A, det A⁻¹ = 1/det A.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "Swapping two rows of a determinant",
      correct: "multiplies it by −1",
      wrong: ["does nothing", "zeros it", "squares it"],
      why: "Two equal rows ⇒ det 0. Adding a multiple of one row to another does not change det.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-dets",
      i,
      subject: "maths",
      stem: "Area of triangle with vertices (x_i,y_i) is (1/2)|det of|",
      correct: "the 3×3 matrix with rows (x_i, y_i, 1)",
      wrong: ["only the 2×2 of first two points", "the Gram matrix always", "0 always"],
      why: "Collinear ⇔ area 0 ⇔ that det is 0.",
    });
  }
  return mcq({
    chapterId: "math-dets",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Cramer's rule solves $A\\mathbf{x}=\\mathbf{b}$ when",
    correct: "$\\det A\\ne 0$; $x_i=\\det A_i/\\det A$",
    wrong: ["always even if singular", "only 2×2", "never for 3×3"],
    why: "A_i replaces column i with b. Use for theory; Gauss is faster numerically.",
  });
}

function cont(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "f is continuous at a if",
      correct: "$\\lim_{x\\to a}f(x)=f(a)$",
      wrong: ["f(a) exists only", "the limit exists only", "f is differentiable"],
      why: "Need all three: f(a), limit, equality. Differentiable ⇒ continuous, not converse.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "$f(x)=|x|$ at 0 is",
      correct: "continuous but not differentiable",
      wrong: ["discontinuous", "differentiable", "undefined"],
      why: "Corner. LHD = −1, RHD = 1.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-cont",
      i,
      subject: "maths",
      stem: "Intermediate value theorem needs f continuous on",
      correct: "a closed interval [a,b]",
      wrong: ["an open set only", "Q", "any subset of R"],
      why: "Every value between f(a) and f(b) is attained. Root existence: sign change.",
    });
  }
  return mcq({
    chapterId: "math-cont",
    i,
    subject: "maths",
    stem: "A polynomial is continuous",
    correct: "everywhere on ℝ",
    wrong: ["only at 0", "only on (0,1)", "nowhere"],
    why: "Rational functions: continuous off zeros of the denominator. sin, exp, etc. entire ℝ.",
  });
}

function aod(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    const n = cycle([2, 3, 4, 5], i);
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: `$\\dfrac{d}{dx}x^{${n}}=$`,
      correct: `${n}x^{${n - 1}}`,
      wrong: [`$x^{${n}}$`, `${n}x^{${n}}$`, `$x^{${n + 1}}/${n + 1}$`],
      why: "Power rule. Integral is the reverse.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "$\\frac{d}{dx}\\sin x=$",
      correct: "$\\cos x$",
      wrong: ["$-\\cos x$", "$-\\sin x$", "$\\sec^2 x$"],
      why: "d cos = −sin, d tan = sec², d e^x = e^x, d ln|x| = 1/x.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "Product rule: $(uv)'=$",
      correct: "$u'v+uv'$",
      wrong: ["$u'v'$", "$u'/v+v'/u$", "$u'v-uv'$"],
      why: "Quotient: $(u/v)'=(u'v-uv')/v^2$. Chain: $(f\\circ g)'=f'(g)g'$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "At a local maximum of a smooth f, f'",
      correct: "is 0 (critical point) and f'' ≤ 0 if it exists and is used",
      wrong: ["is 1", "does not exist always", "is ∞"],
      why: "Second-derivative test: f''<0 max, f''>0 min, f''=0 inconclusive (x^3, x^4).",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-aod",
      i,
      subject: "maths",
      stem: "Rolle’s theorem needs f continuous on [a,b], differentiable on (a,b), and",
      correct: "$f(a)=f(b)$, then f'=0 somewhere in (a,b)",
      wrong: ["f(a)=0 only", "f' never 0", "f linear only"],
      why: "LMVT: f'(c)=(f(b)-f(a))/(b-a). Rolle is LMVT with f(a)=f(b).",
    });
  }
  return mcq({
    chapterId: "math-aod",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "If y is defined implicitly by F(x,y)=0, then dy/dx =",
    correct: "$-F_x/F_y$ (when F_y ≠ 0)",
    wrong: ["$F_x/F_y$", "$F_y/F_x$", "0"],
    why: "Differentiate F(x,y(x))=0. Tangent to a curve F=c is that gradient relation.",
  });
}

function integ(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int x^n\\,dx$ ($n\\ne-1$) is",
      correct: "$x^{n+1}/(n+1)+C$",
      wrong: ["$n x^{n-1}$", "$x^n/n$", "$\\ln|x|$"],
      why: "n=−1 is ln|x|. Don't forget +C in indefinite integrals.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int_0^{\\pi/2}\\sin x\\,dx=$",
      correct: "1",
      wrong: ["0", "2", "$\\pi/2$"],
      why: "$[-\\cos x]_0^{\\pi/2}=0-(-1)=1$.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "Integration by parts: $\\int u\\,dv=$",
      correct: "$uv-\\int v\\,du$",
      wrong: ["$uv+\\int v\\,du$", "$u'v$", "$\\int u\\int v$"],
      why: "ILATE pick u. Definite: $[uv]_a^b-\\int_a^b v du$.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "For a definite integral, $\\int_a^b f=$",
      correct: "$-\\int_b^a f$",
      wrong: ["$\\int_b^a f$", "0 always", "$f(b)-f(a)$ always even if F is not an antiderivative"],
      why: "Also $\\int_a^a=0$, additivity on intervals. FTC: F'=f ⇒ ∫_a^b f=F(b)-F(a).",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-int",
      i,
      subject: "maths",
      stem: "$\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx=$",
      correct: "$\\pi/4$",
      wrong: ["$\\pi/2$", "1", "0"],
      why: "Property $\\int_0^a f(x)=\\int_0^a f(a-x)$. The two integrals are equal and sum to π/2.",
    });
  }
  return mcq({
    chapterId: "math-int",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "The substitution t=tan(x/2) (Weierstrass) converts rational f(sin,cos) into",
    correct: "a rational function of t",
    wrong: ["an exponential", "a polynomial of degree 1 always", "nothing useful"],
    why: "$\\sin x=2t/(1+t^2)$, $\\cos x=(1-t^2)/(1+t^2)$, $dx=2dt/(1+t^2)$. Last resort — messy.",
  });
}

function aoi(i: number): PlayItem {
  const m = i % 4;
  if (m === 0) {
    return mcq({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area under y=x from 0 to 2 is",
      correct: "2",
      wrong: ["1", "4", "0"],
      why: "$\\int_0^2 x\\,dx=[x^2/2]_0^2=2$. Triangle of base 2 height 2.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area between y=f and y=g on [a,b] is",
      correct: "$\\int_a^b |f-g|\\,dx$",
      wrong: ["$\\int (f+g)$", "$\\int f g$", "always $\\int (f-g)$ without modulus"],
      why: "Split at intersections. For x=g(y), integrate dy.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-aoi",
      i,
      subject: "maths",
      stem: "Area of a circle x²+y²=r² is",
      correct: "$\\pi r^2$",
      wrong: ["$2\\pi r$", "$4r^2$", "$r^2$"],
      why: "$4\\int_0^r \\sqrt{r^2-x^2}\\,dx$. Use trig sub or known formula.",
    });
  }
  return mcq({
    chapterId: "math-aoi",
    i,
    subject: "maths",
    stem: "The area of an ellipse x²/a²+y²/b²=1 is",
    correct: "$\\pi a b$",
    wrong: ["$\\pi a^2$", "$2\\pi\\sqrt{(a^2+b^2)/2}$", "$4ab$"],
    why: "Stretch a circle. Parabola area (latus rectum related) is a standard NCERT example.",
  });
}

function de(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Order of $y''+y=0$ is",
      correct: "2",
      wrong: ["1", "0", "3"],
      why: "Highest derivative. Degree is the power of that derivative after clearing radicals/fractions.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "The DE for exponential growth $y'=ky$ has solution",
      correct: "$y=y_0 e^{kt}$",
      wrong: ["$y=kt$", "$y=k/t$", "$y=\\sin kt$"],
      why: "Variable separable: dy/y=k dt.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Linear first-order $y'+P(x)y=Q(x)$ has integrating factor",
      correct: "$e^{\\int P\\,dx}$",
      wrong: ["$e^{\\int Q}$", "$P$", "$Q/P$"],
      why: "Multiply through, left side becomes (y·IF)'. Solution y·IF=∫ Q·IF dx.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-de",
      i,
      subject: "maths",
      stem: "Homogeneous $dy/dx=f(y/x)$ is solved by",
      correct: "$v=y/x$, then separable in v,x",
      wrong: ["always IF", "Laplace", "undetermined coefficients only"],
      why: "If f(x,y) homogeneous of degree 0. Sometimes x=vy if the other way is cleaner.",
    });
  }
  return mcq({
    chapterId: "math-de",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Orthogonal trajectories of a family F(x,y,c)=0 are found by",
    correct: "replacing y' by −1/y' in the DE of the family",
    wrong: ["the same DE", "y' by y", "c by −c"],
    why: "Product of slopes −1. For polar, r r' swap with a minus.",
  });
}

function vec(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$\\vec a\\cdot\\vec b=$",
      correct: "$|a||b|\\cos\\theta$",
      wrong: ["$|a||b|\\sin\\theta$", "$|a\\times b|$", "0 always"],
      why: "Scalar. 0 iff perpendicular (or zero vector). In components: Σ a_i b_i.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "$|\\vec a\\times\\vec b|=$",
      correct: "$|a||b|\\sin\\theta$",
      wrong: ["$|a||b|\\cos\\theta$", "$a\\cdot b$", "0 if perpendicular"],
      why: "Area of parallelogram. Direction: right-hand rule. a×a=0.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "If a=î+2ĵ+2k̂ then |a| is",
      correct: "3",
      wrong: ["5", "1", "√5"],
      why: "√(1+4+4)=3. Unit vector a/|a|.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-vec",
      i,
      subject: "maths",
      stem: "Scalar triple product [a,b,c] is",
      correct: "$a\\cdot(b\\times c)$, volume of parallelepiped",
      wrong: ["always 0", "$|a||b||c|$", "$a\\times b\\times c$ without brackets"],
      why: "Vanishes iff coplanar. Cyclic permutations even, swaps odd.",
    });
  }
  return mcq({
    chapterId: "math-vec",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Vector triple product $a\\times(b\\times c)=$",
    correct: "$(a\\cdot c)b-(a\\cdot b)c$",
    wrong: ["$(a\\cdot b)c-(a\\cdot c)b$", "0", "[a,b,c] a"],
    why: "BAC−CAB. Not associative. Lies in the plane of b,c.",
  });
}

function threeD12(i: number): PlayItem {
  const m = i % 5;
  if (m === 0) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Vector equation of a line through A with direction $\\vec b$ is",
      correct: "$\\vec r=\\vec a+\\lambda\\vec b$",
      wrong: ["$\\vec r\\cdot\\vec n=d$", "$\\vec r=\\vec a\\times\\vec b$", "$\\lambda=0$ only"],
      why: "Cartesian: $(x-x_1)/l=(y-y_1)/m=(z-z_1)/n$.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Equation of a plane with normal n through A is",
      correct: "$(\\vec r-\\vec a)\\cdot\\vec n=0$",
      wrong: ["$\\vec r\\times n=0$", "$\\vec r=\\lambda n$", "x=0 only"],
      why: "Cartesian: ax+by+cz+d=0. Angle between planes = angle between normals.",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Distance from point to plane $ax+by+cz+d=0$ is",
      correct: "$|ax_0+by_0+cz_0+d|/\\sqrt{a^2+b^2+c^2}$",
      wrong: ["$|d|$", "0 always", "the same without modulus"],
      why: "Same pattern as 2-D line. Two parallel planes: $|d_1-d_2|/\\sqrt{a^2+b^2+c^2}$ if a,b,c match.",
    });
  }
  if (m === 3) {
    return mcq({
      chapterId: "math-3d-12",
      i,
      subject: "maths",
      stem: "Skew lines are",
      correct: "neither parallel nor intersecting (different planes)",
      wrong: ["always intersecting", "coplanar always", "parallel always"],
      why: "Shortest distance $|(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{b_1}\\times\\vec{b_2})|/|\\vec{b_1}\\times\\vec{b_2}|$.",
    });
  }
  return mcq({
    chapterId: "math-3d-12",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "A line with direction b is parallel to the plane r·n=d if",
    correct: "$\\vec b\\cdot\\vec n=0$",
    wrong: ["$b\\parallel n$", "$b\\times n=0$ and not in the plane", "always"],
    why: "If also a point of the line satisfies the plane, the line lies in the plane.",
  });
}

function lpp(i: number): PlayItem {
  return mcq({
    chapterId: "math-lpp",
    i,
    subject: "maths",
    exam: "boards",
    stem: cycle(
      [
        "The feasible region of a linear programming problem in 2 variables is",
        "The optimal value of a linear objective over a polygonal feasible set is attained at",
        "If the feasible region is unbounded, the maximum",
        "x≥0, y≥0 in LPP means",
      ],
      i,
    ),
    correct: cycle(
      [
        "a convex polygon (possibly unbounded)",
        "a corner point (vertex)",
        "may not exist",
        "the first quadrant (including axes)",
      ],
      i,
    ),
    wrong: cycle(
      [
        ["a circle", "always a triangle", "a hyperbola"],
        ["the centroid only", "any interior point", "never a vertex"],
        ["always exists", "is 0", "is infinite always as a usable answer without checking"],
        ["the whole plane", "x+y=0", "only x=y"],
      ],
      i,
    ),
    why: "Boards-only in this atlas. Sketch constraints, shade, evaluate objective at corners.",
  });
}

function prob12(i: number): PlayItem {
  const m = i % 6;
  if (m === 0) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "P(A|B) =",
      correct: "$P(A\\cap B)/P(B)$",
      wrong: ["$P(A)/P(B)$", "$P(A)P(B)$", "$P(B|A)$ always"],
      why: "Bayes: P(B|A)=P(A|B)P(B)/P(A). Total probability: partition the sample space.",
    });
  }
  if (m === 1) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Independent events satisfy",
      correct: "$P(A\\cap B)=P(A)P(B)$",
      wrong: ["$P(A\\cup B)=P(A)+P(B)$ (that's exclusive)", "$P(A|B)=0$", "A=B"],
      why: "Mutually exclusive + independent ⇒ one has probability 0 (if both live in a useful space).",
    });
  }
  if (m === 2) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "Binomial B(n,p): P(X=k)=",
      correct: "$^n C_k p^k (1-p)^{n-k}$",
      wrong: ["$p^k$", "$1/n$", "$np$"],
      why: "Mean np, variance np(1-p). Bernoulli is n=1.",
    });
  }
  if (m === 3) {
    const n = cycle([4, 5, 10], i);
    const p = 0.5;
    const mean = n * p;
    return num({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: `Fair coins tossed ${n} times. Expected number of heads is`,
      answer: mean,
      why: "$E=np=${n}\\times 1/2=${mean}$.",
    });
  }
  if (m === 4) {
    return mcq({
      chapterId: "math-prob-12",
      i,
      subject: "maths",
      stem: "If X is a random variable, E(aX+b)=",
      correct: "$a E(X)+b$",
      wrong: ["$a E(X)$", "$E(X)+b$", "$a b E(X)$"],
      why: "Var(aX+b)=a² Var(X). Shift does not change variance.",
    });
  }
  return mcq({
    chapterId: "math-prob-12",
    i,
    subject: "maths",
    exam: "advanced",
    stem: "Bayes with two urns is usually solved by",
    correct: "a tree: prior × likelihood, then normalise",
    wrong: ["ignoring priors", "always 1/2", "variance"],
    why: "Write the partition explicitly. JEE loves medical-test / factory-machine / three-cards variants.",
  });
}
