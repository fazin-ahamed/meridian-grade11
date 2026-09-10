import { useMemo, useState } from "react";
import { LabReadout, LabSlider, LabSurface, LabSvg, ink, mute, ok } from "@/components/lab-guidance";

function Text({ x, y, children, anchor = "middle", color = mute, size = 11 }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; color?: string; size?: number }) {
  return <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={size} fontFamily="var(--font-sans)">{children}</text>;
}

function MoleLab() {
  const [h2, setH2] = useState(8);
  const [o2, setO2] = useState(5);
  const extent = Math.min(Math.floor(h2 / 2), o2);
  const water = extent * 2;
  const leftH2 = h2 - extent * 2;
  const leftO2 = o2 - extent;
  return (
    <LabSurface title="Mole ratio: 2H₂ + O₂ → 2H₂O" lead="The equation is a particle recipe. The limiting reactant decides how far the recipe can run; grams come only after the mole ratio is used." formula="2H_2+O_2\longrightarrow2H_2O">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 190">
          <Text x={55} y={22} color={mute}>starting particles</Text>
          {Array.from({ length: h2 }, (_, i) => <circle key={`h${i}`} cx={45 + (i % 4) * 24} cy={55 + Math.floor(i / 4) * 28} r="7" stroke={ink} />)}
          {Array.from({ length: o2 }, (_, i) => <circle key={`o${i}`} cx={165 + (i % 4) * 24} cy={55 + Math.floor(i / 4) * 28} r="7" stroke={ok} />)}
          <line x1="280" y1="38" x2="280" y2="150" stroke={mute} strokeDasharray="4 3" />
          <Text x={320} y={22} color={ok}>product</Text>
          {Array.from({ length: water }, (_, i) => <circle key={`w${i}`} cx={310} cy={55 + i * 25} r="8" fill={ok} fillOpacity="0.25" stroke={ok} />)}
          <Text x={180} y={176} color={mute}>{`reaction extent = ${extent}; H₂ left = ${leftH2}; O₂ left = ${leftO2}`}</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="H₂ particles" value={h2} min={0} max={16} step={1} onChange={setH2} />
        <LabSlider label="O₂ particles" value={o2} min={0} max={10} step={1} onChange={setO2} />
      </div>
      <LabReadout items={[{ k: "limiting", v: extent === 0 ? "none" : h2 / 2 <= o2 ? "H₂" : "O₂" }, { k: "H₂O made", v: String(water) }, { k: "H₂ left", v: String(leftH2) }, { k: "O₂ left", v: String(leftO2) }]} />
    </LabSurface>
  );
}

function AtomLab() {
  const [n, setN] = useState(3);
  const [z, setZ] = useState(1);
  const radius = (n * n) / z;
  const energy = -13.6 * z * z / (n * n);
  return (
    <LabSurface title="Quantum levels: n and Z" lead="The level number changes the radius and energy. Nuclear charge changes both, so compare one variable at a time." formula="r_n=\frac{n^2a_0}{Z},\quad E_n=-\frac{13.6Z^2}{n^2}\,\mathrm{eV}">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 210">
          <circle cx="76" cy="105" r="14" fill={ok} fillOpacity="0.3" stroke={ok} />
          <Text x={76} y={109} color={ok}>+Z</Text>
          {Array.from({ length: 5 }, (_, i) => <line key={i} x1="135" y1={165 - i * 28} x2="320" y2={165 - i * 28} stroke={i + 1 === n ? ink : mute} strokeWidth={i + 1 === n ? 2 : 1} />)}
          <Text x={325} y={169} anchor="start">n=1</Text>
          <Text x={325} y={141} anchor="start">n=2</Text>
          <Text x={325} y={113} anchor="start">n=3</Text>
          <Text x={325} y={85} anchor="start">n=4</Text>
          <Text x={325} y={57} anchor="start">n=5</Text>
          <line x1="100" y1="105" x2="135" y2={165 - (n - 1) * 28} stroke={ok} strokeDasharray="4 3" />
          <Text x={180} y={198} color={mute}>selected level highlighted</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="principal level n" value={n} min={1} max={5} step={1} onChange={setN} />
        <LabSlider label="nuclear charge Z" value={z} min={1} max={3} step={1} onChange={setZ} />
      </div>
      <LabReadout items={[{ k: "r / a₀", v: radius.toFixed(2) }, { k: "Eₙ", v: `${energy.toFixed(2)} eV` }, { k: "level", v: `n = ${n}` }, { k: "photon cue", v: "ΔE = hν" }]} />
    </LabSurface>
  );
}

