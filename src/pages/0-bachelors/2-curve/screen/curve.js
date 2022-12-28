export default function curvePoint(diameter, angle) {
  return [diameter * Math.tan(angle), diameter * Math.cos(angle) ** 2];
}
