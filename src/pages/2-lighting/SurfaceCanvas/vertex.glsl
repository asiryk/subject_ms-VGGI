attribute vec3 vertices;
uniform mat4 model_view_matrix;
uniform mat4 projection_matrix;
uniform mat4 normal_matrix;

varying vec4 color;

void main() {
    mat4 transformation_matrix = projection_matrix * model_view_matrix;
    vec4 position = transformation_matrix * vec4(vertices, 1.0);

    gl_Position = position;
}
