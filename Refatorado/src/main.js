import { canvas, ctx } from "./core/canvas.js";

import { parseObjData } from "./objects/loader.js";

import { Object3D } from "./objects/object3d.js";

import { renderObject } from "./core/renderer.js";

import { cavalierProjection, 
    cabinetProjection, 
    isometricProjection, 
    vanishingPointZ, 
    orthographicProjection} from "./transforms/projection.js";

import {perspectiveDivide} from "./transforms/perspectiveDivide.js"

import { applyPipeline } from "./transforms/transformPipeline.js";

import { translationMatrix } from "./transforms/translation.js";

import { rotationY } from "./transforms/rotation.js";

// ==========================
// Variaveis Globais
// ==========================

const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const inputField = document.getElementById('verticesEArestasObj');
const width = canvas.width;
const height = canvas.height;
let currentObject = null;
const projectionConfig = {
    type: "cavaleira",
    k: 0.5,
    angle: 45
}; // padrão da projeção 
const projections = [
    "cavaleira",
    "cabinet",
    "isometrica",
    "pontoFugaZ", 
    "pontoFugaZX"
];
let currentIndex = 0;
// ==========================
// Abre modal
// ==========================

window.addEventListener('keydown', (event) => {

    if (
        event.key === 'Enter' &&
        modal.style.display !== 'flex'
    ) {

        event.preventDefault();

        modal.style.display = 'flex';

        inputField.focus();
    }

    if(event.key == 'F2') alert(`Controles do Objeto 3D
                                    Tecla | Ação
                                    Q Move o objeto no eixo X negativo (esquerda)
                                    W Move o objeto no eixo X positivo (direita)
                                    A Move o objeto no eixo Y negativo (baixo)
                                    S Move o objeto no eixo Y positivo (cima)
                                    Z Move o objeto no eixo Z negativo (trás)
                                    X Move o objeto no eixo Z positivo (frente)
                                    E Diminui a escala no eixo X
                                    R Aumenta a escala no eixo X
                                    D Diminui a escala no eixo Y
                                    F Aumenta a escala no eixo Y
                                    C Diminui a escala no eixo Z
                                    V Aumenta a escala no eixo Z
                                    T Rotaciona negativamente no eixo X
                                    Y Rotaciona positivamente no eixo X
                                    G Rotaciona negativamente no eixo Y
                                    H Rotaciona positivamente no eixo Y
                                    B Rotaciona negativamente no eixo Z
                                    N Rotaciona negativamente no eixo Z
                                    P troca de projeção
                                    `)
});

// ==========================
// Fecha modal
// ==========================

// Fecha se clicar fora da caixa branca
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// ==========================
// Config do objeto
// ==========================

const getProjectionMatrix = () => {

    switch (projectionConfig.type) {

        case "cavaleira":

            return cavalierProjection(
                projectionConfig.k,
                projectionConfig.angle
            );

        case "cabinet":

            return cabinetProjection(
                projectionConfig.k,
                projectionConfig.angle
            );

        case "isometrica":
            return isometricProjection(
                projectionConfig.angle
            );
        
        case "pontoFugaZ":
            return vanishingPointZ(500); // Valor arbitrario bom de acordo com meu width de acordo com o google
        
        case "pontoFugaZX":
            return vanishingPointZ(500); // Valor arbitrario bom de acordo com meu width de acordo com o google
    }
}


// ==========================
// Renderização principal
// ==========================

const redraw = () => {

    if (!currentObject) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    ); // apagar o canva

    // vertices transformado
    const transformed =
        currentObject.getTransformedVertices();
        
    const transformedZX = // Fiz isso para não salvar a rotação nas outras transformações
        applyPipeline(  
            transformed,
            [
                rotationY(45)
            ]
        )
    projectionConfig.k = document.getElementById('k').value
    // select da projeção
    const projection = getProjectionMatrix();
    
