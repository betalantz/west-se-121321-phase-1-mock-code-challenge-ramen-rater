const url = "http://localhost:3000/ramens"
// const localRamen = []

// DOM selectors
const menu = document.querySelector('#ramen-menu')
const detail = document.querySelector('#ramen-detail')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')
const form = document.querySelector('#new-ramen')
const edit = document.querySelector('#edit-ramen')
const newRating = document.querySelector('#new-rating')
const newComment = document.querySelector('#new-comment')


// Listeners
form.addEventListener('submit', handleAddRamen)
edit.addEventListener('submit', handleEditRating)

// Fetchers

function getAllRamens(){
    return fetch(url)
        .then(r => r.json())
}

function getOneRamen(id){
    return fetch(url + `/${id}`)
        .then(r => r.json())
}

function updateRamen(ramenObj){
    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    }
    fetch(url + `/${ramenObj.id}`, config)
    .then(() => {
        getAllRamens().then(renderAllRamens)
    })
}

function addRamen(ramenObj){
    const config = {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    }
    return fetch(url, config)
        .then(r => r.json())
}

function deleteRamen(id){
    return fetch(url + `/${id}`, {method: "DELETE"})
}

// Render functions

function renderAllRamens(ramensArr){
    menu.innerHTML = ''
    ramensArr.forEach(renderOneMenu)
}

function renderOneMenu(ramenObj){
    const div = document.createElement('div')
    const img = document.createElement('img')
    const button = document.createElement('button')

    img.src = ramenObj.image
    button.textContent = 'X'
    button.style.backgroundColor = 'red'
    button.style.color = 'white'

    div.append(img, button)
    button.addEventListener('click', () => handleRemoveRamen(ramenObj.id))
    img.addEventListener('click', () => renderDetail(ramenObj))
   
    menu.appendChild(div)
}

function renderDetail(ramenObj){
    detail.innerHTML = `
        <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
        <h2 class="name">${ramenObj.name}</h2>
        <h3 class="restaurant">${ramenObj.restaurant}</h3>
    `
    rating.innerText = ramenObj.rating
    comment.innerText = ramenObj.comment
    newRating.placeholder = ramenObj.rating
    newComment.placeholder = ramenObj.comment
    edit.dataset.id = ramenObj.id
}

// Event handlers

function handleAddRamen(e){
    e.preventDefault()
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target["new-comment"].value
    console.log('comment: ', comment);
    const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment
    }
    addRamen(newRamen).then(renderOneMenu)
    e.target.reset()
}

function handleEditRating(e){
    e.preventDefault()
    console.log('e: ', e.target);
    rating.textContent = newRating.value
    comment.textContent = newComment.value
    updateRamen({
        id: e.target.dataset.id,
        rating: newRating.value,
        comment: newComment.value
    })
    e.target.reset()
}

function handleRemoveRamen(id){
    deleteRamen(id)
      .then(() => getAllRamens().then(renderAllRamens))
}

// Initializers
getAllRamens().then(renderAllRamens)
getOneRamen(1).then(renderDetail)