function PeriodicLab() {
  const [period, setPeriod] = useState(3);
  const [group, setGroup] = useState(14);
  const [metric, setMetric] = useState<"radius" | "ionisation" | "electronegativity">("radius");
  const value = metric === "radius" ? 2.3 - group * 0.08 + period * 0.18 : metric === "ionisation" ? 0.55 + group * 0.07 - period * 0.04 : 0.4 + group * 0.04 - period * 0.03;
  const points = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const g = i + 1;
    const v = metric === "radius" ? 2.3 - g * 0.08 + period * 0.18 : metric === "ionisation" ? 0.55 + g * 0.07 - period * 0.04 : 0.4 + g * 0.04 - period * 0.03;
    return `${25 + i * 18},${150 - v * (metric === "radius" ? 38 : 70)}`;
  }).join(" "), [metric, period]);
  return (
    <LabSurface title="Periodic trends: attraction and shielding" lead="The graph is a model, not a memory arrow. Across a period, nuclear attraction usually grows; down a group, extra shells and shielding usually grow." >
      <div className="flex flex-wrap gap-2">
        {(["radius", "ionisation", "electronegativity"] as const).map((item) => <button key={item} type="button" onClick={() => setMetric(item)} className={`min-h-10 rounded-lg border px-3 text-sm capitalize ${metric === item ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:bg-raised hover:text-fg"}`}>{item}</button>)}
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 190">
          <line x1="24" y1="150" x2="338" y2="150" stroke={mute} />
          <line x1="24" y1="24" x2="24" y2="150" stroke={mute} />
          <polyline points={points} stroke={ink} strokeWidth="2" fill="none" />
          <circle cx={25 + (group - 1) * 18} cy={150 - value * (metric === "radius" ? 38 : 70)} r="5" fill={ok} />
          <Text x={180} y={176} color={mute}>group →</Text>
          <Text x={12} y={30} color={mute}>property</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="period" value={period} min={1} max={5} step={1} onChange={setPeriod} />
        <LabSlider label="group" value={group} min={1} max={18} step={1} onChange={setGroup} />
      </div>
      <LabReadout items={[{ k: "selected", v: `period ${period}, group ${group}` }, { k: "model value", v: value.toFixed(2) }, { k: "across period", v: metric === "radius" ? "generally falls" : "generally rises" }, { k: "down group", v: metric === "radius" ? "generally rises" : "generally falls" }]} />
    </LabSurface>
  );
}

function BondingLab() {
  const [bonded, setBonded] = useState(3);
  const [lone, setLone] = useState(1);
  const domains = bonded + lone;
  const shape = domains === 2 ? "linear" : domains === 3 ? (lone === 0 ? "trigonal planar" : "bent" ) : domains === 4 ? (lone === 0 ? "tetrahedral" : lone === 1 ? "trigonal pyramidal" : "bent") : "expanded domain model";
  const points = Array.from({ length: bonded }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / bonded;
    return { x: 180 + Math.cos(angle) * 70, y: 100 + Math.sin(angle) * 70 };
  });
  const lonePoints = Array.from({ length: lone }, (_, i) => {
    const angle = Math.PI / 2 + (i * Math.PI) / Math.max(lone, 1);
    return { x: 180 + Math.cos(angle) * 48, y: 100 + Math.sin(angle) * 48 };
  });
  return (
    <LabSurface title="VSEPR shape builder" lead="Count electron domains around the central atom. Lone pairs occupy more space than bonding pairs, so electron geometry and molecular shape can differ." formula="\text{steric number}=\text{bonding domains}+\text{lone-pair domains}">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 200">
          {points.map((point, i) => <line key={i} x1="180" y1="100" x2={point.x} y2={point.y} stroke={ink} strokeWidth="1.5" />)}
          {lonePoints.map((point, i) => <circle key={`l${i}`} cx={point.x} cy={point.y} r="10" stroke={mute} strokeDasharray="3 2" />)}
          <circle cx="180" cy="100" r="16" fill={ok} fillOpacity="0.25" stroke={ok} />
          <Text x={180} y={104} color={ok}>central</Text>
          {points.map((point, i) => <circle key={`p${i}`} cx={point.x} cy={point.y} r="8" stroke={ink} />)}
          {lonePoints.map((point, i) => <Text key={`lt${i}`} x={point.x} y={point.y + 4} color={mute} size={9}>LP</Text>)}
          <Text x={180} y={182} color={mute}>{shape}</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="bonding domains" value={bonded} min={2} max={4} step={1} onChange={setBonded} />
        <LabSlider label="lone pairs" value={lone} min={0} max={2} step={1} onChange={setLone} />
      </div>
      <LabReadout items={[{ k: "steric number", v: String(domains) }, { k: "electron domains", v: domains <= 4 ? ["—", "linear", "trigonal planar", "tetrahedral"][domains - 1]! : "expanded" }, { k: "molecular shape", v: shape }, { k: "angle cue", v: lone ? "compressed by lone pairs" : "ideal domain angles" }]} />
    </LabSurface>
  );
}

