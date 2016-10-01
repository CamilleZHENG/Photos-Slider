'use strict';   // Mode strict du JavaScript

/*DONNEES CARROUSEL */
// Codes des touches du clavier.
const TOUCHE_ESPACE = 32;
const TOUCHE_GAUCHE = 37;
const TOUCHE_DROITE = 39;
// La liste des slides du carrousel.
var slides =
[
    { image: 'images/1.jpg', legend: 'Street Art'          },
    { image: 'images/2.jpg', legend: 'Fast Lane'           },
    { image: 'images/3.jpg', legend: 'Colorful Building'   },
    { image: 'images/4.jpg', legend: 'Skyscrapers'         },
    { image: 'images/5.jpg', legend: 'City by night'       },
    { image: 'images/6.jpg', legend: 'Tour Eiffel la nuit' }
];

// Objet contenant l'état du carrousel.
var state =
{
    index : 0,      // On commence à la première slide
    timer : null,  // Le carrousel est arrêté au démarrage
    duration : 2000,
	buttonPlay:null 
};

/*********************** FONCTIONS CARROUSEL *****************************/
function hasard(min, max)
{
	var num = Math.random()*(max - min);
	num = num + min;
	num = Math.round(num);
	return num;
}

function refreshSlider()
{
	var sliderImage;
	var sliderLegend;
	
	 // Recherche des balises de contenu du carrousel.
    sliderImage  = document.querySelector('#slider img');
    sliderLegend = document.querySelector('#slider figcaption');
	
	// Changement de la source de l'image et du texte de la légende du carrousel.
    sliderImage.src          = slides[state.index].image;
    sliderLegend.textContent = slides[state.index].legend;
}

function onSliderNext()// Passage à la slide suivante.
{
	if(state.index === slides.length - 1)
	{
		state.index = 0;
	}
	else
	{
		state.index++;
	}
	// Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderPrev()
{
	// Passage à la slide précédente.
    if(state.index === 0)
	{
		state.index = slides.length - 1;
	}
	else
	{
		state.index--;
	}
	// Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderRandom()
{
	var indexActuel = state.index;
	do{
		state.index = hasard(0, slides.length - 1);
	}while(state.index === indexActuel);
	refreshSlider();
}

function cacherOuAfficher(){
	var toolbar = document.querySelector('.toolbar>ul');
    toolbar.classList.toggle("hide");
    /*Une option pour changer icone:
    quand la barre d'outil est caché, c'est icone dans le sens "droite"
    quand la barre d'outil est affiché, c'est icone dans le sens "vers le bas" */
    var icon = document.querySelector('#toolbar-toggle i');//chopper la balise<i> à l'intérieur de <a>
    //à l'état initial (barre d'outil est "affiché")-vers le bas-fa-arrow-down
    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-right');  
}

function startCarrousel(){
	state.timer = window.setInterval(onSliderNext, state.duration);
}
function stopCarrousel(){
	window.clearInterval(state.timer);
	state.timer = null;
}
function onCarrouselToggle() {
	if(state.timer === null){
		startCarrousel();
		this.title = 'Arrêter le carrousel';
	}
	else{
		stopCarrousel();
		this.title = 'Démarrer le carrousel';
	}
	state.buttonPlay 
	= document.querySelector('#slider-toggle i');
	state.buttonPlay.classList.toggle("fa-play");
	state.buttonPlay.classList.toggle("fa-pause");
}
/*
function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case TOUCHE_DROITE: // Touche Gauche
			onSliderPrev();
			break;
			
		case TOUCHE_ESPACE: // Touche Droite
			onSliderNext();
			break;
			
		case TOUCHE_GAUCHE: // Touche Espace
			onSliderToggle();
			break;
	}
}
*/

function onKeyDown(event)
{
	if(event.keyCode == TOUCHE_GAUCHE)
	{
		onSliderPrev();
	}
	else if(event.keyCode == TOUCHE_DROITE)
	{
		onSliderNext();
	}
	else if(event.keyCode == TOUCHE_ESPACE)
	{
		onSliderToggle();
	}
}

/***********************CODE PRINCIPAL*****************************/
document.addEventListener('DOMContentLoaded', function()
{
	refreshSlider();
	
	var buttonPlay = document.querySelector('#slider-toggle');
	buttonPlay.addEventListener('click', onCarrouselToggle);

	var seeOrNot = document.querySelector('#toolbar-toggle');
	seeOrNot.addEventListener('click',cacherOuAfficher);

	var buttonNext = document.querySelector('#slider-next');
	buttonNext.addEventListener('click', onSliderNext);


//touche haut 38,bas 40,gauche 37,droit 39,espace 32


	var buttonBefore = document.querySelector('#slider-previous');
	buttonBefore.addEventListener('click', onSliderPrev);

	var buttonRandom = document.querySelector('#slider-random');
	buttonRandom.addEventListener('click', onSliderRandom);


	document.addEventListener('keydown', onKeyDown);

});
