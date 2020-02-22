// class Prompts {
//     constructor() {
//         this.prompts = []
//         this.adapter = new PromptsAdapter()
//         this.fetchAndLoadPrompts()
//     }

//     fetchAndLoadPrompts() {
//         this.adapter.getPrompts().then(prompts => {
//             prompts.map(prompt => this.prompts.push(new Prompt(prompt)))
//         })
//         .then(() => {
//             this.display()
//         })
//     }

//     display() {
//         const moodCards = document.getElementsByClassName('mood-card')
//         this.prompts.forEach(prompt => {
//             if (prompt.mood_id === 1) {
//                 const li = document.createElement('li')
//                 li.innerHTML = prompt.desc
//                 moodCards[0].appendChild(li)
//             }
//         })
//     }
// }