// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL{

    /**
     * Creates a triangle mesh with positions, colors and texture coordinates
     * drawable with WebGL2.
     * 
     * @param {WebGL2RenderingContext} gl WebGL Rendering Context
     * @param {SimpleMeshModelIO} simpleMeshIO Simple Mesh IO
     */ 
    constructor(gl, simpleMeshIO) {
        this.gl = gl;
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = 0;
        
        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;

        // Lab 02, Aufgabe 1(a)

        /////////////////////////////////////////////////////////////////
        // Create & Bind Vertex Array on the GPU
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        const pb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        // Configure Vertex Position attribute
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        // FARBEN
        ///////////////////////////////////////////////////
        const cb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        const color = 1;
        gl.enableVertexAttribArray(color);
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
        ///////////////////////////////////////////////////

        //Create, bind and upload Index Buffer
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);

        this.vaoWireFrame = gl.createVertexArray();
        gl.bindVertexArray(this.vaoWireFrame);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);
        
        const lines = [];
        for(let i = 0; i < this.nTriangleIndices/3; i++){
            const i0 = triangles[i*3+0];
            const i1 = triangles[i*3+1];
            const i2 = triangles[i*3+2];

            lines.push(i0, i1, i1, i2, i2, i0);
        }
        this.nLineIndicies = lines.length;


        /////////////////////////////////////////////////////////////////////////////////////
    }

    /**
     * Draws a mesh with solid.
     */
    draw()
    {
        // Lab 02, Aufgabe 1(b)    
        this.gl.bindVertexArray(this.vao);  
        this.gl.drawElements(this.gl.TRIANGLES, this.nTriangleIndices, this.gl.UNSIGNED_INT, 0);
    }
    // LAB 03 Aufgabe 1
    drawWireFrame(gl){
        gl.bindVertexArray(this.vaoWireFrame);
        gl.drawElements(gl.LINES, this.nLineIndicies, gl.UNSIGNED_INT, 0);   
    }
}