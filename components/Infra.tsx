import { CLOUDS, FLIGHT_RULES } from "@/lib/data";

// Production topology drawn as an SVG "screen". Sub-labels are Terraform
// resource types (google_ prefix dropped). Packets are SMIL animateMotion on
// centre-to-centre paths drawn under the nodes, so they travel through them.

type N = { x: number; y: number; w: number; h: number; l: string; s?: string; cls?: string; lamp?: "on" | "blink" };

const NODES: N[] = [
  { x: 20, y: 150, w: 120, h: 60, l: "Clients", s: "web + mobile" },
  { x: 180, y: 150, w: 170, h: 60, l: "Load balancer", s: "HTTPS, managed TLS", cls: "entry", lamp: "on" },
  { x: 410, y: 72, w: 150, h: 48, l: "web-1", s: "instance_group.web", lamp: "on" },
  { x: 410, y: 156, w: 150, h: 48, l: "web-2", s: "instance_group.web", lamp: "blink" },
  { x: 410, y: 240, w: 150, h: 48, l: "web-3", s: "instance_group.web", lamp: "on" },
  { x: 620, y: 72, w: 160, h: 48, l: "Redis", s: "redis_instance.queue", lamp: "on" },
  { x: 830, y: 72, w: 145, h: 48, l: "Workers", s: "BullMQ x2", lamp: "on" },
  { x: 620, y: 186, w: 160, h: 60, l: "Postgres primary", s: "sql_database_instance", lamp: "on" },
  { x: 830, y: 160, w: 145, h: 48, l: "Replica A", s: "read replica", lamp: "on" },
  { x: 830, y: 230, w: 145, h: 48, l: "Replica B", s: "read replica", lamp: "on" },
  { x: 620, y: 316, w: 160, h: 48, l: "GPU VM", s: "self-hosted LLM", lamp: "on" },
  { x: 830, y: 316, w: 145, h: 48, l: "Model weights", s: "storage_bucket" },
  { x: 20, y: 450, w: 120, h: 40, l: "git push", cls: "ci" },
  { x: 180, y: 450, w: 170, h: 40, l: "GitHub Actions", cls: "ci" },
  { x: 410, y: 450, w: 150, h: 40, l: "OIDC, no keys", cls: "ci" },
  { x: 620, y: 450, w: 160, h: 40, l: "Artifact Registry", cls: "ci" },
  { x: 830, y: 450, w: 145, h: 40, l: "Rolling deploy", cls: "ci" },
];

const WIRES = [
  "M140 180 H180",
  "M350 180 H380 V96 H410",
  "M350 180 H410",
  "M350 180 H380 V264 H410",
  "M560 96 H620",
  "M560 96 H590 V340 H620",
  "M560 180 H590",
  "M560 264 H590",
  "M590 216 H620",
  "M780 96 H830",
  "M780 216 H805 V184 H830",
  "M780 216 H805 V254 H830",
  "M830 340 H780",
];
const CI_WIRES = ["M140 470 H180", "M350 470 H410", "M560 470 H620", "M780 470 H830", "M902 450 V410 H485 V288"];

const PACKETS: { d: string; cls: string; dur: number; begin: number }[] = [
  { d: "M80 180 H380 V96 H485", cls: "pk-req", dur: 3, begin: 0 },
  { d: "M80 180 H485", cls: "pk-req", dur: 3, begin: 1 },
  { d: "M80 180 H380 V264 H485", cls: "pk-req", dur: 3, begin: 2 },
  { d: "M485 96 H700", cls: "pk-req", dur: 3, begin: 0.8 },
  { d: "M485 180 H590 V216 H700", cls: "pk-req", dur: 3, begin: 1.7 },
  { d: "M485 264 H590 V340 H700", cls: "pk-req", dur: 3, begin: 2.6 },
  { d: "M700 96 H902", cls: "pk-job", dur: 2.4, begin: 1.2 },
  { d: "M700 216 H805 V184 H902", cls: "pk-rep", dur: 3, begin: 0.4 },
  { d: "M700 216 H805 V254 H902", cls: "pk-rep", dur: 3, begin: 0.7 },
  { d: "M902 340 H700", cls: "pk-w", dur: 5, begin: 2 },
  { d: "M80 470 H902 V410 H485 V264", cls: "pk-dep", dur: 7, begin: 0.5 },
];

