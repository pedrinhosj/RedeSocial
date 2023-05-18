import { updateData } from "./dataUser.js";
import { userData } from "./previewForm.js";

class Post {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.id = Number(localStorage.getItem("numberID")) || 1;
    localStorage.setItem("numberID", this.id + 1);

    localStorage.setItem(`post-${this.id}`, JSON.stringify(this));
    createElement(this.title, this.text, this.id);
    document.querySelector("aside#modalNewPost").classList.remove("openRight");
    document.querySelector("#newPostBtn").classList.remove("actived");
  }
}

function createElement(title, text, id) {
  const ul = document.querySelector("section#posts ul");
  const newPost = document.createElement("li");
  newPost.classList.add("postCard");

  newPost.innerHTML = `
  <div class="imgUserclass"></div>
          <span>
            <h4 class="userName">name undefined</h4>
            <p>${new Date().getDate()}/${new Date().getMonth() + 1}</p>
            <p class="idPost">${id}</p>
          </span>

          <span class="interactions">
            <i class="fa-solid fa-x"></i>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-comment"></i>
          </span>

          <span class="content">
            <h4>${title}</h4>
            <p class="post">${text}</p>
          </span>
  `;
  ul.appendChild(newPost);
  newPost.querySelector(".fa-x").addEventListener("click", removePost);
  updateData(userData.src);
}

export function loadPosts() {
  if (localStorage.getItem("numberID") === null) return;

  for (let i = localStorage.getItem("numberID") - 1; i > 0; i--) {
    if (localStorage.getItem(`post-${i}`) === null) continue;

    const post = JSON.parse(localStorage.getItem(`post-${i}`));
    createElement(post.title, post.text, post.id);
  }
}

export function removePost(ev) {
  const id =
    ev.target.parentElement.parentElement.querySelector(
      "span .idPost"
    ).textContent;
  localStorage.removeItem(`post-${id}`);
  ev.target.parentElement.parentElement.remove();
}

document.getElementById("newPostForm").addEventListener("submit", (ev) => {
  ev.preventDefault();

  const title = ev.target.parentElement.querySelector("input#title");
  const text = ev.target.parentElement.querySelector("input#text");
  const newPost = new Post(title.value, text.value);
  clearPosts();
  loadPosts();
  title.value = "";
  text.value = "";
});

export function openModal(ev) {
  if (ev.target.classList.contains("actived")) {
    document.querySelector("aside#modalNewPost").classList.remove("openRight");
    ev.target.classList.remove("actived");
  } else {
    document.querySelector("aside#modalNewPost").classList.add("openRight");
    ev.target.classList.add("actived");
    document.querySelector("#settings").classList.remove("openLeft");
  }
}

function clearPosts() {
  const Posts = document.querySelectorAll("section#posts ul li");

  Posts.forEach((el) => el.remove());
}

export function search(ev) {
  const posts = document.querySelectorAll("#posts ul li");

  for (const post of posts) {
    if (
      !post
        .querySelector("span.content h4")
        .textContent.includes(ev.target.value.trim()) &&
      ev.target.value.trim() !== ""
    ) {
      post.style.display = "none";
    } else {
      post.style.display = "flex";
    }
  }
}
