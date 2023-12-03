export default class ChatHistoryDao {
    history: Array<Message>;
    constructor() {
        this.history = [];
    }

    addMessage(message: Message) {
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

interface Message { 
    role: string;
    content: string;
}
