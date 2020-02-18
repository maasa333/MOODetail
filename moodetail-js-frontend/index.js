document.addEventListener("DOMContentLoaded", () => {
    const moodUrl = "http://localhost:3000/moods";
    const promptUrl  = "http://localhost:3000/prompts";

    const moodsObj = {moods: []};

    fetchMoods();

    function fetchMoods() {
        return fetch(moodUrl)
        .then(resp => resp.json())
        .then(jsonData => {
            for (const mood of jsonData) {
                moodsObj.moods.push(mood);
                createMoodCard(mood);
            }
        })
    }

    function createMoodCard(mood) {
        const container = document.getElementById('moods-container');
        const moodCard = document.createElement('div');
        container.appendChild(moodCard);
        moodCard.setAttribute('class', 'mood-card');
        moodCard.setAttribute('mood-id', mood.id)
        container.appendChild(moodCard);
        moodCard.innerText = mood.state;
        
        appendPrompts(mood);
    }

    function appendPrompts(mood) {
        const prompts = mood.prompts.map(p => {
            return p.desc;
        })
        const ul = document.createElement('ul');
        const container = document.querySelector('#moods-container');
        container.appendChild(ul);

        prompts.map(p => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.innerText = p;
        })
    }

    const formContainer = document.querySelector('div.form-container');
    const inputs = document.querySelectorAll('.input-text')

    formContainer.addEventListener('submit', e => {
        e.preventDefault();        
        const state = inputs[0].value;
        const desc = inputs[1].elements[0].value;

        const assignedMood = moodsObj.moods.find(mood => {
            return mood.state === state
        })
        const moodId = assignedMood.id;
        postPrompt(desc, moodId);
    })

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
    };

    function updatePrompts(prompt) {
        // debugger
        const card = document.querySelector(`[mood-id = '${prompt.mood_id}']`)
        const ul = card.nextSibling;
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerText = `${prompt.desc}`
    }
});