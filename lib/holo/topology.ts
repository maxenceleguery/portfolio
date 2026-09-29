// Production topology as a three.js hologram: the same nodes, wires and packet
// flows as the 2D SVG in components/Infra.tsx, laid out in 3D on a projector
// base. Vanilla TS so the host component only mounts/unmounts it.
//
// Axes: x = request flow (left to right), y = up, z = depth (toward the viewer).
// The 2D diagram's rows become depth rows on the main deck; the delivery lane
// sits lower, on the projector floor in front.

import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  DynamicDrawUsage,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  type Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  RingGeometry,
  Scene,
  ShaderMaterial,
  Spherical,
  Vector3,
  type WebGLProgramParametersWithUniforms,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { autoYaw, damp, fade, flicker, lampOn, measure, sample, tripPhase, type Measured, type Out3, type Vec3 } from "./path";

export type TopologyHandle = {
  setRunning(on: boolean): void;
  dispose(): void;
};

// ---------------------------------------------------------------- palette ---

const CYAN = 0x5fd4e6;
const AMBER = 0xffb547;
const GREEN = 0x6be38a;
const DIM = 0x93a7bb;
const INK = 0xe4ecf3;

// ----------------------------------------------------------------- layout ---

const DECK = 1.7; // main level: everything behind and including the load balancer
const WY = DECK + 0.55; // wire / port height on the main level
const LANE_Y = 0.28; // delivery lane, on the projector floor
const LANE_Z = 5.05;
const RAIL_Y = 0.95; // deploy rail, under the deck

// columns
const XC = -7.3; // clients
const XL = -4.3; // load balancer
const XS = -2.8; // LB fan-out split
const XW = -1.0; // web tier
const XB = 0.9; // private backbone bus
const XD = 2.9; // redis / postgres / gpu
const XE = 4.75; // replication split
const XR = 6.6; // workers / replicas / bucket
// delivery lane stations
const LANE_X = [-5.2, -2.6, 0, 2.6, 5.2];
// rows
const ZB = -3.8;
const ZF = 3.8;
const ZRA = -1.15;
const ZRB = 1.15;

const VPC = { x0: XW - 1.25, x1: XR + 1.2, z0: -4.7, z1: 4.7, h: 2.0 };
// an oval holo table: wider than deep, like the model it carries
const DISK = { x: 0, z: 0, rx: 8.6, rz: 6.95 };

type Kind = "clients" | "lb" | "web" | "redis" | "workers" | "pg" | "replica" | "gpu" | "bucket" | "ci";
type NodeSpec = { name: string; sub?: string; kind: Kind; at: Vec3; lamp?: "on" | "blink" };

const NODES: NodeSpec[] = [
  { name: "Clients", sub: "web + mobile", kind: "clients", at: [XC, DECK, 0] },
  { name: "Load balancer", sub: "HTTPS, managed TLS", kind: "lb", at: [XL, DECK, 0], lamp: "on" },
  { name: "web-1", sub: "instance_group.web", kind: "web", at: [XW, DECK, ZB], lamp: "on" },
  { name: "web-2", sub: "instance_group.web", kind: "web", at: [XW, DECK, 0], lamp: "blink" },
  { name: "web-3", sub: "instance_group.web", kind: "web", at: [XW, DECK, ZF], lamp: "on" },
  { name: "Redis", sub: "redis_instance.queue", kind: "redis", at: [XD, DECK, ZB], lamp: "on" },
  { name: "Workers", sub: "BullMQ x2", kind: "workers", at: [XR, DECK, ZB], lamp: "on" },
  { name: "Postgres primary", sub: "sql_database_instance", kind: "pg", at: [XD, DECK, 0], lamp: "on" },
  { name: "Replica A", sub: "read replica", kind: "replica", at: [XR, DECK, ZRA], lamp: "on" },
  { name: "Replica B", sub: "read replica", kind: "replica", at: [XR, DECK, ZRB], lamp: "on" },
  { name: "GPU VM", sub: "self-hosted LLM", kind: "gpu", at: [XD, DECK, ZF], lamp: "on" },
  { name: "Model weights", sub: "storage_bucket", kind: "bucket", at: [XR, DECK, ZF] },
  { name: "git push", kind: "ci", at: [LANE_X[0], LANE_Y, LANE_Z] },
  { name: "GitHub Actions", kind: "ci", at: [LANE_X[1], LANE_Y, LANE_Z] },
  { name: "OIDC, no keys", kind: "ci", at: [LANE_X[2], LANE_Y, LANE_Z] },
  { name: "Artifact Registry", kind: "ci", at: [LANE_X[3], LANE_Y, LANE_Z] },
  { name: "Rolling deploy", kind: "ci", at: [LANE_X[4], LANE_Y, LANE_Z] },
];

const P = (x: number, z: number, y = WY): Vec3 => [x, y, z];
const L = (x: number): Vec3 => [x, LANE_Y + 0.04, LANE_Z];
const R = (x: number, z: number): Vec3 => [x, RAIL_Y, z];
const WEB_BOTTOM = WY - 0.23;

