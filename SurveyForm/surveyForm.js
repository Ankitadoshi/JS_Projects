SurveyForm = {
    curr_ques : 1,
    total_ques: null,
    user_data: {},
    data: null,
    init: function()
    {
        SurveyForm.fetchData();
    },     
    fetchData: function(){
        fetch('https://flipkart-survey-mock.now.sh/')
        .then(function(response) {
            return response.json();
        }).then(function(mJson){
            SurveyForm.data = mJson;
            SurveyForm.total_ques = mJson.length;
        }).then(function(){
            SurveyForm.buildLayout();
        });
    },
    buildLayout: function(){
        var header=document.getElementById('header');
        var currData= SurveyForm.data[SurveyForm.curr_ques-1];
        var quesContainer = document.getElementById('question');
        var skipBtn = document.getElementById('skipBtn');
        var continueBtn = document.getElementById('continueBtn');
        var resultsBtn = document.getElementById('results');
        var options = document.getElementById('ans_options');
        var hint = document.getElementById('hint');
        header.innerHTML = "Question "+SurveyForm.curr_ques+"/"+SurveyForm.total_ques;
        quesContainer.innerHTML = currData.question.text;
        if(this.curr_ques === this.total_ques){
            skipBtn.classList.add('hide');
            continueBtn.classList.add('hide');
            resultsBtn.classList.remove('hide');
        } else {
            resultsBtn.classList.add('hide');
        }
        if(currData.required){
            skipBtn.classList.add('hide');
            continueBtn.classList.add('hide');
        } else {
            skipBtn.classList.remove('hide');
        }

        var container = document.createElement('div');
        container.classList.add('col');
        var j=0;
        for(var i=0; i<currData.options.length/currData.optionsPerRow; i++){
            var row=document.createElement('div');
            row.classList.add('row');
            container.append(row);
            var k=0;
            while(j<currData.options.length && k<currData.optionsPerRow){
                var elemcontainer= document.createElement('div');
                elemcontainer.classList.add('elemcontainer');
                var input = document.createElement('input');
                if(currData.multiSelect){
                    hint.classList.remove('hide');
                    input.setAttribute('type', 'checkbox');
                    input.setAttribute('value', currData.options[j].value);
                    input.setAttribute('id', j);
                } else {
                    hint.classList.add('hide');
                    input.setAttribute('type', 'radio');
                    input.setAttribute('name', 'Question'+SurveyForm.curr_ques);
                    input.setAttribute('value', currData.options[j].value);
                    input.setAttribute('id', j);
                }
               
                var label = document.createElement('label');
                    label.setAttribute('for', j);
                    label.innerHTML= currData.options[j].label.text;
                    input.append(label);
                    elemcontainer.append(input);
                if(currData.options[j].img){
                    var img = document.createElement('img');
                    img.classList.add('img');
                    img.setAttribute('src', currData.options[j].img.src);
                    elemcontainer.append(img);
                }
                elemcontainer.append(label);
                k++;
                j++
                row.append(elemcontainer);
            }
        }
        options.innerHTML ='';
        options.append(container);
    }
}
window.onload = function(){
    SurveyForm.init();
    var skipBtn = document.getElementById('skipBtn');
    var continueBtn = document.getElementById('continueBtn');
    var resultsBtn = document.getElementById('results');
    skipBtn.onclick = function(){
        SurveyForm.curr_ques +=1;
        SurveyForm.user_data['Question'+SurveyForm.curr_ques] = [];
        SurveyForm.buildLayout();
    };
    continueBtn.onclick= function(){
        SurveyForm.curr_ques +=1;
        SurveyForm.buildLayout();
    };
    resultsBtn.onclick = function(){
        document.body.innerHTML='';
        for(ques in SurveyForm.user_data){
            var div = document.createElement('div');
            div.innerHTML = ques+': '+SurveyForm.user_data[ques].join(',');
            document.body.append(div);
        }
    };
    document.onclick=function(event){
        var input = event.target
        var currData = SurveyForm.data[SurveyForm.curr_ques-1];
        var continueBtn = document.getElementById('continueBtn');
        if(input!= resultsBtn && input.parentElement.classList.contains('elemcontainer')){
            var inputArr = document.getElementsByTagName('input');
            for(var i=0; i<inputArr.length; i++){
                inputArr[i].parentElement.classList.remove('highlight');
            }
            input.parentElement.classList.add('highlight');
            if(currData.required && SurveyForm.curr_ques !== SurveyForm.total_ques){
                continueBtn.classList.remove('hide');
            } else {
                skipBtn.classList.add('hide');
            }
            if(!currData.multiSelect){
                SurveyForm.user_data['Question'+SurveyForm.curr_ques] = [];
            }
            if(SurveyForm.user_data['Question'+SurveyForm.curr_ques]){
                SurveyForm.user_data['Question'+SurveyForm.curr_ques].push(input.value);
            } else {
                SurveyForm.user_data['Question'+SurveyForm.curr_ques] = [];
                SurveyForm.user_data['Question'+SurveyForm.curr_ques].push(input.value);
            }
        }
    }
};
