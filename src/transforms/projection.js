const SenCos = (a) => {
    const anguloRadianos = a * (Math.PI/180)

    const sen = Math.sin(anguloRadianos).toFixed(4)
    const cos = Math.cos(anguloRadianos).toFixed(4)

    return [
        sen, 
        cos
    ]
}

const cavalierProjection = (k = 0.5, angle) => {
    const [sen, cos] = SenCos(angle)
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [-(k*cos), -(k*sen), 0, 0],
        [0, 0, 0, 1]
    ];
}

const cabinetProjection = (L = 1/2, angle) => {
    const [sen, cos] = SenCos(angle)
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [(L/2)*cos, (L/2)*sen, 0, 0],
        [0, 0, 0, 1]
    ]
}

const isometricProjection = (angle) =>{
    const [sen, cos] = SenCos(angle)
    const alpha = 35.264 * (Math.PI/180)

    const senAlpha = Math.sin(alpha).toFixed(4)
    const cosAlpha = Math.cos(alpha).toFixed(4)

    return [
        [cos, senAlpha*sen, 0, 0],
        [0, cosAlpha, 0, 0],
        [sen, -senAlpha*cos, 0, 0],
        [0, 0, 0, 1]   
    ]
}

const vanishingPointZ = (d) => {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, -1/d],
        [0, 0, 0, 0]       
    ]
}

// const orthographicProjection = () =>{
//    return [
//        [1, 0, 0, 1],
//        [0, 1, 0, 0],
//        [0, 0, 0, 0],
//        [0, 0, 0, 1]       
//    ]
//}

export { cavalierProjection, 
    cabinetProjection, 
    isometricProjection, 
    vanishingPointZ, 
    };