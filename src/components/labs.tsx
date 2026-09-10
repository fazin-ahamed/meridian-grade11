import { useMemo, useState } from "react";
import { KeplerLab, MORE_LABS, WheatstoneLab } from "@/components/labs-more";
import { ChemistryLab, hasChemistryLab } from "@/components/chemistry-labs";
import { LabGuidance, LabProvider } from "@/components/lab-guidance";
import { TeX } from "@/components/tex";
import { cn } from "@/lib/utils";

const ink = "currentColor";
const mute = "var(--color-muted)";
const ok = "var(--color-ok)";
const G = 10;

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

function ProjectileLab() {
  const [u, setU] = useState(20);
  const [th, setTh] = useState(45);
  const rad = (th * Math.PI) / 180;
  const T = (2 * u * Math.sin(rad)) / G;
  const R = (u * u * Math.sin(2 * rad)) / G;
  const H = (u * u * Math.sin(rad) ** 2) / (2 * G);
  const pts = useMemo(() => {
    const n = 40;
    const out: string[] = [];
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * T;
      const x = u * Math.cos(rad) * t;
      const y = u * Math.sin(rad) * t - 0.5 * G * t * t;
      const px = 28 + (x / Math.max(R, 1)) * 300;
      const py = 170 - (y / Math.max(H, 1)) * 120;
      out.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return out.join(" ");
  }, [T, R, H, u, rad]);

  return (
    <Shell
      title="Projectile on level ground"
      lead="Drag launch speed and angle. Complementary angles share range; 45° maximises R. g is 10 m/s² so the arithmetic matches JEE."
      formula="R = u^2\sin 2\theta/g,\quad H = u^2\sin^2\theta/(2g),\quad T = 2u\sin\theta/g"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="20" y1="170" x2="340" y2="170" stroke={mute} />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" fill="none" />
          <line x1="28" y1="170" x2="28" y2={170 - 120} stroke={mute} strokeDasharray="4 3" />
          <circle cx="28" cy="170" r="3" fill={ink} />
          <text x="180" y="188" fill={mute} fontSize="11" textAnchor="middle" fontFamily="var(--font-sans)">
            range
          </text>
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="Launch speed u" value={u} min={8} max={40} step={1} unit="m/s" onChange={setU} />
        <Slider label="Angle θ" value={th} min={15} max={75} step={1} unit="°" onChange={setTh} />
      </div>
      <Readout
        items={[
          { k: "Time of flight", v: `${T.toFixed(2)} s` },
          { k: "Range", v: `${R.toFixed(1)} m` },
          { k: "Max height", v: `${H.toFixed(1)} m` },
          { k: "Complement", v: `${90 - th}° same R` },
        ]}
      />
    </Shell>
  );
}

function VtGraphLab() {
  const [a, setA] = useState(2);
  const [u, setU] = useState(4);
  const [t, setT] = useState(6);
  const v = u + a * t;
  const s = u * t + 0.5 * a * t * t;
  const vMax = Math.max(Math.abs(u), Math.abs(u + a * 10), 8);
  const x2 = 40 + t * 28;
  const y1 = 140 - (u / vMax) * 90;
  const y2 = 140 - (v / vMax) * 90;

  return (
    <Shell
      title="Uniform acceleration on a v–t graph"
      lead="Slope is acceleration. Area under the segment is displacement (signed). Distance is the area of the absolute graph — they differ if v crosses zero."
      formula="v = u + at,\quad s = ut + \tfrac12 at^2 = \text{area under }v\text{–}t"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="30" y1="140" x2="340" y2="140" stroke={mute} />
          <line x1="40" y1="20" x2="40" y2="180" stroke={mute} />
          <line x1="40" y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="1.8" />
          <circle cx="40" cy={y1} r="3" fill={ink} />
          <circle cx={x2} cy={y2} r="3" fill={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="u" value={u} min={-10} max={20} step={1} unit="m/s" onChange={setU} />
        <Slider label="a" value={a} min={-6} max={8} step={0.5} unit="m/s²" onChange={setA} />
        <Slider label="t" value={t} min={1} max={10} step={0.5} unit="s" onChange={setT} />
      </div>
      <Readout
        items={[
          { k: "v", v: `${v.toFixed(1)} m/s` },
          { k: "displacement", v: `${s.toFixed(1)} m` },
          { k: "slope", v: `${a} m/s²` },
          { k: "distance = |s|?", v: v * u < 0 ? "no, split the area" : "yes here" },
        ]}
      />
    </Shell>
  );
}

function InclineLab() {
  const [th, setTh] = useState(30);
  const [mu, setMu] = useState(0.2);
  const rad = (th * Math.PI) / 180;
  const aDown = G * (Math.sin(rad) - mu * Math.cos(rad));
  const aUp = G * (Math.sin(rad) + mu * Math.cos(rad));
  const start = Math.tan(rad) > mu;

  return (
    <Shell
      title="Rough incline — FBD"
      lead="mg into components, N = mg cosθ, friction μN up the plane if sliding down. Motion starts only if tanθ > μ (static = kinetic here)."
      formula="a = g(\sin\theta - \mu\cos\theta)\ \text{down the plane}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <path d={`M40 170 L 320 170 L 320 ${170 - Math.tan(rad) * 260} Z`} stroke={ink} />
          <rect
            x="168"
            y={118 - Math.tan(rad) * 40}
            width="40"
            height="28"
            transform={`rotate(${-th} 188 ${132 - Math.tan(rad) * 40})`}
            stroke={ok}
          />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="θ" value={th} min={5} max={55} step={1} unit="°" onChange={setTh} />
        <Slider label="μ" value={mu} min={0} max={0.8} step={0.05} onChange={setMu} />
      </div>
      <Readout
        items={[
          { k: "a down", v: `${aDown.toFixed(2)} m/s²` },
          { k: "a up (if pushed)", v: `${aUp.toFixed(2)} m/s²` },
          { k: "tanθ > μ?", v: start ? "slides" : "stays" },
          { k: "N", v: `${(G * Math.cos(rad)).toFixed(1)} N/kg` },
        ]}
      />
    </Shell>
  );
}

function BankingLab() {
  const [v, setV] = useState(20);
  const [r, setR] = useState(50);
  const th = (Math.atan((v * v) / (r * G)) * 180) / Math.PI;

  return (
    <Shell
      title="Banking without friction"
      lead="N supplies both the weight and the centripetal force. tanθ = v²/(rg). Friction widens the safe-speed window — that is the next question."
      formula="\tan\theta = v^2/(rg)"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 160">
          <line x1="40" y1="120" x2="320" y2={120 - (th / 50) * 70} stroke={ink} strokeWidth="3" />
          <circle cx="180" cy={120 - (th / 50) * 35} r="12" stroke={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="v" value={v} min={5} max={40} step={1} unit="m/s" onChange={setV} />
        <Slider label="r" value={r} min={20} max={120} step={5} unit="m" onChange={setR} />
      </div>
      <Readout
        items={[
          { k: "θ", v: `${th.toFixed(1)}°` },
          { k: "v²/rg", v: ((v * v) / (r * G)).toFixed(2) },
          { k: "g", v: `${G} m/s²` },
          { k: "with friction", v: "v² = rg tan(θ±α)" },
        ]}
      />
    </Shell>
  );
}

function ShmLab() {
  const [A, setA] = useState(8);
  const [k, setK] = useState(40);
  const [mass, setMass] = useState(1);
  const omega = Math.sqrt(k / mass);
  const T = (2 * Math.PI) / omega;
  const E = 0.5 * k * (A / 100) ** 2;
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * T;
      const x = 30 + (t / T) * 300;
      const y = 100 - ((A / 12) * 70) * Math.sin(omega * t);
      out.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return out.join(" ");
  }, [A, T, omega]);

  return (
    <Shell
      title="Mass–spring SHM"
      lead="x = A sin(ωt+φ). Energy ½ k A² is constant; it sloshes between K and U. g only shifts the hanging-spring equilibrium — T is still 2π√(m/k)."
      formula="T=2\pi\sqrt{m/k},\quad E=\tfrac12 k A^2,\quad v=\omega\sqrt{A^2-x^2}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="30" y1="100" x2="340" y2="100" stroke={mute} />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" fill="none" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="A" value={A} min={2} max={12} step={0.5} unit="cm" onChange={setA} />
        <Slider label="k" value={k} min={10} max={120} step={5} unit="N/m" onChange={setK} />
        <Slider label="m" value={mass} min={0.2} max={4} step={0.1} unit="kg" onChange={setMass} />
      </div>
      <Readout
        items={[
          { k: "ω", v: `${omega.toFixed(2)} rad/s` },
          { k: "T", v: `${T.toFixed(2)} s` },
          { k: "E", v: `${E.toFixed(3)} J` },
          { k: "v_max", v: `${((omega * A) / 100).toFixed(2)} m/s` },
        ]}
      />
    </Shell>
  );
}

