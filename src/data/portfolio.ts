/**
 * Everything the page says lives here, typed. The page itself is layout only.
 *
 * Every number on the site is a measurement that lives in a repository or a
 * paper, and every one is stored here next to what it measures. Screenshots are
 * real captures of the running apps, stored as WebP in
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

/**
 * One bar in a measurement. `value` is drawn against the measurement's `scale`,
 * so two bars in one measurement are always comparable at a glance.
 */
export interface Bar {
  readonly label: string
  readonly value: number
  /** What the reader sees next to the bar, exactly as measured. */
  readonly shown: string
  /** The bar the reader should look at: the result, not the baseline. */
  readonly result?: boolean
}

export interface Measure {
  /** One plain sentence saying what was measured. */
  readonly title: string
  readonly scale: number
  readonly bars: readonly Bar[]
  /** How, where and against what it was measured. */
  readonly note: string
}

/** A product: something with users and screens. */
export interface Product {
  readonly id: string
  readonly name: string
  readonly summary: string
  readonly status?: string
  readonly links: readonly Link[]
  readonly body: readonly string[]
  readonly measures: readonly Measure[]
  readonly stack: readonly string[]
  readonly hero: Shot
  readonly gallery: readonly Shot[]
}

/** An open-source tool: the evidence is the repository. */
export interface Tool {
  readonly id: string
  readonly name: string
  readonly repo: string
  readonly summary: string
  readonly body: readonly string[]
  readonly measures: readonly Measure[]
  readonly stack: readonly string[]
  readonly diagram: 'sentinel' | 'meridian'
}

export interface Publication {
  readonly title: string
  readonly venue: string
  readonly finding: string
  readonly repo?: string
}

export interface Role {
  readonly org: string
  readonly title: string
  readonly place?: string
  readonly period: string
}

export interface School {
  readonly name: string
  readonly degree: string
  readonly period: string
  readonly note?: string
}

/** One line in the opening index: where a piece of work is, and its headline result. */
export interface IndexEntry {
  readonly href: string
  readonly name: string
  readonly result: string
}

