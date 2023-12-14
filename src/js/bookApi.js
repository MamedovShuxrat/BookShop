const filterItems = document.querySelectorAll('.filter__item')
const cardsItemContainer = document.querySelector('.cards__wrapper')
const loadMoreBtn = document.querySelector('.cards__btn-main')
const shopper = document.querySelector('.header__shopping-cart span')

let activeValue = ''
let selectedCategories = null
let startIndex = 0
document.addEventListener('DOMContentLoaded', function () {
    initializeBuyNowButtons()
    const activeFilterItem = document.querySelector('.filter__item.active')

    if (activeFilterItem) {
        activeValue = activeFilterItem.textContent
        selectedCategories = categories.find(category => category.name === activeValue)

        if (selectedCategories) {
            const query = `subject:${selectedCategories.subject}`
            getPostRequest(getUrl(query))
        } else {
            console.log('Категория не найдена')
        }
    }
})


const categories = [
    {
        name: 'Architecture',
        subject: 'Architecture'
    },
    {
        name: 'Art & Fashion',
        subject: 'Art'
    },
    {
        name: 'Biography',
        subject: 'Biography&Autobiography'
    },
    {
        name: 'Business',
        subject: 'Business'
    },
    {
        name: 'Crafts & Hobbies',
        subject: 'Crafts&Hobbies'
    },
    {
        name: 'Drama',
        subject: 'Drama'
    },
    {
        name: 'Fiction',
        subject: 'Fiction'
    },
    {
        name: 'Food & Drink',
        subject: 'Cooking'
    },
    {
        name: 'Health & Wellbeing',
        subject: 'Health&Wellbeing'
    },
    {
        name: 'History & Politics',
        subject: 'History'
    },
    {
        name: 'Humor',
        subject: 'Humor'
    },
    {
        name: 'Poetry',
        subject: 'Poetry'
    },
    {
        name: 'Psychology',
        subject: 'Psychology'
    },
    {
        name: 'Science',
        subject: 'Science'
    },
    {
        name: 'Technology',
        subject: 'Technology'
    },
    {
        name: 'Travel & Maps',
        subject: 'Travel'
    }
]

function createCard(books) {
    let cardsItems = ''
    if (books.items.length > 0) {
        books.items.forEach(book => {
            let cardTitle = book.volumeInfo.title || 'No Title'
            let cardAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No Author'
            let cardDescription = descriptionLength(book.volumeInfo.description || '', 200) || 'No Description'
            let cardImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://placehold.co/220x320/png'
            let cardPrice = ''
            if (book.saleInfo && book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount) {
                cardPrice = `<div class="cards__price">${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}</div>`
            }

            let cardRating = ''
            if (book.volumeInfo.averageRating) {
                const rating = parseInt(book.volumeInfo.averageRating)
                if (!isNaN(rating) && rating > 0 && rating <= 5) {
                    cardRating = `<div class="cards__stars">`
                }
                for (let i = 0; i < rating; i++) {
                    cardRating += `<span class="cards__star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C" />
                    </svg>
                </span>`
                }
                cardRating += `</div>`

            }

            const bookId = book.id
            let cardBtnText = 'Buy now'
            if (isBookInCart(bookId)) {
                cardBtnText = 'In the cart'
            }


            cardsItems += `<div class="cards__items">
                <div class="cards__images">
                    <img src="${cardImg}" alt="pic" class="cards__pic">
                </div>
                <div class="cards__content">
                    <span class="cards__author">${cardAuthor}</span>
                    <h3 class="cards__name">${cardTitle}</h3>
                    <div class="cards__stars">
                        <span class="review">${cardRating}</span>
                    </div>
                    <div class="cards__desc">${cardDescription}</div>
                    <div class="cards__price">${cardPrice}</div>
    
                    <button class="cards__btn" data-book-id="${bookId}">${cardBtnText}</button>
                </div>
            </div>`
        })
        cardsItemContainer.innerHTML = cardsItems
    }
}

function updateBuyNowBtn(btn, bookId) {
    const bookIndex = findBookIndexInCart(bookId)
    if (bookIndex !== -1) {
        btn.textContent = 'Buy now'
        removeFromCart(bookIndex)
        shopper.textContent = getCart().length
    } else {
        btn.textContent = 'In the cart'
        addToCart(bookId)
        shopper.textContent = getCart().length

    }
}

function appendCards(books) {
    if (books.items.length > 0) {
        createCard(books)
    } else {
        console.log('No more books to load.')
    }
}


function handleFilterClick(event) {

    filterItems.forEach(item => {
        item.classList.remove('active')
    })

    const clickedItem = event.target;
    clickedItem.classList.add('active')

    activeValue = clickedItem.textContent
    selectedCategories = categories.find(category => category.name === activeValue)

    if (selectedCategories) {
        const query = `subject:${selectedCategories.subject}`
        startIndex = 0
        const newUrl = getUrl(query)
        getPostRequest(newUrl)
    } else {
        console.log('Категория не найдена')
    }
}
function handleLoadMore() {
    startIndex += 6;
    if (selectedCategories) {
        getPostRequest(getUrl(`subject:${selectedCategories.subject}`, startIndex))
    }
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cards__btn')) {
        const bookId = e.target.getAttribute('data-book-id')
        updateBuyNowBtn(e.target, bookId)
    }
})

function initializeBuyNowButtons() {
    filterItems.forEach(item => {
        item.addEventListener('click', handleFilterClick)
    })

    loadMoreBtn.addEventListener('click', handleLoadMore)
}


function getUrl(query) {
    let url = ''
    const apiKey = 'AIzaSyDBugIaCt5--F5LHnMyxvXaNg1l02ZmXIc'
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes'
    const printType = 'books'
    const maxResults = startIndex + 6
    const langRestrict = 'en'

    return url = `${apiUrl}?q=${encodeURIComponent(query)}&key=${apiKey}&printType=${printType}&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=${langRestrict}`
}

function getPostRequest(url) {
    return fetch(url)
        .then((res) => res.json())
        .then((posts) => {
            appendCards(posts)
        })
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
}

function descriptionLength(description, maxLength) {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
}


function isBookInCart(bookId) {
    const cart = getCart()
    return cart.includes(bookId)
}

function findBookIndexInCart(bookId) {
    const cart = getCart()
    return cart.indexOf(bookId)
}

function addToCart(bookId) {
    const cart = getCart()
    cart.push(bookId)
    saveCart(cart)
}

function removeFromCart(index) {
    const cart = getCart()
    cart.splice(index, 1)
    saveCart(cart)
}

function getCart() {
    const cartData = localStorage.getItem('cart')
    return cartData ? JSON.parse(cartData) : []
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}