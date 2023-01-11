const popupLinks = document.querySelectorAll('.open_link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

// Form update
const mainForm = document.forms.main;
const priceLabel = document.querySelector('.total_price');
const variants = mainForm.form_select;
const numberBook = mainForm.quant;


const delivery = document.querySelector('.delivery');
const modal_card = document.querySelector('.modal_card_1')

const buy_btn = document.querySelector('.buy_btn')

function updatePrice() {
    const price = [1000, 1000, 900];


    
    variants.addEventListener('change', eventE);
    numberBook.addEventListener('change', eventE);
    function eventE() {
        let optionIndex = variants.selectedIndex;
        let numberVal = Number(numberBook.value);
        priceLabel.innerHTML = (price[optionIndex] * numberVal) + ' ₽';
        delivery.classList.add('move');
        modal_card.classList.add('opened');

        updateCards();


        function updateCards() {
            const varCard = document.getElementById('name_v1');
            const les1 = document.getElementById('les1');
            const les2 = document.getElementById('les2');
            const les3 = document.getElementById('les3');
            const les4 = document.getElementById('les4');
        
            if (optionIndex === 1) {
                varCard.innerHTML = 'Вариант 1';
                les1.innerHTML = 'Цифровая печать';
                les2.innerHTML = 'Белая бумага';
                les3.innerHTML = 'Глянцевая твердая обложка';
                les4.innerHTML = 'Размер 15x22 см';
            }

            if (optionIndex === 2) {
                varCard.innerHTML = 'Вариант 2';
                les1.innerHTML = 'Офсетная печать';
                les2.innerHTML = 'Белая бумага';
                les3.innerHTML = 'Твердая обложка';
                les4.innerHTML = 'Размер 14x20 см';
            }
        }
    }
}

//End form update

// More form update





// End form update


omed();
updatePrice();
submitForm();




// SUBMIT

function submitForm() {
    mainForm.addEventListener('submit', formSend);
}
let response;

function formSend(e) {
    e.preventDefault();
    buy_btn.classList.add('loading')
    // Здесь происходит отправка формы  
    fetch('http://localhost:5000/api/v1/create', {
        method: 'POST',
        body: JSON.stringify({
            "name": document.forms.main.name.value,
            "country": document.forms.main.country.value,
            "region": document.forms.main.region.value,
            "city": document.forms.main.city.value,
            "street": document.forms.main.street.value,
            "index": document.forms.main.index.value,
            "house": document.forms.main.home.value,
            "appartment": document.forms.main.appartment.value,
            "phone": document.forms.main.phone.value,
            "email": document.forms.main.email.value,
            "variant": document.forms.main.form_select.value,
            "quant": Number(document.forms.main.quant.value),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
            .then(
                data => {
                    console.log(data)
                    if (data.order) {
                        sendLabel.textContent = 'Спасибо!'
                        sendText.textContent = 'В ближайшее время продавец свяжется с вами по указанной электронной почте для подтверждения заказа.'
                        successSend();
                    }
                    else {
                        console.log(data);
                        sendLabel.textContent = 'Oops...'
                        sendText.textContent = 'Что-то пошло не так, проверьте введённые данные и попробуйте еще раз.'
                        successSend()
                    }
                }
            )
}

function resetForm() {
    setTimeout(function() {
        formContent.classList.remove('close');
        formThanks.classList.add('close');
    }, 800);
}

const formContent = document.querySelector('.all_form_content');
const formThanks = document.querySelector('.all_form_thank');
const closeThank = document.querySelector('.close_btn');


const sendLabel = document.querySelector('.thank_you')
const sendText = document.querySelector('.t_text')

function successSend() {
    formContent.classList.add('close');
    setTimeout(function()   { formThanks.classList.remove('close')}, 500);
    closeThank.addEventListener('click', function (e) {
        popupClose(e.target.closest('.modal_window'));
        resetForm();
    });   
}

function resetForm() {
    setTimeout(function() {
        formContent.classList.remove('close');
        formThanks.classList.add('close');
        mainForm.reset();
        delivery.classList.remove('move');
        modal_card.classList.remove('opened');
        buy_btn.classList.remove('loading')
    }, 800);
}
// END OF SUBMIT



// Меню адаптива

const menu_btn = document.querySelector('.nav_toggle');
const adapt_menu = document.querySelector('.menu_ul');

menu_btn.addEventListener('click', function() {
    if (adapt_menu.classList.contains('open')) {
        adapt_menu.classList.remove('open');
    }
    else {
        adapt_menu.classList.add('open');
    }
})

// Конец меню адаптива



function omed() {
    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function(e) {
                const popupName = popupLink.getAttribute('href').replace("#", "");
                const currentPopup  = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault;
            });
        }
    }
}

const closeIcon = document.querySelectorAll('.closeIcon');
function closeBtn() {
    if (closeIcon.length > 0) {
        for (let i = 0; i < closeIcon.length; i++) {
            const el = closeIcon[i];
            el.addEventListener('click', function(e) {
                popupClose(el.closest('.modal_window'));
                e.preventDefault();
            })
        }
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.modal_window.open');
        if (popupActive) {
            popupClose(popupActive, false);
        }
        else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.modal_window'));
            }
        });
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {unlock = true;}, timeout);
}


function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        resetForm();
        
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyUnlock() {
    setTimeout(function () {
    body.classList.remove('lock');
    body.style.paddingRight = 0;
}, timeout);
}


document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.modal_window.open');
        popupClose(popupActive);
    }
})
