import { Object3DMesh } from "./object3d";

function copyObj(Obj) {
    ObjCopy = new Object3DMesh(
        Obj.vertices,
        Obj.arestas, 
        Obj.faces
    );
    return ObjCopy;
}

export {copyObj};