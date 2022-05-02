#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform int lights;                    // number of lights
uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform float material_shininess;
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
    vec3 position = vec3(model_matrix * vec4(vertex_position, 1.0));

    ambient = light_ambient;
    for(int i = 0; i < lights; i++) {
        vec3 direction = normalize(light_position[i] - position);
        vec3 reflected = vec3(2.0, 2.0, 2.0) * (normalize(vertex_normal) * direction) * (normalize(vertex_normal) - direction);

        diffuse += light_color[i] * max(dot(normalize(vertex_normal), direction), 0.0);
        specular += light_color[i] * pow(max(dot(normalize(camera_position - position), normalize(reflected)), 0.0), material_shininess);
    }

    // make sure components don't exceede 1.0
    ambient = clamp(ambient, 0.0, 1.0);
    diffuse = clamp(diffuse, 0.0, 1.0);
    specular = clamp(specular, 0.0, 1.0);
}
