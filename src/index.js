import './style.css'

const sliderImages = document.querySelector('.slider__images')
let dots = document.querySelectorAll('.dot')



const sliderImg = [
    {
        imgSrc: 'images/banner1.jpg',

    },
    {
        imgSrc: 'images/banner2.jpg',

    },
    {
        imgSrc: 'images/banner3.jpg',

    }
]
let n = 0

function upDateSlide() {
    sliderImages.src = sliderImg.imgSrc
    dots.forEach(function (dotItem) {
        dotItem.classList.remove('dot-active')
    })

    dots[n].classList.add('dot-active')
}


dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
        n = index
        upDateSlide()
    })
})
