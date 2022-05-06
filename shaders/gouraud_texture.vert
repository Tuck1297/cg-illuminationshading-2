#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform int lights;                    // number of lights
struct _lights {
    vec3 position; 
    vec3 color; 
};
uniform _lights light_array[10];
uniform vec3 light_ambient;
//uniform vec3 light_position[10];
//uniform vec3 light_color[10];
uniform vec3 camera_position;

uniform float material_shininess; // n

uniform vec2 texture_scale;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);  // starter code
    frag_texcoord = vertex_texcoord * texture_scale;                                            // starter code
    
    ambient = light_ambient;
    //vec3 N = normalize(vertex_normal);
    vec3 Normal = mat3(transpose(inverse(model_matrix))) *vertex_normal;
    vec3 N = normalize(Normal);
    vec3 diffuseSum = vec3(0,0,0);
    vec3 specularSum = vec3(0,0,0);
    
    vec3 frag_pos = vec3(model_matrix * vec4(vertex_position, 1.0)); // position

    vec3 V = normalize(camera_position - frag_pos); // viewdirection
    for(int i = 0; i < lights; i++) {
        // diffuse
        vec3 L = normalize(light_array[i].position - frag_pos); // lightdirection
        float diffuse_calculation = max(dot(N, L), 0.0);
        diffuseSum += diffuse_calculation * light_array[i].color;

        // specular
        vec3 R = normalize(2.0 *dot(N, L)* N - L);
        specularSum += light_array[i].color * pow(max(dot(V, R), 0.0), material_shininess);
    }

    // make sure components don't exceede 1.0
    ambient = clamp(ambient, 0.0, 1.0);
    diffuseSum = clamp(diffuseSum, 0.0, 1.0);
    specularSum = clamp(specularSum, 0.0, 1.0);

    diffuse = diffuseSum;
    specular = specularSum;
}
