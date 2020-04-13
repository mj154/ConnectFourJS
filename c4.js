var welcomeText = "Welcome to Connect4! The rules are simple: the first player to get four in a row wins!\n\n";
var p1_turn = true;
var turnTextNode = document.createTextNode("Player 1's turn!");


document.addEventListener("DOMContentLoaded", e =>
  {
    var gameboard = document.getElementById("#gameboard");
    var board = new c4();
  });



class c4
  {
    constructor()
      {
        this.numRows = 6;
        this.numCols = 7;
        this.buildGrid();
        this.gameStart();
        this.gameLoop();
      }

    buildGrid()
      {
        for (let i = 0; i<this.numRows; i++) //builds each div for the board
          {
            var row = document.createElement('div');
            row.classList.add('row');
            row.id='row'


            for (let j = 0; j<this.numCols; j++) //setup for accessing specific cells
              {
                var col = document.createElement('div');
                col.classList.add('emptyCol');
                col.id = "emptyCol";
                col.setAttribute('rowIndex', i);
                col.setAttribute('colIndex', j);
                row.appendChild(col);
              }

            gameboard.appendChild(row);
          }


      }

    gameStart()
      { //setup
        //need a container for the text on the right of the screen
        var textContainerDiv = document.createElement('div');
        textContainerDiv.id = 'textContainerDiv';

        //setup text on right side of screen
        var welcomeTextNode = document.createTextNode(welcomeText);
        welcomeTextNode.id = 'welcomeTextNode';
        textContainerDiv.appendChild(welcomeTextNode);
        textContainerDiv.appendChild(turnTextNode);
        document.body.appendChild(textContainerDiv);
      }

    gameLoop()
      {
        document.querySelectorAll('#emptyCol').forEach(item =>
          {
            item.addEventListener('mouseenter', event => //change cell color on mouse hover
            {
              getBottomCell(item.getAttribute('colIndex')).id = "hoverCol";
            });

            item.addEventListener('mouseleave', event => //change cell color back on mouse leave
            {
              getBottomCell(item.getAttribute('colIndex')).id = "emptyCol";
            });


            item.addEventListener('click', event => //place tokens, check wins
              {
                if (p1_turn == true)
                  {
                    getBottomCell(item.getAttribute('colIndex')).id = 'redCol';

                    p1_turn = false;
                    turnTextNode.nodeValue = "Player 2's turn!";
                    if (checkWin("redCol"))
                      {
                        alert("Player 1 Wins!");
                        reset();
                      }
                  }

                else
                  {
                    getBottomCell(item.getAttribute('colIndex')).id = 'blueCol';
                    p1_turn = true;
                    turnTextNode.nodeValue = "Player 1's turn!";
                    if (checkWin("blueCol"))
                      {
                        alert("Player 2 Wins!");
                        reset();
                      }
                  }
              });
          });




      }

  }


function checkWin(color)
{
  //first need to shove all the divs into an array
  var cells = new Array();
  let temp = new Array();
  for (let i = 0; i<6; i++) //grab row
    {
      for (let j = 0; j<7; j++)
        {
          temp = document.querySelectorAll('[rowIndex = "'+i+'"]');
        }
        cells.push(temp);
    }


  //check right
  for (let i = 0; i<6; i++)
      {
        for (let j = 0; j<7; j++)
          {
            if (j<4)
            {
              if (cells[i][j].id == color) //if we find color, check to the right
                {
                      if (cells[i][j].id == color && cells[i][j+1].id == color && cells[i][j+2].id == color && cells[i][j+3].id == color )
                        {
                          return true;
                        }

                }
            }
        }
      }

  //check down
  for (let i = 0; i<6; i++)
      {
        for (let j = 0; j<7; j++)
          {
            if (i<3)
              {
                if (cells[i][j].id == color) //if we find color, check to the right
                  {
                        if (cells[i][j].id == color && cells[i+1][j].id == color && cells[i+2][j].id == color && cells[i+3][j].id == color )
                          {
                            return true;
                          }
                  }
              }
          }
      }

  //check downright
  for (let i = 0; i<6; i++)
      {
        for (let j = 0; j<7; j++)
          {
            if (i<3)
              {
                if (cells[i][j].id == color) //if we find color, check to the right
                  {
                        if (cells[i][j].id == color && cells[i+1][j+1].id == color && cells[i+2][j+2].id == color && cells[i+3][j+3].id == color )
                          {
                            return true;
                          }
                  }
              }
          }
      }

  //check downleft
  for (let i = 0; i<6; i++)
      {
          for (let j = 0; j<7; j++)
            {
              if (i<3)
                {
                  if (cells[i][j].id == color) //if we find color, check to the right
                    {
                          if (cells[i][j].id == color && cells[i+1][j-1].id == color && cells[i+2][j-2].id == color && cells[i+3][j-3].id == color )
                            {
                              return true;
                            }
                    }
                }
            }
        }

}

function reset() //reset board
{
  location.reload();
}

function getBottomCell(col) //we only want to be able to place tokens on the bottom cells
{
  var colNum = parseInt(col);

  var cells = document.querySelectorAll('.emptyCol[colIndex = "'+colNum+'"]');

  for (let i = 5; i>=0; i--) //start at last cell, move upward until empty cell is found
    {
      if (cells[i].id != "blueCol" && cells[i].id != "redCol")
        {
          return cells[i];
        }
    }

}
