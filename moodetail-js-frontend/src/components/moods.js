class Moods {
    constructor() {
        this.moods = []
        this.moodsAdapter = new MoodsAdapter()
        this.prompts = []
        this.promptsAdapter = new PromptsAdapter() 
        this.cacheMoodElements()
        this.fetchAndLoadMoods()
        this.addPrompt()
    }

    cacheMoodElements() {
        this.moodsContainer = document.querySelector('.moods-container')
        this.form = document.getElementById('new-prompt-form')
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

    addPrompt() {
        const selectedMood = document.querySelector('.input-field').value
        const newPrompt = document.querySelector('.input-text').value
        const assignedMood = this.moods.find(mood => {
            return mood.state === selectedMood
        })
        const moodId = assignedMood.id

        this.promptsAdapter.addPrompt(newPrompt, moodId).then(prompt => {
            console.log(prompt)
        })

        // this.form = document.getElementById('new-prompt-form')

        // this.form.addEventListener('submit', e => {
        //     e.preventDefault()
        
        //     this.selectedMood = document.querySelector('.input-field').value
        //     this.newPrompt = document.querySelector('.input-text').value
            
        //     this.assignedMood = this.moods.find(mood => {
        //         return mood.state === this.selectedMood
        //     })
        //     this.moodId = this.assignedMood.id
        //     this.promptsAdapter.addPrompt(this.newPrompt, this.moodId).then
        //     (prompt => {
        //         this.prompts.push(new Prompt(prompt))
        //         this.displayPrompts()
        //         // this.form.querySelectorAll('.input-field').value = "Select Mood"
        //         // this.form.querySelector('.input-text').value = ''
        //     })
        // })
    }
}