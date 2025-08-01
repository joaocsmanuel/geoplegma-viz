import { cellToBoundary } from "h3-js";
import { DGGSAdapter } from "./dggs-adapter";

export class H3Adapter extends DGGSAdapter {
  constructor(zones: string[]) {
    super();

    const polygons = zones.map((zone) => {
      return cellToBoundary(zone, true);
    });

    return polygons;
  }
}

export default H3Adapter;
