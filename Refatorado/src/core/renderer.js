import { linhaBres } from "../raster/bresenham.js";

const renderObject = (vertices, arestas) => {

    for (const [a, b] of arestas) {

        const p1 = vertices[a];
        const p2 = vertices[b];

        linhaBres(
            Math.round(p1[0]),
            Math.round(p1[1]),
            Math.round(p2[0]),
            Math.round(p2[1]),
            1
        );
    }
}

export { renderObject };