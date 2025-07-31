import { DGGSLayer } from "../layers/dggs-layer";
import { createRenderer } from "./renderer/renderCells";

import { Projections } from "./projections";
import { cellToBoundary } from "h3-js";
import earcut from "earcut";

export class DGGSView {
  props: {
    /// HTML element string id.
    element?: string;
    layer?: string;
    projection: "globe";
  };
  constructor() {
    let props = (this.props = {
      element: "dggs",
      layer: undefined,
      projection: "globe",
    });

    let canvas = this._createCanvas();
    const renderer = createRenderer(canvas);

    const projection = Projections[props.projection];
    const { vertices, indices } = this._project(projection);

    renderer.render([
      {
        vertices,
        indices,
        color: [0.2, 0.8, 0.9, 1.0],
        height: 0.02,
      },
    ]); // updates camera & draws
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

  _project(projection) {
    const cell = "80a5fffffffffff";
    const latlonPoly = cellToBoundary(cell, true);
    // Project to 3D (or flatten to 2D for now)
    const projected = latlonPoly.map(([lat, lon]) => {
      return projection.forward(lat, lon);
    });
    console.log(projected);

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
