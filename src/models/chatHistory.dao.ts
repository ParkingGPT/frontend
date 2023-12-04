export default class ChatHistoryDao {
    history: ChatMessage[];
    constructor() {
        this.history = [];
    }

    addMessage(message: ChatMessage) {
        if (!message || !message.role || !message.content) {
            throw new Error("Message must have 'role' and 'content'.");
        }

        this.history.push(message);
    }

    addAndClone(message: ChatMessage) { 
        const clone = new ChatHistoryDao();
        clone.history = [...this.history, message];
        return clone;
    }

    getHistory() {
        return this.history;
    }

    getDisplayHistory() { 
        return this.history.filter((message) => message.role === 'user' || message.role === 'assistant');
    }

    clearHistory() {
        this.history = [];
    }
}

interface ChatMessage { 
    role: string;
    content: string;
}
