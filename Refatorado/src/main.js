import { canvas, ctx } from "./core/canvas.js";

import { parseObjData } from "./objects/loader.js";

import { Object3D } from "./objects/object3d.js";

import { renderObject } from "./core/renderer.js";

import { cavalierProjection, 
    cabinetProjection, 
    isometricProjection, 
    vanishingPointZ, 
    vanishingPointZX, 
    orthographicProjection} from "./transforms/projection.js";

import { applyPipeline } from "./transforms/transformPipeline.js";

import { translationMatrix } from "./transforms/translation.js";

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
                                    Q | Move o objeto no eixo X negativo (esquerda)
                                    W | Move o objeto no eixo X positivo (direita)
                                    A | Move o objeto no eixo Y negativo (baixo)
                                    S | Move o objeto no eixo Y positivo (cima)
                                    Z | Move o objeto no eixo Z negativo
                                    X | Move o objeto no eixo Z positivo
                                    E | Diminui a escala no eixo X
                                    R | Aumenta a escala no eixo X
                                    D | Diminui a escala no eixo Y
                                    F | Aumenta a escala no eixo Y
                                    C | Diminui a escala no eixo Z
                                    V | Aumenta a escala no eixo Z
                                    T | Rotaciona negativamente no eixo X
                                    Y | Rotaciona positivamente no eixo X
                                    G | Rotaciona negativamente no eixo Y
                                    H | Rotaciona positivamente no eixo Y
                                    B | Rotaciona negativamente no eixo Z
                                    N | Rotaciona negativamente no eixo Z`)
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
            return vanishingPointZ(550); 
            // Valor arbitrario bom de acordo com meu width de acordo com o google
        
        case "pontoFugaZX":
            return vanishingPointZX(1500, 550);
            // Valor arbitrario bom de acordo com meu width de acordo com o google
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

    // vertices transformados
    const transformed = currentObject.getTransformedVertices();
    console.log(projectionConfig.type)
    
    projectionConfig.k = document.getElementById('k').value
    // select da projeção
    const projection = getProjectionMatrix();

    const projected =
        applyPipeline(
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
        console.log(screenVertices)
//    if (projectionConfig.type == 'pontoFugaZ' || projectionConfig.type == 'pontoFugaZX'){
//        let aLinhas = screenVertices.length;
//        let aColunas = screenVertices[0].length;
//        let resultado = new Array(aLinhas);
//
//        for (let i = 0; i < aLinhas; i++) {
//            resultado[i] = new Array(aColunas);
//            for (let k = 0; k < aColunas; k++) {
//                if (k == 0 || k == 1) {
//                    resultado[i][k] = resultado[i][k]*550/screenVertices[i][2]
//                    console.log(screenVertices)
//                }
//            }
//        }
//        renderObject(
//            resultado,
//            currentObject.arestas
//        )
//
//    } else{
    renderObject(
        screenVertices,
        currentObject.arestas
    );
//    }

};

// ==========================
// Criação do objeto
// ==========================

confirmBtn.onclick = () => {

    const texto =
        document
        .getElementById(
            'verticesEArestasObj'
        )
        .value;

    if (texto.trim() === "") {

        alert("Preencha os dados");

        return;
    }

    const {
        vertices,
        arestas
    } = parseObjData(texto);

    currentObject =
        new Object3D(
            vertices,
            arestas
        );
    const sInitial = document.getElementById('s').value 
    // escala inicial
    currentObject.setScale(
        sInitial,
        sInitial,
        sInitial
    );

    redraw();

    modal.style.display = 'none';
};


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
            currentObject.scale.y -=1
            break;
        case 'f':
            currentObject.scale.y +=1
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
            console.log(currentIndex)
            projectionConfig.type = projections[currentIndex];

            break;     
    }

    redraw();
});
