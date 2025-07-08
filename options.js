document.addEventListener("DOMContentLoaded", () => {
      chrome.storage.sync.get(["api", "api_last_added"], (result) => {
        const api_text = document.getElementById('api-status');
        const add_api_btn = document.getElementById('add-api-button');
        const delete_api = document.getElementById('delete-api-button');
        const add_api = document.getElementById('api-settings');
        const api_input = document.getElementById('api');
        const save_btn = document.getElementById('save-button');
        const api_action = document.getElementById('api-action');
        const popup = document.getElementById('popup');


        const showActionMessage = (msg) => {
          api_action.textContent = msg;
          api_action.style.display = "block";
          setTimeout(() => {
            api_action.style.display = "none";
          }, 2000);
        };
    
        const showHome = () => {
          popup.style.display = "block";
          setTimeout(() => {
            popup.style.display = "none";
          }, 5000);
        };
    
        if (result.api && result.api.trim() !== "") {
          const lastAdded = result.api_last_added
            ? new Date(result.api_last_added).toLocaleString()
            : "Unknown date";
        api_text.textContent = `Your API was last added on ${new Date(result.api_last_added).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
          api_text.style.display = "block";
          add_api_btn.style.display = "block";
          delete_api.style.display = "block";
    
          add_api_btn.onclick = () => {
            add_api.style.display = "block";
            add_api_btn.style.display = "none";
          };
    
          delete_api.onclick = () => {
            chrome.storage.sync.remove(["api", "api_last_added"]);
            showActionMessage("API DELETED");
            delete_api.style.display = "none";
            add_api.style.display = "none";
            add_api_btn.style.display = "block";
            api_text.textContent = "Please add your API";
          };
        } else {
          api_text.textContent = "Please add your API";
          api_text.style.display = "block";
          add_api.style.display = "block";
        }
    
        api_input.addEventListener('input', () => {
          chrome.storage.sync.set({ api: api_input.value });
        });
    
        save_btn.onclick = () => {
          chrome.storage.sync.get("api", (result) => {
            if (result.api && result.api.trim() !== "") {
              const now = new Date().toISOString();
              chrome.storage.sync.set({ api_last_added: now });
              showActionMessage("API SAVED");
              showHome();
            } else {
              showActionMessage("Don't keep the API section blank!");
            }
          });
        };
      });
    });
    