function ThermoLab() {
  const [endothermic, setEndothermic] = useState(false);
  const [catalyst, setCatalyst] = useState(false);
  const reactant = 105;
  const product = endothermic ? 145 : 65;
  const peak = catalyst ? 165 : 190;
  const deltaH = product - reactant;
  const yFor = (energy: number) => 175 - energy * 0.55;
  const reactantY = yFor(reactant);
  const productY = yFor(product);
  const peakY = yFor(peak);
  return (
    <LabSurface title="Thermochemistry energy profile" lead="The height difference between reactants and products is ΔH. The peak is the activation barrier. A catalyst changes the path, not the endpoints." formula="\Delta H=H_{products}-H_{reactants}">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 210">
          <line x1="30" y1="175" x2="335" y2="175" stroke={mute} />
          <path d={`M40 ${reactantY} C 110 ${reactantY}, 120 ${peakY}, 180 ${peakY} S 250 ${productY}, 320 ${productY}`} stroke={ink} strokeWidth="2" fill="none" />
          <line x1="40" y1={reactantY} x2="120" y2={reactantY} stroke={ok} strokeDasharray="4 3" />
          <line x1="240" y1={productY} x2="320" y2={productY} stroke={ok} strokeDasharray="4 3" />
          <Text x={60} y={192} color={mute}>reactants</Text>
          <Text x={287} y={192} color={mute}>products</Text>
          <Text x={180} y={Math.max(28, peakY - 10)} color={ok}>Ea</Text>
          <Text x={180} y={207} color={mute}>ΔH {deltaH >= 0 ? "+" : ""}{deltaH} units</Text>
        </LabSvg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setEndothermic((value) => !value)} className="min-h-10 rounded-lg border border-border px-3 text-sm text-muted hover:bg-raised hover:text-fg">{endothermic ? "Show exothermic" : "Show endothermic"}</button>
        <button type="button" onClick={() => setCatalyst((value) => !value)} className="min-h-10 rounded-lg border border-border px-3 text-sm text-muted hover:bg-raised hover:text-fg">{catalyst ? "Remove catalyst" : "Add catalyst"}</button>
      </div>
      <LabReadout items={[{ k: "ΔH", v: `${deltaH >= 0 ? "+" : ""}${deltaH}` }, { k: "reaction", v: endothermic ? "endothermic" : "exothermic" }, { k: "catalyst", v: catalyst ? "Ea lower" : "none" }, { k: "endpoint energies", v: "unchanged by catalyst" }]} />
    </LabSurface>
  );
}

