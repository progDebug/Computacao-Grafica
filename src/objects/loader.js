/* 
    (Xmin, Xmax, Ymin, Ymax)
    n
    p l f
    xi yi zi
    Pa Pb
    N I RGB
    theta_x theta_y theta_z
    Sx   Sy   Sz
    Tx Ty Tz

    Tamanho do sistema de coordenadas do universo
    Número de Objetos 3D no arquivo
    Qnt de pontos, linhas e faces do obj
    P * vértices
    L * arestas ligando o ponto Pa ao Pb
    F * faces com N = qnt de pontos
                  I = sequência ordenada em sentido anti-horário dos índices dos N pontos que formam a face
                  RGB = 3 valores reais no intervalo [0,1] informando a cor da face  
    ângulos de rotação a ser aplicado no objeto em torno dos eixos x, y e z, respectivamente.
    escalonamento a ser aplicado no objeto nos eixos x, y e z respectivamente
    translação a ser feita do objeto nos eixos x, y e z respectivamente
*/
import { Object3DMesh } from "./object3d.js";

let UNIVERSE;

const parseObjData = (date) => {
    const regex = /^[//#]/

    const row = date.trim()
                        .split(/\r?\n/)
                        .filter(row => !regex.test(row));

    const strParaNumeros = (linha) => {
        return linha.trim().split(/\s+/).map(Number);
    }

    UNIVERSE = row[0].split(' ').map(Number)
    const n = parseInt(row[1]);
    const objects = []
    row.splice(0, 2)

    for (let index = 0; index < n; index++) {
        const metaData = row[0].split(' ').map(value => parseInt(value, 10));
        row.shift()

        const vertices = row
            .splice(0, metaData[0])
            .map(strParaNumeros)
        const arestas = row
            .splice(0, metaData[1])
            .map(strParaNumeros)
        
        const faces = []

        for (let i = 0; i < metaData[2]; i++) {

            const current = row[i].split(' ').map(value => parseFloat(value))

            const qtdArestas = parseInt(current[0]);

            const face = {
                arestas: current.slice(1, 1 + qtdArestas).map(v => parseInt(v)),
                cor: current.slice(1 + qtdArestas, qtdArestas + 4).map(v => Math.max(0, Math.min(1, parseFloat(v))))
            };

            faces.push(face);
        }

        row.splice(0, metaData[2]);
        
        const obj = new Object3DMesh(
            vertices, 
            arestas,
            faces
        )

        const r = row[0].split(' ').map(value => parseInt(value, 10));
        row.shift()
        obj.rotate(
            r[0],
            r[1],
            r[2]
        )

        const e = row[0].split(' ').map(value => parseInt(value, 10));
        row.shift()
        obj.setScale(
            e[0],
            e[1],
            e[2]
        )

        const t = row[0].split(' ').map(value => parseInt(value, 10));
        row.shift()
        obj.translate(
            t[0],
            t[1],
            t[2]
        )

        objects.push(
            obj
        )
    }
    return objects
}

export { parseObjData, UNIVERSE };