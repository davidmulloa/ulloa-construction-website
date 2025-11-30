// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

if (lightbox && lightboxImg && lightboxCaption) {
  document.querySelectorAll(".gallery-card img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      const fig = img.closest("figure");
      const cap = fig ? fig.querySelector("figcaption") : null;
      lightboxCaption.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target.dataset.lightboxClose !== undefined || e.target === lightbox) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });
}

// Chat widget logic
const API_URL = "https://ulloa-chat-backend.onrender.com/chat";

const chatWidget = document.getElementById("chat-widget");
const chatHeader = document.getElementById("chat-header");
const chatToggle = document.getElementById("chat-toggle");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// conversation history (user + assistant messages)
let chatHistory = []; // [{ role: "user"|"assistant", content: "..." }]

function addChatMessage(text, who) {
  const div = document.createElement("div");
  div.className = "chat-msg " + who;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Minimize / expand behavior
if (chatHeader && chatWidget && chatToggle) {
  let collapsed = false;

  chatHeader.addEventListener("click", () => {
    collapsed = !collapsed;
    chatWidget.classList.toggle("collapsed", collapsed);
    chatToggle.textContent = collapsed ? "+" : "–";
  });
}

// Submit handler with history
if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // show user message on screen
    addChatMessage(text, "user");
    chatInput.value = "";

    // add to history
    chatHistory.push({ role: "user", content: text });

    // temporary "thinking..." bubble
    addChatMessage("Thinking...", "bot");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong.";

      // replace "Thinking..." message with real reply
      chatMessages.lastChild.textContent = reply;

      // save assistant reply to history
      chatHistory.push({ role: "assistant", content: reply });
    } catch (err) {
      console.error(err);
      chatMessages.lastChild.textContent =
        "Error reaching the chat server. Please try again later.";
    }
  });
}

