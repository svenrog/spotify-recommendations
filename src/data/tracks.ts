import tracks from "../data/popular.json";


// This could be used to import practically any dataset following the ITrackModel schema.
// Tracks could be moved into a context and hotswappable by answering a question about genres for example.

const API_BASE_URL = "http://localhost:5244";
const API_TRACKS_ENDPOINT = "/api/spotify/tracks";

async function getData() {
    const response = await fetch(API_BASE_URL + API_TRACKS_ENDPOINT);

    if (!response.ok) {
        throw new Error("Could not fetch data, status: " + response.status);
    }

    const data = await response.json();

    console.log(data);
    return data;
}


export { getData };