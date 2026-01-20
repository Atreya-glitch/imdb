
const favContainer = document.querySelector(".fav-list");
const favPage = document.getElementById("favourite-result");
const resultPage = document.getElementById("result-flex");

function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

function saveFavourites(data) {
  localStorage.setItem("favourites", JSON.stringify(data));
}

function addToFavourite(movie) {
  const favourites = getFavourites();
  if (favourites.some(m => m.imdbID === movie.imdbID)) return;
  favourites.push(movie);
  saveFavourites(favourites);
}

function showFavourites() {
  favContainer.innerHTML = "";
  const favourites = getFavourites();

  if (favourites.length === 0) {
    favPage.style.opacity = "0";
    return;
  }

  favPage.style.opacity = "1";

  favourites.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className =
      "fav-res-img rounded-lg flex items-end shadow-xl";
    card.style.backgroundImage = `url(${movie.Poster !== "N/A" ? movie.Poster : "notfound.png"})`;

    card.innerHTML = `
      <button class="remove-fav" onclick="removeFavourite(${index})">
        <p class="shadow-2xl p-2">
          <i class="fa-solid fa-trash text-xl"></i>
        </p>
      </button>
    `;

    favContainer.appendChild(card);
  });
}

function removeFavourite(index) {
  const favourites = getFavourites();
  favourites.splice(index, 1);
  saveFavourites(favourites);
  favContainer.innerHTML = "";
  showFavourites();
}

function clearList() {
  localStorage.removeItem("favourites");
  favContainer.innerHTML = "";
  favPage.style.opacity = "0";
}

function enterFavPage() {
  resultPage.style.display = "none";
  favPage.style.display = "block";
  showFavourites();
}

