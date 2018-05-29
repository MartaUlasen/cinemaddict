import Pikaday from 'pikaday';
const picker = new Pikaday({ field: document.getElementById('datepicker') });

const questions = [
		{
		  question: "Угадайте фильм по цитате из него: 'I’m going to make him an offer he can’t refuse'",
		  variantsOfAnswers: "",
		  answers: "The Godfather"
		},
		{
		  question: "В каком году вышел фильм?",
		  variantsOfAnswers: "",
		  answers: "1994"
		},
		{
		  question: "Какие актеры снимались в фильме Одиннадцать друзей Оушена?",
		  variantsOfAnswers: "Джордж Клуни, Брэд Питт, Мэтт Дэймон, Джулия Робертс, Том Круз",
		  answers: "Джордж Клуни, Брэд Питт, Мэтт Дэймон, Джулия Робертс"
		},
		{
		  question: "Угадайте фильм по его описанию: 'A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.'",
		  variantsOfAnswers: "Lock, Stock and Two Smoking Barrels, Snatch, The Man from U.N.C.L.E, RocknRolla",
		  answers: "Lock, Stock and Two Smoking Barrels"
		},
		{
		  question: "В каком году родился Ди Каприо?",
		  variantsOfAnswers: "",
		  answers: "1974"
		},
		{
		  question: "Отец Люка Скайуокера?,
		  variantsOfAnswers: "Дарт Вейдер, Оби-Ван Кеноби, Кайло Рен",
		  answers: "Дарт Вейдер"
		},
		{
		  question: "______: A Dog's Tale ?",
		  variantsOfAnswers: "",
		  answers: "Hachi"
		},
	];