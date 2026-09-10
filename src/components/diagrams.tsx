import { CircleHelp, Eye, Maximize2, Pencil, X } from "lucide-react";
import { diagramGuide } from "@/data/learning/diagram-guides";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ink = "currentColor";
const mute = "var(--color-muted)";
const ok = "var(--color-ok)";
const warn = "var(--color-warn)";

function Frame({
  children,
  className,
  viewBox = "0 0 360 200",
}: {
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className={cn("h-auto w-full max-h-56", className)} role="img" fill="none">
      {children}
    </svg>
  );
}

function L({
  x1,
  y1,
  x2,
  y2,
  dashed,
  color = ink,
  w = 1.4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  color?: string;
  w?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={w}
      strokeDasharray={dashed ? "4 3" : undefined}
      strokeLinecap="round"
    />
  );
}

function T({
  x,
  y,
  children,
  anchor = "middle",
  size = 11,
  color = mute,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  color?: string;
}) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} fontFamily="inherit">
      {children}
    </text>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = ink,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const id = `a${Math.round(x1 * 9 + y1 * 7 + x2 * 3 + y2)}`;
  return (
    <>
      <defs>
        <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke={color} strokeWidth="1.2" />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.4"
        markerEnd={`url(#${id})`}
      />
    </>
  );
}

type Fig = { caption: string; node: React.ReactNode };

