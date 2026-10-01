/**
 * Everything the page says lives here, typed. The page itself is layout only.
 *
 * Screenshots are real captures of the running apps, stored as WebP in
 * public/shots/<file>-<width>.webp for every width listed in `widths`.
 */

export interface Link {
  readonly label: string
  readonly href: string
}

export interface Shot {
  /** Base name under public/shots, without the width suffix. */
  readonly file: string
  /** Widths that exist on disk, smallest first. The last one is the full-size link. */
  readonly widths: readonly number[]
  /** Intrinsic size of the largest file, so the browser can reserve space. */
  readonly width: number
  readonly height: number
  readonly alt: string
  readonly caption: string
}

export interface Fact {
  readonly label: string
  readonly value: string
}

/** A product: something with users and screens. */
export interface Product {
  readonly id: string
  readonly name: string
  readonly summary: string
  readonly status?: string
  readonly link?: Link
  readonly body: readonly string[]
  readonly facts: readonly Fact[]
  readonly stack: readonly string[]
  readonly hero: Shot
  readonly gallery: readonly Shot[]
}

/** A real console capture. `note` says how and when it was produced. */
export interface Transcript {
  readonly title: string
  readonly lines: readonly string[]
  readonly note: string
}

/** An open-source tool: the evidence is the repository. */
export interface Tool {
  readonly name: string
  readonly repo: string
  readonly summary: string
  readonly body: readonly string[]
  readonly facts: readonly string[]
  readonly stack: readonly string[]
  readonly diagram: 'sentinel' | 'meridian'
  readonly transcript?: Transcript
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
  readonly place?: string
  readonly period: string
  readonly points: readonly string[]
}

export interface School {
  readonly name: string
  readonly degree: string
  readonly period: string
  readonly note?: string
}

