function addSelected(item) {
    item.addEventListener("click", () => {
        lastItem.classList.remove('selected')
        item.classList.add('selected')
        lastItem = item
    })
}

//resalta color seleccionado
const colorBtns = document.querySelectorAll('.colors-btn')

//inicializa lastItem
let lastItem = colorBtns[0]
colorBtns.forEach(addSelected)

//resalta talle seleccionado
const sizeBtns = document.querySelectorAll('.size')
sizeBtns.forEach(addSelected)

fetch('./products.json')
    .then(response => response.json())
    .then(json => {
        json.products.splice(5)
        return json
    })
    .then(data => {
        //title text
        const title = document.querySelectorAll('.main-title')
        title.forEach(title => title.innerText = data.products[0].title)

        //body text
        const body = document.getElementById('bodyText')
        const newBodyText = data.products[0].body_html
        body.innerHTML = newBodyText

        //add main images
        const smallImages = document.querySelector('.small-img-box')
        const largeImages = document.querySelector('.large-img-box')

        const images = data.products[0].images

        for (let i = 0; i < images.length; i++) {
            const newSrc = images[i].src
            const sImg = document.createElement('img')
            const lImg = document.createElement('img')
            sImg.setAttribute('src', newSrc)
            sImg.setAttribute('class', 'small-img')
            smallImages.append(sImg)
            lImg.setAttribute('src', newSrc)
            lImg.setAttribute('class', 'large-img')
            largeImages.append(lImg)
        }

        //change colors
    

        //product cards

    })