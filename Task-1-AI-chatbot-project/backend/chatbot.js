function getBotResponse(message) {
    const msg = message.toLowerCase();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello 👋 Welcome to AI Chatbot!";
    }

    // How are you
    else if (msg.includes("how are you")) {
        return "I'm doing great 😊 How can I help you today?";
    }

    // Name
    else if (msg.includes("your name")) {
        return "I'm RuleBot 🤖 Your AI Assistant.";
    }

    // Time
    else if (msg.includes("time")) {
        return `Current time is ${new Date().toLocaleTimeString()}`;
    }

    // Date
    else if (msg.includes("date")) {
        return `Today's date is ${new Date().toLocaleDateString()}`;
    }

    // College
    else if (msg.includes("college")) {
        return "I can help you with college information, subjects, and projects.";
    }

    // Project
    else if (msg.includes("project")) {
        return "You can build projects using React, Node.js, AI, or Machine Learning.";
    }

    // Python
    else if (msg.includes("python")) {
        return "Python is great for AI, Data Science, and Web Development.";
    }

    // Java
    else if (msg.includes("java")) {
        return "Java is widely used for enterprise applications and Android development.";
    }

    // React
    else if (msg.includes("react")) {
        return "React is a JavaScript library used for building user interfaces.";
    }

    // Bye
    else if (msg.includes("bye")) {
        return "Goodbye 👋 Have a great day!";
    }

    // Default
    else {
        return "Sorry 😅 I don't understand that. Please ask something else.";
    }
}

module.exports = getBotResponse;