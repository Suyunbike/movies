const searchInput = document.querySelector("#search-input");
const movieTypes = document.querySelectorAll("li");

const moviesContent = document.querySelector("#content");

function fetchAllMovies(search, type = "") {
  moviesContent.innerHTML = `Loading....`;
  fetch(`https://www.omdbapi.com/?s=${search}&type=${type}&apikey=8446855d`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      renderMovies(data.Search);
    });
}

function renderMovies(array) {
  moviesContent.innerHTML = "";
  if (!array) {
    moviesContent.innerHTML = `
            <h1 class = 'text-gray-500'>
                No content, no movies!!!
            </h1>
        `;
  } else {
    array.map((item) => {
      moviesContent.innerHTML += `
               <div class="shadow-md p-3 rounded-md max-h-[350px]">
                    <img class="rounded-md h-[250px] object-contain" src="${item.Poster} " alt="Cinema">
                    <h3 class="text-indigo-400 p-3 ">${item.Title}</h3>
                    <div class="px-3 flex justify-between items-center">
                        <b class="text-gray-500">${item.Type}</b>
                        <b class="text-gray-500">${item.Year}</b>
                    </div>
                </div>
        `;
    });
  }
}

function changeMoviesType(type) {
  fetchAllMovies(searchInput.value !== "" ? searchInput.value : "iron", type);
}

movieTypes.forEach((item) => {
  item.addEventListener("click", function (e) {
    changeMoviesType(item.dataset.type);
    console.log(item.dataset.type);
    movieTypes.forEach((x) => x.classList.remove("border-2"));
    item.classList.add("border-2");
  });
});

searchInput.addEventListener("change", (e) => {
  fetchAllMovies(e.target.value);
});

fetchAllMovies("Spider-man");
