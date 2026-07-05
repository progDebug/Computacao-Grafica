import { ctx } from "../core/canvas.js";

const setPixel = (posx, posy, color) => {
    ctx.fillStyle = "rgb("+ color +")";
    ctx.fillRect(posx, posy, 1, 1);
}

// ctx.fillStyle = "rgb(255, 0, 0)";

export { setPixel }