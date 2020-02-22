class Moods {
    constructor() {
        this.moods = []
        this.moodsAdapter = new MoodsAdapter()
        this.prompts = []
        this.promptsAdapter = new PromptsAdapter() 
        this.cacheMoodElements()
        this.fetchAndLoadMoods()
    }

    cacheMoodElements() {
        this.moodsContainer = document.querySelector('.moods-container')
    }

    fetchAndLoadMoods() {
        this.moodsAdapter.getMoods().then(moods => {
            moods.map(mood => this.moods.push(new Mood(mood)))
        })
        .then(this.promptsAdapter.getPrompts().then(prompts => {
            prompts.map(prompt => this.prompts.push(new Prompt(prompt)))
        }))
        .then(() => {
            this.displayMoods()
            this.displayPrompts()
        })
    }

    displayMoods() {
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" data-mood-id=${mood.id}>${mood.state}</div><ul></ul>`).join('')
    }

    displayPrompts() {
        console.log(this.moodsContainer.querySelectorAll('.mood-card').forEach(
            function(mood) {
                console.log(mood.dataset.moodId)
            }
        ))
    }
}