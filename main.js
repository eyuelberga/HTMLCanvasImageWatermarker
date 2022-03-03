const getAspectRatio = (width, height) => {
  return width / height;
};
const getWidth = (height, aspectRatio) => {
  return height * aspectRatio;
};
const getHeight = (width, aspectRatio) => {
  return width / aspectRatio;
};
const getImage = (e, callback) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const image = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        callback(img);
      };
    };
  }
};
const changeImageSize = (
  image,
  originalWidth,
  originalHeight,
  width,
  height,
  maintainAspectRatio
) => {
  if (maintainAspectRatio) {
    const aspectRatio = getAspectRatio(originalWidth, originalHeight);
    if (height) {
      const newWidth = getWidth(height, aspectRatio);
      image.width = newWidth;
      image.height = height;
    } else if (width) {
      const newHeight = getHeight(width, aspectRatio);
      image.width = width;
      image.height = newHeight;
    } else {
      throw new Error("height or width not specified");
    }
  } else {
    if (width) {
      image.width = width;
    } else if (height) {
      image.height = height;
    } else {
      throw new Error("height or width not specified");
    }
  }
};
const isChecked = (ref) => {
  return ref.checked === true;
};
const getPositions = (
  pos,
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight
) => {
  const xCenter = canvasWidth / 2 - imageWidth / 2;
  const yCenter = canvasHeight / 2 - imageHeight / 2;
  switch (pos) {
    case "top-left":
      return [0, 0];
    case "top-center":
      return [xCenter, 0];
    case "top-right":
      return [canvasWidth - imageWidth, 0];
    case "bottom-left":
      return [0, canvasHeight - imageHeight];
    case "bottom-center":
      return [xCenter, canvasHeight - imageHeight];
    case "bottom-right":
      return [canvasWidth - imageWidth, canvasHeight - imageHeight];
    case "center":
      return [xCenter, yCenter];
    default:
      return [0, 0];
  }
};
const updateImageSizeValueDOM = (image, widthInput, heightInput) => {
  widthInput.value = image.width;
  heightInput.value = image.height;
};
const watermark = (canvas, baseImage, watermarkImage, position, alpha) => {
  const ctx = canvas.getContext("2d");
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
  ctx.globalAlpha = alpha;
  const [x, y] = getPositions(
    position,
    watermarkImage.width,
    watermarkImage.height,
    baseImage.width,
    baseImage.height
  );
  ctx.drawImage(
    watermarkImage,
    x,
    y,
    watermarkImage.width,
    watermarkImage.height
  );
};
const canvas = document.querySelector("canvas");
let baseImage;
let watermarkImage;
const baseImageDimensions = {
  width: 0,
  height: 0,
};
const watermarkImageDimensions = {
  width: 0,
  height: 0,
};
document.getElementById("inputForm").addEventListener("input", (e) => {
  if (!baseImage || !watermarkImage) {
    watermarkButton.disabled = true;
  } else {
    watermarkButton.disabled = false;
  }
});
const baseImageInput = document.getElementById("baseImageInput");
baseImageInput.addEventListener("input", (e) => {
  getImage(e, (img) => {
    baseImage = img;
    console.log([img.width, img.height]);
    baseImageDimensions.width = img.width;
    baseImageDimensions.height = img.height;
    updateImageSizeValueDOM(img, baseImageWidthInput, baseImageHeightInput);
  });
});
const watermarkImageInput = document.getElementById("watermarkImageInput");
watermarkImageInput.addEventListener("input", (e) => {
  getImage(e, (img) => {
    watermarkImage = img;
    console.log([img.width, img.height]);
    watermarkImageDimensions.height = img.height;
    watermarkImageDimensions.width = img.width;
    updateImageSizeValueDOM(
      img,
      watermarkImageWidthInput,
      watermarkImageHeightInput
    );
  });
});
const baseImageWidthInput = document.getElementById("baseImageWidth");
const baseImageHeightInput = document.getElementById("baseImageHeight");
const baseImageAspectChecked = document.getElementById("baseImageRatioChecked");
baseImageWidthInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageSize(
    baseImage,
    baseImageDimensions.width,
    baseImageDimensions.height,
    value,
    null,
    isChecked(baseImageAspectChecked)
  );
  updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
});
baseImageHeightInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageSize(
    baseImage,
    baseImageDimensions.width,
    baseImageDimensions.height,
    null,
    value,
    isChecked(baseImageAspectChecked)
  );
  updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
});

const watermarkImageWidthInput = document.getElementById("watermarkImageWidth");
const watermarkImageHeightInput = document.getElementById(
  "watermarkImageHeight"
);
const watermarkImageAspectChecked = document.getElementById(
  "watermarkImageRatioChecked"
);
watermarkImageWidthInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageSize(
    watermarkImage,
    watermarkImageDimensions.width,
    watermarkImageDimensions.height,
    value,
    null,
    isChecked(watermarkImageAspectChecked)
  );
  updateImageSizeValueDOM(
    watermarkImage,
    watermarkImageWidthInput,
    watermarkImageHeightInput
  );
});
watermarkImageHeightInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageSize(
    watermarkImage,
    watermarkImageDimensions.width,
    watermarkImageDimensions.height,
    null,
    value,
    isChecked(watermarkImageAspectChecked)
  );
  updateImageSizeValueDOM(
    watermarkImage,
    watermarkImageWidthInput,
    watermarkImageHeightInput
  );
});
const positionInput = document.getElementById("watermarkImagePositionInput");
const alphaInput = document.getElementById("watermarkImageAlpha");
const watermarkButton = document.getElementById("watermarkButton");
watermarkButton.addEventListener("click", () => {
  const alpha = parseInt(alphaInput.value) / 100;
  watermark(canvas, baseImage, watermarkImage, positionInput.value, alpha);
});
