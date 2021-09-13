'use-strict';

const $computer = document.querySelector('#computer');
const $countGames = document.querySelector('#countGames');
const $countWins = document.querySelector('#countWins');
const $countLoses = document.querySelector('#countLoses');
const $message = document.querySelector('#message');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const IMG_URL = 'rsp.png';
const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};

// 함수 - 가위바위보 loop
let computerChoice = 'scissors';

const changeComputerHand = () => {
  if (computerChoice === 'scissors') {
    computerChoice = 'rock'; // 가위 -> 바위
  } else if (computerChoice === 'rock') {
    computerChoice = 'paper'; // 바위 -> 보
  } else if (computerChoice === 'paper') {
    computerChoice = 'scissors'; // 보 -> 가위
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0 / auto 200px`;
};

// 함수 - 버튼 클릭
let intervalId = setInterval(changeComputerHand, 50);
let clickable = true;
let scoreTable = {
  scissors: 1,
  rock: 2,
  paper: 3,
};

const clickButton = (event) => {
  if (clickable) {
    // loop 멈춤
    clearInterval(intervalId);

    // 버튼 비활성화
    clickable = false;

    // 클릭한 버튼 저장
    const myChoice =
      event.target.textContent === '가위'
        ? 'scissors'
        : event.target.textContent === '바위'
        ? 'rock'
        : 'paper';

    // 승-무-패 계산
    // scissors: 1, rock: 2, paper: 3
    // myChoice - computerChoice
    // my/com   | scissors |  rock |  paper
    // scissors |    0     |   -1  |   -2
    // rock     |    1     |   0   |   -1
    // paper    |    2     |   1   |   0

    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;
    let message;

    // 무승부 일 때
    if (diff === 0) {
      message = '비겼습니다!';
    }

    // 이기거나 졌을 때
    if ([1, -2].includes(diff)) {
      message = '이겼습니다!';
      $countWins.textContent++;
      $countGames.textContent++;
    } else if ([-1, 2].includes(diff)) {
      message = '졌습니다!';
      $countLoses.textContent++;
      $countGames.textContent++;
    }

    $message.textContent = message;

    if ($countWins.textContent == 3) {
      $message.textContent = '컴퓨터에게 가위바위보를 승리했습니다!';
      return;
    } else if ($countLoses.textContent == 3) {
      $message.textContent = '컴퓨터에게 가위바위보를 패배했습니다!';
      return;
    }

    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
