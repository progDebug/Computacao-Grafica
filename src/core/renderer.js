import { linhaBres } from "../raster/bresenham.js";
import { fillPolygon } from "../raster/scanline.js";

const renderObject = (vertices, arestas, cor) => {
    for (const [a, b] of arestas) {

        const p1 = vertices[a-1];
        const p2 = vertices[b-1];

        linhaBres(
            Math.round(p1[0]),
            Math.round(p1[1]),
            Math.round(p2[0]),
            Math.round(p2[1]),
            cor
        );
    }
}

const renderFace = (vertices, face, cor) => {
    const faceVertices = face.arestas.map(idx => vertices[Math.floor(idx) - 1]);
    fillPolygon(faceVertices, cor);
};

export { renderObject, renderFace };