import * as nearestColor from "nearest-color";

let nc = nearestColor.from({ red: "red", black: "black", white: "white" });

export async function processImage(
  image: Blob,
  ctx: CanvasRenderingContext2D
): Promise<Uint8Array> {
  ctx.clearRect(0, 0, 264, 176);
  ctx.drawImage(await createImageBitmap(image), 0, 0, 264, 176);

  let imageData = ctx.getImageData(0, 0, 264, 176);

  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    } else {
      const color = {
        r: data[i],
        g: data[i + 2],
        b: data[i + 3],
      };

      let { r, g, b } = nc(color).rgb;

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }

    data[i + 3] = 255; //alpha
  }

  ctx.putImageData(imageData, 0, 0);

  let b = new Uint8Array((264 * 176 * 2) / 8);

  for (var i = 0; i < data.length; i += 4) {
    let pixelI = Math.floor(i / 4);

    let pixelColor = 0;
    if (data[i] === 255) {
      if (data[i + 1] === 255) {
        pixelColor = 0b00; // w
      } else {
        pixelColor = 0b10; //r
      }
    } else {
      pixelColor = 0b01; // b
    }

    b[Math.floor(pixelI / 4)] |= pixelColor << ((pixelI % 4) * 2);
  }

  return b;
}
