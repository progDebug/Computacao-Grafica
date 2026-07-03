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
        this.faces.forEach(f => {
            f.arestas.forEach(idx => {
                somaZ += verticesTransformados[idx].z;
            });
        });
        return somaZ / this.faces.length;
    }

    getFaceNormal(face, verticesTransformados) {
        const idx1 = face.arestas[0] - 1;
        const idx2 = face.arestas[1] - 1;
        const idx3 = face.arestas[2] - 1;
        
        const v1 = verticesTransformados[idx1];
        const v2 = verticesTransformados[idx2];
        const v3 = verticesTransformados[idx3];

        const ax = v2[0] - v1[0];
        const ay = v2[1] - v1[1];
        const az = v2[2] - v1[2];

        const bx = v3[0] - v1[0];
        const by = v3[1] - v1[1];
        const bz = v3[2] - v1[2];

        const nx = ay * bz - az * by;
        const ny = az * bx - ax * bz;
        const nz = ax * by - ay * bx;

        const len = Math.sqrt(nx*nx + ny*ny + nz*nz);
        if (len === 0) return [0, 0, 0];
        
        return [nx/len, ny/len, nz/len];
    }

    isFaceVisible(normal) {
        return normal[2] > 0;
    }

    computeFaceData(verticesTransformados) {
        this.faces.forEach(face => {
            face.normal = this.getFaceNormal(face, verticesTransformados);
            face.zMedia = face.arestas.reduce((sum, idx) => sum + verticesTransformados[idx-1][2], 0) / face.arestas.length;
            face.isVisible = this.isFaceVisible(face.normal);
        });
    }
}


export { Object3D, Object3DMesh };