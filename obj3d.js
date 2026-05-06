import {linhaBres, setPixel} from "./rast.js"

/* 
Exemplo obj cubo: 
8
12
-100 100 100
100 100 100
100 -100 100
-100 -100 100
-100 100 -100
100 100 -100
100 -100 -100
-100 -100 -100
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



const centroObj = (verticesObj) =>{
    let somaX = 0, somaY = 0, somaZ = 0;
    const totalPontos = verticesObj.length / 3;

    for (let i = 0; i < verticesObj.length; i += 3) {
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

const multiply = (a, b) => {
    let aLinhas = a.length, aColunas = a[0].length,
        bLinhas = b.length, bColunas = b[0].length,
        resultado = new Array(aLinhas);

    if (aColunas !== bLinhas) {
        throw new Error("Colunas da Matriz A devem igualar Linhas da Matriz B");
    }

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

const transformacaoLinearObj = (verticesObj) => {
    // (cx, cy, cz) = centro do objeto
    const {x,y,z} = centroObj(verticesObj)
    // pontos [x,y,z,m]
    const m = 1
    verticesObj.forEach((linha) => {
        linha.push(m);
    });
    var Tobj = [ // Translada obj
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-1*(x), -1*(y), -1*(z), 1]
    ]
    
    const anguloRadianos = 45 * (Math.PI/180) // 45°

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)
    // pontos [x,y,z,m]
    // k = 1 ou 0.5
    var Pcav = [ // Projeção cavaleira
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [cos, sen, 0, 0],
        [0, 0, 0, 1]
    ]
    var Rinv = [ // Inverte eixos
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, 1]
    ]
    var Ttela = [ // Translada pro centro da tela
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [320, 240, 0, 1]
    ]
    var resultado = multiply(multiply(multiply(multiply(verticesObj, Tobj), Pcav), Rinv), Ttela)
    return resultado
    console.log("depois de tudo: " + verticesObj)

}

const criaObj = (verticesObj, arestasObj) => {
    var resultado = transformacaoLinearObj(verticesObj)
    console.log("chegou aqui")
    for (let index = 0; index < arestasObj.length; index++) {
        var pontoA = resultado[arestasObj[index][0]]
        var pontoB = resultado[arestasObj[index][1]]
        console.log("pontoA:" + pontoA,"PontoB: " + pontoB)
        linhaBres(Math.round(pontoA[0]), Math.round(pontoA[1]), Math.round(pontoB[0]), Math.round(pontoB[1]), 1)
    }  
}

export {criaObj}