export const FIGURES: Record<string, Fig> = {
  vernier: {
    caption: "Vernier LC = 1 MSD − 1 VSD. True reading = observed − zero error (zero error has a sign).",
    node: (
      <Frame>
        <L x1={40} y1={80} x2={320} y2={80} w={3} />
        <L x1={50} y1={120} x2={300} y2={120} w={2} color={ok} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <L key={i} x1={50 + i * 30} y1={80} x2={50 + i * 30} y2={68} />
        ))}
        <T x={180} y={160}>main scale / vernier</T>
      </Frame>
    ),
  },
  "vt-graph": {
    caption: "v–t graph: slope is a, area is displacement. A sign change in v means the particle turned.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={100} x2={330} y2={100} color={mute} />
        <L x1={40} y1={170} x2={330} y2={170} color={mute} />
        <path d="M40 100 L 140 40 L 220 40 L 300 160" stroke={ink} strokeWidth="1.6" />
        <T x={28} y={36} anchor="end">v</T>
        <T x={330} y={188}>t</T>
        <T x={180} y={32}>a=0</T>
      </Frame>
    ),
  },
  projectile: {
    caption: "Projectile: ux is constant, uy = u sinθ − gt. Range peaks at 45°. Complementary angles share R.",
    node: (
      <Frame>
        <L x1={30} y1={170} x2={330} y2={170} />
        <path d="M40 170 Q 180 20 320 170" stroke={ink} strokeWidth="1.6" fill="none" />
        <L x1={40} y1={170} x2={40} y2={40} dashed color={mute} />
        <Arrow x1={40} y1={170} x2={100} y2={110} />
        <T x={112} y={108} anchor="start">u</T>
        <T x={180} y={48}>H</T>
        <T x={180} y={188}>R = u² sin 2θ / g</T>
        <circle cx="40" cy="170" r="3" fill={ink} />
        <circle cx="180" cy="55" r="3" fill={ok} />
      </Frame>
    ),
  },
  "incline-fbd": {
    caption: "Free-body on a rough incline: mg into components, N, friction up the plane if sliding down.",
    node: (
      <Frame>
        <path d="M40 170 L 300 170 L 300 70 Z" stroke={ink} strokeWidth="1.4" />
        <rect x="175" y="92" width="44" height="32" transform="rotate(-18 197 108)" stroke={ink} />
        <Arrow x1={197} y1={108} x2={197} y2={168} />
        <T x={210} y={160} anchor="start">mg</T>
        <Arrow x1={197} y1={108} x2={160} y2={78} />
        <T x={150} y={74} anchor="end">N</T>
        <Arrow x1={197} y1={108} x2={250} y2={92} />
        <T x={258} y={90} anchor="start">f</T>
        <T x={90} y={188}>θ</T>
      </Frame>
    ),
  },
  pulley: {
    caption: "Atwood: a = (m1 − m2)g / (m1 + m2), tension same if the pulley is light and frictionless.",
    node: (
      <Frame>
        <circle cx="180" cy="50" r="18" stroke={ink} />
        <L x1={162} y1={50} x2={162} y2={130} />
        <L x1={198} y1={50} x2={198} y2={110} />
        <rect x="148" y="130" width="28" height="28" stroke={ink} />
        <rect x="184" y="110" width="28" height="22" stroke={ink} />
        <T x={162} y={178}>m1</T>
        <T x={198} y={154}>m2</T>
        <Arrow x1={162} y1={162} x2={162} y2={188} />
        <Arrow x1={198} y1={100} x2={198} y2={78} />
      </Frame>
    ),
  },
  circular: {
    caption: "Uniform circular motion: |v| constant, a = v²/r inward. Velocity and acceleration both change as vectors.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="70" stroke={ink} />
        <circle cx="250" cy="100" r="5" fill={ok} />
        <Arrow x1={250} y1={100} x2={250} y2={50} />
        <Arrow x1={250} y1={100} x2={180} y2={100} color={warn} />
        <T x={262} y={48} anchor="start">v</T>
        <T x={200} y={94}>a</T>
      </Frame>
    ),
  },
  banking: {
    caption: "Banked curve: tan θ = v²/rg with no friction. With friction, v² = rg (μ + tanθ)/(1 − μ tanθ) at the upper limit.",
    node: (
      <Frame>
        <path d="M40 160 L 320 160 L 320 110 L 40 160" stroke={ink} />
        <rect x="160" y="118" width="50" height="22" transform="rotate(-12 185 129)" stroke={ok} />
        <T x={180} y={188}>θ</T>
      </Frame>
    ),
  },
  galileo: {
    caption: "Galileo’s double incline: same height on a smooth opposite face. Flatten it — the ball goes farther. Horizontal — it never stops.",
    node: (
      <Frame>
        <path d="M40 50 L 120 160 L 200 50" stroke={ink} />
        <path d="M220 160 L 320 160" stroke={ink} />
        <circle cx="70" cy="88" r="8" fill={ok} />
        <circle cx="260" cy="152" r="8" fill={ok} />
        <T x={120} y={188}>same height</T>
        <T x={270} y={140}>limit: horizontal</T>
      </Frame>
    ),
  },
  "pull-push": {
    caption: "Pushing adds a downward component to N (friction up). Pulling subtracts it. Same F, less f when you pull.",
    node: (
      <Frame>
        <L x1={30} y1={150} x2={330} y2={150} />
        <rect x="70" y="110" width="70" height="40" stroke={ink} />
        <Arrow x1={40} y1={90} x2={90} y2={120} />
        <T x={36} y={84} anchor="end">push</T>
        <rect x="210" y="110" width="70" height="40" stroke={ok} />
        <Arrow x1={280} y1={120} x2={330} y2={90} />
        <T x={336} y={84} anchor="start">pull</T>
      </Frame>
    ),
  },
  "rope-p": {
    caption: "Horizontal 50 N at the midpoint. Lower half stays vertical (T₂ = mg). Upper half: tan θ = 50 / mg.",
    node: (
      <Frame>
        <L x1={80} y1={30} x2={200} y2={30} />
        <L x1={140} y1={30} x2={200} y2={90} />
        <L x1={200} y1={90} x2={200} y2={160} />
        <rect x="186" y="160" width="28" height="22" stroke={ink} />
        <Arrow x1={200} y1={90} x2={270} y2={90} />
        <T x={278} y={94} anchor="start">50 N</T>
        <T x={154} y={70} anchor="end">θ</T>
        <T x={214} y={130} anchor="start">T₂</T>
        <T x={214} y={188}>mg</T>
      </Frame>
    ),
  },
  "work-theta": {
    caption: "W = F d cos θ. No work if d = 0, F = 0, or θ = 90°. Friction usually has θ = 180°, so W_f = −f s.",
    node: (
      <Frame>
        <L x1={40} y1={140} x2={280} y2={140} color={mute} />
        <rect x="70" y="110" width="50" height="30" stroke={ink} />
        <rect x="200" y="110" width="50" height="30" stroke={ok} />
        <Arrow x1={95} y1={90} x2={170} y2={60} />
        <Arrow x1={95} y1={125} x2={200} y2={125} />
        <T x={155} y={52}>F</T>
        <T x={150} y={158}>d</T>
        <T x={130} y={78}>θ</T>
      </Frame>
    ),
  },
  "vertical-circle": {
    caption: "Just complete the loop: slack at the top ⇒ v_C = √(gL), so v_A = √(5gL). After C the bob is a projectile.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="70" stroke={ink} />
        <L x1={180} y1={100} x2={180} y2={170} />
        <circle cx="180" cy="170" r="6" fill={ok} />
        <T x={180} y={188}>A</T>
        <T x={180} y={22}>C</T>
        <T x={268} y={104} anchor="start">B</T>
      </Frame>
    ),
  },
  "spring-mass": {
    caption: "U = ½ kx². Mean position is the energy minimum; turning points where U = E.",
    node: (
      <Frame>
        <L x1={40} y1={40} x2={40} y2={160} />
        <path d="M40 100 L 55 80 L 70 120 L 85 80 L 100 120 L 115 80 L 130 100" stroke={ink} />
        <rect x="130" y="86" width="36" height="28" stroke={ok} />
        <T x={148} y={80}>m</T>
        <T x={180} y={188}>x = 0 at unstretched (horizontal) / new eqm (vertical)</T>
      </Frame>
    ),
  },
  "collision-1d": {
    caption: "1-D collision: momentum always, energy only if elastic. Equal-mass elastic: velocities exchange.",
    node: (
      <Frame>
        <circle cx="80" cy="100" r="22" stroke={ink} />
        <circle cx="200" cy="100" r="28" stroke={ok} />
        <Arrow x1={110} y1={100} x2={160} y2={100} />
        <T x={80} y={140}>m1</T>
        <T x={200} y={144}>m2</T>
      </Frame>
    ),
  },
  rolling: {
    caption: "Rolling without slip: v = ωr, a = αr. Friction is static; it may accelerate or retard translation.",
    node: (
      <Frame>
        <L x1={40} y1={150} x2={320} y2={150} />
        <circle cx="160" cy="110" r="40" stroke={ink} />
        <L x1={160} y1={110} x2={190} y2={80} />
        <Arrow x1={160} y1={110} x2={230} y2={110} />
        <T x={238} y={114} anchor="start">v</T>
      </Frame>
    ),
  },
  kepler: {
    caption: "Kepler I: ellipse, sun at a focus. II: equal areas (L conserved). III: T² ∝ a³.",
    node: (
      <Frame>
        <ellipse cx="190" cy="100" rx="130" ry="70" stroke={ink} />
        <circle cx="110" cy="100" r="6" fill={ok} />
        <T x={110} y={84}>sun</T>
        <T x={190} y={188}>focus, not centre</T>
      </Frame>
    ),
  },
  satellite: {
    caption: "Circular orbit: v = √(GM/r), T² = 4π² r³ / GM. Binding energy = GMm / (2r).",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="28" fill={ok} />
        <ellipse cx="180" cy="100" rx="120" ry="70" stroke={ink} />
        <circle cx="300" cy="100" r="6" stroke={ink} />
      </Frame>
    ),
  },
  "stress-strain": {
    caption: "Stress–strain: OA proportional (Y = slope), yield, ultimate, fracture. Energy density = area under the curve.",
    node: (
      <Frame>
        <L x1={50} y1={170} x2={50} y2={30} />
        <L x1={50} y1={170} x2={330} y2={170} />
        <path d="M50 170 L 140 90 L 180 70 L 250 55 L 300 80" stroke={ink} strokeWidth="1.6" />
        <T x={36} y={36} anchor="end">σ</T>
        <T x={320} y={188}>ε</T>
        <T x={148} y={84}>Y</T>
        <T x={258} y={48}>U</T>
      </Frame>
    ),
  },
  "young-moduli": {
    caption: "Three moduli: Y from ΔL, B from ΔV under ΔP, η from a shear angle θ.",
    node: (
      <Frame>
        <rect x="30" y="50" width="18" height="110" stroke={ink} />
        <rect x="55" y="40" width="18" height="130" stroke={ok} />
        <T x={52} y={188}>Y</T>
        <circle cx="160" cy="100" r="36" stroke={ink} />
        <circle cx="160" cy="100" r="28" stroke={ok} strokeDasharray="4 3" />
        <T x={160} y={188}>B</T>
        <path d="M250 60 L 310 60 L 330 160 L 270 160 Z" stroke={ink} />
        <T x={300} y={188}>η</T>
      </Frame>
    ),
  },
  "bernoulli-pipe": {
    caption: "Bernoulli: P + ρgh + ½ρv² = const along a streamline (ideal, steady). Fast ⇒ low P.",
    node: (
      <Frame>
        <path d="M40 70 L 140 70 L 140 50 L 260 50 L 260 90 L 320 90 L 320 130 L 260 130 L 260 150 L 140 150 L 140 130 L 40 130 Z" stroke={ink} />
        <T x={90} y={108}>slow</T>
        <T x={200} y={108}>fast</T>
      </Frame>
    ),
  },
  capillary: {
    caption: "Capillary rise h = 2σ cosθ / (ρ g r). Concave meniscus ⇒ rise; mercury falls.",
    node: (
      <Frame>
        <L x1={40} y1={140} x2={200} y2={140} />
        <rect x="230" y="40" width="24" height="140" stroke={ink} />
        <path d="M230 80 Q 242 68 254 80" stroke={ok} />
        <T x={270} y={84} anchor="start">h</T>
      </Frame>
    ),
  },
  expansion: {
    caption: "ΔL = L α ΔT. A hole expands as if the missing disc were still there. Water’s density peaks at 4°C.",
    node: (
      <Frame>
        <rect x="60" y="70" width="80" height="60" stroke={ink} />
        <rect x="200" y="55" width="110" height="90" stroke={ok} />
        <T x={100} y={160}>cold</T>
        <T x={255} y={160}>hot</T>
      </Frame>
    ),
  },
  "pv-cycle": {
    caption: "P–V area is W_net. Clockwise = engine. Isotherm PV = const; adiabat steeper (PV^γ = const).",
    node: (
      <Frame>
        <L x1={50} y1={170} x2={50} y2={30} />
        <L x1={50} y1={170} x2={330} y2={170} />
        <path d="M80 60 L 240 60 L 200 140 L 80 140 Z" stroke={ink} />
        <T x={28} y={36} anchor="end">P</T>
        <T x={330} y={188}>V</T>
      </Frame>
    ),
  },
  maxwell: {
    caption: "Maxwell speeds: v_mp at the peak, then ⟨v⟩, then v_rms. Higher T stretches the tail.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M40 170 C 80 170 100 40 150 40 C 210 40 260 120 330 155" stroke={ink} />
        <L x1={150} y1={40} x2={150} y2={170} dashed color={mute} />
        <T x={150} y={188}>v_mp</T>
      </Frame>
    ),
  },
  pendulum: {
    caption: "Simple pendulum, small angle: T = 2π √(L/g). Restoring force −mg sinθ ≈ −mgθ.",
    node: (
      <Frame>
        <L x1={180} y1={20} x2={180} y2={40} />
        <L x1={180} y1={40} x2={230} y2={150} />
        <circle cx="230" cy="150" r="12" fill={ok} />
        <L x1={180} y1={40} x2={180} y2={160} dashed color={mute} />
        <T x={210} y={90}>θ</T>
      </Frame>
    ),
  },
  "organ-pipe": {
    caption: "Closed pipe: λ/4, 3λ/4, … Odd harmonics. Open: nλ/2. Beats: |f1 − f2|.",
    node: (
      <Frame>
        <rect x="80" y="40" width="40" height="130" stroke={ink} />
        <rect x="200" y="40" width="40" height="130" stroke={ok} />
        <L x1={80} y1={170} x2={120} y2={170} w={4} />
        <T x={100} y={188}>closed</T>
        <T x={220} y={188}>open</T>
      </Frame>
    ),
  },
  "wave-string": {
    caption: "y = A sin(kx − ωt) travels +x at v = ω/k = √(T/μ). Nodes of a standing wave never move.",
    node: (
      <Frame>
        <path d="M30 100 Q 70 40 110 100 Q 150 160 190 100 Q 230 40 270 100 Q 310 160 350 100" stroke={ink} />
      </Frame>
    ),
  },
  "gauss-sphere": {
    caption: "Gauss: ∮ E·dA = Q_enc/ε₀. Outside a shell, E = kQ/r²; inside, 0.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="70" stroke={ink} />
        <circle cx="180" cy="100" r="28" stroke={ok} />
        <T x={180} y={104}>Q</T>
      </Frame>
    ),
  },
  "gauss-line": {
    caption: "Infinite line: E = λ / (2π ε₀ r), radial. Infinite sheet: E = σ / (2ε₀), independent of distance.",
    node: (
      <Frame>
        <L x1={180} y1={30} x2={180} y2={170} w={3} />
        <Arrow x1={180} y1={100} x2={260} y2={100} />
        <T x={268} y={104} anchor="start">E</T>
      </Frame>
    ),
  },
  capacitor: {
    caption: "Parallel plate: C = κ ε₀ A / d. Series: 1/C = Σ 1/Cᵢ. Energy ½ CV² = Q²/2C.",
    node: (
      <Frame>
        <L x1={140} y1={40} x2={140} y2={160} w={4} />
        <L x1={200} y1={40} x2={200} y2={160} w={4} />
        <T x={170} y={188}>d</T>
      </Frame>
    ),
  },
  wheatstone: {
    caption: "Wheatstone: I_g = 0 iff P/Q = R/S. Meter bridge is this with a 100 cm wire.",
    node: (
      <Frame>
        <L x1={80} y1={40} x2={280} y2={40} />
        <L x1={80} y1={40} x2={80} y2={160} />
        <L x1={280} y1={40} x2={280} y2={160} />
        <L x1={80} y1={160} x2={280} y2={160} />
        <L x1={80} y1={40} x2={280} y2={160} dashed color={mute} />
        <T x={180} y={32}>G</T>
        <T x={70} y={100} anchor="end">P</T>
        <T x={294} y={100} anchor="start">Q</T>
      </Frame>
    ),
  },
  "circuit-series": {
    caption: "Series: same I, voltages add. Parallel: same V, currents add. Kirchhoff: ΣV = 0 around a loop, ΣI = 0 at a node.",
    node: (
      <Frame>
        <rect x="70" y="90" width="50" height="20" stroke={ink} />
        <rect x="160" y="90" width="50" height="20" stroke={ink} />
        <rect x="250" y="90" width="50" height="20" stroke={ink} />
        <L x1={40} y1={100} x2={70} y2={100} />
        <L x1={120} y1={100} x2={160} y2={100} />
        <L x1={210} y1={100} x2={250} y2={100} />
        <L x1={300} y1={100} x2={330} y2={100} />
      </Frame>
    ),
  },
  "rc-charge": {
    caption: "Charging: q = CE(1 − e^{−t/RC}). Time constant τ = RC.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M40 170 C 80 80 140 50 330 40" stroke={ink} />
        <T x={180} y={188}>t</T>
        <T x={28} y={36} anchor="end">q</T>
      </Frame>
    ),
  },
  helix: {
    caption: "Charge in B: r = mv_⊥ / (qB), pitch = v_∥ T, T = 2πm / (qB).",
    node: (
      <Frame>
        <path d="M60 100 Q 90 40 120 100 Q 150 160 180 100 Q 210 40 240 100 Q 270 160 300 100" stroke={ink} />
        <Arrow x1={40} y1={100} x2={50} y2={100} />
        <T x={40} y={88}>B</T>
      </Frame>
    ),
  },
  solenoid: {
    caption: "Long solenoid: B = μ₀ n I along the axis inside, ≈ 0 outside. n is turns per metre.",
    node: (
      <Frame>
        <ellipse cx="80" cy="100" rx="20" ry="50" stroke={ink} />
        <L x1={80} y1={50} x2={280} y2={50} />
        <L x1={80} y1={150} x2={280} y2={150} />
        <ellipse cx="280" cy="100" rx="20" ry="50" stroke={ink} />
        <Arrow x1={120} y1={100} x2={220} y2={100} />
        <T x={170} y={90}>B</T>
      </Frame>
    ),
  },
  "faraday-rail": {
    caption: "Motional emf = B ℓ v. Induced current fights the change (Lenz).",
    node: (
      <Frame>
        <L x1={80} y1={50} x2={80} y2={150} />
        <L x1={80} y1={50} x2={280} y2={50} />
        <L x1={80} y1={150} x2={280} y2={150} />
        <L x1={200} y1={50} x2={200} y2={150} w={3} color={ok} />
        <Arrow x1={200} y1={100} x2={250} y2={100} />
        <T x={258} y={104} anchor="start">v</T>
      </Frame>
    ),
  },
  "ac-phasor": {
    caption: "LCR phasors: V_R with I, V_L leads by 90°, V_C lags by 90°. Resonance at X_L = X_C.",
    node: (
      <Frame>
        <Arrow x1={180} y1={160} x2={180} y2={50} />
        <Arrow x1={180} y1={160} x2={300} y2={160} />
        <Arrow x1={180} y1={160} x2={280} y2={80} />
        <T x={188} y={48} anchor="start">V_L</T>
        <T x={308} y={174} anchor="start">V_R</T>
      </Frame>
    ),
  },
  transformer: {
    caption: "V_s / V_p = N_s / N_p = I_p / I_s (ideal). Step-up raises V, lowers I.",
    node: (
      <Frame>
        <rect x="140" y="50" width="80" height="100" stroke={ink} />
        <path d="M80 80 Q 140 80 140 100" stroke={ok} />
        <path d="M220 100 Q 220 80 280 80" stroke={ok} />
        <T x={80} y={70}>Np</T>
        <T x={280} y={70}>Ns</T>
      </Frame>
    ),
  },
  "em-spectrum": {
    caption: "Radio → micro → IR → vis → UV → X → γ. Energy and frequency rise to the right; wavelength falls.",
    node: (
      <Frame>
        <L x1={40} y1={100} x2={320} y2={100} w={8} color={ok} />
        <T x={70} y={80}>radio</T>
        <T x={180} y={80}>vis</T>
        <T x={300} y={80}>γ</T>
      </Frame>
    ),
  },
  prism: {
    caption: "Prism: r1 + r2 = A. δ = i + e − A. Minimum deviation: r = A/2.",
    node: (
      <Frame>
        <path d="M80 160 L 180 40 L 280 160 Z" stroke={ink} />
        <Arrow x1={40} y1={140} x2={120} y2={120} />
        <Arrow x1={200} y1={80} x2={310} y2={70} />
        <T x={48} y={132} anchor="start">i</T>
        <T x={180} y={188}>A</T>
      </Frame>
    ),
  },
  lens: {
    caption: "Thin lens: 1/v − 1/u = 1/f (Cartesian). Power P = 1/f in metres, dioptre.",
    node: (
      <Frame>
        <ellipse cx="180" cy="100" rx="18" ry="70" stroke={ink} />
        <Arrow x1={40} y1={70} x2={162} y2={70} />
        <Arrow x1={198} y1={80} x2={320} y2={120} />
      </Frame>
    ),
  },
  huygens: {
    caption: "Every point on a wavefront is a source of secondary wavelets. Envelope is the new front.",
    node: (
      <Frame>
        <L x1={80} y1={40} x2={80} y2={160} />
        <circle cx="80" cy="60" r="40" stroke={ok} />
        <circle cx="80" cy="100" r="40" stroke={ok} />
        <circle cx="80" cy="140" r="40" stroke={ok} />
        <path d="M120 40 Q 140 100 120 160" stroke={ink} />
      </Frame>
    ),
  },
  "young-slits": {
    caption: "YDSE: β = λD/d. Bright: d sinθ = mλ. Intensity 4I₀ cos²(φ/2).",
    node: (
      <Frame>
        <L x1={80} y1={40} x2={80} y2={160} />
        <circle cx="80" cy="80" r="4" fill={ink} />
        <circle cx="80" cy="120" r="4" fill={ink} />
        <L x1={280} y1={40} x2={280} y2={160} />
        <T x={80} y={188}>d</T>
        <T x={280} y={188}>screen</T>
      </Frame>
    ),
  },
  photoelectric: {
    caption: "K_max = hf − φ. Intensity changes current, not K_max. Threshold f₀ = φ/h.",
    node: (
      <Frame>
        <L x1={50} y1={170} x2={50} y2={30} />
        <L x1={50} y1={170} x2={330} y2={170} />
        <L x1={120} y1={170} x2={300} y2={50} />
        <T x={180} y={188}>f</T>
        <T x={36} y={36} anchor="end">K</T>
      </Frame>
    ),
  },
  bohr: {
    caption: "r_n = n² a₀ / Z, E_n = −13.6 Z² / n² eV. Lyman → n=1, Balmer → n=2.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="20" stroke={ink} />
        <circle cx="180" cy="100" r="40" stroke={ok} />
        <circle cx="180" cy="100" r="65" stroke={mute} />
        <circle cx="180" cy="100" r="4" fill={warn} />
      </Frame>
    ),
  },
  decay: {
    caption: "N = N₀ e^{−λt}. Half-life T½ = ln2 / λ. Activity A = λN.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M40 40 C 80 40 120 80 330 160" stroke={ink} />
        <T x={36} y={36} anchor="end">N</T>
      </Frame>
    ),
  },
  binding: {
    caption: "BE per nucleon peaks near ⁵⁶Fe. Fission of heavy, fusion of light, both climb this curve.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 140 C 90 40 180 40 320 90" stroke={ink} />
        <T x={180} y={188}>A</T>
      </Frame>
    ),
  },
  "diode-iv": {
    caption: "Forward: exponential I. Reverse: tiny leakage until breakdown. Rectifier uses the one-way street.",
    node: (
      <Frame>
        <L x1={40} y1={100} x2={330} y2={100} />
        <L x1={160} y1={30} x2={160} y2={170} />
        <path d="M80 110 C 140 108 170 100 260 40" stroke={ink} />
        <T x={300} y={50}>fwd</T>
      </Frame>
    ),
  },
  "pn-diode": {
    caption: "p-n junction: depletion region, barrier V₀. Forward bias shrinks it; reverse widens it.",
    node: (
      <Frame>
        <rect x="60" y="60" width="110" height="80" stroke={ink} />
        <rect x="170" y="60" width="110" height="80" stroke={ok} />
        <T x={115} y={104}>p</T>
        <T x={225} y={104}>n</T>
      </Frame>
    ),
  },
  mole: {
    caption: "1 mole = 6.022×10²³ entities. n = m/M = N/N_A = V/22.4 L (STP, ideal).",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="50" stroke={ink} />
        <T x={180} y={104}>N_A</T>
      </Frame>
    ),
  },
  "periodic-ie": {
    caption: "IE rises across a period (mostly), falls down a group. Dips at full/half subshells.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 140 L 90 80 L 110 100 L 160 50 L 180 70 L 240 40" stroke={ink} />
        <T x={180} y={188}>Z</T>
      </Frame>
    ),
  },
  "hybrid-tet": {
    caption: "sp³ tetrahedral 109.5°, sp² trigonal 120°, sp linear 180°.",
    node: (
      <Frame>
        <circle cx="180" cy="90" r="8" fill={ok} />
        <L x1={180} y1={90} x2={180} y2={30} />
        <L x1={180} y1={90} x2={120} y2={150} />
        <L x1={180} y1={90} x2={240} y2={150} />
        <L x1={180} y1={90} x2={250} y2={70} />
      </Frame>
    ),
  },
  "energy-profile": {
    caption: "Reaction profile: ΔH from wells, E_a from the hill. Catalyst lowers the hill, not the wells.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 120 C 100 120 120 40 180 40 C 240 40 260 140 320 140" stroke={ink} />
        <T x={36} y={36} anchor="end">E</T>
      </Frame>
    ),
  },
  "buffer-h": {
    caption: "Henderson: pH = pKa + log([A⁻]/[HA]). Buffer resists pH near pKa.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 150 C 140 140 160 40 220 40 C 280 40 300 150 330 155" stroke={ink} />
        <T x={180} y={188}>eq</T>
      </Frame>
    ),
  },
  sn2: {
    caption: "SN2: back-side attack, pentavalent TS, inversion. Rate = k[RX][Nu].",
    node: (
      <Frame>
        <T x={80} y={100}>Nu</T>
        <Arrow x1={110} y1={100} x2={160} y2={100} />
        <circle cx="190" cy="100" r="18" stroke={ink} />
        <Arrow x1={210} y1={100} x2={260} y2={100} />
        <T x={290} y={100}>X</T>
      </Frame>
    ),
  },
  galvanic: {
    caption: "Anode oxidation, cathode reduction. E_cell = E_c − E_a. Electrons in the wire, ions in the salt bridge.",
    node: (
      <Frame>
        <rect x="50" y="50" width="90" height="100" stroke={ink} />
        <rect x="220" y="50" width="90" height="100" stroke={ok} />
        <path d="M95 50 C 95 20 265 20 265 50" stroke={ink} />
        <T x={95} y={168}>anode</T>
        <T x={265} y={168}>cathode</T>
      </Frame>
    ),
  },
  crystal: {
    caption: "fcc: 4 atoms/cell. bcc: 2. Simple cubic: 1. Packing fractions 0.74, 0.68, 0.52.",
    node: (
      <Frame>
        <rect x="80" y="40" width="120" height="120" stroke={ink} />
        <circle cx="80" cy="40" r="8" stroke={ok} />
        <circle cx="200" cy="40" r="8" stroke={ok} />
        <circle cx="80" cy="160" r="8" stroke={ok} />
        <circle cx="200" cy="160" r="8" stroke={ok} />
        <circle cx="140" cy="100" r="8" fill={ok} />
        <T x={250} y={104} anchor="start">fcc face</T>
      </Frame>
    ),
  },
  octahedral: {
    caption: "Octahedral: six ligands, d²sp³ / sp³d². Splitting Δ_o decides high/low spin.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="10" fill={ok} />
        <L x1={180} y1={40} x2={180} y2={160} />
        <L x1={110} y1={100} x2={250} y2={100} />
        <L x1={140} y1={60} x2={220} y2={140} />
      </Frame>
    ),
  },
  titration: {
    caption: "Acid–base curve: steep near eq. Indicator pKa should sit in that jump.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 140 C 140 135 160 40 240 40 C 280 40 300 50 330 55" stroke={ink} />
        <T x={36} y={36} anchor="end">pH</T>
      </Frame>
    ),
  },
  venn: {
    caption: "A ∪ B, A ∩ B, A − B, A′. n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
    node: (
      <Frame>
        <circle cx="150" cy="100" r="55" stroke={ink} />
        <circle cx="210" cy="100" r="55" stroke={ok} />
        <T x={130} y={104}>A</T>
        <T x={230} y={104}>B</T>
      </Frame>
    ),
  },
  "function-graphs": {
    caption: "Identity, modulus, signum, greatest-integer, exp, ln — know the picture, domain and range.",
    node: (
      <Frame>
        <L x1={40} y1={100} x2={330} y2={100} />
        <L x1={180} y1={30} x2={180} y2={170} />
        <path d="M80 160 L 180 100 L 280 40" stroke={ink} />
      </Frame>
    ),
  },
  "unit-circle": {
    caption: "sin² + cos² = 1. CAST signs. Angle in radians = arc / r.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="70" stroke={ink} />
        <L x1={180} y1={100} x2={240} y2={60} />
        <T x={250} y={56} anchor="start">(cos, sin)</T>
      </Frame>
    ),
  },
  argand: {
    caption: "z = x + iy = re^{iθ}. Multiplication adds arguments, multiplies moduli.",
    node: (
      <Frame>
        <L x1={40} y1={160} x2={320} y2={160} />
        <L x1={60} y1={180} x2={60} y2={30} />
        <Arrow x1={60} y1={160} x2={220} y2={70} />
        <T x={230} y={66} anchor="start">z</T>
      </Frame>
    ),
  },
  "roots-unity": {
    caption: "nth roots of 1 sit on the unit circle at 2πk/n. Sum to 0 for n > 1.",
    node: (
      <Frame>
        <circle cx="180" cy="100" r="70" stroke={ink} />
        <circle cx="180" cy="30" r="4" fill={ok} />
        <circle cx="247" cy="135" r="4" fill={ok} />
        <circle cx="113" cy="135" r="4" fill={ok} />
      </Frame>
    ),
  },
  "ap-gp": {
    caption: "AP: T_n = a + (n−1)d. GP: T_n = ar^{n−1}, S_∞ = a/(1−r) for |r|<1.",
    node: (
      <Frame>
        <T x={80} y={90}>a</T>
        <T x={150} y={90}>a+d</T>
        <T x={230} y={90}>a+2d</T>
        <T x={80} y={140}>a</T>
        <T x={150} y={140}>ar</T>
        <T x={230} y={140}>ar²</T>
      </Frame>
    ),
  },
  "line-forms": {
    caption: "Slope-intercept y = mx + c. Two-point, intercept x/a + y/b = 1. Distance |ax0+by0+c|/√(a²+b²).",
    node: (
      <Frame>
        <L x1={40} y1={160} x2={320} y2={40} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <L x1={50} y1={180} x2={50} y2={30} />
      </Frame>
    ),
  },
  ellipse: {
    caption: "x²/a² + y²/b² = 1. Foci (±ae, 0), sum of focal distances = 2a.",
    node: (
      <Frame>
        <ellipse cx="180" cy="100" rx="130" ry="70" stroke={ink} />
        <circle cx="110" cy="100" r="3" fill={ok} />
        <circle cx="250" cy="100" r="3" fill={ok} />
      </Frame>
    ),
  },
  parabola: {
    caption: "y² = 4ax. Focus (a,0), directrix x = −a. Tangent ty = x + at².",
    node: (
      <Frame>
        <path d="M80 30 Q 280 100 80 170" stroke={ink} />
        <circle cx="160" cy="100" r="4" fill={ok} />
        <L x1={60} y1={30} x2={60} y2={170} dashed color={mute} />
      </Frame>
    ),
  },
  hyperbola: {
    caption: "x²/a² − y²/b² = 1. Asymptotes y = ±(b/a)x. Rectangular: a = b.",
    node: (
      <Frame>
        <path d="M40 40 Q 140 100 40 160" stroke={ink} />
        <path d="M320 40 Q 220 100 320 160" stroke={ink} />
        <L x1={60} y1={30} x2={300} y2={170} dashed color={mute} />
        <L x1={60} y1={170} x2={300} y2={30} dashed color={mute} />
      </Frame>
    ),
  },
  pascal: {
    caption: "Binomial (1+x)^n. Row n of Pascal is the coefficients. C(n,k) = C(n,n−k).",
    node: (
      <Frame>
        <T x={180} y={40}>1</T>
        <T x={160} y={70}>1</T>
        <T x={200} y={70}>1</T>
        <T x={140} y={100}>1</T>
        <T x={180} y={100}>2</T>
        <T x={220} y={100}>1</T>
        <T x={120} y={130}>1</T>
        <T x={160} y={130}>3</T>
        <T x={200} y={130}>3</T>
        <T x={240} y={130}>1</T>
      </Frame>
    ),
  },
  "number-line": {
    caption: "Linear inequality: closed dot if ≤ or ≥, open if < or >. Shade the true side.",
    node: (
      <Frame>
        <L x1={40} y1={100} x2={330} y2={100} />
        <circle cx="160" cy="100" r="6" fill={ok} />
        <L x1={160} y1={100} x2={320} y2={100} w={5} color={ok} />
      </Frame>
    ),
  },
  "tangent-curve": {
    caption: "Derivative = slope of the tangent. f′ > 0 increasing; f′′ > 0 convex.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M50 150 C 120 150 140 40 250 50 C 300 55 320 80 330 90" stroke={ink} />
        <L x1={120} y1={120} x2={250} y2={30} color={ok} />
      </Frame>
    ),
  },
  "area-curve": {
    caption: "Area = ∫_a^b |f − g| dx. Split at intersections. For x = g(y), integrate dy.",
    node: (
      <Frame>
        <L x1={40} y1={170} x2={40} y2={30} />
        <L x1={40} y1={170} x2={330} y2={170} />
        <path d="M60 150 Q 180 20 300 150" stroke={ink} />
        <path d="M60 150 L 300 150" stroke={mute} />
      </Frame>
    ),
  },
  "vector-3d": {
    caption: "r = x î + y ĵ + z k̂. Direction cosines l² + m² + n² = 1.",
    node: (
      <Frame>
        <Arrow x1={80} y1={160} x2={300} y2={160} />
        <Arrow x1={80} y1={160} x2={80} y2={40} />
        <Arrow x1={80} y1={160} x2={160} y2={100} />
        <T x={308} y={164} anchor="start">x</T>
        <T x={80} y={32}>z</T>
        <T x={168} y={96} anchor="start">y</T>
      </Frame>
    ),
  },
  histogram: {
    caption: "Ungrouped data: mean is the balance point, variance is mean squared deviation, range is max − min.",
    node: (
      <Frame viewBox="0 0 360 160">
        <L x1={40} y1={130} x2={330} y2={130} />
        <L x1={70} y1={130} x2={70} y2={90} w={14} />
        <L x1={120} y1={130} x2={120} y2={70} w={14} />
        <L x1={170} y1={130} x2={170} y2={50} w={14} />
        <L x1={220} y1={130} x2={220} y2={80} w={14} />
        <L x1={270} y1={130} x2={270} y2={40} w={14} />
      </Frame>
    ),
  },
  "matrix-mult": {
    caption: "AB is defined if columns of A = rows of B. AB ≠ BA in general. (AB)⁻¹ = B⁻¹ A⁻¹.",
    node: (
      <Frame>
        <rect x="50" y="50" width="80" height="100" stroke={ink} />
        <rect x="150" y="70" width="100" height="60" stroke={ink} />
        <rect x="270" y="50" width="60" height="100" stroke={ok} />
        <T x={90} y={104}>A</T>
        <T x={200} y={104}>B</T>
        <T x={300} y={104}>AB</T>
      </Frame>
    ),
  },
  parallax: {
    caption: "Parallax of a planet: two observatories a basis b apart see an angle θ. Distance D = b/θ (θ in radians). Angular size α then gives diameter d = α D.",
    node: (
      <Frame>
        <circle cx="180" cy="36" r="8" fill={ok} />
        <T x={180} y={22}>S</T>
        <L x1={80} y1={170} x2={280} y2={170} />
        <L x1={180} y1={36} x2={110} y2={170} />
        <L x1={180} y1={36} x2={250} y2={170} />
        <T x={110} y={188}>A</T>
        <T x={250} y={188}>B</T>
        <T x={180} y={188}>b</T>
        <T x={188} y={70} anchor="start">θ</T>
      </Frame>
    ),
  },
};

