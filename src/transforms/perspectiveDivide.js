const perspectiveDivide = (vertices) => {

    return vertices.map(v => {

        const w = 1 + (v[2] / 500);

        return [
            v[0] / w,
            v[1] / w,
            v[2],
            1
        ];
    });
}

export { perspectiveDivide };