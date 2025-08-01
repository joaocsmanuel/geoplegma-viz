import type { Projection } from ".";
// MollweideProjection.ts
export const MollweideProjection: Projection = {
  id: "mollweide",

  forward(lat: number, lon: number): [number, number] {
    const λ = (lon * Math.PI) / 180;
    const φ = (lat * Math.PI) / 180;

    const tolerance = 1e-10;
    const maxIter = 10;

    let θ = φ; // initial guess
    for (let i = 0; i < maxIter; i++) {
      const delta =
        (2 * θ + Math.sin(2 * θ) - Math.PI * Math.sin(φ)) /
        (2 + 2 * Math.cos(2 * θ));
      θ -= delta;
      if (Math.abs(delta) < tolerance) break;
    }

    const x = ((2 * Math.SQRT2) / Math.PI) * λ * Math.cos(θ);
    const y = Math.SQRT2 * Math.sin(θ);

    return [x, y];
  },

  reverse(x: number, y: number): [number, number] {
    const θ = Math.asin(y / Math.SQRT2);
    const lat = Math.asin((2 * θ + Math.sin(2 * θ)) / Math.PI);
    const lon = (x * Math.PI) / (2 * Math.SQRT2 * Math.cos(θ));
    return [lat * (180 / Math.PI), lon * (180 / Math.PI)];
  },
};
