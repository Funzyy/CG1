#version 300 es
precision highp float;

out vec4 outColor;

in vec3 v_Color;

uniform vec3 u_color;

void main() 
{
  // outColor = vec4(v_Color.x, v_Color.y, v_Color.z, 1.0);
  outColor = vec4(v_Color.rgb*1.0, 1.0);
}