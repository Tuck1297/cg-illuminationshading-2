#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

struct _lights {
    vec3 position; 
    vec3 color; 
};
uniform _lights light_array[10];

uniform int lights;

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
    vec3 ambient_light = light_ambient;

    // Diffuse Light
    vec3 N = normalize(frag_normal); 
    vec3 L = normalize(light_position-frag_pos); 

    vec3 diffuse_light = light_color * max(dot(N, L), 0.0);
    
    // Specular Light
    vec3 V = normalize(camera_position-frag_pos); 
    vec3 R = normalize(2.0 * max(dot(N, L), 0.0)*N-L); 

    vec3 specular_light = material_specular * light_color * pow(max(dot(V, R),0.0), material_shininess);
    //vec3 specular_light = material_specular * light_color * pow(dot(V, R), material_shininess);
    //specular_light = clamp(specular_light, 0.0, 1.0);

    //FragColor = vec4((ambient_light+diffuse_light+specular_light)*material_color, 1.0);





    // Multiple Light Source Calculations
    // Implementing equation found at: https://www.geeksforgeeks.org/phong-model-specular-reflection-in-computer-graphics/
    
    vec3 diffuse_sum; 
    vec3 spec_sum; 

    vec3 ambient_multiple = light_ambient*material_color;

    for (int i = 0; i < lights; i++) {
        // Diffuse calculations - Sum
        vec3 L_mult = normalize(light_array[i].position-frag_pos);
        diffuse_sum += material_color*light_array[i].color * max(dot(N,L_mult), 0.0);

        // Specular calculations - Sum
        vec3 R_mult = normalize(2.0*max(dot(N, L_mult), 0.0)*N-L_mult);
        spec_sum += material_color * material_specular*light_array[i].color*pow(max(dot(V, R_mult), 0.0), material_shininess); 
    }

    FragColor = vec4(ambient_multiple+diffuse_sum+spec_sum, 1.0);

}

