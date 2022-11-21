#version 300 es
precision highp float;
// Lab 02, Aufgabe 2
out vec4 fragColor;

in vec3 v_Color;

uniform vec3 u_color;

void main()
{
	// Lab 02, Aufgabe 2
	fragColor = vec4(0.0, 0.0, 0.0, 1.0);
	// fragColor = vec4(v_Color.rgb, 1.0);
}