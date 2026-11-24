import {
  BoxGeometry,
  BufferGeometry,
  DirectionalLight,
  EdgesGeometry,
  Float32BufferAttribute,
  Fog,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

type Piece = {
  mesh: Mesh;
  start: number;
  end: number;
  kind: 'column' | 'beamX' | 'beamZ' | 'slab';
  baseY: number;
  mat?: MeshStandardMaterial;
};

export type BuildScene = {
  setBuild: (v: number) => void;
  setPointer: (x: number, y: number) => void;
  resize: () => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
};

const GOLD = 0xf2c230;
const INK = 0x121211;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Appends a box's 12 edges (as line pairs) to a flat array. */
function pushBoxEdges(out: number[], cx: number, cy: number, cz: number, sx: number, sy: number, sz: number) {
  const g = new EdgesGeometry(new BoxGeometry(sx, sy, sz));
  const p = g.getAttribute('position');
  for (let i = 0; i < p.count; i++) out.push(p.getX(i) + cx, p.getY(i) + cy, p.getZ(i) + cz);
  g.dispose();
}

export function createBuildScene(canvas: HTMLCanvasElement, opts: { mobile: boolean }): BuildScene {
  const { mobile } = opts;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  scene.fog = new Fog(INK, 34, 78);

  const camera = new PerspectiveCamera(32, 1, 0.1, 200);

  scene.add(new HemisphereLight(0xf5efe0, 0x1a1a18, 1.1));
  const key = new DirectionalLight(0xfff1d6, 2.2);
  key.position.set(14, 22, 10);
  scene.add(key);
  const rim = new DirectionalLight(GOLD, 1.1);
  rim.position.set(-16, 8, -14);
  scene.add(rim);

  // ---- Structure -------------------------------------------------------
  const NX = 4;
  const NZ = 3;
  const FLOORS = mobile ? 5 : 7;
  const SX = 2.6;
  const SZ = 2.6;
  const FH = 1.55;
  const COL = 0.16;
  const BEAM = 0.13;

  const x0 = -((NX - 1) * SX) / 2;
  const z0 = -((NZ - 1) * SZ) / 2;
  const W = (NX - 1) * SX;
  const D = (NZ - 1) * SZ;

  const building = new Group();
  scene.add(building);

  const steel = new MeshStandardMaterial({ color: 0x9aa0a6, metalness: 0.75, roughness: 0.34 });
  const steelDark = new MeshStandardMaterial({ color: 0x6f757b, metalness: 0.75, roughness: 0.4 });

  // Geometries share an origin at one end so scaling "grows" the member.
  const colGeo = new BoxGeometry(COL, FH, COL).translate(0, FH / 2, 0);
  const beamXGeo = new BoxGeometry(SX, BEAM, BEAM * 0.8).translate(SX / 2, 0, 0);
  const beamZGeo = new BoxGeometry(BEAM * 0.8, BEAM, SZ).translate(0, 0, SZ / 2);
  const slabGeo = new BoxGeometry(W + 0.5, 0.14, D + 0.5);

  const pieces: Piece[] = [];
  const ghost: number[] = [];

  // Foundation pad, always present.
  const pad = new Mesh(
    new BoxGeometry(W + 1.6, 0.3, D + 1.6),
    new MeshStandardMaterial({ color: 0x3a3936, roughness: 0.95 })
  );
  pad.position.y = -0.15;
  building.add(pad);

  for (let f = 0; f < FLOORS; f++) {
    const y = f * FH;
    // Columns, staggered from the front-left corner.
    let ci = 0;
    for (let ix = 0; ix < NX; ix++) {
      for (let iz = 0; iz < NZ; iz++) {
        const m = new Mesh(colGeo, steel);
        m.position.set(x0 + ix * SX, y, z0 + iz * SZ);
        m.visible = false;
        building.add(m);
        const s = f + (ci / (NX * NZ)) * 0.35;
        pieces.push({ mesh: m, start: s, end: s + 0.18, kind: 'column', baseY: y });
        pushBoxEdges(ghost, x0 + ix * SX, y + FH / 2, z0 + iz * SZ, COL, FH, COL);
        ci++;
      }
    }
    // Beams at the top of this storey.
    const by = y + FH;
    let bi = 0;
    const beamCount = (NX - 1) * NZ + NX * (NZ - 1);
    for (let iz = 0; iz < NZ; iz++) {
      for (let ix = 0; ix < NX - 1; ix++) {
        const m = new Mesh(beamXGeo, steelDark);
        m.position.set(x0 + ix * SX, by, z0 + iz * SZ);
        m.visible = false;
        building.add(m);
        const s = f + 0.38 + (bi / beamCount) * 0.32;
        pieces.push({ mesh: m, start: s, end: s + 0.14, kind: 'beamX', baseY: by });
        pushBoxEdges(ghost, x0 + ix * SX + SX / 2, by, z0 + iz * SZ, SX, BEAM, BEAM);
        bi++;
      }
    }
    for (let ix = 0; ix < NX; ix++) {
      for (let iz = 0; iz < NZ - 1; iz++) {
        const m = new Mesh(beamZGeo, steelDark);
        m.position.set(x0 + ix * SX, by, z0 + iz * SZ);
        m.visible = false;
        building.add(m);
        const s = f + 0.38 + (bi / beamCount) * 0.32;
        pieces.push({ mesh: m, start: s, end: s + 0.14, kind: 'beamZ', baseY: by });
        pushBoxEdges(ghost, x0 + ix * SX, by, z0 + iz * SZ + SZ / 2, BEAM, BEAM, SZ);
        bi++;
      }
    }
    // Poured slab.
    const mat = new MeshStandardMaterial({
      color: 0xc9c3b6,
      roughness: 0.92,
      metalness: 0,
      transparent: true,
      opacity: 0,
    });
    const slab = new Mesh(slabGeo, mat);
    slab.position.set(0, by + 0.07, 0);
    slab.visible = false;
    building.add(slab);
    pieces.push({ mesh: slab, start: f + 0.74, end: f + 1, kind: 'slab', baseY: by + 0.07, mat });
    pushBoxEdges(ghost, 0, by + 0.07, 0, W + 0.5, 0.14, D + 0.5);
  }

  // Blueprint ghost of the finished frame.
  const ghostGeo = new BufferGeometry();
  ghostGeo.setAttribute('position', new Float32BufferAttribute(ghost, 3));
  const ghostMat = new LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.32, depthWrite: false });
  const ghostLines = new LineSegments(ghostGeo, ghostMat);
  building.add(ghostLines);

  // Site grid on the ground plane.
  const grid: number[] = [];
  const gridMajor: number[] = [];
  const HALF = 30;
  const STEP = 1.3;
  for (let i = -HALF; i <= HALF; i += STEP) {
    const major = Math.abs(Math.round(i / STEP)) % 4 === 0;
    const arr = major ? gridMajor : grid;
    arr.push(-HALF, 0, i, HALF, 0, i, i, 0, -HALF, i, 0, HALF);
  }
  const mkGrid = (pts: number[], opacity: number) => {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pts, 3));
    const l = new LineSegments(g, new LineBasicMaterial({ color: GOLD, transparent: true, opacity, depthWrite: false }));
    l.position.y = -0.31;
    scene.add(l);
    return l;
  };
  mkGrid(grid, 0.06);
  mkGrid(gridMajor, 0.14);

  // ---- Tower crane (the logo has one; so does every site) ---------------
  const craneMat = new MeshStandardMaterial({ color: GOLD, metalness: 0.35, roughness: 0.55 });
  const crane = new Group();
  const mastH = FLOORS * FH + 1.4;
  const mast = new Mesh(new BoxGeometry(0.5, mastH, 0.5), craneMat);
  mast.position.y = mastH / 2 - 0.3;
  crane.add(mast);
  // Lattice on the mast (cheap lines, reads as truss).
  const lattice: number[] = [];
  for (let y = 0; y < mastH; y += 0.6) {
    lattice.push(-0.26, y, 0.26, 0.26, y + 0.6, 0.26, 0.26, y, -0.26, -0.26, y + 0.6, -0.26);
  }
  const latGeo = new BufferGeometry();
  latGeo.setAttribute('position', new Float32BufferAttribute(lattice, 3));
  const lat = new LineSegments(latGeo, new LineBasicMaterial({ color: INK }));
  lat.position.y = -0.3;
  crane.add(lat);

  const slew = new Group();
  slew.position.y = mastH - 0.3;
  crane.add(slew);
  const jib = new Mesh(new BoxGeometry(15, 0.4, 0.4), craneMat);
  jib.position.x = -5.5;
  slew.add(jib);
  const counter = new Mesh(new BoxGeometry(1.4, 0.7, 0.9), new MeshStandardMaterial({ color: 0x4a4844, roughness: 0.9 }));
  counter.position.set(2.6, -0.1, 0);
  slew.add(counter);
  const cab = new Mesh(new BoxGeometry(0.8, 0.8, 0.8), craneMat);
  cab.position.set(0.3, -0.6, 0.5);
  slew.add(cab);
  const apex = new Mesh(new BoxGeometry(0.3, 2.2, 0.3), craneMat);
  apex.position.y = 1.1;
  slew.add(apex);
  const tieGeo = new BufferGeometry();
  tieGeo.setAttribute('position', new Float32BufferAttribute([0, 2.2, 0, -12.5, 0.2, 0, 0, 2.2, 0, 2.8, 0.3, 0], 3));
  slew.add(new LineSegments(tieGeo, new LineBasicMaterial({ color: 0xbdb8ae })));

  const trolley = new Group();
  slew.add(trolley);
  const cableGeo = new BufferGeometry();
  cableGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, -1, 0], 3));
  const cable = new LineSegments(cableGeo, new LineBasicMaterial({ color: 0xbdb8ae }));
  trolley.add(cable);
  const load = new Mesh(new BoxGeometry(SX, BEAM, BEAM * 0.8), steelDark);
  trolley.add(load);

  crane.position.set(x0 + W + 6.5, 0, 3.2);
  scene.add(crane);

  // ---- State ------------------------------------------------------------
  let target = 0;
  let current = 0;
  let px = 0;
  let py = 0;
  let cpx = 0;
  let cpy = 0;
  let raf = 0;
  let running = false;
  let width = 1;
  let height = 1;
  const lookAt = new Vector3();
  const t0 = performance.now();

  function applyBuild(b: number) {
    const t = b * FLOORS;
    for (const p of pieces) {
      const k = clamp01((t - p.start) / (p.end - p.start));
      p.mesh.visible = k > 0.001;
      if (!p.mesh.visible) continue;
      if (p.kind === 'column') {
        p.mesh.scale.set(1, easeOut(k), 1);
      } else if (p.kind === 'beamX') {
        p.mesh.scale.set(easeOut(k), 1, 1);
      } else if (p.kind === 'beamZ') {
        p.mesh.scale.set(1, 1, easeOut(k));
      } else if (p.mat) {
        p.mat.opacity = k;
        p.mesh.position.y = p.baseY + (1 - easeOutBack(k)) * 0.8;
      }
    }
    ghostMat.opacity = 0.34 - b * 0.2;
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    current += (target - current) * 0.09;
    cpx += (px - cpx) * 0.05;
    cpy += (py - cpy) * 0.05;
    applyBuild(current);

    const time = (now - t0) / 1000;
    // Crane slews with progress and breathes a little on its own.
    slew.rotation.y = -0.15 + current * 0.9 + Math.sin(time * 0.35) * 0.08;
    const reach = 4 + (1 - ((current * FLOORS) % 1)) * 6;
    trolley.position.x = -reach;
    const topY = Math.min(current * FLOORS + 1, FLOORS) * FH;
    const drop = Math.max(1.2, mastH - 0.3 - topY - 1.2);
    trolley.position.y = 0;
    cable.scale.y = drop;
    load.position.y = -drop;
    load.rotation.y = Math.sin(time * 0.8) * 0.25;

    const angle = -0.75 + current * 1.05 + cpx * 0.12;
    const radius = mobile ? 58 : 37;
    const camY = 5 + current * 8 + cpy * 1.2;
    camera.position.set(Math.sin(angle) * radius, camY, Math.cos(angle) * radius);
    lookAt.set(1.5, 3.2 + current * FLOORS * FH * 0.42, 0);
    camera.lookAt(lookAt);

    renderer.render(scene, camera);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Desktop: push the building right so the headline owns the left.
    if (width > 900) {
      camera.setViewOffset(width, height, -width * 0.15, -height * 0.04, width, height);
    } else {
      camera.setViewOffset(width, height, -width * 0.04, height * 0.2, width, height);
    }
    camera.updateProjectionMatrix();
  }

  resize();
  applyBuild(0);

  return {
    setBuild(v) {
      target = clamp01(v);
    },
    setPointer(x, y) {
      px = x;
      py = y;
    },
    resize,
    start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        const m = o as Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as MeshStandardMaterial | MeshStandardMaterial[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
    },
  };
}

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
