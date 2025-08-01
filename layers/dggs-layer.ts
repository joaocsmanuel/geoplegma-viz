export type DggrsId =
  | "DGGRID-ISEA3H"
  | "DGGRID-IGEO7"
  | "DGGAL-ISEA3H"
  | "DGGAL-ISEA9R"
  | "DGGAL-IVEA3H"
  | "DGGAL-IVEA9R"
  | "DGGAL-RTEA3H"
  | "DGGAL-RTEA9R"
  | "H3O-H3";

export const DGGRS_ID = [
  "DGGRID-ISEA3H",
  "DGGRID-IGEO7",
  "DGGAL-ISEA3H",
  "DGGAL-ISEA9R",
  "DGGAL-IVEA3H",
  "DGGAL-IVEA9R",
  "DGGAL-RTEA3H",
  "DGGAL-RTEA9R",
  "H3O-H3",
];


export interface DGGSLayerProps {
  id?: DggrsId;
  context: "zones" | "bbox" | "parent";
  resolution?: number;
  zones?: string[];
  // getColor?: (d: any) => number[];
  // getElevation?: (d: any) => number;
  // wireframe?: boolean;
  // opacity?: number;
}

export class DGGSLayer {
  id?: DggrsId;
  context: "zones" | "bbox" | "parent" = "zones";
  zones?: string[];
  resolution?: number;
  getColor?: (d: any) => number[];
  getElevation?: (d: any) => number;
  wireframe?: boolean;
  opacity?: number;
  constructor() {
    //     {
    //         dggrs = un;
    //     this.resolution = 0;
    //     this.indexes = [];
    //     this.getColor = (d: any) => [255, 100, 100];
    //     this.getElevation = (d: any) => 50;
    //     (this.projection = "globe"), (this.wireframe = false);
    //     this.opacity = 1;
  }
}

// DGGSLayer({
//   dggs: "h3", // or 'healpix', 'dggal', etc.
//   resolution: 5,
//   indexes: ["8928308280fffff", "8928308281bffff"], // Unique cell IDs
//   getColor: (index) => [255, 100, 100],
//   getElevation: (index) => 50,
//   projection: "globe", // 'mercator', 'equal-area', etc.
//   wireframe: boolean,
//   opacity: number,
// });
// getTimeValue?: (index, time) => number;
