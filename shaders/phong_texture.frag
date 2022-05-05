#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform int lights;                    // number of lights
struct _lights {
    vec3 position; 
    vec3 color; 
};
uniform _lights light_array[10];
uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
    
    vec3 N = normalize(frag_normal);
    vec3 V = normalize(camera_position - frag_pos);

    vec3 ambient = light_ambient * material_color;
    vec3 diffuse = vec3(0,0,0);
    vec3 specular = vec3(0,0,0);

    for(int i = 0; i < lights; i++) {
        vec3 L = normalize(light_array[i].position - frag_pos);
        // diffuse
        diffuse += light_array[i].color * material_color * max(dot(N, L), 0.0);

        // specular
        //vec3 R = reflect(-normalize(light_position[i] - frag_pos), frag_normal);
        //vec3 R = normalize(-reflect(L, N));
        vec3 R = normalize(2.0 * max(dot(N, L), 0.0) * N-L);
        specular += light_array[i].color * material_specular * pow(max(dot(R, V), 0.0), material_shininess);
    }
    ambient = clamp(ambient, 0.0, 1.0);
    specular = clamp(specular, 0.0, 1.0);
    diffuse = clamp(diffuse, 0.0, 1.0);

    vec3 combined = (ambient + diffuse + specular);

    FragColor = vec4(combined, 1.0) * texture(image, frag_texcoord);
}
