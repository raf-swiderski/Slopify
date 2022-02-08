
const urlSearchParams = new URLSearchParams(window.location.search);
const tokens = Object.fromEntries(urlSearchParams.entries());
const access_token = tokens.access_token
const refresh_token = tokens.refresh_token

var reqURL = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0'

var data = {
    headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json', 'Content-Type': 'application/json'
    }
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

// top artists

var button = document.getElementById('show-button')

button.addEventListener('click', () => {
    getTopArtists();
})


function getTopArtists() {

    const response = spotifyAPIRequest(reqURL, data)
    .then(
        (response) => {
    
            var topArtists = document.getElementById('showing-div')
    
            var items = response.items;
            console.log(items)
            var display = []
    
            for (let i = 0; i < 50; i++) {
    
                let name = items[i].name;
                let rank = i + 1 
    
                display.push(`<p>${rank}. ${name}</p>`)
            }
    
            topArtists.innerHTML = display.join("")
        }
    )
}