export const profile = {
  name: 'Pranav T Pattanashetty',
  headline: 'I build software, then measure whether it works.',
  lede: 'Software engineer finishing an M.S. in Computer Science at Indiana University in May 2027. Three engineering internships, two products I built with one other engineer, two open-source tools for AI agents, and three peer-reviewed papers.',
  looking: 'Open to new-grad software, AI and cloud roles starting in 2027.',
  location: 'Bloomington, Indiana',
  email: 'ppattana@iu.edu',
  links: [
    { label: 'Email', href: 'mailto:ppattana@iu.edu' },
    { label: 'GitHub', href: 'https://github.com/patsypppe' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranavpattanashetty' },
  ] satisfies readonly Link[],
} as const

export const index: readonly IndexEntry[] = [
  { href: '#creuno', name: 'Creuno', result: 'Sponsorship marketplace, in beta with 30 users' },
  { href: '#aigo', name: 'AIGO', result: 'Finds nearby drivers reading 95% less data' },
  { href: '#sentinel', name: 'Sentinel', result: 'Catches 89% of 124 generated protocol bugs' },
  { href: '#meridian', name: 'Meridian', result: 'Zero false alarms across 30 runs' },
  { href: '#research', name: 'Research', result: 'Three peer-reviewed papers in applied ML' },
]

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
    status: 'In beta, 30 users',
    links: [{ label: 'Visit creuno.com', href: 'https://creuno.com' }],
    body: [
      'Creators plan and publish content, see what is working across their channels, and run brand deals from the first pitch to a paid invoice. Brands post campaigns, review applicants and follow results as they come in. I built it with one other engineer.',
      'Every table sits behind Postgres row-level security, so a creator can only read their own deals and a brand only its own campaigns. A deal moves through an explicit state machine, accepted to delivered to invoiced to paid, which keeps the money in step with the work.',
      'The Creator Coach answers from the creator’s own analytics, content and deal history through pgvector retrieval. Its output is schema-validated before it renders, and a promptfoo evaluation suite runs on every change in CI.',
    ],
    measures: [],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'pgvector', 'LangGraph', 'Playwright'],
    hero: creunoShot(
      'creuno-home',
      'Creuno home screen: a left sidebar with Home, Analytics, Discover People, Campaigns, Collabs, Workspace, Calendar, Creator Coach, Messages and Deals. The main area greets the creator and shows cards for $16,700 in motion across 15 active deals, 76 new opportunities, a calendar, 67.9K total audience across two connected channels, a Creator Coach chat panel and a creator score of 62 out of 100.',
      'Home: money in motion, what is due this week, and the coach one click away.',
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
        'The Creator Coach, answering from the creator’s own numbers.',
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
    summary: 'Ride-hailing on AWS serverless, with the machine learning kept off the trip path.',
    links: [{ label: 'Code on GitHub', href: 'https://github.com/patsypppe/serverless-rideshare-aws' }],
    body: [
      'Riders book a trip and follow it live; drivers go online and get matched. Behind the web client are six Node.js microservices on AWS Lambda and EventBridge, one per core workflow, so a slow payment never holds up a match.',
      'Finding nearby drivers is the hot path, so driver positions are bucketed by geohash in DynamoDB. Writing the benchmark for it exposed a unit error that had quietly cut search recall to 12%; that bug is fixed and pinned by a test.',
      'Demand forecasting and fraud scoring run on Amazon Bedrock and SageMaker as asynchronous, event-driven paths, so a slow model call never delays a live trip.',
    ],
    measures: [
      {
        title: 'Items read to find drivers within 5 km',
        scale: 100000,
        bars: [
          { label: 'Full table scan', value: 100000, shown: '100,000' },
          { label: 'Geohash buckets', value: 4940, shown: '4,940', result: true },
        ],
        note: 'Same 100,000 seeded drivers, same 1,459 matches: 100% recall at 20x less read work.',
      },
      {
        title: 'API Gateway list price per million requests',
        scale: 3.5,
        bars: [
          { label: 'REST API', value: 3.5, shown: '$3.50' },
          { label: 'HTTP API', value: 1, shown: '$1.00', result: true },
        ],
        note: 'AWS us-east-1 entry tier: 71% lower. Encoded as tested arithmetic in the repository.',
      },
    ],
    stack: ['Node.js', 'AWS Lambda', 'EventBridge', 'DynamoDB', 'Bedrock', 'SageMaker', 'Terraform', 'React'],
    hero: {
      file: 'aigo-trip',
      widths: [1280, 2560],
      width: 2560,
      height: 1542,
      alt: 'AIGO live trip screen: a street map with the car at the pickup point and a line to the drop-off pin, a LIVE WEBSOCKET badge, and a progress list where finding a driver, driver assigned and driver on the way are done and on the trip is current.',
      caption: 'A trip in progress. Driver position and status arrive over a WebSocket.',
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
    id: 'sentinel',
    name: 'Sentinel',
    repo: 'https://github.com/patsypppe/sentinel',
    summary: 'Checks whether a server that AI agents call for tools actually follows the protocol spec.',
    body: [
      'AI agents reach tools through MCP servers, and the July 2026 revision of the protocol made every older server non-conformant in ways nobody had listed. Sentinel scans any server from the outside and grades it rule by rule, with the spec clause attached to each finding, then fails the CI build on a violation.',
      'It ships with its own Go server built to the new revision. A retried tool call replays the recorded result instead of running the action twice, and every call lands in a tamper-evident audit log.',
    ],
    measures: [
      {
        title: 'Generated protocol bugs the checker catches',
        scale: 124,
        bars: [{ label: 'Caught', value: 110, shown: '110 of 124', result: true }],
        note: 'And zero false alarms against a correctly built server.',
      },
      {
        title: 'Tokens an agent spends reading a 100-row tool result',
        scale: 100,
        bars: [
          { label: 'Detailed format', value: 100, shown: '100%' },
          { label: 'Compact format', value: 50.7, shown: '50.7%', result: true },
        ],
        note: 'Measured by the same test that publishes the figure.',
      },
    ],
    stack: ['Go', 'Python', 'Envoy', 'PostgreSQL', 'Docker Compose'],
    diagram: 'sentinel',
  },
  {
    id: 'meridian',
    name: 'Meridian',
    repo: 'https://github.com/patsypppe/meridian',
    summary: 'A CI gate that tells a real AI-agent regression from random variation.',
    body: [
      'Agents are non-deterministic, so one failed run proves little. Meridian runs each task several times against LangGraph agents, scores pass^k and only blocks a merge when the drop clears both a tolerance and a significance test.',
      'Every model call goes through a recording proxy, so a rerun replays the saved responses exactly at zero API cost, and token and dollar budgets are enforced where the agent cannot raise them. Each trial runs in its own locked-down container with no network and no secrets.',
    ],
    measures: [
      {
        title: 'The gate, tested against itself',
        scale: 1,
        bars: [
          { label: 'False alarms on an unchanged agent', value: 0, shown: '0 of 30' },
          { label: 'Planted regressions caught', value: 0.8, shown: '4 of 5', result: true },
          { label: 'Archived runs replayed exactly', value: 1, shown: '5 of 5', result: true },
        ],
        note: 'Raw results are committed as benchmarks/self-eval.json, including the one miss and why.',
      },
    ],
    stack: ['Python', 'LangGraph', 'Docker', 'PostgreSQL', 'pytest'],
    diagram: 'meridian',
  },
]

export const publications: readonly Publication[] = [
  {
    title: 'Cricket shot classification from video',
    venue: 'Computing Conference, United Kingdom',
    finding: 'A 3D ResNet-18 trained with a physics-informed loss reached 96.97% validation accuracy, training 68% faster per epoch than the CNN-GRU baseline.',
    repo: 'https://github.com/patsypppe/cricket-shot-classification',
  },
  {
    title: 'Fine-tuning language models with metaheuristic algorithms',
    venue: '11th ICSCMI, Melbourne',
    finding: 'A genetic algorithm and whale optimization chose which RoBERTa layers to freeze, matching standard fine-tuning at 94.67% while freezing 30 to 70% of the network.',
    repo: 'https://github.com/patsypppe/metaheuristic-llm-finetuning',
  },
  {
    title: 'Exercise form detection from surface electromyography',
    venue: '6th IEEE ICAIET, Malaysia',
    finding: 'Windowed features from two surface EMG channels, classified with recurrent models.',
    repo: 'https://github.com/patsypppe/EMG-Dumbbell-press',
  },
]

export const roles: readonly Role[] = [
  {
    org: 'SparkFX',
    title: 'Software Development Engineer Intern',
    place: 'Charlotte, NC',
    period: 'Jun to Aug 2026',
  },
  {
    org: 'PROLIM Solutions',
    title: 'Software Developer Intern',
    period: 'Jan to Apr 2025',
  },
  {
    org: 'LiRC Tek Solutions',
    title: 'Software Developer Intern',
    place: 'Bengaluru, India',
    period: 'Jun to Aug 2024',
  },
]

export const schools: readonly School[] = [
  {
    name: 'Indiana University Bloomington',
    degree: 'M.S., Computer Science',
    period: '2025 to 2027',
    note: 'GPA 3.89. Assistant instructor for Introduction to Programming.',
  },
  {
    name: 'PES University',
    degree: 'B.Tech., Computer Science',
    period: '2021 to 2025',
  },
]
