const sliderImages = document.querySelector('.slider__images')
const dots = document.querySelectorAll('.dot')

const sliderImg = [
    {
        imgSrc: './images/slider/banner1.jpg',
    },
    {
        imgSrc: './images/slider/banner2.jpg',
    },
    {
        imgSrc: './images/slider/banner3.png',
    }
]
let n = 0

function changeSlide() {
    n = (n + 1) % sliderImg.length
    upDateSlide(n)

}

function upDateSlide(n) {
    sliderImages.style.opacity = 0
    setTimeout(() => {
        sliderImages.src = sliderImg[n].imgSrc
        sliderImages.style.opacity = 1
    }, 600)
    document.querySelector('.dot.dot-active').classList.remove('dot-active')
    dots[n].classList.add('dot-active')
}


dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
        n = index
        upDateSlide(n)
    })
})


setInterval(changeSlide, 5000)