import { multiply, criaObj, criaObjTransformado } from "./obj3d"
import { limpaTela } from "./canva";

const adicionaM = (m) => {
    m.forEach((linha) => {
        linha.push(1);
    })
}

const TREX = (m,t=0, r=0, e=1) =>{ // Translação, rotação, escala no eixo X -> Transformações lineares no eixo x
    function translationX(t) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [t, 0, 0, 1]
        ]
    }
    const anguloRadianos = r * (Math.PI/180)

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)
    function rotationX(r) {
        return [
            [1,  0,   0,  0],
            [0,  cos,   sen,  0],
            [0, -sen,   cos,  0],
            [0,  0,   0,  1]
        ]
    }

    function scaleX(s) {
        return [
            [s, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    const S = scaleX(e);
    const R = rotationX(r);
    const T = translationX(t);
    // Ordem: T * R * S   (escala → rotação → translação)
    return multiply(m, multiply(multiply(T, R), S )) 
}

const TREY = (m, t=0,r=0,e=1) =>{
    function translationY(t) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, t, 0, 1]
        ]
    }
    const anguloRadianos = r * (Math.PI/180)

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)
    function rotationY() {
        return [
            [ cos,  0, -sen,  0],
            [ 0,  1,  0,  0],
            [ sen,  0,  cos,  0],
            [ 0,  0,  0,  1]
        ]
    }
    function scaleY(s) {
        return [
            [1, 0, 0, 0],
            [0, s, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    const S = scaleY(e);
    const R = rotationY(r);
    const T = translationY(t);
    // Ordem: T * R * S   (escala → rotação → translação)
    return multiply(m, multiply(multiply(T, R), S )) 
}

const TREZ = (m, t=0,r=0,e=1) =>{
    function translationZ(t) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, t, 1]
        ]
    }
    const anguloRadianos = r * (Math.PI/180) 

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)
    function rotationZ() {
        return [
            [ cos,  sen,  0,  0],
            [-sen,  cos,  0,  0],
            [ 0,  0,  1,  0],
            [ 0,  0,  0,  1]
        ]
    }

    function scaleZ(s) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, s, 0],
            [0, 0, 0, 1]
        ]
    }  

    const S = scaleZ(e);
    const R = rotationZ(r);
    const T = translationZ(t);
    // Ordem: T * R * S   (escala → rotação → translação)
    return multiply(m, multiply(multiply(T, R), S )) 
}