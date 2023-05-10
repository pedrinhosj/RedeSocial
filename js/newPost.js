import { updateData } from "./dataUser.js";
import { userData } from "./previewForm.js";

export function loadPosts() {
  if (localStorage.getItem("number") === null) return;
  for (let i = localStorage.getItem("number") - 1; i !== 0; i--) {
    const li = document.createElement("li");
    li.classList.add("postCard");
    let post;
    if (!checkRepeat(i, li)) {
      post = localStorage.getItem(`post-${i - 1}`);
    } else {
      post = localStorage.getItem(`post-${i}`);
    }
    li.innerHTML = post;
  }
  const icon = document.querySelectorAll(".postCard span.interactions i.fa-x");
  for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener("click", removePost);
  }
}

function checkRepeat(id, li) {
  if (localStorage.getItem(`post-${id}`) === null) {
    return false;
  } else {
    const ul = document.querySelector("section#posts ul");
    if (li.innerHTML === localStorage.getItem(`post-${id}`)) {
      return false;
    } else {
      ul.appendChild(li);
      return true;
    }
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

function newPost(title, text) {
  let id =
    localStorage.getItem("number") === null
      ? 1
      : localStorage.getItem("number");

  const newPost = document.createElement("li");
  newPost.classList.add("postCard");

  newPost.innerHTML = `
  <div class="imgUserclass"></div>
          <span>
            <h4 class="userName">Pedro</h4>
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

  localStorage.setItem(`post-${id}`, newPost.innerHTML);
  id++;
  localStorage.setItem("number", id);

  updateData(userData.src);

  document.querySelector("aside#modalNewPost").classList.remove("openRight");
  document.querySelector("#newPostBtn").classList.remove("actived");
  clearPosts();
  loadPosts();
}

document.getElementById("newPostForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const title = ev.target.parentElement.querySelector("input#title");
  const text = ev.target.parentElement.querySelector("input#text");

  newPost(title.value.trim(), text.value.trim());
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
//   posts.forEach((post) => {
//     if (
//       !post
//         .querySelector("span.content h4")
//         .textContent.includes(ev.target.value.trim()) &&
//       ev.target.value.trim() !== ""
//     ) {
//       post.style.display = "none";
//     } else {
//       post.style.display = "flex";
//     }
//   });
// }
