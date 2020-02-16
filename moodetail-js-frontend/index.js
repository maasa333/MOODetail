document.addEventListener("DOMContentLoaded", () => {
    const moodUrl = "http://localhost:3000/moods";

    // const fetchedMoods = [];

    function fetchMoods() {
        return fetch(moodUrl)
            .then(resp => resp.json())
            .then(data => data.map(mood => {
                moodCard(mood);
            }))
    }
    fetchMoods();

    function moodCard(mood) {
        const container = document.querySelector('#moods-container');
        const moodCard = document.createElement('div')
        moodCard.setAttribute('class', 'mood-card');
        container.appendChild(moodCard);
        moodCard.innerText = mood.state;
        
        addNotes(mood);
    }

    function addNotes(mood) {
        const notes = mood.prompts.map(p => {
            return p.desc;
        })
        const ul = document.createElement('ul');
        const container = document.querySelector('#moods-container');
        container.appendChild(ul);

        notes.map(n => {
            const li = document.createElement('li');
            ul.appendChild(li)
            return li.innerText = n
        })
    }
})