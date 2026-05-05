const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const inputField = document.getElementById('inputData');

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

// Fecha o modal sem fazer nada
cancelBtn.onclick = () => {
    modal.style.display = 'none';
    inputField.value = ''; // Limpa o campo
};

// Lógica principal: Captura o texto e fecha
confirmBtn.onclick = () => {
    const dados = inputField.value;
    
    if (dados.trim() !== "") {
        console.log("Dados recebidos para processar o 3D:", dados);
        var {vertices, arestas} = processaDadosModal(dados)
        modal.style.display = 'none'; // Fecha após confirmar
        inputField.value = ''; // Limpa para a próxima

        criaObj(vertices, arestas)
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