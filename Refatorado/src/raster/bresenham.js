import { ctx } from "../core/canvas.js";

const setPixel = (posx, posy, color) => {
    switch (color) {
        case 1:
            ctx.fillStyle = "rgb(255, 255, 255)";
            break;
        case 2:
            ctx.fillStyle = "rgb(255, 0, 0)";
            break;
        case 3:
            ctx.fillStyle = "rgb(160, 32, 240)";
            break;
        case 4:
            ctx.fillStyle = "rgb(0, 0, 255)";
            break;
        case 5:
            ctx.fillStyle = "rgb(0, 255, 0)";
            break;
        default:
            ctx.fillStyle = "rgb(255, 255, 0)";
            break;
    }

    ctx.fillRect(posx, posy, 1, 1);
}

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