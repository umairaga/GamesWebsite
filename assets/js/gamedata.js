$(document).ready(function () {
    // Your CSV file URL
    var csvURL = "https://drive.google.com/file/d/1_lDUzQeSfG6BnFfepOfIuEn5WU9NiikQ/view?usp=sharing";

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

    // Assuming the first row contains headers, skip it
    var headers = rows[0].split(",");
    rows.shift(); // Remove the header row

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
    const gameItems = document.querySelectorAll('.item'); // Select all game items

    games.forEach((game, index) => {
        const gameItem = gameItems[index]; // Assuming data matches order

        const gameLink = gameItem.querySelector('.game-link');
        gameLink.href = game.url; // Set link based on URL property

        const playButton = gameItem.querySelector('.main-button a');
        playButton.addEventListener('click', () => {
            window.location.href = gameLink.href; // Open link on button click
        });
    });
}

//OLD TESTING - NOT USED ANYMORE -
// // Loop through each row (game data)
// for (var i = 0; i < rows.length; i++) {
//   var gameData = rows[i].split(",");

//   // Create a game item element
//   var gameItem = createGameItem(gameData);

//   // Append the game item to the .most-popular div
//   $(".most-popular .row").append(gameItem);
// }
//   }

// function createGameItem(data) {
//     // Extract data from the CSV row
//     var gameTitle = data[0];
//     var gameGenre = data[1];
//     var gameImage = "assets/images/" + data[2] + ".jpg"; // Assuming image filenames match

//     // Create the game item structure as HTML elements
//     var gameItemHtml = `
//       <div class="col-lg-3 col-sm-6">
//         <div class="item">
//           <a href="index.html">
//             <img src="${gameImage}" alt="">
//           </a>
//           <h4>${gameTitle}<br><span>${gameGenre}</span></h4>
//           <ul>
//             <div class="main-button col-sm-6">
//               <a href="index.html">PLAY</a>
//             </div>
//           </ul>
//         </div>
//       </div>
//     `;

//     return gameItemHtml;
// }