export const CHAPTER_FIGURE: Record<string, string> = {
  "phy-units": "vernier",
  "phy-motion-1d": "vt-graph",
  "phy-motion-2d": "projectile",
  "phy-nlm": "incline-fbd",
  "phy-wep": "work-theta",
  "phy-rotation": "rolling",
  "phy-gravitation": "kepler",
  "phy-solids": "stress-strain",
  "phy-fluids": "bernoulli-pipe",
  "phy-thermal": "expansion",
  "phy-thermo": "pv-cycle",
  "phy-ktg": "maxwell",
  "phy-oscillations": "pendulum",
  "phy-waves": "organ-pipe",
  "phy-charges": "gauss-sphere",
  "phy-potential": "capacitor",
  "phy-current": "wheatstone",
  "phy-moving": "helix",
  "phy-mag-matter": "solenoid",
  "phy-emi": "faraday-rail",
  "phy-ac": "ac-phasor",
  "phy-emw": "em-spectrum",
  "phy-ray": "prism",
  "phy-wave-opt": "huygens",
  "phy-dual": "photoelectric",
  "phy-atoms": "bohr",
  "phy-nuclei": "decay",
  "phy-semiconductors": "diode-iv",
  "phy-experimental": "vernier",
  "chem-basic": "mole",
  "chem-atom": "bohr",
  "chem-periodic": "periodic-ie",
  "chem-bonding": "hybrid-tet",
  "chem-thermo": "energy-profile",
  "chem-eq": "buffer-h",
  "chem-goc": "energy-profile",
  "chem-hc": "sn2",
  "chem-electro": "galvanic",
  "chem-kinetics": "energy-profile",
  "chem-solid": "crystal",
  "chem-coord": "octahedral",
  "chem-halo": "sn2",
  "chem-solutions": "titration",
  "chem-qual": "titration",
  "math-sets": "venn",
  "math-rel-11": "function-graphs",
  "math-rel-12": "function-graphs",
  "math-trig": "unit-circle",
  "math-invtrig": "unit-circle",
  "math-complex": "argand",
  "math-seq": "ap-gp",
  "math-straight": "line-forms",
  "math-conic": "ellipse",
  "math-binom": "pascal",
  "math-pnc": "venn",
  "math-ineq": "number-line",
  "math-limits": "tangent-curve",
  "math-cont": "tangent-curve",
  "math-aod": "tangent-curve",
  "math-int": "area-curve",
  "math-aoi": "area-curve",
  "math-vec": "vector-3d",
  "math-3d-11": "vector-3d",
  "math-3d-12": "vector-3d",
  "math-prob-11": "venn",
  "math-prob-12": "venn",
  "math-stats": "histogram",
  "math-matrices": "matrix-mult",
  "math-dets": "matrix-mult",
  "math-de": "tangent-curve",
  "math-lpp": "number-line",
};

