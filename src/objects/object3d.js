import { applyPipeline }
    from "../transforms/transformPipeline.js";

import { translationMatrix }
    from "../transforms/translation.js";

import { scaleMatrix }
    from "../transforms/scale.js";

import {
    rotationX,
    rotationY,
    rotationZ
} from "../transforms/rotation.js";

class Object3D {

    constructor(vertices, arestas) {

        // geometria ORIGINAL
        this.vertices = vertices;

        this.arestas = arestas;

        // transformações
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        this.scale = {
            x: 1,
            y: 1,
            z: 1
        };
    }

    translate(tx, ty, tz) {
        this.position.x += tx;
        this.position.y += ty;
        this.position.z += tz;
    }

    rotate(rx, ry, rz) {
        this.rotation.x += rx;
        this.rotation.y += ry;
        this.rotation.z += rz;
    }

    setScale(sx, sy, sz) {
        this.scale.x = sx;
        this.scale.y = sy;
        this.scale.z = sz;
    }
    
    getTransformedVertices() {
        const homogeneousVertices =
            this.vertices.map(v => [
                v[0],
                v[1],
                v[2],
                1
            ]);

        const matrices = [

            scaleMatrix(
                this.scale.x,
                this.scale.y,
                this.scale.z
            ),

            rotationX(this.rotation.x),

            rotationY(this.rotation.y),

            rotationZ(this.rotation.z),

            translationMatrix(
                this.position.x,
                this.position.y,
                this.position.z
            )
        ];

        return applyPipeline(
            homogeneousVertices,
            matrices
        );
    }
}

class Object3DMesh {
    constructor(vertices, arestas, faces) {


        // geometria ORIGINAL
        this.vertices = vertices;

        this.arestas = arestas;

        // Vai conter os vertices da face e cor Exemplo:
        // face[0] = {
        //      arestas: [arestas],
        //      cor: 0
        //}
        this.faces = faces; 

        // transformações
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        this.scale = {
            x: 1,
            y: 1,
            z: 1
        };
    }

    translate(tx, ty, tz) {
        this.position.x += tx;
        this.position.y += ty;
        this.position.z += tz;
    }

    rotate(rx, ry, rz) {
        this.rotation.x += rx;
        this.rotation.y += ry;
        this.rotation.z += rz;
    }

    setScale(sx, sy, sz) {
        this.scale.x = sx;
        this.scale.y = sy;
        this.scale.z = sz;
    }
    
    getTransformedVertices() {
        const homogeneousVertices =
            this.vertices.map(v => [
                v[0],
                v[1],
                v[2],
                1
            ]);

        const matrices = [

            scaleMatrix(
                this.scale.x,
                this.scale.y,
                this.scale.z
            ),

            rotationX(this.rotation.x),

            rotationY(this.rotation.y),

            rotationZ(this.rotation.z),

            translationMatrix(
                this.position.x,
                this.position.y,
                this.position.z
            )
        ];

        return applyPipeline(
            homogeneousVertices,
            matrices
        );
    }
    getZMedio(verticesTransformados) {
        let somaZ = 0;
        this.faces.forEach(idx => {
            somaZ += verticesTransformados[idx].z;
        });
        return somaZ / this.indices.length;
    }
}


export { Object3D, Object3DMesh };