
const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let intervalId;
function autoPlay() {
  if (intervalId) {
    clearInterval(intervalId); // stop
    intervalId = null;
  } else {
    intervalId = setInterval(()=> {
      const playerMove = getComputerChoice();
      playGame(playerMove);
    }, 1000); // start
  }
}

document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', ()=>{
  playGame('Scissors');
});


document.querySelector('.auto-play').addEventListener('click', ()=>{
  autoPlay();
})

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScoreElement();

    alert('Score was reset');
});


document.body.addEventListener('keydown', (event)=>{
  if(event.key ==='r'){
    playGame('Rock')
  }else if(event.key === 'p'){
    playGame('Paper')
  }else if (event.key ==='s'){
    playGame('Scissors')
  }
})


function playGame(playerChoice){
  const computerChoice = getComputerChoice();
  let result = '';

  if (playerChoice === 'Paper'){
    if(computerChoice === 'Rock'){
      result = 'You Win';
    }
    else if(computerChoice === 'Paper'){
      result = 'You Tied';
    }
    else{
      result = 'You Lose';
    }
  }
  else if(playerChoice === 'Rock'){
    if(computerChoice === 'Rock'){
      result = 'You Tied';
    }
    else if(computerChoice === 'Paper'){
      result = 'You Lose';
    }
    else{
      result = 'You Win';
    }
  }
  else{
    if(computerChoice === 'Rock'){
      result = 'You Lose';
    }
    else if(computerChoice === 'Paper'){
      result = 'You Win';
    }
    else{
      result = 'You Tied';
    }
  }

  if (result === 'You Win'){
    score.wins += 1;
  }
  else if(result === 'You Lose'){
    score.losses += 1;
  }
  else{
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();



const imageMap = {
    Rock: '../images/rock.png',
    Paper: '../images/paper.jpeg',
    Scissors: '../images/scissors.png'
};


  document.querySelector('.js-moves').innerHTML = `
    You
    <img src="${imageMap[playerChoice]}" class="move-icon">
    vs
    Computer
    <img src="${imageMap[computerChoice]}" class="move-icon">
  `;

  document.querySelector('.js-result').innerHTML = result;
}


function updateScoreElement(){
  document.querySelector('.result').innerHTML =
    `Wins: ${score.wins}<br>
     Losses: ${score.losses}<br>
     Ties: ${score.ties}`;
}

function getComputerChoice(){
  const randomNumber = Math.random();

  if(randomNumber < 1/3){
    return 'Rock';
  }
  else if(randomNumber < 2/3){
    return 'Paper';
  }
  else{
    return 'Scissors';
  }
}
