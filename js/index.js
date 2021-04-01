const baseURL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded",()=>{
    fetchMonsters()
    addMonsterForm()
    document.querySelector("#forward").addEventListener("click", next50)
    document.querySelector("#back").addEventListener("click",previous50)
})

 let page = 1 
function fetchMonsters(){
    fetch(baseURL+`/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then((data) => {
        const div = document.querySelector("#monster-container")
        div.innerHTML=""
        for(let a=0;a<data.length;a++){
            let divTags = document.createElement("div")
            divTags.innerHTML = `
            <h2>${data[a].name}</h2>
            <h4><strong>Age: ${data[a].age}</strong></h4>
            <p>Bio: ${data[a].description}</p>`
            div.appendChild(divTags)
            console.log(data[a])
        }
    })
}
function addMonsterForm() {
    let divs = document.querySelector("#create-monster")
    let forms = document.createElement("form")
    forms.innerHTML = 
    `<input id='name' placeholder='Name'>
    <input id='age' placeholder='Age'>
    <input id='description' placeholder='description'>
    <button id="create">Create</button>`
    divs.appendChild(forms)
    forms.setAttribute('id','create-form')
    let creates = document.querySelector("#create-form")
    creates.addEventListener("submit", createMonster)
}


function createMonster(e){
    e.preventDefault()
    const monster = {
        name: document.querySelector("#name").value,
        age: document.querySelector("#age").value,
        description: document.querySelector("#description").value
    }
    fetch(baseURL+'/monsters',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then((data) =>{
        console.log(data)
        const div = document.querySelector("#monster-container")
        let divTags = document.createElement("div")
            divTags.innerHTML = `
            <h2>${data.name}</h2>
            <h4><strong>Age: ${data.age}</strong></h4>
            <p>Bio: ${data.description}</p>`
            div.appendChild(divTags)
            document.querySelector("#name").value = ""
            document.querySelector("#age").value= ""
            document.querySelector("#description").value= ""
    })
}

function next50() {
  
    page++
    fetchMonsters(page)


}
function previous50() {
        
    1<page? (page--, fetchMonsters(page)) : alert("No more monsters here")
}