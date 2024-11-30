const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const titleInputNode = document.querySelector(".post-title");
const textInputNode = document.querySelector(".post-text");
const postButton = document.querySelector(".post-button");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.getElementById("validationMessage");

postButton.addEventListener("click", function () {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
});

titleInputNode.addEventListener("input", validation); 

textInputNode.addEventListener("input", validation); 

function validation() {
    const titleLength = titleInputNode.value.length;
    const textLength = textInputNode.value.length;

    if (titleLength > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина заголовока не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove("validationMessage_hidden");
        postButton.disabled = true;
        return;
    } 

    if (textLength > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove("validationMessage_hidden");
        postButton.disabled = true;
        return;
        
    } 

    validationMessage.classList.add("validationMessage_hidden");
    postButton.disabled = false;

    if (titleLength === 0 || textLength === 0) {
        validationMessage.innerText = `Заголовок и текст не должны быть пустыми`;
        validationMessage.classList.remove("validationMessage_hidden");
        postButton.disabled = true;
        return;
    } 
};

function getPostFromUser() {
    const title = titleInputNode.value;
    const text = textInputNode.value;

    return {
        title: title,
        text: text,
    };
}

function addPost({ title, text }) {
    const currentDate = new Date();
    const date = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    posts.push({
        date: date,
        title: title,
        text: text,
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHtml = "";

    posts.forEach((post) => {
        postsHtml += `
        <div class="post">
        <p class = "post-date">${post.date}</p>
        <p class = "post-title" style="font-weight: bold;">${post.title}</p>
        <p class = "post-text">${post.text}</p>
        </div>
        `;
    });

    postsNode.innerHTML = postsHtml;
}
