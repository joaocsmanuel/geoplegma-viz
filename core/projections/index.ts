// projections/index.ts
import { GlobeProjection } from "./globe";
import { MollweideProjection } from "./mollweide";

export interface Projection {
  id: string;
  forward(lat: number, lon: number): [x: number, y: number, z?: number];
  reverse(x: number, y: number, z?: number): [lat: number, lon: number];
}

export const Projections = {
  globe: GlobeProjection,
  mollweide: MollweideProjection,
};

export type ProjectionId = keyof typeof Projections;
