class Moods {
    constructor() {
        this.moods = [];
        this.adapter = new MoodsAdapter();
        // this.bindEventListeners();
        this.fetchAndLoadMoods();
    }

    fetchAndLoadMoods() {
        this.adapter.getMoods().then(moods => {
            moods.map(mood => this.moods.push(mood))
        })
        .then(() => {
            this.display()
        })
    }

    display() {
        const moodsContainer = document.getElementById('moods-container');
        moodsContainer.innerText = 'test'
        console.log(`moods:`, this.moods)
    }
}