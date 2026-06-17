
function printObj(Obj) {
    // Pesquisei sobre diferentes tipos de console.log no javascript
    console.log(JSON.stringify(Obj, (key, value) => {
        if (key === 'vertices' || key === 'arestas' || key === 'faces') {
            return `[Array de ${value.length} itens]`; // Resume o peso
        }
        return value;
    }, 2));
    console.log("\n\n")
    console.dir(Obj); 
}

export {printObj};