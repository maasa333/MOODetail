class Moods {
    constructor() {
        this.moods = []
        this.adapter = new MoodsAdapter()
        this.cacheElements()
        this.fetchAndLoadMoods()
    }

    cacheElements() {
        this.moodsContainer = document.getElementById('moods-container')
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
        this.moodsContainer.innerHTML = this.moods.map(mood => `<div class="mood-card" data-mood-id=${mood.id}>${mood.state}</div>`).join('')
    }
}