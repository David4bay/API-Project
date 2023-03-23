const btn = document.getElementById('button');
const select = document.getElementById('selection');
const label = document.getElementById('label-text');
const form = document.getElementById('joke-form');
const jokes = document.getElementsByClassName('joke');
const punchLine = document.getElementsByClassName('punchline');
const errorMessage = document.getElementsByClassName('error');
const alert = document.getElementById('notice');

/* Retreive jokes from the api*/
button.addEventListener('click', (e) => {
    e.preventDefault();
    /* Selected number of jokes from select element*/
    let numberOfJokes = Number(select.options[select.selectedIndex].value);
    /* Saving selected number of jokes in variable to avoid mutation*/
    let currentJokeNumber = numberOfJokes;
    /*Use browsers fetch api to connect to official joke api to collect 10 jokes */
    fetch('https://official-joke-api.appspot.com/jokes/ten').then((response) => response.json()).then((data) => showJoke(data, currentJokeNumber)).catch(() => showError());
})

/* Function takes in joke data and number of joke*/
function showJoke(data, currentJokeNumber) {
    /*Function call highlights jokes received successfully*/
    highlightLabel(currentJokeNumber);
    /*Function call clears old joke messages*/
    refreshJokes(currentJokeNumber);
    // /*Loop is created to loop through the number of selected jokes to display */
    for (let i = 0; i < currentJokeNumber; i++) {
        /* Selected jokes looped and displayed as block elements*/
        jokes[i].style.display = 'block';
        /*Jokes delivered to the innerText property of the list item*/
        jokes[i].innerText = data[i].setup;
        /*SetTimeout creates a delay before delivering the punchline*/
        setTimeout(() => {
            punchLine[i].style.display = 'block';
            punchLine[i].innerText = data[i].punchline;
        }, 3000);
    }
}

/*Highlights the 'Select number of jokes' label*/
function highlightLabel(currentJokeNumber) {
    jokeCounter(currentJokeNumber);
    label.style.color = 'hsl(53, 97%, 58%)';
    label.style.transition = 'all .4s';
    setTimeout(() => {
    label.style.color = 'hsl(100, 0%, 100%)';
    }, 1000);
}

/*Function to clear out all old jokes*/
function refreshJokes(currentJokeNumber) {
    for (let i = 0; i < 10; i++) {
        jokes[i].innerText = '';
        jokes[i].style.display = 'none';
        punchLine[i].innerText = '';
        punchLine[i].style.display = 'none';
    }
}

/*Displays the total number of jokes that is successfully delivered*/
function jokeCounter(currentJokeNumber) {
    /*Clears previous setTimeout*/
    clearTimeout(showJoke);
    /*Clears previous setTimeout*/
    clearTimeout(autoClearJokes);
    /*Boolean assigned to variable to know when to refresh the old jokes */
    let jokesCalled = true;
    autoClearJokes(currentJokeNumber, jokesCalled);
    /*Displays the successful alert box*/
    notice.style.display = 'inline';
    notice.style.backgroundColor = 'hsl(133, 89%, 48%)';
    notice.innerText = `${currentJokeNumber} new joke(s)`;
    /*Removes the alert after 3 seconds*/
    setTimeout(() => {
        notice.style.display = 'none';
    }, 3000);
}


/*Function to autoclear previous joke if more than 5.2 seconds elapses(multiplied by number of jokes)*/
function autoClearJokes(currentJokeNumber, jokesCalled) {
    setTimeout(() => {
        jokesCalled = false;
    }, 5200 * currentJokeNumber);
    for (let i = 0; i < currentJokeNumber; i++) {
        if (jokesCalled !== false) {
                jokes[i].innerText = '';
                jokes[i].style.display = 'none';
                punchLine[i].innerText = '';
                punchLine[i].style.display = 'none';
        }
    }
}

/*Function to show failed alert message*/
function showError() {
    notice.innerText = 'No Jokes Pal!';
    notice.style.backgroundColor = 'hsl(0, 100%, 50%)';
    notice.style.display = 'inline';
    errorMessage[0].style.display = 'block'
    errorMessage[0].innerText = 'Sorry, request for joke failed!';
        setTimeout(() => {
            errorMessage[0].innerText = '';
            errorMessage[0].style.display = 'none';
        }, 8000)
    console.log('sorry there was an error somewhere');
}