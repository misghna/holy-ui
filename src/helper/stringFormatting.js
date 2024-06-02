export function snakeCaseToReadable(str) {
  return str?.replace(/_/g, " ") || str;
}