function GaussLab() {
  const [Q, setQ] = useState(4);
  const [R, setR] = useState(6);
  const [r, setRpt] = useState(4);
  const k = 9;
  const E = r >= R ? (k * Q) / (r * r) : (k * Q * r) / (R * R * R);

  return (
    <Shell
      title="Gauss: insulating sphere"
      lead="Outside, the sphere is a point. Inside, Q_encl ∝ r³ so E ∝ r. Drag the field point through the surface and watch the formula switch."
      formula="E_{\mathrm{out}}=\frac1{4\pi\varepsilon_0}\frac{Q}{r^2},\quad E_{\mathrm{in}}=\frac1{4\pi\varepsilon_0}\frac{Q r}{R^3}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 180">
          <circle cx="160" cy="90" r={R * 8} stroke={ink} />
          <circle cx={160 + r * 8} cy="90" r="4" fill={ok} />
          <line x1="160" y1="90" x2={160 + r * 8} y2="90" stroke={mute} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="Q (teaching)" value={Q} min={1} max={10} step={0.5} onChange={setQ} />
        <Slider label="R" value={R} min={3} max={10} step={0.5} onChange={setR} />
        <Slider label="r (field point)" value={r} min={0.5} max={14} step={0.5} onChange={setRpt} />
      </div>
      <Readout
        items={[
          { k: "region", v: r >= R ? "outside" : "inside" },
          { k: "E (arb)", v: E.toFixed(2) },
          { k: "Q_encl", v: r >= R ? "all Q" : `Q (r/R)³` },
          { k: "sheet contrast", v: "σ/2ε₀ vs σ/ε₀" },
        ]}
      />
    </Shell>
  );
}

function CapacitorLab() {
  const [kappa, setKappa] = useState(2);
  const [connected, setConnected] = useState(1);
  const C0 = 4;
  const C = kappa * C0;
  const V0 = 12;
  const V = connected ? V0 : V0 / kappa;
  const U0 = 0.5 * C0 * V0 * V0;
  const U = 0.5 * C * V * V;

  return (
    <Shell
      title="Dielectric: battery connected vs isolated"
      lead="Connected: V fixed, Q and U rise by κ. Isolated: Q fixed, V and U fall. This pair is the highest-yield capacitor trap in Main."
      formula="C=\kappa\varepsilon_0 A/d,\quad U=\tfrac12 CV^2"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="κ" value={kappa} min={1} max={6} step={0.5} onChange={setKappa} />
        <Slider label="battery (1) / isolated (0)" value={connected} min={0} max={1} step={1} onChange={setConnected} />
      </div>
      <Readout
        items={[
          { k: "C", v: `${C.toFixed(1)} μF` },
          { k: "V", v: `${V.toFixed(2)} V` },
          { k: "U / U₀", v: (U / U0).toFixed(2) },
          { k: "mode", v: connected ? "V fixed" : "Q fixed" },
        ]}
      />
    </Shell>
  );
}

function YdseLab() {
  const [lam, setLam] = useState(500);
  const [d, setD] = useState(0.5);
  const [D, setBigD] = useState(1);
  const beta = ((lam * 1e-9) * D) / (d * 1e-3);
  const nFringe = 8;
  const spacing = Math.min(280 / nFringe, beta * 8000);

  return (
    <Shell
      title="Young’s double slit"
      lead="Fringe width β = λD/d. Coherent sources from one parent wave. A glass slab of thickness t shifts the pattern by (μ−1)t D/d toward the slab."
      formula="\beta=\lambda D/d"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 140">
          {Array.from({ length: nFringe }, (_, i) => (
            <line
              key={i}
              x1={40 + i * spacing}
              y1="30"
              x2={40 + i * spacing}
              y2="110"
              stroke={i % 2 === 0 ? ink : mute}
              strokeWidth={i % 2 === 0 ? 3 : 1}
            />
          ))}
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="λ" value={lam} min={400} max={700} step={10} unit="nm" onChange={setLam} />
        <Slider label="d" value={d} min={0.2} max={1.2} step={0.05} unit="mm" onChange={setD} />
        <Slider label="D" value={D} min={0.5} max={2} step={0.1} unit="m" onChange={setBigD} />
      </div>
      <Readout
        items={[
          { k: "β", v: `${(beta * 1e3).toFixed(2)} mm` },
          { k: "narrower d", v: "wider fringes" },
          { k: "coherence", v: "required" },
          { k: "central max", v: "path equal" },
        ]}
      />
    </Shell>
  );
}

function LensLab() {
  const [u, setU] = useState(-30);
  const [f, setF] = useState(10);
  const v = 1 / (1 / f + 1 / u);
  const m = v / u;

  return (
    <Shell
      title="Thin lens, New Cartesian signs"
      lead="Real object to the left: u is negative. 1/v − 1/u = 1/f. Magnification m = v/u. Combination in contact: 1/F = 1/f₁+1/f₂."
      formula="\frac1v-\frac1u=\frac1f,\quad m=v/u"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 140">
          <line x1="180" y1="20" x2="180" y2="120" stroke={ink} />
          <ellipse cx="180" cy="70" rx="8" ry="50" stroke={ok} />
          <circle cx={180 + u * 3} cy="70" r="4" fill={ink} />
          {Number.isFinite(v) && <circle cx={180 + v * 3} cy="70" r="4" fill={ok} />}
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="u (cm, New Cartesian)" value={u} min={-80} max={-8} step={1} onChange={setU} />
        <Slider label="f (cm)" value={f} min={6} max={30} step={1} onChange={setF} />
      </div>
      <Readout
        items={[
          { k: "v", v: Number.isFinite(v) ? `${v.toFixed(1)} cm` : "∞" },
          { k: "m", v: Number.isFinite(m) ? m.toFixed(2) : "—" },
          { k: "image", v: v > 0 ? "real, opposite" : "virtual, same side" },
          { k: "power", v: `${(100 / f).toFixed(1)} D` },
        ]}
      />
    </Shell>
  );
}

