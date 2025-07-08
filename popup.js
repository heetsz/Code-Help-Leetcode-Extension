document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
    const url = tab.url;
    const sendBtn = document.getElementById("send-btn");
    const resultDiv = document.getElementById("chat-display");

    if (!url.includes("https://leetcode.com/")) {
      resultDiv.innerText = "Please visit a LeetCode problem page to use the chatbot.";
      return;
    }

    sendBtn.addEventListener("click", async () => {
      resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';

      try {
        // Get API key from storage
        const storage = await new Promise((resolve) => {
          chrome.storage.sync.get(
            ["api", "language", "responseLanguage", "showComplexity", "responseType"],
            resolve
          );
        });

        const { api, language, responseLanguage, showComplexity, responseType } = storage;

        if (!api) {
          resultDiv.innerText = "API key not found. Please set your API key in the extension options.";
          return;
        }

        // Get LeetCode problem text from content script
        const problemText = await new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, (res) => {
            if (chrome.runtime.lastError || !res || !res.text) {
              reject(new Error("Could not extract LeetCode question from this page."));
            } else {
              resolve(res.text);
            }
          });
        });

        // Generate summary
        const summary = await getGeminiSummary(
          problemText,
          language,
          responseLanguage,
          api,
          responseType,
          "pls", // Purpose
          showComplexity
        );

        resultDiv.innerText = summary;

      } catch (error) {
        resultDiv.innerText = `❌ Error: ${error.message || "Something went wrong."}`;
        console.error("Popup error:", error);
      }
    });
  });
});

// Utility function to send request to Gemini API
async function getGeminiSummary(text, pl, rl, apiKey, type, intent, tc) {
  let prompt = `LeetCode question description: ${text}
Respond in: ${rl}
Code in: ${pl}
Response type: ${type}
Intent: ${intent}`;

  if (tc === "on") {
    prompt += `\nAlso provide time and space complexity.`;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP ${response.status} Error`);
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "❗ Gemini did not return any content."
  );
}
