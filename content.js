function getArticleText() {
  const leetcodeDesc = document.querySelector(".question-content, .content__u3I1.question-content__JfgR");
  if (leetcodeDesc) return leetcodeDesc.innerText;

  const article = document.querySelector("article");
  if (article) return article.innerText;

  const paragraphs = Array.from(document.querySelectorAll("p"));
  return paragraphs.map((p) => p.innerText).join("\n");
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_ARTICLE_TEXT") {
    const text = getArticleText();
    sendResponse({ text });
  }
});
