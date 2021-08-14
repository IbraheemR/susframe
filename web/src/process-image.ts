import * as nearestColor from "nearest-color";

let nc = nearestColor.from({ red: "red", black: "black", white: "white" });

export async function processImage(image: Blob): Promise<Uint8Array> {
  ctx.clearRect(0, 0, 264, 176);
  ctx.drawImage(await createImageBitmap(image), 0, 0, 264, 176);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

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

      let { r, g, b } = nc(color).rgb; // Since it is grayscale only sample the red channel

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }

    data[i + 3] = 255; //alpha
  }

  ctx.putImageData(imageData, 0, 0);

  let b = new Uint8Array((264 * 176 * 2) / 8);

  for (var i = 0; i < data.length; i += 4) {
    let p = 0;
    if (data[i] === 255) {
      if (data[i + 1] === 255) {
        p = 0b00; // w
      } else {
        p = 0b10; //r
      }
    } else {
      p = 0b01; // b
    }

    b[Math.floor(i / 16)] |= p << (i / 4) % 4;
  }

  return b;
}

let canvas = document.createElement("canvas");
// canvas.style.display = "none"
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

canvas.width = 264;
canvas.height = 176;

ctx.filter = "contrast(5)";
