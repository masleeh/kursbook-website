const animated = document.querySelectorAll('._animated');

// Кнопка меню адаптив
const toggleButton = document.querySelector('.nav_toggle');
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('toggle');
}) 


const phoneMasking = document.getElementById('phone')
let phoneLength = phoneMasking.value.length

function masking() {
    phoneMasking.oninput = () => {
        if (phoneMasking.value.length > phoneLength) {
            const maskedNumber = maskPhone(phoneMasking.value)
            phoneMasking.value = maskedNumber
            phoneLength = phoneMasking.value.length
        }
        phoneLength = phoneMasking.value.length
    }
}




function maskPhone(phone) {
    if (!phone) return phone
    const maskedNumber = phone.replace(/[^\d]/g, '').slice(0, 11)
    const vN = (number, array) => {
        if (array[number] === undefined) {
            return ''
        }
        else return array[number]
    }

    return (`+${vN(0, maskedNumber)} (${vN(1, maskedNumber)}${vN(2, maskedNumber)}${vN(3, maskedNumber)}) ${vN(4, maskedNumber)}${vN(5, maskedNumber)}${vN(6, maskedNumber)} ${vN(7, maskedNumber)}${vN(8, maskedNumber)} ${vN(9, maskedNumber)}${vN(10, maskedNumber)}`)
}



window.onload = init;

function init() {
    doScroll();
    setTimeout(scroll, 500);
    masking()
}



function doScroll() {
    if (animated.length > 0) {
        window.addEventListener('scroll', scroll);
    }
}

function scroll() {
    for (let i = 0; i < animated.length; i++) {
        const animItem = animated[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if ( animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if ((pageYOffset > (animItemOffset - animItemPoint)) && pageYOffset < (animItemOffset + animItemPoint)) {
            animItem.classList.add("_active");
        }
        else {
            if (!animItem.classList.contains('_nohide')) {
            animItem.classList.remove("_active");
            }
        }
    }
}


function offset(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        top: rect.top + scrollTop, left: rect.left + scrollLeft 
    }
}


