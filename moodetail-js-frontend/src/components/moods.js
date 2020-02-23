class Moods {
    constructor() {
        this.moods = []
        this.moodsAdapter = new MoodsAdapter()
        this.prompts = []
        this.promptsAdapter = new PromptsAdapter() 
        this.cacheAndBindElements()
        this.fetchAndLoadMoods()
    }

    cacheAndBindElements() {
        this.moodsContainer = document.querySelector('.moods-container')
        this.form = document.getElementById('new-prompt-form')
        // this.selectedMood = document.querySelector('.input-field')
        this.selectedMood = document.querySelector('.select is-rounded')
        // this.newPrompt = document.querySelector('.input-text')
        this.newPrompt = document.querySelector('.input is-rounded')
        this.form.addEventListener('submit', this.addPrompt.bind(this))
        // this.selectedMood = document.querySelector('.input-field')
        this.selectedMood = document.querySelector('.select is-rounded')
        // this.newPrompt = document.querySelector('.input-text')
        this.newPrompt = document.querySelector('.input is-rounded')
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
        })
        .then(() => {
            this.displayPrompts()
        })
    }

    displayMoods() {
        // this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" id=${mood.id}>${mood.state}</div>`).join('')
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="box is-rounded" id=${mood.id}>${mood.state}</div>`).join('')
    }

    displayPrompts() {  
        this.prompts.map(prompt => {
            const moodCard = document.getElementById(`${prompt.mood_id}`)
            const promptDiv = document.createElement('div')
            promptDiv.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
            moodCard.appendChild(promptDiv)
        })
    }

    addPrompt(e) {
        e.preventDefault()
        this.assignedMood = this.moods.find(mood => {
            return mood.state === this.selectedMood.value
        })
        this.moodId = this.assignedMood.id

        this.promptsAdapter.addPrompt(this.newPrompt.value, this.moodId).then(prompt => {
            this.displayNewPrompt(prompt)
        })
    }

    displayNewPrompt(prompt) {
        const moodCard = document.getElementById(`${prompt.mood_id}`)
        const promptDiv = document.createElement('div')
        promptDiv.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
        moodCard.appendChild(promptDiv)
        
        this.selectedMood.value = "Select Mood"
        this.newPrompt.value = ""
    }
}