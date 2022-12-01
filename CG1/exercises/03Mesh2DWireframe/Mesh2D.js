import GLSLProgram  from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { TriangleMeshGL } from "./TriangleMeshGL.js"
import { Matrix3 } from "./Matrix3.js"

function Mesh2DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  let mGlslProgram = null;
  let triangleMeshGL = null;

  async function setup() {
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;

    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));

    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("../../data/lion.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);    

    triangleMeshGL = new TriangleMeshGL(gl, mesh);

    requestAnimationFrame(draw);
  }

  function draw() {
    resize();

    let backgroundColor = document.getElementById("backgroundColor").value;

    //Wireframe Color
    let wireFrameColor = document.getElementById("WireFrameColor").value;

    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    let rotation = document.getElementById("Rotation").value;
    
    let rB = parseInt(backgroundColor.substr(1,2),16)/256.0;
    let gB = parseInt(backgroundColor.substr(3,2),16)/256.0;
    let bB = parseInt(backgroundColor.substr(5,2),16)/256.0;

    // Farben für Wireframe rausholen
    let fRB = parseInt(wireFrameColor.substr(1,2),16)/256.0;
    let fGB = parseInt(wireFrameColor.substr(3,2),16)/256.0;
    let fBB = parseInt(wireFrameColor.substr(5,2),16)/256.0;

    // Lab 02, Aufgabe 3(b)
    let rotationMatrix = Matrix3.rotation(rotation);
    let translateMatrix = Matrix3.translation(translateX, translateY);
    let scaleMatrix = Matrix3.scaling(scaleX, scaleY);
    let aspectMatrix = Matrix3.aspect(mCanvas.width, mCanvas.height);

    // Zuerst rotation*Skalierung dann * Position und zuletzt * Aspektratio
    let transform = Matrix3.multiply(aspectMatrix, Matrix3.multiply(translateMatrix, (Matrix3.multiply(rotationMatrix, scaleMatrix))));
    let mat3_transform = mGlslProgram.getUniformLocation("mat3_transform");
    // Lab 02, Aufgabe 3(c)

    // Lab 02, Aufgabe 1(c)
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Wireframe Farbe setzen
    let wireFrameFarbe = mGlslProgram.getUniformLocation("u_wfcolor");
    let wireFrameBool = mGlslProgram.getUniformLocation("u_useWireframe");
    
    // Shader benutzen
    mGlslProgram.use();
    gl.uniform3f(wireFrameFarbe, fRB, fGB, fBB);
    
    // Lab 02, Aufgabe 3(b)
    gl.uniformMatrix3fv(mat3_transform, true, transform);
    
    
    

    gl.uniform1i(wireFrameBool, 0);

    // Lab 02, Aufgabe 1(b)
    triangleMeshGL.draw();
  
    // Lab 03, Aufgabe 1(b)
    if (document.getElementById("useWireFrame").checked){
    gl.uniform1i(wireFrameBool, 1);
    triangleMeshGL.drawWireFrame();
  }

   
    requestAnimationFrame(draw);
  }

  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) 
    {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {
  let t = new Mesh2DApp();
}

main();


