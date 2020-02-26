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
        this.selectedMood = document.querySelector('.select is-rounded')
        this.newPrompt = document.querySelector('.input is-rounded')
        this.moodsContainer.addEventListener('click', this.editPrompt.bind(this))
        this.moodsContainer.addEventListener('keypress', this.updatePrompt.bind(this))
        // this.moodsContainer.addEventListener('click', this.clickToAddButtons.bind(this))
        // this.moodsContainer.addEventListener('click', this.clickEdit.bind(this))
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
            // console.log(e.target)
        }
    }

    updatePrompt(e) {
        if (e.key === 'Enter') {
            const promptDiv = e.target
            promptDiv.setAttribute('contentEditable', false)
            // debugger
        }
    }

    // clickToAddButtons(e) {
    //     if (e.target.hasAttribute('data-prompt-id')) {
    //         const promptDiv = e.target
    //         const btnDiv = document.createElement('div')
    //         btnDiv.setAttribute('class', 'button-div')
    //         const deleteBtn = document.createElement('button')
    //         deleteBtn.innerHTML = "Delete"
    //         deleteBtn.setAttribute('class', 'button is-rounded is-danger is-small')
    //         const editBtn = document.createElement('button')
    //         editBtn.innerHTML = "Edit"
    //         editBtn.setAttribute('class', 'button is-rounded is-info is-small')
    //         // debugger
    //         if (promptDiv.childElementCount === 0) {
    //             // promptDiv.setAttribute('class', 'editable-prompt-div')
    //             promptDiv.appendChild(btnDiv)
    //             btnDiv.setAttribute('contentEditable', false)
    //             btnDiv.appendChild(editBtn)
    //             btnDiv.appendChild(deleteBtn)   
    //         }
    //         // if (promptDiv.childElementCount === 0) {
    //             // promptDiv.setAttribute('class', 'editable-prompt-div')
    //             // promptDiv.appendChild(btnDiv)
    //             // btnDiv.insertAdjacentElement(editBtn)
    //             // btnDiv.insertAdjacentElement(deleteBtn)
    //         // }            
    //     }
    // }

    // clickEdit(e) {
    //     if (e.target.innerHTML === "Edit") {
    //         const promptDesc = e.target.parentElement.parentElement
    //         promptDesc.setAttribute('contentEditable', true)
    //         debugger
            
    //     }
    // }
}