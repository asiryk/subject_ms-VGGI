attribute vec3 vertex;
attribute vec2 texcoord;

uniform mat4 model_view_matrix;
uniform mat4 projection_matrix;
uniform vec2 texture_scale;
uniform vec2 texture_pivot_uv;

varying vec3 v_vertex;
varying vec3 v_vertex_position;
varying vec2 v_texcoord;

mat4 mat_scale(vec3 s) {
    return mat4(
        s.x, 0., 0., 0.,
        0., s.y, 0., 0.,
        0., 0., s.z, 0.,
        0., 0., 0., 1.
    );
}

mat4 mat_translate(vec3 t) {
    return mat4(
        1., 0., 0., t.x,
        0., 1., 0., t.y,
        0., 0., 1., t.z,
        0., 0., 0., 1.
    );
}

mat4 mat_rotate(vec3 axis, float angle) {
    // https://www.brainvoyager.com/bv/doc/UsersGuide/CoordsAndTransforms/SpatialTransformationMatrices.html
    float c = cos(angle);
    float s = sin(angle);
    float t = 1. - c;
    float x = axis.x;
    float y = axis.y;
    float z = axis.z;
    return mat4(
        t*x*x + c, t*x*y - s*z, t*x*z + s*y, 0.,
        t*x*y + s*z, t*y*y + c, t*y*z - s*x, 0.,
        t*x*z - s*y, t*y*z + s*x, t*z*z + c, 0.,
        0., 0., 0., 1.
    );
}

vec2 scale_around_pivot(vec2 point, vec2 pivot, vec3 scale) {
    mat4 translate_mat = mat_translate(vec3(pivot, 0.));
    mat4 translate_back_mat = mat_translate(-vec3(pivot, 0.));
    mat4 scale_mat = mat_scale(scale);

    vec4 point4 = vec4(point, 1., 1.);

    vec4 tr = translate_mat * point4;
    vec4 sc = tr * scale_mat;
    // vec4 trb = tr * translate_back_mat;

    return vec2(sc);
}

void main() {
    mat4 transformation_matrix = projection_matrix * model_view_matrix;
    vec4 position = transformation_matrix * vec4(vertex, 1.0);

    v_vertex = vertex;
    v_vertex_position = vec3(position) / position.w;

    v_texcoord = scale_around_pivot(texcoord, texture_pivot_uv, vec3(texture_scale, 1.));
    // v_texcoord = vec2(vec4(texcoord, 0., 0.) * scale_mat);

    gl_Position = position;
}
