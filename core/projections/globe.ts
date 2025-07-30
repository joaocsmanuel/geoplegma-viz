// GlobeProjection.ts
// This maps (lat, lon) to a unit sphere, which you can scale for visual output.
export const GlobeProjection: Projection = {
  id: "globe",

  forward(lat: number, lon: number): [number, number, number] {
    const φ = (lat * Math.PI) / 180;
    const λ = (lon * Math.PI) / 180;
    const x = Math.cos(φ) * Math.cos(λ);
    const y = Math.sin(φ);
    const z = Math.cos(φ) * Math.sin(λ);
    return [x, y, z];
  },

  reverse(x: number, y: number, z: number): [number, number] {
    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);
    return [lat, lon];
  },
};
