class PromptsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/prompts'
    }

    getPrompts() {
        return fetch(this.baseUrl).then(resp => resp.json())
    }

    addPrompt(newPrompt, moodId) {
        const data = {
            desc: newPrompt,
            mood_id: moodId
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(prompt => { 
             console.log(prompt)
             return prompt
        })
    }
}