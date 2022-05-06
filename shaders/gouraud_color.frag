#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

in vec3 ambient_multiple;
in vec3 diff_multiple; 
in vec3 spec_multiple; 

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {
    // Ambient Light
    vec3 ambient_light = ambient;
    
    // Diffuse Light
    vec3 diffuse_light = diffuse;
    
    // Specular Light
    vec3 specular_light = specular;
    
     //FragColor = vec4((ambient_light+diffuse_light+specular_light)*material_color,1.0);
     //FragColor = vec4((ambient * material_color) + (diffuse * material_color) + (specular * material_specular*material_color), 1.0);

     // Multiple Light Source Calculation
     FragColor = vec4((ambient_multiple*material_color)+(diff_multiple*material_color)+(spec_multiple*material_specular), 1.0);
     //FragColor = vec4((ambient_multiple+diff_multiple+(spec_multiple*material_specular))*material_color, 1.0);
}
