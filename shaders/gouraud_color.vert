#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;

uniform float material_shininess; // n

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

uniform int lights;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);

    ambient = light_ambient;

    vec3 L = light_position - vertex_position;
    L = normalize(L);

    diffuse = light_color * dot(vertex_normal, L);

    vec3 V = camera_position - vertex_position;
    V = normalize(V);
    vec3 R = reflect(L, vertex_normal);
    R = normalize(R);
    
    specular = light_color * pow(dot(R, V), material_shininess);

    ambient = clamp(ambient, 0.0, 1.0);
    diffuse = clamp(diffuse, 0.0, 1.0);
    specular = clamp(specular, 0.0, 1.0);
}