//    const projected =
//    applyPipeline(
//        transformed,
//        [projection]
//    );
 
    const projected =
        projectionConfig.type === 'pontoFugaZ' || projectionConfig.type === 'pontoFugaZX'
            ? projectionConfig.type == 'pontoFugaZ' 
                ? perspectiveDivide(
                    applyPipeline(
                        transformed,
                        [projection]
                    )
                )
                : perspectiveDivide(
                    applyPipeline(
                        transformedZX,
                        [projection]
                    )
                )
            : applyPipeline(
                transformed,
                [projection]
            );    


    // inverter eixo Y
    const Rinv = [
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    // centralizar tela
    const Ttela =
        translationMatrix(
            width / 2,
            height / 2,
            0
        );

    const screenVertices =
        applyPipeline(
            projected,
            [
                Rinv,
                Ttela
            ]
        );
    renderObject(
        screenVertices,
        currentObject.arestas
    );
};

// ==========================
// Criação do objeto
// ==========================

confirmBtn.onclick = () => {

    const dados = {
        m: parseInt(document.getElementById('m').value),
        k: parseInt(document.getElementById('k').value),
        s: parseInt(document.getElementById('s').value),
        text: document.getElementById('verticesEArestasObj').value,
    };

    if (dados.text.trim() === "") {
        alert("Preencha os dados");
        return;
    }

    const {
        vertices,
        arestas
    } = parseObjData(dados.text);

    currentObject =
        new Object3D(
            vertices,
            arestas
        ); 
    // escala inicial
    currentObject.setScale(
        dados.s,
        dados.s,
        dados.s
    );

    redraw();

    modal.style.display = 'none';
};

// Captura texto do arquivo
document.addEventListener("DOMContentLoaded", () => { // Vê se o html foi carregado antes do javascript
    const input = document.getElementById("verticesEArestasFile");
    const textarea = document.getElementById("verticesEArestasObj");

    input.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) {
            console.log("Nenhum arquivo selecionado");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            textarea.value = e.target.result;
        };

        reader.onerror = function () {
            console.error("Erro ao ler o arquivo");
        };

        reader.readAsText(file);
    });
});



// ==========================
// CONTROLES
// ==========================

window.addEventListener('keydown', (e) => {

    if (!currentObject) return;

    switch (e.key) {
        case 'q':
            currentObject.translate(
                -1,
                0,
                0
            );
            break;    
        case 'w':
            currentObject.translate(
                1,
                0,
                0
            );
            break;
        case 'e':
            currentObject.scale.x -=1
            break; 
        case 'r':
            currentObject.scale.x +=1
            break; 
        case 'a':
            currentObject.translate(
                0,
                -1,
                0
            );
            break;    
        case 's':
            currentObject.translate(
                0,
                1,
                0
            );
            break;
        case 'd':
            console.log(currentObject)
            currentObject.scale.y -=1
            console.log(currentObject)
            break;
        case 'f':
            console.log(currentObject)
            currentObject.scale.y +=1
            console.log(currentObject)
            break;  
        case 'z':
            currentObject.translate(
                0,
                0,
                -1
            );
            break;  
        case 'x':
            currentObject.translate(
                0,
                0,
                1
            );
            break;
        case 'c':
            currentObject.scale.z -=1
            break; 
        case 'v':
            currentObject.scale.z +=1
            break;    
        case 't':
            currentObject.rotate(
                -1,
                0,
                0
            );
            break; 
        case 'y':
            currentObject.rotate(
                1,
                0,
                0
            );
            break; 
        case 'g':
            currentObject.rotate(
                0,
                -1,
                0
            );
            break;
        case 'h':
            currentObject.rotate(
                0,
                1,
                0
            );
            break;
        case 'b':
            currentObject.rotate(
                0,
                0,
                -1
            );
            break;  
        case 'n':
            currentObject.rotate(
                0,
                0,
                1
            );
            break;  
        case 'p':
            currentIndex++;
            currentIndex >= 5 ? currentIndex = 0 : currentIndex;
            projectionConfig.type = projections[currentIndex];
            document.getElementById("type-projection").innerText = 'Projeção: ' + projectionConfig.type
            break;     
    }
    redraw();
});
