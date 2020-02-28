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
        this.body = document.querySelector('body')
        this.moodsContainer = document.querySelector('.moods-container')
        this.form = document.getElementById('new-prompt-form')
        this.form.addEventListener('submit', this.addPrompt.bind(this))
        this.form.addEventListener('submit', this.validateForm.bind(this))
        this.selectedMood = document.querySelector('.select is-rounded')
        this.newPrompt = document.querySelector('.input is-rounded')
        this.moodsContainer.addEventListener('click', this.editPrompt.bind(this))
        this.moodsContainer.addEventListener('keypress', this.updatePrompt.bind(this))
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
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="${mood.state} box is-rounded" id=${mood.id}>${mood.state}</div>`).join('')
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
        const selectedMood = document.querySelector('select#select-mood')
        const newPrompt = document.querySelector('input#prompt-input')
        this.assignedMood = this.moods.find(mood => {
            return mood.state === selectedMood.value
        })
        this.moodId = this.assignedMood.id
        this.promptsAdapter.addPrompt(newPrompt.value, this.moodId).then(prompt => {
            this.displayNewPrompt(prompt)
            selectedMood.value = "Select Mood"
            newPrompt.value = ""
        })
    }

    validateForm(e) {
        const selectedMood = document.querySelector('select#select-mood')
        if (selectedMood.value === "Select Mood") {
            alert("Please select a mood")
            return false
        }
        const newPrompt = document.querySelector('input#prompt-input')
        if (newPrompt.value === "") {
            alert("Please describe what prompted this mood")
            return false
        }
    }

    displayNewPrompt(prompt) {
        const moodCard = document.getElementById(`${prompt.mood_id}`)
        const promptDiv = document.createElement('div')
        promptDiv.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
        moodCard.appendChild(promptDiv)
    }

    editPrompt(e) {
        if (e.target.hasAttribute('data-prompt-id')) {
            const promptDiv = e.target
            promptDiv.setAttribute('contentEditable', true)
        }
    }

    updatePrompt(e) {
        if (e.key === 'Enter') {
            const promptDiv = e.target
            promptDiv.setAttribute('contentEditable', false)
            const promptId = e.target.dataset.promptId
            if (promptDiv.innerText === "") {
                this.promptsAdapter.deletePrompt(promptId)
            } else {
                const desc = promptDiv.innerText
                this.promptsAdapter.editPrompt(desc, promptId)
            }
        }
    }
}