/**
 * Every number on this site is traceable to something in a public repository.
 * Where a figure exists only in a paper and cannot be reproduced from the code,
 * it is described that way rather than printed as a headline.
 */

export interface Link {
  readonly label: string
  readonly href: string
}

export interface Project {
  readonly name: string
  readonly repo: string
  readonly tagline: string
  /** Two or three sentences. What it is, and the one idea that makes it worth reading. */
  readonly body: readonly string[]
  readonly stack: readonly string[]
  /** Short, checkable claims. Anything unverifiable belongs in `caveat` instead. */
  readonly facts?: readonly string[]
  /** Stated plainly rather than omitted. */
  readonly caveat?: string
  readonly diagram?: 'sentinel' | 'meridian' | 'rideshare'
}

export interface Publication {
  readonly title: string
  readonly venue: string
  readonly method: string
  readonly repo?: string
}

export interface Role {
  readonly org: string
  readonly title: string
  readonly period: string
  readonly points: readonly string[]
}

export const profile = {
  name: 'Pranav T Pattanashetty',
  tagline: 'Applied machine learning, and the infrastructure it runs on.',
  blurb:
    "M.S. Computer Science at Indiana University, graduating May 2027. Software Development Engineer intern at SparkFX, working on agent orchestration in Next.js and TypeScript. Three peer-reviewed conference papers across computer vision, biosignal processing and LLM optimization. Open to new-grad software, machine learning and cloud engineering roles in the US.",
  location: 'Bloomington, Indiana',
  email: 'ppattana@iu.edu',
  links: [
    { label: 'GitHub', href: 'https://github.com/patsypppe' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranavpattanashetty' },
    { label: 'Email', href: 'mailto:ppattana@iu.edu' },
  ] satisfies readonly Link[],
} as const

export const projects: readonly Project[] = [
  {
    name: 'sentinel',
    repo: 'https://github.com/patsypppe/sentinel',
    tagline: 'MCP conformance, and a server worth grading',
    body: [
      'On 28 July 2026 the Model Context Protocol removed sessions and the `initialize` handshake, made `server/discover` mandatory, replaced server-initiated requests with Multi Round-Trip Requests, and put Roots, Sampling, Logging, HTTP+SSE and OAuth Dynamic Client Registration on a twelve-month removal clock. Every server written before that date is now non-conformant in ways its authors have not enumerated.',
      'Sentinel is two halves: a Go broker built natively on the new revision, and a Python harness that scans any MCP endpoint, grades it rule by rule with a specification citation attached to each finding, and inventories the deprecated features still in use with the date each becomes removable.',
      'The interesting part is what it refuses to say. Five normative MUST requirements cannot be settled from outside a server — whether a token audience is really checked, whether an inbound token reaches a downstream dependency, whether a retry is idempotent at the effect rather than in the reply. The harness reports those as INDETERMINATE, excludes them from the gate, and reprints them on every scan. A scanner that graded them as passes would be lying, and the clean report it produced would be worse than no report.',
    ],
    stack: ['Go', 'Python', 'Envoy', 'PostgreSQL', 'OpenTelemetry', 'SARIF'],
    facts: [
      '13k lines of Go, 5.7k of Python, 36 test files',
      '100% recall against 28 seeded violations, 0 false positives',
      'golangci-lint, go test -race, mypy and ruff enforced in CI',
      'No model API key required anywhere, so CI is fast and never externally flaky',
    ],
    diagram: 'sentinel',
  },
  {
    name: 'meridian',
    repo: 'https://github.com/patsypppe/meridian',
    tagline: 'Agent evaluation that reports its own blind spot',
    body: [
      'Answers one question: did this change make the agent better or worse, and can you reproduce that answer tomorrow. Every trial runs in its own container with its own workdir volume, and the suite ships a contamination probe with a deliberate failing direction — isolation is asserted rather than assumed, because a probe that cannot fail proves nothing.',
      'It never trusts the container. Assertions run on state extracted to the host, after the container is gone. In 2026 researchers broke several major agent benchmarks through exactly that hole — agents writing a `conftest.py` that rewrote every result to passed, or replacing `/usr/bin/curl` to emit fake output.',
      'Every verdict carries a minimum detectable effect: this run could only have caught a drop of 0.183 or larger; resolving a 0.030 tolerance would take about 262 tasks. A PASS from an underpowered suite is not evidence that nothing broke, and a gate that reports those identically teaches people to trust it exactly when it is least reliable.',
    ],
    stack: ['Python 3.12', 'Typer', 'Docker', 'Postgres', 'Alembic', 'Starlette'],
    facts: [
      'Measured by itself: 0/30 false regressions, 4/5 seeded regressions caught, 5/5 replay fidelity',
      'The one it misses is explained with the arithmetic rather than tuned away',
      '331 tests across unit, Docker-backed integration and end-to-end layers',
      'Scores pass^k with bootstrap CI, not a single accuracy number',
    ],
    diagram: 'meridian',
  },
  {
    name: 'serverless-rideshare-aws',
    repo: 'https://github.com/patsypppe/serverless-rideshare-aws',
    tagline: 'Six Lambda services, and a README that admits what is missing',
    body: [
      'A ride-sharing backend decomposed into six Lambda-backed services behind an HTTP API Gateway, with a separate WebSocket API for live location, DynamoDB for state, Cognito for auth, and the environment declared in Terraform rather than clicked together in a console.',
      'Ride hailing is the textbook always-on backend, which normally means paying for servers that sit idle between requests. This is the same system built so that nothing runs between rides.',
    ],
    stack: ['Node.js', 'Terraform', 'Lambda', 'DynamoDB', 'API Gateway v2', 'Cognito'],
    caveat:
      'An architecture and service-layer study, not a deployed product. The Terraform provisions the data and edge layer but does not yet declare the Lambda functions, routes or IAM roles, so it does not deploy end to end. The repository says so on its front page.',
    diagram: 'rideshare',
  },
  {
    name: 'cricket-shot-classification',
    repo: 'https://github.com/patsypppe/cricket-shot-classification',
    tagline: 'Video classification with a physics-informed loss',
    body: [
      'Five model variants over the same seven-class problem, written to be compared: a CNN-GRU with key-frame selection, a MobileNet baseline, a 3D ResNet with a Vision Transformer, and a physics-informed model that adds temporal continuity, energy and momentum terms to the classification loss.',
      'A bat swing is a smooth trajectory, so a model whose per-frame beliefs jump around is wrong even when its final answer is right. The physics terms penalise exactly that.',
    ],
    stack: ['PyTorch', 'ViT', '3D ResNet', 'Grad-CAM', 'Weights & Biases'],
    caveat:
      'Research code behind a peer-reviewed conference paper, released as-is. The video dataset is not redistributable and no trained checkpoints or result artifacts are committed, so the accuracy reported in the paper cannot be reproduced from this repository alone.',
  },
  {
    name: 'metaheuristic-llm-finetuning',
    repo: 'https://github.com/patsypppe/metaheuristic-llm-finetuning',
    tagline: 'How much of a model should you freeze? Search for it',
    body: [
      'Usually that decision is a guess — freeze everything but the last few layers. This treats the freezing schedule as a search problem instead, running a genetic algorithm and the Whale Optimization Algorithm over freezing percentage and crossover operator for RoBERTa on SST-2.',
      'Two findings held across every configuration: SBX crossover wins, and less freezing wins.',
    ],
    stack: ['PyTorch', 'Hugging Face', 'RoBERTa', 'genetic algorithms', 'SST-2'],
    facts: ['Best result 94.67% accuracy (Whale Optimization, SBX crossover, 30% layer freezing)'],
    caveat:
      'The genetic-algorithm experiment is committed as a notebook; the Whale Optimization implementation is not in the repository, though its results are.',
  },
  {
    name: 'EMG-Dumbbell-press',
    repo: 'https://github.com/patsypppe/EMG-Dumbbell-press',
    tagline: 'Exercise form from two channels of surface EMG',
    body: [
      'A signal problem before it is a modelling problem. Neither the deltoid nor the pectoral channel says much alone, so the pipeline computes windowed RMS, integrated area, skewness and kurtosis per channel and classifies the balance between them.',
    ],
    stack: ['TensorFlow/Keras', 'LSTM', 'SciPy', 'pandas'],
    facts: ['Best validation accuracy in the committed notebooks is 92.5%'],
    caveat:
      'On a small split of roughly 80 samples, which the repository states alongside the figure.',
  },
]

export const publications: readonly Publication[] = [
  {
    title: 'Cricket shot classification from video',
    venue: 'Computing Conference, United Kingdom',
    method: 'Vision Transformers with a physics-informed loss',
    repo: 'https://github.com/patsypppe/cricket-shot-classification',
  },
  {
    title: 'Enhancing fine-tuning of pre-trained language models with metaheuristic algorithms',
    venue: '11th ICSCMI, Melbourne',
    method: 'Genetic algorithm and Whale Optimization over the layer-freezing schedule',
    repo: 'https://github.com/patsypppe/metaheuristic-llm-finetuning',
  },
  {
    title: 'Exercise form detection from surface electromyography',
    venue: '6th IEEE Conference, Malaysia',
    method: 'Windowed signal features with recurrent models',
    repo: 'https://github.com/patsypppe/EMG-Dumbbell-press',
  },
]

export const roles: readonly Role[] = [
  {
    org: 'SparkFX',
    title: 'Software Development Engineer Intern',
    period: 'June 2026 — present',
    points: [
      'Community Builder: connecting communities such as HOAs and resolving member issues through AI agent orchestration with automatic delegation.',
      'Reported 30% reduction in operational cost and manual handling through that orchestration, and 20% faster page loads through caching.',
      'Next.js 16 App Router, TypeScript, Tailwind v4.',
    ],
  },
  {
    org: 'PROLIM Solutions India',
    title: 'Software Developer Intern',
    period: 'January — April 2025',
    points: [
      'Built 7+ REST APIs with role-based access control and dashboards for a manufacturing management system spanning three production lines, used daily by 20+ operators.',
      'Cut batch processing from 20–25 minutes to 8–10, reduced manual data entry 50% and errors 30%, and shrank release rollout from five days to two.',
      'Earned the Mendix Rapid Developer certification.',
    ],
  },
  {
    org: 'LiRC Tek Solutions',
    title: 'Software Developer Intern',
    period: 'June — August 2024',
    points: [
      'Automated transportation-management rate-confirmation processing in Python, cutting per-order handling time 45%.',
      'Built regex parsers that eliminated 80% of manual document review at 95% extraction accuracy.',
    ],
  },
]
