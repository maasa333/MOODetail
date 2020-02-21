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
            // prompts.map(prompt => this.prompts.push(prompt))
        })
        // .then(() => {
        //     this.display()
        // })
    }

    // display() {
    //     const promptsContainer = document.getElementById('prompts-container');
    //     promptsContainer.innerText = 'test'
    //     console.log(`prompts:`, this.prompts)
    // }
}