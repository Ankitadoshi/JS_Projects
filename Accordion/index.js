window.onload = function(){
    var headers = document.getElementsByClassName('header');
    var text = document.getElementsByClassName('text');
    for(var i=0; i<headers.length; i++){
        headers[i].addEventListener("click", function(event){
            var nextelem;
                for(var j=0; j<headers.length; j++){
                    headers[j].classList.toggle("active");
                    nextelem = headers[j].nextElementSibling;
                    nextelem.style.maxHeight = null;
               }
            this.classList.toggle("active");
            var text = this.nextElementSibling;
            if (text.style.maxHeight){
                text.style.maxHeight = null;
              } else {
                text.style.maxHeight = text.scrollHeight + "px";
              } 
        });
    }
}