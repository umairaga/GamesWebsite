$(document).ready(function () {
  //gihub pagess
  var csvURL = "assets/gamedata.csv";
  //var csvURL = "https://drive.google.com/file/d/1ORN60MciTgjMmvj0IQksu5MR_VGerGfo/view?usp=sharing";

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
  // Split the CSV data into rows
  var rows = csvData.split(/\r?\n|\r/);

  // Assuming the first row contains headers, parse them
  var headers = rows[0].split(",");

  console.log("Headers:", headers);  // Log the headers for debugging
  const gameDataIndex = headers.indexOf("URL"); // Find URL column index

  if (gameDataIndex === -1) {
    console.error("URL column not found in headers.");
    return; // Exit the function if URL header is not found
  }

  console.log("gameDataIndex:", gameDataIndex); // Log for debugging

  // Remove the header row (optional)
  rows.shift();

  // Loop through each row (game data)
  var games = [];
  for (var i = 0; i < rows.length; i++) {
    var gameData = rows[i].split(",");

    // Extract data from the CSV row
    var game = {
      title: gameData[0],
      genre: gameData[1],
      image: "assets/images/" + gameData[2],// + ".jpg", // Assuming image filenames match
      //   url: gameData[gameDataIndex], // Access URL based on index
      url: gameData[3], // Access URL based on index
    };

    games.push(game); // Add game object to games array
  }
  console.log("Extracted games:", games); // Check processed game data
  createGameItems(games); // Pass games data to item creation function
}

function createGameItems(games) {
  document.addEventListener("DOMContentLoaded", function () {
    const gameItems = document.querySelectorAll('.item');

    games.forEach((game, index) => {
      const gameItem = gameItems[index]; // Assuming data matches order

      const gameLink = gameItem.querySelector('.game-link');
      gameLink.href = game.url; // Set link based on URL property

      const playButton = gameItem.querySelector('.main-button a');
      playButton.addEventListener('click', () => {
        window.location.href = gameLink.href; // Open link on button click
      });
    });
  });
}
