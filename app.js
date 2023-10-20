const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjg5NzEzNmQwZGFmYWRjZGI0MDJhYjcyODBiNWJiZSIsInN1YiI6IjY1MmYyNmQwZWE4NGM3MDEwYzFkYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LHU-uAz75iuYfxcauUmesT53m3QG4ZKs9xBdSmPsRPs'
    }
};
const movieUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc';
const baseUrl = 'https://image.tmdb.org/t/p/'

//Rated movie
let movies = null;

fetch(movieUrl, options)
    .then(res => res.json())
    .then(data => {
        movies = data['results']

        const moviesContainer = document.getElementById('movieList');
        movies.forEach(movie => {
            let title = movie.title;
            let voteAverage = movie.vote_average;
            let overview = movie.overview;
            let releaseDate = movie.release_date;
            let posterPath = movie.poster_path;

            const getImageUrl = posterPath => {
                return `https://image.tmdb.org/t/p/original${posterPath}`;
            };
            //받아온 영화 데이터 카드 만들어서 html에 붙이기
            const tempHtml = `
                            <div class="item_movie">
                                <div class="movie_poster">
                                    <img class="poster_img"
                                        src="${getImageUrl(posterPath)}"
                                        alt="${title}">
                                </div>
                                <div class="movie_cont">
                                    <strong>${title}</strong>
                                    <span class="cont_text">평점 ${voteAverage}</span>
                                    <span class="cont_text">개봉 ${releaseDate}</span>
                                </div>
                                <span class="scroll">${overview}</span>
                            </div>
                             `;

            moviesContainer.insertAdjacentHTML('beforeend', tempHtml);
        });
    })
    .catch(err => console.error(err));

//영화 검색
let allMovies = null;
let searchInput = document.querySelector('#search_input');
const searchButton = document.querySelector('#search_button');
console.log(searchButton);
const searchMovies = () => {
    //검색창 input값 가져오기
    const searchWord = searchInput.value;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=ko-KR&page=1&region=KR`, options)
        .then(res => res.json())
        .then(data => {
            allMovies = data['results'];
            console.log(allMovies);
            const searchButton = document.querySelector('#search_button');
        })
        .catch(err => console.error(err));


    console.log(searchWord);
    //영화 데이터 필터링하기 filter()
    //1. 영화 데이터 > title 접근
    //2. 검색어와 데이터내용(title) 일치하는지 확인하기 includes() -> 영어 검색하려면 toUperCase나 toLowerCase 사용해야하나?...?
    // const filteredMovies = allMovies.filter(movie =>
    //     movie.title.includes(searchWord));
    //     console.log(searchWord);
}
searchButton.addEventListener('click', searchMovies);


// const moviesContainer = document.getElementById('movieList');
// movies.forEach(movie => {
//     let title = movie.title;
//     let voteAverage = movie.vote_average;
//     let overview = movie.overview;
//     let releaseDate = movie.release_date;
//     let posterPath = movie.poster_path;

//     const getImageUrl = (posterPath, size = 'w342') => {
//         return `https://image.tmdb.org/t/p/${size}${posterPath}`;
//     };
//     //받아온 영화 데이터 카드 만들어서 html에 붙이기
//     const tempHtml = `
//                     <div class="item_movie">
//                         <div class="movie_poster">
//                             <img class="poster_img"
//                                 src="${getImageUrl(posterPath)}"
//                                 alt="${title}">
//                         </div>
//                         <div class="movie_cont">
//                             <strong>${title}</strong>
//                             <span>평점: ${voteAverage}</span>
//                             <span>개봉일: ${releaseDate}</span>
//                             <span>${overview}</span>
//                         </div>
//                     </div>
//                      `;

//     moviesContainer.insertAdjacentHTML('beforeend', tempHtml);
// });