function PhotoLab() {
  const [nu, setNu] = useState(8);
  const [phi, setPhi] = useState(2);
  const h = 4.14;
  const K = h * nu - phi;
  const V0 = K > 0 ? K : 0;

  return (
    <Shell
      title="Einstein photoelectric equation"
      lead="hν = φ + K_max. Below threshold, nothing — intensity does not help. V₀ vs ν is a straight line of slope h/e. Saturation current ∝ intensity."
      formula="h\nu=\phi+K_{\max},\quad eV_0=K_{\max}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="ν (10¹⁴ Hz teaching)" value={nu} min={1} max={16} step={0.5} onChange={setNu} />
        <Slider label="φ (eV)" value={phi} min={1} max={5} step={0.1} onChange={setPhi} />
      </div>
      <Readout
        items={[
          { k: "K_max", v: K > 0 ? `${K.toFixed(2)} eV` : "0 (below threshold)" },
          { k: "V₀", v: `${V0.toFixed(2)} V` },
          { k: "threshold", v: K > 0 ? "above" : "below" },
          { k: "intensity", v: "changes current, not V₀" },
        ]}
      />
    </Shell>
  );
}

function BohrLab() {
  const [n, setN] = useState(2);
  const [Z, setZ] = useState(1);
  const r = (n * n) / Z;
  const E = (-13.6 * Z * Z) / (n * n);

  return (
    <Shell
      title="Bohr hydrogen-like atom"
      lead="r_n = n² a₀ / Z, E_n = −13.6 Z²/n² eV. Lyman to n=1 (UV), Balmer to n=2 (visible), Paschen to n=3 (IR)."
      formula="r_n=n^2 a_0/Z,\quad E_n=-13.6\,Z^2/n^2\ \mathrm{eV}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 180">
          <circle cx="180" cy="90" r="6" fill={ink} />
          {Array.from({ length: n }, (_, i) => (
            <circle key={i} cx="180" cy="90" r={18 + i * 18} stroke={i === n - 1 ? ok : mute} />
          ))}
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="n" value={n} min={1} max={6} step={1} onChange={setN} />
        <Slider label="Z" value={Z} min={1} max={3} step={1} onChange={setZ} />
      </div>
      <Readout
        items={[
          { k: "r / a₀", v: r.toFixed(2) },
          { k: "E", v: `${E.toFixed(2)} eV` },
          { k: "series to n=2", v: "Balmer (visible)" },
          { k: "photon n→1", v: `${(13.6 * Z * Z * (1 - 1 / (n * n))).toFixed(2)} eV` },
        ]}
      />
    </Shell>
  );
}

function RcLab() {
  const [R, setR] = useState(4);
  const [C, setC] = useState(2);
  const [t, setT] = useState(2);
  const tau = R * C;
  const qFrac = 1 - Math.exp(-t / tau);

  return (
    <Shell
      title="RC charging"
      lead="τ = RC. After one time constant the capacitor holds 63% of Q₀. Discharging is the exponential decay. This is the Main extra on current electricity."
      formula="q=q_0(1-e^{-t/RC}),\quad \tau=RC"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <Slider label="R (kΩ)" value={R} min={1} max={10} step={0.5} onChange={setR} />
        <Slider label="C (μF)" value={C} min={0.5} max={8} step={0.5} onChange={setC} />
        <Slider label="t (ms teaching)" value={t} min={0.2} max={12} step={0.2} onChange={setT} />
      </div>
      <Readout
        items={[
          { k: "τ", v: `${tau.toFixed(1)}` },
          { k: "q/q₀", v: qFrac.toFixed(3) },
          { k: "t = τ", v: "63%" },
          { k: "t = 5τ", v: "~ fully charged" },
        ]}
      />
    </Shell>
  );
}

function LcrLab() {
  const [L, setL] = useState(2);
  const [C, setC] = useState(2);
  const [R, setR] = useState(4);
  const [f, setF] = useState(50);
  const w = 2 * Math.PI * f;
  const XL = w * L;
  const XC = 1 / (w * C);
  const Z = Math.sqrt(R * R + (XL - XC) ** 2);
  const w0 = 1 / Math.sqrt(L * C);
  const Qf = (w0 * L) / R;

  return (
    <Shell
      title="Series LCR phasors"
      lead="Z = √[R²+(X_L−X_C)²]. Resonance ω₀ = 1/√(LC), Z = R, current max. Average power V_rms I_rms cosφ. Wattless current is I sinφ."
      formula="Z=\sqrt{R^2+(X_L-X_C)^2},\quad \omega_0=1/\sqrt{LC}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="L (H teaching)" value={L} min={0.5} max={6} step={0.1} onChange={setL} />
        <Slider label="C (F teaching)" value={C} min={0.5} max={6} step={0.1} onChange={setC} />
        <Slider label="R" value={R} min={1} max={12} step={0.5} onChange={setR} />
        <Slider label="f (Hz teaching)" value={f} min={5} max={120} step={1} onChange={setF} />
      </div>
      <Readout
        items={[
          { k: "Z", v: Z.toFixed(2) },
          { k: "X_L − X_C", v: (XL - XC).toFixed(2) },
          { k: "f₀", v: `${(w0 / (2 * Math.PI)).toFixed(2)} Hz` },
          { k: "Q", v: Qf.toFixed(2) },
        ]}
      />
    </Shell>
  );
}

function SatelliteLab() {
  const [alt, setAlt] = useState(0.05);
  const R = 1;
  const r = R + alt;
  const g = 1 / (r * r);
  const v = Math.sqrt(1 / r);
  const T = 2 * Math.PI * Math.sqrt(r * r * r);

  return (
    <Shell
      title="Orbit around a planet"
      lead="Teaching units GM = 1, R = 1. Circular: v = √(GM/r), T² ∝ r³, E = −GMm/(2r). Escape is √2 times orbital speed at that r."
      formula="v=\sqrt{GM/r},\quad T^2\propto r^3,\quad E=-GMm/(2r)"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 180">
          <circle cx="180" cy="90" r="28" stroke={ink} />
          <circle cx="180" cy="90" r={28 + alt * 180} stroke={ok} strokeDasharray="4 3" />
          <circle cx={180 + 28 + alt * 180} cy="90" r="4" fill={ok} />
        </Svg>
      </div>
      <Slider label="altitude / R" value={alt} min={0.02} max={0.8} step={0.01} onChange={setAlt} />
      <Readout
        items={[
          { k: "g / g_s", v: g.toFixed(3) },
          { k: "v_orb (arb)", v: v.toFixed(3) },
          { k: "T (arb)", v: T.toFixed(2) },
          { k: "v_esc / v_orb", v: "√2" },
        ]}
      />
    </Shell>
  );
}

function BernoulliLab() {
  const [A1, setA1] = useState(4);
  const [A2, setA2] = useState(1);
  const [v1, setV1] = useState(2);
  const v2 = (A1 / A2) * v1;
  const dP = 0.5 * 1000 * (v2 * v2 - v1 * v1);

  return (
    <Shell
      title="Continuity + Bernoulli"
      lead="A v = const. Narrower ⇒ faster ⇒ lower pressure (Venturi). Torricelli is Bernoulli at a tank: v = √(2gh)."
      formula="A_1 v_1 = A_2 v_2,\quad P+\tfrac12\rho v^2+\rho g h=\mathrm{const}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 140">
          <path d={`M40 ${70 - A1 * 6} H 160 L 220 ${70 - A2 * 8} H 320 L 320 ${70 + A2 * 8} H 220 L 160 ${70 + A1 * 6} H 40 Z`} stroke={ink} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="A₁" value={A1} min={2} max={8} step={0.5} onChange={setA1} />
        <Slider label="A₂" value={A2} min={0.5} max={3} step={0.1} onChange={setA2} />
        <Slider label="v₁" value={v1} min={0.5} max={6} step={0.5} unit="m/s" onChange={setV1} />
      </div>
      <Readout
        items={[
          { k: "v₂", v: `${v2.toFixed(2)} m/s` },
          { k: "ΔP (Pa, water)", v: dP.toFixed(0) },
          { k: "Venturi", v: "P drops in the throat" },
          { k: "Torricelli", v: "√(2gh)" },
        ]}
      />
    </Shell>
  );
}

