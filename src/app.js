const form = document.getElementById("contact-form");
const message = document.getElementById("message");

function setMessage(text, ok = true) {
  if (!message) return;
  message.textContent = text;
  message.className = `message ${ok ? "ok" : "err"}`;
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");

    const name = nameEl ? nameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";

    if (!name || !email) {
      setMessage("Please fill in name and email.", false);
      return;
    }

    setMessage(`Thanks, ${name}! I will contact you at ${email}.`, true);
    form.reset();
  });
}

function copyTextFallback(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, ta.value.length);

  try {
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    document.body.removeChild(ta);
    return false;
  }
}

function setupCopyEmail() {
  const card = document.querySelector(".copy-email");
  if (!card) return;

  const hint = card.querySelector(".copy-hint");
  const originalHint = hint ? hint.textContent : "Click to copy";

  const showCopied = () => {
    card.classList.add("copied");
    if (hint) hint.textContent = "Copied!";
    setTimeout(() => {
      card.classList.remove("copied");
      if (hint) hint.textContent = originalHint;
    }, 2000);
  };

  const copy = async () => {
    const email = card.dataset.email;
    if (!email) return;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        showCopied();
        return;
      } catch {
      }
    }

    const ok = copyTextFallback(email);
    if (ok) {
      showCopied();
    } else {
      alert(`Copy this email: ${email}`);
    }
  };

  card.addEventListener("click", copy);

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copy();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupCopyEmail();
});

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  const main = document.querySelector("main");
  if (main) main.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});
