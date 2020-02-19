class Prompts {
    constructor() {
        this.prompts = [];
        this.adapter = new PromptsAdapter();
        // this.bindEventListeners();
        this.fetchAndLoadPrompts();
    }

    fetchAndLoadPrompts() {
        this.adapter.getPrompts().then(prompts => {
            console.log(prompts)
        })
        .then(() => {
            this.display()
        })
    }

    display() {
        debugger
        const promptsContainer = document.getElementById('prompts-container');
        promptsContainer.innerText = 'test'
    }
}