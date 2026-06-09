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

const parseObjData = (dados) => {
    const regex = /^[//#]/

    // Remove espaços em branco e verifica se a linha não é um comentario que começa com '#'
    const linhas = dados.trim()
                        .split(/\r?\n/)
                        .filter(row => !regex.test(row));
    console.log(linhas)

    const totalVertices = parseInt(linhas[0]);
    // Never Used
//    const totalArestas = parseInt(linhas[1]);

    const strParaNumeros = (linha) => {
        return linha.trim().split(/\s+/).map(Number);
    }

    const vertices = linhas
        .slice(2, totalVertices + 2)
        .map(strParaNumeros);

    const arestas = linhas
        .slice(totalVertices + 2)
        .map(strParaNumeros);

    return {
        vertices,
        arestas
    };
}

export { parseObjData };