function Topology() {
  return (
    <svg viewBox="0 0 1000 510" role="img" aria-labelledby="topo-title topo-desc">
      <title id="topo-title">Production topology</title>
      <desc id="topo-desc">
        Clients reach an HTTPS load balancer that spreads requests over three web instances inside a private network.
        The instances enqueue jobs in Redis for workers, write to a Postgres primary replicated to two read replicas, and
        call a GPU VM that serves a self-hosted LLM from a storage bucket. Below, the delivery lane: git push, GitHub
        Actions authenticating with OIDC, Artifact Registry, then a rolling deploy to the web instances.
      </desc>

      <rect className="zone" x="385" y="34" width="605" height="352" rx="6" />
      <text className="zone-label" x="397" y="54">VPC: private IPs only, egress through Cloud NAT</text>
      <text className="zone-label" x="20" y="438">Delivery</text>

      {WIRES.map((d) => (
        <path key={d} className="wire" d={d} />
      ))}
      {CI_WIRES.map((d) => (
        <path key={d} className="wire ci" d={d} />
      ))}

      {PACKETS.map((p) => (
        <circle key={p.d + p.begin} className={`pk ${p.cls}`} r="3.5" opacity="0">
          <animateMotion path={p.d} dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.06;0.9;1"
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {NODES.map((n) => (
        <g key={n.l + n.x + n.y} className={`n ${n.cls ?? ""}`}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="3" />
          <text className="l" x={n.x + 12} y={n.s ? n.y + n.h / 2 - 3 : n.y + n.h / 2 + 5}>
            {n.l}
          </text>
          {n.s && (
            <text className="s" x={n.x + 12} y={n.y + n.h / 2 + 13}>
              {n.s}
            </text>
          )}
          {n.lamp && <circle className={`nlamp ${n.lamp === "blink" ? "blink" : ""}`} cx={n.x + n.w - 12} cy={n.y + 12} r="3" />}
        </g>
      ))}
    </svg>
  );
}

export default function Infra() {
  return (
    <div className="systems">
      <div className="systems-main">
        <p className="station-intro">
          How I put things into production, for clients and for my own products. Drawn the way I declare it in Terraform;
          the small labels are the resource types.
        </p>
        <figure className="screen holo-screen" style={{ margin: 0 }}>
          <div className="screen-bar">
            <span>HOLO 3</span>
            <span className="grow">PRODUCTION TOPOLOGY</span>
            <span className="lamp" aria-hidden="true" style={{ width: 6, height: 6 }} />
            <span>NOMINAL</span>
          </div>
          <div className="infra">
            <Topology />
          </div>
          <figcaption className="infra-legend">
            <span><i style={{ background: "var(--amber)" }} />Requests</span>
            <span><i style={{ background: "var(--cyan)" }} />Background jobs</span>
            <span><i style={{ background: "var(--green)" }} />Replication</span>
            <span><i style={{ background: "var(--dim)" }} />Model weights</span>
            <span><i style={{ background: "var(--ink)" }} />Deploys</span>
          </figcaption>
        </figure>
      </div>

      <div className="systems-side">
        <h3 className="side-title">Flight rules</h3>
        <ul className="rules">
          {FLIGHT_RULES.map((r) => (
            <li key={r.title}>
              <span className="check" aria-hidden="true" />
              <strong>{r.title}</strong>
              <p>{r.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="side-title">Clouds flown</h3>
        <dl className="clouds">
          {CLOUDS.map((c) => (
            <div key={c.name}>
              <dt>{c.name}</dt>
              <dd>{c.use}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
