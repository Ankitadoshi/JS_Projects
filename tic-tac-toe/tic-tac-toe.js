Game = {
    cells: null,
    size: null,
    turn:'X',
    $board:$('.board'),
    init:function(size){
        Game.size= size;
        Game.cells = [];
        for (var i = 0; i < Game.size; i++) {
            Game.cells[i] = new Array(Game.size);
          }
          Game.generateBoard();
    },
    generateBoard:function(){
        for(var i=0; i<Game.size; i++){
            Game.$board.append('<div class="row" id=' +i+ '></div>');
            var $row = Game.$board.find('.row:last-child');
            for(var j=0; j<Game.size; j++){
                $row.append('<div class="cell" id="cell-'+i+'-'+j+'" row="'+i+'" col="'+j+'"></div>');
            }
        }
    },
    nextMove:function(col, row){
        Game.cells[col][row] = Game.turn;
        var $cell = $('#cell-'+row+'-'+col);
        $cell.text(Game.turn);
        $cell.addClass(Game.turn);
        Game.makePlay();
        Game.turn = (Game.turn === 'X')? 'O' :'X';
    },
    makePlay: function(){
        if(Game.isWon() || Game.isDraw()){
            Game.displayOutcome();
        }
    },
    isWon:function(){
        return Game.isDiagonalWin() || Game.isRowWin() || Game.isColumnWin();
    },
    isRowWin:function(){
        for(var i=0; i<Game.size; i++){
            var result = Game.cells[0][i];
            for(var j=0; j<Game.size; j++){
                result=result && Game.cells[0][i] === Game.cells[j][i];
            }
            if(result){
                return true;
            }
        }
        return false;
    },
    isColumnWin:function(){
        for(var i=0; i<Game.size; i++){
            var result = Game.cells[i][0];
            for(var j=0; j<Game.size; j++){
                result=result && Game.cells[i][0] === Game.cells[i][j];
            }
            if(result){
                return true;
            }
        }
        return false;
    },
    isDiagonalWin:function(){
        return Game.leftDiagonalWin() || Game.rightDiagonalWin();
    },
    leftDiagonalWin:function(){
        var result = Game.cells[0][0];
        for(var i=0; i<Game.size; i++){
            result = result && Game.cells[0][0] === Game.cells[i][i];
        }
        if(result){
            return true;
        } else {
            return false;
        }
    },
    rightDiagonalWin:function(){
        var result = Game.cells[0][Game.size-1];
        for(var i=0; i<Game.size; i++){
            result =result && Game.cells[0][Game.size-1] === Game.cells[i][Game.size-(i+1)];
        }
        if(result){
            return true;
        } else {
            return false;
        }
    },
    isDraw: function(){
        var result  = Game.cells[0][0];
        for(var i=0; i<Game.size; i++){
            for(var j=0; j<Game.size; j++){
                result = result && ((Game.cells[i][j] === 'X') || (Game.cells[i][j]==='O'));
            }
        }
        if(result){
            return true;
        } else {
            return false;
        }
    },
    displayOutcome:function(){
        $('#outcome').removeClass('hide');
        if(Game.isWon()){
            $('#outcome').text(Game.turn+' won the game!');
        } else if(Game.isDraw()){
            $('#outcome').text('Draw!');
        }
    }
}
$(function(){
    $('.submitBtn').click(function(e){
        var size = parseInt($('.cells_input').val());
        if(!size){
            return;
        }
        $('.container').addClass('hide');
        $('.board').removeClass('hide');
        Game.init(size);
    });
    $('.board').click(function(e){
        if($(e.target).hasClass('cell')){
            if($(e.target).text()){
                return;
            }
        }
        var col = parseInt($(e.target).attr('col'));
        var row = parseInt($(e.target).attr('row'));
        Game.nextMove(col, row);
    })
});