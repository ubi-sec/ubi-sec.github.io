import { useEffect, useRef } from "react";
import { useFx } from "./fx";

/** Low-opacity falling-glyph background, throttled to ~20fps and paused when effects are off. */
export function DigitalRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { enabled } = useFx();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const glyphs = "01アイウエオカキクケコサシスセソ<>/{}$#ABCDEF0123456789";
    const size = 16;
    let cols = 0;
    let drops: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50 || document.hidden) return;
      last = t;
      ctx.fillStyle = "rgba(5, 12, 8, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size - 2}px "Share Tech Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        const y = (drops[i] ?? 0) * size;
        ctx.fillStyle = Math.random() > 0.985 ? "rgba(255,70,70,0.8)" : "rgba(44,255,134,0.75)";
        ctx.fillText(ch ?? "0", i * size, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] = (drops[i] ?? 0) + 1;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [enabled]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-[0.13]" />
      <div className="bg-grid absolute inset-0" />
      <div className="bg-scanlines absolute inset-0 opacity-40" />
    </div>
  );
}
