#version 300 es
precision highp float;
//Wireframe Color
uniform bool u_useWireframe;
uniform vec3 u_wfcolor;

// Lab 02, Aufgabe 2
in vec3 v_Color;

out vec4 fragColor;

void main()
{
	// Lab 03, Aufgabe (e)
	if (u_useWireframe == true){
		fragColor = vec4(u_wfcolor.rgb, 1.0);
	}
	// Lab 02, Aufgabe 2
	else{
		fragColor = vec4(v_Color.rgb, 1.0);
		}

}