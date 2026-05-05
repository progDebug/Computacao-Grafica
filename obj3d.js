import {setPixel, linhaBres} from "./rast.js"


/* 
Exemplo obj cubo: 
8
12
-1 1 1
1 1 1
1 -1 1
-1 -1 1
-1 1 -1
1 1 -1
1 -1 -1
-1 -1 -1
0 1
1 2
2 3
3 0
4 5
5 6
6 7
7 4
0 4
1 5
2 6
3 7
*/


const processaDados = (dados) =>{
    const linhas = dados.trim().split(/\r?\n/)
    const a = parseInt(linhas[0]);
    const b = parseInt(linhas[1]);
    const strParaNumeros = (linha) => linha.trim().split(/\s+/).map(Number);
    const matrizA = linhas.slice(2, a + 2).map(strParaNumeros);
    const matrizB = linhas.slice(a + 2).map(strParaNumeros);

    return {
        vertices: matrizA,
        arestas: matrizB
    }
}

const centroObj = (verticesObj) =>{
    let somaX = 0, somaY = 0, somaZ = 0;
    const totalPontos = vertices.length / 3;

    for (let i = 0; i < vertices.length; i += 3) {
        somaX += vertices[i][0];
        somaY += vertices[i][1];
        somaZ += vertices[i][2];
    }

    return {
        x: somaX / totalPontos,
        y: somaY / totalPontos,
        z: somaZ / totalPontos
    };  
}