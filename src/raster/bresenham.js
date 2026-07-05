import { setPixel } from "./setPixel.js";

const linhaBres = (xi, yi, xf, yf, color) => {
    let dx = Math.abs(xf - xi);
    let dy = Math.abs(yf - yi);
    let sx = (xi < xf) ? 1 : -1;
    let sy = (yi < yf) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        setPixel(xi, yi, color);

        if (xi === xf && yi === yf) {
            break;
        }

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            xi += sx;
        }

        if (e2 < dx) {
            err += dx;
            yi += sy;
        }
    }
}

export { linhaBres, setPixel };