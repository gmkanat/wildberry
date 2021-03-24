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


// {
//     const scrollLink = document.querySelector('a.scroll-link');

//     console.log(scrollLink);
//     for(let i = 0; i < scrollLink.length; i++){
//         scrollLink[i].addEventListener('click', function(event){
//             event.preventDefault();
//             const id = scrollLink[i].getAttribute('href');
//             document.querySelector(id).scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start',
//             })
//         });
//     }	
// }


// Goods

const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-links');
const longGoodsList = document.querySelector('.long-goods-list');
const kana = document.querySelector('.kana')

const getGoods = async function(){
    const result = await fetch('db/db.json');
    if(!result.ok){
        throw 'error' + result.status;
    } 
    return await result.json();
}

getGoods().then(function(data){
    // console.log(data); 
});
/* second variant
fetch('db/db.json').then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
});
*/

const createCard = function(objCard){
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-sm-6';
    card.innerHTML = `
    <div class="goods-card">
    ${objCard.label ? `<span class="label">${objCard.label}</span>`: ''}
    
    <img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
    <h3 class="goods-title">${objCard.name}</h3>
    <p class="goods-description">${objCard.description}</p>
    <button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
        <span class="button-price">$${objCard.price}</span>
    </button>
    </div>
    `;
    return card;
}

const renderCards = function(data){
    longGoodsList.textContent = '';

    const cards = data.map(createCard);
    longGoodsList.append(...cards);
    document.body.classList.add('show-goods');
};


more.addEventListener('click', function(event){
    event.preventDefault();
    getGoods().then(renderCards);
    
});




const filterCards = function(field, value){
    getGoods().then(function(data){
        const filteredGoods = data.filter(function(good){
            return good[field] === value;
        });
        return filteredGoods;
    }).then(renderCards);
};



navigationLink.forEach(function(link){
    link.addEventListener('click', function(event){
        event.preventDefault();
        const field = link.dataset.field;
        const value = link.textContent;
        filterCards(field, value);
    })
});
const fashion = document.querySelector('.fashion');
fashion.addEventListener('click', function(event){
    event.preventDefault();
    const field = 'category';
    const value = 'Accessories';
    filterCards(field, value);
});

const shoeses = document.querySelector('.shoeses');
shoeses.addEventListener('click', function(event){
    event.preventDefault();
    const field = 'category';
    const value = 'Shoes';
    filterCards(field, value);
});

kana.addEventListener('click', function(event){
    event.preventDefault();
    getGoods().then(renderCards);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
