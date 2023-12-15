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

        //reemplazando imagenes
        const smallImages = document.querySelector('.small-img-box')
        const largeImages = document.querySelector('.large-img-box')

        const images = data.products[0].images

        images.forEach(function(item,index){
            const newSrc = images[index].src
            const simg = document.createElement('img')
            const limg = document.createElement('img')
            simg.setAttribute('src', newSrc)
            simg.setAttribute('class', 'small-img')
            smallImages.append(simg)
            limg.setAttribute('src', newSrc)
            limg.setAttribute('class', 'large-img')
            largeImages.append(limg)
        })

        
    })