const coinsContainer = document.querySelector('.favorite-coins');
const assetNameRegExp = /^[a-zA-Z0-9]*$/;

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        listenToSubmit()
        listenToDelete()
        displayFavoriteCoins()
    })
})();

function listenToSubmit() {
    document.addEventListener("submit", (event) => {
        event.preventDefault()
        const assetName = document.getElementById('asset-name').value
        const id = assetName.hashCode()

        if (localStorage.getItem(`${id}`)) {
            alert("Эта монета уже добавлена!")
            return
        }

        if (!assetName.match(assetNameRegExp)) {
            alert("Разрешены только латинские буквы и цифры!")
            return
        }

        if (assetName.length === 0) {
            return
        }

        const inputField = document.getElementById(`asset-name`)
        inputField.value = "";

        localStorage.setItem(`${id}`, assetName)
        addCoinToLayout(assetName)
    })
}

function listenToDelete() {
    document.addEventListener('click', (event) => {
        if (event.target.closest('.red-cross')) {
            const fav_coin_container = event.target.closest('.delete-fav-coin-container');
            const asset = fav_coin_container.querySelector(`.favorite-coin`);

            deleteItem(asset.innerText)
            document.querySelector(`.favorite-coins`).innerHTML = ""
            displayFavoriteCoins()
        }
    });
}

function deleteItem(assetName) {
    const hash = assetName.hashCode()
    localStorage.removeItem(`${hash}`)
}

String.prototype.hashCode = function() {
    let hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

function displayFavoriteCoins() {
    const keys = Object.keys(localStorage)
    let i = keys.length

    while ( i-- ) {
        addCoinToLayout(localStorage.getItem(keys[i]))
    }
}

function addCoinToLayout(coinName) {
    const coinLayout = `
      <div class="delete-fav-coin-container">
          <div class="favorite-coin" id="coin-name">
              ${coinName}
          </div>
          <button class="red-cross">&#10060;</button>
      </div>
    `;
    coinsContainer.insertAdjacentHTML('beforeend', coinLayout);
}