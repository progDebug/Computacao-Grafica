import { linhaBres } from "../raster/bresenham.js";

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

export { renderObject };