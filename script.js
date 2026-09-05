// Joke History Storage
let jokeHistory = JSON.parse(localStorage.getItem('jokeHistory')) || [];
let currentJoke = null;
let selectedAPI = 'dad-jokes';

// API Configuration
const apis = {
    'dad-jokes': {
        url: 'https://api.api-ninjas.com/v1/dadjokes',
        headers: { 'X-Api-Key': 'free' },
        parseResponse: (data) => data.joke,
        name: '👨‍🦱 Dad Jokes'
    },
    'jservice': {
        url: 'https://jservice.io/api/random?count=1',
        headers: {},
        parseResponse: (data) => {
            const item = Array.isArray(data) ? data[0] : data;
            return `Q: ${item.question} A: ${item.answer}`;
        },
        name: '🧠 Jeopardy Facts'
    },
    'useless-facts': {
        url: 'https://uselessfacts.jsondatabase.com/random',
        headers: {},
        parseResponse: (data) => data.text,
        name: '💡 Useless Facts'
    },
    'advice': {
        url: 'https://api.adviceslip.com/advice',
        headers: {},
        parseResponse: (data) => data.slip.advice,
        name: '💬 Advice'
    }
};

// Get Random Joke from Selected API
async function getJoke() {
    const btn = event.target.closest('.btn-primary');
    const selectedAPI_value = document.querySelector('input[name="api"]:checked').value;
    selectedAPI = selectedAPI_value;
    
    try {
        btn.disabled = true;
        const jokeDisplay = document.getElementById('jokeDisplay');
        jokeDisplay.innerHTML = '<div class="spinner"></div> Loading...';

        const api = apis[selectedAPI];
        const response = await fetch(api.url, {
            headers: api.headers
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const jokeText = api.parseResponse(data);
        currentJoke = jokeText;

        // Display the joke
        displayJoke(jokeText);

        // Add to history
        addToHistory(jokeText);
    } catch (error) {
        console.error('Error fetching joke:', error);
        document.getElementById('jokeDisplay').innerHTML = 
            `<p style="color: #ff6b6b;">❌ Oops! Failed to load joke. Please try again.<br><small>${error.message}</small></p>`;
    } finally {
        btn.disabled = false;
    }
}

// Display Joke in UI
function displayJoke(joke) {
    const jokeDisplay = document.getElementById('jokeDisplay');
    const apiName = apis[selectedAPI].name;
    jokeDisplay.innerHTML = `
        <div>
            <div class="joke-type">${apiName}</div>
            <p>${joke}</p>
        </div>
    `;
}

// Add Joke to History
function addToHistory(joke) {
    const timestamp = new Date().toLocaleTimeString();
    jokeHistory.unshift({
        joke: joke,
        time: timestamp,
        api: selectedAPI
    });

    // Keep only last 10 jokes
    if (jokeHistory.length > 10) {
        jokeHistory.pop();
    }

    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
    updateHistoryDisplay();
}

// Update History Display
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<li style="color: #999; text-align: center; padding: 20px;">No history yet. Get a joke!</li>';
        return;
    }

    jokeHistory.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <strong>${item.joke.substring(0, 50)}${item.joke.length > 50 ? '...' : ''}</strong>
            <small>${item.time} • ${apis[item.api].name}</small>
        `;
        li.onclick = () => displayJoke(item.joke);
        historyList.appendChild(li);
    });
}

// Toggle API Selector
function toggleAPIs() {
    const selector = document.getElementById('apiSelector');
    if (selector.style.display === 'none') {
        selector.style.display = 'block';
    } else {
        selector.style.display = 'none';
    }
}

// Share Joke
function shareJoke() {
    if (!currentJoke) {
        alert('Get a joke first!');
        return;
    }

    const text = `Check out this joke: ${currentJoke}`;
    
    // Try to use Web Share API
    if (navigator.share) {
        navigator.share({
            title: 'Random Joke',
            text: currentJoke
        }).catch(err => console.log('Share cancelled:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Joke copied to clipboard!');
        });
    }
}

// Clear History
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        jokeHistory = [];
        localStorage.removeItem('jokeHistory');
        updateHistoryDisplay();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateHistoryDisplay();
});