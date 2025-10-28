import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

export const Globe = ({ className = "", config = {} }: { className?: string; config?: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const arcTime = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [0.0, 0.4, 0.3],
      markers: [],
      onRender: (state) => {
        // Auto-rotation when not interacting
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;

        // Animate arcs (meteors)
        arcTime.current += 0.002;
        const progress = (Math.sin(arcTime.current) + 1) / 2;

        // Define animated arcs between cities
        state.arcs = [
          // From Novi Sad to other cities - orange meteors
          { from: [45.2671, 19.8335], to: [40.7128, -74.006], color: [0.98, 0.45, 0.09], progress: progress },
          { from: [45.2671, 19.8335], to: [51.5074, -0.1278], color: [0.0, 1.0, 0.53], progress: (progress + 0.2) % 1 },
          { from: [45.2671, 19.8335], to: [35.6762, 139.6503], color: [0.98, 0.45, 0.09], progress: (progress + 0.4) % 1 },
          { from: [40.7128, -74.006], to: [51.5074, -0.1278], color: [0.0, 0.8, 0.4], progress: (progress + 0.6) % 1 },
          { from: [51.5074, -0.1278], to: [35.6762, 139.6503], color: [0.98, 0.45, 0.09], progress: (progress + 0.8) % 1 },
        ];
      },
      ...config,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [config, r]);

  return (
    <div className={className} style={{ width: '100%', maxWidth: 600, aspectRatio: 1, margin: 'auto', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grabbing';
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grab';
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grab';
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.targetTouches[0]) {
            const delta = e.targetTouches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
};
