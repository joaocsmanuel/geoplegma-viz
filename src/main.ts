// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
// import { createRenderer } from "../core/renderer/renderCells";
// import { Projections } from "../core/projections";
// import { cellToBoundary } from "h3-js";
// import earcut from "earcut"; // install via npm

// const canvas = document.querySelector("#my-canvas");
// console.log(canvas)
// const renderer = createRenderer(canvas);

// const projection = Projections["globe"];

// const cell = "80a5fffffffffff";
// const latlonPoly = cellToBoundary(cell, true);

// // Project to 3D (or flatten to 2D for now)
// const projected = latlonPoly.map(([lat, lon]) => {

//   return projection.forward(lat, lon);
// });
// console.log(projected)

// const flatXY = projected.map(([x, y]) => [x, y]).flat();
// // Flatten to Float32Array
// const indices = [];
// const tris =  new Uint16Array(earcut(flatXY)); // triangulate

// for (let i = 0; i < tris.length; i += 3) {
//   indices.push([tris[i], tris[i + 1], tris[i + 2]]);
// }

// // function animate() {
//   renderer.render([
//     {
//       vertices: projected,
//       indices,
//       color: [0.2, 0.8, 0.9, 1.0],
//       height: 0.02,
//     },
//   ]);// updates camera & draws
//   // requestAnimationFrame(animate);
// // }

// // animate();
// // setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
import DGGSView from "../core/dggs-view";
new DGGSView({
  dggrs: {
    id: "H3O-H3", // or 'healpix', 'dggal', etc.
    //   resolution: 5,
    // context: "zones", // zones, bbox, parent
    zones: [
      "812afffffffffff",
      "813bbffffffffff",
      "812a7ffffffffff",
      "814dbffffffffff",
      "813a3ffffffffff",
      "813abffffffffff",
      "814d3ffffffffff",
      "814d7ffffffffff",
      "814c3ffffffffff",
      "815efffffffffff",
      "813afffffffffff",
      "813a7ffffffffff",
      "813b7ffffffffff",
      "813b3ffffffffff",
      "812b7ffffffffff",
      "812a3ffffffffff",
      "811abffffffffff",
      "812b3ffffffffff",
      "81277ffffffffff",
      "812abffffffffff",
      "812bbffffffffff",
      "8144fffffffffff",
      "81267ffffffffff",

      "812afffffffffff",
      "813bbffffffffff",
      "812a7ffffffffff",
      "814dbffffffffff",
      "813a3ffffffffff",
      "813abffffffffff",
      "814d3ffffffffff",
      "814d7ffffffffff",
      "814c3ffffffffff",
      "815efffffffffff",
      "813afffffffffff",
      "813a7ffffffffff",
      "813b7ffffffffff",
      "813b3ffffffffff",
      "812b7ffffffffff",
      "812a3ffffffffff",
      "811abffffffffff",
      "812b3ffffffffff",
      "81277ffffffffff",
      "812abffffffffff",
      "812bbffffffffff",
      "8144fffffffffff",
      "81267ffffffffff",
    ], // Unique cell IDs
    //   getColor: (index) => [255, 100, 100],
    //   getElevation: (index) => 50,
    //   projection: "globe", // 'mercator', 'equal-area', etc.
    //   wireframe: boolean,
    //   opacity: number,
  },
});
