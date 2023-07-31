document.addEventListener("DOMContentLoaded", async function () {
    const videoContainer = document.getElementById("video-container");
    const translatedVideo = document.getElementById("translatedVideo");
    const writingDiv = document.getElementById("writing-div");

    // Get the language code and video URL from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    const videoURL = decodeURIComponent(params.get("url"));

    // Make the API call to get the translated video data and play the video
    const endpoint = `http://127.0.0.1:5000/translated_video_no_clone`;
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

            // Add a download link for the video
            const downloadLink = document.createElement("a");
            downloadLink.href = translatedVideoURL;
            downloadLink.download = "translated_video.mp4";
            downloadLink.textContent = "Download Translated Video";
            writingDiv.appendChild(downloadLink);
        } else {
            console.error("Error: Unable to fetch translated video.");
        }

        // Insert the videoURL and language code in the writing-div
        writingDiv.innerHTML += `<p>Video URL: ${videoURL}</p><p>Language Code: ${lang}</p>`;
    } catch (error) {
        console.error("Error: Unable to fetch translated video.", error);
    }
});
