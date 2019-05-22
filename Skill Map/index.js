import React from 'react';
window.onload= function(){
    var addSkillBtn = document.getElementsByClassName('addBtn')[0];
    var modal = document.getElementsByClassName('overlay')[0];
    var modalBody = document.getElementsByClassName('modal')[0];
    var addBtn = document.getElementsByClassName('add')[0];
    var cancelBtn = document.getElementsByClassName('cancel')[0];
    var close = document.getElementsByClassName('close')[0];
    var txtInput = document.getElementById('skillInput');
    var expInput = document.getElementById('expInput');
    var deleteBtn = document.getElementsByClassName('delete')[0];
    addSkillBtn.onclick = function(){
        modal.classList.add('show');
    }
    close.onclick = function(){
        modal.classList.remove('show');
    }
    cancelBtn.onclick = function(){
        modal.classList.remove('show');
    }
    window.onclick = function(event){
        var elem = event.target;
        if(elem == modal){
            modal.classList.remove('show');
        }
    }
    addBtn.onclick = function(){
        if(txtInput.value !== '' && 0 < expInput.value <=10){
            var container = document.createElement('div');
            var skillelem = document.createElement('div');
            var elem = document.createElement('div');
            var span=document.createElement('span');
            container.classList.add('container');
            skillelem.classList.add('skills');
            elem.classList.add(txtInput.value);
            span.innerHTML = txtInput.value;
            elem.style.height = '100%';
            elem.style.width = expInput.value * 10 + '%';
            elem.style.display = 'flex';
            elem.style.backgroundColor = 'green';
            elem.style.alignItems = 'center'; 
            elem.appendChild(span);
            skillelem.appendChild(elem);
            container.appendChild(skillelem);
            document.body.appendChild(container);
        }
        
    }
    
};

