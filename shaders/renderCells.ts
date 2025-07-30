import reglInit from "regl";
import createCamera from "canvas-orbit-camera";
import { mat4 } from "gl-matrix";

export function createRenderer(canvas: HTMLCanvasElement) {
  const regl = reglInit({ canvas });
 const camera = createCamera(canvas);
  camera.distance = 3;
console.log("Camera initialized:", camera);

  const projMat = mat4.create();

  const drawCells = regl({
    attributes: {
      position: regl.prop("positions"),
    },
    elements: regl.prop("cells"),

    uniforms: {
      color: regl.prop("color"),
      model: (_, props) => props.model || mat4.create(),
      view: () => camera.view(),
      projection: () => projMat,
    },

    vert: `
      precision mediump float;
      attribute vec3 position;
      uniform mat4 model, view, projection;
      void main () {
        gl_Position = projection * view * model * vec4(position, 1.0);
      }
    `,

    frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }
    `,
  });

  return {
    render(cells) {
      camera.tick(); // update camera from user input

      console.log(cells);
      const aspect = canvas.width / canvas.height;
      mat4.perspective(projMat, Math.PI / 4, aspect, 0.01, 100);

      regl.clear({ color: [0.1, 0.1, 0.1, 1], depth: 1 });

      for (const cell of cells) {
        const positionBuffer = regl.buffer(cell.vertices); // [[x, y], ...]
        const indexBuffer = regl.elements(cell.indices); // [[i1, i2, i3], ...]
        console.log(positionBuffer);

        drawCells({
          positions: cell.vertices,
          cells: cell.indices,
          color: cell.color,
        });
      }
    },
  };
}