function UnitCircleLab() {
  const [deg, setDeg] = useState(30);
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  return (
    <Shell
      title="Unit circle — the definition of sin and cos"
      lead="Point at angle x from the positive x-axis is (cos x, sin x). Radians in every calculus formula. Signs follow the quadrant."
      formula="\sin^2 x+\cos^2 x=1,\quad x^\circ = x\pi/180"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 200">
          <circle cx="180" cy="100" r="70" stroke={ink} />
          <line x1="180" y1="100" x2={180 + 70 * c} y2={100 - 70 * s} stroke={ok} />
          <circle cx={180 + 70 * c} cy={100 - 70 * s} r="4" fill={ok} />
          <line x1="100" y1="100" x2="260" y2="100" stroke={mute} />
          <line x1="180" y1="20" x2="180" y2="180" stroke={mute} />
        </Svg>
      </div>
      <Slider label="angle" value={deg} min={-180} max={180} step={5} unit="°" onChange={setDeg} />
      <Readout
        items={[
          { k: "radians", v: rad.toFixed(3) },
          { k: "cos", v: c.toFixed(3) },
          { k: "sin", v: s.toFixed(3) },
          { k: "tan", v: Math.abs(c) < 1e-6 ? "undef" : (s / c).toFixed(3) },
        ]}
      />
    </Shell>
  );
}

function ArgandLab() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const r = Math.hypot(a, b);
  const arg = (Math.atan2(b, a) * 180) / Math.PI;

  return (
    <Shell
      title="Argand plane"
      lead="z = a+ib is the point (a,b). |z| = √(a²+b²), arg = atan2(b,a). Multiplication adds arguments and multiplies moduli — De Moivre lives here."
      formula="z=re^{i\theta},\quad |z_1 z_2|=|z_1||z_2|"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 200">
          <line x1="40" y1="100" x2="320" y2="100" stroke={mute} />
          <line x1="180" y1="20" x2="180" y2="180" stroke={mute} />
          <line x1="180" y1="100" x2={180 + a * 18} y2={100 - b * 18} stroke={ink} />
          <circle cx={180 + a * 18} cy={100 - b * 18} r="4" fill={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="Re z" value={a} min={-6} max={6} step={0.5} onChange={setA} />
        <Slider label="Im z" value={b} min={-6} max={6} step={0.5} onChange={setB} />
      </div>
      <Readout
        items={[
          { k: "|z|", v: r.toFixed(2) },
          { k: "arg", v: `${arg.toFixed(1)}°` },
          { k: "z̄", v: `${a} − ${b}i` },
          { k: "z z̄", v: (r * r).toFixed(2) },
        ]}
      />
    </Shell>
  );
}

function EllipseLab() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const e = a > b ? Math.sqrt(1 - (b * b) / (a * a)) : 0;

  return (
    <Shell
      title="Standard ellipse"
      lead="x²/a² + y²/b² = 1. e = √(1−b²/a²), foci (±ae, 0). Circle is e = 0. Parabola e = 1, hyperbola e > 1."
      formula="\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\quad e=\sqrt{1-b^2/a^2}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 180">
          <ellipse cx="180" cy="90" rx={a * 18} ry={b * 18} stroke={ink} />
          <circle cx={180 + a * 18 * e} cy="90" r="3" fill={ok} />
          <circle cx={180 - a * 18 * e} cy="90" r="3" fill={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="a" value={a} min={2} max={8} step={0.1} onChange={setA} />
        <Slider label="b" value={b} min={1} max={a} step={0.1} onChange={setB} />
      </div>
      <Readout
        items={[
          { k: "e", v: e.toFixed(3) },
          { k: "ae", v: (a * e).toFixed(2) },
          { k: "area", v: `${(Math.PI * a * b).toFixed(1)}` },
          { k: "circle when", v: "a = b" },
        ]}
      />
    </Shell>
  );
}

function TangentLab() {
  const [x0, setX0] = useState(1);
  const y = x0 * x0;
  const m = 2 * x0;

  return (
    <Shell
      title="Derivative as the slope of the tangent"
      lead="For y = x², f'(x) = 2x. Drag the point; the tangent is the limit of the secant. That is the Class 11 definition, and the Class 12 chain rule is the same idea composed."
      formula="f'(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="170" x2="330" y2="170" stroke={mute} />
          <path d="M50 165 Q 180 20 310 165" stroke={ink} />
          <line
            x1={80 + x0 * 50}
            y1={160 - y * 18}
            x2={80 + x0 * 50 + 40}
            y2={160 - y * 18 - m * 12}
            stroke={ok}
          />
          <circle cx={80 + x0 * 50} cy={160 - y * 18} r="4" fill={ok} />
        </Svg>
      </div>
      <Slider label="x" value={x0} min={-1.5} max={2.2} step={0.1} onChange={setX0} />
      <Readout
        items={[
          { k: "y = x²", v: y.toFixed(2) },
          { k: "slope 2x", v: m.toFixed(2) },
          { k: "increasing?", v: m >= 0 ? "yes" : "no" },
          { k: "local min", v: "x = 0" },
        ]}
      />
    </Shell>
  );
}

function AreaLab() {
  const [b, setB] = useState(2);
  const area = (b * b * b) / 3;

  return (
    <Shell
      title="Area under y = x²"
      lead="∫₀ᵇ x² dx = b³/3. Official AOI is this idea on a line, a circle, a parabola or an ellipse in standard form. Split at zeros if the curve crosses the axis."
      formula="\int_0^b x^2\,dx = b^3/3"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="170" x2="330" y2="170" stroke={mute} />
          <path d="M50 170 Q 140 40 260 20" stroke={ink} />
          <path d={`M50 170 L 50 170 Q ${50 + b * 50} ${170 - b * b * 18} ${50 + b * 80} ${170 - b * b * 12} L ${50 + b * 80} 170 Z`} stroke={ok} fill={ok} opacity="0.2" />
        </Svg>
      </div>
      <Slider label="b" value={b} min={0.5} max={3} step={0.1} onChange={setB} />
      <Readout
        items={[
          { k: "area", v: area.toFixed(3) },
          { k: "ellipse full", v: "πab" },
          { k: "FTC", v: "d/dx ∫_a^x f = f(x)" },
          { k: "split", v: "at every zero" },
        ]}
      />
    </Shell>
  );
}

