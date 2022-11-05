export class Program<A extends string, U extends string> {
  private readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly attributes: Map<A, GLint>;
  private readonly uniforms: Map<U, WebGLUniformLocation>;

  constructor(
    gl: WebGLRenderingContext,
    vertex: string,
    fragment: string,
    attributes: A[],
    uniforms: U[]
  ) {
    this.gl = gl;
    this.uniforms = new Map();

    const vShader = this.createShader(this.gl.VERTEX_SHADER, vertex);
    const fShader = this.createShader(this.gl.FRAGMENT_SHADER, fragment);
    this.program = this.createProgram(vShader, fShader);
    this.gl.useProgram(this.program);

    this.attributes = new Map(
      attributes.map((attr) => [
        attr,
        this.gl.getAttribLocation(this.program, attr),
      ])
    );
    this.uniforms = new Map(
      uniforms.map((uniform) => [
        uniform,
        this.gl.getUniformLocation(this.program, uniform),
      ])
    );
  }

  public getAttribLocation(attributeName: A): GLint {
    return this.attributes.get(attributeName);
  }

  public getUniformLocation(uniformName: U): WebGLUniformLocation {
    return this.uniforms.get(uniformName);
  }

  private createShader(type: GLenum, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const log = this.gl.getShaderInfoLog(shader);
      const msg = "Error compiling shader: " + log;
      throw new Error(msg);
    }

    return shader;
  }

  private createProgram(
    vertex: WebGLShader,
    fragment: WebGLShader
  ): WebGLProgram {
    const prog = this.gl.createProgram();
    this.gl.attachShader(prog, vertex);
    this.gl.attachShader(prog, fragment);
    this.gl.linkProgram(prog);
    if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
      const log = this.gl.getProgramInfoLog(prog);
      const msg = "Link error in program: " + log;
      throw new Error(msg);
    }
    return prog;
  }
}
