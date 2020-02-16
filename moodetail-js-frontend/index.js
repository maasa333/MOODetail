document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOM content has loaded")
    let url = "http://localhost:3000/moods";
    fetch(url)
    .then(resp => resp.json())
    .then(data => data.map(mood => {
        return moodCard(mood);
    }))
})

function moodCard(mood) {
    const container = document.querySelector('#moods-container');
    const moodCard = document.createElement('div');
    container.appendChild(moodCard);
    moodCard.innerText = mood.state;
}

