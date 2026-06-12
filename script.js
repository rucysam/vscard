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

  const valueItems = document.querySelectorAll(".value");

  valueItems.forEach((item) => {
    const text = item.textContent.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

    if (!isEmail) return;

    item.style.cursor = "pointer";
    item.title = "클릭하면 이메일이 복사됩니다.";

    item.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);

        const originalText = item.textContent;
        item.textContent = "이메일이 복사되었습니다.";

        setTimeout(() => {
          item.textContent = originalText;
        }, 1500);
      } catch (error) {
        console.error("클립보드 복사 실패:", error);
        alert("이메일 복사에 실패했습니다. 브라우저 권한을 확인해주세요.");
      }
    });
  });

  console.log("웹 명함 카드 기능이 적용되었습니다.");
});