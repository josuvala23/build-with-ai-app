class AIRequestHandler {
    constructor(text) {
        this.text = text;
    }

    sanitizeText() {
        return this.text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    prepareRequest() {
        return {
            cleanText: this.sanitizeText(),
            timestamp: new Date()
        };
    }
}

module.exports = AIRequestHandler;