function VectorLab() {
  const [ax, setAx] = useState(3);
  const [ay, setAy] = useState(1);
  const [bx, setBx] = useState(-1);
  const [by, setBy] = useState(2);
  const dot = ax * bx + ay * by;
  const cross = ax * by - ay * bx;
  const ang = (Math.acos(Math.min(1, Math.max(-1, dot / (Math.hypot(ax, ay) * Math.hypot(bx, by))))) * 180) / Math.PI;

  return (
    <Shell
      title="Dot and cross in a plane"
      lead="Dot = |a||b|cosθ, used for angle and perpendicularity. Cross magnitude is the parallelogram area. In 3-D the cross is a vector; here we plot the signed area."
      formula="\vec a\cdot\vec b=|a||b|\cos\theta,\quad |\vec a\times\vec b|=|a||b|\sin\theta"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 200">
          <line x1="40" y1="160" x2="330" y2="160" stroke={mute} />
          <line x1="60" y1="20" x2="60" y2="180" stroke={mute} />
          <line x1="60" y1="160" x2={60 + ax * 28} y2={160 - ay * 28} stroke={ink} />
          <line x1="60" y1="160" x2={60 + bx * 28} y2={160 - by * 28} stroke={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="a_x" value={ax} min={-4} max={5} step={0.5} onChange={setAx} />
        <Slider label="a_y" value={ay} min={-4} max={5} step={0.5} onChange={setAy} />
        <Slider label="b_x" value={bx} min={-4} max={5} step={0.5} onChange={setBx} />
        <Slider label="b_y" value={by} min={-4} max={5} step={0.5} onChange={setBy} />
      </div>
      <Readout
        items={[
          { k: "a·b", v: dot.toFixed(2) },
          { k: "|a×b|", v: Math.abs(cross).toFixed(2) },
          { k: "angle", v: `${ang.toFixed(1)}°` },
          { k: "perp?", v: Math.abs(dot) < 0.05 ? "yes" : "no" },
        ]}
      />
    </Shell>
  );
}

function ThermoLab() {
  const [n, setN] = useState(1.4);
  const [V2, setV2] = useState(2);
  const P2iso = 1 / V2;
  const P2ad = Math.pow(V2, -n);

  return (
    <Shell
      title="Isotherm vs adiabatic on P–V"
      lead="Isotherm PV = const. Adiabatic PV^γ = const, steeper. Clockwise cycle = engine, W_net = area. Free expansion is not on this diagram (P is not uniform)."
      formula="PV=\mathrm{const}\ (\mathrm{isoT}),\quad PV^\gamma=\mathrm{const}\ (\mathrm{adiabatic})"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="170" x2="330" y2="170" stroke={mute} />
          <line x1="40" y1="20" x2="40" y2="170" stroke={mute} />
          <path d="M60 40 Q 140 80 280 150" stroke={ink} />
          <path d="M60 40 Q 120 100 240 160" stroke={ok} />
          <circle cx={60 + Math.log2(V2) * 80} cy={170 - P2iso * 120} r="3" fill={ink} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="γ (adiabatic)" value={n} min={1.1} max={1.67} step={0.01} onChange={setN} />
        <Slider label="V₂ / V₁" value={V2} min={1.1} max={4} step={0.1} onChange={setV2} />
      </div>
      <Readout
        items={[
          { k: "P₂ / P₁ isoT", v: P2iso.toFixed(2) },
          { k: "P₂ / P₁ adiab", v: P2ad.toFixed(2) },
          { k: "steeper", v: "adiabatic" },
          { k: "Carnot η", v: "1 − T_C/T_H" },
        ]}
      />
    </Shell>
  );
}

function StandingLab() {
  const [n, setN] = useState(1);
  const [closed, setClosed] = useState(0);
  const L = 1;
  const harmonic = closed ? 2 * n - 1 : n;
  const lam = closed ? (4 * L) / harmonic : (2 * L) / harmonic;
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = i / 40;
      const y = Math.sin(((closed ? 0.5 : 1) * harmonic * Math.PI) * x);
      out.push(`${40 + x * 280},${100 - y * 60}`);
    }
    return out.join(" ");
  }, [harmonic, closed]);

  return (
    <Shell
      title="Standing waves: string vs closed pipe"
      lead="Fixed–fixed string: n λ/2 = L, all harmonics. Closed pipe: only odd harmonics, λ/4 = L for the fundamental. End correction 0.6 r per open end."
      formula="f_n = nv/(2L)\ \text{(string / open)},\quad f=(2n-1)v/(4L)\ \text{(closed)}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="100" x2="320" y2="100" stroke={mute} />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" fill="none" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="n (1,2,3…)" value={n} min={1} max={5} step={1} onChange={setN} />
        <Slider label="open string (0) / closed pipe (1)" value={closed} min={0} max={1} step={1} onChange={setClosed} />
      </div>
      <Readout
        items={[
          { k: "harmonic", v: String(harmonic) },
          { k: "λ / L", v: lam.toFixed(2) },
          { k: "nodes", v: closed ? "closed end" : "both ends" },
          { k: "missing?", v: closed ? "even harmonics" : "none" },
        ]}
      />
    </Shell>
  );
}

function LppLab() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const feasible = x >= 0 && y >= 0 && x + y <= 6 && x <= 4 && y <= 5;
  const Z = 3 * x + 2 * y;

  return (
    <Shell
      title="Linear programming — corner point"
      lead="Constraints: x≥0, y≥0, x+y≤6, x≤4, y≤5. Z = 3x+2y. The max/min of a linear Z on a polygon lives at a vertex. Drag (x,y); the lab flags infeasible points."
      formula="Z=ax+by\ \text{attains max/min at a feasible corner}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="x" value={x} min={0} max={6} step={0.1} onChange={setX} />
        <Slider label="y" value={y} min={0} max={6} step={0.1} onChange={setY} />
      </div>
      <Readout
        items={[
          { k: "feasible?", v: feasible ? "yes" : "no" },
          { k: "Z = 3x+2y", v: Z.toFixed(1) },
          { k: "corners", v: "(0,0) (4,0) (4,2) (1,5) (0,5)" },
          { k: "max here", v: "check corners" },
        ]}
      />
    </Shell>
  );
}

function BayesLab() {
  const [pE, setPE] = useState(0.3);
  const [pAE, setPAE] = useState(0.8);
  const [pAEc, setPAEc] = useState(0.1);
  const pA = pE * pAE + (1 - pE) * pAEc;
  const post = (pE * pAE) / pA;

  return (
    <Shell
      title="Bayes’ theorem"
      lead="Prior P(E), likelihoods P(A|E) and P(A|Eᶜ). Posterior P(E|A) = prior × likelihood / total probability. This is the Class 12 probability spine."
      formula="P(E|A)=\frac{P(E)P(A|E)}{P(E)P(A|E)+P(E^c)P(A|E^c)}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <Slider label="P(E) prior" value={pE} min={0.05} max={0.95} step={0.05} onChange={setPE} />
        <Slider label="P(A|E)" value={pAE} min={0.05} max={1} step={0.05} onChange={setPAE} />
        <Slider label="P(A|Eᶜ)" value={pAEc} min={0.05} max={1} step={0.05} onChange={setPAEc} />
      </div>
      <Readout
        items={[
          { k: "P(A)", v: pA.toFixed(3) },
          { k: "P(E|A)", v: post.toFixed(3) },
          { k: "prior", v: pE.toFixed(2) },
          { k: "shift", v: post > pE ? "up" : "down" },
        ]}
      />
    </Shell>
  );
}

function DecayLab() {
  const [lam, setLam] = useState(0.7);
  const [t, setT] = useState(1);
  const frac = Math.exp(-lam * t);
  const T12 = Math.LN2 / lam;

  return (
    <Shell
      title="Radioactive decay"
      lead="N = N₀ e^{−λt}. Half-life T½ = ln2 / λ. Activity A = λN. Mean life = 1/λ. BE per nucleon peaks near ⁵⁶Fe — fission and fusion both run downhill from there."
      formula="N=N_0 e^{-\lambda t},\quad T_{1/2}=\ln 2/\lambda"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="λ" value={lam} min={0.2} max={2} step={0.05} onChange={setLam} />
        <Slider label="t" value={t} min={0.1} max={5} step={0.1} onChange={setT} />
      </div>
      <Readout
        items={[
          { k: "N/N₀", v: frac.toFixed(3) },
          { k: "T½", v: T12.toFixed(2) },
          { k: "mean life", v: (1 / lam).toFixed(2) },
          { k: "t = T½", v: "N halves" },
        ]}
      />
    </Shell>
  );
}

