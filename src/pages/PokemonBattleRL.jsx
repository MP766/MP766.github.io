import { Link } from "react-router-dom";

const cohorts = [
  {
    title: "Multi-scenario DQN",
    methodology: "Five early battles · 20 seeded episodes per scenario and policy · 100 episodes per policy",
    max: 100,
    results: [
      { name: "Random", faints: 71, reward: "+11.97", color: "bg-zinc-500" },
      { name: "Always Tackle", faints: 74, reward: "+15.02", color: "bg-sky-500" },
      { name: "DQN", faints: 74, reward: "+15.02", color: "bg-emerald-500" },
    ],
    note: "Deterministic DQN selected Tackle for all 542 evaluated decisions. It matched the fixed Tackle baseline rather than demonstrating an advantage over it.",
  },
  {
    title: "Initial MaskablePPO evaluation",
    methodology: "Six scenarios · 20 seeded episodes per scenario and policy · 120 episodes per policy",
    max: 120,
    results: [
      { name: "Random legal", faints: 88, reward: "+13.19", color: "bg-zinc-500" },
      { name: "First valid", faints: 95, reward: "+18.36", color: "bg-sky-500" },
      { name: "MaskablePPO", faints: 95, reward: "+18.40", color: "bg-emerald-500" },
    ],
    note: "Across 360 battles there were zero invalid actions and zero truncations. PPO made differentiated selections in one three-move scenario, but this is not evidence of general intelligence.",
  },
  {
    title: "Expanded MaskablePPO evaluation",
    methodology: "Existing model, no retraining · 28 scenarios · three seeds per scenario and policy · 252 battles total",
    max: 84,
    results: [
      { name: "Random legal", faints: 64, reward: "+19.70", color: "bg-zinc-500", detail: "20 player faints · 0 truncations" },
      { name: "First valid", faints: 53, reward: "+11.21", color: "bg-sky-500", detail: "25 player faints · 6 truncations" },
      { name: "MaskablePPO", faints: 62, reward: "+20.48", color: "bg-emerald-500", detail: "16 player faints · 6 truncations" },
    ],
    note: "Zero invalid actions. All 12 truncations across policies came from reaching the 30-turn limit. An enemy faint marks success; this is not necessarily a complete trainer-battle win.",
  },
];

const phases = [
  {
    phase: "Phase 1 · Early Game",
    status: "Current",
    title: "Foundation",
    accent: "border-emerald-500 bg-emerald-500/10",
    badge: "bg-emerald-400 text-emerald-950",
    copy: "Version 1 covers encounters collected from early Pokémon Blue through Brock’s Gym, including wild Pokémon and multi-Pokémon trainer snapshots.",
    items: ["28 collected scenarios", "DQN and MaskablePPO tooling", "Dynamic four-slot actions and masks", "One-, two-, and three-move examples tested"],
  },
  {
    phase: "Phase 2 · Mid Game",
    status: "Planned",
    title: "Scenario expansion",
    accent: "border-sky-800 bg-sky-950/30",
    badge: "bg-sky-900 text-sky-200",
    copy: "Expand coverage as the manual playthrough progresses, with richer movesets, matchups, status tradeoffs, and resource pressure.",
    items: ["Broader scenario diversity", "Dataset balance review", "Stronger evaluation splits", "Performance on unseen encounters"],
  },
  {
    phase: "Phase 3 · Late Game",
    status: "Future",
    title: "Advanced experiments",
    accent: "border-violet-900 bg-violet-950/20",
    badge: "bg-violet-950 text-violet-200",
    copy: "Explore longer, more demanding encounters and broader strategic choices. Story progression remains manual, not autonomous.",
    items: ["Four-move encounter validation", "Longer and harder battles", "Potential switching and items", "Potential team and capture decisions"],
  },
];

