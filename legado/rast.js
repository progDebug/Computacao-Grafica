import {canvas, ctx} from "./canva.js"
const setPixel = (posx, posy, color) => {
    switch (color) {
        case 1:
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(posx, posy, 1, 1)
            break;
        case 2:
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(posx, posy, 1, 1)                    
            break;
        case 3:
            ctx.fillStyle = "rgb(160, 32, 240)";
            ctx.fillRect(posx, posy, 1, 1)                    
            break; 
        case 4:
            ctx.fillStyle = "rgb(0, 0, 255)";
            ctx.fillRect(posx, posy, 1, 1)
            break;
        case 5:
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.fillRect(posx, posy, 1, 1)
            break;                  
        default:
            ctx.fillStyle = "rgb(255, 255, 0)";
            ctx.fillRect(posx, posy, 1, 1)
            break;
    }
}

// Parametros das cores
//- Branco:   0
//- Vermelho: 1
//- Roxo:     2
//- Azul:     3
//- Verde:    4
//- Amarelo:  5

// Pontos no formato [[x,y],[x2,y2]]
// Desenha as bordas do poligono

const linhaBres = (xi, yi, xf, yf, color) =>{
    var dx = Math.abs(xf - xi)
    var dy = Math.abs(yf - yi)
    var sx = (xi < xf) ? 1:-1
    var sy = (yi < yf) ? 1:-1
    var err = dx - dy

    while (true) {
        setPixel(xi,yi,color)
        if (xi == xf && yi == yf) {
            break;
        }
        var e2 = 2*err
        if (e2>-dy) {
            err -= dy
            xi += sx
        }
        if(e2<dx) {
            err+=dx
            yi+=sy
        }
    }
}

export {linhaBres, setPixel};