class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
     question.hide();
    //write code to change the background color here
     background("yellow");
    //write code to show a heading for showing the result of Quiz
    textSize(25);
     text("My Quiz Game", 140, 75);
    //call getContestantInfo( ) here
    getContestantInfo();
    //write condition to check if contestantInfor is not undefined
     if(allContestants !== undefined){
      var display_position = 130;
      display_position += 20;
      textSize(15);
      text(allContestants[plr].name + ":" + allContestants[plr].distance, 120, display_position); 
     }
    //write code to add a note here
     if(allContestants !== undefined){
       fill("Blue");
       textSize(20);
       text("*Note: Contestant who answered correct are highlighted in green color", 130, 230);
     }
    //write code to highlight contest who answered correctly
     for(var plr in allContestants){
       var correctAns = "2";
       if (correctAns === allContestants[plr].answer){
       fill("Green");
       }
       else{
         fill("red");
       }
      }
      if(plr.correctAns){
        textSize(25);
        text("You Won", 300, 25);
      }
  }

}
