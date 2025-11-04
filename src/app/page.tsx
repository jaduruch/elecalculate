'use client';

import { useEffect, useRef, useState } from 'react';
import './page.css';

interface Logo {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Home() {
  const elecRef = useRef<HTMLImageElement>(null);
  const nextRef = useRef<HTMLImageElement>(null);
  const [logos, setLogos] = useState<Logo[]>([
    { x: 0, y: 0, vx: 3, vy: 3 },
    { x: 0, y: 0, vx: -2.5, vy: -2.5 }
  ]);

  useEffect(() => {
    setLogos([
      { x: 0, y: 0, vx: 3, vy: 3 },
      {
        x: window.innerWidth - 120,
        y: window.innerHeight - 120,
        vx: -2.5,
        vy: -2.5
      }
    ]);

    const animate = () => {
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 120;

      setLogos((prevLogos) =>
        prevLogos.map((logo, idx) => {
          let { x, y, vx, vy } = logo;
          x += vx;
          y += vy;

          if (x <= 0 || x >= maxX) vx *= -1;
          if (y <= 0 || y >= maxY) vy *= -1;

          x = Math.max(0, Math.min(x, maxX));
          y = Math.max(0, Math.min(y, maxY));

          const el = idx === 0 ? elecRef.current : nextRef.current;
          if (el) {
            el.style.left = x + 'px';
            el.style.top = y + 'px';
          }

          return { x, y, vx, vy };
        })
      );

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="screen">
      <img
        ref={elecRef}
        src="https://elecalculate.com/Pictures/favicon.png"
        alt="elecalculate"
        className="logo"
      />
      <img
        ref={nextRef}
        src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
        alt="Next.js"
        className="logo"
      />
      <div className="content">
        <h1>elecalculate</h1>
        <p className="status">Next.js POC - Testing Page</p>
      </div>
    </div>
  );
}