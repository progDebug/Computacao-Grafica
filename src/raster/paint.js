import { setPixel } from "./setPixel.js";

const paintFace =  (pixels, cor) => {
    var tabela = [];
    
    // 1. Preenchimento tabela
    for (var index = pixels.length - 1; index > 0; index--) {
        var ponto = pixels[index];
        var pontoAntes = pixels[index - 1];
        
        var dx = ponto[0] - pontoAntes[0];
        var dy = ponto[1] - pontoAntes[1];

        if (dy != 0) {
            var xYmin = (ponto[1] < pontoAntes[1]) ? ponto[0] : pontoAntes[0];
            tabela.push([
                index, 
                Math.min(ponto[1], pontoAntes[1]), 
                Math.max(ponto[1], pontoAntes[1]), 
                xYmin, 
                dx / dy // m
            ]);
        }

        // 2. Fechamento do polígono (último com o primeiro)
        if (index == 1) {
            var pUltimo = pixels[pixels.length - 1];
            var pPrimeiro = pixels[0];
            var dxF = pUltimo[0] - pPrimeiro[0];
            var dyF = pUltimo[1] - pPrimeiro[1];
            if (dyF != 0) {
                var xYminF = (pUltimo[1] < pPrimeiro[1]) ? pUltimo[0] : pPrimeiro[0];
                tabela.push([
                    pixels.length, 
                    Math.min(pUltimo[1], pPrimeiro[1]), Math.max(pUltimo[1], pPrimeiro[1]), xYminF, dxF / dyF
                ]);
            }
        }
    }

    var yMin = Math.min(...tabela.map(linha => linha[1]));
    var yMax = Math.max(...tabela.map(linha => linha[2]));

    // 3. Segundo passo do algoritmo
    for (let yVarredura = yMin; yVarredura <= yMax; yVarredura++) {
        let intersecoesNestaLinha = []

        for (let i = 0; i < tabela.length; i++) {
            var ylinhaMin = tabela[i][1]
            var ylinhaMax = tabela[i][2]

            // Verificação se a linha Y intercepta a aresta
            // Tirei do slide 
            if (yVarredura >= ylinhaMin && yVarredura < ylinhaMax) {
                // Equação da reta: X = mInv * (y - yMin) + xNoYMin
                // Tirei do slide tbm
                let xCalc = tabela[i][4] * (yVarredura - ylinhaMin) + tabela[i][3];
                intersecoesNestaLinha.push(xCalc)
            }
        }

        // 4. Ordenar as interseções de X para linha de varredura
        intersecoesNestaLinha.sort((a, b) => a - b)

        // Pintar os pixels entre os pares de interseções
        for (let i = 0; i < intersecoesNestaLinha.length; i += 2) {
            let xInicio = Math.ceil(intersecoesNestaLinha[i])
            let xFim = Math.floor(intersecoesNestaLinha[i + 1])
            
            for (let x = xInicio; x <= xFim; x++) {
                setPixel(x, yVarredura, cor)
            }
        }
    }
}

export { paintFace }
