With some extra time on the contract the final coding quiz can finally be released. There are functionality requirements that I will touch on briefly.
When you click the start button the quiz will begin and a timer will start off. You will then be presented with the first question. 
Each new question wipes away the html page using the .innerHTML command. This will populate all of the questions which are objects stored into an arry.
<img src=./assets/images/questions-ss.png>
Each array has a question and answer object that gets called upon when verified it was right or wrong it verifies and respons if you have the correct
answer.
<img src=./assets/images/answers-ss.png>
When the timer runs out the quiz ends and your score is displayed.
Your Score after completing the quiz is saved in local storage and can be cleared when you are displayed the final scores page. 