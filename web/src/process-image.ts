import { from as nc } from "nearest-color";

let nearestColor = nc({ red: "red", black: "black", white: "white" });

export type ProcessImageOptions = {
  contrast: number;
  saturation: number;
  hueAngle: number;
  imageMode: "fit" | "fill" | "stretch";
  bgColor: "red" | "black" | "white";
};

export function processImage(
  image: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  { contrast, saturation, hueAngle, imageMode, bgColor }: ProcessImageOptions
): Uint8Array {
  ctx.filter = `hue-rotate(${hueAngle}deg) contrast(${contrast}) saturate(${saturation})`;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 264, 176);

  let a = 264 / image.naturalWidth;
  let b = 176 / image.naturalHeight;

  let k, w, h;
  switch (imageMode) {
    case "stretch":
      ctx.drawImage(image, 0, 0, 264, 176);
      break;

    case "fit":
      k = Math.min(a, b);

      w = image.naturalWidth * k;
      h = image.naturalHeight * k;

      ctx.drawImage(image, (264 - w) / 2, (176 - h) / 2, w, h);
      break;

    case "fill":
      k = Math.max(a, b);

      w = image.naturalWidth * k;
      h = image.naturalHeight * k;

      ctx.drawImage(image, (264 - w) / 2, (176 - h) / 2, w, h);
      break;

    default:
      break;
  }

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

      let { r, g, b } = nearestColor(color).rgb;

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }

    data[i + 3] = 255; //alpha
  }

  ctx.putImageData(imageData, 0, 0);

  let buffer = new Uint8Array((264 * 176 * 2) / 8);

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

    buffer[Math.floor(pixelI / 4)] |= pixelColor << ((pixelI % 4) * 2);
  }

  return buffer;
}
