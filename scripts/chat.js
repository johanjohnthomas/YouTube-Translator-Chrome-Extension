import { getCurrentURL } from "./getCurrentURL.js";
import { getTranscript } from "./githubAPIRequests.js";
import { apiKey } from "./apiKey.js";

const CURRENTURL = await getCurrentURL();
let urlSplit = CURRENTURL.split("/");

const URL = `http://127.0.0.1:5000/transcript_text`;

let messages = [];

// Function to create a new message bubble
function createMessageBubble(message, sender) {
  if (sender === "user") {
    messages.push(message);
  }

  const messageContainer = document.getElementById("message-container");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "message",
    sender === "user" ? "user-message" : "computer-message"
  );

  const messageBubbleDiv = document.createElement("div");

  messageBubbleDiv.textContent = message;

  messageDiv.appendChild(messageBubbleDiv);
  messageContainer.appendChild(messageDiv);

  // Scroll to the bottom of the message container
  messageContainer.scrollTop = messageContainer.scrollHeight;
  if (sender === "user") {
    QnA(message).then(function (response) {
      createMessageBubble(response, "computer");
    });
  }
}

let messageResponse;
console.log(urlSplit[2]);
if (urlSplit[2] == "www.youtube.com") {
  let videoID = urlSplit[3];
  messageResponse =
    "Hello! Ask me any question about this YouTube Video and I will try my best to answer!";
} else {
  messageResponse = "Sorry, but this isn't a valid YouTube video.";
}
createMessageBubble(messageResponse, "computer");

const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the input value
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    createMessageBubble(message, "user");

    // Clear the input field
    messageInput.value = "";
  }
});

async function QnA(message) {
  let final;
  let input = await getTranscript(getCurrentURL(), URL);
  input = input.replace(/:\w+:/g, "");
  let source = input.replace(/[^a-zA-Z0-9'.\n]/g, " ");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      context: source,
      question: message,
    }),
  };

  final = await fetch(
    "https://api.ai21.com/studio/v1/experimental/answer",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  return final.answer;
}
