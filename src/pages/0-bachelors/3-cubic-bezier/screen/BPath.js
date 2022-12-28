import Path from "../../1-2-3-helpers/Path";

export default class BPath extends Path {
  drawPieces(arrayOfPoints) {
    arrayOfPoints.forEach((curvePiece) =>
      this.line(curvePiece.from, curvePiece.to)
    );
    this.closePath();
    return this;
  }
}
