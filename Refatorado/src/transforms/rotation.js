const rotationX = (angulo) => {
    const rad = angulo * Math.PI / 180;

    return [
        [1, 0, 0, 0],
        [0, Math.cos(rad), Math.sin(rad), 0],
        [0, -Math.sin(rad), Math.cos(rad), 0],
        [0, 0, 0, 1]
    ];
}

const rotationY = (angulo) => {
    const rad = angulo * Math.PI / 180;

    return [
        [Math.cos(rad), 0, -Math.sin(rad), 0],
        [0, 1, 0, 0],
        [Math.sin(rad), 0, Math.cos(rad), 0],
        [0, 0, 0, 1]
    ];
}

const rotationZ = (angulo) => {
    const rad = angulo * Math.PI / 180;

    return [
        [Math.cos(rad), Math.sin(rad), 0, 0],
        [-Math.sin(rad), Math.cos(rad), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

export {
    rotationX,
    rotationY,
    rotationZ
};