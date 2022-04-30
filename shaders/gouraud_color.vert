#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal; 

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

uniform float material_shininess; // n

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

out vec3 ambient_multiple;
out vec3 diff_multiple; 
out vec3 spec_multiple; 

void main() {

    
vec3 light_color_test = light_array[1].color;
    
    // Ambient Light Calculations
    ambient = light_ambient*light_color_test;

    // Diffuse Light Calculations
    vec3 frag_pos = vec3(model_matrix * vec4(vertex_position, 1.0));
    vec3 L = normalize(light_position-frag_pos);
    vec3 Normal = mat3(transpose(inverse(model_matrix))) *vertex_normal;
    vec3 N = normalize(Normal); 
    
    float diffuse_calculation = max(dot(N, L), 0.0);
    diffuse = diffuse_calculation * light_color_test;
    //diffuse = clamp(diffuse, 0.0, 1.0);
    
    // TODO: investigate specular light behavior when light is close to object

    // Specular Light Calculations
    vec3 V = normalize(camera_position-frag_pos);
    vec3 R = normalize(2.0 * max(dot(N, L), 0.0) * N-L);

     specular = light_color_test * pow(max(dot(V, R),0.0), material_shininess);
    //specular = light_color * pow(dot(V, R), material_shininess);
    //specular = clamp(specular, 0.0, 1.0);

    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    

    


    // Multiple Light Source Algorithm 
    // Implementing equation found at: https://www.geeksforgeeks.org/phong-model-specular-reflection-in-computer-graphics/
    
    vec3 diffuse_sum;
    vec3 specular_sum; 

    for (int i =0; i < lights; i++) {
        // Diffuse Light Calculations - Sum
        vec3 L_mult = normalize(light_array[i].position-frag_pos);
        float diffuse_calculation = max(dot(N, L_mult), 0.0);
        diffuse_sum += diffuse_calculation * light_array[i].color;

        // Specular Light Calculations - Sum
        vec3 R_mult = normalize(2.0 * max(dot(N, L_mult), 0.0) * N-L_mult);
        specular_sum += pow(max(dot(V, R_mult),0.0), material_shininess) * light_array[i].color;

    }
    
    ambient_multiple = light_ambient; 
    diff_multiple = diffuse_sum;
    spec_multiple = specular_sum;
    

    
}

