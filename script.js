console.log("Ready !");
window.addEventListener("load", () => {
	console.log("Hello world !");

	window.safe = new Safelocker();
});


/* Fonction pour l'animation classieuse -- /!\ Nécessite [animate.min.css] /!\ */
function fancySlide(e) {
	e.classList.remove("animate__animated", "animate__fadeOut", "animate__delay-2s", "display");
	void e.offsetWidth;
	e.classList.add("animate__animated", "animate__fadeOut", "animate__delay-2s", "display");
}
/* Fonction pour la desactivation des boutons */
function disabled(f) {
	for(let i = 0; i < f.length; i++)
	{
		f[i].setAttribute('disabled', 'disabled');
	}
}


/* Début de l'interstellaire keypad */
class Safelocker {
	constructor() {
		this.code = document.querySelector("#code");
		this.remainingLives = document.querySelector("#lives");
		this.yellAtMe = document.querySelector("#yell");
		this.allBtn = document.querySelectorAll(".btn");
		this.button = document.querySelectorAll(".btn-info");
		this.check = document.querySelector('button[value="check"]');
		this.remove = document.querySelector('button[value="redo"]');
		this.limit = 0;
		this.tries = 3;
		this.mySecretCode = 7777;

		/* Evénements */
		for(let j = 0; j < this.button.length; j++) {
			this.button[j].addEventListener('click', () => {
				this.addNbr(this.button[j].value);
			});
		}
		this.remove.addEventListener('click', () => {
			this.redoCode();
		});
		this.check.addEventListener('click', () => {
			this.checkCode();
		});
	}

	addNbr(keypad) {
		/* Ajoute le chiffre uniquement si inférieur à la limite (4) */
		if(this.limit < 4) {
			let text = document.createTextNode(keypad);
			this.code.appendChild(text);

			console.log(`Le nombre ${keypad} a été ajouté.`);
			this.limit++;
		}
	}

	/* Vérification du code actuel avec le code secret */
	checkCode() {
		/* Si les deux codes correspondent, c'est gagné */
		if(this.mySecretCode == this.code.innerText) {
			this.code.classList.add("text-success");

			disabled(this.allBtn);

			fancySlide(this.yellAtMe);
			this.yellAtMe.textContent = "C'est dévérouillé ! Youpi !";

			console.log("C'est dévérouillé ! Youpi !");
		} 
		/* Sinon, supprimer un essai */
		else {
			/* Enlever un rond pour mettre une croix (affichage des essais) */
			let lostLives = this.remainingLives.innerText;
			lostLives = lostLives.replace("⭕","❌");
			this.remainingLives.textContent = lostLives;

			/* Si il ne restait plus qu'une vie, c'est la fin de la partie */
			if(this.tries == 1) { 
				disabled(this.allBtn);

				this.code.classList.add("text-danger");
				this.code.textContent = "XXXX";

				fancySlide(this.yellAtMe);
				this.yellAtMe.textContent = "Pas de chance ! Peut-être une autre fois";
				classList.add("");

				console.log("Adieu la carte.");
			}
			/* Sinon, effacer le code, supprimer un essai et remettre le compteur de chiffre à 0 */
			else { 
				this.tries--;
				this.code.textContent = "";
				this.limit = 0;

				fancySlide(this.yellAtMe);
				this.yellAtMe.textContent = `Code érroné. Encore ${this.tries} chance(s)`;

				console.warn(`Erreur. Encore ${this.tries} chances.`); 
			} 
		}
	}

	redoCode() {
		/* Détecter si il y a un code, supprimer un caractère */
		if(this.code.innerText !== '') {
			let newString = this.code.innerText;

			newString = newString.slice(0,-1);
			this.code.textContent = newString;

			this.limit--;
			console.log("1 caractère effacé.");
		}
		/* Sinon, engueuler l'utilisteur */ 
		else {
			fancySlide(this.yellAtMe);
			this.yellAtMe.textContent = `Il n'y a rien à effacer`;
			console.warn("Il n'y a rien à effacer.");
		}
	}

}