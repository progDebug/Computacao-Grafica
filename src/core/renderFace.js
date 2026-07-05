import { paintFace } from "../raster/paint.js"
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function renderFace(face) {
    const cor = []
    face.cor.forEach(value => {
        cor.push((value * 255) + '')
    });
    const c = cor.join(" ")
    paintFace(face.arestas, c)
}

export { renderFace }