#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {


    // Ambient Light
    vec3 ambient_light = light_ambient * light_color;

    // Diffuse Light
    vec3 N = normalize(frag_normal); 
    vec3 L = normalize(light_position-frag_pos); 

    vec3 diffuse_light = light_color * max(dot(N, L), 0.0);
    
    // Specular Light
    vec3 R = 2.0 * max(dot(N, L), 0.0)*(N-L); 
    vec3 V = normalize(camera_position-frag_pos); 

    vec3 specular_light = material_specular * light_color * pow(dot(V, R), material_shininess);
    specular_light = clamp(specular_light, 0.0, 1.0);

    FragColor = vec4((ambient_light+diffuse_light+specular_light)*material_color, 1.0);
}

