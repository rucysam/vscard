document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".business-card");
  const emailText = document.querySelector(".email-copy");
  const copyEmailButton = document.querySelector(".copy-email-btn");

  if (card) {
    card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
    card.style.willChange = "transform";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow =
        "0 0 0 1px rgba(235, 137, 194, 0.35), 0 34px 90px rgba(0, 0, 0, 0.85)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow =
        "0 0 0 1px rgba(235, 137, 194, 0.2), 0 24px 80px rgba(0, 0, 0, 0.7)";
    });
  }

  const copyToClipboard = async (text) => {
    if (!text) return false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      return success;
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      return false;
    }
  };

  const showCopyMessage = (target, success) => {
    if (!target) return;

    const originalText = target.textContent;

    target.textContent = success
      ? "이메일 복사 완료"
      : "복사 실패";

    setTimeout(() => {
      target.textContent = originalText;
    }, 1500);
  };

  if (emailText) {
    emailText.style.cursor = "pointer";
    emailText.title = "클릭하면 이메일이 복사됩니다.";

    emailText.addEventListener("click", async () => {
      const email = emailText.dataset.email || emailText.textContent.trim();
      const success = await copyToClipboard(email);

      showCopyMessage(emailText, success);
    });
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
      const email =
        copyEmailButton.dataset.email ||
        emailText?.dataset.email ||
        emailText?.textContent.trim();

      const success = await copyToClipboard(email);

      showCopyMessage(copyEmailButton, success);
    });
  }
});