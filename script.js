// Accordion functionality for problem sections
function toggleProblem(button) {
    const section = button.closest('.problem-section');
    const wasActive = section.classList.contains('active');
    
    // Close all sections
    document.querySelectorAll('.problem-section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Toggle clicked section
    if (!wasActive) {
        section.classList.add('active');
    }
}

// Modal functionality
const modal = document.getElementById('performanceModal');
const btn = document.getElementById('performanceBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Music Player functionality
const songs = [
    {
        title: "Lavender and Velvet",
        artist: "Alina Baraz",
        src: "Music/Alina Baraz - Lavender and Velvet.mp3",
        cover: "Music/Alina Baraz - Lavender and Velvet.jpg"
    },
    {
        title: "Gravity",
        artist: "All Things Break",
        src: "Music/All Things Break - Gravity.mp3",
        cover: "Music/All Things Break - Gravity.jpg"
    },
    {
        title: "The Time Of My Life",
        artist: "Benson Boone",
        src: "Music/Benson Boone - The Time Of My Life.mp3",
        cover: "Music/Benson Boone - The Time Of My Life.jpg"
    },
    {
        title: "Training Season",
        artist: "Dua Lipa",
        src: "Music/Dua Lipa - Training Season.mp3",
        cover: "Music/Dua Lipa - Training Season.png"
    },
    {
        title: "Ocean Drive",
        artist: "Duke Dumont",
        src: "Music/Duke Dumont - Ocean Drive.mp3",
        cover: "Music/Duke Dumont - Ocean Drive.jpg"
    },
    {
        title: "Imagination",
        artist: "Foster The People",
        src: "Music/Foster The People - Imagination.mp3",
        cover: "Music/Foster The People - Imagination.jpg"
    },
    {
        title: "Love Me",
        artist: "JMSN",
        src: "Music/JMSN - Love Me.mp3",
        cover: "Music/JMSN - Love Me.jpg"
    },
    {
        title: "On Your Mind",
        artist: "Kaskade",
        src: "Music/Kaskade - On Your Mind.mp3",
        cover: "Music/Kaskade - On Your Mind.jpg"
    },
    {
        title: "Hellbent",
        artist: "Kenna",
        src: "Music/Kenna - Hellbent.mp3",
        cover: "Music/Kenna - Hellbent.jpg"
    },
    {
        title: "Say Yes To Heaven (Anyma Remix)",
        artist: "Lana Del Rey",
        src: "Music/Lana Del Rey - Say Yes To Heaven (Anyma Remix).mp3",
        cover: "Music/Lana Del Rey - Say Yes To Heaven (Anyma Remix).avif"
    },
    {
        title: "Heaven",
        artist: "Luke Chiang",
        src: "Music/Luke Chiang - Heaven.mp3",
        cover: "Music/Luke Chiang - Heaven.png"
    },
    {
        title: "Little Dark Age",
        artist: "MGMT",
        src: "Music/MGMT - Little Dark Age.mp3",
        cover: "Music/MGMT - Little Dark Age.jpg"
    },
    {
        title: "HOPE",
        artist: "NF",
        src: "Music/NF - HOPE.m4a",
        cover: "Music/NF - HOPE.jpg"
    },
    {
        title: "Smooth Operator",
        artist: "Sade",
        src: "Music/Sade - Smooth Operator.mp3",
        cover: "Music/Sade - Smooth Operator.jpg"
    },
    {
        title: "Trampoline",
        artist: "SHAED",
        src: "Music/SHAED - Trampoline.mp3",
        cover: "Music/SHAED - Trampoline.jpg"
    },
    {
        title: "Bloodstream",
        artist: "Stateless",
        src: "Music/Stateless - Bloodstream.mp3",
        cover: "Music/Stateless - Bloodstream.jpg"
    },
    {
        title: "Dracula",
        artist: "Tame Impala",
        src: "Music/Tame Impala - Dracula.mp3",
        cover: "Music/Tame Impala - Dracula.jpg"
    },
    {
        title: "The Fate of Ophelia",
        artist: "Taylor Swift",
        src: "Music/Taylor Swift - The Fate of Ophelia.mp3",
        cover: "Music/Taylor Swift - The Fate of Ophelia.png"
    },
    {
        title: "Lovesong",
        artist: "The Cure",
        src: "Music/The Cure - Lovesong.mp3",
        cover: "Music/The Cure - Lovesong.jpg"
    },
    {
        title: "Feelin' Good - Live",
        artist: "The Growlers",
        src: "Music/The Growlers - Feelin' Good - Live.mp3",
        cover: "Music/The Growlers - Feelin' Good - Live.jpg"
    },
    {
        title: "The Adults Are Talking",
        artist: "The Strokes",
        src: "Music/The Strokes - The Adults Are Talking.mp3",
        cover: "Music/The Strokes - The Adults Are Talking.jpg"
    },
    {
        title: "Stuck",
        artist: "Thirty Seconds To Mars",
        src: "Music/Thirty Seconds To Mars - Stuck.mp3",
        cover: "Music/Thirty Seconds To Mars - Stuck.jpg"
    },
    {
        title: "Emmit Fenn",
        artist: "Threads",
        src: "Music/Threads - Emmit Fenn.mp3",
        cover: "Music/Threads - Emmit Fenn.jpg"
    },
    {
        title: "Rush",
        artist: "Troye Sivan",
        src: "Music/Troye Sivan - Rush.mp3",
        cover: "Music/Troye Sivan - Rush.jpg"
    },
    {
        title: "The Line",
        artist: "Twenty One Pilots",
        src: "Music/Twenty One Pilots - The Line.mp3",
        cover: "Music/Twenty One Pilots - The Line.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = null;

// DOM Elements
const playerToggle = document.getElementById('playerToggle');
const playerPanel = document.getElementById('playerPanel');
const closePlayer = document.getElementById('closePlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumArt = document.getElementById('albumArt');
const progressBar = document.getElementById('progressBar');
const playlist = document.getElementById('playlist');

// Initialize player
function initPlayer() {
    // Create audio element
    audio = new Audio();
    audio.src = songs[currentSongIndex].src;
    
    // Update UI
    updateSongInfo();
    createPlaylist();
    
    // Event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    
    playerToggle.addEventListener('click', togglePlayer);
    closePlayer.addEventListener('click', closePlayerPanel);
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    progressBar.addEventListener('click', seekTo);
}

function togglePlayer() {
    playerPanel.classList.toggle('active');
}

function closePlayerPanel() {
    playerPanel.classList.remove('active');
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `;
    updatePlaylistActive();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].src;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
    updatePlaylistActive();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex].src;
    updateSongInfo();
    if (isPlaying) {
        audio.play();
    }
    updatePlaylistActive();
}

function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    albumArt.style.backgroundImage = `url(${songs[currentSongIndex].cover})`;
}

function updateProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
    }
}

function seekTo(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function createPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="playlist-item-art" style="background-image: url(${song.cover})"></div>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            currentSongIndex = index;
            audio.src = songs[currentSongIndex].src;
            updateSongInfo();
            playSong();
            updatePlaylistActive();
        });
        playlist.appendChild(item);
    });
}

function updatePlaylistActive() {
    const items = playlist.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlayer);