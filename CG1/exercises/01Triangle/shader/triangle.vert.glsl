#version 300 es
layout (location = 0) in vec4 inVertex;
layout (location = 1) in vec3 inColor;

out vec3 v_Color;

uniform float u_scale;

void main() 
{
  gl_Position = vec4(u_scale*inVertex.xyz, inVertex.w);
  v_Color = inColor;
  // v_Color = abs(inVertex.xyz);
}