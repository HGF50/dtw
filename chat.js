const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("chat-message").value.trim();
    if(msg){
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerText = msg;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
        chatForm.reset();
    }
});