function StressLab() {
  const [strain, setStrain] = useState(0.3);
  const plastic = strain > 0.55;
  const stress = plastic ? 0.55 + 0.2 * (strain - 0.55) : strain;

  return (
    <Shell
      title="Stress–strain and Hooke"
      lead="Linear region: stress = Y × strain, energy density ½ σε. Past the yield, Y is not usable. Elastic PE = ½ × stress × strain × volume only in Hooke."
      formula="Y=\frac{\mathrm{stress}}{\mathrm{strain}},\quad U=\tfrac12\sigma\varepsilon V"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="170" x2="330" y2="170" stroke={mute} />
          <line x1="40" y1="20" x2="40" y2="170" stroke={mute} />
          <path d="M40 170 L 180 70 Q 240 50 300 80" stroke={ink} />
          <circle cx={40 + strain * 280} cy={170 - stress * 160} r="4" fill={ok} />
        </Svg>
      </div>
      <Slider label="Strain (arb)" value={strain} min={0.05} max={0.9} step={0.05} onChange={setStrain} />
      <Readout
        items={[
          { k: "Region", v: plastic ? "beyond Hooke" : "elastic (Hooke)" },
          { k: "Stress (arb)", v: stress.toFixed(2) },
          { k: "Y usable?", v: plastic ? "no" : "yes" },
          { k: "Energy density", v: plastic ? "not ½σε" : (0.5 * stress * strain).toFixed(2) },
        ]}
      />
    </Shell>
  );
}

function HelixLab() {
  const [vPerp, setVPerp] = useState(8);
  const [vPar, setVPar] = useState(4);
  const [B, setB] = useState(0.5);
  const r = vPerp / Math.max(B, 0.05);
  const T = (2 * Math.PI) / Math.max(B, 0.05);
  const pitch = vPar * T;
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * 3 * T;
      const x = 40 + (t / (3 * T)) * 280;
      const y = 100 + r * 8 * Math.sin((2 * Math.PI * t) / T);
      out.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return out.join(" ");
  }, [T, r]);

  return (
    <Shell
      title="Charge in uniform B — circle or helix"
      lead="v_⊥ makes the circle (r = mv/qB). v_∥ rides along B, so the path is a helix of pitch v_∥ T. Cyclotron frequency does not depend on speed. Teaching units: r ∝ v_⊥/B."
      formula="r = mv_⊥/|q|B,\quad \omega=|q|B/m,\quad p=2\pi m v_∥/|q|B"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="30" y1="100" x2="340" y2="100" stroke={mute} strokeDasharray="4 3" />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" fill="none" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="v perpendicular" value={vPerp} min={2} max={16} step={0.5} onChange={setVPerp} />
        <Slider label="v parallel" value={vPar} min={0} max={12} step={0.5} onChange={setVPar} />
        <Slider label="B (teaching)" value={B} min={0.2} max={2} step={0.1} onChange={setB} />
      </div>
      <Readout
        items={[
          { k: "Radius ~ v⊥/B", v: r.toFixed(2) },
          { k: "Period ~ 2π/B", v: T.toFixed(2) },
          { k: "Pitch", v: pitch.toFixed(2) },
          { k: "Path", v: vPar === 0 ? "circle" : "helix" },
        ]}
      />
    </Shell>
  );
}

function FaradayLab() {
  const [B, setB] = useState(0.4);
  const [ell, setEll] = useState(0.3);
  const [v, setV] = useState(4);
  const emf = B * ell * v;
  const x = 40 + Math.min(v * 18, 220);

  return (
    <Shell
      title="Motional emf on rails"
      lead="A rod of length ℓ slides at v on conducting rails in uniform B into the page. ℰ = Bℓv. Lenz: the current fights the flux increase."
      formula="\mathcal{E}=B\ell v"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="50" x2="300" y2="50" stroke={mute} />
          <line x1="40" y1="150" x2="300" y2="150" stroke={mute} />
          <line x1="40" y1="50" x2="40" y2="150" stroke={ink} />
          <line x1={x} y1="50" x2={x} y2="150" stroke={ok} strokeWidth="3" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="B" value={B} min={0.1} max={1.2} step={0.05} unit="T" onChange={setB} />
        <Slider label="ℓ" value={ell} min={0.1} max={0.8} step={0.05} unit="m" onChange={setEll} />
        <Slider label="v" value={v} min={0.5} max={12} step={0.5} unit="m/s" onChange={setV} />
      </div>
      <Readout
        items={[
          { k: "Emf", v: `${emf.toFixed(2)} V` },
          { k: "E in rod", v: `${(v * B).toFixed(2)} V/m` },
          { k: "dΦ/dt", v: "B ℓ v" },
          { k: "Lenz", v: "fights ΔΦ" },
        ]}
      />
    </Shell>
  );
}

function RollingLab() {
  const [theta, setTheta] = useState(30);
  const [kind, setKind] = useState(0);
  const kR2 = [0.4, 0.5, 1][kind]!;
  const names = ["solid sphere (2/5)", "disc (1/2)", "ring (1)"];
  const rad = (theta * Math.PI) / 180;
  const a = (G * Math.sin(rad)) / (1 + kR2);
  const aSlide = G * Math.sin(rad);

  return (
    <Shell
      title="Rolling without slip on an incline"
      lead="a = g sinθ / (1+k²/R²). A sphere always beats a disc beats a hoop. Rotation steals some PE into ½ Iω²."
      formula="a=\frac{g\sin\theta}{1+k^2/R^2},\quad v=\omega R"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <path d={`M40 170 L 320 170 L 320 ${170 - Math.tan(rad) * 260} Z`} stroke={ink} />
          <circle cx="170" cy={158 - Math.tan(rad) * 70} r="16" stroke={ok} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="Incline θ" value={theta} min={10} max={50} step={1} unit="°" onChange={setTheta} />
        <Slider label="body (0 sphere · 1 disc · 2 ring)" value={kind} min={0} max={2} step={1} onChange={setKind} />
      </div>
      <Readout
        items={[
          { k: "a rolling", v: `${a.toFixed(2)} m/s²` },
          { k: "a if μ=0 slide", v: `${aSlide.toFixed(2)} m/s²` },
          { k: "k²/R²", v: String(kR2) },
          { k: "body", v: names[kind]! },
        ]}
      />
    </Shell>
  );
}

function ThermalLab() {
  const [dT, setDT] = useState(40);
  const [L, setL] = useState(1);
  const alpha = 1.2e-5;
  const dL = L * alpha * dT * 1e6;
  const stress = 2e11 * alpha * dT;

  return (
    <Shell
      title="Linear expansion and thermal stress"
      lead="Free rod: ΔL = L α ΔT. Fixed ends: strain is killed, stress = Y α ΔT. Water’s density still peaks at 4°C — that is the anomalous-expansion bullet."
      formula="\Delta L=L\alpha\Delta T,\quad \sigma=Y\alpha\Delta T"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg viewBox="0 0 360 140">
          <rect x="40" y="50" width={180 + dT} height="24" stroke={ink} />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="ΔT" value={dT} min={5} max={120} step={5} unit="K" onChange={setDT} />
        <Slider label="L" value={L} min={0.5} max={3} step={0.1} unit="m" onChange={setL} />
      </div>
      <Readout
        items={[
          { k: "ΔL free (µm)", v: dL.toFixed(1) },
          { k: "stress if fixed", v: `${(stress / 1e6).toFixed(1)} MPa` },
          { k: "γ", v: "3α" },
          { k: "water", v: "max density 4°C" },
        ]}
      />
    </Shell>
  );
}

