import Swal from 'node_modules/sweetalert2/dist/sweetalert2.min.js';

var gameGrid = new Array(9);
var gameEnded = false;
for (let i = 0; i < 9; i++)
    gameGrid[i] = i;
function verify(index){
    let col = index % 3;
    let row = index - index % 3;
    let result = false;
    //columns
    result |= gameGrid[col] == gameGrid[col + 3] && gameGrid[col + 3] == gameGrid[col + 6];
    result |= gameGrid[row] == gameGrid[row + 1] && gameGrid[row + 1] == gameGrid[row + 2];
    if(!((col + row) % 2)){
        result |= gameGrid[0] == gameGrid[4] && gameGrid[4] == gameGrid[8];
        result |= gameGrid[2] == gameGrid[4] && gameGrid[4] == gameGrid[6];
    }
    return Boolean(result);
}
var xo = "X"
document.getElementById("game").addEventListener("click", function(e){
    let t = document.getElementById(e.target.id);
    if(t.className == 'caja'){
        gameGrid[t.id] = xo;
        gameEnded = verify(t.id);
        if(gameEnded){
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        if(xo == "X"){
            t.classList.toggle("x")
            xo = "O";
        } else {
            t.classList.toggle("o");
            xo = "X";
        }
    }
})
document.getElementById("btnLimpiar").addEventListener("click", function(){
    let cajas = document.getElementsByClassName("caja");
    for(const elemento of cajas){
        elemento.classList.remove("x");
        elemento.classList.remove("o");
    }
})