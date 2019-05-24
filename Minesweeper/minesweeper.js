Game={
    $board:$('.board'),
    mineCountVal:[],
    generateGrid : function(){
        for(var i=0; i<10; i++){
            Game.$board.append('<div class="row"></div>');
            var $row = Game.$board.find('.row:last-child');
            for(var j=0; j<10; j++){
                $row.append('<div class="cell" mine="false" id="cell-'+i+'-'+j+'" row ="'+i+'" col="'+j+'"></div>');
            }
        }
        Game.addMines();
    },
    addMines: function(){
        for(var i=0; i<20; i++){
            var row=Math.round(Math.random()*10);
            var col=Math.round(Math.random()*10);
            var $cell=$('#cell-'+row+'-'+col);
            $cell.attr('mine', 'true');
        }
    },
    revealMines: function(){
        for(var i=0; i<10; i++){
            for(var j=0; j<10; j++){
                var $cell=$('#cell-'+i+'-'+j);
                var isMine = $cell.attr('mine');
                if(isMine === 'true'){
                    $cell.addClass('mine');
                }
            }
        }
    },
    getMineCount: function(row, col){
        var row=parseInt(row);
        var col=parseInt(col);
        var $cell = $('#cell-'+row+'-'+col);
        if($cell.text() === ''){
            $cell.addClass('clicked');
            var mineCount = 0;
            if($('#cell-'+(row-1)+'-'+(col-1)) && $('#cell-'+(row-1)+'-'+(col-1)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+(row-1)+'-'+col) && $('#cell-'+(row-1)+'-'+col).attr('mine') === 'true'){
                mineCount++;
            } 
            if($('#cell-'+(row-1)+'-'+(col+1)) && $('#cell-'+(row-1)+'-'+(col+1)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+(row+1)+'-'+(col-1)) && $('#cell-'+(row+1)+'-'+(col-1)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+(row+1)+'-'+col) && $('#cell-'+(row+1)+'-'+(col)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+(row+1)+'-'+(col+1)) && $('#cell-'+(row+1)+'-'+(col+1)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+row+'-'+(col-1)) && $('#cell-'+row+'-'+(col-1)).attr('mine') === 'true'){
                mineCount++;
            }
            if($('#cell-'+row+'-'+(col+1)) && $('#cell-'+row+'-'+(col+1)).attr('mine') === 'true'){
                mineCount++;
            }
            Game.mineCountVal[row] = true;
            Game.mineCountVal[row][col] =  true;
            $cell.text(mineCount);
            if(mineCount == 0){
                if(row>0 && col>0 && !(Game.mineCountVal[row-1] && Game.mineCountVal[row-1][col-1]))
                    Game.getMineCount(row-1, col-1);
                if(row>0 && !(Game.mineCountVal[row-1] && Game.mineCountVal[row-1][col]))
                    Game.getMineCount(row-1, col);
                if(row>0 && col<9 && !(Game.mineCountVal[row-1] && Game.mineCountVal[row-1][col+1]))
                    Game.getMineCount(row-1, col+1);
                if(row<9 && col>0 && !(Game.mineCountVal[row+1] && Game.mineCountVal[row+1][col-1]))
                    Game.getMineCount(row+1, col-1);
                if(row<9 && !(Game.mineCountVal[row+1] && Game.mineCountVal[row+1][col]))
                    Game.getMineCount(row+1, col);
                if(row<9 && col<9 && !(Game.mineCountVal[row+1] && Game.mineCountVal[row+1][col+1]))
                    Game.getMineCount(row+1, col+1);
                if(col>0 && !(Game.mineCountVal[row] && Game.mineCountVal[row][col-1]))
                    Game.getMineCount(row, col-1);
                if(col<9 && !(Game.mineCountVal[row] && Game.mineCountVal[row][col+1]))
                    Game.getMineCount(row, col+1);

            }
        }
        
    }

}
$(function(){
    $('document').ready(function(){
        Game.generateGrid();
    });
    $('.board').click(function clickCell(e){
        if($(e.target).hasClass('cell')){
            var $cell = $(e.target);
            if($cell.attr('mine') === 'true'){
                $('#outcome').text('Game Over!');
                Game.revealMines();
            } else{
                var row = $cell.attr('row');
                var col = $cell.attr('col');
                Game.getMineCount(row, col)
            }
        }
    });
    $('.resetBtn').click(function(){
        $('.board').empty()
        Game.generateGrid();
    });
})