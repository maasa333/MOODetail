class Moods {
    constructor() {
        this.moods = [];
        this.adapter = new MoodsAdapter();
        // this.bindEventListeners();
        this.fetchAndLoadMoods();
    }

    fetchAndLoadMoods() {
        this.adapter.getMoods().then(moods => {
            console.log(moods)
        })
        // .then(() => {
        //     this.display()
        // })
    }

    display() {
        const moodsContainer = document.getElementById('moods-container');
        moodsContainer.innerText = 'test'
    }
}