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
import { createRenderer } from "../core/renderer/renderCells";
import { Projections } from "../core/projections";
import { cellToBoundary } from "h3-js";
import earcut from "earcut"; // install via npm

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
new DGGSView();