const limitations = [
  ["Early-game sampling bias", "Many sampled opponents are weak, so repeated attacks are often effective."],
  ["Reward-shaping bias", "Damage and faint rewards can favor immediate damage over setup or status moves."],
  ["Short horizon", "Episodes stop at 30 turns. Effects on stalling are plausible but not yet established."],
  ["Small evaluation samples", "The expanded evaluation uses only three seeds per scenario, so it cannot support strong statistical claims."],
  ["Partial observability", "The 10-value observation contains HP ratios, four move IDs, and four PP values—not opponent identity, types, or stat stages."],
  ["Episode boundary", "Fainting one active enemy ends an episode; later Pokémon in a trainer battle use separate save states."],
  ["Move selection only", "Switching, capture, items, persistent knowledge, and autonomous game progression are not implemented."],
  ["Generalization remains open", "Unseen captures can still share conditions or movesets with training; rigorous held-out splits are future work."],
  ["Historical logger limitation", "An older PPO logger did not correctly track executed slot 2 because it iterated over only two slots. New logging requires separate verification."],
  ["Fourth slot not yet validated", "The interface represents four move slots, but a four-move encounter has not been explicitly tested."],
];

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="max-w-3xl space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
      {children ? <p className="text-zinc-300">{children}</p> : null}
    </div>
  );
}

function ArchitectureFlow() {
  const steps = [
    ["Observe", "Read HP, move IDs, PP, and battle phase from Pokémon Blue in PyBoy"],
    ["Decide", "The DQN or MaskablePPO policy selects a currently valid move slot"],
    ["Execute", "The controller navigates the real game menu and validates the move"],
    ["Reward / Learn", "New state, rewards, outcomes, and structured experiment logs feed the loop"],
  ];

  return (
    <ol className="grid gap-3 md:grid-cols-4" aria-label="Reinforcement learning loop">
      {steps.map(([title, copy], index) => (
        <li key={title} className="relative rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-bold text-zinc-950">{index + 1}</span>
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          <p className="text-sm leading-6 text-zinc-400">{copy}</p>
        </li>
      ))}
    </ol>
  );
}

