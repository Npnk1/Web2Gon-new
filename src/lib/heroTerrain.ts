export type TerrainHandle = {
  resize: () => void;
  stop: () => void;
};

const ROWS = 46;
const COLS = 148;
/**
 * Field-time advanced per *second*, not per frame, so the wave travels at the
 * same rate on 60Hz and 120Hz displays. 0.2112 = the previous per-frame step
 * (0.0022, i.e. 0.132/s at 60Hz) run 1.6x faster.
 */
const TIME_SPEED = 0.2112;
/** Caps the catch-up after a stall (tab resume, long task) to one ~20fps step. */
const MAX_FRAME_DELTA = 0.05;
const BASE_ALPHA = 0.09;
const ALPHA_SPAN = 0.55;

/**
 * Deterministic layered-wave field: six overlaid gaussian/sine terms, no
 * randomness, so the same frame sequence renders identically on every load.
 * Ported from the approved design mockup's canvas script.
 */
function field(x: number, z: number, t: number): number {
  return (
    Math.exp(-(((x - 0.1) * 1.9) ** 2)) * 0.9 * (0.5 + z * 0.6) +
    Math.exp(-(((x + 0.72) * 2.6) ** 2)) * 0.42 * (0.45 + z * 0.55) +
    Math.exp(-(((x - 1.1) * 3.0) ** 2)) * 0.28 +
    Math.sin(x * 3.1 + z * 1.7 + t) * 0.13 +
    Math.sin(x * 7.3 - z * 2.9 - t * 0.7) * 0.07 +
    Math.sin(x * 14.1 + z * 5.3) * 0.035 +
    Math.sin(z * 3.4 + t * 0.4) * 0.08
  );
}

/** "R, G, B" (no alpha, no wrapping rgb()) so callers can drop it into rgba(). */
export function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Draws the hero's animated topographic field onto `canvas` and keeps it
 * running via requestAnimationFrame, pausing automatically while the tab is
 * hidden. Caller owns the media-query gate and must call `stop()` on cleanup.
 */
export function startHeroTerrain(
  canvas: HTMLCanvasElement,
  rgbTriplet: string,
): TerrainHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { resize: () => {}, stop: () => {} };

  let width = 0;
  let height = 0;

  const measure = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = canvas.offsetWidth || 1440;
    height = canvas.offsetHeight || 620;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    // setTransform (not scale) so repeated resize() calls don't compound.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  measure();

  let frame = 0;
  let active = true;
  let t = 0;
  /** 0 = "no previous frame"; the next frame seeds the clock instead of
      integrating against a stale timestamp (which would jump the wave). */
  let lastTimestamp = 0;

  const draw = (timestamp: number) => {
    if (lastTimestamp === 0) lastTimestamp = timestamp;
    const delta = Math.min((timestamp - lastTimestamp) / 1000, MAX_FRAME_DELTA);
    lastTimestamp = timestamp;
    t += TIME_SPEED * delta;

    ctx.clearRect(0, 0, width, height);

    for (let row = 0; row < ROWS; row++) {
      const depth = row / (ROWS - 1);
      const perspective = depth ** 1.4;
      const baseY = height * 0.2 + perspective * height * 0.78;
      const amplitude = 20 + 250 * depth ** 1.25;
      const spread = 0.42 + 1.05 * depth;
      const alpha = BASE_ALPHA + ALPHA_SPAN * depth ** 1.25;

      ctx.beginPath();
      ctx.lineWidth = 0.55 + depth * 0.35;
      ctx.strokeStyle = `rgba(${rgbTriplet}, ${alpha.toFixed(3)})`;

      for (let col = 0; col <= COLS; col++) {
        const u = col / COLS;
        const x = width * 0.5 + (u - 0.5) * width * spread;
        const y = baseY - amplitude * field((u - 0.5) * 2, depth, t);
        if (col === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (row % 2 === 0) {
        ctx.fillStyle = `rgba(${rgbTriplet}, ${(alpha * 1.5).toFixed(3)})`;
        for (let col = 0; col <= COLS; col += 4) {
          const u = col / COLS;
          const x = width * 0.5 + (u - 0.5) * width * spread;
          const y = baseY - amplitude * field((u - 0.5) * 2, depth, t);
          ctx.fillRect(x - 0.5, y - 0.5, 1.1, 1.1);
        }
      }
    }

    if (active) frame = requestAnimationFrame(draw);
  };

  const handleVisibility = () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    } else if (active && !frame) {
      // Reseed the clock so the hidden interval isn't integrated at once.
      lastTimestamp = 0;
      frame = requestAnimationFrame(draw);
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  frame = requestAnimationFrame(draw);

  return {
    resize: measure,
    stop: () => {
      active = false;
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibility);
    },
  };
}
