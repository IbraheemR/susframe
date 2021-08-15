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
  // ctx.filter = `hue-rotate(${hueAngle}deg) contrast(${contrast}) saturate(${saturation})`;
  // ^ doesn't work on mobile safari

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
    let color = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
    };

    color = hueRotate(color, hueAngle);
    color = adjustContrast(color, contrast);
    color = adjustSaturation(color, saturation);

    let { r, g, b } = nearestColor(color).rgb;

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;

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

function hueRotate({ r, g, b }, angle) {
  angle *= 1 / 360; // Math.PI / 180;

  r /= 255;
  g /= 255;
  b /= 255;

  // const aRR = 0.213 * Math.cos(angle) * +0.787 + Math.sin(angle) * -0.213;
  // const aRG = 0.715 * Math.cos(angle) * -0.715 + Math.sin(angle) * -0.715;
  // const aRB = 0.072 * Math.cos(angle) * -0.072 + Math.sin(angle) * +0.928;

  // const aGR = 0.213 * Math.cos(angle) * -0.213 + Math.sin(angle) * +0.143;
  // const aGG = 0.715 * Math.cos(angle) * +0.285 + Math.sin(angle) * +0.14;
  // const aGB = 0.072 * Math.cos(angle) * +0.072 + Math.sin(angle) * -0.283;

  // const aBR = 0.213 * Math.cos(angle) * -0.213 + Math.sin(angle) * -0.787;
  // const aBG = 0.715 * Math.cos(angle) * -0.715 + Math.sin(angle) * +0.715;
  // const aBB = 0.072 * Math.cos(angle) * +0.928 + Math.sin(angle) * +0.072;

  // r = r * aRR + g + aRG + b * aRB;
  // g = r * aGR + g + aGG + b * aGB;
  // b = r * aBR + g + aBG + b * aBB;

  const h = ((angle % 1) + 1) % 1; // wraps the angle to unit interval, even when negative
  const th = h * 3;
  const thr = Math.floor(th);
  const d = th - thr;
  const dp = 1 - d;
  let ma, mb, mc;
  let md, me, mf;
  let mg, mh, mi;

  switch (thr) {
    case 0:
      ma = dp;
      mb = 0;
      mc = d;
      md = d;
      me = dp;
      mf = 0;
      mg = 0;
      mh = d;
      mi = dp;
      break;
    case 1:
      ma = 0;
      mb = d;
      mc = dp;
      md = dp;
      me = 0;
      mf = d;
      mg = d;
      mh = dp;
      mi = 0;
      break;
    case 2:
      ma = d;
      mb = dp;
      mc = 0;
      md = 0;
      me = d;
      mf = dp;
      mg = dp;
      mh = 0;
      mi = d;
      break;
  }

  r = r * ma + g * mb + b * mc;
  g = r * md + g * me + b * mf;
  b = r * mg + g * mh + b * mi;

  r *= 255;
  g *= 255;
  b *= 255;

  return { r, g, b };
}
function adjustContrast({ r, g, b }, c) {
  r /= 255;
  g /= 255;
  b /= 255;

  r = (r - 0.5) * c + 0.5;
  g = (g - 0.5) * c + 0.5;
  b = (b - 0.5) * c + 0.5;

  r *= 255;
  g *= 255;
  b *= 255;

  return { r, g, b };
}
function adjustSaturation({ r, g, b }, s) {
  const lumR = (1 - s) * 0.3086;
  const lumG = (1 - s) * 0.6094;
  const lumB = (1 - s) * 0.082;

  r /= 255;
  g /= 255;
  b /= 255;

  r = (lumR + s) * r + lumG * g + lumB * b;
  g = lumR * r + (lumG + s) * g + lumB * b;
  b = lumR * r + lumG * g + (lumB + s) * b;

  r *= 255;
  g *= 255;
  b *= 255;
  return { r, g, b };
}
