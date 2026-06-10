function loadTextInputFile(input, textarea) {
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
}

async function standartFile(statusFile, textarea, input) {
    try {
        const request = await fetch("./figure.dat");
        const content = await request.text();

        textarea.value = content

        statusFile.innerText = "Arquivo padrão carregado com sucesso!";
        input.style.display = 'none';

    } catch (error) {
        console.log("Erro: ", error)
    }
}



export {loadTextInputFile, standartFile};