function KtgLab() {
  const [T, setT] = useState(300);
  const [M, setM] = useState(28);
  const R = 8.3;
  const kgmol = M / 1000;
  const rms = Math.sqrt((3 * R * T) / kgmol);
  const mean = Math.sqrt((8 * R * T) / (Math.PI * kgmol));
  const mp = Math.sqrt((2 * R * T) / kgmol);

  return (
    <Shell
      title="Three speeds on a Maxwell curve"
      lead="v_mp < mean < v_rms, all ∝ √(T/M). Raise T and the tail grows. Room-temperature O₂ has f = 5 (vibration frozen)."
      formula="v_{rms}=\sqrt{3RT/M},\quad \langle v\rangle=\sqrt{8RT/\pi M},\quad v_{mp}=\sqrt{2RT/M}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="T" value={T} min={100} max={900} step={20} unit="K" onChange={setT} />
        <Slider label="M" value={M} min={2} max={44} step={1} unit="g/mol" onChange={setM} />
      </div>
      <Readout
        items={[
          { k: "v_mp", v: `${mp.toFixed(0)} m/s` },
          { k: "mean", v: `${mean.toFixed(0)} m/s` },
          { k: "v_rms", v: `${rms.toFixed(0)} m/s` },
          { k: "order", v: "mp < mean < rms" },
        ]}
      />
    </Shell>
  );
}

function VernierLab() {
  const [vsd, setVsd] = useState(10);
  const [msr, setMsr] = useState(12);
  const [coinc, setCoinc] = useState(4);
  const [ze, setZe] = useState(0);
  const lc = 1 / vsd;
  const observed = msr + coinc * lc;
  const tru = observed - ze;

  return (
    <Shell
      title="Vernier reading with zero error"
      lead="n VSD = (n−1) MSD, 1 MSD = 1 mm ⇒ LC = 1/n mm. True = observed − zero error (positive ZE is subtracted)."
      formula="\mathrm{LC}=1\,\mathrm{MSD}-1\,\mathrm{VSD},\quad \mathrm{true}=\mathrm{obs}-\mathrm{ZE}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="n (n VSD = n−1 MSD)" value={vsd} min={10} max={50} step={10} onChange={setVsd} />
        <Slider label="Main scale (mm)" value={msr} min={0} max={40} step={1} onChange={setMsr} />
        <Slider label="Coinciding VSD" value={coinc} min={0} max={Math.max(vsd - 1, 1)} step={1} onChange={setCoinc} />
        <Slider label="Zero error (mm)" value={ze} min={-0.4} max={0.4} step={0.02} onChange={setZe} />
      </div>
      <Readout
        items={[
          { k: "LC", v: `${lc.toFixed(3)} mm` },
          { k: "Observed", v: `${observed.toFixed(3)} mm` },
          { k: "True", v: `${tru.toFixed(3)} mm` },
          { k: "ZE", v: ze > 0 ? "positive → subtract" : ze < 0 ? "negative → add" : "none" },
        ]}
      />
    </Shell>
  );
}

function SeqLab() {
  const [a, setA] = useState(3);
  const [r, setR] = useState(0.5);
  const [n, setN] = useState(6);
  const terms = Array.from({ length: n }, (_, k) => a * r ** k);
  const Sn = Math.abs(r - 1) < 1e-9 ? n * a : (a * (1 - r ** n)) / (1 - r);
  const Sinf = Math.abs(r) < 1 ? a / (1 - r) : NaN;

  return (
    <Shell
      title="Geometric progression"
      lead="Finite sum a(rⁿ−1)/(r−1). Infinite sum a/(1−r) only for |r|<1. AM ≥ GM with equality iff a=b."
      formula="S_n=a(r^n-1)/(r-1),\quad S_\infty=a/(1-r)\ (|r|<1)"
    >
      <p className="font-mono text-sm text-muted break-all">{terms.map((t) => t.toFixed(3)).join(", ")}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Slider label="a" value={a} min={1} max={8} step={1} onChange={setA} />
        <Slider label="r" value={r} min={-0.8} max={1.4} step={0.1} onChange={setR} />
        <Slider label="n" value={n} min={2} max={12} step={1} onChange={setN} />
      </div>
      <Readout
        items={[
          { k: "S_n", v: Sn.toFixed(3) },
          { k: "S_∞", v: Number.isFinite(Sinf) ? Sinf.toFixed(3) : "diverges" },
          { k: "|r|<1?", v: Math.abs(r) < 1 ? "yes" : "no" },
          { k: "AM–GM", v: "AM ≥ GM" },
        ]}
      />
    </Shell>
  );
}

function BinomLab() {
  const [n, setN] = useState(5);
  const row: number[] = [1];
  for (let k = 1; k <= n; k++) row.push((row[k - 1]! * (n - k + 1)) / k);

  return (
    <Shell
      title="Pascal row of (x+y)^n"
      lead="Coefficients C(n,r). Pascal’s identity builds the next row. Official theorem is for positive integral n; Advanced extends to any index |x|<1."
      formula="(x+y)^n=\sum_r \binom{n}{r} x^{n-r} y^r"
    >
      <p className="font-mono text-sm">{row.map((c) => Math.round(c)).join("   ")}</p>
      <Slider label="n" value={n} min={1} max={10} step={1} onChange={setN} />
      <Readout
        items={[
          { k: "terms", v: String(n + 1) },
          { k: "sum of row", v: String(2 ** n) },
          { k: "middle", v: n % 2 === 0 ? `T_${n / 2 + 1}` : `T_${(n + 1) / 2} & T_${(n + 3) / 2}` },
          { k: "C(n,1)", v: String(n) },
        ]}
      />
    </Shell>
  );
}

function MatrixLab() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const [d, setD] = useState(4);
  const det = a * d - b * c;

  return (
    <Shell
      title="2×2 determinant and inverse"
      lead="det = ad−bc. If det ≠ 0 the inverse is unique. Official bullet: non-zero A, B of order 2 can still satisfy AB = O."
      formula="\det=ad-bc,\quad A^{-1}=(\mathrm{adj}A)/\det A"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="a" value={a} min={-5} max={6} step={1} onChange={setA} />
        <Slider label="b" value={b} min={-5} max={6} step={1} onChange={setB} />
        <Slider label="c" value={c} min={-5} max={6} step={1} onChange={setC} />
        <Slider label="d" value={d} min={-5} max={6} step={1} onChange={setD} />
      </div>
      <Readout
        items={[
          { k: "matrix", v: `[${a} ${b} ; ${c} ${d}]` },
          { k: "det", v: String(det) },
          { k: "trace", v: String(a + d) },
          { k: "invertible?", v: det === 0 ? "no" : "yes, unique" },
        ]}
      />
    </Shell>
  );
}

function DeLab() {
  const [k, setK] = useState(0.5);
  const [y0, setY0] = useState(2);
  const pts = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = i / 8;
      const y = y0 * Math.exp(k * x);
      out.push(`${30 + x * 40},${170 - Math.min(y, 8) * 16}`);
    }
    return out.join(" ");
  }, [k, y0]);

  return (
    <Shell
      title="Linear DE dy/dx = k y"
      lead="Separable and linear. IF for y' − k y = 0 is e^{−kx}. Same exponential as RC / RL. Official linear type: dy/dx + P y = Q, IF = e^{∫P dx}."
      formula="y\,\mathrm{IF}=\int Q\,\mathrm{IF}\,dx+C"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="30" y1="170" x2="340" y2="170" stroke={mute} />
          <polyline points={pts} stroke={ink} strokeWidth="1.8" fill="none" />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="k" value={k} min={-1} max={1} step={0.1} onChange={setK} />
        <Slider label="y(0)" value={y0} min={0.5} max={4} step={0.5} onChange={setY0} />
      </div>
      <Readout
        items={[
          { k: "y(1)", v: (y0 * Math.exp(k)).toFixed(2) },
          { k: "family", v: "one constant" },
          { k: "k", v: k >= 0 ? "growth" : "decay" },
          { k: "IF", v: "e^{−kx}" },
        ]}
      />
    </Shell>
  );
}

