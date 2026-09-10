import { useMemo, useState } from "react";
import { TeX } from "@/components/tex";
import { LabGuidance } from "@/components/lab-guidance";
import { cn } from "@/lib/utils";

const ink = "currentColor";
const mute = "var(--color-muted)";
const ok = "var(--color-ok)";

function Svg({
  children,
  viewBox = "0 0 360 200",
  className,
}: {
  children: React.ReactNode;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} className={cn("h-auto w-full max-h-64 text-fg", className)} role="img" fill="none">
      {children}
    </svg>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  unit?: string;
}) {
  return (
    <label className="block">
      <span className="flex justify-between gap-3 text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums text-fg">
          {Number.isInteger(step) ? value : value.toFixed(step < 0.1 ? 2 : 1)}
          {unit ? ` ${unit}` : ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-11 w-full accent-[var(--color-accent)]"
      />
    </label>
  );
}

function Readout({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.k} className="rounded-md border border-border bg-raised px-3 py-2">
          <dt className="text-[10px] tracking-wide text-subtle uppercase">{it.k}</dt>
          <dd className="mt-0.5 font-mono text-sm tabular-nums">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Shell({
  title,
  lead,
  formula,
  children,
}: {
  title: string;
  lead: string;
  formula?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 md:p-5">
      <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Interactive lab</p>
      <h2 className="font-display mt-1 text-xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">{lead}</p>
      {formula && (
        <div className="mt-3 overflow-x-auto">
          <TeX expr={formula} display />
        </div>
      )}
      <LabGuidance title={title} lead={lead} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CollisionLab() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(3);
  const [u1, setU1] = useState(5);
  const [e, setE] = useState(1);
  const u2 = 0;
  const M = m1 + m2;
  const v1 = ((m1 - e * m2) / M) * u1 + ((m2 * (1 + e)) / M) * u2;
  const v2 = ((m1 * (1 + e)) / M) * u1 + ((m2 - e * m1) / M) * u2;
  const ki = 0.5 * m1 * u1 * u1;
  const kf = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const x1 = 70;
  const x2 = 220;

  return (
    <Shell
      title="Head-on collision, target at rest"
      lead="Slide masses, incident speed and e. e = 1 is elastic (KE conserved); e = 0 they stick. Equal-mass elastic: they exchange velocities. This is the official 1-D collision."
      formula="v_1=\frac{m_1-em_2}{m_1+m_2}u_1,\quad v_2=\frac{m_1(1+e)}{m_1+m_2}u_1"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 160">
          <line x1="20" y1="110" x2="340" y2="110" stroke={mute} />
          <rect x={x1 - 18} y={110 - 12 - m1 * 8} width="36" height={12 + m1 * 8} stroke={ink} />
          <rect x={x2 - 18} y={110 - 12 - m2 * 8} width="36" height={12 + m2 * 8} stroke={ok} />
          <text x={x1} y="28" fill={ink} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            {`u₁ = ${u1.toFixed(1)} →`}
          </text>
          <text x={x2} y="28" fill={ok} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            at rest
          </text>
          <text x={180} y="148" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            {`after: v₁ = ${v1.toFixed(2)}   v₂ = ${v2.toFixed(2)} m/s`}
          </text>
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="m₁" value={m1} min={1} max={8} step={0.5} unit="kg" onChange={setM1} />
        <Slider label="m₂" value={m2} min={1} max={8} step={0.5} unit="kg" onChange={setM2} />
        <Slider label="u₁" value={u1} min={1} max={12} step={0.5} unit="m/s" onChange={setU1} />
        <Slider label="e" value={e} min={0} max={1} step={0.05} onChange={setE} />
      </div>
      <Readout
        items={[
          { k: "v₁", v: `${v1.toFixed(2)} m/s` },
          { k: "v₂", v: `${v2.toFixed(2)} m/s` },
          { k: "K before", v: `${ki.toFixed(1)} J` },
          { k: "K after", v: `${kf.toFixed(1)} J` },
        ]}
      />
    </Shell>
  );
}

const FNS = [
  { id: "abs", name: "|x| modulus", domain: "ℝ", range: "[0, ∞)", even: "even" },
  { id: "sgn", name: "sgn(x)", domain: "ℝ", range: "{−1, 0, 1}", even: "odd" },
  { id: "gif", name: "[x] greatest integer", domain: "ℝ", range: "ℤ", even: "neither" },
  { id: "id", name: "identity x", domain: "ℝ", range: "ℝ", even: "odd" },
  { id: "sq", name: "x² polynomial", domain: "ℝ", range: "[0, ∞)", even: "even" },
  { id: "inv", name: "1/x rational", domain: "ℝ \\ {0}", range: "ℝ \\ {0}", even: "odd" },
  { id: "exp", name: "eˣ exponential", domain: "ℝ", range: "(0, ∞)", even: "neither" },
  { id: "ln", name: "ln x logarithm", domain: "(0, ∞)", range: "ℝ", even: "neither" },
] as const;

function fnY(id: string, x: number): number | null {
  if (id === "abs") return Math.abs(x);
  if (id === "sgn") return x === 0 ? 0 : x > 0 ? 1 : -1;
  if (id === "gif") return Math.floor(x);
  if (id === "id") return x;
  if (id === "sq") return (x * x) / 3;
  if (id === "inv") return Math.abs(x) < 0.15 ? null : 1.2 / x;
  if (id === "exp") return Math.exp(x) - 1;
  if (id === "ln") return x <= 0.05 ? null : Math.log(x);
  return x;
}

function FunctionsLab() {
  const [id, setId] = useState<(typeof FNS)[number]["id"]>("abs");
  const meta = FNS.find((f) => f.id === id)!;
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const x = -4 + (8 * i) / 80;
      const y = fnY(id, x);
      if (y == null || !Number.isFinite(y) || Math.abs(y) > 6) {
        if (out.length) out.push("|");
        continue;
      }
      const px = 180 + x * 38;
      const py = 100 - y * 22;
      out.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return out
      .join(" ")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [id]);

  return (
    <Shell
      title="The official function catalogue"
      lead="CBSE names these nine graphs. Sketch each from a blank page before you hunt domains of composites. Vertical-line test = function; horizontal-line test = one-one."
    >
      <div className="flex flex-wrap gap-2">
        {FNS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setId(f.id)}
            className={cn(
              "h-11 rounded-md border px-3 text-sm",
              id === f.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="20" y1="100" x2="340" y2="100" stroke={mute} />
          <line x1="180" y1="20" x2="180" y2="180" stroke={mute} />
          {pts.map((p) => (
            <polyline key={p.slice(0, 12)} points={p} stroke={ink} strokeWidth="1.8" />
          ))}
        </Svg>
      </div>
      <Readout
        items={[
          { k: "domain", v: meta.domain },
          { k: "range", v: meta.range },
          { k: "even / odd", v: meta.even },
          { k: "CBSE list", v: "draw this" },
        ]}
      />
    </Shell>
  );
}

function VennLab() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(9);
  const [interMax, setInter] = useState(4);
  const inter = Math.min(interMax, a, b);
  const onlyA = a - inter;
  const onlyB = b - inter;
  const union = a + b - inter;

  return (
    <Shell
      title="Two-set Venn, with the numbers honest"
      lead="n(A ∪ B) = n(A) + n(B) − n(A ∩ B). If the intersection slider exceeds min(n(A), n(B)) it clips — that is a real exam trap."
      formula="n(A\cup B)=n(A)+n(B)-n(A\cap B)"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 200">
          <circle cx="140" cy="100" r="70" stroke={ink} />
          <circle cx="220" cy="100" r="70" stroke={ok} />
          <text x="110" y="104" fill={ink} fontSize="14" textAnchor="middle" fontFamily="var(--font-sans)">
            {onlyA}
          </text>
          <text x="180" y="104" fill={mute} fontSize="14" textAnchor="middle" fontFamily="var(--font-sans)">
            {inter}
          </text>
          <text x="250" y="104" fill={ok} fontSize="14" textAnchor="middle" fontFamily="var(--font-sans)">
            {onlyB}
          </text>
          <text x="110" y="36" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            A
          </text>
          <text x="250" y="36" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            B
          </text>
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="n(A)" value={a} min={0} max={20} step={1} onChange={setA} />
        <Slider label="n(B)" value={b} min={0} max={20} step={1} onChange={setB} />
        <Slider label="n(A ∩ B)" value={interMax} min={0} max={20} step={1} onChange={setInter} />
      </div>
      <Readout
        items={[
          { k: "only A", v: String(onlyA) },
          { k: "only B", v: String(onlyB) },
          { k: "union", v: String(union) },
          { k: "clipped ∩", v: String(inter) },
        ]}
      />
    </Shell>
  );
}

function DiodeLab() {
  const [v, setV] = useState(0.8);
  const I = v >= 0.7 ? (v - 0.7) / 0.08 : v > -5 ? 0.02 * v : -8;
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 50; i++) {
      const vv = -6 + (8.5 * i) / 50;
      const ii = vv >= 0.7 ? (vv - 0.7) / 0.08 : vv > -5 ? 0.02 * vv : -8;
      const px = 40 + ((vv + 6) / 8.5) * 300;
      const py = 150 - ii * 12;
      out.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return out.join(" ");
  }, []);
  const px = 40 + ((v + 6) / 8.5) * 300;
  const py = 150 - I * 12;

  return (
    <Shell
      title="p–n diode I–V"
      lead="Forward knee near 0.7 V (Si). Reverse current is tiny until breakdown. A rectifier is this curve on AC — one half-cycle passes. Official: I–V in forward and reverse bias."
      formula="I \approx 0\ (V<0.7),\quad I=(V-0.7)/r_f\ (V>0.7)"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="150" x2="340" y2="150" stroke={mute} />
          <line x1="40" y1="20" x2="40" y2="180" stroke={mute} />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" />
          <circle cx={px} cy={py} r="4" fill={ok} />
          <text x="300" y="168" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            V
          </text>
          <text x="48" y="32" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            I
          </text>
        </Svg>
      </div>
      <Slider label="Bias V" value={v} min={-6} max={2.4} step={0.05} unit="V" onChange={setV} />
      <Readout
        items={[
          { k: "I (arb)", v: I.toFixed(2) },
          { k: "region", v: v >= 0.7 ? "forward" : v > -5 ? "reverse leak" : "breakdown" },
          { k: "knee", v: "0.7 V Si" },
          { k: "job", v: "rectifier" },
        ]}
      />
    </Shell>
  );
}

const BANDS = [
  { id: "radio", name: "Radio", use: "AM/FM, TV, cell", lam: "km–m" },
  { id: "micro", name: "Microwave", use: "radar, ovens, satellite", lam: "cm–mm" },
  { id: "ir", name: "Infrared", use: "remotes, heat lamps", lam: "μm" },
  { id: "vis", name: "Visible", use: "vision, 400–700 nm", lam: "400–700 nm" },
  { id: "uv", name: "Ultraviolet", use: "sterilise, sunburn", lam: "nm" },
  { id: "x", name: "X-rays", use: "imaging, crystals", lam: "0.01–10 nm" },
  { id: "g", name: "γ-rays", use: "nuclear, radiotherapy", lam: "pm" },
] as const;

function SpectrumLab() {
  const [i, setI] = useState(3);
  const b = BANDS[i]!;
  return (
    <Shell
      title="Electromagnetic spectrum, long λ to short"
      lead="Boards want the order and one use each. Do not put UV between IR and visible. Displacement current is why a charging capacitor still makes B."
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-3">
        <div className="flex h-10 overflow-hidden rounded-md">
          {BANDS.map((band, k) => (
            <button
              key={band.id}
              type="button"
              onClick={() => setI(k)}
              className={cn("h-full flex-1 text-[10px]", k === i ? "bg-accent text-accent-fg" : "bg-raised text-muted")}
            >
              {band.name.slice(0, 3)}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-sm">
          <span className="text-subtle">selected · </span>
          {b.name}
        </p>
      </div>
      <Slider label="Band index (0 = radio)" value={i} min={0} max={6} step={1} onChange={setI} />
      <Readout
        items={[
          { k: "band", v: b.name },
          { k: "λ scale", v: b.lam },
          { k: "use", v: b.use },
          { k: "c", v: "3×10⁸ m/s" },
        ]}
      />
    </Shell>
  );
}

function StatsLab() {
  const [vals, setVals] = useState([2, 4, 5, 7, 12]);
  const n = vals.length;
  const mean = vals.reduce((s, x) => s + x, 0) / n;
  const md = vals.reduce((s, x) => s + Math.abs(x - mean), 0) / n;
  const varr = vals.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const sd = Math.sqrt(varr);
  const range = Math.max(...vals) - Math.min(...vals);
  const max = Math.max(...vals, 1);

  return (
    <Shell
      title="Range, mean deviation, variance"
      lead="Ungrouped data, official list. Variance uses the computational form (1/n)Σx² − x̄². Grouped data just replaces each x by a class mark and weights by f."
      formula="\sigma^2=\frac1n\sum x_i^2-\bar x^2"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 160">
          <line x1="30" y1="130" x2="330" y2="130" stroke={mute} />
          {vals.map((x, k) => {
            const px = 50 + k * 60;
            const h = (x / max) * 100;
            return <rect key={k} x={px} y={130 - h} width="28" height={h} stroke={ink} />;
          })}
          <line x1="30" y1={130 - (mean / max) * 100} x2="330" y2={130 - (mean / max) * 100} stroke={ok} strokeDasharray="4 3" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-5">
        {vals.map((x, k) => (
          <Slider
            key={k}
            label={`x${k + 1}`}
            value={x}
            min={0}
            max={20}
            step={1}
            onChange={(n) => setVals((v) => v.map((y, i) => (i === k ? n : y)))}
          />
        ))}
      </div>
      <Readout
        items={[
          { k: "mean", v: mean.toFixed(2) },
          { k: "MD", v: md.toFixed(2) },
          { k: "variance", v: varr.toFixed(2) },
          { k: "SD / range", v: `${sd.toFixed(2)} / ${range}` },
        ]}
      />
    </Shell>
  );
}

function IneqLab() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-6);
  const root = a === 0 ? null : -b / a;
  const shadeRight = a > 0;

  return (
    <Shell
      title="Linear inequality on the number line"
      lead="ax + b > 0. Divide by a; if a is negative the inequality reverses. Open circle because this lab is strict. Boards want the picture; JEE upgrades to a sign chart on a quadratic."
      formula="ax+b>0"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 120">
          <line x1="20" y1="60" x2="340" y2="60" stroke={mute} />
          {root != null && (
            <>
              <circle cx={180 + root * 12} cy="60" r="6" stroke={ink} />
              {shadeRight ? (
                <line x1={180 + root * 12 + 8} y1="60" x2="330" y2="60" stroke={ok} strokeWidth="4" />
              ) : (
                <line x1="30" y1="60" x2={180 + root * 12 - 8} y2="60" stroke={ok} strokeWidth="4" />
              )}
            </>
          )}
          <text x="180" y="96" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            {root == null ? (b > 0 ? "all real x" : "empty") : `root ${root.toFixed(2)}`}
          </text>
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="a" value={a} min={-5} max={5} step={1} onChange={setA} />
        <Slider label="b" value={b} min={-12} max={12} step={1} onChange={setB} />
      </div>
      <Readout
        items={[
          { k: "inequality", v: `${a}x + ${b} > 0` },
          { k: "root", v: root == null ? "—" : root.toFixed(2) },
          { k: "flip?", v: a < 0 ? "yes, a < 0" : "no" },
          { k: "set", v: root == null ? (b > 0 ? "ℝ" : "∅") : shadeRight ? `x > ${root.toFixed(1)}` : `x < ${root.toFixed(1)}` },
        ]}
      />
    </Shell>
  );
}

const MATS = [
  { id: "dia", name: "Diamagnetic", chi: "χ < 0, tiny", t: "almost independent of T", ex: "Bi, Cu, water", beh: "weakly repelled" },
  { id: "para", name: "Paramagnetic", chi: "χ > 0, small", t: "χ ∝ 1/T (Curie)", ex: "Al, O₂, Pt", beh: "weakly attracted" },
  { id: "ferro", name: "Ferromagnetic", chi: "χ ≫ 0, domains", t: "lost above Curie T → para", ex: "Fe, Co, Ni", beh: "strongly attracted" },
] as const;

function MagMatterLab() {
  const [i, setI] = useState(2);
  const m = MATS[i]!;
  return (
    <Shell
      title="Para, dia, ferro — the official three"
      lead="A bar magnet is a solenoid of similar shape, qualitatively. Torque m × B tries to align the dipole. Temperature: ferro dies at the Curie point; para obeys Curie; dia barely notices."
    >
      <div className="flex flex-wrap gap-2">
        {MATS.map((mat, k) => (
          <button
            key={mat.id}
            type="button"
            onClick={() => setI(k)}
            className={cn(
              "h-11 rounded-md border px-4 text-sm",
              i === k ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {mat.name}
          </button>
        ))}
      </div>
      <Readout
        items={[
          { k: "χ", v: m.chi },
          { k: "vs T", v: m.t },
          { k: "examples", v: m.ex },
          { k: "in a field", v: m.beh },
        ]}
      />
    </Shell>
  );
}

function RelationLab() {
  const [cell, setCell] = useState<boolean[]>(() => Array.from({ length: 9 }, (_, i) => i % 4 === 0));
  const at = (r: number, c: number) => cell[r * 3 + c]!;
  const reflexive = at(0, 0) && at(1, 1) && at(2, 2);
  const symmetric = [0, 1, 2].every((r) => [0, 1, 2].every((c) => at(r, c) === at(c, r)));
  let transitive = true;
  for (let a = 0; a < 3 && transitive; a++) {
    for (let b = 0; b < 3 && transitive; b++) {
      for (let c = 0; c < 3; c++) {
        if (at(a, b) && at(b, c) && !at(a, c)) {
          transitive = false;
          break;
        }
      }
    }
  }
  const labels = ["1", "2", "3"];

  return (
    <Shell
      title="A 3-element relation you can toggle"
      lead="Reflexive: diagonal all on. Symmetric: the matrix equals its transpose. Transitive: if aRb and bRc then aRc. Equivalence = all three — it partitions {1,2,3}."
    >
      <div className="mx-auto grid w-max grid-cols-[auto_repeat(3,2.75rem)] gap-1">
        <span />
        {labels.map((l) => (
          <span key={`c${l}`} className="text-center text-xs text-subtle">
            {l}
          </span>
        ))}
        {labels.map((l, r) => (
          <div key={`row${l}`} className="contents">
            <span className="flex items-center pr-2 text-xs text-subtle">{l}</span>
            {labels.map((_, c) => {
              const on = at(r, c);
              return (
                <button
                  key={`${r}${c}`}
                  type="button"
                  onClick={() =>
                    setCell((arr) => {
                      const next = arr.slice();
                      next[r * 3 + c] = !on;
                      return next;
                    })
                  }
                  className={cn(
                    "size-11 rounded-md border text-sm",
                    on ? "border-accent bg-accent text-accent-fg" : "border-border text-muted",
                  )}
                >
                  {on ? "1" : "0"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <Readout
        items={[
          { k: "reflexive", v: reflexive ? "yes" : "no" },
          { k: "symmetric", v: symmetric ? "yes" : "no" },
          { k: "transitive", v: transitive ? "yes" : "no" },
          { k: "equivalence", v: reflexive && symmetric && transitive ? "yes — a partition" : "not yet" },
        ]}
      />
    </Shell>
  );
}

export function WheatstoneLab() {
  const [p, setP] = useState(10);
  const [q, setQ] = useState(10);
  const [r, setR] = useState(5);
  const s = (q * r) / p;
  return (
    <Shell
      title="Wheatstone balance"
      lead="P/Q = R/S at balance. Galvanometer current is then zero, so its resistance does not matter. A meter bridge is this on a 100 cm wire: X/R = ℓ/(100−ℓ)."
      formula="P/Q=R/S"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 180">
          <line x1="180" y1="30" x2="80" y2="90" stroke={ink} />
          <line x1="180" y1="30" x2="280" y2="90" stroke={ink} />
          <line x1="80" y1="90" x2="180" y2="150" stroke={ink} />
          <line x1="280" y1="90" x2="180" y2="150" stroke={ink} />
          <line x1="80" y1="90" x2="280" y2="90" stroke={ok} strokeDasharray="4 3" />
          <text x="120" y="56" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            P
          </text>
          <text x="230" y="56" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            Q
          </text>
          <text x="120" y="140" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            R
          </text>
          <text x="230" y="140" fill={mute} fontSize="11" fontFamily="var(--font-sans)">
            S
          </text>
          <text x="180" y="86" fill={ok} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            G
          </text>
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="P" value={p} min={1} max={20} step={1} unit="Ω" onChange={setP} />
        <Slider label="Q" value={q} min={1} max={20} step={1} unit="Ω" onChange={setQ} />
        <Slider label="R" value={r} min={1} max={20} step={1} unit="Ω" onChange={setR} />
      </div>
      <Readout
        items={[
          { k: "S for balance", v: `${s.toFixed(2)} Ω` },
          { k: "P/Q", v: (p / q).toFixed(2) },
          { k: "R/S", v: (r / s).toFixed(2) },
          { k: "Ig", v: "0 at balance" },
        ]}
      />
    </Shell>
  );
}

export function KeplerLab() {
  const [a, setA] = useState(1.5);
  const T = Math.sqrt(a * a * a);
  const e = 0.4;
  const rx = 140 * a;
  const ry = rx * Math.sqrt(1 - e * e);
  return (
    <Shell
      title="Kepler III on an ellipse"
      lead="T² ∝ a³. The sun sits at one focus, not the centre. Equal areas in equal times is angular-momentum conservation. For a circle, Newton gives T² = 4π² r³ / (GM)."
      formula="T^2 \propto a^3"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <ellipse cx="180" cy="100" rx={Math.min(rx, 150)} ry={Math.min(ry, 80)} stroke={ink} />
          <circle cx={180 - Math.min(rx, 150) * e} cy="100" r="5" fill={ok} />
          <text x="180" y="188" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            sun at a focus
          </text>
        </Svg>
      </div>
      <Slider label="Semi-major a (AU, relative)" value={a} min={0.6} max={2.2} step={0.1} onChange={setA} />
      <Readout
        items={[
          { k: "a³", v: (a ** 3).toFixed(2) },
          { k: "T (relative)", v: T.toFixed(2) },
          { k: "T²", v: (T * T).toFixed(2) },
          { k: "e", v: String(e) },
        ]}
      />
    </Shell>
  );
}

export const MORE_LABS: Record<string, () => React.ReactNode> = {
  "phy-wep": () => <CollisionLab />,
  "math-sets": () => <VennLab />,
  "math-rel-11": () => <FunctionsLab />,
  "math-rel-12": () => <RelationLab />,
  "math-ineq": () => <IneqLab />,
  "math-stats": () => <StatsLab />,
  "math-prob-11": () => <VennLab />,
  "phy-semiconductors": () => <DiodeLab />,
  "phy-emw": () => <SpectrumLab />,
  "phy-mag-matter": () => <MagMatterLab />,
};
