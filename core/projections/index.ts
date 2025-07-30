// projections/index.ts
import { GlobeProjection } from "./globe";

export const Projections = {
  globe: GlobeProjection,
};

export type ProjectionId = keyof typeof Projections;
