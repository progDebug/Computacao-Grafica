const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const inputField = document.getElementById('verticesEArestasObj');
const width = 640
const height = 480

const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

import { criaObj } from "./obj3d.js";

window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && modal.style.display !== 'flex') {
        event.preventDefault(); 
        modal.style.display = 'flex';
        inputField.focus();
    }
});


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

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("verticesEArestasFile");
    const textarea = document.getElementById("verticesEArestasObj");

    input.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) {
            console.log("Nenhum arquivo selecionado");
            return;
        }

        console.log("Arquivo:", file.name);

        const reader = new FileReader();

        reader.onload = function (e) {
            console.log("Conteúdo carregado");
            textarea.value = e.target.result;
        };

        reader.onerror = function () {
            console.error("Erro ao ler o arquivo");
        };

        reader.readAsText(file);
    });
});

// Lógica principal: Captura o texto e fecha
confirmBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa tela
    document.getElementById("verticesEArestasFile").value = ""; // Limpa input file
    const dados = processaFormulario()
    
    if (dados.texto.trim() !== "") {
        var {vertices, arestas} = processaDadosModal(dados.texto)
        modal.style.display = 'none'; // Fecha após confirmar
        inputField.value = ''; // Limpa para a próxima
    criaObj(vertices, arestas, dados.m, dados.k, dados.s, width, height)
    } else {
        alert("Por favor, preencha o campo!");
    }

};

// Fecha se clicar fora da caixa branca
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

export {canvas, ctx}