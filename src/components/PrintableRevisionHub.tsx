import React, { useState } from 'react';
import {
  Printer,
  FileText,
  BookOpen,
  Atom,
  FlaskConical,
  Binary,
  CheckCircle2,
  Sparkles,
  Download
} from 'lucide-react';

export function PrintableRevisionHub() {
  const [activeSheet, setActiveSheet] = useState<'physics' | 'chemistry' | 'biology' | 'kiswahili'>('physics');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-cyan-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider border border-cyan-400/30">
              <Printer className="w-3.5 h-3.5" />
              Print-Ready A4 Master Sheets
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              KCSE Quick-Revision Cheat Sheets & Formula Exporter
            </h1>
            <p className="text-cyan-100/90 text-sm sm:text-base leading-relaxed">
              Concise, high-yield summary sheets for the final 24 hours before your KCSE papers. Formatted in two-column
              A4 print layout covering essential formulas, qualitative reagent charts, and grammar tables.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:bg-cyan-300 transition-all shrink-0"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF (A4)
          </button>
        </div>
      </div>

      {/* Sheet Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 overflow-x-auto">
        {[
          { id: 'physics', label: '1. Physics Formulas & Laws', icon: Atom },
          { id: 'chemistry', label: '2. Chemistry Qualitative Reagent Chart', icon: FlaskConical },
          { id: 'biology', label: '3. Biology High-Yield Diagrams & Flowcharts', icon: BookOpen },
          { id: 'kiswahili', label: '4. Kiswahili Sarufi & Fasihi Cheat Sheet', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSheet === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSheet(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Printable Area Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm print:p-0 print:border-none print:shadow-none">
        {/* Printable Sheet Header */}
        <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 mb-6 flex justify-between items-end">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-slate-500">
              ELIMUHUB KENYA &bull; KNEC NATIONAL REVISION SERIES
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mt-1">
              {activeSheet === 'physics' && 'KCSE Physics Paper 1 & 2 Formula Master Sheet'}
              {activeSheet === 'chemistry' && 'KCSE Chemistry Qualitative Analysis & Reagents Flowchart'}
              {activeSheet === 'biology' && 'KCSE Biology Core Physiological Pathways & Genetics'}
              {activeSheet === 'kiswahili' && 'Kiswahili 102/2 Mwongozo wa Sarufi, Ngeli na Ushairi'}
            </h2>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            Form 1 – 4 Syllabus
          </div>
        </div>

        {/* Physics Formula Sheet */}
        {activeSheet === 'physics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
            {/* Mechanics */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                1. Mechanics &amp; Motion
              </h3>
              <ul className="space-y-1 font-mono">
                <li>&bull; Linear: v = u + at | s = ut + ½at² | v² = u² + 2as</li>
                <li>&bull; Newton II: F = ma = m(v - u) / t = Δp / Δt (Impulse = F · t)</li>
                <li>&bull; Momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ (Conservation)</li>
                <li>&bull; Circular: a_c = v² / r = ω²r | F_c = mv² / r</li>
                <li>&bull; Work &amp; Energy: W = Fd | E_k = ½mv² | E_p = mgh</li>
                <li>&bull; Power: P = W / t = Fv (Watts, W)</li>
                <li>&bull; Machines: M.A. = Load / Effort | V.R. = d_E / d_L | η = (M.A. / V.R.) × 100%</li>
              </ul>
            </div>

            {/* Thermal Physics */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                2. Thermal Physics &amp; Gas Laws
              </h3>
              <ul className="space-y-1 font-mono">
                <li>&bull; Heat Quantity: Q = mcΔθ (Joules, J)</li>
                <li>&bull; Latent Heat: Q = mL_f (Fusion) | Q = mL_v (Vaporization)</li>
                <li>&bull; Boyle&apos;s Law: P₁V₁ = P₂V₂ (T constant)</li>
                <li>&bull; Charles&apos; Law: V₁ / T₁ = V₂ / T₂ (P constant, T in Kelvin)</li>
                <li>&bull; Ideal Gas Equation: (P₁V₁) / T₁ = (P₂V₂) / T₂ (T = θ°C + 273)</li>
                <li>&bull; Pressure Law: P₁ / T₁ = P₂ / T₂</li>
              </ul>
            </div>

            {/* Waves & Optics */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                3. Waves &amp; Geometrical Optics
              </h3>
              <ul className="space-y-1 font-mono">
                <li>&bull; Wave Equation: v = fλ | T = 1 / f</li>
                <li>&bull; Snell&apos;s Law: n = sin i / sin r = v₁ / v₂ = Real depth / Apparent depth</li>
                <li>&bull; Critical Angle: sin C = 1 / n (C_glass ≈ 42°, C_water ≈ 48.6°)</li>
                <li>&bull; Lens Formula: 1 / f = 1 / u + 1 / v (Real is positive sign convention)</li>
                <li>&bull; Magnification: m = v / u = h_image / h_object</li>
                <li>&bull; Sound Echo: v = 2d / t</li>
              </ul>
            </div>

            {/* Electricity & Magnetism */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                4. Electricity &amp; Modern Physics
              </h3>
              <ul className="space-y-1 font-mono">
                <li>&bull; Ohm&apos;s Law: V = IR | Lost Volts: E = I(R + r) = V + Ir</li>
                <li>&bull; Resistors: Series R_s = R₁ + R₂ | Parallel 1/R_p = 1/R₁ + 1/R₂</li>
                <li>&bull; Electrical Energy: E = VIt = I²Rt = V²t / R</li>
                <li>&bull; Transformer: V_s / V_p = N_s / N_p = I_p / I_s (for 100% efficient)</li>
                <li>&bull; Photoelectric Effect: hf = hf₀ + ½mv²_max = W₀ + K.E._max</li>
                <li>&bull; Radioactive Decay: N = N₀ (½)^n where n = t / t_½</li>
              </ul>
            </div>
          </div>
        )}

        {/* Chemistry Qualitative Analysis Sheet */}
        {activeSheet === 'chemistry' && (
          <div className="space-y-6 text-xs">
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 font-bold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
                1. Cation Identification with Aqueous Sodium Hydroxide [NaOH(aq)] &amp; Ammonia [NH3(aq)]
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b">
                  <tr>
                    <th className="p-2.5">Cation</th>
                    <th className="p-2.5">A few drops NaOH(aq)</th>
                    <th className="p-2.5">Excess NaOH(aq)</th>
                    <th className="p-2.5">A few drops NH3(aq)</th>
                    <th className="p-2.5">Excess NH3(aq)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">Cu2+</td>
                    <td className="p-2.5">Blue precipitate</td>
                    <td className="p-2.5">Insoluble (remains blue)</td>
                    <td className="p-2.5">Pale blue precipitate</td>
                    <td className="p-2.5 text-blue-600 font-bold">Dissolves to deep blue solution [Cu(NH3)4]2+</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-600">Fe2+</td>
                    <td className="p-2.5">Dirty green precipitate</td>
                    <td className="p-2.5">Insoluble (turns brown on air)</td>
                    <td className="p-2.5">Dirty green precipitate</td>
                    <td className="p-2.5">Insoluble</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-600">Fe3+</td>
                    <td className="p-2.5">Brown / Red-brown ppt</td>
                    <td className="p-2.5">Insoluble</td>
                    <td className="p-2.5">Brown precipitate</td>
                    <td className="p-2.5">Insoluble</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Zn2+</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-emerald-600 font-bold">Dissolves to colorless solution</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-emerald-600 font-bold">Dissolves to colorless solution [Zn(NH3)4]2+</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Al3+</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-emerald-600 font-bold">Dissolves (amphoteric Al(OH)4-)</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-rose-600 font-bold">INSOLUBLE (Key test to distinguish from Zn2+)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Pb2+</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-emerald-600 font-bold">Dissolves (amphoteric Pb(OH)4 2-)</td>
                    <td className="p-2.5">White precipitate</td>
                    <td className="p-2.5 text-rose-600 font-bold">INSOLUBLE (Confirm with KI: yellow ppt PbI2)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Anion Confirmation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-700 dark:text-cyan-400">Chloride (Cl-) Test</div>
                <p className="text-slate-600 dark:text-slate-400">
                  Add dilute HNO3 + AgNO3(aq). Forms <strong>white precipitate of AgCl</strong> which dissolves in
                  dilute aqueous ammonia.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-700 dark:text-cyan-400">Sulphate (SO4 2-) Test</div>
                <p className="text-slate-600 dark:text-slate-400">
                  Add dilute HNO3 + Ba(NO3)2(aq). Forms <strong>white precipitate of BaSO4</strong> which is insoluble
                  in dilute nitric acid.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-700 dark:text-cyan-400">Carbonate / Sulphite</div>
                <p className="text-slate-600 dark:text-slate-400">
                  Add dilute acid: Effervescence of gas. If gas turns lime water milky, CO3 2- confirmed. If gas turns
                  orange acidified K2Cr2O7 green, SO3 2- confirmed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Biology Pathway Sheet */}
        {activeSheet === 'biology' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800 dark:text-slate-200">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                1. Photosynthesis: Light vs Dark Stage (Calvin Cycle)
              </h3>
              <ul className="space-y-1">
                <li>&bull; <strong>Light Stage (Grana/Thylakoid):</strong> Light absorbed by chlorophyll; photolysis of water (2H₂O → 4H⁺ + 4e⁻ + O₂). Produces ATP and NADPH.</li>
                <li>&bull; <strong>Dark Stage (Stroma):</strong> Carbon (IV) oxide combined with 5-carbon RuBP (catalysed by RuBisCO) to form unstable 6C compound, reduced by NADPH &amp; ATP to triose phosphate &amp; glucose.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                2. Cellular Respiration &amp; ATP Yield
              </h3>
              <ul className="space-y-1">
                <li>&bull; <strong>Glycolysis (Cytoplasm):</strong> Glucose (C₆) split into 2 Pyruvate (C₃); net yield 2 ATP and 2 NADH (anaerobic).</li>
                <li>&bull; <strong>Krebs Cycle (Mitochondrial Matrix):</strong> Acetyl CoA (C₂) + Oxaloacetate (C₄) → Citrate (C₆). Releases CO₂, produces NADH, FADH2, and ATP.</li>
                <li>&bull; <strong>Oxidative Phosphorylation (Cristae):</strong> Electron transport chain yield: 36–38 ATP per glucose molecule.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                3. Kidney Nephron Osmoregulation
              </h3>
              <ul className="space-y-1">
                <li>&bull; <strong>Ultrafiltration (Bowman&apos;s Capsule):</strong> High hydrostatic pressure forces water, glucose, salts, urea into capsule lumen. Blood cells & plasma proteins retained.</li>
                <li>&bull; <strong>Selective Reabsorption (PCT):</strong> 100% of glucose and amino acids reabsorbed by active transport with abundant mitochondria.</li>
                <li>&bull; <strong>Loop of Henle:</strong> Counter-current multiplier creates high salt concentration gradient in medulla.</li>
                <li>&bull; <strong>ADH Action:</strong> Increases water permeability of DCT and collecting duct during dehydration.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-xs border-b pb-1">
                4. Mendelian Inheritance & Blood Groups
              </h3>
              <ul className="space-y-1">
                <li>&bull; <strong>Monohybrid Heterozygous F2:</strong> Genotype 1:2:1 ($TT:Tt:tt$), Phenotype 3:1.</li>
                <li>&bull; <strong>Dihybrid Cross:</strong> Phenotypic ratio 9:3:3:1.</li>
                <li>&bull; <strong>ABO Blood Groups:</strong> Alleles $I^A, I^B$ (co-dominant) and $I^O$ (recessive). Genotypes: Group A ($I^A I^A, I^A I^O$), Group B ($I^B I^B, I^B I^O$), Group AB ($I^A I^B$), Group O ($I^O I^O$).</li>
                <li>&bull; <strong>Rhesus Factor:</strong> Rh- mother carrying Rh+ fetus $\rightarrow$ Erythroblastosis foetalis in 2nd pregnancy.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Kiswahili Sheet */}
        {activeSheet === 'kiswahili' && (
          <div className="space-y-6 text-xs text-slate-800 dark:text-slate-200">
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 font-bold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
                Jedwali la Muhtasari wa Ngeli Zote 9 za Kiswahili
              </div>
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b">
                  <tr>
                    <th className="p-2.5">Ngeli</th>
                    <th className="p-2.5">Mfano wa Nomino</th>
                    <th className="p-2.5">Kiambishi Kivumishi (Upatanisho)</th>
                    <th className="p-2.5">Kikanushi cha Kitendo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">A - WA</td>
                    <td className="p-2.5">Mtoto / Watoto, Kipepeo / Wipepeo</td>
                    <td className="p-2.5">mrefu / warefu (yu- / wa-)</td>
                    <td className="p-2.5">ha- / hawa-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">KI - VI</td>
                    <td className="p-2.5">Kiti / Viti, Kitabu / Vitabu</td>
                    <td className="p-2.5">kizuri / vizuri (ki- / vi-)</td>
                    <td className="p-2.5">haki- / havi-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">LI - YA</td>
                    <td className="p-2.5">Jicho / Macho, Gari / Magari</td>
                    <td className="p-2.5">kubwa / makubwa (li- / ya-)</td>
                    <td className="p-2.5">hali- / haya-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">U - I</td>
                    <td className="p-2.5">Mti / Miti, Mkono / Mikono</td>
                    <td className="p-2.5">mzuri / mizuri (u- / i-)</td>
                    <td className="p-2.5">hau- / hai-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">I - ZI</td>
                    <td className="p-2.5">Nyumba / Nyumba, Kalamu / Kalamu</td>
                    <td className="p-2.5">nzuri / nzuri (i- / zi-)</td>
                    <td className="p-2.5">hai- / hazi-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">U - YA</td>
                    <td className="p-2.5">Ugonjwa / Magonjwa, Upishi / Mapishi</td>
                    <td className="p-2.5">mbaya / mabaya (u- / ya-)</td>
                    <td className="p-2.5">hau- / haya-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">YA - YA</td>
                    <td className="p-2.5">Maziwa, Maji, Mafuta, Marashi</td>
                    <td className="p-2.5">mengi / safi (ya- / ya-)</td>
                    <td className="p-2.5">haya-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">KU</td>
                    <td className="p-2.5">Kusoma, Kuimba, Kulala (Nomino vitenzi)</td>
                    <td className="p-2.5">kuzuri (ku-)</td>
                    <td className="p-2.5">haku-</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-600">PA - KU - MU</td>
                    <td className="p-2.5">Mahali (pahali, mahali, humu ndani)</td>
                    <td className="p-2.5">pazuri / kuzuri / mzuri</td>
                    <td className="p-2.5">hapa- / haku- / hamu-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-cyan-700 dark:text-cyan-400">Bahari za Ushairi (Muundo)</div>
                <p>
                  &bull; <strong>Tathlitha:</strong> Beti za mishororo 3 | <strong>Tarbia:</strong> Mishororo 4 |{' '}
                  <strong>Takhmisa:</strong> Mishororo 5.
                </p>
                <p>
                  &bull; <strong>Ukaraguni:</strong> Vina vya kati na mwisho vinabadilika kila ubeti |{' '}
                  <strong>Kikwamba:</strong> Neno moja linarudiwa mwanzo wa kila mshororo.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-cyan-700 dark:text-cyan-400">Tanzu za Fasihi Simulizi</div>
                <p>
                  &bull; <strong>Hadithi:</strong> Visasili (asili ya vitu), Mighani (mashujaa km Luanda Magere), Ngano
                  (wanyama/mtanziko).
                </p>
                <p>
                  &bull; <strong>Semi:</strong> Methali, Vitendawili, Misimu, Mafumbo, Vitanza-ndimi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
