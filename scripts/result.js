document.addEventListener("DOMContentLoaded", async function () {
    const videoContainer = document.getElementById("video-container");
    const translatedVideo = document.getElementById("translatedVideo");
    const writingDiv = document.getElementById("writing-div");
    const downloadButton = document.getElementById("download-button"); // Get the download button element

    // Get the language code, video URL, and clone flag from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    const videoURL = decodeURIComponent(params.get("url"));
    const shouldCloneVoice = params.get("clone") === "true"; // Convert string to boolean

    // Choose the appropriate endpoint based on the clone flag
    const endpoint = shouldCloneVoice ? "http://127.0.0.1:5000/translated_video_clone" : "http://127.0.0.1:5000/translated_video_no_clone";
    const data = {
        video_url: videoURL,
        language_code: lang,
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const blob = await response.blob();
            const translatedVideoURL = URL.createObjectURL(blob);
            translatedVideo.src = translatedVideoURL;

            // Enable the download button and set its download attribute to the video file URL
            downloadButton.href = translatedVideoURL;
            downloadButton.removeAttribute("disabled"); // Remove the disabled attribute
        } else {
            console.error("Error: Unable to fetch translated video.");
        }

      
        writingDiv.innerHTML = ``;
    } catch (error) {
        console.error("Error: Unable to fetch translated video.", error);
    }
});
