import reglInit from "regl";
import createCamera from "canvas-orbit-camera";
import { mat4 } from "gl-matrix";

export function createRenderer(canvas: HTMLCanvasElement) {
  const regl = reglInit({
    canvas,
  });
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
      height: regl.prop("height"),
    },

    vert: `
      precision mediump float;
      attribute vec3 position;
      uniform mat4 model, view, projection;
      uniform float height;
      varying vec3 vNormal;

      void main () {
        vec3 normal = normalize(position);
        vec3 extruded = position + normal * height;

        vNormal = normal;
        gl_Position = projection * view * model * vec4(extruded, 1.0);
      }
    `,

    frag: `
      precision mediump float;
      uniform vec4 color;

      varying vec3 vNormal;
      void main () {
      vec3 lightDir = normalize(vec3(1.0, 1.0, 0.8)); 
      float lighting = max(dot(vNormal, lightDir), 0.0);
      gl_FragColor = vec4(color.rgb * lighting, color.a);
      }
    `,
  });
  
  let time = 0;
  return {
    render(cells) {
      regl.frame(() => {
        const aspect = canvas.width / canvas.height;
        mat4.perspective(projMat, Math.PI / 4, aspect, 0.01, 100);

        regl.clear({ color: [0.2, 0.8, 0.9, 1], depth: 1 });
        camera.tick(); // update camera from user input

        // time += 0.016;
        // const dynamicHeight = 0.05 + 0.02 * Math.sin(time * 2);
        for (const cell of cells) {
          // const positionBuffer = regl.buffer(cell.vertices); // [[x, y], ...]
          // const indexBuffer = regl.elements(cell.indices); // [[i1, i2, i3], ...]
          // console.log(positionBuffer);

          drawCells({
            positions: cell.vertices,
            cells: cell.indices,
            color: cell.color,
            height: 0.05,
          });
        }
      });
    },
  };
}