function StraightLab() {
  const [m, setM] = useState(1);
  const [c, setC] = useState(1);
  const dist = Math.abs(c) / Math.sqrt(m * m + 1);

  return (
    <Shell
      title="Slope–intercept line"
      lead="y = mx + c. Perpendicular slope −1/m. Distance of the origin is |c|/√(m²+1). A vertical line is x = a — this form cannot draw it."
      formula="y=mx+c,\quad d=|ax_0+by_0+c|/\sqrt{a^2+b^2}"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-raised/50 p-2">
        <Svg>
          <line x1="40" y1="10" x2="40" y2="180" stroke={mute} />
          <line x1="20" y1="140" x2="340" y2="140" stroke={mute} />
          <line
            x1="20"
            y1={140 - (m * ((20 - 40) / 40) + c) * 28}
            x2="320"
            y2={140 - (m * ((320 - 40) / 40) + c) * 28}
            stroke={ink}
            strokeWidth="1.8"
          />
        </Svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Slider label="slope m" value={m} min={-3} max={3} step={0.1} onChange={setM} />
        <Slider label="intercept c" value={c} min={-3} max={3} step={0.1} onChange={setC} />
      </div>
      <Readout
        items={[
          { k: "equation", v: `y = ${m}x + ${c}` },
          { k: "perp slope", v: m === 0 ? "vertical" : (-1 / m).toFixed(2) },
          { k: "d(origin)", v: dist.toFixed(2) },
          { k: "angle", v: `${((Math.atan(m) * 180) / Math.PI).toFixed(0)}°` },
        ]}
      />
    </Shell>
  );
}

function DopplerLab() {
  const [vs, setVs] = useState(10);
  const [vo, setVo] = useState(0);
  const f = 400;
  const v = 330;
  const toward = (v + vo) / (v - vs);
  const fp = f * toward;

  return (
    <Shell
      title="Doppler, one dimension"
      lead="Toward = higher pitch. Observer toward: + in the numerator. Source toward: − in the denominator. Wall = image source."
      formula="f'=f\frac{v\pm v_o}{v\pm v_s}"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="source toward observer" value={vs} min={0} max={80} step={2} unit="m/s" onChange={setVs} />
        <Slider label="observer toward source" value={vo} min={0} max={40} step={2} unit="m/s" onChange={setVo} />
      </div>
      <Readout
        items={[
          { k: "f rest", v: `${f} Hz` },
          { k: "f′ toward", v: `${fp.toFixed(1)} Hz` },
          { k: "factor", v: toward.toFixed(3) },
          { k: "wall", v: "image source" },
        ]}
      />
    </Shell>
  );
}

function PncLab() {
  const [n, setN] = useState(6);
  const [r, setR] = useState(3);
  const rr = Math.min(r, n);
  const fact = (k: number) => {
    let p = 1;
    for (let i = 2; i <= k; i++) p *= i;
    return p;
  };
  const p = fact(n) / fact(n - rr);
  const c = p / fact(rr);

  return (
    <Shell
      title="nPr and nCr from the definition"
      lead="Permutation: n(n−1)…(n−r+1). Combination: divide by r! because order is forgotten. Circular: (n−1)!."
      formula="{}^nP_r=n!/(n-r)!,\quad {}^nC_r={}^nP_r/r!"
    >
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <Slider label="n" value={n} min={1} max={10} step={1} onChange={setN} />
        <Slider label="r" value={r} min={0} max={10} step={1} onChange={setR} />
      </div>
      <Readout
        items={[
          { k: "nPr", v: String(p) },
          { k: "nCr", v: String(c) },
          { k: "(n−1)! circular", v: String(fact(Math.max(n - 1, 0))) },
          { k: "C(n, n−r)", v: String(c) },
        ]}
      />
    </Shell>
  );
}

const LABS: Record<string, () => React.ReactNode> = {
  "phy-units": () => <VernierLab />,
  "phy-experimental": () => <VernierLab />,
  "phy-motion-1d": () => <VtGraphLab />,
  "phy-motion-2d": () => <ProjectileLab />,
  "phy-nlm": () => (
    <>
      <InclineLab />
      <div className="mt-6">
        <BankingLab />
      </div>
    </>
  ),
  "phy-wep": () => <ShmLab />,
  "phy-oscillations": () => <ShmLab />,
  "phy-rotation": () => <RollingLab />,
  "phy-gravitation": () => (
    <>
      <SatelliteLab />
      <div className="mt-6">
        <KeplerLab />
      </div>
    </>
  ),
  "phy-solids": () => <StressLab />,
  "phy-fluids": () => <BernoulliLab />,
  "phy-thermal": () => <ThermalLab />,
  "phy-thermo": () => <ThermoLab />,
  "phy-ktg": () => <KtgLab />,
  "phy-waves": () => (
    <>
      <StandingLab />
      <div className="mt-6">
        <DopplerLab />
      </div>
    </>
  ),
  "phy-charges": () => <GaussLab />,
  "phy-potential": () => <CapacitorLab />,
  "phy-current": () => (
    <>
      <RcLab />
      <div className="mt-6">
        <WheatstoneLab />
      </div>
    </>
  ),
  "phy-moving": () => <HelixLab />,
  "phy-emi": () => <FaradayLab />,
  "phy-ac": () => <LcrLab />,
  "phy-ray": () => <LensLab />,
  "phy-wave-opt": () => <YdseLab />,
  "phy-dual": () => <PhotoLab />,
  "phy-atoms": () => <BohrLab />,
  "phy-nuclei": () => <DecayLab />,
  "math-trig": () => <UnitCircleLab />,
  "math-invtrig": () => <UnitCircleLab />,
  "math-complex": () => <ArgandLab />,
  "math-conic": () => <EllipseLab />,
  "math-limits": () => <TangentLab />,
  "math-cont": () => <TangentLab />,
  "math-aod": () => <TangentLab />,
  "math-int": () => <AreaLab />,
  "math-aoi": () => <AreaLab />,
  "math-vec": () => <VectorLab />,
  "math-3d-11": () => <VectorLab />,
  "math-3d-12": () => <VectorLab />,
  "math-lpp": () => <LppLab />,
  "math-prob-12": () => <BayesLab />,
  "math-seq": () => <SeqLab />,
  "math-binom": () => <BinomLab />,
  "math-matrices": () => <MatrixLab />,
  "math-dets": () => <MatrixLab />,
  "math-de": () => <DeLab />,
  "math-straight": () => <StraightLab />,
  "math-pnc": () => <PncLab />,
  ...MORE_LABS,
};

export function hasLab(chapterId: string) {
  return Boolean(LABS[chapterId]);
}

export function ChapterLab({ chapterId }: { chapterId: string }) {
  const node = LABS[chapterId];
  const chemistry = hasChemistryLab(chapterId);
  if (!node && !chemistry) {
    return (
      <p className="mt-8 text-sm text-muted">
        This chapter’s geometry lives in the theory diagrams. Open the mill to train the numbers —
        interactive labs are mounted only where a slider actually teaches the idea.
      </p>
    );
  }
  return (
    <LabProvider chapterId={chapterId}>
      <div className="mt-8 space-y-6">{node ? node() : <ChemistryLab chapterId={chapterId} />}</div>
    </LabProvider>
  );
}
