import tracks from "../data/popular.json";


// This could be used to import practically any dataset following the ITrackModel schema.
// Tracks could be moved into a context and hotswappable by answering a question about genres for example.

const API_BASE_URL = "http://localhost:5244/api/spotify/tracks";

async function getData() {
    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error("Could not fetch data, status: " + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


export { getData };