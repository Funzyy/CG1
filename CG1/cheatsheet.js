// Create Vertex-Arrays
vao = gl.createVertexArray();

// Bind Vertex
gl.bindVertexArray(vao);

// Vertex Buffer
const pb = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pb);

// Storage für Buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// Connect und enable Vertex Buffer with Vertex Array Object
const positionAttributeLocation = 0;
gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttributeLocation);





// SHADER
// https://learnopengl.com/Getting-started/Shaders
// Folie 77 in 02
// Fragment Shader = Input
// Vertex Shader = Output