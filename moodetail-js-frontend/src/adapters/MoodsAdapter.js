class MoodsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/moods'
    }

    getMoods() {
        return fetch(this.baseUrl).then(resp => resp.json())
    }
}