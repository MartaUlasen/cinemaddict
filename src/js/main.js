import Pikaday from 'pikaday';



const container = document.querySelector('.js-container');
const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	clearContainer();
	getIntroduceForm();
});

function clearContainer() {
	container.textContent = '';
}

function getQuizForm() {
	const form = document.createElement('form');
	form.className = 'quiz';
	for(let i = 0; i < questions.length; i++) {
		if (questions[i].type === 'input') {
			const template = document.querySelector('.js-question-input');
			const clone = document.importNode(template.content, true);
			clone.querySelector('.js-question__title').textContent = `Question ${i}/${questions.length}`;
			clone.querySelector('.js-question__content').textContent = questions[i].question;
			clone.querySelector('.js-text-input').placeholder = 'Your answer';
			form.appendChild(clone);	
		} 
	}
	const btnPrevious = document.createElement('button');
	btnPrevious.className = 'button btn-previous js-previous';
	btnPrevious.type = 'submit';
	btnPrevious.innerHTML = 'Previous';
	const btnNext = document.createElement('button');
	btnNext.className = 'button btn-next js-next';
	btnNext.type = 'submit';
	btnNext.innerHTML = 'Next';
	const btns = document.createElement('div');
	btns.className = 'buttons';
	btns.appendChild(btnPrevious);
	btns.appendChild(btnNext);
	container.appendChild(form);
	container.appendChild(btns);
}

function getIntroduceForm() {
	const form = document.createElement('form');
	
	const template = document.querySelector('.js-form-introduce');
	const clone = document.importNode(template.content, true);	
	
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
	const picker = new Pikaday({ field: document.getElementById('datepicker') });
	
}

const questions = [
		{
			question: "Угадайте фильм по цитате из него: 'I’m going to make him an offer he can’t refuse'",
			type: "radio",
			variantsOfAnswers: "Lock, Stock and Two Smoking Barrels, Snatch, The Godfather",
			answers: "The Godfather"
		},
		{
			question: "В каком году вышел фильм?",
			type: "input",
			variantsOfAnswers: "",
			answers: "1994"
		},
		{
			question: "Какие актеры снимались в фильме Одиннадцать друзей Оушена?",
			type: "checkbox",
			variantsOfAnswers: "Джордж Клуни, Брэд Питт, Мэтт Дэймон, Джулия Робертс, Том Круз",
			answers: "Джордж Клуни, Брэд Питт, Мэтт Дэймон, Джулия Робертс"
		},
		{
			question: "Угадайте фильм по его описанию: 'A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.'",
			type: "checkbox",
			variantsOfAnswers: "Lock, Stock and Two Smoking Barrels, Snatch, The Man from U.N.C.L.E, RocknRolla",
			answers: "Lock, Stock and Two Smoking Barrels"
		},
		{
			question: "В каком году родился Ди Каприо?",
			type: "input",
			variantsOfAnswers: "",
			answers: "1974"
		},
		{
			question: "Отец Люка Скайуокера?",
			type: "radio",
			variantsOfAnswers: "Дарт Вейдер, Оби-Ван Кеноби",
			answers: "Дарт Вейдер"
		},
		{
			question: "______: A Dog's Tale ?",
			type: "input",
			variantsOfAnswers: "",
			answers: "Hachi"
		},
	];