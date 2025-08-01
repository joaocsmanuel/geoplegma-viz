import { cellToBoundary } from "h3-js";
import { DGGSAdapter } from "./dggs-adapter";

export class H3Adapter extends DGGSAdapter {
  constructor(zones: string[]) {
    super();

    const cell = "80a5fffffffffff";

    const polygons = zones.map((zone) => {
      return cellToBoundary(zone, true);
    });
console.log(polygons);
    return polygons;
  }
}

export default H3Adapter;
