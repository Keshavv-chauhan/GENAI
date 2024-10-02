// Store the prompts and responses
let responses = {};

// Function to load the CSV file and populate responses
async function loadCSV() {
    try {
        const response = await fetch('prompts.csv'); // Ensure prompts.csv is in the same directory
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip the header row

        rows.forEach(row => {
            const [input, output] = row.split(',').map(item => item.trim().replace(/^"|"$/g, '')); // Remove quotes
            responses[input.toLowerCase()] = output; // Store inputs in lowercase
        });

        // Welcome message
        displayMessage("Hello! I'm your AI assistant. What's your name?", 'bot-response');
    } catch (error) {
        console.error('Error loading CSV:', error);
        displayMessage("I'm sorry, there was an error loading the data. Please try again later.", 'bot-response');
    }
}

// Function to handle sending messages
function sendMessage() {
    const userInput = document.getElementById('user-input').value.toLowerCase().trim(); // Trim spaces

    // Validate input
    if (!userInput) {
        displayMessage("Please enter a message.", 'bot-response');
        return;
    }

    // Display user's message
    displayMessage(userInput, 'user-message');

    // Get response from loaded data
    const response = getResponse(userInput);

    // Display bot's response
    displayMessage(response, 'bot-response');

    // Clear input field
    document.getElementById('user-input').value = '';
}

// Function to get a response from the loaded data
function getResponse(input) {
    // Greeting interaction
    if (input.includes('my name is')) {
        const name = input.split('my name is ')[1].trim();
        return `Nice to meet you, ${name}! What would you like to learn about sorting algorithms?`;
    }

    // Check for a direct match in responses
    const response = responses[input];
    return response ? response : "I'm sorry, I don't understand that. Can you ask something else?";
}