export const profile = {
  name: 'Pranav T Pattanashetty',
  role: 'Software engineer',
  lede: [
    'I’m finishing an M.S. in Computer Science at Indiana University (May 2027). This summer I was a software development engineer intern at SparkFX.',
    'Outside class I build products end to end. Creuno is a sponsorship marketplace for creators, now in beta. AIGO is a serverless ride-hailing platform on AWS. I’ve also published three peer-reviewed papers in applied machine learning.',
  ],
  looking: 'Open to new-grad software, machine learning and cloud roles starting in 2027.',
  location: 'Bloomington, Indiana',
  email: 'ppattana@iu.edu',
  links: [
    { label: 'GitHub', href: 'https://github.com/patsypppe' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranavpattanashetty' },
    { label: 'Email', href: 'mailto:ppattana@iu.edu' },
  ] satisfies readonly Link[],
} as const

const creunoShot = (file: string, alt: string, caption: string): Shot => ({
  file,
  widths: [800, 1280],
  width: 1280,
  height: 800,
  alt,
  caption,
})

export const products: readonly Product[] = [
  {
    id: 'creuno',
    name: 'Creuno',
    summary: 'A workspace and sponsorship marketplace for creators.',
    status: 'In beta',
    link: { label: 'creuno.com', href: 'https://creuno.com' },
    body: [
      'Creators plan and publish content, see what is working across their channels, and run brand deals from the first pitch to a paid invoice. Brands post campaigns, review applicants and follow results as they come in. I built it with one other engineer.',
      'Every table sits behind Postgres row-level security, so a creator can only read their own deals and a brand only its own campaigns. A deal moves through an explicit state machine (accepted, delivered, invoiced, paid, complete), which keeps the money from drifting out of step with the work.',
      'The Creator Coach answers from the creator’s own analytics, content and deal history through pgvector retrieval, its output is schema-validated before it renders, and a promptfoo evaluation suite in CI checks that it does not invent metrics.',
    ],
    facts: [
      { label: 'Shipped', value: '323 pull requests, 216 database migrations' },
      { label: 'Backend', value: 'Supabase and Postgres with row-level security, 24 edge functions' },
      { label: 'Release gate', value: '85% statement coverage, 397 Playwright end-to-end tests' },
      { label: 'AI', value: 'Gemini and Groq-hosted Mistral, pgvector retrieval, Zod-validated output' },
      { label: 'Frontend', value: '27 lazy-loaded routes, so a first visit fetches one page' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'PostgreSQL', 'pgvector', 'LangGraph', 'Vitest', 'Playwright'],
    hero: creunoShot(
      'creuno-home',
      'Creuno home screen: a left sidebar with Home, Analytics, Discover People, Campaigns, Collabs, Workspace, Calendar, Creator Coach, Messages and Deals. The main area greets the creator and shows cards for $16,700 in motion across 15 active deals, 76 new opportunities, a calendar, 67.9K total audience across two connected channels, a Creator Coach chat panel and a creator score of 62 out of 100.',
      'Home. Money in motion, what is due this week, and the coach one click away.',
    ),
    gallery: [
      creunoShot(
        'creuno-analytics',
        'Creuno analytics overview: total audience 67.9K, average engagement 12.3%, 43 posts tracked, top format Reels, and a YouTube channel health score of 63 with a follower trend line and top post.',
        'Analytics across YouTube and Instagram, with a channel health score.',
      ),
      creunoShot(
        'creuno-deals',
        'Creuno deals table: 24 deals, 15 in motion, $11,400 earned. Rows list each sponsorship with its stage icons, status, fee, start date and brand.',
        'Every sponsorship in one table: stage, status, fee and brand.',
      ),
      creunoShot(
        'creuno-coach',
        'Creuno Creator Coach: a prompt box reading "Ask anything about your work" with suggested questions such as which post makes the strongest case to a brand and what to charge for a three-video deal.',
        'The Creator Coach, grounded in the creator’s own numbers.',
      ),
      creunoShot(
        'creuno-campaign',
        'Creuno brand view of a campaign, PureFlow 30-Day Challenge: campaign photos, the brief, deliverables, applicants and accepted counts, days left, budget committed against a ceiling, and results.',
        'The brand side: a live campaign with its brief, budget and results.',
      ),
    ],
  },
  {
    id: 'aigo',
    name: 'AIGO',
    summary: 'Serverless ride-hailing on AWS, with the machine learning kept off the trip path.',
    body: [
      'Riders book a trip and follow it live; drivers go online and get matched. Behind the web client are 11 services, six of them Node.js Lambda microservices on API Gateway, EventBridge, SQS and DynamoDB, split along five workflows: trip matching, payments, notifications, ETA prediction and driver location.',
      'Finding nearby drivers is the hot path, so driver positions are bucketed by geohash on a DynamoDB global secondary index. Against 100,000 seeded drivers that reads 95.06% fewer items than a scan at 100% recall, and building the benchmark exposed a 100x unit error in the radius-to-cell conversion, which is now fixed.',
      'Demand forecasting, dynamic pricing, fraud scoring, support-message triage and rider-driver matching run on Amazon Bedrock and SageMaker as asynchronous, event-driven paths, so a slow model call never holds up a live trip.',
    ],
    facts: [
      { label: 'Services', value: '11, including 6 Node.js Lambda microservices' },
      { label: 'Location reads', value: '95.06% fewer items with geohash buckets, 100% recall' },
      { label: 'API cost', value: 'HTTP API over REST API Gateway, about 70% less per request at list price' },
      { label: 'Shared code', value: 'One Lambda layer used by all 6 services' },
      { label: 'Infrastructure', value: 'Terraform, GitHub Actions, CloudWatch' },
    ],
    stack: ['Node.js', 'AWS Lambda', 'API Gateway', 'EventBridge', 'SQS', 'DynamoDB', 'Bedrock', 'SageMaker', 'Terraform', 'React', 'Leaflet'],
    hero: {
      file: 'aigo-trip',
      widths: [1280, 2560],
      width: 2560,
      height: 1542,
      alt: 'AIGO live trip screen: a street map with the car at the pickup point and a line to the drop-off pin, a LIVE WEBSOCKET badge, and a progress list where finding a driver, driver assigned and driver on the way are done and on the trip is current.',
      caption: 'A trip in progress. The driver position and status arrive over the WebSocket API.',
    },
    gallery: [
      {
        file: 'aigo-rider',
        widths: [1000, 2000],
        width: 2000,
        height: 1600,
        alt: 'AIGO rider dashboard: 5 total rides, $14.92 spent, an active ride with a Track ride button, a Book a ride card, and a list of recent rides with distance, ride type, fare and status.',
        caption: 'Rider dashboard with trip history, fares and the active ride.',
      },
      {
        file: 'aigo-driver',
        widths: [1000, 2000],
        width: 2000,
        height: 1600,
        alt: 'AIGO driver mode: the driver is online and available with a 5.0 rating, vehicle details for a 2024 white Toyota Corolla Hybrid, and a map showing the driver position.',
        caption: 'Driver mode. Going online writes the driver’s geohash so they can be matched.',
      },
    ],
  },
]

export const tools: readonly Tool[] = [
  {
    name: 'sentinel',
    repo: 'https://github.com/patsypppe/sentinel',
    summary: 'A stateless MCP server in Go, and a harness that grades any MCP server against the spec.',
    body: [
      'The July 2026 revision of the Model Context Protocol removed sessions and made every server written before it non-conformant in ways nobody had listed. Sentinel is a Go broker built on the new revision, behind Envoy, plus a Python harness that scans any endpoint and grades it rule by rule, with the specification clause attached to each finding.',
      'Five MUST requirements cannot be checked from outside a server, such as whether a token’s audience is really validated. The harness reports those as indeterminate and leaves them out of the gate instead of counting them as passes.',
    ],
    facts: [
      '52-rule executable conformance catalog with SARIF output and an exit-code contract for CI',
      '39 of 39 seeded violations caught, 0 false positives',
      'Retries made idempotent by sealing request state with AEAD',
      'Manifest tokenization 80.45% faster, verified with benchstat at n=10',
    ],
    stack: ['Go', 'Python', 'Envoy', 'PostgreSQL', 'OpenTelemetry', 'Docker Compose'],
    diagram: 'sentinel',
    transcript: {
      title: 'the same harness against two servers',
      lines: [
        '$ sentinel scan --endpoint http://127.0.0.1:9000/mcp --gate must   # unmigrated',
        '',
        'MUST:   2 pass, 25 fail, 5 indeterminate, 0 n/a',
        'SHOULD: 1 pass,  4 fail, 0 n/a',
        '37 rules in 0.42s',
        '5 MUST rule(s) cannot be verified black-box and were excluded from the gate.',
        'exit 1',
        '',
        '$ sentinel scan --endpoint http://127.0.0.1:9001/mcp --gate must   # conformant',
        '',
        'MUST:   27 pass, 0 fail, 5 indeterminate, 0 n/a',
        'SHOULD:  5 pass, 0 fail, 0 n/a',
        '37 rules in 0.29s',
        '5 MUST rule(s) cannot be verified black-box and were excluded from the gate.',
        'exit 0',
      ],
      note: 'Captured on 24 August 2026 against the fixtures in the repository, when the catalog had 37 rules. Exit 1 means the server failed the gate; exit 2 is reserved for the scanner itself failing.',
    },
  },
  {
    name: 'meridian',
    repo: 'https://github.com/patsypppe/meridian',
    summary: 'An agent evaluation harness that tells you how small a regression it could have missed.',
    body: [
      'Every trial runs in its own container, and assertions run on state copied out to the host after the container is gone, so an agent cannot pass by rewriting its own test results. A contamination probe with a deliberate failing direction checks that the isolation actually holds.',
      'Scores are pass^k with a cluster bootstrap and a paired significance test, and every verdict reports its minimum detectable effect. A pass from an underpowered suite is not evidence that nothing broke, and the gate says so.',
    ],
    facts: [
      '0 false regressions across 30 gate runs',
      '4 of 5 seeded regressions caught, with the miss explained in the results file',
      '5 of 5 archived runs replayed byte-exact',
      'Minimum detectable effect 0.183; a 0.030 tolerance needs about 262 tasks',
    ],
    stack: ['Python', 'Docker', 'PostgreSQL', 'Alembic', 'pytest', 'mypy --strict'],
    diagram: 'meridian',
    transcript: {
      title: 'the unit layer, on a machine with no Docker',
      lines: [
        '$ uv run pytest -m unit -q',
        '',
        '........................................................................ [ 31%]',
        '........................................................................ [ 63%]',
        '........................................................................ [ 95%]',
        '...........                                                              [100%]',
        '',
        'SKIPPED [1] tests/integration/test_budget_halt.py:98:',
        '  the Docker daemon is not reachable; integration tests need it',
        '',
        '226 passed, 1 skipped, 46 deselected in 3.20s',
      ],
      note: 'Captured on 24 August 2026. The tests that need real container isolation refuse to run without it rather than quietly passing.',
    },
  },
]

export const publications: readonly Publication[] = [
  {
    title: 'Cricket shot classification from video',
    venue: 'Computing Conference, United Kingdom',
    method: 'A 3D ResNet-18 trained with a physics-informed loss: temporal continuity, energy and momentum terms.',
    repo: 'https://github.com/patsypppe/cricket-shot-classification',
  },
  {
    title: 'Enhancing fine-tuning of pre-trained language models with metaheuristic algorithms',
    venue: '11th ICSCMI, Melbourne',
    method: 'A genetic algorithm and the Whale Optimization Algorithm searching the layer-freezing schedule for RoBERTa.',
    repo: 'https://github.com/patsypppe/metaheuristic-llm-finetuning',
  },
  {
    title: 'Exercise form detection from surface electromyography',
    venue: '6th IEEE Conference, Malaysia',
    method: 'Windowed signal features from two surface EMG channels, classified with recurrent models.',
    repo: 'https://github.com/patsypppe/EMG-Dumbbell-press',
  },
]

export const roles: readonly Role[] = [
  {
    org: 'SparkFX',
    title: 'Software Development Engineer Intern',
    place: 'Charlotte, NC',
    period: 'Jun – Aug 2026',
    points: [],
  },
  {
    org: 'PROLIM Solutions',
    title: 'Software Developer Intern',
    period: 'Jan – Apr 2025',
    points: [
      'Built Java and Spring Boot services with 7+ role-protected REST APIs for order, inventory and QC workflows, used daily by 20+ operators on three production lines.',
      'Cut batch processing from 20–25 minutes to 8–10 by rewriting query plans, batching writes and indexing high-volume tables.',
      'Shortened release rollout from five days to two with OpenAPI service contracts and JUnit tests in Jenkins CI.',
    ],
  },
  {
    org: 'LiRC Tek Solutions',
    title: 'Software Developer Intern',
    place: 'Bengaluru, India',
    period: 'Jun – Aug 2024',
    points: [
      'Built a PDF-to-TMS ingestion pipeline that writes 15+ fields per order, cutting manual review 80% and per-order handling time 45%.',
      'Wrote the Python extraction service over AWS Textract and pdfplumber at 95% field accuracy, with per-field failure isolation.',
    ],
  },
]

export const schools: readonly School[] = [
  {
    name: 'Indiana University Bloomington',
    degree: 'M.S., Computer Science',
    period: '2025 – 2027',
    note: 'GPA 3.89. Assistant instructor for Introduction to Programming.',
  },
  {
    name: 'PES University',
    degree: 'B.Tech., Computer Science',
    period: '2021 – 2025',
  },
]
