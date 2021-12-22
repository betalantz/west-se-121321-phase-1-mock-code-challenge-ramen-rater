const baseUrl = "http://localhost:3000"

// DOM selectors
const menu = document.querySelector('#ramen-menu')


// Listeners


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
    console.log(ramenObj)
    const img = document.createElement("img")

    img.src = ramenObj.image
    menu.appendChild(img)
}

// Event handlers


// Initializers
getAllRamens()