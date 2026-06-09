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


export { Object3D };