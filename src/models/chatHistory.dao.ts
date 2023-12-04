export default class ChatHistoryDao {
    history: Array<ChatMessage>;
    constructor() {
        this.history = [];
    }

    addMessage(message: ChatMessage) {
        if (!message || !message.role || !message.content) {
            throw new Error("Message must have 'role' and 'content'.");
        }

        this.history.push(message);
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}

interface ChatMessage { 
    role: string;
    content: string;
}
