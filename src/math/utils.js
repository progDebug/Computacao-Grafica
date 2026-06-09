// Maneira mais simples de calcular o centro do obj
const centroObj = (verticesObj) => {
    let somaX = 0;
    let somaY = 0;
    let somaZ = 0;

    const totalPontos = verticesObj.length;

    for (let i = 0; i < totalPontos; i++) {
        somaX += verticesObj[i][0];
        somaY += verticesObj[i][1];
        somaZ += verticesObj[i][2];
    }

    return {
        x: somaX / totalPontos,
        y: somaY / totalPontos,
        z: somaZ / totalPontos
    };
}

export { centroObj };