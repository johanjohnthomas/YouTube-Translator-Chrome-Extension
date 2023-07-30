/** Function will send an API request to API and expect the transcript
 */
export async function getTranscript(videoUrl, apiUrl) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_url: videoUrl,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error("Error fetching transcript");
    }

    const data = await response.json();
    return data.transcript;
  } catch (error) {
    console.error(error);
    return "Sorry, cannot connect to the server";
  }
}
