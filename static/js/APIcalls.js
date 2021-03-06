
const urlSearchParams = new URLSearchParams(window.location.search);
const tokens = Object.fromEntries(urlSearchParams.entries());
const access_token = tokens.access_token
const refresh_token = tokens.refresh_token


var selecter = document.getElementById('show')

selecter.addEventListener('click', getData)

function getData() {
    
    var artistsOrTracks = document.getElementById('selecter').value
    var timeRange = document.getElementById('time_range').value
    var limit = document.getElementById('limit').value

    var url = `https://api.spotify.com/v1/me/top/${artistsOrTracks}?time_range=${timeRange}&limit=${limit}&offset=0`

    var data = {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
    }

    
    const response = spotifyAPIRequest(url, data)
    .then(
        (response) => {
            sendToDocument(response);    
        }
    )

}

function sendToDocument(response) {
    
    if (response.items[0].type === 'artist') {
        displayArtists(response)
    } else if (response.items[0].type === 'track') {
        displayTracks(response)
    }

}

function displayArtists(response) {
    var topArtists = document.getElementById('showing-div')
    var items = response.items;
    console.log(response.items)
    var display = []

    for (let i = 0; i < items.length; i++) {

        let name = items[i].name;
        let image = items[i].images[1].url
        let rank = i + 1 

        display.push(`
            <br>
            <img src=${image} >
            <p>${rank}. ${name}</p>
            <br>
        `)
    }
    topArtists.innerHTML = display.join("")
}

function displayTracks(response) {
    
    console.log(response.items[0])
    var topTracks = document.getElementById('showing-div')
    var items = response.items;
    var display = []

    for (let i = 0; i < items.length; i++) {

        let trackName = items[i].name;
        let artistName = items[i].artists[0].name
        let image = items[i].album.images[1].url
        let rank = i + 1 

        display.push(`
            <br>
            <br>
            <p>${rank}. ${trackName} by ${artistName}</p>
            <img src=${image} >
        `)
    }

    topTracks.innerHTML = display.join("")
}

async function spotifyAPIRequest(url, data) {
    try {
        const res = await fetch(url, data)
        const artists = await res.json()
        return artists
    } catch (error) {
        console.log(error)
    }
}