const WIRES: Vec3[][] = [
  [P(XC, 0), P(XS, 0)],
  [P(XS, ZB), P(XS, ZF)],
  [P(XS, ZB), P(XW, ZB)],
  [P(XS, 0), P(XW, 0)],
  [P(XS, ZF), P(XW, ZF)],
  [P(XW, ZB), P(XR, ZB)],
  [P(XW, 0), P(XE, 0)],
  [P(XW, ZF), P(XR, ZF)],
  [P(XB, ZB), P(XB, ZF)],
  [P(XE, ZRA), P(XE, ZRB)],
  [P(XE, ZRA), P(XR, ZRA)],
  [P(XE, ZRB), P(XR, ZRB)],
];

const LX0 = LANE_X[0];
const LX1 = LANE_X[LANE_X.length - 1];
const RAIL: Vec3[][] = [
  [L(LX1), R(LX1, LANE_Z), R(XW, LANE_Z), R(XW, ZB)],
  [R(XW, ZB), [XW, WEB_BOTTOM, ZB]],
  [R(XW, 0), [XW, WEB_BOTTOM, 0]],
  [R(XW, ZF), [XW, WEB_BOTTOM, ZF]],
];

type PacketSpec = { path: Vec3[]; color: number; dur: number; begin: number; period?: number };

const reqTo = (z: number): Vec3[] => [P(XC, 0), P(XL, 0), P(XS, 0), P(XS, z), P(XW, z)];
const rollout = (z: number): Vec3[] => [L(LX1), R(LX1, LANE_Z), R(XW, LANE_Z), R(XW, z), P(XW, z)];

// Same cadence as the SVG (one request per web instance every 3 s), made causal:
// each hop starts when the previous one lands.
const PACKETS: PacketSpec[] = [
  { path: reqTo(ZB), color: AMBER, dur: 3, begin: 0 },
  { path: reqTo(0), color: AMBER, dur: 3, begin: 1 },
  { path: reqTo(ZF), color: AMBER, dur: 3, begin: 2 },
  { path: [P(XW, ZB), P(XD, ZB)], color: AMBER, dur: 1.4, begin: 0.1, period: 3 },
  { path: [P(XW, 0), P(XD, 0)], color: AMBER, dur: 1.4, begin: 1.1, period: 3 },
  { path: [P(XW, ZF), P(XD, ZF)], color: AMBER, dur: 1.4, begin: 2.1, period: 3 },
  { path: [P(XD, ZB), P(XR, ZB)], color: CYAN, dur: 1.3, begin: 1.7, period: 3 },
  { path: [P(XD, 0), P(XE, 0), P(XE, ZRA), P(XR, ZRA)], color: GREEN, dur: 1.9, begin: 2.7, period: 3 },
  { path: [P(XD, 0), P(XE, 0), P(XE, ZRB), P(XR, ZRB)], color: GREEN, dur: 1.9, begin: 2.9, period: 3 },
  { path: [P(XR, ZF), P(XD, ZF)], color: DIM, dur: 2.6, begin: 0.5, period: 6 },
  { path: [L(LX0), L(LX1)], color: INK, dur: 4.2, begin: 0.4, period: 9 },
  // rolling deploy: one instance after the other
  { path: rollout(ZF), color: INK, dur: 2.4, begin: 4.7, period: 9 },
  { path: rollout(0), color: INK, dur: 2.9, begin: 5.5, period: 9 },
  { path: rollout(ZB), color: INK, dur: 3.4, begin: 6.3, period: 9 },
];

// ----------------------------------------------------------------- camera ---

const FOV = 30;
const BASE_POLAR = (48 * Math.PI) / 180; // from vertical: 42 degrees above the deck
// A 3/4 view biased slightly to the right: swinging right spreads the busy
// right-hand column (workers, replicas, bucket), swinging left stacks it.
const BASE_AZ = (6 * Math.PI) / 180;
const YAW_AMP = (24 * Math.PI) / 180;
const YAW_PERIOD = 20;
const RESUME_MS = 4000;
const STATIC_T = 2.35; // reduced motion: freeze the packets at this instant

// --------------------------------------------------------- hologram shader ---
// Shared by every line/fill material: a global flicker on alpha and a slow
// horizontal scan band that brightens whatever it passes through.

type HoloUniforms = { uFlicker: { value: number }; uScanY: { value: number }; uScanGain: { value: number } };

// One hook per mount so instances never share state; the source text is the same
// for every closure, so three still compiles each program only once.
const holoHook = (u: HoloUniforms) => (shader: WebGLProgramParametersWithUniforms) => {
  shader.uniforms.uFlicker = u.uFlicker;
  shader.uniforms.uScanY = u.uScanY;
  shader.uniforms.uScanGain = u.uScanGain;
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", "#include <common>\nvarying float vHoloY;")
    .replace("#include <project_vertex>", "#include <project_vertex>\nvHoloY = (modelMatrix * vec4(transformed, 1.0)).y;");
  shader.fragmentShader = shader.fragmentShader
    .replace("#include <common>", "#include <common>\nvarying float vHoloY;\nuniform float uFlicker;\nuniform float uScanY;\nuniform float uScanGain;")
    .replace(
      "#include <opaque_fragment>",
      "#include <opaque_fragment>\ngl_FragColor.rgb *= 1.0 + uScanGain * (1.0 - smoothstep(0.0, 0.4, abs(vHoloY - uScanY)));\ngl_FragColor.a *= uFlicker;",
    );
};

