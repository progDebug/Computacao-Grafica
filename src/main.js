import { canvas, ctx } from "./core/canvas.js";

import { parseObjData, UNIVERSE } from "./objects/loader.js";

import { Object3D, Object3DMesh } from "./objects/object3d.js";

import { renderObject } from "./core/renderer.js";

import { cavalierProjection, 
    cabinetProjection, 
    isometricProjection, 
    vanishingPointZ
    } from "./transforms/projection.js";

import { perspectiveDivide } from "./transforms/perspectiveDivide.js"

import { applyPipeline } from "./transforms/transformPipeline.js";

import { translationMatrix } from "./transforms/translation.js";

import { rotationY } from "./transforms/rotation.js";

import { loadTextInputFile, standartFile } from "./data/reader.js"

// ==========================
// Variaveis Globais
// ==========================

const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const inputField = document.getElementById('verticesEArestasObj');
const width = canvas.width;
const height = canvas.height;
let objectsScene = [];
let currentObject = null;
let indexCurrentObj = 0;
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


const drawObject = (object) => {
    
    const transformed = object.getTransformedVertices();

    const transformedZX = applyPipeline(
        transformed,
        [rotationY(45)]
    );

    const projection = getProjectionMatrix();

    const projected =
        projectionConfig.type === 'pontoFugaZ' || projectionConfig.type === 'pontoFugaZX'
            ? projectionConfig.type === 'pontoFugaZ'
                ? perspectiveDivide(applyPipeline(transformed, [projection]))
                : perspectiveDivide(applyPipeline(transformedZX, [projection]))
            : applyPipeline(transformed, [projection]);

    const Rinv = [
        [1, 0, 0, 0],
        [0, -1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    // const pTela = width/height; // Proporção da tela                  
    // UNIVERSE[0] = UNIVERSE[0] * pTela;
    // UNIVERSE[1] = UNIVERSE[1] * pTela;
    // UNIVERSE[2] = UNIVERSE[2] * pTela;
    // UNIVERSE[3] = UNIVERSE[3] * pTela;
//    UNIVERSE.map((value)=>{return value*pTela})

    // const [screenX, screenY] = [width / (UNIVERSE[1] - UNIVERSE[0]), 
    //                             height / (UNIVERSE[3] - UNIVERSE[2])]    
    // const [tx, ty] = [(-(UNIVERSE[0])*width) / (UNIVERSE[1] - UNIVERSE[0]),
    //                   (-(UNIVERSE[2]*height)) / (UNIVERSE[3] - UNIVERSE[2])]

    // const tTela = [
    //     [screenX, 0, 0, 0],
    //     [0, screenY, 0, 0],
    //     [0, 0, 1, 0],
    //     [tx, ty, 0, 1]
    // ]

    const Ttela = translationMatrix(
        width / 2,
        height / 2,
        0
    );

    const screenVertices = applyPipeline(
        projected,
        [Rinv, Ttela]
    );

    if (object == currentObject){
        renderObject(
            screenVertices,
            object.arestas,
            2
        );        
        return
    }

    renderObject(
        screenVertices,
        object.arestas,
        1
    );
};

const redraw = () => {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (const object of objectsScene) {
        drawObject(object);
    }
};

// ==========================
// Criação do objeto
// ==========================

confirmBtn.onclick = () => {

    const dados = {
        text: document.getElementById('verticesEArestasObj').value,
    };

    if (dados.text.trim() === "") {
        alert("Preencha os dados");
        return;
    }

    const objects = parseObjData(dados.text);

    for (const object of objects) objectsScene.push(object);

    const universo = UNIVERSE

    currentObject = objectsScene[indexCurrentObj];

    redraw();

    modal.style.display = 'none';
};

// Captura texto do arquivo
document.addEventListener("DOMContentLoaded", () => { // Vê se o html foi carregado antes do javascript
    const input = document.getElementById("verticesEArestasFile");
    const textarea = document.getElementById("verticesEArestasObj");
    const statusFile = document.getElementById("p-status-arquivo")

    loadTextInputFile(input, textarea);
    standartFile(statusFile, textarea, input);
});


// ==========================
// CONTROLES DA TAREFA 6
// ==========================

const keysPressed = new Set();

window.addEventListener('keydown', (event) => {
    keysPressed.add(event.key.toLowerCase());

    if (event.key === "Tab") {
        event.preventDefault();

        if (event.shiftKey) {

            indexCurrentObj === 0
                ? indexCurrentObj = objectsScene.length - 1
                : indexCurrentObj -= 1;

        } else {

            indexCurrentObj === objectsScene.length - 1
                ? indexCurrentObj = 0
                : indexCurrentObj += 1;

        }

        currentObject = objectsScene[indexCurrentObj];
    }
    redraw();
});

window.addEventListener("keyup", (event) => {
    keysPressed.delete(event.key.toLowerCase());
});

// ==========================
// CONTROLES
// ==========================

window.addEventListener('keydown', (e) => {

    if (!currentObject) return;

    switch (e.key) {
        case 'q':
            currentObject.translate(-1,0,0);
            console.log(currentObject)
            break;    
        case 'w':
            currentObject.translate(1,0,0);
            break;
        case 'e':
            currentObject.scale.x -=1
            break; 
        case 'r':
            currentObject.scale.x +=1
            break; 
        case 'a':
            currentObject.translate(0,-1,0);
            break;    
        case 's':
            currentObject.translate(0,1,0);
            break;
        case 'd':
            currentObject.scale.y -=1
            break;
        case 'f':
            currentObject.scale.y +=1
            break;  
        case 'z':
            currentObject.translate(0,0,-1);
            break;  
        case 'x':
            currentObject.translate(0,0,1);
            break;
        case 'c':
            currentObject.scale.z -=1
            break; 
        case 'v':
            currentObject.scale.z +=1
            break;    
        case 't':
            currentObject.rotate(-1,0,0);
            break; 
        case 'y':
            currentObject.rotate(1,0,0);
            break; 
        case 'g':
            currentObject.rotate(0,-1,0);
            break;
        case 'h':
            currentObject.rotate(0,1,0);
            break;
        case 'b':
            currentObject.rotate(0,0,-1);
            break;  
        case 'n':
            currentObject.rotate(0,0,1);
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
