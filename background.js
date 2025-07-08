// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "GREETINGS") {
		sendResponse({response: "Hello from background!"});
	}
});
