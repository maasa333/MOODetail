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
            console.log(this.moods)
        })
        .then(() => {
            this.display()
        })
    }

    display() {
        const moodsContainer = document.getElementById('moods-container')
        // console.log(this)
    }
}