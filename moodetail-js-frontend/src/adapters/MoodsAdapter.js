class MoodsAdapter {
    constructor() {
        // this.baseUrl = 'http://localhost:3000/moods'
        this.baseUrl = 'https://moodetail-api.herokuapp.com/moods'
    }

    getMoods() {
        return fetch(this.baseUrl).then(resp => resp.json())
    }
}