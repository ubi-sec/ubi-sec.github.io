import { useEffect, useRef } from "react";
import { useFx } from "./fx";

/** Holographic 3D globe: dotted continents, wire grid, red orbit and travelling data arcs. */
export function HeroGlobe({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { enabled } = useFx();
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      const GREEN = new THREE.Color("#2cff86");
      const RED = new THREE.Color("#ff3b3b");

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 6.2);

      const globe = new THREE.Group();
      globe.rotation.z = 0.35;
      scene.add(globe);
      const R = 1.6;

      // Cheap value-noise to fake continents.
      const hash = (x: number, y: number, z: number) => {
        const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
        return s - Math.floor(s);
      };
      const noise = (x: number, y: number, z: number) => {
        const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        const xf = x - xi, yf = y - yi, zf = z - zi;
        const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
        let out = 0;
        for (let dx = 0; dx <= 1; dx++)
          for (let dy = 0; dy <= 1; dy++)
            for (let dz = 0; dz <= 1; dz++)
              out += hash(xi + dx, yi + dy, zi + dz) * (dx ? u : 1 - u) * (dy ? v : 1 - v) * (dz ? w : 1 - w);
        return out;
      };

      const N = 5200;
      const land: number[] = [];
      const sea: number[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = i * Math.PI * (3 - Math.sqrt(5));
        const x = Math.cos(th) * r, z = Math.sin(th) * r;
        const n = noise(x * 2.2 + 3, y * 2.2 + 1, z * 2.2 + 7) * 0.7 + noise(x * 5 + 9, y * 5, z * 5) * 0.3;
        (n > 0.52 ? land : sea).push(x * R, y * R, z * R);
      }
      const mkPoints = (arr: number[], size: number, opacity: number) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        const m = new THREE.PointsMaterial({ color: GREEN, size, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
        return new THREE.Points(g, m);
      };
      globe.add(mkPoints(land, 0.035, 0.95));
      globe.add(mkPoints(sea, 0.014, 0.25));

      // Dark core so back-side dots are occluded.
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(R * 0.985, 48, 48),
        new THREE.MeshBasicMaterial({ color: 0x020a05, transparent: true, opacity: 0.6 }),
      );
      globe.add(core);

      const wire = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.002, 24, 16),
        new THREE.MeshBasicMaterial({ color: GREEN, wireframe: true, transparent: true, opacity: 0.07 }),
      );
      globe.add(wire);

      // Atmosphere glow sprite.
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const ctx = c.getContext("2d")!;
      const grd = ctx.createRadialGradient(128, 128, 60, 128, 128, 128);
      grd.addColorStop(0, "rgba(44,255,134,0.0)");
      grd.addColorStop(0.62, "rgba(44,255,134,0.28)");
      grd.addColorStop(1, "rgba(44,255,134,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 256, 256);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.set(R * 3.1, R * 3.1, 1);
      scene.add(glow);

      // Orbits.
      const orbit = (radius: number, color: import("three").Color, opacity: number, rx: number, ry: number) => {
        const m = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.006, 8, 200),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
        );
        m.rotation.set(rx, ry, 0);
        scene.add(m);
        return m;
      };
      const redOrbit = orbit(R * 1.32, RED, 0.75, 1.25, 0.35);
      const greenOrbit = orbit(R * 1.16, GREEN, 0.35, 1.45, -0.5);

      // Data arcs between random surface points.
      const randOnSphere = () => {
        const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        return new THREE.Vector3(s * Math.cos(t), u, s * Math.sin(t)).multiplyScalar(R);
      };
      const arcs: { curve: import("three").QuadraticBezierCurve3; pulse: import("three").Mesh; t: number; speed: number }[] = [];
      const pulseGeo = new THREE.SphereGeometry(0.028, 8, 8);
      for (let i = 0; i < 9; i++) {
        const a = randOnSphere(), b = randOnSphere();
        const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.25 + Math.random() * 0.35));
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
          new THREE.LineBasicMaterial({ color: i % 4 === 0 ? RED : GREEN, transparent: true, opacity: 0.45 }),
        );
        globe.add(line);
        const pulse = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? RED : GREEN }));
        globe.add(pulse);
        arcs.push({ curve, pulse, t: Math.random(), speed: 0.12 + Math.random() * 0.2 });
      }

      const resize = () => {
        const w = mount.clientWidth || 1, h = mount.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
      io.observe(mount);

      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let lastT = performance.now();
      let raf = 0;
      let first = true;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - lastT) / 1000, 0.05);
        lastT = now;
        if (!first && (!visible || !enabledRef.current || document.hidden)) return;
        globe.rotation.y += dt * 0.12;
        globe.rotation.x += ((mouse.y * 0.15) - globe.rotation.x) * 0.03;
        scene.rotation.y += ((mouse.x * 0.2) - scene.rotation.y) * 0.03;
        redOrbit.rotation.z += dt * 0.25;
        greenOrbit.rotation.z -= dt * 0.18;
        for (const a of arcs) {
          a.t = (a.t + dt * a.speed) % 1;
          a.pulse.position.copy(a.curve.getPoint(a.t));
        }
        renderer.render(scene, camera);
        if (first) {
          first = false;
          mount.dataset["sceneReady"] = "true";
        }
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose?.();
          const mat = m.material as { dispose?: () => void } | undefined;
          mat?.dispose?.();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