export const EXTRA_FIGURES: Record<string, string[]> = {
  "phy-nlm": ["pulley", "circular", "banking", "galileo", "pull-push", "rope-p"],
  "phy-wep": ["spring-mass", "vertical-circle", "collision-1d", "work-theta"],
  "phy-gravitation": ["satellite", "kepler"],
  "phy-units": ["vernier", "parallax"],
  "phy-motion-2d": ["projectile", "pull-push"],
  "phy-oscillations": ["spring-mass", "pendulum"],
  "phy-rotation": ["rolling"],
  "phy-moving": ["helix", "solenoid"],
  "phy-emi": ["faraday-rail"],
  "phy-charges": ["gauss-line"],
  "phy-current": ["circuit-series", "rc-charge"],
  "phy-ray": ["lens", "prism"],
  "phy-nuclei": ["binding"],
  "phy-ac": ["transformer"],
  "phy-fluids": ["capillary"],
  "phy-waves": ["wave-string", "organ-pipe"],
  "phy-wave-opt": ["young-slits", "huygens"],
  "phy-solids": ["stress-strain", "young-moduli"],
  "chem-eq": ["titration"],
  "math-conic": ["parabola", "hyperbola", "ellipse"],
  "math-complex": ["roots-unity"],
  "math-trig": ["unit-circle"],
  "math-rel-11": ["function-graphs"],
  "math-stats": ["histogram"],
  "math-binom": ["pascal"],
};

