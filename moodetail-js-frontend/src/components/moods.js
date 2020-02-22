class Moods {
    constructor() {
        this.moods = []
        this.adapter = new MoodsAdapter()
        this.cacheMoodElements()
        this.fetchAndLoadMoods()
    }

    cacheMoodElements() {
        this.moodsContainer = document.querySelector('.moods-container')
    }

    fetchAndLoadMoods() {
        this.adapter.getMoods().then(moods => {
            moods.map(mood => this.moods.push(new Mood(mood)))
        })
        .then(() => {
            this.display()
        })
    }

    display() {
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" data-mood-id=${mood.id}>${mood.state}</div><ul></ul>`).join('')
    }
}