const btn = document.getElementById('button');
const select = document.getElementById('selection');
const label = document.getElementById('label-text');
const form = document.getElementById('joke-form');

form.addEventListener('change', (e) => {
    e.preventDefault();
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    let numberOfJokes = select.value;
    highlightLabel();
    fetch('https://official-joke-api.appspot.com/jokes/ten').then((response) => response.json()).then((data) => showJoke(data)).catch(() => showError())
})

select.addEventListener('change', (e) => {
    e.preventDefault();
})

function highlightLabel() {
    label.style.color = 'hsl(53, 97%, 58%)'
    label.style.transition = 'all .4s'
    setTimeout(() => {
        label.style.color = 'hsl(100, 0%, 100%)';
    }, 1000);
}

function showJoke(data) {
    const showInfo = data.map(function(data, index) {
        data[index];
    })
    console.log(showInfo);
}

function showError() {
    console.log();
}