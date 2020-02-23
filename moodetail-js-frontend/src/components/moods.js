class Moods {
    constructor() {
        this.moods = []
        this.moodsAdapter = new MoodsAdapter()
        this.prompts = []
        this.promptsAdapter = new PromptsAdapter() 
        this.cacheMoodElements()
        this.fetchAndLoadMoods()
        this.newPrompt()
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
        })
        .then(() => {
            this.displayPrompts()
        })
    }

    displayMoods() {
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" id=${mood.id}>${mood.state}</div> <ul></ul>`).join('')
    }

    displayPrompts() {        
        this.prompts.map(prompt => {
            const moodCard = document.getElementById(`${prompt.mood_id}`)
            // const promptDiv = document.createElement('div')
            const li = document.createElement('li')
            li.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
            // promptDiv.innerHTML = `<div class="prompt-div" data-prompt-id=${prompt.id} data-mood-id=${prompt.mood_id}>${prompt.desc}</div>`
            // moodCard.appendChild(promptDiv)
            moodCard.appendChild(li)
        })
    }

    newPrompt() {
        function postPrompt(desc, moodId) {
            const data = {
                desc: desc,
                mood_id: moodId
            }
            return fetch(promptUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(resp => {
                return resp.json()
            })
            .then(prompt => {
                updatePrompts(prompt)
            })
        }
    }
}