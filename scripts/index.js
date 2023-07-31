import { getCurrentURL } from './getCurrentURL.js';
import { getTranscript } from './githubAPIRequests.js';
import { apiKey } from './apiKey.js';

let currentUrlString = await getCurrentURL();
let urlSplit = currentUrlString.split("/");


const URL = `http://127.0.0.1:5000/transcript_text`;
let summary = ""

async function summarize() {
    let final;

    let input = await getTranscript(await getCurrentURL(),URL);
    input = input.replace(/:\w+:/g, '');
    let source = input.replace(/[^a-zA-Z0-9'.\n]/g," ")
	
    const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: 'Bearer ' + apiKey
		},
		body: JSON.stringify({
			source: source,
			sourceType: 'TEXT'
		})
    };
  
    final = await fetch('https://api.ai21.com/studio/v1/summarize', options)
		.then(response => response.json())
		.then(response => final = response)
		.catch(err => console.error(err));
    
    return final.summary;
}

function main() {
	if (urlSplit[2] == "www.youtube.com") {
		try {
			summary = summarize();
		} catch (error) {
			console.error(error);
			summary = "Sorry, but this isn't a valid YouTube Video.";
		}
	} else {
		summary = "Sorry, but this isn't a valid YouTube Video.";
	}
	
	return summary;
}

document.getElementById("summary-container").innerHTML = main();