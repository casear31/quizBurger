document.addEventListener("DOMContentLoaded", () => {
    'use strict'
    
    const btnOpenModal = document.getElementById('btnOpenModal'),
    modalBlock = document.getElementById('modalBlock'),
    closeModal = document.getElementById('closeModal'),
    questionTitle = document.getElementById('question'),
    formAnswers = document.getElementById('formAnswers'),
    nextButton = document.getElementById('next'),
    prevButton = document.getElementById('prev'),
    sendButton = document.getElementById('send')
    
    const questions = [
        {
            question: "What is color do you want?",
            answer: [
                {
                    title: 'Standart',
                    url: './image/burger.png'
                },

                {
                    title: 'Black',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "What is meat for burger do you want?",
            answer: [
                {
                    title: 'Chicken',
                    url: './image/chickenMeat.png'
                },

                {
                    title: 'Beef',
                    url: './image/beefMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Additional ingridients?",
            answer: [
                {
                    title: 'Tomato',
                    url: './image/tomato.png'
                },
                {
                    title: 'Cucumber',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Salad',
                    url: './image/salad.png'
                },
                {
                    title: 'Onion',
                    url: './image/onion.png'
                },
            ],
            type: 'checkbox'
        },
        {
            question: "Would you like to add a sauce",
            answer: [
                {
                    title: 'Garlic sauce',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Ketchup',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Mustard',
                    url: './image/sauce3.png'
                },
            ],
            type: 'radio'
        },
        
    ]

    
    
    
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    })

    closeModal.addEventListener('click', () => {
        closeModalfunc();
    })



    const closeModalfunc = () => {
        modalBlock.classList.remove('d-block');
    }

    const playTest = () => {

        const finalAnswers = [];

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answer.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column')

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-center">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestion = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }
            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }
            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.innerHTML = `
                <div class="form-group">
                <label for="numberPhone">Enter your phone number</label>
                <input type="phone" class="form-control" id="numberPhone" />
                </div
                `;
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Thanks for your answers!'
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                    modalBlock.classList.add('d-none');

                }, 2000)
            }

            
        }
        renderQuestion(numberQuestion);


        const checkAnswer = () => {
            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Phone Number'] = input.value;
                }
            });
            
            finalAnswers.push(obj);
            console.log(finalAnswers);

        }

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestion(numberQuestion);
        }
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestion(numberQuestion);
        }

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestion(numberQuestion);


        }


    }

})