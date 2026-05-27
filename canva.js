const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const inputField = document.getElementById('verticesEArestasObj');
const width = 640
const height = 480

const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

import { criaObj, criaObjTransformado } from "./obj3d.js";

// Evento de abrir o menu do formulario. 
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && modal.style.display !== 'flex') {
        event.preventDefault(); 
        modal.style.display = 'flex';
        inputField.focus();
    }
});

// Aqui ele processa efetivamente o texto dos vértices. 
const processaDadosModal = (dados) =>{
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

// Processa nada, é um get do formulario. 
const processaFormulario = () =>{
    const dados = {
        m: document.getElementById('m').value,
        k: document.getElementById('k').value,
        s: document.getElementById('s').value,
        texto: document.getElementById('verticesEArestasObj').value,
    };
    return dados
}

// Fecha o modal sem fazer nada
cancelBtn.onclick = () => {
    modal.style.display = 'none';
    inputField.value = ''; // Limpa o campo
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

const limpaTela = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

const dadosObJ = () => {
    const dados = processaFormulario()
    if (dados.texto.trim() !== "") {
        var {vertices, arestas} = processaDadosModal(dados.texto)
        modal.style.display = 'none'; // Fecha após confirmar
        inputField.value = ''; // Limpa para a próxima
        return {
            vertices,
            arestas,
            dados
        }
    }else{
        alert("Preencha os campos")
    }
}

// Lógica principal: Captura o texto e fecha
confirmBtn.onclick = () => {
    limpaTela()
    document.getElementById("verticesEArestasFile").value = ""; // Limpa input file
    const dados = dadosObJ()
    criaObj(dados.vertices, dados.arestas, dados.dados.m, dados.dados.k, dados.dados.s, width, height)
};


// Translação no eixo X
window.addEventListener('keydown', (event) => {
    const dados = processaFormulario()
    if (event.key.toLowerCase === 'q') {
        limpaTela()
        obj = TREX(dados.vertices,-1)
        criaObjTransformado(obj, dados.arestas)
    }
    if(event.key.toLowerCase === 'w'){
        TREX(m,1)
    }
});

// Translação no eixo Y
window.addEventListener('keydown', (event) => {
    const dados = processaFormulario()
    if (event.key.toLowerCase === 'a') {
        TREY(m,1)
    }
    if(event.key.toLowerCase === 's'){
        TREY(m,-1)
    }
});

// Translação no eixo Z
window.addEventListener('keydown', (event) => {
    const dados = processaFormulario()
    if (event.key.toLowerCase === 'z') {
        TREZ(m,1)
    }
    if(event.key.toLowerCase === 'x'){
        TREZ(m,-1)
    }
});

// Fecha se clicar fora da caixa branca
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

export {canvas, ctx, limpaTela}