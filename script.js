const colorBtns = document.querySelectorAll('.colors-btn')

let lastColor = colorBtns[0]
colorBtns.forEach(colorBtn => {
    colorBtn.addEventListener("click", () => {
        lastColor.classList.remove('selected')
        colorBtn.classList.add('selected')
        lastColor = colorBtn
    })
})

fetch('./products.json')
    .then(response => response.json())
    .then(json => {
        json.products.splice(5)
        return json})
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

        images.forEach(function(item,index){
            const newSrc = images[index].src
            const sImg = document.createElement('img')
            const lImg = document.createElement('img')
            sImg.setAttribute('src', newSrc)
            sImg.setAttribute('class', 'small-img')
            smallImages.append(sImg)
            lImg.setAttribute('src', newSrc)
            lImg.setAttribute('class', 'large-img')
            largeImages.append(lImg)
        })

        //change colors
    })