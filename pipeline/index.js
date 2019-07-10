function Pipeline(tasks){
    this.tasks = tasks || [];
}
Pipeline.prototype.addTask = function(task){
    this.tasks.push(task);
    return this;
}
Pipeline.prototype.runTasks = function(args){
    if(this.tasks.length === 0){
        return args;
    }
    var output = args;
    this.tasks.forEach((task) => {
        if(output && typeof output.then === 'function' ){
            output = output.then(task);
        } else {
            if( typeof task === 'function'){
                output = task(output);
                
            } else {
                output = task;
            }
        }
    }); 
    return output;
}


function promiseDemo(args) { 
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve(args);
        }, 2000);
    });
}
function sum(a,b){
    return a+3;
}

function multiply2(a){
    return a*2;
}
function log(ans){
    console.log(ans);
}

let testPipeline = new Pipeline();
testPipeline.addTask(promiseDemo);
testPipeline.addTask(sum);
testPipeline.addTask(multiply2);
testPipeline.addTask(log);


testPipeline.runTasks(5);

