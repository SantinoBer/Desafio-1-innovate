const state = {}

document.addEventListener('DOMContentLoaded',async ()=>{
    await getProducts()
    addTitleText()
    addBodyText()
    addImages()
    addColors()
    addSizes()
    addProductCards()
    manageSelected()
})

//get information from json
async function getProducts(){
    try{
        let response = await fetch('./products.json')
        state.data = await response.json()
        state.data.products.splice(5)
    }catch(error){
        console.error(error)
    }
}

//add title text
async function addTitleText(){
    const title = document.querySelectorAll('.main-title')
    title.forEach((title) => title.innerText = state.data.products[0].title)
}

//add body text
async function addBodyText(){        
    const body = document.getElementById('bodyText');
    const newBodyText = state.data.products[0].body_html;
    body.innerHTML = newBodyText;
}

//add images
async function addImages(){
    const smallImages = document.querySelector('.small-img-box');
    const largeImages = document.querySelector('.large-img-box');
    const images = state.data.products[0].images;

    for (let i = 0; i < images.length; i++) {
        const newSrc = images[i].src
        const sImg = document.createElement('img');
        const lImg = document.createElement('img');
        sImg.setAttribute('src', newSrc);
        sImg.setAttribute('class', 'small-img');
        smallImages.append(sImg);
        lImg.setAttribute('src', newSrc);
        lImg.setAttribute('class', 'large-img');
        largeImages.append(lImg);
    }
}

//add colors
async function addColors(){
    const newColors = state.data.products[0].options[0].values
    const colors = document.querySelector('.colors')
    for (let i = 0; i < newColors.length; i++) {
        const newA = document.createElement('a');
        const newDiv = document.createElement('div');
        newA.setAttribute('class', 'colors-btn');
        colors.append(newA);
        newA.append(newDiv);
        newDiv.setAttribute('class', '');
        newDiv.style.backgroundColor = newColors[i];
    }
}

//add sizes
async function addSizes(){
    const sizeContainer = document.querySelector('.size-container');
    const newSizes = state.data.products[0].options[1].values;
    for (let i = 0; i < newSizes.length; i++) {
        const newA = document.createElement('a');
        newA.setAttribute('class', 'size');
        sizeContainer.append(newA);
        newA.textContent = newSizes[i];
    }
}

//manage "selected" class
async function manageSelected(){
    //resalta color seleccionado
    const colorBtns = document.querySelectorAll('.colors-btn');
    let lastColor = colorBtns[0];
    colorBtns.forEach(color => {
        color.addEventListener("click", () => {
            lastColor.classList.remove('selected');
            color.classList.add('selected');
            lastColor = color;
        })
    })


    //resalta talle seleccionado
    const sizeBtns = document.querySelectorAll('.size');
    let lastSize = sizeBtns[0];
    sizeBtns.forEach(size => {
        size.addEventListener("click", () => {
            lastSize.classList.remove('selected');
            size.classList.add('selected');
            lastSize = size;
        })
    })
}

//add product cards
async function addProductCards(){
    const cardContainer = document.querySelector('.product-cards-container')

    for (let i = 1; i < state.data.products.length; i++) {
        const CardImg = state.data.products[i].image.src;
        const CardTitle = state.data.products[i].title;
        const newFig = document.createElement('figure');
        const newCardImg = document.createElement('img');
        const newCardTitle = document.createElement('figcaption');
        const newCardPrice = document.createElement('figcaption');
        cardContainer.append(newFig);
        newFig.append(newCardImg, newCardTitle, newCardPrice);
        newCardImg.setAttribute('class', 'product-card-img');
        newCardImg.setAttribute('src', CardImg);
        newCardTitle.setAttribute('class', 'product-card-title');
        newCardTitle.textContent = CardTitle;
        newCardPrice.innerHTML = '8990,00';
    }
}