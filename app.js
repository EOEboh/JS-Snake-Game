document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('start');

    const width = 10;
    let currentIndex = 0; // first div in the grid
    let foodIndex = 0; // first div in the grid
    let currentSnake = [2,1,0]; // div in grid (2 being the head) and (0 being the tail) and (all the 1's being body)
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

// to start and reset the game
function startGame(){
    currentSnake.forEach( index => squares[index].classList.remove('snake')); // so it doesn't look like the snake is lagging
    squares[foodIndex].classList.remove('food');
clearInterval(interval);
score = 0;
randomFood();
direction = 1;
scoreDisplay.innerText = score;
intervalTime = 1000;
currentSnake = [2,1,0];
currentIndex = 0;
currentSnake.forEach(index => squares[index].classList.add('snake'));
interval = setInterval(moveOutcome, intervalTime);

}
//dealing with the outcomes of the snake
function moveOutcome(){
    let modal = document.querySelector('.End-Modal');


    //deals with the snake hitting the border and snake hitting itself
    if(
        (currentSnake[0] + width >= ( width * width) /* i.e 100 */) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top
        
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake hits itself 
    ) {
        modal.classList.add('show');
        closeModal();
        return clearInterval(interval); // this will clear interval if any of the conditions above happen
        
    }
    function closeModal(){
        closeIcon = document.getElementById('closeIcon');
        closeIcon.addEventListener('click', function (){
            modal.classList.remove('show');
            
            
        });
    }

    const tail = currentSnake.pop() // removes the last item from the array and shows it
    squares[tail].classList.remove('snake') // remove class of snake from tail
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to head of array

    // deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('food')){
        squares[currentSnake[0]].classList.remove('food');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomFood();
        score += 1;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake')
}

// random apple
 function randomFood(){
     do{
        foodIndex = Math.floor(Math.random() * squares.length) 
     }while(
         squares[foodIndex].classList.contains('snake'))
         squares[foodIndex].classList.add('food')
     
 }






// assigning the arrow keys to play the game using keycodes
function control(e){
    squares[currentIndex].classList.remove('snake')

   if(e.keyCode === 39){
       direction = 1 // for moving right
   }else if(e.keyCode === 38){
       direction = -width; // for going up; the snake will go back ten divs, appearing to go up
   }else if(e.keyCode === 37){
       direction = -1 // for moving left,
   }else if(e.keyCode === 40){
       direction = +width // for moving down, the snake head will appear in the div ten divs from where it is
   }
}

document.addEventListener('keyup', control);
document.addEventListener('click', startGame)

})