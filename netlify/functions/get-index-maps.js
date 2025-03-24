<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-QMX90CZV86"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QMX90CZV86');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secret Journal Access</title>
  <style>
    body {
      background: #111;
      color: #fff;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    h1 {
      margin-bottom: 2rem;
      animation: fadeIn 1s ease-out;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 200px);
      gap: 20px;
      opacity: 0;
      animation: fadeIn 1s ease-out 0.5s forwards;
    }
    .grid img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border: 4px solid transparent;
      border-radius: 12px;
      cursor: pointer;
      transition: border 0.2s, transform 0.3s;
    }
    .grid img.clicked {
      border-color: #00ffaa;
      transform: scale(1.05);
    }
    #error {
      color: #ff6b6b;
      margin-top: 1rem;
    }
    #overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      color: #fff;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      display: none;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <h1>Enter the Secret Sequence Capy~</h1>
  <div class="grid" id="image-grid"></div>
  <div id="error"></div>
  <div id="overlay">WHE ARE YOU? WHERE IS CAPYBARA!</div>

  <script>
    const allImages = [
      "coffee_in_soho.jpg",
      "watermelon_from_wf.jpg",
      "rock_climbing.jpg",
      "museum_of_s.jpg",
      "sleep_no_more.jpg",
      "life_and_trust.jpg",
      "cutting_xmax_tree.jpg",
      "chinese_new_year.jpg",
      "capy_neon_light.jpg",
      "fogo_magic.jpg"
    ];

    const grid = document.getElementById("image-grid");
    const errorDiv = document.getElementById("error");
    const overlay = document.getElementById("overlay");

    let userSequence = [];
    let failCount = 0;

    async function fetchIndexMap() {
      const res = await fetch("/.netlify/functions/get-index-map");
      return await res.json();
    }

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    async function init() {
      const indexMap = await fetchIndexMap();
      const selected = shuffle(allImages).slice(0, 4);
      const correctOrder = selected
        .slice()
        .sort((a, b) => indexMap[a] - indexMap[b]);

      selected.forEach(filename => {
        const img = document.createElement("img");
        img.src = filename;
        img.alt = filename;
        img.dataset.filename = filename;
        img.style.opacity = 0;
        img.style.transform = "scale(0.8)";

        setTimeout(() => {
          img.style.transition = "opacity 0.5s, transform 0.5s";
          img.style.opacity = 1;
          img.style.transform = "scale(1)";
        }, 700);

        img.addEventListener("click", () => {
          if (userSequence.length >= 4) return;

          img.classList.add("clicked");
          userSequence.push(filename);

          if (userSequence.length === 4) {
            const isCorrect = userSequence.every((val, i) => val === correctOrder[i]);
            if (isCorrect) {
              window.location.href = "https://www.notion.so/1bfb0041173180758799d683acc2f0e6?v=1bfb0041173180428c20000c514d2e70";
            } else {
              failCount++;
              errorDiv.textContent = "Incorrect sequence. Try again.";
              document.querySelectorAll(".grid img").forEach(i => i.classList.remove("clicked"));
              userSequence = [];
              if (failCount >= 2) {
                overlay.style.display = "flex";
                setTimeout(() => {
                  overlay.style.display = "none";
                }, 3000);
                failCount = 0;
              }
            }
          }
        });
        grid.appendChild(img);
      });
    }

    init();
  </script>
</body>
</html>
