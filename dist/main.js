/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _js_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider */ \"./src/js/slider.js\");\n/* harmony import */ var _js_slider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_slider__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_bookApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/bookApi */ \"./src/js/bookApi.js\");\n/* harmony import */ var _js_bookApi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_bookApi__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/index.js?");

/***/ }),

/***/ "./src/js/bookApi.js":
/*!***************************!*\
  !*** ./src/js/bookApi.js ***!
  \***************************/
/***/ (() => {

eval("const filterItems = document.querySelectorAll('.filter__item')\r\nconst cardsItemContainer = document.querySelector('.cards__wrapper')\r\nconst loadMoreBtn = document.querySelector('.cards__btn-main')\r\nconst shopper = document.querySelector('.header__shopping-cart span')\r\n\r\nlet activeValue = ''\r\nlet selectedCategories = null\r\nlet startIndex = 0\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n\r\n    initializeBuyNowButtons()\r\n    const activeFilterItem = document.querySelector('.filter__item.active')\r\n\r\n    if (activeFilterItem) {\r\n        activeValue = activeFilterItem.textContent\r\n        selectedCategories = categories.find(category => category.name === activeValue)\r\n\r\n        if (selectedCategories) {\r\n            const query = `subject:${selectedCategories.subject}`\r\n            getPostRequest(getUrl(query))\r\n        } else {\r\n            console.log('Категория не найдена')\r\n        }\r\n    }\r\n})\r\n\r\nconst categories = [\r\n    {\r\n        name: 'Architecture',\r\n        subject: 'Architecture'\r\n    },\r\n    {\r\n        name: 'Art & Fashion',\r\n        subject: 'Art'\r\n    },\r\n    {\r\n        name: 'Biography',\r\n        subject: 'Biography&Autobiography'\r\n    },\r\n    {\r\n        name: 'Business',\r\n        subject: 'Business'\r\n    },\r\n    {\r\n        name: 'Crafts & Hobbies',\r\n        subject: 'Crafts&Hobbies'\r\n    },\r\n    {\r\n        name: 'Drama',\r\n        subject: 'Drama'\r\n    },\r\n    {\r\n        name: 'Fiction',\r\n        subject: 'Fiction'\r\n    },\r\n    {\r\n        name: 'Food & Drink',\r\n        subject: 'Cooking'\r\n    },\r\n    {\r\n        name: 'Health & Wellbeing',\r\n        subject: 'Health&Wellbeing'\r\n    },\r\n    {\r\n        name: 'History & Politics',\r\n        subject: 'History'\r\n    },\r\n    {\r\n        name: 'Humor',\r\n        subject: 'Humor'\r\n    },\r\n    {\r\n        name: 'Poetry',\r\n        subject: 'Poetry'\r\n    },\r\n    {\r\n        name: 'Psychology',\r\n        subject: 'Psychology'\r\n    },\r\n    {\r\n        name: 'Science',\r\n        subject: 'Science'\r\n    },\r\n    {\r\n        name: 'Technology',\r\n        subject: 'Technology'\r\n    },\r\n    {\r\n        name: 'Travel & Maps',\r\n        subject: 'Travel'\r\n    }\r\n]\r\n\r\nfunction createCard(books) {\r\n    let cardsItems = ''\r\n    if (books.items.length > 0) {\r\n        console.log(books)\r\n        books.items.forEach(book => {\r\n            let cardTitle = book.volumeInfo.title || 'No Title'\r\n            let cardAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No Author'\r\n            let cardDescription = descriptionLength(book.volumeInfo.description || '', 200) || 'No Description'\r\n            let cardImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://placehold.co/220x320/png'\r\n            let cardPrice = ''\r\n            if (book.saleInfo && book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount) {\r\n                cardPrice = `<div class=\"cards__price\">${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}</div>`\r\n            }\r\n\r\n            let cardRating = ''\r\n            if (book.volumeInfo.averageRating) {\r\n                const rating = parseInt(book.volumeInfo.averageRating)\r\n                if (!isNaN(rating) && rating > 0 && rating <= 5) {\r\n                    cardRating = `<div class=\"cards__stars\">`\r\n                }\r\n                for (let i = 0; i < rating; i++) {\r\n                    cardRating += `<span class=\"cards__star\">\r\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"11\" viewBox=\"0 0 12 11\" fill=\"none\">\r\n                        <path d=\"M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z\" fill=\"#F2C94C\" />\r\n                    </svg>\r\n                </span>`\r\n                }\r\n                cardRating += `</div>`\r\n\r\n            }\r\n\r\n            const bookId = book.id\r\n            console.log(bookId)\r\n            let cardBtnText = 'Buy now'\r\n            if (isBookInCart(bookId)) {\r\n                cardBtnText = 'In the cart'\r\n            }\r\n\r\n\r\n            cardsItems += `<div class=\"cards__items\">\r\n                <div class=\"cards__images\">\r\n                    <img src=\"${cardImg}\" alt=\"pic\" class=\"cards__pic\">\r\n                </div>\r\n                <div class=\"cards__content\">\r\n                    <span class=\"cards__author\">${cardAuthor}</span>\r\n                    <h3 class=\"cards__name\">${cardTitle}</h3>\r\n                    <div class=\"cards__stars\">\r\n                        <span class=\"review\">${cardRating}</span>\r\n                    </div>\r\n                    <div class=\"cards__desc\">${cardDescription}</div>\r\n                    <div class=\"cards__price\">${cardPrice}</div>\r\n    \r\n                    <button class=\"cards__btn\" data-book-id=\"${bookId}\">${cardBtnText}</button>\r\n                </div>\r\n            </div>`\r\n        })\r\n        cardsItemContainer.innerHTML = cardsItems\r\n\r\n\r\n\r\n        function updateBuyNowBtn(btn, bookId) {\r\n            const bookIndex = findBookIndexInCart(bookId)\r\n            if (bookIndex !== -1) {\r\n                btn.textContent = 'В корзине'\r\n            } else {\r\n                btn.textContent = 'Купить сейчас'\r\n            }\r\n            const cartCount = getCart().length\r\n            shopper.textContent = cartCount\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\nfunction appendCards(books) {\r\n    if (books.items.length > 0) {\r\n        const newCards = createCard(books)\r\n        cardsItemContainer.innerHTML += newCards\r\n    } else {\r\n        console.log('No more books to load.')\r\n    }\r\n}\r\n\r\n\r\nfunction handleFilterClick(event) {\r\n\r\n    filterItems.forEach(item => {\r\n        item.classList.remove('active')\r\n    })\r\n\r\n    const clickedItem = event.target;\r\n    clickedItem.classList.add('active')\r\n\r\n    activeValue = clickedItem.textContent\r\n    selectedCategories = categories.find(category => category.name === activeValue)\r\n\r\n    if (selectedCategories) {\r\n        const query = `subject:${selectedCategories.subject}`\r\n        startIndex = 0\r\n        const newUrl = getUrl(query)\r\n        getPostRequest(newUrl)\r\n    } else {\r\n        console.log('Категория не найдена')\r\n    }\r\n}\r\nfunction handleLoadMore() {\r\n    startIndex += 6;\r\n    if (selectedCategories) {\r\n        getPostRequest(getUrl(`subject:${selectedCategories.subject}`, startIndex))\r\n    }\r\n}\r\n\r\n\r\nfunction initializeBuyNowButtons() {\r\n    const buyNowButtons = document.querySelectorAll('.cards__btn')\r\n    buyNowButtons.forEach((btn) => {\r\n        const bookId = btn.getAttribute('data-book-id')\r\n        updateBuyNowBtn(btn, bookId);\r\n        btn.addEventListener('click', function () {\r\n            updateBuyNowBtn(btn, bookId)\r\n        })\r\n    })\r\n    filterItems.forEach(item => {\r\n        item.addEventListener('click', handleFilterClick)\r\n    })\r\n\r\n    loadMoreBtn.addEventListener('click', handleLoadMore)\r\n}\r\n\r\n\r\nfunction getUrl(query) {\r\n    let url = ''\r\n    const apiKey = 'AIzaSyDBugIaCt5--F5LHnMyxvXaNg1l02ZmXIc'\r\n    const apiUrl = 'https://www.googleapis.com/books/v1/volumes'\r\n    const printType = 'books'\r\n    const startIndex = 0\r\n    const maxResults = 6\r\n    const langRestrict = 'en'\r\n\r\n    return url = `${apiUrl}?q=${encodeURIComponent(query)}&key=${apiKey}&printType=${printType}&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=${langRestrict}`\r\n}\r\n\r\nfunction getPostRequest(url) {\r\n    return fetch(url)\r\n        .then((res) => res.json())\r\n        .then((posts) => {\r\n            appendCards(posts)\r\n        })\r\n        .catch((error) => {\r\n            console.error('Error fetching data:', error)\r\n        })\r\n}\r\n\r\nfunction descriptionLength(description, maxLength) {\r\n    if (description.length > maxLength) {\r\n        return description.substring(0, maxLength) + '...';\r\n    }\r\n    return description;\r\n}\r\n\r\n\r\nfunction isBookInCart(bookId) {\r\n    const cart = getCart()\r\n    return cart.includes(bookId)\r\n}\r\n\r\nfunction findBookIndexInCart(bookId) {\r\n    const cart = getCart()\r\n    return cart.indexOf(bookId)\r\n}\r\n\r\nfunction addToCart(bookId) {\r\n    const cart = getCart()\r\n    cart.push(bookId)\r\n    saveCart(cart)\r\n}\r\n\r\nfunction removeFromCart(index) {\r\n    const cart = getCart()\r\n    cart.splice(index, 1)\r\n    saveCart(cart)\r\n}\r\n\r\nfunction getCart() {\r\n    const cartData = localStorage.getItem('cart')\r\n    return cartData ? JSON.parse(cartData) : []\r\n}\r\n\r\nfunction saveCart(cart) {\r\n    localStorage.setItem('cart', JSON.stringify(cart))\r\n}\n\n//# sourceURL=webpack://bookshop/./src/js/bookApi.js?");

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("const sliderImages = document.querySelector('.slider__images')\r\nconst dots = document.querySelectorAll('.dot')\r\n\r\nconst sliderImg = [\r\n    {\r\n        imgSrc: './images/slider/banner1.jpg',\r\n    },\r\n    {\r\n        imgSrc: './images/slider/banner2.jpg',\r\n    },\r\n    {\r\n        imgSrc: './images/slider/banner3.png',\r\n    }\r\n]\r\nlet n = 0\r\n\r\nfunction changeSlide() {\r\n    n = (n + 1) % sliderImg.length\r\n    upDateSlide(n)\r\n\r\n}\r\n\r\nfunction upDateSlide(n) {\r\n    sliderImages.style.opacity = 0\r\n    setTimeout(() => {\r\n        sliderImages.src = sliderImg[n].imgSrc\r\n        sliderImages.style.opacity = 1\r\n    }, 600)\r\n    document.querySelector('.dot.dot-active').classList.remove('dot-active')\r\n    dots[n].classList.add('dot-active')\r\n}\r\n\r\n\r\ndots.forEach(function (dot, index) {\r\n    dot.addEventListener('click', function () {\r\n        n = index\r\n        upDateSlide(n)\r\n    })\r\n})\r\n\r\n\r\nsetInterval(changeSlide, 5000)\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;