import { DGGSLayer, type DGGSLayerProps } from "../layers/dggs-layer";
import { createRenderer } from "./renderer/renderCells";

import { Projections, type ProjectionId } from "./projections";
import H3Adapter from "./grid-systems/h3";
import earcut from "earcut";

import { ErrorManager } from "./utils/error-handler";
import { Validator } from "./utils/validator";
interface DggsViewProps {
  /// HTML element string id.
  element?: string;
  // zones?: string[];
  dggrs?: DGGSLayerProps;
  projection: ProjectionId;
}

const DEFAULT_PROPS: DggsViewProps = {
  element: "dggs",
  projection: "globe",
  dggrs: {
    id: undefined,
    context: "zones",
    resolution: undefined,
    zones: undefined,
    // wireframe: "false",
    // opacity: "number",
  },
};

export class DGGSView {
  props: DggsViewProps;

  constructor(props?: Partial<DggsViewProps>) {
    try {
      // const { dggrs, ...restProps } = props;
      this.props = {
        ...DEFAULT_PROPS,
        ...props,
      };
      console.log(this.props);
      // ========== Validate props ==========
      this._validateConfiguration();
      // let polygons = this._validateDggrs();

      // console.log(this.props);
      // // ========== Renderer and camera ==========
      // let canvas = this._createCanvas();
      // const renderer = createRenderer(canvas);

      // // ========== Projection ==========
      // const projection = Projections[this.props.projection];

      // const renderOptions = polygons.map((polygon) => {
      //   const { vertices, indices } = this._project(projection, polygon);
      //   return {
      //     vertices,
      //     indices,
      //     color: [0.2, 0.8, 0.9, 1.0],
      //     height: 0.02,
      //   };
      // });

      // renderer.render(renderOptions); // updates camera & draws
    } catch (error) {
      // ErrorManager.handleError(
      //   error instanceof Error ? error : new Error(String(error))
      // );
      throw error;
    }
  }

  private _validateConfiguration(): void {
    if (this.props.element) {
      Validator.validateElement(this.props.element);
    }

    Validator.validateProjection(this.props.projection);

    Validator.validateDggrs(this.props.dggrs);
  }

  // private _validateDggrsConfiguration() {

  //   Validator.valida(this.props.dggrs);
  // }

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

  _validateContext() {
    if (this.props.dggrs) {
      const dggrs = this.props.dggrs;
      if (dggrs.context === "zones") {
        if (dggrs.zones && dggrs.zones.length > 0) {
          return new H3Adapter(dggrs.zones);
        } else {
        }
      } else if (dggrs.context === "bbox") {
        if (dggrs.bbox && dggrs.bbox.length > 0 && dggrs.resolution) {
        }
      } else if (dggrs.context === "parent") {
      }
    }
  }
}

export default DGGSView;
