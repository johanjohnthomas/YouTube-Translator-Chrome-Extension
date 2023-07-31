import { getCurrentURL } from "./getCurrentURL.js";

document.addEventListener("DOMContentLoaded", function () {
    const generateVoiceoverButton = document.getElementById("generateVoiceOver");
    const languageSelect = document.getElementById("languageSelect");
    const cloneVoiceCheckbox = document.getElementById("cloneVoice");

    generateVoiceoverButton.addEventListener("click", async function () {
        const selectedLanguage = languageSelect.value;
        const videoURL = await getCurrentURL();
        const shouldCloneVoice = cloneVoiceCheckbox.checked;

        if (isValidYouTubeURL(videoURL)) {
            // Open the result.html page in a new tab with language code, video URL, and clone voice flag as URL parameters
            const resultPageURL = `video-page.html?lang=${selectedLanguage}&url=${encodeURIComponent(videoURL)}&clone=${shouldCloneVoice}`;
            window.open(resultPageURL, "_blank");
        } else {
            // Show an alert for invalid YouTube video URL
            alert("Sorry, but this isn't a valid YouTube Video.");
        }
    });

    checkIfYouTubeAndRun();
});

// Function to check if the URL is a valid YouTube video URL
function isValidYouTubeURL(url) {
    // Regex to match YouTube video URLs
    const youtubeURLRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/i;
    return youtubeURLRegex.test(url);
}

async function checkIfYouTubeAndRun() {
    const CURRENTURL = await getCurrentURL();
    const urlSplit = CURRENTURL.split("/");
    const containerElement = document.getElementById("summary-container");

    if (isValidYouTubeURL(CURRENTURL) && urlSplit[2] == "www.youtube.com") {
        try {
            // Add your logic here 
            
            

        
        } catch (error) {
            console.error(error);
            containerElement.innerHTML = "Sorry, but this isn't a valid YouTube Video.";
        }
    } else {
        containerElement.innerHTML = "Sorry, but this isn't a valid YouTube Video.";
        console.log("NOT IN YOUTUBE");
    }
}
