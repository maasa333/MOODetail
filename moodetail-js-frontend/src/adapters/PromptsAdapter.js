class PromptsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/prompts'
    }

    getPrompts() {
        return fetch(this.baseUrl).then(resp => resp.json())
    }
}