function addSelected(item) {
    item.addEventListener("click", () => {
        lastItem.classList.remove('selected')
        item.classList.add('selected')
        lastItem = item
    })
}

//resalta talle seleccionado
const sizeBtns = document.querySelectorAll('.size')
let lastItem = sizeBtns[0]
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
        const newColors = data.products[0].options[0].values
        const colors = document.querySelector('.colors')
        for (let i = 0; i < newColors.length; i++) {
            const newA = document.createElement('a')
            const newDiv = document.createElement('div')
            newA.setAttribute('class', 'colors-btn')
            colors.append(newA)
            newA.append(newDiv)
            newDiv.setAttribute('class', '')
            newDiv.style.backgroundColor = newColors[i]
        }

        //resalta color seleccionado
        const colorBtns = document.querySelectorAll('.colors-btn')
        colorBtns.forEach(addSelected)

        //product cards

    })