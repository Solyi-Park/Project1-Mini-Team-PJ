const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjg5NzEzNmQwZGFmYWRjZGI0MDJhYjcyODBiNWJiZSIsInN1YiI6IjY1MmYyNmQwZWE4NGM3MDEwYzFkYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LHU-uAz75iuYfxcauUmesT53m3QG4ZKs9xBdSmPsRPs'
    }
};
const api_url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc';
const base_url = 'https://image.tmdb.org/t/p/'


fetch(api_url, options)
    .then(res => res.json())
    .then(data => {
        const movies = data['results']
        const movies_container = document.getElementById('movieList');
        movies.forEach(movie => {
            let title = movie.title;
            let voteAverage = movie.vote_average;
            let overview = movie.overview;
            let releaseDate = movie.release_date;
            let posterPath = movie.poster_path;
        
               const getImageUrl = (posterPath, size = 'w342') => {
                return `https://image.tmdb.org/t/p/${size}${posterPath}`;
              };

            console.log(movies);

            const tempHtml = `
                            <div class="item_movie">
                                <div class="movie_poster">
                                    <img class="poster_img"
                                        src="${getImageUrl(posterPath)}"
                                        alt="${title}">
                                </div>
                                <div class="movie_cont">
                                    <strong>${title}</strong>
                                    <span>평점: ${voteAverage}</span>
                                    <span>개봉일: ${releaseDate}</span>
                                    <span>${overview}</span>
                                </div>
                            </div>
                             `;

            movies_container.insertAdjacentHTML('beforeend', tempHtml);
        });



    })
    .catch(err => console.error(err));
    


// let movies = undefined;

// fetch('https://api.themoviedb.org/3/account/20590089/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
//     .then(response => response.json())
//     .then(response => {
//         movies = response;
//         console.log(response)
//     })
//     .catch(err => console.error(err));
// console.log(movies);




