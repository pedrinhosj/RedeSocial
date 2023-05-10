import { userData } from "./previewForm.js";

export function updateData(src) {
  const imgContainer = document.querySelectorAll(".imgUserclass");
  if (src !== "default") {
    imgContainer.forEach((ev) => {
      ev.style.backgroundImage = `url(${src})`;
      ev.style.backgroundSize = "cover";
    });
  }
  document.querySelectorAll(".userName").forEach((ev) => {
    ev.textContent = userData.name;
  });
  document.querySelectorAll(".bioUserclass").forEach((ev) => {
    ev.textContent = userData.bio;
  });
}
function alertForm(name, bio) {
  Swal.fire({
    title: "Confirm?",
    text: `Name: ${name}
    Bio: ${bio}`,
    icon: "question",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Information saved successfully",
      });
      document.querySelector("#formContainer").classList.add("close");
      updateData(userData.src);
    }
  });
}
export function checkData(ev) {
  const { fileInput } = userData;
  const [file] = fileInput.files;

  if (!file) {
    userData.src = "default";
  } else {
    userData.src = file.src;
  }
  userData.name = ev.currentTarget
    .querySelector("#nameUser-input")
    .value.trim();
  userData.bio =
    ev.currentTarget.querySelector("#bioUser-input").value.trim() ||
    "I am a user without bio";

  alertForm(userData.name, userData.bio);
}
