#version 300 es
precision highp float;

// Lab 02, Aufgabe 2
in vec3 v_Color;

out vec4 fragColor;

void main()
{
	// Lab 02, Aufgabe 2
	fragColor = vec4(v_Color.rgb, 1.0);
}