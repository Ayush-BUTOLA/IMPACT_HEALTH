import { useEffect, useRef, useCallback } from 'react';
import './DotGrid.css';

export default function DotGrid({
  dotColor = 'rgba(91, 91, 214, 0.25)',
  dotActiveColor = 'rgba(91, 91, 214, 0.7)',
  dotSize = 1.5,
  gap = 22,
  mouseRadius = 120,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let x = gap; x < rect.width; x += gap) {
      for (let y = gap; y < rect.height; y += gap) {
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / mouseRadius);

        const size = dotSize + proximity * 2.5;
        const alpha = proximity;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);

        if (alpha > 0.01) {
          ctx.fillStyle = dotActiveColor.replace(
            /[\d.]+\)$/,
            `${0.25 + alpha * 0.55})`
          );
        } else {
          ctx.fillStyle = dotColor;
        }

        ctx.fill();
      }
    }
  }, [dotColor, dotActiveColor, dotSize, gap, mouseRadius]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function animate() {
      draw();
      animRef.current = requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => draw());
    resizeObserver.observe(container);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [draw]);

  return (
    <div ref={containerRef} className={`dotgrid-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="dotgrid-canvas" />
    </div>
  );
}
