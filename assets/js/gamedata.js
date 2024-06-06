$(document).ready(function () {
  // CSV URL
  var csvURL = "assets/gamedata.csv";

  $.ajax({
    dataType: "text",
    url: csvURL,
    success: function (data) {
      processData(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Unable to retrieve data", textStatus, errorThrown);
    }
  });
});

function processData(csvData) {
  var rows = csvData.split(/\r?\n|\r/);
  var headers = rows[0].split(",");
  
  rows.shift(); // Remove the header row

  var games = rows.map(function(row) {
    var gameData = row.split(",");
    return {
      title: gameData[0],
      genre: gameData[1],
      image: "assets/images/" + gameData[2],
      url: gameData[3],
    };
  });

  createGameItems(games);
}

// function createGameItems(games) {
//   document.addEventListener("DOMContentLoaded", function () {
//     const gameItems = document.querySelectorAll('.item');

//     // Ensure the loop only iterates over the available game data
//     games.forEach((game, index) => {
//       if (index < gameItems.length) {  // Check if there's a corresponding game item element
//         const gameItem = gameItems[index];

//         const gameLink = gameItem.querySelector('.game-link');
//         gameLink.href = game.url; // Set link based on URL property
//         gameLink.querySelector('img').src = game.image; // Set image source
//         gameLink.querySelector('img').alt = game.title; // Set image alt text

//         const gameTitle = gameItem.querySelector('h4');
//         gameTitle.innerHTML = `${game.title}<br><span>${game.genre}</span>`; // Set title and genre

//         const playButton = gameItem.querySelector('.main-button a');
//         playButton.addEventListener('click', () => {
//           window.location.href = gameLink.href; // Open link on button click
//         });
//       }
//     });
//   });
// }


function createGameItems(games) {
  const container = document.getElementById('most-popular-games');
  
  games.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('col-lg-3', 'col-sm-6');
    gameItem.innerHTML = `
      <div class="item">
        <a href="${game.url}" class="game-link">
          <img src="${game.image}" alt="${game.title}">
        </a>
        <h4>${game.title}<br><span>${game.genre}</span></h4>
        <ul>
          <div class="main-button col-sm-6">
            <a href="${game.url}">PLAY</a>
          </div>
        </ul>
      </div>
    `;
    container.appendChild(gameItem);
  });
}
