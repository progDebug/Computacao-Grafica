import {linhaBres, setPixel} from "./rast.js"

// Função para calcular o centro do objeto. Método mais simples: Centroide. Média de todos os eixos. 
const centroObj = (verticesObj) => {
    let somaX = 0, somaY = 0, somaZ = 0;
    const totalPontos = verticesObj.length; 

    for (let i = 0; i < totalPontos; i++) {
        somaX += verticesObj[i][0]; // X do ponto i
        somaY += verticesObj[i][1]; // Y do ponto i
        somaZ += verticesObj[i][2]; // Z do ponto i
    }
    // Eu estava calculando errado por isso o obj ficava descentralizado.
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

const transformacaoLinearObj = (verticesObj, m, k, s, width, height) => {
    // (cx, cy, cz) = centro do objeto
    const {x,y,z} = centroObj(verticesObj)
    // pontos [x,y,z,m]
    verticesObj.forEach((linha) => {
        linha.push(m);
    });
    var Tobj = [ // Translada obj
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-1*(x), -1*(y), -1*(z), 1]
    ]
    
    const anguloRadianos = 45 * (Math.PI/180) // 45°, eu poderia colocar o usuario pra colocar ao angulo tambem.

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)
    // pontos [x,y,z,m]
    // k = 1 ou 0.5
    var Pcav = [ // Projeção cavaleira
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [-(k*cos), -(k*sen), 0, 0],
        [0, 0, 0, 1]
    ]
    var Rinv = [ // Inverte eixos
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, 1]
    ]
    var Scala = [
        [s, 0, 0, 0],
        [0, s, 0, 0],
        [0, 0, s, 0],
        [0, 0, 0, 1]
    ]
    var Ttela = [ // Translada pro centro da tela
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [width/2, height/2, 0, 1]
    ]
    var resultado = multiply(multiply(multiply(multiply(multiply(verticesObj, Tobj), Pcav), Rinv), Scala), Ttela)
    return resultado
}

// Auto explicativo, mas como recebe todos os mesmos dados de transformação linear acho que ficou redundante 
const criaObj = (verticesObj, arestasObj, m, k, s, w, h) => {
    var resultado = transformacaoLinearObj(verticesObj, m, k, s, w, h)
    for (let index = 0; index < arestasObj.length; index++) {
        var pontoA = resultado[arestasObj[index][0]]
        var pontoB = resultado[arestasObj[index][1]]
        linhaBres(Math.round(pontoA[0]), Math.round(pontoA[1]), Math.round(pontoB[0]), Math.round(pontoB[1]), 1)
    }  
}

export {criaObj, multiply}