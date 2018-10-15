let clickedArray = [];
let interval;
let started = false;
let time = 0;
let numCompleted = 0;
const answersArray = [];

const randomAnswers = () => {
    answersArray[0] = new Image();
    answersArray[0].src = './images/cat1.png';
    answersArray[0].name = 'cat1';
    answersArray[1] = new Image();
    answersArray[1].src = './images/cat1.png';
    answersArray[1].name = 'cat1';
    answersArray[2] = new Image();
    answersArray[2].src = './images/cat2.png';
    answersArray[2].name = 'cat2';
    answersArray[3] = new Image();
    answersArray[3].src = './images/cat2.png';
    answersArray[3].name = 'cat2';
    answersArray[4] = new Image();
    answersArray[4].src = './images/cat3.png';
    answersArray[4].name = 'cat3';
    answersArray[5] = new Image();
    answersArray[5].src = './images/cat3.png';
    answersArray[5].name = 'cat3';
    answersArray[6] = new Image();
    answersArray[6].src = './images/cat4.png';
    answersArray[6].name = 'cat4';
    answersArray[7] = new Image();
    answersArray[7].src = './images/cat4.png';
    answersArray[7].name = 'cat4';
    answersArray[8] = new Image();
    answersArray[8].src = './images/cat5.png';
    answersArray[8].name = 'cat5';
    answersArray[9] = new Image();
    answersArray[9].src = './images/cat5.png';
    answersArray[9].name = 'cat5';
    answersArray[10] = new Image();
    answersArray[10].src = './images/cat6.png';
    answersArray[10].name = 'cat6';
    answersArray[11] = new Image();
    answersArray[11].src = './images/cat6.png';
    answersArray[11].name = 'cat6';
    answersArray.sort(() => 0.5 - Math.random());
   
    return answersArray; 
 };

 randomAnswers();
configurations();

function configurations(){
    const cellsArray = document.getElementsByClassName("card");
    
    for(let i = 0;  i < cellsArray.length; i++){
        let cell = cellsArray[i];
        const answers = answersArray;
        const image = document.createElement("img");
        cell.children[1].appendChild(image);
        image.setAttribute("src", answers[i].src);
        image.setAttribute("name", answers[i].name);
        cell.completed = false;
        cell.clicked = false;
        

    cell.onmouseenter = () =>{
        if(event.currentTarget.completed == false && event.currentTarget.clicked == false){
        cell.style.background = "orange";
    };
    };
    cell.addEventListener("mouseleave",()=>{
        if(event.currentTarget.completed == false && event.currentTarget.clicked == false){
        cell.style.background = "white";
    };
    });
    cell.addEventListener("click", function(event){
         
        startTimer();
        if(event.currentTarget.completed == false && event.currentTarget.clicked == false){
           
        clickedArray.push(event.currentTarget);self
        cell.style.background = "white";
        reveal(event.currentTarget);
    };
   
    if(clickedArray.length == 2){
       
        if(clickedArray[0].children[1].children[0].name == clickedArray[1].children[1].children[0].name){
            
            complete(clickedArray[0]);
            complete(clickedArray[1]);
        
            clickedArray = [];
            if(numCompleted == 12){
                setTimeout(() =>{
                alert(`You won in ${time} seconds!`);
                clearInterval(interval);
                }, 1500);
            } 
        }
        else{
            ready = false;
            setTimeout(() =>{
                clickedArray[0].classList.remove("flip");
                clickedArray[1].classList.remove("flip");  
                hide(clickedArray[0]);
                hide(clickedArray[1]);
                clickedArray = [];
                ready = true;
            },1000);

        }
    };
    });
}
document.getElementById('restart').addEventListener('click', function(){
    location.reload();
});
}
function startTimer(){
  if(started == false){
    interval = setInterval(() =>{
          time++;
          document.getElementById("timer").innerHTML = `Time passed: ${time}`;
      }, 1000);
      started = true;
  }
};
function reveal(cell){
    cell.style.transform = "rotateY(-180deg)";
    cell.style.transition = "transform 0.8s"; 
    cell.clicked = true;
};
function hide(cell){
    cell.style.transform = "rotateY(0deg)";
    cell.style.transition = "transform 2s";  
    cell.clicked = false;
    console.log(cell.clicked);
};
function complete(cell){
    numCompleted++;
    setTimeout(function(){
    cell.style.visibility = "hidden";
    }, 1000);
    cell.completed = true;
};
