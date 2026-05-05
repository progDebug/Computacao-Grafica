import {linhaBres, setPixel} from "./rast.js"

/* 
Exemplo obj cubo: 
8
12
-20 20 20
20 20 20
20 -20 20
-20 -20 20
-20 20 -20
20 20 -20
20 -20 -20
-20 -20 -20
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
        x: Math.round(somaX / totalPontos),
        y: Math.round(somaY / totalPontos),
        z: Math.round(somaZ / totalPontos)
    };  
}

function multiply(vector, matrix) {
    const numCols = matrix[0].length;

    return Array(numCols).fill(0).map((_, colIndex) => {

      return vector.reduce((sum, value, rowIndex) => {
        return sum + (value * matrix[rowIndex][colIndex]);
      }, 0);
    });
    
}

const transformacaoLinearObj = (verticesObj) => {
    // (cx, cy, cz) = centro do objeto
    const {x,y,z} = centroObj(verticesObj)

    var Tobj = [ // Translada obj
        [1, 0 , 0, -1*(x)],
        [0, 1, 0, -1*(y)],
        [0, 0, 1, -1*(z)],
        [0, 0, 0, 1]
    ]
    verticesObj.forEach((linha) => {
        linha.push(1);
    });

    console.log("vertices: "+ verticesObj)
    for (let index = 0; index < verticesObj.length; index++) {
        verticesObj[index] = multiply(verticesObj[index], Tobj)
    }
    const anguloRadianos = 45 * (Math.PI/180) // 45°

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)

    var Pcav = [ // Projeção cavaleira
        [1, 0, Math.round(cos), 0],
        [0, 1, Math.round(sen), 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ]

    for (let index = 0; index < verticesObj.length; index++) {
        verticesObj[index] = multiply(verticesObj[index], Pcav)
    }   
    
    var Rinv = [ // Inverte eixos
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, 1]
    ]
    for (let index = 0; index < verticesObj.length; index++) {
        verticesObj[index] = multiply(verticesObj[index], Rinv)
    }

    var Ttela = [ // Translada pro centro da tela
        [1, 0, 0, 320],
        [0, 1, 0, 240],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]

    for (let index = 0; index < verticesObj.length; index++) {
        verticesObj[index] = multiply(verticesObj[index], Ttela)
    }
    console.log("depois de tudo: " + verticesObj)

}

const criaObj = (verticesObj, arestasObj) => {
    transformacaoLinearObj(verticesObj)
    for (let index = 0; index < arestasObj.length; index++) {
        var pontoA = verticesObj[arestasObj[index][0]]
        var pontoB = verticesObj[arestasObj[index][1]]
        linhaBres(pontoA[0], pontoA[1], pontoB[0], pontoB[1], 1)
    }  
}

export {criaObj}