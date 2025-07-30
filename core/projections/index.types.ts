interface Projection {
  id: string;
  forward(lat: number, lon: number): [x: number, y: number, z?: number];
  reverse(x: number, y: number, z?: number): [lat: number, lon: number];
}
