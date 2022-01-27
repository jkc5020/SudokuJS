/**
 * Driver file for logic of sudoku
 */

//generate board

import Board from "./Board.js"
const board = new Board()
board.fillValues()
board.printSudoku()




function getData(){
    var form = document.getElementById("inputForm")
    var text = ""
    var x = form.elements[0].value
    var y = form.elements[1].value
    var num = form.elements[2].value
   

    document.getElementById("demo").innerHTML = text;
    form.reset()


    populateTable(x, y, num)
    
}

function populateTable(x, y, num){

    var table = document.getElementById("board")
    if(num > 1 || num < 9){
        if(table.rows[x].cells[y].className != "original"){
            table.rows[x].cells[y].innerHTML = num
            board.updateBoard(table)
        }

        else{
            window.alert("Warning: Can't change an original cell")
        }
    }   

    else{
        window.alert("Warning: Number has to be between 0's of 1 & 9 inclusive")
    }



}

let button = document.querySelector("button")
button.addEventListener("click", (event) =>{
    getData();

    

})

let button2 = document.getElementById("verify")
button2.addEventListener("click", (event) =>{
    console.log("clicked!")
    board.verify();
})

