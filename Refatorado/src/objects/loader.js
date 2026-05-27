const parseObjData = (dados) => {

    const linhas = dados.trim().split(/\r?\n/);

    const totalVertices = parseInt(linhas[0]);
    const totalArestas = parseInt(linhas[1]);

    const strParaNumeros = (linha) => {
        return linha.trim().split(/\s+/).map(Number);
    }

    const vertices = linhas
        .slice(2, totalVertices + 2)
        .map(strParaNumeros);

    const arestas = linhas
        .slice(totalVertices + 2)
        .map(strParaNumeros);

    return {
        vertices,
        arestas
    };
}

export { parseObjData };