export function figuresFor(chapterId: string): string[] {
  const head = CHAPTER_FIGURE[chapterId];
  const extra = EXTRA_FIGURES[chapterId] ?? [];
  const out: string[] = [];
  if (head) out.push(head);
  for (const id of extra) if (!out.includes(id)) out.push(id);
  return out;
}

export function Figure({ id, caption }: { id: string; caption?: string }) {
  const [focus, setFocus] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showRedraw, setShowRedraw] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [showTestAnswer, setShowTestAnswer] = useState(false);
  const fig = FIGURES[id];
  if (!fig) return null;
  const guide = diagramGuide(id, fig.caption);
  return (
    <figure
      className={cn(
        "relative my-5 overflow-hidden rounded-xl border border-border bg-raised/40 px-3 py-4",
        focus && "fixed inset-3 z-40 my-0 overflow-auto bg-bg p-5 shadow-2xl md:inset-10",
      )}
      aria-label={`Diagram: ${caption ?? fig.caption}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Visual model</p>
          <p className="mt-1 text-xs text-muted">Inspect the relationship, not only the labels.</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setShowGuide((value) => !value)}
            className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-md border px-2.5 text-xs", showGuide ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg")}
            aria-expanded={showGuide}
          >
            <Eye className="size-3.5" /> Read it
          </button>
          <button
            type="button"
            onClick={() => setShowRedraw((value) => !value)}
            className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-md border px-2.5 text-xs", showRedraw ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg")}
            aria-expanded={showRedraw}
          >
            <Pencil className="size-3.5" /> Redraw
          </button>
          <button
            type="button"
            onClick={() => { setShowTest((value) => !value); setShowTestAnswer(false); }}
            className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-md border px-2.5 text-xs", showTest ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg")}
            aria-expanded={showTest}
          >
            <CircleHelp className="size-3.5" /> Test yourself
          </button>
          <button
            type="button"
            onClick={() => setFocus((value) => !value)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs text-muted hover:text-fg"
            aria-label={focus ? "Close focused diagram" : "Focus diagram"}
          >
            {focus ? <X className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            {focus ? "Close" : "Focus"}
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-4 text-fg">{fig.node}</div>
      <figcaption className="mx-auto mt-3 max-w-lg text-center text-xs leading-relaxed text-subtle">
        {caption ?? fig.caption}
      </figcaption>
      {(showGuide || showRedraw || showTest) && (
        <div className="mx-auto mt-4 grid max-w-2xl gap-3 border-t border-border/70 pt-4 md:grid-cols-2">
          {showGuide && (
            <div className="rounded-lg border border-border bg-surface p-3 text-sm text-muted">
              <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">What to look for</p>
              <p className="mt-2 leading-relaxed">{guide.lookFor}</p>
              {guide.legend && <p className="mt-2 text-xs text-subtle">{guide.legend}</p>}
            </div>
          )}
          {showRedraw && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-sm text-muted">
              <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">Close the page</p>
              <p className="mt-2 leading-relaxed">{guide.drawPrompt}</p>
            </div>
          )}
          {showTest && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-sm text-muted md:col-span-2">
              <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">Predict before reading</p>
              <p className="mt-2 leading-relaxed">{guide.check?.question}</p>
              <button
                type="button"
                onClick={() => setShowTestAnswer((value) => !value)}
                className="mt-3 min-h-9 rounded-md border border-border bg-surface px-3 text-xs font-medium text-fg hover:bg-raised"
                aria-expanded={showTestAnswer}
              >
                {showTestAnswer ? "Hide the explanation" : "Reveal the relationship"}
              </button>
              {showTestAnswer && <p className="mt-3 leading-relaxed text-muted">{guide.check?.answer}</p>}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}

export const DIAGRAM_IDS = Object.keys(FIGURES);
