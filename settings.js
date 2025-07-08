document.addEventListener("DOMContentLoaded", () => {
      const languageInput = document.getElementById("language");
      const responseLanguageInput = document.getElementById("response-language");
      const showComplexitySelect = document.getElementById("show-complexity");
      const responseTypeSelect = document.getElementById("response-type");
      const saveBtn = document.querySelector("button[type='submit']");
      const msg_text = document.getElementById('msg')

      const showActionMessage = (msg) => {
            msg_text.textContent = msg;
            msg_text.style.display = "block";
            setTimeout(() => {
                  msg_text.style.display = "none";
            }, 2000);
          };
    
      // Load previously saved settings
      chrome.storage.sync.get(
        ["language", "responseLanguage", "showComplexity", "responseType"],
        (data) => {
          if (data.language) languageInput.value = data.language;
          if (data.responseLanguage) responseLanguageInput.value = data.responseLanguage;
          if (data.showComplexity) showComplexitySelect.value = data.showComplexity;
          if (data.responseType) responseTypeSelect.value = data.responseType;
        }
      );
    
      // Save settings when button is clicked
      saveBtn.addEventListener("click", () => {
        const newSettings = {
          language: languageInput.value.trim(),
          responseLanguage: responseLanguageInput.value.trim(),
          showComplexity: showComplexitySelect.value,
          responseType: responseTypeSelect.value,
        };
        chrome.storage.sync.set(newSettings, () => {
          showActionMessage("Settings Saved");
        });
      });    
});