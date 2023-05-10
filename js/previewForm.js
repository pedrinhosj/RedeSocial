export const userData = {};
const fileInput = document.getElementById("file");
userData.fileInput = fileInput;

fileInput.addEventListener("change", () => {
  const [file] = fileInput.files;
  file.src = URL.createObjectURL(file);
  if (file) {
    const previewContainer = document.querySelector(".previewImg-form");
    previewContainer.style.backgroundImage = `url(${file.src})`;
    previewContainer.style.backgroundSize = "cover";
  }
});
