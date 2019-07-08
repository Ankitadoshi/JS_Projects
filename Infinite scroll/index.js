var container = document.querySelector('.container');
var i=1;
var loadMore = function(){
    for(var j=0; j<20; j++){
        var item = document.createElement('li');
        item.innerText = `Item ${i++}`;
        container.appendChild(item);
    }
}
loadMore();
container.onscroll = function(){
    if(container.scrollTop+container.clientHeight >= container.scrollHeight){
        loadMore();
    }
}