/**
 * Simulates the board of Sudoku
 */

class Board{
    N
    starter
    SRN
    K

    constructor(){
        this.N = 9 // number of columns/ rows
        this.SRN = Math.floor(Math.sqrt(this.N))
        this.K = 0// No. of missing digits
        //create 2d array representing board
        this.starter = new Array(9)
        for(var i = 0; i < this.starter.length; i++){
            this.starter[i] = new Array(9)
        }

    }



// Fill the diagonal SRN number of SRN x SRN matrices
 fillDiagonal(){
    for(var i = 0; i < this.N; i = i + this.SRN){
        // for the diagonal box, start coordinates -> i == j
        this.fillBox(i, i)
    }
}


//returns false if given 3x3 block contains num
 unUsedInBox(rowStart, colStart, num, verification){
    var count = 0;
    for(var i = 0; i < this.SRN; i ++){
        for(var j = 0; j < this.SRN; j ++){
            if(this.starter[rowStart + i][colStart + j] == num){
                count ++;
            }
                
        
        }
    }
    if(verification){
        return count == 1
    }

    return count < 1

}

// fill a 3 x 3 matrix
 fillBox(row, col){
    var num;
    for(var i = 0; i < this.SRN; i ++){
        for(var j = 0; j < this.SRN; j++){
            do{
                num = this.randomGenerator(this.N)
            } while(!this.unUsedInBox(row, col, num));

            this.starter[row + i][col + j] = num;
        
        }
    }

}

// random generator
 randomGenerator(num){
    return Math.floor(Math.random()*num + 1)

}

 CheckIfSafe(i, j, num, verification){
    var result = this.unUsedInRow(i, num, verification) &&
            this.unUsedInCol(j, num, verification) && 
            this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num, verification)
    return result


}

CheckIfSafeVerify(i, j, num, verification){
    var result = this.unUsedInRow(i, num, verification) ||
            this.unUsedInCol(j, num, verification) ||
            this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num, verification)
    return result

}

 unUsedInRow(i, num, verification){
    var count = 0;
    for(var j = 0; j < this.N; j ++){
        if(this.starter[i][j] == num){
            count ++;
        }
    }
    if(verification){
        return count == 1
    }

    return count < 1
        

}

 unUsedInCol(j, num, verification){
    var count = 0;
    for(var i = 0; i < this.N; i ++){
        if(this.starter[i][j] == num){
            count ++;
        }
        
    }
    if(verification){
        return count == 1
    }

    return count < 1

}

 fillRemaining(i, j){
    if (j >= this.N && i < this.N-1){
        i = i + 1;
        j = 0;
    }
    
    if (i>=this.N && j>=this.N)
        return true;

    if (i < this.SRN)
    {
        if (j < this.SRN)
            j = this.SRN;
    }
    else if (i < this.N - this.SRN)
    {
        
        if (j == Math.floor((i/this.SRN)) * this.SRN)
            j =  j + this.SRN;
    }
    else
    {
        if (j == this.N - this.SRN)
        {
            i = i + 1;
            j = 0;
            if (i >= this.N)
                return true;
        }
    }

    for (var num = 1; num<= this.N; num++)
    {
        if (this.CheckIfSafe(i, j, num, false))
        {
            this.starter[i][j] = num;
            if (this.fillRemaining(i, j+1))
                return true;

            this.starter[i][j] = 0;
        }
    }
    return false;

}

 removeKDigits(){
    var count = this.K;
        while (count != 0)
        {
            var cellId = this.randomGenerator(this.N * this.N)-1;
 
            
            var i = parseInt((cellId / this.N));
            var j = parseInt(cellId%9);
            if (j != 0)
                j = j - 1;
 
            if (this.starter[i][j] != 0)
            {
                count--;
                this.starter[i][j] = 0;
            }
        }

}

 printSudoku(){
    var table = document.getElementById("board")
    for(var i = 0; i < this.starter.length; i ++){
        
        for(var j = 0; j < this.starter.length; j ++){
           
            table.rows[i].cells[j].innerHTML = this.starter[i][j]
            if(this.starter[i][j] != 0){
                table.rows[i].cells[j].classList.add("original")
            }
            

        }
    }

}

updateBoard(table){
    for(var i = 0; i < this.starter.length; i ++){
        for(var j = 0; j < this.starter.length; j ++){
            this.starter[i][j] = parseInt(table.rows[i].cells[j].innerHTML)
        }
    }
    console.log(this.starter)

}
fillValues(){
    this.fillDiagonal() //fill diagonal of SRN x SRN matrices
    
    
    this.fillRemaining(0, this.SRN)  // fill remaining blocks

    this.removeKDigits() //remove randomly k digits to make game
}  

verify(){
    loop1:
    for(var i = 0; i < this.starter.length; i ++){
        console.log(i)
        loop2:
        for(var j = 0; j < this.starter.length; j ++){
            var result = this.CheckIfSafeVerify(i, j, this.starter[i][j], true) || this.starter[i][j] == 0
            if(!result){
                window.alert("Warning: Board invalid")
                return;
                
            }
        }
        
    }
    window.alert("Success: Board is valid!")


}
    
    

}

export default Board