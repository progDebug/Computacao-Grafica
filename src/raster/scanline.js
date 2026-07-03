import { ctx } from "../core/canvas.js";

const setPixel = (posx, posy, color) => {
    const r = Math.round(color[0] * 255);
    const g = Math.round(color[1] * 255);
    const b = Math.round(color[2] * 255);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(posx, posy, 1, 1);
};

const fillPolygon = (vertices, cor) => {
    if (vertices.length < 3) return;

    let yMin = Infinity, yMax = -Infinity;
    const edges = [];

    for (let i = 0; i < vertices.length; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 1) % vertices.length];
        
        if (p1[1] > p2[1]) {
            vertices[i] = p2;
            vertices[(i + 1) % vertices.length] = p1;
        }
    }

    for (let i = 0; i < vertices.length; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 1) % vertices.length];
        
        if (p1[1] !== p2[1]) {
            const edgeYMin = Math.min(p1[1], p2[1]);
            const edgeYMax = Math.max(p1[1], p2[1]);

            edges.push({
                yMin: edgeYMin,
                yMax: edgeYMax,
                xIntersection: [p1[0], p2[0]],
                yValues: [p1[1], p2[1]]
            });

            if (edgeYMin < yMin) yMin = edgeYMin;
            if (edgeYMax > yMax) yMax = edgeYMax;
        }
    }

    for (let y = Math.floor(yMin); y <= Math.floor(yMax); y++) {
        const intersections = [];
        
        for (const edge of edges) {
            if (y >= edge.yMin && y < edge.yMax) {
                const y1 = edge.yValues[0];
                const y2 = edge.yValues[1];
                const x1 = edge.xIntersection[0];
                const x2 = edge.xIntersection[1];
                
                const x = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
                intersections.push(x);
            }
        }
        
        intersections.sort((a, b) => a - b);
        
        for (let i = 0; i < intersections.length; i += 2) {
            if (i + 1 < intersections.length) {
                const xStart = Math.ceil(intersections[i]);
                const xEnd = Math.floor(intersections[i + 1]);
                
                for (let x = xStart; x <= xEnd; x++) {
                    setPixel(x, y, cor);
                }
            }
        }
    }
};

export { fillPolygon, setPixel };