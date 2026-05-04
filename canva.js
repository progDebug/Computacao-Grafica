const modal = document.getElementById('modalOverlay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const inputField = document.getElementById('inputData');

const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

import {geraPoligono} from "./poligono.js"

window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && modal.style.display !== 'flex') {
        event.preventDefault(); 
        modal.style.display = 'flex';
        inputField.focus();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        geraPoligono()
    }
});

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
        criarObj(dados)
        modal.style.display = 'none'; // Fecha após confirmar
        inputField.value = ''; // Limpa para a próxima
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