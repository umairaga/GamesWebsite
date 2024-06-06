$(document).ready(function () {
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
  var headers = rows[0].split(",").map(header => header.trim());
  const gameDataIndex = headers.indexOf("URL");

  if (gameDataIndex === -1) {
    console.error("URL column not found in headers.");
    return;
  }

  rows.shift();
  var games = [];
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].trim() === "")
      continue; // Skip empty rows
    var gameData = rows[i].split(",").map(data => data.trim());
    var game = {
      title: gameData[0],
      genre: gameData[1],
      image: "assets/images/" + gameData[2],
      url: gameData[gameDataIndex]
    };
    games.push(game);
  }

  createGameItems(games);
}

function createGameItems(games) {
  const gameContainer = document.getElementById('most-popular-games');
  const iframe = document.getElementById('game-iframe');
  const gameModal = $('#gameModal');

  games.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('col-lg-3', 'col-sm-6', 'item');

    const gameContent = `
      <a href="#" class="game-link">
        <img src="${game.image}" alt="">
      </a>
      <h4>${game.title}<br><span>${game.genre}</span></h4>
      <ul>
        <div class="main-button col-sm-6">
          <a href="#">PLAY</a>
        </div>
      </ul>
    `;

    gameItem.innerHTML = gameContent;
    gameContainer.appendChild(gameItem);

    const playButton = gameItem.querySelector('.main-button a');
    playButton.addEventListener('click', (event) => {
      event.preventDefault();
      iframe.src = game.url;
      gameModal.modal('show');
    });
  });
}
