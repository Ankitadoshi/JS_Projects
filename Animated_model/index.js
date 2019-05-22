  window.onload = function(){
    var modal = document.getElementsByClassName('modal')[0];
    var button=document.getElementById('myBtn');
    var closeLink = document.getElementsByClassName('close')[0];
    button.onclick = function(){
        modal.style.display="block";
    }
    closeLink.onclick= function(){
        modal.style.display="none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  };