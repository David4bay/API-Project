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
    let currentJokeNumber = numberOfJokes;
    fetch('https://official-joke-api.appspot.com/jokes/ten').then((response) => response.json()).then((data) => showJoke(data, currentJokeNumber)).catch(() => showError(currentJokeNumber));
})

function showJoke(data, currentJokeNumber) {
    let jokesCalled = true;
    highlightLabel(currentJokeNumber);
    refreshJokes(currentJokeNumber, jokesCalled);
    for (let i = 0; i < currentJokeNumber; i++) {
        jokes[i].style.display = 'block';
        jokes[i].innerText = data[i].setup;
        setTimeout(() => {
            punchLine[i].style.display = 'block';
            punchLine[i].innerText = data[i].punchline;
        }, 3000);
    }
}

function refreshJokes(currentJokeNumber, jokesCalled) {
    for (let i = 0; i < currentJokeNumber; i++) {
        jokes[i].innerText = '';
        jokes[i].style.display = 'none';
        punchLine[i].innerText = '';
        punchLine[i].style.display = 'none';
        if (jokesCalled === false) {
            jokes[i].innerText = '';
            jokes[i].style.display = 'none';
            punchLine[i].innerText = '';
            punchLine[i].style.display = 'none';
        } else {
            setTimeout(() => {
                jokes[i].innerText = '';
            jokes[i].style.display = 'none';
            punchLine[i].innerText = '';
            punchLine[i].style.display = 'none';
            }, 5200 * currentJokeNumber)
    }
    }
}

function highlightLabel(currentJokeNumber) {
    label.style.color = 'hsl(53, 97%, 58%)';
    label.style.transition = 'all .4s';
    setTimeout(() => {
    label.style.color = 'hsl(100, 0%, 100%)';
    }, 1000);
    jokeCounter(currentJokeNumber);
}

function jokeCounter(currentJokeNumber) {
    notice.style.display = 'inline';
    notice.innerText = `${currentJokeNumber} new joke(s)`;
    setTimeout(() => {
        notice.style.display = 'none';
    }, 3000);
}

function showError(currentJokeNumber) {
    notice.innerText = 'No Jokes Pal!';
    notice.style.backgroundColor = 'red';
    notice.style.display = 'inline';
    for (let i = 0; i < currentJokeNumber; i++) {
        errorMessage[i].style.display = 'block'
        errorMessage[i].innerText = 'Sorry, request for joke failed!';
        setTimeout(() => {
            errorMessage[i].innerText = '';
            errorMessage[i].style.display = 'none';
        }, 8000)
    }
    console.log('sorry there was an error somewhere');
}