const getAspectRatio = (width, height) => {
  return width / height;
};
const getWidthFromRatio = (height, aspectRatio) => {
  return height * aspectRatio;
};
const getHeightFromRatio = (width, aspectRatio) => {
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
const changeImageWidth = (image, width, aspectRatio, maintainAspectRatio) => {
  if (maintainAspectRatio) {
    const newHeight = getHeightFromRatio(width, aspectRatio);
    image.width = width;
    image.height = newHeight;
  } else {
    image.width = width;
  }
};
const changeImageHeight = (image, height, aspectRatio, maintainAspectRatio) => {
  if (maintainAspectRatio) {
    const newWidth = getWidthFromRatio(height, aspectRatio);
    image.width = newWidth;
    image.height = height;
  } else {
    image.height = height;
  }
};

const isChecked = (checkbox) => {
  return checkbox.checked === true;
};
const getCoordinates = (
  position,
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight
) => {
  const xCenter = canvasWidth / 2 - imageWidth / 2;
  const yCenter = canvasHeight / 2 - imageHeight / 2;
  switch (position) {
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
  const [x, y] = getCoordinates(
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
const saveImage = (canvas) => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "download.png";
  link.href = image;
  link.click();
};
const canvas = document.querySelector("canvas");
const baseImageInput = document.getElementById("baseImageInput");
const watermarkImageInput = document.getElementById("watermarkImageInput");
const baseImageWidthInput = document.getElementById("baseImageWidth");
const baseImageHeightInput = document.getElementById("baseImageHeight");
const baseImageAspectChecked = document.getElementById("baseImageRatioChecked");
const watermarkImageWidthInput = document.getElementById("watermarkImageWidth");
const watermarkImageHeightInput = document.getElementById(
  "watermarkImageHeight"
);
const watermarkImageAspectChecked = document.getElementById(
  "watermarkImageRatioChecked"
);
const positionInput = document.getElementById("watermarkImagePositionInput");
const alphaInput = document.getElementById("watermarkImageAlpha");
const watermarkButton = document.getElementById("watermarkButton");
const inputForm = document.getElementById("inputForm");
const saveButton = document.getElementById("saveButton");
let baseImage;
let watermarkImage;
let baseImageAspectRatio;
let watermarkImageAspectRatio;

inputForm.addEventListener("input", () => {
  if (!baseImage || !watermarkImage) {
    watermarkButton.disabled = true;
  } else {
    watermarkButton.disabled = false;
  }
});
baseImageInput.addEventListener("input", (e) => {
  getImage(e, (img) => {
    baseImage = img;
    baseImageAspectRatio = getAspectRatio(img.width, img.height);
    updateImageSizeValueDOM(img, baseImageWidthInput, baseImageHeightInput);
  });
});
watermarkImageInput.addEventListener("input", (e) => {
  getImage(e, (img) => {
    watermarkImage = img;
    watermarkImageAspectRatio = getAspectRatio(img.width, img.height);
    updateImageSizeValueDOM(
      img,
      watermarkImageWidthInput,
      watermarkImageHeightInput
    );
  });
});
baseImageWidthInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageWidth(
    baseImage,
    value,
    baseImageAspectRatio,
    isChecked(baseImageAspectChecked)
  );
  updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
});
baseImageHeightInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageHeight(
    baseImage,
    value,
    baseImageAspectRatio,
    isChecked(baseImageAspectChecked)
  );
  updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
});

watermarkImageWidthInput.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  changeImageWidth(
    watermarkImage,
    value,
    watermarkImageAspectRatio,
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
  changeImageHeight(
    watermarkImage,
    value,
    watermarkImageAspectRatio,
    isChecked(watermarkImageAspectChecked)
  );
  updateImageSizeValueDOM(
    watermarkImage,
    watermarkImageWidthInput,
    watermarkImageHeightInput
  );
});
watermarkButton.addEventListener("click", () => {
  const alpha = parseInt(alphaInput.value) / 100;
  watermark(canvas, baseImage, watermarkImage, positionInput.value, alpha);
  saveButton.disabled = false;
});
saveButton.addEventListener("click", () => {
  saveImage(canvas);
});
