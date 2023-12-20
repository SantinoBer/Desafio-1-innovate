let state = {}

document.addEventListener('DOMContentLoaded', async () => {
    await getProducts()
    addTitleText()
    addBodyText()
    addImages()
    addColors()
    addSizes()
    addProductCards()
    manageSelected()
    checkStock()
})

//get information from json
async function getProducts() {
    try {
        let response = await fetch('./products.json')
        state.data = await response.json()
        state. data.products = state.data.products.slice(getRandomBetween(0,40), 48)
    } catch (error) {
        console.error(error)
    }
}

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
//add title text
async function addTitleText() {
    const title = document.querySelectorAll('.main-title')
    title.forEach(title => title.innerText = state.data.products[0].title)
}

//add body text
async function addBodyText() {
    const body = document.getElementById('bodyText');
    const newBodyText = state.data.products[0].body_html;
    body.innerHTML = newBodyText;
}

//add images
async function addImages() {
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
async function addColors() {
    const newColors = state.data.products[0].options[0].values
    const colors = document.querySelector('.colors')
    for (let i = 0; i < newColors.length; i++) {
        const newA = document.createElement('a');
        const newDiv = document.createElement('div');
        newA.setAttribute('class', 'colors-btn');
        colors.append(newA);
        newA.append(newDiv);
        newDiv.style.backgroundColor = newColors[i];
    }
}

//add sizes
async function addSizes() {
    let newSizes = []
    const sizeContainer = document.querySelector('.size-container');
    //agregado ya que algunos productos no tienen talles
    try{
        newSizes = state.data.products[0].options[1].values;
    }catch{
        newSizes = ['001','002','003']
    }
    for (let i = 0; i < newSizes.length; i++) {
        const newA = document.createElement('a');
        newA.setAttribute('class', 'size');
        sizeContainer.append(newA);
        newA.textContent = newSizes[i];
    } 
}

//add product cards
async function addProductCards() {
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
        newCardPrice.innerText = '8990,00';
    }
}

//manage "selected" class
async function manageSelected() {
    //resalta color seleccionado
    const colorBtns = document.querySelectorAll('.colors-btn');
    let lastColor = colorBtns[0];
    toggleSelected(colorBtns,lastColor);

    //resalta talle seleccionado
    const sizeBtns = document.querySelectorAll('.size');
    let lastSize = sizeBtns[0];
    toggleSelected(sizeBtns,lastSize);

    //resalta talle en tabla de talles
    const sizeTable = document.querySelectorAll('.size-container .link')
    let lastSizeTable = sizeTable[0]
    toggleSelected(sizeTable,lastSizeTable)

    //resalta prenda en la tabla de talles
    const sizeTableClothes = document.querySelectorAll('.size-table-clothing-container a')
    let lastClothePiece = sizeTableClothes[0]
    toggleSelected(sizeTableClothes,lastClothePiece)
}

function toggleSelected(array,lastItem){
    array.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            lastItem.classList.remove('selected');
            item.classList.add('selected');
            lastItem = item;
        })
    }) 
}

//check if selected variant is in stock
const cartBtn = document.getElementById('cartBtn')
async function checkStock() {
    const variants = state.data.products[0].variants
    cartBtn.addEventListener('click', () => {
        const selectedColor = document.querySelector('.colors-btn.selected div')
        const selectedSize = document.querySelector('.size.selected')
        if (selectedColor === null || selectedSize === null) {
            alert('Seleccione un color y talle antes de agregar')
        }
        else {
            for (let i = 0; i < variants.length; i++) {
                const option1 = variants[i].option1;
                const option2 = variants[i].option2;
                if (selectedColor.style.backgroundColor === option1 && selectedSize.innerText === option2) {
                    if (variants[i].inventory_quantity > 0) {
                        return alert('Agregado al carrito')
                    }
                    else {
                        return alert('No hay stock')
                    }
                }
            }
            return alert('La combinacion no existe')
        }
    })
}

//change btn content for mobile
function changeBtn() {
    cartBtn.textContent = '';
}

//abre la tabla de talles
const body = document.body
const sizeTable = document.getElementById('sizeTable')
function openSizeTable() {
    const sizeTableBtn = document.getElementById('sizeTableBtn')
    const closeBtn = document.getElementById('closeSizeTable')
    sizeTableBtn.addEventListener('click', () => {
        sizeTable.classList.add('open-size-table')
        if (screen.width < 900) {
            body.classList.add('no-scroll')
        }
    })
    closeBtn.addEventListener('click', () => {
        sizeTable.classList.remove('open-size-table')
        if (screen.width < 900) {
            body.classList.remove('no-scroll')
        }
    })
}
openSizeTable();

//abre la tabla de textil
const textil = document.getElementById('textil')
function openTextil(){
    const textilBtn = document.getElementById('textilBtn')
    const closeBtn = document.getElementById('closeTextil')
    textilBtn.addEventListener('click', () => {
        textil.classList.add('open-textil')
        if (screen.width < 900) {
            body.classList.add('no-scroll')
        }
        
    })
    closeBtn.addEventListener('click', () => {
        textil.classList.remove('open-textil')
        if (screen.width < 900) {
            body.classList.remove('no-scroll')
        }
    })
}
openTextil()

if (screen.width<900) {
    changeBtn()
}

window.addEventListener('resize', () => {
    if (screen.width < 900) {
        changeBtn();
        if (sizeTable.className.includes('open-size-table')){
            body.classList.add('no-scroll')
        }
        if (textil.className.includes('open-textil')){
            body.classList.add('no-scroll')
        }
    }
    else {
        cartBtn.textContent = 'AGREGAR AL CARRITO';
        body.classList.remove('no-scroll');
    }
})
