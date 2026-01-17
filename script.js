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

// 불티(Ember) 생성 스크립트
function createEmbers() {
  const container = document.getElementById("emberContainer");
  const ember = document.createElement("div");
  ember.className = "ember";

  // 랜덤 속성 부여
  const drift = (Math.random() - 0.5) * 100 + "px"; // 좌우 흔들림
  const duration = Math.random() * 2 + 2 + "s"; // 2~4초 동안 상승

  ember.style.setProperty("--drift", drift);
  ember.style.setProperty("--duration", duration);

  container.appendChild(ember);

  // 애니메이션 끝나면 제거
  setTimeout(() => {
    ember.remove();
  }, 4000);
}

// 0.2초마다 불티 생성
setInterval(createEmbers, 200);

// 1. Scroll Progress & Top Button Logic
const progressBar = document.getElementById("progressBar");
const topBtn = document.getElementById("topBtn");
const shareBtn = document.getElementById("shareBtn");

window.addEventListener("scroll", () => {
  // 프로그레스 바 계산
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrolled + "%";

  // Top 버튼 표시/숨김 (스크롤 300px 이상일 때)
  if (scrollTop > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// Top 버튼 클릭 시
topBtn.addEventListener("click", () => {
  // 부드럽게 위로 이동
  window.scrollTo({ top: 0, behavior: "smooth" });
  // 햅틱 피드백 (모바일 지원 시)
  if (navigator.vibrate) navigator.vibrate(10);
});

// 2. Share Button (Native Share API)
shareBtn.addEventListener("click", async () => {
  // 햅틱 피드백
  if (navigator.vibrate) navigator.vibrate(10);

  const shareData = {
    title: "To Prof. Pyeon",
    text: "편재호 교수님께 드리는 감사 편지",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // PC 등 지원 안 하는 경우 클립보드 복사
      await navigator.clipboard.writeText(window.location.href);
      alert("주소가 복사되었습니다!");
    }
  } catch (err) {
    console.log("Share canceled");
  }
});

// 3. Haptic Feedback on 'Start' Button
const introStartBtn = document.getElementById("startBtn");
if (introStartBtn) {
  introStartBtn.addEventListener("click", () => {
    // 웅장한 진동 (지원 기기만)
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
  });
}
