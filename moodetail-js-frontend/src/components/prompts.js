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
        const moodsContainer = document.getElementById('moods-container')
        
        const promptsStr = this.prompts.map(mood => `<div class="mood-card">${mood.state}</div>`).join('')
        moodsContainer.innerHTML = promptsStr
    }
}