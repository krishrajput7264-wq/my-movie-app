// Top Default Real Movies
let movies = [
    { id: "tt0816692", title: "Interstellar", genres: ["Sci-Fi", "Drama", "Adventure"], rating: 4.3, year: 2014, image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/2LqzF5WauAw" },
    { id: "tt0468569", title: "The Dark Knight", genres: ["Action", "Crime", "Drama"], rating: 4.5, year: 2008, image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/EXeTwQWrcwY" },
    { id: "tt1375666", title: "Inception", genres: ["Action", "Sci-Fi"], rating: 4.4, year: 2010, image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/8hP9D6kZseM" },
    { id: "tt0133093", title: "The Matrix", genres: ["Action", "Sci-Fi"], rating: 4.3, year: 1999, image: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/vKQi3bBA1y8" },
    { id: "tt0110912", title: "Pulp Fiction", genres: ["Crime", "Drama"], rating: 4.4, year: 1994, image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTItNDRlNC00MzcyLWEwNjktZmVlZTBkYWRjOTRkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/s7EdQ4FqbhY" },
    { id: "tt0109830", title: "Forrest Gump", genres: ["Drama", "Romance"], rating: 4.4, year: 1994, image: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/bLvqoHBptjg" },
    { id: "tt0111161", title: "The Shawshank Redemption", genres: ["Drama"], rating: 4.6, year: 1994, image: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/6hB3S9bIaco" },
    { id: "tt0120737", title: "The Lord of the Rings: Fellowship", genres: ["Action", "Adventure"], rating: 4.4, year: 2001, image: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/V75dMMIW2B4" },
    { id: "tt4154796", title: "Avengers: Endgame", genres: ["Action", "Sci-Fi"], rating: 4.2, year: 2019, image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/TcMBFSGVi1c" },
    { id: "tt1160419", title: "Dune", genres: ["Sci-Fi", "Drama"], rating: 4.0, year: 2021, image: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtMzM2NC00NDAyLWE2OTktZTljZTFlNjJiNDZiXkEyXkFqcGdeQXVyMzQxMjk0MjA@._V1_SX300.jpg", trailer: "https://www.youtube-nocookie.com/embed/8g18jFHjc4I" }
];

// Reference to currently displayed movies (to support dynamic search)
let currentDisplayedMovies = [...movies];

// Global State
let myList = [];
let currentView = 'discover'; // 'discover' or 'mylist'
let currentFilter = 'All';
let searchQuery = '';

// DOM Elements
const moviesContainer = document.getElementById('movies-container');
const filterChips = document.querySelectorAll('.chip');
const searchInput = document.getElementById('search-input');
const heroSection = document.getElementById('hero-section');
const sectionTitle = document.getElementById('section-title');
const listCount = document.getElementById('list-count');
const discoverNav = document.getElementById('discover-nav');
const myListNav = document.getElementById('my-list-nav');
const profileBtn = document.getElementById('profile-btn');
const videoModal = document.getElementById('video-modal');
const trailerIframe = document.getElementById('trailer-iframe');
const closeModalBtn = document.getElementById('close-modal');
const toastContainer = document.getElementById('toast-container');
const heroWatchBtn = document.getElementById('hero-watch-btn');
const heroAddBtn = document.getElementById('hero-add-btn');

// Fetch Real Movies from API
async function fetchMoviesFromOMDB(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=trilogy&s=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.Search) {
            // Map the OMDB format to our app format
            return data.Search.map(m => ({
                id: m.imdbID,
                title: m.Title,
                genres: ["Action", "Sci-Fi", "Drama"], // Defaulting generic categories to display across chips
                rating: 4.0,
                year: m.Year,
                image: m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/600x900?text=No+Poster',
                trailer: "https://www.youtube.com/embed/cRlZGqkD2GQ"
            }));
        }
        return [];
    } catch {
        return [];
    }
}

// Show Toast Notification
function showToast(message, icon = 'fa-check-circle') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => { if(toast.parentElement) toast.remove(); }, 5000);
}

// Modal Functions
function openModal(trailerUrl) {
    trailerIframe.src = trailerUrl + "?autoplay=1&mute=0";
    videoModal.classList.add('show');
}

function closeModal() {
    videoModal.classList.remove('show');
    trailerIframe.src = ""; 
}

closeModalBtn.addEventListener('click', closeModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal(); 
});

// Update List
function toggleMyList(movieId) {
    const defaultSearch = movies.find(m => m.id === movieId);
    const apiSearch = currentDisplayedMovies.find(m => m.id === movieId);
    const movie = defaultSearch || apiSearch;
    
    if(!movie) return;

    const index = myList.findIndex(m => m.id === movieId);
    if (index === -1) {
        myList.push(movie);
        showToast(`"${movie.title}" added to My List`);
    } else {
        myList.splice(index, 1);
        showToast(`"${movie.title}" removed from My List`, 'fa-info-circle');
    }
    
    listCount.textContent = myList.length;
    filterAndRender(); 
}

// Render Movies
function renderMovies(moviesToRender) {
    moviesContainer.innerHTML = ''; 

    if (!moviesToRender || moviesToRender.length === 0) {
        moviesContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid ${currentView === 'mylist' ? 'fa-folder-open' : 'fa-ghost'}"></i>
                <h3>${currentView === 'mylist' ? 'Your list is empty' : 'No movies found'}</h3>
                <p>${currentView === 'mylist' ? 'Add some movies to see them here!' : 'Try adjusting your search or filters'}</p>
            </div>
        `;
        return;
    }

    moviesToRender.forEach((movie, index) => {
        const inList = myList.some(m => m.id === movie.id);
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animationDelay = `${(index % 10) * 0.05}s`; // Stagger animation chunked

        card.innerHTML = `
            <div class="movie-hover-play play-trigger" data-url="${movie.trailer}"></div> 
            <img src="${movie.image}" alt="${movie.title}" class="movie-poster play-trigger" data-url="${movie.trailer}">
            <div class="movie-info">
                <div>
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-footer">
                        <span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                        <span class="movie-year">${movie.year}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="action-btn play-btn" data-url="${movie.trailer}">
                        <i class="fa-solid fa-play"></i> Play
                    </button>
                    <button class="action-btn add-btn ${inList ? 'active' : ''}" data-id="${movie.id}">
                        <i class="fa-solid ${inList ? 'fa-check' : 'fa-plus'}"></i> ${inList ? 'Added' : 'List'}
                    </button>
                </div>
            </div>
        `;
        
        moviesContainer.appendChild(card);
    });

    document.querySelectorAll('.play-trigger, .play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = e.currentTarget.getAttribute('data-url');
            openModal(url);
        });
    });

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            toggleMyList(id);
        });
    });
}

// Filter Logic Function
function filterAndRender() {
    let sourceData = currentView === 'mylist' ? myList : currentDisplayedMovies;
    let filteredMovies = sourceData;

    // Apply strict category filtering only if we're not actively using OMDB search
    if (currentFilter !== 'All') {
        filteredMovies = filteredMovies.filter(movie => movie.genres.includes(currentFilter));
    }
    
    // Fallback manual local filter for default items
    if (searchQuery && sourceData === movies) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    renderMovies(filteredMovies);
}

// View Switching Logic
function setView(view) {
    currentView = view;
    if (view === 'mylist') {
        heroSection.classList.add('hidden-section');
        sectionTitle.textContent = "My Watchlist";
        myListNav.classList.add('active');
        discoverNav.classList.remove('active');
    } else {
        heroSection.classList.remove('hidden-section');
        sectionTitle.textContent = "Discover by Genre";
        discoverNav.classList.add('active');
        myListNav.classList.remove('active');
    }
    filterAndRender();
}

discoverNav.addEventListener('click', (e) => { e.preventDefault(); setView('discover'); });
myListNav.addEventListener('click', (e) => { e.preventDefault(); setView('mylist'); });

profileBtn.addEventListener('click', () => showToast('Profile settings are not implemented yet!', 'fa-user'));
heroWatchBtn.addEventListener('click', () => openModal("https://www.youtube-nocookie.com/embed/2LqzF5WauAw"));
heroAddBtn.addEventListener('click', () => toggleMyList("tt0816692")); // Add Interstellar

// Filter Chips
filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
        filterChips.forEach(c => c.classList.remove('active'));
        const clickedChip = e.target;
        clickedChip.classList.add('active');
        currentFilter = clickedChip.getAttribute('data-filter');
        filterAndRender();
    });
});

// Real-Time Search Debouncer
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    
    // Don't search APIs on 'My List' view
    if (currentView === 'mylist') {
        filterAndRender();
        return;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        if (searchQuery.length > 2) {
            // Hit Real OMDB API!
            moviesContainer.innerHTML = `<div class="no-results"><i class="fa-solid fa-spinner fa-spin"></i><h3>Searching Real Database...</h3></div>`;
            const results = await fetchMoviesFromOMDB(searchQuery);
            currentDisplayedMovies = results.length > 0 ? results : currentDisplayedMovies; // Fallback
            filterAndRender();
        } else if (searchQuery.length === 0) {
            currentDisplayedMovies = [...movies];
            filterAndRender();
        } else {
            filterAndRender(); // local filter fallback
        }
    }, 500);
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderMovies(currentDisplayedMovies);
    
    // Update Hero Content to Real Movie
    document.getElementById('hero-title').textContent = "Interstellar";
    document.getElementById('hero-desc').textContent = "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.";
});
