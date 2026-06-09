import { multiply } from "../math/matrix.js";

const applyPipeline = (vertices, matrices) => {

    let resultado = vertices;

    for (const matrix of matrices) {
        resultado = multiply(resultado, matrix);
    }

    return resultado;
}

export { applyPipeline };