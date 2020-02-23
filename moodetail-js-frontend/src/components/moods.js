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
        this.selectedMood = document.querySelector('.input-field')
        this.newPrompt = document.querySelector('.input-text')
        this.form.addEventListener('submit', this.addPrompt.bind(this))
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
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" id=${mood.id}>${mood.state}</div>`).join('')
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
        this.selectedMood = document.querySelector('.input-field').value
        this.newPrompt = document.querySelector('.input-text').value
        this.assignedMood = this.moods.find(mood => {
            return mood.state === this.selectedMood
        })
        this.moodId = this.assignedMood.id 
        // TypeError: Cannot read property 'id of undefined????

        this.promptsAdapter.addPrompt(this.newPrompt, this.moodId).then(prompt => {
            // append to right container
        })
    }

    displayNewPrompt(prompt) {
        const moodCard = document.getElementById(`${prompt.mood_id}`)
        const promptDiv = document.createElement('div')
        promptDiv.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
        moodCard.appendChild(promptDiv)
    }

    // clickPrompt() {
    //     this.promptDiv = document.querySelectorAll('.prompt-div')
    //     this.promptDiv.addEventListener('dblclick', e => {
    //         console.log('double clicked')
    //     })
    // }
}