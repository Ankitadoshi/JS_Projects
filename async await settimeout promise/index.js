var span = document.getElementById('result');

var add = function(a,b){
    var span = document.getElementById('result');
    var that=this;
    var result = a+b;
    return new Promise(function(resolve, reject){
        
            resolve(result);
    });
    
}
var square = function(a){
    return new Promise(function(resolve){
        resolve(a*a);
    });
}
var addthensquare= function(a,b){
    var span = document.getElementById('result');
    add(a,b).then((result)=>{
        return square(result);
    }).then((result)=>{
        span.innerHTML=`Squared Result: ${result}`;
    })
}


function test(args){
    setTimeout(()=>{
        console.log(args+1);
    }, 2000)
    setTimeout(() => {
        console.log(args+2);
    }, 0);
    promiseDemo(args+3).then((a)=>{
        console.log(a);
    });
    setTimeout(() => {
        console.log(args+4);
    }, 3000);
}

test(2);