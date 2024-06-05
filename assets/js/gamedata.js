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
    const gameDataIndex = headers.indexOf("URL"); // Find URL column index
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
        image: "assets/images/" + gameData[2] + ".jpg", // Assuming image filenames match
        url: gameData[gameDataIndex], // Access URL based on index
      };
  
      games.push(game); // Add game object to games array
    }
  
    createGameItems(games); // Pass games data to item creation function
  }
  
  function createGameItems(games) {
    // ... rest of your code
  }
  