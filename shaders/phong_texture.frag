#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform int lights;
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
    FragColor = vec4(material_color, 1.0) * texture(image, frag_texcoord);

    vec3 ambient = material_color * light_ambient;

    vec3 normal = normalize(frag_normal);
    vec3 diffuse = vec3(0,0,0);
    vec3 specular = vec3(0,0,0);

    for(int i = 0; i < lights; i++) {
        vec3 direction = normalize(light_position[i] - frag_pos);
        
        diffuse = diffuse + light_color[i] * material_color * max(dot(normal, direction), 0.0);

        vec3 reflected = normalize(reflect(-direction, normal));

        vec3 viewDirection = normalize(camera_position - frag_pos);

        specular = specular + light_color[i] * material_specular * pow(max(dot(viewDirection, reflected), 0.0), material_shininess);
    }

    ambient = clamp(ambient, 0.0, 1.0);
    diffuse = clamp(diffuse, 0.0, 1.0);
    specular = clamp(specular, 0.0, 1.0);
    vec3 combined = ambient + diffuse + specular;
    FragColor = vec4(combined, 1.0) * texture(image, frag_texcoord);
}
