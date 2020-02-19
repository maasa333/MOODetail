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
        const prompts = mood.prompts;
        const ul = document.createElement('ul');
        const container = document.querySelector('#moods-container');
        container.appendChild(ul);

        prompts.map(p => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.innerText = p.desc;

            const editBtn = document.createElement('button');
            li.appendChild(editBtn);
            editBtn.innerHTML = "Edit";
            editBtn.setAttribute('prompt-id', p.id)

            const deleteBtn = document.createElement('button');
            li.appendChild(deleteBtn);
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute('prompt-id', p.id)
        })
    }

    const formContainer = document.querySelector('div.form-container');
    const inputs = document.querySelectorAll('.input-text')

    // Add new prompt
    formContainer.addEventListener('submit', e => {
        e.preventDefault();        
        const state = inputs[0].value;
        const desc = inputs[1].elements[0].value;

        const assignedMood = moodsObj.moods.find(mood => {
            return mood.state === state
        })
        const moodId = assignedMood.id;
        postPrompt(desc, moodId);

        inputs[0].value = "Select Mood";
        inputs[2].value = "";
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
            return resp.json();
        })
        .then(prompt => {
            updatePrompts(prompt);
        })
    };

    function updatePrompts(prompt) {
        const card = document.querySelector(`[mood-id = '${prompt.mood_id}']`)
        const ul = card.nextSibling;
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerText = `${prompt.desc}`

        li.innerText = prompt.desc;

        const editBtn = document.createElement('button');
        li.appendChild(editBtn);
        editBtn.innerHTML = "Edit";
        editBtn.setAttribute('prompt-id', prompt.id)

        const deleteBtn = document.createElement('button');
        li.appendChild(deleteBtn);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute('prompt-id', prompt.id)
    }

    // Delete and Edit button functions
    document.addEventListener('click', e => {
        promptId = parseInt(e.target.getAttribute('prompt-id'));

        if (e.target.innerHTML === "Delete") {
            e.target.parentNode.remove();
            fetch(promptUrl + `/${promptId}`, {
                method: 'DELETE'
            });
        } else if (e.target.innerHTML === "Edit") {
            e.target.innerHTML = "Save Changes";
            editPrompt(promptId, e);
        }
    })

    function editPrompt(promptId, e) {
        const form = document.createElement('form');
        e.target.parentNode.appendChild(form);
        const textarea = document.createElement('textarea');
        form.appendChild(textarea);
        const prompt = e.target.parentNode.firstChild;
        textarea.appendChild(prompt);

        e.target.addEventListener('click', e => {
            if (e.target.innerHTML === "Save Changes") {
                const editedPrompt = e.target.parentElement.lastChild.elements[0].value;

                return fetch(promptUrl + `/${promptId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        desc: editedPrompt
                    })
                })
                .then(resp => {
                    return resp.json();
                })
                .then(prompt => {
                    updatePrompts(prompt);
                })
            }
        })
    }
});