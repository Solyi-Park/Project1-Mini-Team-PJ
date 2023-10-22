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
const moviesContainer = document.getElementById('movieList');

fetch(movieUrl, options)
    .then(res => res.json())
    .then(data => {
        movies = data['results']
        displayMovies();
        alertId();
    })
    .catch(err => console.error(err));

const displayMovies = () => {
    movies.forEach(movie => {
        let title = movie.title;
        let voteAverage = movie.vote_average;
        let overview = movie.overview;
        let releaseDate = movie.release_date;
        let posterPath = movie.poster_path;
        let id = movie.id

        const getImageUrl = posterPath => {
            return `https://image.tmdb.org/t/p/original${posterPath}`;
        };
        //받아온 영화 데이터 카드 만들어서 html에 붙이기
        const tempHtml = `
                            <div class="item_movie">
                                <div class="movie_poster">
                                    <img id="${id}" class="poster_img"
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
};

let alertId = function () {
    movies.forEach(movie => {
        let id = movie.id;
        let eachMovie = document.getElementById(id);
        eachMovie.addEventListener('click', function() {
            console.log(id);
            alert(id);
        });
    });    
};


//영화 검색
let allMovies = null;
const searchInput = document.querySelector('#search_input');
const searchButton = document.querySelector('#search_button');
const searchMovies = () => {
    let searchWord = searchInput.value;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=ko-KR&page=1&region=KR`, options)
        .then(res => res.json())
        .then(data => {
            allMovies = data['results'];
            //받아온 영화 데이터 카드 만들어서 html에 붙이기
            //1. 그 전에 원래 페이지 내용을 지운다.
            clearPage();
            function clearPage() {
                while (moviesContainer.firstChild) {
                    moviesContainer.removeChild(moviesContainer.firstChild);
                }
                // while 루프: 특적 조건이 참일 때 실행하기 -> moviesContainer안에 자식 요소가 존재하면 실행.
                // removeChid 메서드->  while 루프를 돌면서 firstChid를 지움 -> 모든 자식 요소 지우기
                // 자식 요소가 다 지워지면 멈춤.
            };
            //2. 데이터가 있으면 카드를 붙이고, 없으면 검색 결과가 없다고 표시한다.
            if (allMovies.length > 0) {
                allMovies.forEach(movie => {
                    let title = movie.title;
                    let voteAverage = movie.vote_average;
                    let overview = movie.overview;
                    let releaseDate = movie.release_date;
                    let posterPath = movie.poster_path;

                    const getImageUrl = (posterPath) => {
                        return `https://image.tmdb.org/t/p/original${posterPath}`;
                    };

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
                    console.log(tempHtml);
                    moviesContainer.insertAdjacentHTML('beforeend', tempHtml);
                    // moviesContainer.innerHTML = tempHtml;
                    //insertAdjacentHTML은 삽입할 HTML의 위치를 설정할 수 있고 
                    //innerHTML은 기존 내용을 지우고 새로운 내용으로 완전히 대체됨.
                    //위 카드 내용을 innerHTML로 사용시 검색 결과가 다르게 나옴. 


                });
            } else {
                moviesContainer.innerHTML = `<p>검색어 '${searchWord}'에 일치하는 결과가 없습니다.</p>`;
            };
        })
        .catch(err => console.error(err));

}
searchButton.addEventListener('click', searchMovies);









