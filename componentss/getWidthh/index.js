export default function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width } = window;
    return width;
  }
}
