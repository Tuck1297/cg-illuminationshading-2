#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
    vec4 ambientMaterial = vec4(ambient * material_color, 1.0);
    vec4 diffuseMaterial = vec4(diffuse * material_color, 1.0);
    vec4 specularMaterial = vec4(specular*material_specular, 1.0);
    vec4 combined = clamp(ambientMaterial + diffuseMaterial+ specularMaterial, 0.0, 1.0);
    FragColor = texture(image, frag_texcoord) * combined ;

    // NOTE: do we want to add in specular with ambient and diffuse or add it to the fragColor
    // NOTE: something slightly off with diffuse lighting for multiple lights
}
