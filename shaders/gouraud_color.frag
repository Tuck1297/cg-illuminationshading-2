#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {
    // Ambient Light
    vec3 ambient_light = ambient;
    
    // Diffuse Light
    vec3 diffuse_light = diffuse;
    
    // Specular Light
    vec3 specular_light = material_specular*specular;
    
     FragColor = vec4((ambient_light+diffuse_light+specular_light)*material_color,1.0);
     // TODO: Ask Dr. Marrinan if material_color should be included in specular
     //FragColor = vec4((ambient * material_color) + (diffuse * material_color) + (specular * material_specular), 1.0);
}
