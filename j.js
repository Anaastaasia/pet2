// Смена темы карточек

const block = document.querySelectorAll('.seventh__twoTabl_class')
const blockArr = Array.from(block);

blockArr.forEach(block => {
    // Функция для добавления стилей при наведении или касании
    const addHoverStyles = () => {
        console.log(block);
        block.classList.add('seventh__twoTabl_class_hover');
        block.classList.remove('seventh__twoTabl_class');

        const pdf = block.querySelectorAll(".pdf");
        const pdfArr = Array.from(pdf);

        pdfArr.forEach(pdf => {
            console.log(pdf);
            pdf.classList.add("pdf_hover");
            pdf.classList.remove("pdf_nohover");
        });

        const text = block.querySelectorAll(".cardTexts");
        const textArr = Array.from(text);

        textArr.forEach(text => {
            console.log(text);
            text.classList.add("cardText_hover");
            text.classList.remove("cardText_nohover");
        });
    };

    // Функция для удаления стилей при уходе мыши или окончании касания
    const removeHoverStyles = () => {
        block.classList.remove('seventh__twoTabl_class_hover');
        block.classList.add('seventh__twoTabl_class');

        const pdf = block.querySelectorAll(".pdf");
        const pdfArr = Array.from(pdf);

        pdfArr.forEach(pdf => {
            pdf.classList.remove("pdf_hover");
            pdf.classList.add("pdf_nohover");
        });

        const text = block.querySelectorAll(".cardTexts");
        const textArr = Array.from(text);

        textArr.forEach(text => {
            text.classList.remove("cardText_hover");
            text.classList.add("cardText_nohover");
        });
    };

    block.addEventListener("mouseover", addHoverStyles);
    block.addEventListener("mouseout", removeHoverStyles);

    block.addEventListener("touchstart", addHoverStyles, { passive: true });
    block.addEventListener("touchend", removeHoverStyles, { passive: true });
});



// document.getElementById("seventh__twoTabl_one").addEventListener("click", function() {
//     var link = document.createElement("a");
//     link.setAttribute("href", "./img/IMG_1559.MP4");
//     link.setAttribute("download", "./img/IMG_1559.MP4");
//     link.click();
// })

// document.getElementById("seventh__twoTabl_two").addEventListener("click", function() {
//     var link = document.createElement("a");
//     link.setAttribute("href", "./img/gif1.MP4");
//     link.setAttribute("download", "./img/gif1.MP4");
//     link.click();
// })

// document.getElementById("seventh__twoTabl_three").addEventListener("click", function() {
//     var link = document.createElement("a");
//     link.setAttribute("href", "./img/gif2.MP4");
//     link.setAttribute("download", "./img/gif2.MP4");
//     link.click();
// })

// Анимация 

const animBlokLeft = function() {
    const animated = document.querySelectorAll('.smooth_animated, .round')

    function isInViewportTop(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }

    animated.forEach((item) => {
        if(isInViewportTop(item)) {
            item.classList.add('show')
        }
    })
};

document.addEventListener('DOMContentLoaded', function() {
    animBlokLeft();
});

window.addEventListener('scroll', function() {
    animBlokLeft();
});


// Валидация формы

let form = document.getElementById('form');
let formInput = document.querySelectorAll('input, textarea');
let radioGroups = document.querySelectorAll('.js-radio');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let error = formValidate();
    formValidate();

    if (error === 0) {
        alert('Форма отправлена.');
        form.reset();
    } 
    else {
        alert('Пожалуйста, заполните все обязательные поля.');
    }
});

function formValidate() {
    let error = 0;
    formInput.forEach((input) => {
        formRemoveError(input);

        if (input.classList.contains('js-email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } 
        else if (input.classList.contains('js-phone')) {
            if(phoneTest(input)){
                formAddError(input);
                error++;
            }
        }
        else if (input.classList.contains('js-camer')) {
            if(camerTest(input)){
                formAddError(input);
            }
        }
        else if (input.classList.contains('js-input')) {
            if(inputTest(input)){
                formAddError(input);
                error++;
            }
        }
        else if (input.type === 'radio') {
            let parent = input.closest('.js-radio')
            let children = parent.querySelectorAll('input[type="radio"]');
            let isSelected = Array.from(children).some(radio => radio.checked);
            if (!isSelected) {
                formAddError(parent.querySelector('.formsHeader'));
                error++;
            } else {
                formRemoveError(parent.querySelector('.formsHeader'));
            }
        }
    });

    let firstError = document.querySelector('.error')
    if (firstError) {
        firstError.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    return error;
}

function inputValidate(input) {

    if (input.classList.contains('js-email')) {
        if (emailTest(input)) {
            formAddError(input);
        }
    } 
    else if (input.classList.contains('js-phone')) {
        if(phoneTest(input)){
            formAddError(input);
        }
    }
    else if (input.classList.contains('js-camer')) {
        if(camerTest(input)){
            formAddError(input);
        }
    }
    else if (input.classList.contains('js-input')) {
        if(inputTest(input)){
            formAddError(input);
        }
    }
    else if (input.type === 'radio') {
        let parent = input.closest('.js-radio')
        let children = parent.querySelectorAll('input[type="radio"]');
        let isSelected = Array.from(children).some(radio => radio.checked);
        if (!isSelected) {
            formAddError(parent.querySelector('.formsHeader'));
        } else {
            formRemoveError(parent.querySelector('.formsHeader'));
        }
    };
}

function formAddError(input) {
    input.classList.add('error');
}

function formRemoveError(input) {
    input.classList.remove('error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function phoneTest(input) {
    return !/^\+?\d{10,11}$/.test(input.value);
}
function inputTest(input) {
    return !/^[a-zA-Zа-яА-Я ]{3,}$/.test(input.value)
}
function camerTest(input) {
    return !/^\d{1,4}$/.test(input.value)
}

formInput.forEach(input => {
    input.addEventListener('blur', () => {
        formRemoveError(input);
        inputValidate(input);
    });
    input.addEventListener('input', () => {
        formRemoveError(input);
        inputValidate(input);
    });
    input.addEventListener('change', () => {
        formRemoveError(input);
        inputValidate(input);
    });
});