function ResultsChart({ cohort }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h3 className="text-lg font-semibold text-white">{cohort.title}</h3>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{cohort.methodology}</p>
      <div className="mt-5 space-y-4">
        {cohort.results.map((result) => (
          <div key={result.name}>
            <div className="mb-1 flex items-end justify-between gap-4 text-sm">
              <span className="text-zinc-300">{result.name}</span>
              <span className="text-right font-mono text-zinc-200">{result.faints}/{cohort.max} enemy faints · {result.reward} mean reward</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800" role="img" aria-label={`${result.name}: ${result.faints} enemy faints out of ${cohort.max}`}>
              <div className={`h-full rounded-full ${result.color}`} style={{ width: `${(result.faints / cohort.max) * 100}%` }} />
            </div>
            {result.detail ? <p className="mt-1 text-right text-xs text-zinc-500">{result.detail}</p> : null}
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-zinc-800 pt-4 text-sm leading-6 text-zinc-400">{cohort.note}</p>
    </article>
  );
}

function TechnicalDetails() {
  return (
    <div className="space-y-3">
      <details className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5" open>
        <summary className="cursor-pointer font-semibold text-white">Why Python, PyBoy, and the original game?</summary>
        <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          <p>I deliberately built around Pokémon Blue rather than a custom battle simulator. That keeps battle behavior authentic while PyBoy provides direct emulator and memory access without an additional language bridge.</p>
          <p>Reproducible save states load battle scenarios; the system reads game memory, tracks battle phases, sends controller inputs, and records the resulting state and outcome.</p>
        </div>
      </details>
      <details className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <summary className="cursor-pointer font-semibold text-white">Diagnosing the persistent cursor bug</summary>
        <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          <p>I initially assumed the fight-menu cursor reset between turns. It actually persisted, producing unintended Tail Whip selections and sometimes navigating into ITEM, where execution validation failed.</p>
          <p>The correction was to read the current cursor position from game RAM, calculate relative navigation, and validate the requested and executed moves through their PP change. The mistaken assumption became a concrete emulator-integration lesson.</p>
        </div>
      </details>
      <details className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <summary className="cursor-pointer font-semibold text-white">Gymnasium interface and agent evolution</summary>
        <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          <p>The environment implements reset, observation, action, reward, terminated, and truncated behavior. Save-state selection varies battles, while seeded evaluation keeps policy comparisons reproducible.</p>
          <p>The first DQN used two actions. Version 1 evolved to four represented move slots, move IDs and PP in the observation, dynamic valid actions, and MaskablePPO action masks. Four-slot representation is complete; execution with four actual available moves still needs a dedicated validation encounter.</p>
        </div>
      </details>
      <details className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <summary className="cursor-pointer font-semibold text-white">Experiment workflow</summary>
        <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          <p>Scenario save states, seeded baseline policies, model checkpoints, and structured CSV logs support repeatable training and evaluation. Current results are snapshots from distinct cohorts, so comparisons stay within each cohort rather than mixing raw rates across different evaluations.</p>
        </div>
      </details>
    </div>
  );
}

export default function PokemonBattleRL({ project }) {
  return (
    <article className="space-y-16 pb-8">
      <header className="space-y-8">
        <Link to="/projects" className="inline-block text-sm text-zinc-400 hover:text-zinc-200">← Back to Projects</Link>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">V1 · Battle RL Foundation</span>
              <span className="text-sm text-zinc-400">Independent developer / project architect</span>
            </div>
            <div>
              <p className="text-sm text-emerald-400">{project.category}</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-6xl">Pokémon Battle RL</h1>
              <p className="mt-4 max-w-3xl text-xl leading-8 text-zinc-300">Teaching an AI to battle in Pokémon Blue through experience.</p>
            </div>
            <p className="max-w-3xl leading-7 text-zinc-400">Version 1 is an operational research platform that turns battles in the actual Game Boy game into reproducible reinforcement-learning experiments. It is a bounded foundation—not a claim that the agent has mastered Pokémon.</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => <span key={tech} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">{tech}</span>)}
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"><dt className="text-xs text-zinc-500">Scenarios</dt><dd className="mt-1 text-3xl font-bold text-white">28</dd></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"><dt className="text-xs text-zinc-500">RL approaches</dt><dd className="mt-1 text-3xl font-bold text-white">2</dd></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"><dt className="text-xs text-zinc-500">Move slots</dt><dd className="mt-1 text-3xl font-bold text-white">4*</dd></div>
            <p className="col-span-3 text-xs leading-5 text-zinc-500">*Four slots are represented dynamically; execution with four available moves has not yet been separately validated.</p>
          </dl>
        </div>

        <ArchitectureFlow />
      </header>

      <section className="space-y-6">
        <SectionHeading eyebrow="Live system" title="Pokémon Blue is the environment">Battles run inside the original game through PyBoy—not inside a simplified battle simulator.</SectionHeading>
        <div className="grid gap-4 md:grid-cols-5">
          {["Pokémon Blue in PyBoy", "Memory reader + phase tracker", "Gymnasium environment", "DQN / MaskablePPO", "Controller + experiment logs"].map((label, index) => (
            <div key={label} className="flex items-center gap-3 md:block">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm font-medium text-zinc-200 md:min-h-20">{label}</div>
              {index < 4 ? <span aria-hidden="true" className="text-zinc-600 md:block md:py-2 md:text-center">→</span> : null}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8 text-center">
          <p className="font-medium text-zinc-300">Gameplay recording placeholder</p>
          <p className="mt-1 text-sm text-zinc-500">Replace with a short capture of an automated battle when verified footage is available.</p>
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Why I built it</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Could a novice agent become a better battler through experience?</h2>
        </div>
        <div className="space-y-3 leading-7 text-zinc-300">
          <p>I was inspired by Pokémon AI videos about map exploration and hand-designed battle decisions. They led me to ask whether an agent could incrementally learn useful battle behavior rather than having every answer hardcoded for it.</p>
          <p>The long-term idea is to investigate learning around moves, damage, types, effectiveness, and strategy. For Version 1, I deliberately narrowed that ambition to building a credible battle-learning foundation around the real Pokémon Blue game. The project reflects a willingness to learn unfamiliar tools, question mistaken assumptions, and carry an experiment through to a useful stopping point—not a claim of ML expertise or solved game intelligence.</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Progression roadmap" title="Current foundation, planned complexity">These phases describe future scenario expansion within the battle project. Only the early-game foundation is currently delivered.</SectionHeading>
        <div className="grid gap-4 lg:grid-cols-3">
          {phases.map((phase) => (
            <article key={phase.phase} className={`rounded-2xl border p-5 ${phase.accent}`}>
              <div className="flex items-center justify-between gap-3"><p className="text-xs uppercase tracking-wider text-zinc-400">{phase.phase}</p><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${phase.badge}`}>{phase.status}</span></div>
              <h3 className="mt-4 text-xl font-semibold text-white">{phase.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{phase.copy}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">{phase.items.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-emerald-400">•</span>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm leading-6 text-zinc-400"><strong className="text-zinc-200">Iterative evolution:</strong> Each capstone is intended to build on a stable predecessor. Capstone 1 establishes the battle-learning and experimentation platform; subsequent capstones may branch or fork from that foundation to explore more advanced learning capabilities. Planned stages describe future work, not functionality already delivered.</p>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Grounded results" title="What the agents actually did">Each chart compares policies only within its own evaluation cohort. Bar length represents active enemy Pokémon fainted, not complete trainer battles won.</SectionHeading>
        <div className="space-y-4">{cohorts.map((cohort) => <ResultsChart key={cohort.title} cohort={cohort} />)}</div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-900 bg-emerald-950/20 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Observed success</p><h3 className="mt-2 text-lg font-semibold text-white">Bubble against Brock</h3><p className="mt-2 text-sm leading-6 text-zinc-300">Across four Brock’s Gym snapshots and three seeds each, MaskablePPO produced 12/12 enemy faints and consistently selected slot 2, Bubble. This may reflect a slot or move preference; it does not prove learned type effectiveness.</p></article>
          <article className="rounded-2xl border border-amber-900 bg-amber-950/20 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Observed limitation</p><h3 className="mt-2 text-lg font-semibold text-white">Growl until timeout</h3><p className="mt-2 text-sm leading-6 text-zinc-300">In two Growl-first encounters, MaskablePPO repeatedly selected the non-damaging move and reached the 30-turn limit. Deliberate stalling is only a hypothesis and requires controlled testing.</p></article>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Read before interpreting" title="Limitations, bias, and caveats">The system is useful because its boundaries are explicit. These constraints shape what the current results can—and cannot—show.</SectionHeading>
        <div className="grid gap-3 md:grid-cols-2">{limitations.map(([title, copy]) => <article key={title} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"><h3 className="font-semibold text-zinc-200">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{copy}</p></article>)}</div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Technical deep dive" title="Building the learning platform">The majority of the challenge was reliable game integration, state interpretation, and experiment infrastructure.</SectionHeading>
        <TechnicalDetails />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-2xl font-bold text-white">Reflection</h2>
          <p className="leading-7 text-zinc-300">Inspired by other Pokémon AI projects, I chose this as a demanding first personal machine-learning project. I expected the work to feel roughly 20% infrastructure and 80% ML; my rough experience was closer to 60% infrastructure and 40% ML.</p>
          <p className="leading-7 text-zinc-300">The achievement was reaching an operational Version 1 with an intentional stopping point—not “solving Pokémon.” I especially enjoyed investigating model decisions and seeing simple strategies challenge my expectations about multi-turn setup play.</p>
        </div>
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-2xl font-bold text-white">What comes next</h2>
          <div><h3 className="font-semibold text-emerald-400">Capstone 1 improvements</h3><p className="mt-1 text-sm leading-6 text-zinc-300">Scenario metadata, stronger logging, automated validation, configuration-driven selection, held-out evaluations, analytics dashboards, and documentation.</p></div>
          <div><h3 className="font-semibold text-violet-300">Capstone 2 · Planned evolution</h3><p className="mt-1 text-sm leading-6 text-zinc-300">A future separate fork may explore mechanics discovery, acquired knowledge, adaptation, and broader strategic decisions. This fork and these capabilities do not currently exist.</p></div>
          <p className="text-sm leading-6 text-zinc-500">Manual story progress remains an external gate: access to encounters such as Snorlax or Pokémon Tower depends on manually reaching the required game milestones and capturing new save states.</p>
        </div>
      </section>
    </article>
  );
}
