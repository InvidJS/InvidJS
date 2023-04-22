export function convertToString(time: number) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60) % 60;
  let seconds = time % 60;
  let length = [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
  return length;
}
