class Prompts {
    constructor() {
        this.prompts = []
        this.adapter = new PromptsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadPrompts()
    }

    fetchAndLoadPrompts() {
        this.adapter.getPrompts().then(prompts => {
            prompts.map(prompt => this.prompts.push(new Prompt(prompt)))
        })
        .then(() => {
            this.display()
        })
    }

    display() {
        const promptsContainer = document.getElementById('prompts-container')
    }
}