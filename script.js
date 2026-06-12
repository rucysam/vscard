document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".business-card");

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

  const emailElement = document.querySelector(".email-copy");

  if (emailElement) {
    emailElement.style.cursor = "pointer";
    emailElement.title = "클릭하면 이메일이 복사됩니다.";

    emailElement.addEventListener("click", async () => {
      const email =
        emailElement.dataset.email || emailElement.textContent.trim();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        const originalText = emailElement.textContent;
        emailElement.textContent = "이메일이 복사되었습니다.";

        setTimeout(() => {
          emailElement.textContent = originalText;
        }, 1500);
      } catch (error) {
        console.error("이메일 복사 실패:", error);
        alert("이메일 복사에 실패했습니다.");
      }
    });
  }

  console.log("웹 명함 카드 기능이 적용되었습니다.");
});