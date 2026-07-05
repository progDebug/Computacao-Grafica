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
import { renderFace } from "./core/renderFace.js";
import { paintFace } from "./raster/paint.js";
import { getZMedio } from "./math/getZMedio.js";

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
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
                                    Q - W Move o objeto para esquerda e direita
                                    A - S Move o objeto para baixo e cima
                                    Z - X Move o objeto pra trás e frente
                                    E Diminui a escala no eixo X
                                    R Aumenta a escala no eixo X
                                    D Diminui a escala no eixo Y
                                    F Aumenta a escala no eixo Y
                                    C Diminui a escala no eixo Z
                                    V Aumenta a escala no eixo Z
                                    T - Y rotaciona no eixo X
                                    G - H rotaciona no eixo y
                                    B - N rotaciona no eixo Z
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


const transform = (object) => {
    
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

    const Ttela = translationMatrix(
        width / 2,
        height / 2,
        0
    );

    const screenVertices = applyPipeline(
        projected,
        [Rinv, Ttela]
    );

    
    let faces = [];
    object.faces.forEach(subArray => {
        let face = {
            arestas: [], 
            cor: [],
            zMedio: []
        };
        let fa = [];
        subArray.arestas.forEach(element => {
            face['arestas'].push(screenVertices[element-1])
            fa.push(transformed[element-1])
        });
        face['cor'] = subArray.cor
        face['zMedio'] = getZMedio(fa)
        faces.push(face)
    });
    return faces
};

const redraw = async () => {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    let facesToDraw = [];

    for (const object of objectsScene) {
        const faces = transform(object);
        for (const face of faces) facesToDraw.push(face);
    }
    facesToDraw.sort((a, b) => b.zMedio - a.zMedio)
//    facesToDraw.map((value) => renderFace(value));
    for (const face of facesToDraw) renderFace(face);
    facesToDraw = [];
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
    if (event.key != 'Enter') redraw();
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
