const animated = document.querySelectorAll('._animated');

// Кнопка меню адаптив
const toggleButton = document.querySelector('.nav_toggle');
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('toggle');
}) 



window.onload = init;

function init() {
    doScroll();
    setTimeout(scroll, 500);
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


