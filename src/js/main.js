import Pikaday from 'pikaday';

const PREV = 320;
const NEXT = -320;

let x = 0;

const container = document.querySelector('.js-container');
const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	clearContainer();
	getIntroduceForm();
});

const user = {};

function clearContainer() {
	container.textContent = '';
}

function getIntroduceForm() {
	const form = document.createElement('form');
	const template = document.querySelector('.js-form-introduce');
	const clone = document.importNode(template.content, true);	
	clone.querySelector('.js-name').addEventListener('input', e => {
		user.name = e.target.value;
		console.log(user)
	});
	const gend = clone.querySelectorAll('input[name=gend]');
	gend.forEach(element => {
	  element.addEventListener('change', e => {
		user.gend = e.target.value;
		console.log(user);
	  });
	});
	  
	const btnResume = document.createElement('button');
	btnResume.className = 'button btn-resume js-resume';
	btnResume.type = 'submit';
	btnResume.innerHTML = 'Resume';
	btnResume.addEventListener('click', function() {
		clearContainer();
		getQuizForm();
	});
	form.appendChild(clone);
	container.appendChild(form);
	container.appendChild(btnResume);
	const picker = new Pikaday({ 
		field: document.getElementById('datepicker'),
		yearRange: [1900, (new Date()).getFullYear()],
		maxDate: new Date()
    });
	
	const birthday = document.querySelector('.js-datepicker');
	birthday.addEventListener('change', e => {
		user.age = getAge(e.target.value);
		console.log(user);
	  });
}


function getAge(dateString) {
	const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getQuizForm() {
	const form = document.createElement('form');
	form.className = 'quiz';
	const quiz = document.createElement('div');
	quiz.className = 'questions';
	for(let i = 0; i < questions.length; i++) {
		const template = document.querySelector('.js-question');
		const clone = document.importNode(template.content, true);
		clone.querySelector('.js-question__title').textContent = `Question ${i + 1}/${questions.length}`;
		clone.querySelector('.js-question__content').textContent = questions[i].question;
		
		if (questions[i].type === 'input') {
			const templateQuestion = document.querySelector('.js-input');
			const cloneQuestion = document.importNode(templateQuestion.content, true);
			cloneQuestion.querySelector('.js-text-input').placeholder = 'Your answer';
			clone.querySelector('.js-question__answers').appendChild(cloneQuestion);	
		} else {
			for(let j = 0; j < questions[i].variantsOfAnswers.length; j++) {
				const templateQuestion = document.querySelector('.js-radio');
				const cloneQuestion = document.importNode(templateQuestion.content, true);
				cloneQuestion.querySelector('input').name = i;
				cloneQuestion.querySelector('input').value = j;
				cloneQuestion.querySelector('.js-checkbox-label').textContent = questions[i].variantsOfAnswers[j];
				clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
			}
		}
		quiz.appendChild(clone);
		form.appendChild(quiz);
	}	
	const btnPrevious = document.createElement('button');
	btnPrevious.className = 'button btn-previous js-previous';
	btnPrevious.type = 'submit';
	btnPrevious.innerHTML = 'Previous';
	btnPrevious.addEventListener('click', function() {
		slide(PREV);
	});
	const btnNext = document.createElement('button');
	btnNext.className = 'button btn-next js-next';
	btnNext.type = 'submit';
	btnNext.innerHTML = 'Next';
	btnNext.addEventListener('click', function() {
		slide(NEXT);
	});
	const btns = document.createElement('div');
	btns.className = 'buttons';
	btns.appendChild(btnPrevious);
	btns.appendChild(btnNext);
	container.appendChild(form);
	container.appendChild(btns);
}


function slide(value) {
	const block = document.querySelector('.questions');
	const translateX = x + value + 'px';
	if ((translateX !== (-320 * questions.length + 'px')) && 
		(translateX !== (320 + 'px'))) {
		x += value;
		block.style.transform = 'translateX(' + translateX + ')';
	}
}

const questions = [
	{
		question: 'Guess the movie from the quote: "I am going to make him an offer he can not refuse"',
		type: "radio",
		variantsOfAnswers: ["Lock, Stock and Two Smoking Barrels", 
		"Snatch", "The Godfather"],
		answers: "The Godfather"
	},
	{
		question: "In what year the movie Inception was released?",
		type: "input",
		variantsOfAnswers: "",
		answers: "2010"
	},
	{
		question: "Who starred in the movie Ocean's Eleven?",
		type: "checkbox",
		variantsOfAnswers: [" George Clooney", " Brad Pitt", 
		"Matt Damon", "Julia Roberts", "Tom Cruise"],
		answers: [" George Clooney", " Brad Pitt", "Matt Damon", 
		"Julia Roberts"]
	},
	{
		question: 'Guess the movie by storyline: "A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns."',
		type: "checkbox",
		variantsOfAnswers: ["Lock, Stock and Two Smoking Barrels", 
		"Snatch", "The Man from U.N.C.L.E", "RocknRolla"],
		answers: "Lock, Stock and Two Smoking Barrels"
	},
	{
		question: "In what year was born was born Leonardo DiCaprio?",
		type: "input",
		variantsOfAnswers: "",
		answers: "1974"
	},
	{
		question: "Luke Skywalker is the son of...",
		type: "radio",
		variantsOfAnswers: ["Darth Vader", "Ben Obi-Wan Kenobi"],
		answers: "Darth Vader"
	},
	{
		question: "Guess the title of the film: ____: A Dog's Tale",
		type: "input",
		variantsOfAnswers: "",
		answers: "Hachi"
	},
];