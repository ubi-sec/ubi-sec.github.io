import { useEffect } from "react";

/** Hero entrance timeline + scroll-triggered reveals for every [data-reveal] element. */
export function useGsapReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-hero-item]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", clearProps: "transform,opacity" });
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 32 });
        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", clearProps: "transform" }),
        });
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