function GocLab() {
  const [nucleophile, setNucleophile] = useState(2);
  const [electrophile, setElectrophile] = useState(2);
  const targetWidth = 24 + electrophile * 8;
  const targetLeft = 208 - targetWidth / 2;
  const arrowEnd = Math.min(targetLeft - 10, 120 + 34 + nucleophile * 8);
  const donorLabel = ["weak", "moderate", "strong"][nucleophile - 1];
  const targetLabel = ["slightly δ+", "δ+", "strongly δ+"][electrophile - 1];
  return (
    <LabSurface title="Curved-arrow electron flow" lead="Organic mechanisms become easier when every arrow starts at an electron pair and ends at an electron-poor site. This is a qualitative model, not a reaction-rate law." formula="\text{:Nu}^-+\mathrm{C}^{\delta+}\!−\!\mathrm{LG}\longrightarrow\mathrm{Nu}−\mathrm{C}+\mathrm{LG}^-">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 180">
          <rect x="42" y="62" width="78" height="54" rx="10" stroke={ok} strokeWidth={1 + nucleophile * 0.4} />
          <Text x={81} y={86} color={ok}>:Nu:</Text>
          <Text x={81} y={104} color={mute} size={10}>{donorLabel} donor</Text>
          <rect x={targetLeft} y="62" width={targetWidth} height="54" rx="10" stroke={ink} strokeWidth={1 + electrophile * 0.35} />
          <Text x={208} y={86}>C</Text>
          <Text x={208} y={104} color={mute} size={10}>{targetLabel}</Text>
          <line x1={120} y1="89" x2={arrowEnd} y2="89" stroke={ok} strokeWidth={1 + nucleophile * 0.45} />
          <path d={`M${arrowEnd} 89 l-8 -5 m8 5 l-8 5`} stroke={ok} strokeWidth="1.4" />
          <line x1={208 + targetWidth / 2} y1="89" x2="300" y2="89" stroke={mute} strokeDasharray="4 3" />
          <Text x={300} y={80} anchor="start" color={mute}>LG</Text>
          <Text x={180} y={152} color={mute}>arrow starts at donor → ends at acceptor</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="nucleophile electron density" value={nucleophile} min={1} max={3} step={1} onChange={setNucleophile} />
        <LabSlider label="electrophile electron deficiency" value={electrophile} min={1} max={3} step={1} onChange={setElectrophile} />
      </div>
      <LabReadout items={[{ k: "donor", v: donorLabel }, { k: "target", v: targetLabel }, { k: "arrow source", v: ":Nu: pair" }, { k: "next check", v: "follow charge" }]} />
    </LabSurface>
  );
}

