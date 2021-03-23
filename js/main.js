const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});



// cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const openModal = function(){
	modalCart.classList.add('show');
};

const closeModal = function(){
	modalCart.classList.remove('show')
};
modalCart.addEventListener('click', function(){
	if(event.target.classList.contains('overlay')||event.target.classList.contains('modal-close')){
		closeModal();
	}
});


buttonCart.addEventListener('click', openModal);


// scroll smooth


{
	const scrollLink = document.querySelectorAll('a.scroll-link');


	for(let i = 0; i < scrollLink.length; i++){
		scrollLink[i].addEventListener('click', function(event){
			event.preventDefault();
			const id = scrollLink[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		});
	}	
}
