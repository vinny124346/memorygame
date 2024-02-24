document.addEventListener('DOMContentLoaded',  () => {
		const userForm = document.getElementById('userForm');
		const userfeedback = document.getElementById('userFeedback');

		userForm.addEventListener('submit', (e) => {
				e.preventDefault();
				const username = document.getElementById('username').value;
				const feedback = document.getElementById('userReview').value;
				const imageURL = document.getElementById('picture').value;
				const datePublished = new Date().toLocaleDateString();
				const cardInfo = document.createElement('div');
				cardInfo.className = 'w-full rounded-lg border border-red-400/30 overflow-hidden shadow-lg bg-gray-950 text-black p-4 m-4';

				cardInfo.innerHTML = `
				
				<div class='bg-gray-500 w-full h-auto py-2 px-4 rounded-md grid grid-cols-4 gap-4'>
					<div class="col-span-1 flex justify-center items-center">
						<img 
							src=${imageURL}
							alt= "pfp"
							class="w-16 h-16 rounded-full hover:scale-125 animate-pulse"
						/>
					</div>	
						
					<div class="col-span-3">
						<p class='text-indigo-500 font-bold'>Username @${username}</p>
						<p class="">date published: ${datePublished}</p> 
						<p>User Review: ${feedback}</p>
					</div>
				</div>
				`;

				userfeedback.appendChild(cardInfo);
		});
});

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.food === secondCard.dataset.food;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  updateScore(1); // Update score for a match
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function updateScore(points) {
  score += points;
  document.getElementById('score').innerText = `Score: ${score}`;
}

function resetBoard() {
  [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
