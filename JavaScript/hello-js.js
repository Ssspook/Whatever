(function() {
    document.addEventListener("DOMContentLoaded", () => {
        calculateLoadTime()
        highlightSelectedButton()
        displayActiveButton()
    })
})();

function calculateLoadTime() {
    const startTime = new Date().getTime()
    const selector = document.querySelector(".perf")

    window.addEventListener('load', () => {
        selector.innerHTML = " Время загрузки: " + ((new Date().getTime() - startTime) / 1000) + " секунды"
    })
}
function highlightSelectedButton() {
    const buttonMain = document.querySelector(".button__navigation__main")
    const buttonWallet = document.querySelector(".button__navigation__wallet")
    const buttonFavorites =  document.querySelector(".button__navigation__favorites")

    buttonMain.addEventListener('mouseenter', () => {
        buttonMain.style.background = "#30D5C8"
    })
    buttonMain.addEventListener('mouseout', () => {
        buttonMain.style.background = "black"
    })

    buttonWallet.addEventListener('mouseenter', () => {
        buttonWallet.style.background = "#30D5C8"
    })
    buttonWallet.addEventListener('mouseout', () => {
        buttonWallet.style.background = "black"
    })

    buttonFavorites.addEventListener('mouseenter', () => {
        buttonFavorites.style.background = "#30D5C8"
    })
    buttonFavorites.addEventListener('mouseout', () => {
        buttonFavorites.style.background = "black"
    })
}

function displayActiveButton() {
    const navigationLinks = document.querySelectorAll('.button');
    if (document.location.pathname.includes("index.html")) {
        [...navigationLinks].find(link => link.dataset.link === 'main').classList.add('button__navigation__active')
    }

    if (document.location.pathname.includes("wallet.html")) {
        [...navigationLinks].find(link => link.dataset.link === 'wallet').classList.add('button__navigation__active')
    }

    if (document.location.pathname.includes("favorites.html")) {
        [...navigationLinks].find(link => link.dataset.link === 'favorites').classList.add('button__navigation__active')
    }
}

