import { DGGSLayer } from "../layers/dggs-layer";
import { createRenderer } from "./renderer/renderCells";

import { Projections } from "./projections";
import H3Adapter from "./grid-systems/h3";
import earcut from "earcut";
type DggsViewProps = {
  /// HTML element string id.
  element?: string;
  zones?: string[];
  layer?: DGGSLayer;
  projection: "globe";
};

export class DGGSView {
  props: DggsViewProps;

  constructor(props?: Partial<DggsViewProps>) {
    this.props = {
      element: "dggs",
      layer: undefined,
      projection: "globe",
      zones: [],
      ...props,
    };
    console.log(this.props);
    let canvas = this._createCanvas();
    const renderer = createRenderer(canvas);

    const projection = Projections[this.props.projection];

    const polygons = new H3Adapter(this.props.layer.zones);

    const renderOptions = polygons.map((polygon) => {
      const { vertices, indices } = this._project(projection, polygon);
      return {
        vertices,
        indices,
        color: [0.2, 0.8, 0.9, 1.0],
        height: 0.02,
      };
    });

    renderer.render(renderOptions); // updates camera & draws
  }

  _createCanvas() {
    let canvas;

    if (this.props?.element) {
      canvas = document.querySelector("#dggs");
    } else {
      canvas = document.createElement("canvas") as Element;
      canvas.id = this.props.element;
      document.body.appendChild(canvas);
    }

    return canvas;
  }

  _project(projection, latlon) {
    // Project to 3D (or flatten to 2D for now)
    const projected = latlon.map(([lat, lon]) => {
      return projection.forward(lat, lon);
    });

    const flatXY = projected.map(([x, y]) => [x, y]).flat();
    // Flatten to Float32Array
    const indices: number[][] = [];
    const tris = new Uint16Array(earcut(flatXY)); // triangulate

    for (let i = 0; i < tris.length; i += 3) {
      indices.push([tris[i], tris[i + 1], tris[i + 2]]);
    }

    return { vertices: projected, indices };
  }
}

export default DGGSView;
