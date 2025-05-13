   const encodedKey = "api apna dalo";
    const API_KEY = atob(encodedKey);
    let currentSongIndex = 0;
    let songs = [];

    async function searchMusic() {
      let query = document.getElementById("search").value;
      if (!query) {
        alert("Please enter a song name!");
        return;
      }

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query} music&key=${API_KEY}&maxResults=10`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          songs = data.items;
          displaySongs();
        } else {
          alert("No results found!");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
        alert("Failed to fetch songs. Check API key or internet connection!");
      }
    }

    function displaySongs() {
      const songList = document.getElementById("song-list");
      songList.innerHTML = "";
      songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<img src="${song.snippet.thumbnails.default.url}" /> ${song.snippet.title}`;
        li.onclick = () => playSong(index);
        songList.appendChild(li);
      });
    }

    function playSong(index) {
      currentSongIndex = index;
      const videoId = songs[index].id.videoId;
      document.getElementById("player").src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    function playPause() {
      let player = document.getElementById("player");
      let src = player.src;
      if (src.includes("autoplay=1")) {
        player.src = src.replace("autoplay=1", "autoplay=0");
      } else {
        player.src = src.replace("autoplay=0", "autoplay=1");
      }
    }

    function prevSong() {
      if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
      }
    }

    function nextSong() {
      if (currentSongIndex < songs.length - 1) {
        playSong(currentSongIndex + 1);
      }
    }

    // Theme Toggle
    document.querySelector(".toggle-input").addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
    });

    function handleKeyPress(event) {
      if (event.key === "Enter") {
        searchMusic();
      }
    }
