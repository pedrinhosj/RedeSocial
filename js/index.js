import { checkData } from "./dataUser.js";
import { openModal } from "./newPost.js";
import { loadPosts } from "./newPost.js";
import { search } from "./newPost.js";
loadPosts();

const formUpdateData = document.querySelector("form");

formUpdateData.addEventListener("submit", (ev) => {
  ev.preventDefault();
  checkData(ev);
});

document.querySelector("#newPostBtn").addEventListener("click", (ev) => {
  openModal(ev);
});

document.querySelector("#updateUserDataBTn").addEventListener("click", (ev) => {
  if (document.querySelector("#settings").classList.contains("openLeft")) {
    document.querySelector("#settings").classList.remove("openLeft");
  } else {
    document.querySelector("#settings").classList.add("openLeft");
    document.querySelector("aside#modalNewPost").classList.remove("openRight");
    document.querySelector("#newPostBtn").classList.remove("actived");
  }
});

document
  .querySelector("ul li#profile")
  .addEventListener("click", (ev) =>
    formUpdateData.parentElement.classList.remove("close")
  );

document.querySelector("input[type=search]").addEventListener("keyup", search);