const POINT_VS = /* glsl */ `
uniform float uScale;
attribute vec4 aColor;
attribute float aSize;
varying vec4 vColor;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const POINT_FS = /* glsl */ `
uniform float uFlicker;
varying vec4 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float glow = pow(1.0 - d, 2.4);
  float core = smoothstep(0.36, 0.12, d);
  gl_FragColor = vec4(vColor.rgb + core * 0.35, clamp(glow * 0.85 + core, 0.0, 1.0) * vColor.a * uFlicker);
}`;

// ------------------------------------------------------------------ mount ---

export function mountTopology(container: HTMLElement, opts: { reducedMotion?: boolean } = {}): TopologyHandle {
  const rm = !!opts.reducedMotion;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true });
  } catch (e) {
    throw new Error(`WebGL unavailable: ${e instanceof Error ? e.message : String(e)}`);
  }
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    display: "block",
    cursor: "grab",
  });

  const labels = new CSS2DRenderer();
  const layer = labels.domElement;
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, { position: "absolute", top: "0", left: "0", pointerEvents: "none" });

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.5, 200);

  // ------------------------------------------------------------ materials ---
  const HOLO: HoloUniforms = { uFlicker: { value: 1 }, uScanY: { value: -99 }, uScanGain: { value: 0 } };
  const hook = holoHook(HOLO);
  const mats = new Map<string, Material>();
  const hologram = <M extends Material>(key: string, make: () => M): M => {
    let m = mats.get(key) as M | undefined;
    if (!m) {
      m = make();
      m.onBeforeCompile = hook;
      mats.set(key, m);
    }
    return m;
  };
  const line = (color: number, opacity: number) =>
    hologram(`l${color}:${opacity}`, () => new LineBasicMaterial({ color, opacity, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  const dashed = (color: number, opacity: number, dashSize = 0.22, gapSize = 0.16) =>
    hologram(
      `d${color}:${opacity}:${dashSize}:${gapSize}`,
      () => new LineDashedMaterial({ color, opacity, dashSize, gapSize, transparent: true, blending: AdditiveBlending, depthWrite: false }),
    );
  const fill = (color: number, opacity: number, vertexColors = false) =>
    hologram(
      `f${color}:${opacity}:${vertexColors}`,
      () =>
        new MeshBasicMaterial({
          color,
          opacity,
          vertexColors,
          transparent: true,
          blending: AdditiveBlending,
          depthWrite: false,
          side: DoubleSide,
        }),
    );

  // ------------------------------------------------------------- builders ---
  const segs = (arr: number[], mat: Material, dash = false) => {
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(arr, 3));
    const s = new LineSegments(g, mat);
    if (dash) s.computeLineDistances();
    return s;
  };
  const polySegs = (paths: Vec3[][]) => {
    const out: number[] = [];
    for (const p of paths) for (let i = 1; i < p.length; i++) out.push(...p[i - 1], ...p[i]);
    return out;
  };
  const circle = (r: number, y: number, n = 48, cx = 0, cz = 0, a0 = 0, a1 = Math.PI * 2) => {
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      const u = a0 + ((a1 - a0) * i) / n;
      const v = a0 + ((a1 - a0) * (i + 1)) / n;
      out.push(cx + r * Math.sin(u), y, cz + r * Math.cos(u), cx + r * Math.sin(v), y, cz + r * Math.cos(v));
    }
    return out;
  };
  const edges = (geo: BufferGeometry, mat: Material, threshold = 1) => {
    const e = new LineSegments(new EdgesGeometry(geo, threshold), mat);
    geo.dispose();
    return e;
  };
  const boxAt = (w: number, h: number, d: number, x: number, y: number, z: number, lineMat: Material, fillOpacity = 0.045, color = CYAN) => {
    const g = new Group();
    const geo = new BoxGeometry(w, h, d);
    g.add(new Mesh(geo, fill(color, fillOpacity)));
    g.add(new LineSegments(new EdgesGeometry(geo), lineMat));
    g.position.set(x, y, z);
    return g;
  };
  const drum = (r: number, h: number, bands: number, lineMat: Material, faint: Material) => {
    const g = new Group();
    const rings: number[] = [];
    for (let i = 0; i <= bands; i++) rings.push(...circle(r, (h * i) / bands, 40));
    g.add(segs(rings, lineMat));
    const vert: number[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      vert.push(r * Math.sin(a), 0, r * Math.cos(a), r * Math.sin(a), h, r * Math.cos(a));
    }
    g.add(segs(vert, faint));
    const body = new CylinderGeometry(r, r, h, 32, 1);
    body.translate(0, h / 2, 0);
    g.add(new Mesh(body, fill(CYAN, 0.04)));
    return g;
  };

  const edge = line(CYAN, 0.85);
  const edgeFaint = line(CYAN, 0.35);
  const spinners: { obj: Object3D; axis: "x" | "y" | "z"; speed: number }[] = [];
  const lampPts: { p: Vector3; blink: boolean }[] = [];
  const fitPoints: Vector3[] = [];
  const labelObjs: CSS2DObject[] = [];

  // Each builder returns the glyph (base at local y = 0), its height, and the lamp spot.
  // lz nudges the label back over deep glyphs so it clears their far top edge.
  const build = (n: NodeSpec): { g: Group; top: number; lamp?: Vec3; lz?: number } => {
    const g = new Group();
    switch (n.kind) {
      case "clients": {
        // monitor + phone
        g.add(boxAt(1.05, 0.66, 0.05, -0.28, 0.63, 0, edge));
        g.add(segs([-0.28, 0.3, 0, -0.28, 0.06, 0, -0.5, 0.03, -0.1, -0.06, 0.03, -0.1, -0.5, 0.03, 0.1, -0.06, 0.03, 0.1, -0.5, 0.03, -0.1, -0.5, 0.03, 0.1, -0.06, 0.03, -0.1, -0.06, 0.03, 0.1], edge));
        g.add(segs(rect(0.9, 0.5, -0.28, 0.63, 0.03), edgeFaint));
        g.add(boxAt(0.3, 0.56, 0.05, 0.52, 0.3, 0.15, edge));
        g.add(segs([...rect(0.24, 0.44, 0.52, 0.31, 0.18), 0.47, 0.55, 0.18, 0.57, 0.55, 0.18], edgeFaint));
        return { g, top: 0.96 };
      }
      case "lb": {
        // a gate ring standing across the flow: requests pass through it
        const amber = line(AMBER, 0.9);
        const ringPts: number[] = [...circle(0.5, 0, 48), ...circle(0.4, 0, 48)];
        for (let i = 0; i < 16; i++) {
          const a = (i / 16) * Math.PI * 2;
          ringPts.push(0.4 * Math.sin(a), 0, 0.4 * Math.cos(a), 0.5 * Math.sin(a), 0, 0.5 * Math.cos(a));
        }
        const ring = segs(ringPts, amber);
        const inner = segs(circle(0.3, 0, 36), line(AMBER, 0.4));
        const portal = new Mesh(new CircleGeometry(0.4, 40).rotateX(-Math.PI / 2), fill(AMBER, 0.07));
        const spin = new Group();
        spin.add(ring, inner, portal);
        const rig = new Group();
        rig.add(spin);
        // circle() draws flat; stand it up across the flow, turned mostly toward the
        // viewer so it never goes edge-on during the yaw sweep
        rig.rotation.set(0, (70 * Math.PI) / 180, Math.PI / 2);
        rig.position.y = 0.55;
        g.add(rig);
        spinners.push({ obj: spin, axis: "y", speed: 0.4 });
        return { g, top: 1.2, lamp: [0, 1.1, 0] };
      }
      case "web": {
        g.add(boxAt(1.2, 0.46, 0.95, 0, 0.55, 0, edge));
        const zf = 0.476;
        const slits: number[] = [];
        for (const y of [0.45, 0.53, 0.61]) slits.push(-0.5, y, zf, 0.05, y, zf);
        slits.push(0.2, 0.36, zf, 0.2, 0.74, zf);
        g.add(segs(slits, edgeFaint));
        return { g, top: 0.78, lamp: [0.45, 0.66, zf + 0.02], lz: -0.3 };
      }
      case "redis": {
        for (const y of [0.32, 0.53, 0.74]) {
          const slab = boxAt(0.86, 0.14, 0.86, 0, y, 0, edge);
          slab.rotation.y = Math.PI / 4;
          g.add(slab);
        }
        return { g, top: 0.81, lamp: [0, 0.74, 0.64], lz: -0.3 };
      }
      case "workers": {
        for (const [x, s] of [
          [-0.4, 0.6],
          [0.4, -0.45],
        ]) {
          const o = new Group();
          const geo = new OctahedronGeometry(0.3);
          o.add(new Mesh(geo, fill(CYAN, 0.05)));
          o.add(new LineSegments(new EdgesGeometry(geo), edge));
          o.position.set(x, 0.55, 0);
          g.add(o);
          spinners.push({ obj: o, axis: "y", speed: s });
        }
        return { g, top: 0.87, lamp: [0, 0.97, 0] };
      }
      case "pg": {
        g.add(drum(0.55, 1.15, 3, edge, edgeFaint));
        return { g, top: 1.15, lamp: [0.3, 1.0, 0.47], lz: -0.25 };
      }
      case "replica": {
        g.add(drum(0.38, 0.62, 2, edge, edgeFaint));
        return { g, top: 0.62, lamp: [0.2, 0.52, 0.33], lz: -0.15 };
      }
      case "gpu": {
        g.add(boxAt(1.45, 0.78, 0.22, 0, 0.56, 0, edge));
        const zf = 0.115;
        // PCIe fingers along the bottom edge
        const fingers: number[] = [];
        for (let x = -0.55; x <= 0.2; x += 0.075) fingers.push(x, 0.17, zf, x, 0.1, zf);
        fingers.push(-0.58, 0.1, zf, 0.23, 0.1, zf);
        g.add(segs(fingers, line(CYAN, 0.45)));
        for (const x of [-0.34, 0.34]) {
          const fan = new Group();
          const blades: number[] = [...circle(0.25, 0, 36)];
          blades.push(...circle(0.06, 0, 12));
          for (let i = 0; i < 5; i++) {
            const a = (i / 5) * Math.PI * 2;
            blades.push(0.06 * Math.sin(a), 0, 0.06 * Math.cos(a), 0.22 * Math.sin(a + 0.5), 0, 0.22 * Math.cos(a + 0.5));
          }
          const f = segs(blades, edge);
          f.rotation.x = Math.PI / 2; // circle() draws in XZ, stand it up on the card face
          fan.add(f);
          fan.position.set(x, 0.56, zf + 0.005);
          g.add(fan);
          spinners.push({ obj: fan, axis: "z", speed: -2.2 });
        }
        return { g, top: 0.95, lamp: [0.62, 0.86, zf + 0.01] };
      }
      case "bucket": {
        g.add(boxAt(1.3, 0.6, 1.0, 0, 0.3, 0, edge));
        const zf = 0.502;
        const brace: number[] = [-0.65, 0, zf, 0.65, 0.6, zf, -0.65, 0.6, zf, 0.65, 0, zf];
        for (const x of [-0.325, 0, 0.325]) brace.push(x, 0.602, -0.5, x, 0.602, 0.5);
        g.add(segs(brace, edgeFaint));
        return { g, top: 0.62, lz: -0.4 };
      }
      case "ci": {
        g.add(edges(new CylinderGeometry(0.42, 0.42, 0.08, 6).translate(0, 0.04, 0), line(DIM, 0.75), 20));
        g.add(new Mesh(new CylinderGeometry(0.42, 0.42, 0.08, 6).translate(0, 0.04, 0), fill(DIM, 0.05)));
        g.add(segs(circle(0.2, 0.082, 6, 0, 0, Math.PI / 6, Math.PI * 2 + Math.PI / 6), line(DIM, 0.45)));
        return { g, top: 0.08 };
      }
    }
  };

  function rect(w: number, h: number, x: number, y: number, z: number): number[] {
    const a = x - w / 2;
    const b = x + w / 2;
    const c = y - h / 2;
    const d = y + h / 2;
    return [a, c, z, b, c, z, b, c, z, b, d, z, b, d, z, a, d, z, a, d, z, a, c, z];
  }

  const makeLabel = (name: string, sub: string | undefined, variant: "node" | "entry" | "ci" | "zone") => {
    const el = document.createElement("div");
    el.className = variant === "node" ? "holo-label" : `holo-label holo-${variant}`;
    const color = variant === "entry" ? "#ffb547" : variant === "ci" || variant === "zone" ? "#93a7bb" : "#e4ecf3";
    const zone = variant === "zone";
    el.style.cssText = [
      "pointer-events:none",
      "user-select:none",
      "white-space:nowrap",
      `text-align:${zone ? "right" : "center"}`,
      zone
        ? "font:500 0.8em/1.2 var(--f-mono, ui-monospace, SFMono-Regular, Menlo, monospace)"
        : `font:${variant === "ci" ? "500 0.92em" : "600 1em"}/1.15 var(--f-text, Archivo, system-ui, sans-serif)`,
      `letter-spacing:${zone ? "0.06em" : "0.01em"}`,
      `color:${color}`,
      "text-shadow:0 0 6px rgba(95,212,230,0.35), 0 0 1px rgba(13,27,42,0.9)",
    ].join(";");
    el.append(zone ? name.toUpperCase() : name);
    if (sub) {
      const s = document.createElement("small");
      s.className = "holo-sub";
      s.textContent = sub;
      s.style.cssText =
        "display:block;margin-top:2px;font:400 0.75em/1.2 var(--f-mono, ui-monospace, SFMono-Regular, Menlo, monospace);letter-spacing:0;text-transform:none;color:rgba(125,205,222,0.78)";
      el.append(s);
    }
    layer.append(el); // pre-attach so sizes can be measured before the first render
    return el;
  };

  const addLabel = (parent: Object3D, el: HTMLElement, at: Vec3, cx: number, cy: number) => {
    const o = new CSS2DObject(el);
    o.position.set(at[0], at[1], at[2]);
    o.center.set(cx, cy);
    parent.add(o);
    labelObjs.push(o);
  };

  // ------------------------------------------------------------- the model ---
  const model = new Group();
  scene.add(model);

  for (const n of NODES) {
    const { g, top, lamp, lz = 0 } = build(n);
    g.position.set(n.at[0], n.at[1], n.at[2]);
    model.add(g);
    const ci = n.kind === "ci";
    const el = makeLabel(n.name, n.sub, n.kind === "lb" ? "entry" : ci ? "ci" : "node");
    if (ci) addLabel(g, el, [0, 0, 0.62], 0.5, 0);
    else addLabel(g, el, [0, top + 0.14, lz], 0.5, 1);
    if (!ci) g.add(segs(circle(0.68, 0.004, 40), line(CYAN, 0.13))); // footprint on the deck
    if (lamp && n.lamp) lampPts.push({ p: new Vector3(n.at[0] + lamp[0], n.at[1] + lamp[1], n.at[2] + lamp[2]), blink: n.lamp === "blink" });
    fitPoints.push(new Vector3(n.at[0], n.at[1], n.at[2]));
  }

  // wires
  model.add(segs(polySegs(WIRES), line(CYAN, 0.3)));
  model.add(segs(polySegs([[L(LX0), L(LX1)]]), dashed(DIM, 0.6), true));
  model.add(segs(polySegs(RAIL), dashed(INK, 0.32), true));

  // VPC: dashed wireframe box with bright corner brackets and a faint floor grid
  {
    const { x0, x1, z0, z1, h } = VPC;
    const y0 = DECK;
    const y1 = DECK + h;
    const box = new BoxGeometry(x1 - x0, h, z1 - z0);
    box.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const e = new LineSegments(new EdgesGeometry(box), dashed(CYAN, 0.4, 0.3, 0.2));
    e.computeLineDistances();
    model.add(e);
    model.add(new Mesh(box, fill(CYAN, 0.012)));
    const k = 0.5;
    const br: number[] = [];
    for (const x of [x0, x1])
      for (const y of [y0, y1])
        for (const z of [z0, z1]) {
          const sx = x === x0 ? 1 : -1;
          const sy = y === y0 ? 1 : -1;
          const sz = z === z0 ? 1 : -1;
          br.push(x, y, z, x + sx * k, y, z, x, y, z, x, y + sy * k * 0.6, z, x, y, z, x, y, z + sz * k);
        }
    model.add(segs(br, line(CYAN, 0.8)));
    const grid: number[] = [];
    for (let x = Math.ceil(x0); x <= x1; x += 1) grid.push(x, y0, z0, x, y0, z1);
    for (let z = Math.ceil(z0); z <= z1; z += 1) grid.push(x0, y0, z, x1, y0, z);
    model.add(segs(grid, line(CYAN, 0.07)));
    for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) fitPoints.push(new Vector3(x, y, z));
    // hangs off the top-back-left corner, extending left over the public side where there is room
    addLabel(model, makeLabel("VPC", "private IPs only, egress through Cloud NAT", "zone"), [x0 - 0.1, y1, z0], 1, 1);
  }

  addLabel(model, makeLabel("Delivery", undefined, "zone"), [LX0 - 0.55, LANE_Y, LANE_Z - 0.75], 0, 1);

  // projector base: polar grid table with a glowing rim. Built as a circle of
  // radius rz and stretched along x into an oval.
  {
    const { x, z, rx, rz: r } = DISK;
    const base = new Group();
    base.position.set(x, 0, z);
    base.scale.set(rx / r, 1, 1);
    const grid: number[] = [];
    for (let i = 1; i <= 5; i++) grid.push(...circle((r * i) / 6, 0, 96));
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      grid.push(0.7 * Math.sin(a), 0, 0.7 * Math.cos(a), r * Math.sin(a), 0, r * Math.cos(a));
    }
    base.add(segs(grid, line(CYAN, 0.09)));
    base.add(segs(circle(r, 0, 160), line(CYAN, 0.95)));
    base.add(segs([...circle(r - 0.07, 0, 160), ...circle(r + 0.13, 0, 160)], line(CYAN, 0.3)));
    const ticks: number[] = [];
    for (let i = 0; i < 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      const len = i % 15 === 0 ? 0.34 : 0.13;
      ticks.push((r + 0.19) * Math.sin(a), 0, (r + 0.19) * Math.cos(a), (r + 0.19 + len) * Math.sin(a), 0, (r + 0.19 + len) * Math.cos(a));
    }
    base.add(segs(ticks, line(CYAN, 0.28)));

    // soft glow band just inside the rim (vertex alpha ramps up toward the edge)
    const band = new RingGeometry(r - 1.1, r, 128, 1);
    band.rotateX(-Math.PI / 2);
    const pos = band.getAttribute("position");
    const col = new Float32Array(pos.count * 4);
    for (let i = 0; i < pos.count; i++) {
      const rr = Math.hypot(pos.getX(i), pos.getZ(i));
      col.set([1, 1, 1, ((rr - (r - 1.1)) / 1.1) ** 2 * 0.22], i * 4);
    }
    band.setAttribute("color", new BufferAttribute(col, 4));
    base.add(new Mesh(band, fill(CYAN, 1, true)));

    // faint light curtain rising from the rim, fading out upward
    const curtainH = DECK + 0.4;
    const curtain = new CylinderGeometry(r, r, curtainH, 128, 1, true);
    curtain.translate(0, curtainH / 2, 0);
    const cp = curtain.getAttribute("position");
    const cc = new Float32Array(cp.count * 4);
    for (let i = 0; i < cp.count; i++) cc.set([1, 1, 1, (1 - cp.getY(i) / curtainH) ** 2 * 0.07], i * 4);
    curtain.setAttribute("color", new BufferAttribute(cc, 4));
    base.add(new Mesh(curtain, fill(CYAN, 1, true)));

    model.add(base);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      fitPoints.push(new Vector3(x + (rx + 0.4) * Math.sin(a), 0, z + (r + 0.4) * Math.cos(a)));
    }
  }

  // ------------------------------------------------ packets + status lamps ---
  const TRAIL = 5;
  const TRAIL_GAP = 0.13;
  const TRAIL_A = [1, 0.5, 0.28, 0.15, 0.07];
  const TRAIL_S = [1, 0.8, 0.66, 0.54, 0.44];
  const PACKET_SIZE = 0.7;
  const LAMP_SIZE = 0.3;

  const pointMat = new ShaderMaterial({
    uniforms: { uScale: { value: 1 }, uFlicker: HOLO.uFlicker },
    vertexShader: POINT_VS,
    fragmentShader: POINT_FS,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  });

  const rgb = (hex: number): Vec3 => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
  const packets = PACKETS.map((p) => ({ ...p, m: measure(p.path) as Measured, c: rgb(p.color) }));
  const nPk = packets.length * TRAIL;
  const pkGeo = new BufferGeometry();
  const pkPos = new BufferAttribute(new Float32Array(nPk * 3), 3).setUsage(DynamicDrawUsage);
  const pkCol = new BufferAttribute(new Float32Array(nPk * 4), 4).setUsage(DynamicDrawUsage);
  const pkSize = new BufferAttribute(new Float32Array(nPk), 1);
  pkGeo.setAttribute("position", pkPos);
  pkGeo.setAttribute("aColor", pkCol);
  pkGeo.setAttribute("aSize", pkSize);
  for (let i = 0; i < nPk; i++) pkSize.array[i] = PACKET_SIZE * TRAIL_S[i % TRAIL];
  const pkPoints = new Points(pkGeo, pointMat);
  pkPoints.frustumCulled = false;
  scene.add(pkPoints);

  const lampGeo = new BufferGeometry();
  const lampPos = new Float32Array(lampPts.length * 3);
  const lampCol = new BufferAttribute(new Float32Array(lampPts.length * 4), 4).setUsage(DynamicDrawUsage);
  const green = rgb(GREEN);
  lampPts.forEach((l, i) => {
    lampPos.set([l.p.x, l.p.y, l.p.z], i * 3);
    lampCol.array.set([...green, 1], i * 4);
  });
  lampGeo.setAttribute("position", new BufferAttribute(lampPos, 3));
  lampGeo.setAttribute("aColor", lampCol);
  lampGeo.setAttribute("aSize", new BufferAttribute(new Float32Array(lampPts.length).fill(LAMP_SIZE), 1));
  const lamps = new Points(lampGeo, pointMat);
  lamps.frustumCulled = false;
  scene.add(lamps);
  const blinkIdx = lampPts.findIndex((l) => l.blink);

  const at: Out3 = [0, 0, 0];
  function updatePackets(t: number) {
    const pos = pkPos.array as Float32Array;
    const col = pkCol.array as Float32Array;
    for (let i = 0; i < packets.length; i++) {
      const pk = packets[i];
      const head = tripPhase(t, pk.dur, pk.begin, pk.period);
      for (let k = 0; k < TRAIL; k++) {
        const ph = head - (k * TRAIL_GAP) / pk.m.total;
        const j = i * TRAIL + k;
        sample(pk.m, ph, at);
        pos[j * 3] = at[0];
        pos[j * 3 + 1] = at[1];
        pos[j * 3 + 2] = at[2];
        col[j * 4] = pk.c[0];
        col[j * 4 + 1] = pk.c[1];
        col[j * 4 + 2] = pk.c[2];
        col[j * 4 + 3] = fade(ph) * TRAIL_A[k];
      }
    }
    pkPos.needsUpdate = true;
    pkCol.needsUpdate = true;
  }

  function updateLamps(t: number) {
    if (blinkIdx < 0) return;
    lampCol.array[blinkIdx * 4 + 3] = lampOn(t, 4.2) ? 1 : 0.12;
    lampCol.needsUpdate = true;
  }

  // --------------------------------------------------------------- camera ---
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = !rm;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.45;
  // clamped so the view never goes edge-on, below the deck, or far enough round
  // that the depth rows (and their labels) collapse onto each other
  controls.minPolarAngle = BASE_POLAR - (14 * Math.PI) / 180;
  controls.maxPolarAngle = BASE_POLAR + (6 * Math.PI) / 180;
  controls.minAzimuthAngle = BASE_AZ - (32 * Math.PI) / 180;
  controls.maxAzimuthAngle = BASE_AZ + (32 * Math.PI) / 180;
  canvas.style.touchAction = "pan-y"; // horizontal drags orbit, vertical swipes still scroll the page

  const target = controls.target;
  let radius = 30;
  const sph = new Spherical();
  const place = (polar: number, az: number, r = radius) => {
    sph.set(r, polar, az);
    camera.position.setFromSpherical(sph).add(target);
    camera.lookAt(target);
    camera.updateMatrixWorld();
  };

  // Fit: the largest view where every node, label, the VPC and the projector
  // rim stay inside the container at both ends of the auto yaw sweep.
  const v = new Vector3();
  const labelSize = new Map<CSS2DObject, [number, number]>();
  function bounds(polar: number, az: number, r: number, W: number, H: number) {
    place(polar, az, r);
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (const p of fitPoints) {
      v.copy(p).project(camera);
      const px = (v.x + 1) * 0.5 * W;
      const py = (1 - v.y) * 0.5 * H;
      x0 = Math.min(x0, px);
      x1 = Math.max(x1, px);
      y0 = Math.min(y0, py);
      y1 = Math.max(y1, py);
    }
    for (const o of labelObjs) {
      if (!o.visible) continue;
      const [w, h] = labelSize.get(o) ?? [110, 28];
      v.setFromMatrixPosition(o.matrixWorld).project(camera);
      const l = (v.x + 1) * 0.5 * W - o.center.x * w;
      const t = (1 - v.y) * 0.5 * H - o.center.y * h;
      x0 = Math.min(x0, l);
      x1 = Math.max(x1, l + w);
      y0 = Math.min(y0, t);
      y1 = Math.max(y1, t + h);
    }
    return { x0, x1, y0, y1 };
  }

  function fit(W: number, H: number) {
    scene.updateMatrixWorld(true);
    for (const o of labelObjs) labelSize.set(o, [o.element.offsetWidth || 110, o.element.offsetHeight || 28]);
    const m = Math.max(8, Math.min(W, H) * 0.025);
    target.set(0.2, 1.9, 1.1);
    for (let iter = 0; iter < 3; iter++) {
      let lo = 8;
      let hi = 160;
      for (let i = 0; i < 26; i++) {
        const r = (lo + hi) / 2;
        let ok = true;
        for (const az of [BASE_AZ - YAW_AMP, BASE_AZ, BASE_AZ + YAW_AMP]) {
          const b = bounds(BASE_POLAR, az, r, W, H);
          if (b.x0 < m || b.y0 < m || b.x1 > W - m || b.y1 > H - m) {
            ok = false;
            break;
          }
        }
        if (ok) hi = r;
        else lo = r;
      }
      radius = hi;
      // re-centre the orbit on what is actually on screen at the front view
      const b = bounds(BASE_POLAR, BASE_AZ, radius, W, H);
      const cx = ((b.x0 + b.x1) / 2 / W) * 2 - 1;
      const cy = 1 - ((b.y0 + b.y1) / 2 / H) * 2;
      const hh = radius * Math.tan(((FOV / 2) * Math.PI) / 180);
      const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
      const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
      target.addScaledVector(right, cx * hh * (W / H)).addScaledVector(up, cy * hh);
    }
  }

  // ------------------------------------------------------------ render loop ---
  let running = false;
  let disposed = false;
  let raf = 0;
  let last = 0;
  let t = rm ? STATIC_T : 1.2; // start with packets already in flight
  let autoT = 0;
  let interacting = false;
  let lastInteraction = -Infinity;

  controls.addEventListener("start", () => {
    interacting = true;
    canvas.style.cursor = "grabbing";
  });
  controls.addEventListener("end", () => {
    interacting = false;
    lastInteraction = performance.now();
    canvas.style.cursor = "grab";
  });

  // Shaders compile in the background (KHR_parallel_shader_compile when available);
  // nothing draws until they're ready, so mounting never stalls the main thread.
  let compiled = false;
  const draw = () => {
    if (!compiled) return;
    renderer.render(scene, camera);
    labels.render(scene, camera);
  };

  // reduced motion: the view only changes when the visitor drags it
  if (rm) controls.addEventListener("change", () => !disposed && draw());

  function frame(now: number) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    // the model drifts slowly: 30 fps is plenty and halves the GPU + label-layout
    // cost; full rate only while the visitor drags it
    if (!interacting && now - last < 1000 / 30 - 2) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    t += dt;

    if (!interacting && now - lastInteraction > RESUME_MS) {
      autoT += dt;
      // ease back onto the sweep from wherever the visitor left the camera
      place(
        damp(controls.getPolarAngle(), BASE_POLAR, 1.2, dt),
        damp(controls.getAzimuthalAngle(), BASE_AZ + autoYaw(autoT, YAW_AMP, YAW_PERIOD), 1.2, dt),
      );
    }
    controls.update();

    for (const s of spinners) s.obj.rotation[s.axis] += s.speed * dt;
    updatePackets(t);
    updateLamps(t);
    HOLO.uFlicker.value = flicker(t);
    layer.style.opacity = String(0.94 + 0.06 * (HOLO.uFlicker.value - 0.865) / 0.135);
    const scan = (t % 9) / 4.5;
    HOLO.uScanGain.value = scan < 1 ? 0.9 * Math.sin(Math.PI * scan) : 0;
    HOLO.uScanY.value = -0.3 + scan * (DECK + VPC.h + 0.8);

    draw();
  }

  function resize() {
    const W = container.clientWidth;
    const H = container.clientHeight;
    if (!W || !H) return;
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(W, H, false);
    labels.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    layer.style.fontSize = `${Math.max(9, Math.min(12.5, W / 75))}px`;
    // narrow screens: drop the resource types, then the pipeline station names
    const subs = W >= 620;
    for (const el of layer.querySelectorAll<HTMLElement>(".holo-sub")) el.style.display = subs ? "block" : "none";
    for (const o of labelObjs) if (o.element.classList.contains("holo-ci")) o.visible = W >= 520;
    fit(W, H);
    place(controls.getPolarAngle(), controls.getAzimuthalAngle()); // keep the view angle, new distance
    controls.update();
    pointMat.uniforms.uScale.value = (H * renderer.getPixelRatio()) / (2 * Math.tan(((FOV / 2) * Math.PI) / 180));
    if (!running) draw();
  }

  container.append(canvas, layer);
  const ro = new ResizeObserver(() => !disposed && resize());
  ro.observe(container);
  // label widths change once the web fonts arrive; refit then
  document.fonts?.ready.then(() => !disposed && resize());

  // first frame
  place(BASE_POLAR, BASE_AZ);
  controls.update();
  updatePackets(t);
  updateLamps(t);
  resize();

  renderer.compileAsync(scene, camera).then(() => {
    compiled = true;
    if (!disposed) draw();
  });

  const handle: TopologyHandle = {
    setRunning(on: boolean) {
      if (disposed) return;
      if (rm) {
        if (on) draw();
        return;
      }
      if (on === running) return;
      running = on;
      if (on) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else cancelAnimationFrame(raf);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        const g = (o as Partial<Mesh>).geometry;
        if (g) g.dispose();
      });
      for (const m of mats.values()) m.dispose();
      pointMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      layer.remove();
    },
  };
  handle.setRunning(true);
  return handle;
}
