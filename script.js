const searchInput = document.getElementById('search');
const quoteList = document.getElementById('quote-list');
const errorMessage = document.getElementById('error-message');

let allQuotes = [];

async function fetchQuotes() {
    try {
        const response = await fetch('https://dummyjson.com/quotes');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        allQuotes = data.quotes;
        displayQuotes(allQuotes);
    } catch (error) {
        errorMessage.textContent = `Failed to fetch quotes: ${error.message}`;
        console.error('Error fetching quotes:', error);
    }
}

function displayQuotes(quotes) {
    quoteList.innerHTML = '';
    if (quotes.length === 0) {
        quoteList.innerHTML = '<li>No quotes found</li>';
        return;
    }
    quotes.forEach(quote => {
        const li = document.createElement('li');
        li.textContent = `"${quote.quote}" - ${quote.author}`;
        quoteList.appendChild(li);
    });
}

function filterQuotes() {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) {
        displayQuotes(allQuotes);
        return;
    }
    const filteredQuotes = allQuotes.filter(quote =>
        quote.quote.toLowerCase().includes(searchTerm) ||
        quote.author.toLowerCase().includes(searchTerm)
    );

    displayQuotes(filteredQuotes);
}

searchInput.addEventListener('input', filterQuotes);

fetchQuotes();