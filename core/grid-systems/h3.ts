import {
  cellToBoundary,
  cellToChildren,
  polygonToCells,
  type CoordPair,
} from "h3-js";
import { DGGSAdapter } from "./dggs-adapter";
import type { DGGSLayerProps } from "../../layers/dggs-layer";
import { Validator } from "../utils/validator";
import { ValidationError } from "../utils/error";

// temporarly
export class H3Adapter extends DGGSAdapter {
  polygons: CoordPair[][];
  constructor() {
    super();
    this.polygons = [];
  }

  getPolygons(dggrs: DGGSLayerProps) {
    try {
      let polygons = [];
      if (dggrs.context === "zones") {
        const zones = Validator.validateZones(dggrs.zones);
        polygons = zones.map((zone) => {
          return cellToBoundary(zone, true);
        });
      } else if (dggrs.context === "bbox") {
        // if (
        //   dggrs.bbox &&
        //   dggrs.bbox.length > 0 &&
        //   (dggrs.resolution !== undefined || dggrs.resolution !== null)
        // ) {
        const bbox =  Validator.validateBbox(dggrs.bbox);
        if (typeof dggrs.resolution === "number" && !isNaN(dggrs.resolution)) {
          const zones = polygonToCells(bbox, dggrs.resolution);
          polygons = zones.map((zone) => {
            return cellToBoundary(zone, true);
          });
        } else {
          throw new ValidationError("Resolution is empty.");
        }

        // }
      } else if (dggrs.context === "parent") {
        if (
          dggrs.parentId &&
          typeof dggrs.resolution === "number" &&
          !isNaN(dggrs.resolution)
        ) {
          const zones = cellToChildren(dggrs.parentId, dggrs.resolution);
          polygons = zones.map((zone) => {
            return cellToBoundary(zone, true);
          });
        } else {
          throw new ValidationError("Resolution or parentId is empty.");
        }
      }

      console.log(this);
      return polygons;
    } catch (error) {
      throw error;
    }
  }
}

export default H3Adapter;
