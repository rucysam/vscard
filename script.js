document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".business-card");
  const emailText = document.querySelector(".email-copy");
  const copyEmailButton = document.querySelector(".copy-email-btn");
  const githubButton = document.querySelector(".github-btn");

  // 카드 Hover 효과
  if (card) {
    card.style.transition =
      "transform 0.25s ease, box-shadow 0.25s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow =
        "0 0 0 1px rgba(235,137,194,0.35), 0 34px 90px rgba(0,0,0,0.85)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow =
        "0 0 0 1px rgba(235,137,194,0.2), 0 24px 80px rgba(0,0,0,0.7)";
    });
  }

  // 클립보드 복사 함수
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const copied = document.execCommand("copy");

      document.body.removeChild(textarea);

      return copied;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // 버튼 메시지 표시
  function showMessage(button, success) {
    if (!button) return;

    const original = button.textContent;

    button.textContent = success
      ? "복사 완료 ♥"
      : "복사 실패";

    setTimeout(() => {
      button.textContent = original;
    }, 1500);
  }

  // 이메일 텍스트 클릭 복사
  if (emailText) {
    emailText.style.cursor = "pointer";

    emailText.addEventListener("click", async () => {
      const email =
        emailText.dataset.email ||
        emailText.textContent.trim();

      const success = await copyToClipboard(email);

      showMessage(emailText, success);
    });
  }

  // 이메일 보내기 버튼 → 이메일 복사
  if (copyEmailButton) {
    copyEmailButton.addEventListener(
      "click",
      async (event) => {
        event.preventDefault();

        const email =
          copyEmailButton.dataset.email ||
          emailText?.dataset.email ||
          "hello@example.com";

        const success =
          await copyToClipboard(email);

        showMessage(copyEmailButton, success);
      }
    );
  }

  // Github 버튼 이동
  if (githubButton) {
    githubButton.addEventListener("click", () => {
      window.open(
        "https://github.com/rucysam",
        "_blank"
      );
    });
  }

  console.log("웹 명함 카드 로드 완료");
});