"use client";

import { cn } from "@/lib/utils";
import createGlobe, { Marker } from "cobe";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, MouseEvent, useImperativeHandle, Ref } from "react";

export type ColorType = [number, number, number];

export interface GlobeProps {
  globeRef?: Ref<GlobeRef>;
  markers: Marker[];
  autoRotateTimer?: number;
  width?: number;
  height?: number;
  markerColor?: ColorType;
  className?: string;
}

export interface GlobeRef {
  locateToPosition(lat: number, lng: number): void;
}

const Globe = ({
  globeRef,
  markers,
  autoRotateTimer = 2000,
  width = 500,
  height = 500,
  markerColor = [59, 130, 246],
  className,
}: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);

  const focusRef = useRef<[number, number] | null>(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    mass: 1,
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    let phi = 0;
    let theta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.3,
      baseColor: [1, 1, 1],
      markerColor: markerColor.map((color) => color / 255) as ColorType,
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.005;
        }

        state.phi = phi + springValue.get();
        state.theta = theta;
        if (focusRef.current) {
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - phi + doublePi) % doublePi;
          const distNegative = (phi - focusPhi + doublePi) % doublePi;
          // Control the speed
          if (distPositive < distNegative) {
            phi += distPositive * 0.08;
          } else {
            phi -= distNegative * 0.08;
          }
          theta = theta * 0.92 + focusTheta * 0.08;
        }
        state.width = width * 2;
        state.height = height * 2;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  useImperativeHandle(globeRef, () => ({
    locateToPosition(lat: number, lng: number) {
      focusRef.current = [
        Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
        (lat * Math.PI) / 180,
      ];

      // Wait for auto rotation
      setTimeout(() => {
        focusRef.current = null;
      }, autoRotateTimer);
    },
  }));

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) {
      return;
    }

    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    canvasRef.current.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    if (!canvasRef.current) {
      return;
    }

    pointerInteracting.current = null;
    canvasRef.current.style.cursor = "grab";
  };

  const onPointerOut = () => {
    if (!canvasRef.current) {
      return;
    }

    pointerInteracting.current = null;
    canvasRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current === null) {
      return null;
    }

    const delta = e.clientX - pointerInteracting.current;
    pointerInteractionMovement.current = delta;

    motionValue.set(delta / 200);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;

      motionValue.set(delta / 100);
    }
  };

  return (
    <motion.canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={cn(
        "bg-background cursor-grab w-full aspect-square",
        className
      )}
      style={{ width, height }}
    />
  );
};

export default Globe;