function EquilibriumLab() {
  const [stress, setStress] = useState(0);
  const K = 0.5;
  const added = Math.abs(stress) * 2;
  const disturbedA = 4 + (stress < 0 ? added : 0);
  const disturbedB = 2 + (stress > 0 ? added : 0);
  const total = disturbedA + disturbedB;
  const equilibriumA = total / (1 + K);
  const equilibriumB = K * equilibriumA;
  const direction = stress > 0 ? "shifts left (toward A)" : stress < 0 ? "shifts right (toward B)" : "no shift";
  return (
    <LabSurface title="Equilibrium shift: A ⇌ B" lead="This closed, constant-temperature model holds K = 0.5. A disturbance changes composition; the system then shifts until [B]/[A] returns to K." formula="K=\frac{[B]}{[A]}=0.5">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 190">
          <line x1="40" y1="150" x2="320" y2="150" stroke={mute} />
          <rect x="52" y={150 - disturbedA * 14} width="42" height={disturbedA * 14} fill={ink} fillOpacity="0.12" stroke={ink} strokeDasharray="4 3" />
          <rect x="132" y={150 - equilibriumA * 14} width="42" height={equilibriumA * 14} fill={ink} fillOpacity="0.28" stroke={ink} />
          <rect x="214" y={150 - disturbedB * 14} width="42" height={disturbedB * 14} fill={ok} fillOpacity="0.12" stroke={ok} strokeDasharray="4 3" />
          <rect x="294" y={150 - equilibriumB * 14} width="42" height={equilibriumB * 14} fill={ok} fillOpacity="0.28" stroke={ok} />
          <Text x={73} y={168}>A*</Text>
          <Text x={153} y={168}>A</Text>
          <Text x={235} y={168} color={ok}>B*</Text>
          <Text x={315} y={168} color={ok}>B</Text>
          <Text x={180} y={22} color={ok}>{direction}</Text>
          <Text x={180} y={184} color={mute} size={9}>dashed = after stress · solid = re-equilibrated</Text>
        </LabSvg>
      </div>
      <LabSlider label="disturbance: − add A / + add B" value={stress} min={-1} max={1} step={0.1} onChange={setStress} />
      <LabReadout items={[{ k: "[A] equilibrium", v: equilibriumA.toFixed(1) }, { k: "[B] equilibrium", v: equilibriumB.toFixed(1) }, { k: "response", v: direction }, { k: "K after shift", v: (equilibriumB / equilibriumA).toFixed(2) }]} />
    </LabSurface>
  );
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

function RedoxLab() {
  const [loss, setLoss] = useState(2);
  const [gain, setGain] = useState(3);
  const common = gcd(loss, gain);
  const donor = gain / common;
  const acceptor = loss / common;
  return (
    <LabSurface title="Redox electron bookkeeping" lead="Oxidation loses electrons and reduction gains them. The coefficients are chosen so total electrons lost equal total electrons gained." formula="\text{electrons lost}=\text{electrons gained}">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 150">
          <rect x="40" y="50" width="100" height="50" rx="8" stroke={ink} />
          <rect x="220" y="50" width="100" height="50" rx="8" stroke={ok} />
          <Text x={90} y={80}>oxidised</Text>
          <Text x={270} y={80} color={ok}>reduced</Text>
          <line x1="140" y1="75" x2="220" y2="75" stroke={ok} strokeWidth="2" />
          <Text x={180} y={60} color={ok}>{`${loss}e⁻ → ${gain}e⁻`}</Text>
        </LabSvg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <LabSlider label="electrons lost per donor" value={loss} min={1} max={6} step={1} onChange={setLoss} />
        <LabSlider label="electrons gained per acceptor" value={gain} min={1} max={6} step={1} onChange={setGain} />
      </div>
      <LabReadout items={[{ k: "donor coefficient", v: String(donor) }, { k: "acceptor coefficient", v: String(acceptor) }, { k: "total e⁻", v: String(donor * loss) }, { k: "rule", v: "charge conserved" }]} />
    </LabSurface>
  );
}

function HydrocarbonLab() {
  const [carbon, setCarbon] = useState(4);
  const [saturated, setSaturated] = useState(true);
  const formula = `C${carbon}H${saturated ? 2 * carbon + 2 : 2 * carbon}`;
  const pts = Array.from({ length: carbon }, (_, i) => `${45 + i * 65},${i % 2 ? 120 : 75}`).join(" ");
  return (
    <LabSurface title="Hydrocarbon structure builder" lead="The carbon skeleton, bond order, and hydrogen count are linked. Toggle saturation and read the formula before choosing a reaction family." formula="\text{alkane }C_nH_{2n+2},\quad \text{alkene }C_nH_{2n}">
      <div className="overflow-hidden rounded-xl border border-border bg-raised/50 p-3">
        <LabSvg viewBox="0 0 360 190">
          <polyline points={pts} stroke={ink} strokeWidth="2" fill="none" />
          {!saturated && carbon > 1 && <line x1="42" y1="70" x2="108" y2="115" stroke={ok} strokeWidth="4" opacity="0.6" />}
          {Array.from({ length: carbon }, (_, i) => <circle key={i} cx={45 + i * 65} cy={i % 2 ? 120 : 75} r="11" fill="var(--color-bg)" stroke={ok} />)}
          <Text x={180} y={172} color={mute}>{saturated ? "single-bond skeleton" : "one π bond shown in accent"}</Text>
        </LabSvg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <LabSlider label="carbon atoms" value={carbon} min={2} max={6} step={1} onChange={setCarbon} />
        <button type="button" onClick={() => setSaturated((value) => !value)} className="min-h-10 self-end rounded-lg border border-border px-3 text-sm text-muted hover:bg-raised hover:text-fg">{saturated ? "Add double bond" : "Saturate"}</button>
      </div>
      <LabReadout items={[{ k: "formula", v: formula }, { k: "family", v: saturated ? "alkane" : "alkene" }, { k: "hybridisation cue", v: saturated ? "sp³" : "sp² at π bond" }, { k: "reaction cue", v: saturated ? "substitution" : "addition" }]} />
    </LabSurface>
  );
}

const CHEM_LABS: Record<string, () => React.ReactNode> = {
  "chem-basic": MoleLab,
  "chem-atom": AtomLab,
  "chem-periodic": PeriodicLab,
  "chem-bonding": BondingLab,
  "chem-thermo": ThermoLab,
  "chem-eq": EquilibriumLab,
  "chem-redox": RedoxLab,
  "chem-goc": GocLab,
  "chem-hc": HydrocarbonLab,
};

export function hasChemistryLab(chapterId: string) {
  return Boolean(CHEM_LABS[chapterId]);
}

export function ChemistryLab({ chapterId }: { chapterId: string }) {
  const lab = CHEM_LABS[chapterId];
  return lab ? <div className="space-y-6">{lab()}</div> : null;
}
