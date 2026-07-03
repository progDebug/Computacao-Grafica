
const multiply = (a, b) => {
    let aLinhas = a.length;
    let aColunas = a[0].length;
    let bLinhas = b.length;
    let bColunas = b[0].length;

    if (aColunas !== bLinhas) {
        throw new Error("Colunas da Matriz A devem igualar Linhas da Matriz B");
    }

    let resultado = new Array(aLinhas);

    for (let i = 0; i < aLinhas; i++) {
        resultado[i] = new Array(bColunas);

        for (let j = 0; j < bColunas; j++) {
            resultado[i][j] = 0;

            for (let k = 0; k < aColunas; k++) {
                resultado[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return resultado;
}

export { multiply };