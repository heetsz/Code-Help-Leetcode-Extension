# 💡 LeetCode Helper – Gemini-Powered Chrome Extension

LeetCode Helper is a smart Chrome extension designed to enhance your problem-solving experience on [LeetCode](https://leetcode.com/). It uses Google's **Gemini AI** to provide helpful guidance, explanations, and even code hints – all within the browser, without leaving the LeetCode page.

---

## 🚀 Features

- 🧠 **Gemini AI Integration**  
  Ask Gemini about LeetCode problems and get:
  - Problem breakdowns
  - Step-by-step logic
  - Code (optional)
  - Time and space complexity (if enabled)

- 🗨️ **Floating Chatbot UI**  
  Toggle an interactive chatbot directly from the LeetCode page.

- ⚙️ **Customizable Settings**
  - Programming language (C++, Java, Python, etc.)
  - Response language (English, Hindi, etc.)
  - Response type (Brief / To the Point)
  - Enable or disable time & space complexity explanations

- 🔐 **Secure API Key Management**  
  Save and manage your own Gemini API key from the options page.

---

## 🧩 Installation

1. Clone or download this repository.
2. Open `chrome://extensions` in your Chrome browser.
3. Enable **Developer mode** (top right).
4. Click **"Load unpacked"** and select the project directory.
5. You should now see the extension in your browser bar.

---

## 🛠️ Setup

### 1. Add Your Gemini API Key
1. Click the extension icon → **Options**.
2. Paste your [Gemini API Key](https://makersuite.google.com/app/apikey) and click **Save**.

### 2. Optional Settings
- Choose your preferred:
  - Programming language (for code output)
  - Response language (e.g., English)
  - Response format
  - Complexity display toggle

These settings will be used to personalize each response from Gemini.

---

## 🧪 How It Works

- When you open a LeetCode problem, the extension injects a floating **chatbot button**.
- Click the button to open the Gemini assistant.
- Ask for help, logic, or hints for the current problem.
- Responses are powered by Gemini’s `gemini-1.5-flash` model.

---

## 🛡️ Privacy & Security

- Your API key is stored locally using `chrome.storage.sync`.
- No data is sent to any third-party server except Gemini's official API endpoint.

---

## 🤖 Technologies Used

- JavaScript
- Chrome Extensions API
- Gemini AI (`gemini-1.5-flash`)
- HTML & CSS

---

## 📌 To-Do

- [ ] Add syntax highlighting for code in responses
- [ ] Offline storage of past chats
- [ ] Better error handling (e.g. rate limit, overload fallback)

---

## 📄 License

MIT License — Free to use and modify.

---

## 🙋‍♂️ Created by

**Heet Shah** – [@heetsz](https://github.com/heetsz)  
_For support or feedback, feel free to open an issue or reach out._

