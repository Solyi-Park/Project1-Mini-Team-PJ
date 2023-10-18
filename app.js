const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjg5NzEzNmQwZGFmYWRjZGI0MDJhYjcyODBiNWJiZSIsInN1YiI6IjY1MmYyNmQwZWE4NGM3MDEwYzFkYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LHU-uAz75iuYfxcauUmesT53m3QG4ZKs9xBdSmPsRPs'
    }
};

let movies = null;

fetch('https://api.themoviedb.org/3/account/20590089/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
    .then(response => response.json())
    .then(response => {
        movies = response;
        console.log(response)
    })
    .catch(err => console.error(err));
    console.log(movies);


   