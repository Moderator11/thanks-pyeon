/** 1. Data Config */
const rollingPapersData = [
  {
    name: "김OO",
    contents:
      "교수님, 수업 덕분에 정말 많은 것을 배웠습니다. 항상 건강하시고 행복한 연말 보내세요! 앞으로도 자주 찾아뵙겠습니다.",
  },
  {
    name: "이OO",
    contents:
      "부족한 저를 이끌어주셔서 감사합니다. 교수님의 따뜻한 조언이 큰 힘이 되었습니다. 메리 크리스마스! 🎄",
  },
  {
    name: "박OO",
    contents:
      "졸업하고 나서야 교수님의 말씀이 얼마나 귀한지 깨닫습니다. 항상 존경합니다. 감기 조심하세요!",
  },
  {
    name: "최OO",
    contents:
      "교수님과 함께했던 모든 시간들이 저희에게는 선물 같았습니다. 이 페이지에 저희의 감사한 마음을 꾹꾹 눌러 담아 보냅니다. 사랑합니다 교수님!",
  },
];

const galleryImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

/** 2. Mix Content Logic (Interleaved) */
function getMixedContent() {
  const textItems = rollingPapersData.map((item) => ({
    type: "text",
    data: item,
  }));
  const imageItems = galleryImages.map((filename) => ({
    type: "image",
    src: `./resources/image/${filename}`,
  }));
  const combined = [];
  const maxLength = Math.max(textItems.length, imageItems.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < textItems.length) combined.push(textItems[i]);
    if (i < imageItems.length) combined.push(imageItems[i]);
  }
  return combined;
}

/** 3. Render */
const papersSection = document.getElementById("papersSection");
const mixedContent = getMixedContent();

mixedContent.forEach((item) => {
  let element;
  if (item.type === "text") {
    element = document.createElement("div");
    element.className = "card";
    const name = item.data.name ? item.data.name.trim() : "익명";
    element.innerHTML = `<div class="contents">${item.data.contents}</div><div class="name-wrapper"><div class="name">${name}</div></div>`;
  } else {
    element = document.createElement("div");
    element.className = "photo-frame";
    element.innerHTML = `<img src="${item.src}" alt="Memory Photo" loading="lazy" />`;
  }
  papersSection.appendChild(element);
});

/** 4. Intro & Audio */
const introOverlay = document.getElementById("introOverlay");
const startBtn = document.getElementById("startBtn");
const heroCard = document.getElementById("heroCard");
const bgMusic = document.getElementById("bgMusic");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
let isPlaying = false;

function updateIcon(playing) {
  if (playing) {
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
  } else {
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
  }
}

startBtn.addEventListener("click", () => {
  introOverlay.classList.add("hidden");
  bgMusic
    .play()
    .then(() => {
      isPlaying = true;
      updateIcon(true);
    })
    .catch((e) => console.error("Audio Error:", e));

  setTimeout(() => {
    heroCard.classList.add("show");
  }, 500);
  setTimeout(() => {
    introOverlay.style.display = "none";
  }, 1000);
});

const musicControl = document.getElementById("musicControl");
musicControl.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
  } else {
    bgMusic.play();
    isPlaying = true;
  }
  updateIcon(isPlaying);
});

/** 5. Snow & Observer */
function createSnowflakes() {
  const container = document.getElementById("snowContainer");
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.fontSize = Math.random() * 15 + 10 + "px";
    snowflake.style.opacity = Math.random() * 0.6 + 0.2;
    snowflake.style.animationDuration = Math.random() * 5 + 8 + "s";
    snowflake.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(snowflake);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

// 일반 카드, 사진, 그리고 마지막 스페셜 카드도 관찰 대상에 포함
document.querySelectorAll(".card, .photo-frame, .final-card").forEach((el) => {
  observer.observe(el);
});

window.addEventListener("load", () => {
  createSnowflakes();
});

// Timer Script
// [설정] 처음 만난 날짜를 수정하세요 (YYYY-MM-DD)
const startDate = new Date("2025-12-28");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // +1일 (당일 포함)

  // 숫자 카운팅 애니메이션 효과
  const counterElement = document.getElementById("dDayCount");
  let current = 0;
  const increment = Math.ceil(days / 100); // 속도 조절

  const timer = setInterval(() => {
    current += increment;
    if (current >= days) {
      current = days;
      clearInterval(timer);
    }
    counterElement.innerText = current.toLocaleString() + "일";
  }, 20);
}

// 기존 window.onload 안에 추가하거나 별도로 실행
window.addEventListener("load", updateCounter);
