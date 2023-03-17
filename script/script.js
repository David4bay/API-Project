const btn = document.getElementById('button');
const select = document.getElementById('selection');
const label = document.getElementById('label-text');
const form = document.getElementById('joke-form');
const jokes = document.getElementsByClassName('joke');
const punchLine = document.getElementsByClassName('punchline');
const errorMessage = document.getElementsByClassName('error');
const alert = document.getElementById('notice');

button.addEventListener('click', (e) => {
    e.preventDefault();
    let numberOfJokes = Number(select.options[select.selectedIndex].value);
    for (let i = 0; i < numberOfJokes; i++) {
        jokes[i].innerText = '';
        jokes[i].style.display = 'none';
        punchLine[i].innerText = '';
        punchLine[i].style.display = 'none';
    }
    highlightLabel(numberOfJokes);
    fetch('https://official-joke-api.appspot.com/jokes/ten').then((response) => response.json()).then((data) => showJoke(data, numberOfJokes)).catch(() => showError(numberOfJokes))

})

function showJoke(data, numberOfJokes) {
    for (let i = 0; i < numberOfJokes; i++) {
        jokes[i].style.display = 'block';
        jokes[i].innerText = data[i].setup;
        setTimeout(() => {
            punchLine[i].style.display = 'block';
            punchLine[i].innerText = data[i].punchline;
        }, 3000);
        setTimeout(() => {
            jokes[i].innerText = '';
            jokes[i].style.display = 'none';
            punchLine[i].innerText = '';
            punchLine[i].style.display = 'none';
        }, 14000);
    }
}


function highlightLabel(numberOfJokes) {
    notice.style.display = 'inline';
    notice.innerText = `${numberOfJokes} new joke(s)`;
    setTimeout(() => {
        notice.style.display = 'none';
    }, 3000);
    label.style.color = 'hsl(53, 97%, 58%)'
    label.style.transition = 'all .4s'
    setTimeout(() => {
    label.style.color = 'hsl(100, 0%, 100%)';
    }, 1000);
}

function showError(numberOfJokes) {
    for (let i = 0; i < numberOfJokes; i++) {
        errorMessage[i].style.display = 'block'
        errorMessage[i].innerText = 'Sorry, request for joke failed!';
        setTimeout(() => {
            errorMessage[i].innerText = '';
            errorMessage[i].style.display = 'none'
        }, 8000)
    }
    console.log('sorry there was an error somewhere');
}