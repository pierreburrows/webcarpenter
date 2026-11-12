"use client";

import { useEffect, useRef, useState } from "react";

/** Renders children once the wrapper is within `margin` of the viewport. Keeps below-fold images off the first paint. */
export default function LazyMount({ children, className, margin = "500px" }: { children: React.ReactNode; className?: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return <div ref={ref} className={className}>{show ? children : null}</div>;
}
