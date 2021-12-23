const baseUrl = "http://localhost:3000"

// DOM selectors
const menu = document.querySelector('#ramen-menu')
const detail = document.querySelector('#ramen-detail')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')

// Listeners
newRamenForm.addEventListener('submit', handleAddRamen)

// Fetchers
function getAllRamens(){
    fetch(baseUrl + `/ramens`)
        .then(res => res.json())
        // .then((arrRamenObj) => renderAllRamens(arrRamenObj))
        .then(renderAllRamens)
}

// Render functions
function renderAllRamens(ramensArr){
    ramensArr.forEach(renderOneMenu)
}

function renderOneMenu(ramenObj){
    const img = document.createElement("img")

    img.src = ramenObj.image
    img.addEventListener('click', () => renderDetail(ramenObj))
    menu.appendChild(img)
}

function renderDetail(ramenObj){
    detail.innerHTML = `
        <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
        <h2 class="name">${ramenObj.name}</h2>
        <h3 class="restaurant">${ramenObj.restaurant}</h3>
    `
    rating.innerText = ramenObj.rating
    comment.innerText = ramenObj.comment
}

// Event handlers

function handleAddRamen(e){
    e.preventDefault()
    console.log(e.target.restaurant)
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target["new-comment"].value
    const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment
    }
    renderOneMenu(newRamen)
}

// Initializers
getAllRamens()