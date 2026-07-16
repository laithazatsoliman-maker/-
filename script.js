const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startExperience");

const cinematicIntro = document.getElementById("cinematicIntro");
const cinematicVideo = document.getElementById("cinematicVideo");
const sceneCounter = document.getElementById("sceneCounter");
const skipButton = document.getElementById("skipButton");

const weddingContent = document.getElementById("weddingContent");

const weddingMusic = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

const videoScenes = [
    "videos/intro.mp4",
    "videos/envelope.mp4"
];

const sceneNumbers = ["١ / ٢", "٢ / ٢"];;

let currentScene = 0;
let musicPlaying = false;
let experienceStarted = false;

function loadScene(index) {
    currentScene = index;

    cinematicVideo.src = videoScenes[index];
    sceneCounter.textContent = sceneNumbers[index];

    cinematicVideo.load();

    cinematicVideo.play().catch(function () {
        console.log("تعذر تشغيل الفيديو.");
    });
}

function showInvitation() {
    cinematicVideo.pause();

    cinematicIntro.style.transition = "opacity 1.1s ease";
    cinematicIntro.style.opacity = "0";

    setTimeout(function () {
        cinematicIntro.style.display = "none";
        weddingContent.classList.add("show");

        document.body.style.overflowY = "auto";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1100);
}

startButton.addEventListener("click", function () {
    if (experienceStarted) return;

    experienceStarted = true;

    startScreen.style.transition = "opacity 0.9s ease";
    startScreen.style.opacity = "0";

    weddingMusic.play()
        .then(function () {
            musicPlaying = true;
            musicButton.classList.add("playing");
            musicButton.textContent = "❚❚";
        })
        .catch(function () {
            console.log("الموسيقى غير موجودة حاليًا أو منع المتصفح تشغيلها.");
        });

    setTimeout(function () {
        startScreen.style.display = "none";

        cinematicIntro.classList.add("show");
        cinematicIntro.style.opacity = "1";

        document.body.style.overflow = "hidden";

        loadScene(0);
    }, 900);
});

cinematicVideo.addEventListener("ended", function () {
    cinematicVideo.classList.add("video-fade-out");

    setTimeout(function () {
        if (currentScene < videoScenes.length - 1) {
            loadScene(currentScene + 1);

            cinematicVideo.classList.remove("video-fade-out");
            cinematicVideo.classList.add("video-fade-in");

            setTimeout(function () {
                cinematicVideo.classList.remove("video-fade-in");
            }, 900);

        } else {
            showInvitation();
        }
    }, 700);
});

skipButton.addEventListener("click", function () {
    showInvitation();
});

musicButton.addEventListener("click", function () {
    if (musicPlaying) {
        weddingMusic.pause();
        musicPlaying = false;

        musicButton.classList.remove("playing");
        musicButton.textContent = "♫";
    } else {
        weddingMusic.play()
            .then(function () {
                musicPlaying = true;

                musicButton.classList.add("playing");
                musicButton.textContent = "❚❚";
            })
            .catch(function () {
                console.log("أضف ملف الموسيقى أولًا.");
            });
    }
});

/* العداد التنازلي */
const weddingDate = new Date("2027-04-16T18:00:00").getTime();

function updateCountdown() {
    const distance = weddingDate - Date.now();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (distance <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    daysElement.textContent = days;
    hoursElement.textContent =
        String(hours).padStart(2, "0");
    minutesElement.textContent =
        String(minutes).padStart(2, "0");
    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);