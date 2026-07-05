function getZMedio(face) {
    let somaZ = 0;
    let m = 0;
    face.map((value, index) =>{
        somaZ += value[2];
        m+=1;
    });
    return somaZ / m;
}

export {getZMedio}