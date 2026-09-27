"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";
import { useTheme } from "next-themes";

const palettes = {
  ocean: {
    colors: ["#00cbff", "#0284C7", "#7DD3FC", "#E0F2FE"],
    backgroundColor: "#075985",
  },
  default: {
    colors: ["#075985", "#0284C7", "#7DD3FC", "#E0F2FE"],
    backgroundColor: "#075985",
  },
  violet: {
    colors: ["#312E81", "#7C3AED", "#C4B5FD", "#F3E8FF"],
    backgroundColor: "#312E81",
  },
  "dark-violet": {
    colors: ["#160B2B", "#3B1A68", "#A78BFA", "#EDE9FE"],
    backgroundColor: "#160B2B",
  },
  emerald: {
    colors: ["#064E3B", "#059669", "#6EE7B7", "#ECFDF5"],
    backgroundColor: "#064E3B",
  },
  coral: {
    colors: ["#7C2D12", "#EA580C", "#FDBA74", "#FFF7ED"],
    backgroundColor: "#7C2D12",
  },
  "dark-coral": {
    colors: ["#24110F", "#6B2D27", "#FB923C", "#FFF7ED"],
    backgroundColor: "#24110F",
  },
  rose: {
    colors: ["#881337", "#E11D48", "#FDA4AF", "#FFF1F2"],
    backgroundColor: "#881337",
  },
  "dark-rose": {
    colors: ["#240C18", "#5F193B", "#FB7185", "#FFF1F2"],
    backgroundColor: "#240C18",
  },
  mono: {
    colors: ["#000000", "#171717", "#525252", "#FFFFFF"],
    backgroundColor: "#000000",
  },
  midnight: {
    colors: ["#090E17", "#1E293B", "#38BDF8", "#F1F5F9"],
    backgroundColor: "#090E17",
  },
  forest: {
    colors: ["#06120E", "#112D23", "#BEF264", "#EAF7F1"],
    backgroundColor: "#06120E",
  },
  calm: {
    colors: ["#171717", "#525252", "#A3A3A3", "#F5F5F5"],
    backgroundColor: "#171717",
  },
} as const;

const config = {
  colors: [
    { color: "#F3F9FF", enabled: true },
    { color: "#CFE6FF", enabled: true },
    { color: "#8EBEFF", enabled: true },
    { color: "#4D8CFF", enabled: true },
    { color: "#EE9B00", enabled: false },
  ],
  speed: 3,
  horizontalPressure: 5,
  verticalPressure: 7,
  waveFrequencyX: 2,
  waveFrequencyY: 2,
  waveAmplitude: 8,
  shadows: 6,
  highlights: 8,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: "#004E64",
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 82.4,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 4,
  flowDistortionA: 0,
  flowDistortionB: 0,
  flowScale: 1,
  flowEase: 0,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureVoidLikelihood: 0.45,
  textureVoidWidthMin: 200,
  textureVoidWidthMax: 486,
  textureBandDensity: 2.15,
  textureColorBlending: 0.01,
  textureSeed: 333,
  textureEase: 0.5,
  proceduralBackgroundColor: "#000000",
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: "#FFFFFF",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: "plane" as const,
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
};

export default function NeatBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();

  const activeTheme =
    theme && theme in palettes ? (theme as keyof typeof palettes) : "default";

  useEffect(() => {
    if (!canvasRef.current) return;

    const gradient = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    gradientRef.current = gradient;

    // rAF-coalesced scroll handler: only ever does one write per frame,
    // and bails out early if scrollY hasn't actually changed.
    const onScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const y = window.scrollY;
        if (y === lastScrollY.current) return;
        lastScrollY.current = y;
        gradient.yOffset = y;
      });
    };

    // Stop doing any work at all while the tab isn't visible. Most browsers
    // already throttle rAF/WebGL in background tabs, but this also removes
    // the scroll listener's work entirely and avoids queuing frames that
    // will just get dropped.
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.removeEventListener("scroll", onScroll);
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      gradient.destroy();
      gradientRef.current = null;
    };
  }, []);

  useEffect(() => {
    const gradient = gradientRef.current;
    const palette = palettes[activeTheme];

    if (!gradient) return;

    gradient.colors = palette.colors.map((color: string) => ({
      color,
      enabled: true,
    }));

    gradient.backgroundColor = palette.backgroundColor;
  }, [activeTheme]);

  return (
    <canvas
      ref={canvasRef}
      // pointer-events-none: this is a fixed full-viewport background,
      // so it should never receive hit-testing or block clicks/hover
      // on anything above it. No visual change, less event overhead.
      className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none"
      aria-hidden="true"
    />
  );
}