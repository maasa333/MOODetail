class Moods {
    constructor() {
        this.moods = [];
        this.adapter = new MoodsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadMoods()
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
        const moodsContainer = document.getElementById('moods-container')
        const moodsStr = this.moods.map(mood => `<li>${mood.state}</li>`).join('')
        moodsContainer.innerHTML = moodsStr
    }
}