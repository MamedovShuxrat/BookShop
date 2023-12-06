const filterItems = document.querySelectorAll('.filter__item')
const cardsItemContainer = document.querySelector('.cards__wrapper')



document.addEventListener('DOMContentLoaded', function () {
    getPostRequest()
})



function createCard(books) {
    let cardsItems = ''
    if (books.items.length > 0) {

        books.items.forEach(book => {
            let cardTitle = book.volumeInfo.title || 'No Title'
            let cardAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No Author'
            let cardDescription = descriptionLength(book.volumeInfo.description || '', 200) || 'No Description'
            let cardImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://placehold.co/220x320/png'

            cardsItems += `<div class="cards__items">
                <div class="cards__images">
                    <img src="${cardImg}" alt="pic" class="cards__pic">
                </div>
                <div class="cards__content">
                    <span class="cards__author">${cardAuthor}</span>
                    <h3 class="cards__name">${cardTitle}</h3>
                    <div class="cards__stars">
                        <span class="cards__star">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11"
                                fill="none">
                                <path
                                    d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
                                    fill="#F2C94C" />
                            </svg>
                        </span>
                        <span class="cards__star"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="11"
                                viewBox="0 0 12 11" fill="none">
                                <path
                                    d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
                                    fill="#F2C94C" />
                            </svg></span>
                        <span class="cards__star"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="11"
                                viewBox="0 0 12 11" fill="none">
                                <path
                                    d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
                                    fill="#F2C94C" />
                            </svg></span>
                        <span class="cards__star"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="11"
                                viewBox="0 0 12 11" fill="none">
                                <path
                                    d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
                                    fill="#F2C94C" />
                            </svg></span>
                        <span class="cards__star"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="11"
                                viewBox="0 0 12 11" fill="none">
                                <path
                                    d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
                                    fill="#EEEDF5" />
                            </svg></span>
    
                        <span class="review">${'???'}</span>
                    </div>
                    <div class="cards__desc">${cardDescription}</div>
                    <div class="cards__price">$4.99</div>
    
                    <button class="cards__btn">buy now</button>
                </div>
            </div>`
        })
        cardsItemContainer.innerHTML = cardsItems
    }




}
function getUrl() {
    let url = ''
    const apiKey = 'AIzaSyDBugIaCt5--F5LHnMyxvXaNg1l02ZmXIc'
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes'
    const query = 'subject:Business'
    const printType = 'books'
    const startIndex = 0
    const maxResults = 6
    const langRestrict = 'en'

    return url = `${apiUrl}?q=${encodeURIComponent(query)}&key=${apiKey}&printType=${printType}&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=${langRestrict}`
}

function getPostRequest() {
    return fetch(getUrl(), {
        headers: {
            "Content-type": "application/json; chatset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((posts) => {
            createCard(posts)
        })
}

function descriptionLength(description, maxLength) {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
}