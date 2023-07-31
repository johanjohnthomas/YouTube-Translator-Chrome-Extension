
console.log("content script loaded")
chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === "generateVoiceOver") {
      // When the message is received, extract the selected text and language code
      const selectedText = message.selectedText;
      const languageCode = message.languageCode;
  
      // Prepare the data for the POST request to the Flask server
      const data = {
        text: selectedText,
        language_code: languageCode,
      };
  
      // Send the request to the Flask server for voice-over generation
      fetch("http://127.0.0.1:5000/voiceover_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error: Unable to generate voice-over.");
          }
          return response.arrayBuffer();
        })
        .then((audioData) => {
          // Create a new Blob from the audio data
          const blob = new Blob([audioData], { type: "audio/mpeg" });
  
          // Create a new Audio element and set the audio URL to the generated audio
          const audioElement = new Audio();
          audioElement.src = URL.createObjectURL(blob);
  
          // Play the audio
          audioElement.play();
        })
        .catch((error) => {
          console.error(error.message);
        });
  
      // Send a response to the background script (you can send an empty object if not expecting a specific response)
      return Promise.resolve({});
    }
  });
  