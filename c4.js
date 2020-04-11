document.addEventListener("DOMContentLoaded", e =>
  { var gameboard = document.getElementById("#gameboard");
    var board = new c4();
    var playerTurn = document.getElementById("#playerTurn");
  });



class c4
  {
    constructor()
      {
        this.numRows = 6;
        this.numCols = 7;
        this.buildGrid();
        this.gameStart();
      }

    buildGrid()
      {
        var grid = document.createElement('div');
        grid.classname = 'grid';

        for (let i = 0; i<this.numRows; i++)
          {
            var row = document.createElement('div');
            row.classList.add('row');
            row.id='row'

            for (let j = 0; j<this.numCols; j++)
              {
                var col = document.createElement('div');
                col.classList.add('col');
                col.id="col"
                row.appendChild(col);
              }

            gameboard.appendChild(row);
          }
      }

    gameStart()
      {
        var turn = "Player 1's turn!";
        var playerText = document.createTextNode(turn);
        playerTurn.appendChild(playerText);

      }


  }
