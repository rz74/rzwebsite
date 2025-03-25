# 🦫 Capy Unlock Puzzle Gate

Welcome to the secret entrance for [Capybara’s Journal](https://hey-capy-pass-here-for-daily-logs.netlify.app/) — but not everyone gets in!

This is a custom-built **puzzle gate** where visitors must unlock access by clicking 4 encrypted images in the correct chronological order.

## 🔐 How It Works

- The site shows **4 randomly chosen encrypted images** out of a hidden set of 10.
- Visitors must click them in the correct chronological order (mapped secretly using index values).
- If the sequence is wrong 2 times:
  - An intense fullscreen overlay says:
    > **"Wrong again? Who are you! Where is capybara?"**
- If it's correct:
  - The puzzle redirects to a hidden Notion journal page (URL is obfuscated via Netlify function).

## 💻 Live Demo

👉 [https://hey-capy-pass-here-for-daily-logs.netlify.app](https://hey-capy-pass-here-for-daily-logs.netlify.app)



## 🔧 Tech Stack

- **Frontend:** HTML + JavaScript
- **Crypto:** AES-GCM with Web Crypto API
- **Hosting:** Netlify
- **Functions:** Netlify Functions for:
  - Returning secret key
  - Obfuscation map
  - Index ordering
  - Notion redirect URL

## 📁 Repo Structure

```bash
.
├── encrypted/              # AES-GCM encrypted image files (.enc)
├── functions/              # Netlify functions
│   ├── get-decryption-key.js
│   ├── get-index-map.js
│   ├── get-obfuscation-map.js
│   └── get-notion-url.js
├── index.html              # Main frontend HTML
├── netlify.toml            # Netlify build config
└── README.md
## 🤝 License & Collaboration

This project is **not open source — yet**. I'm actively working on it and exploring the best way to share it more broadly in the future.

You're welcome to explore the public demo and learn from it, but please **do not copy, reuse, or redistribute** the code, images, or concepts without permission.

📄 See [LICENSE](./LICENSE) for details.

🚀 That said, I'm totally open to collaboration!  
If you're interested in building something similar or want to chat about creative interactive web experiences, feel free to reach out.



---

Thanks for visiting 🐾