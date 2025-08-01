import { cellToBoundary } from "h3-js";
import { DGGSAdapter } from "./dggs-adapter";

export class H3Adapter extends DGGSAdapter {
  constructor(context, { zones, bbox, parent }) {
    super();
    this.polygons = [];

    const dggrs = this.props.dggrs;
    if (dggrs.context === "zones") {
      if (dggrs.zones && dggrs.zones.length > 0) {
        this.polygons = zones.map((zone) => {
          return cellToBoundary(zone, true);
        });
      } else {
      }
    } else if (dggrs.context === "bbox") {
      if (dggrs.bbox && dggrs.bbox.length > 0 && dggrs.resolution) {
      }
    } else if (dggrs.context === "parent") {
    }

    const polygons = zones.map((zone) => {
      return cellToBoundary(zone, true);
    });

    return polygons;
  }
}

export default H3Adapter;
