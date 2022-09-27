const requestURL = "https://my-json-server.typicode.com/Ssspook/CryptoCoins/coins";
const coinsTable = document.querySelector('tbody');

(function() {
    sleep(2000)
        .then( _ => {
            fetch(requestURL)
                .then(response => {
                    updateRequestCount()
                    removeLoaders()
                    if (response.status !== 200) {
                        displayErrorPlaceholder()
                    } else {
                        response.text().then(coins => addCoinsToTable(JSON.parse(coins)))
                    }
                })
                .catch(_ => displayErrorPlaceholder())
        })
})();

function addCoinsToTable(coins) {
    let dataRows = coinsTable.querySelectorAll('tr')

    let coinsArray = [];
    for (const index in coins) {
        const coin = coins[index]
        coinsArray.push(coin)
    }

    if (localStorage.getItem('requestCount') % 2 === 0) {
        coinsArray = coinsArray.filter(item => item.price > 100)
    }

    for (const index in coinsArray) {
        const coin = coinsArray[index]

        const coinLayout =  `
              <td class="table-item">${coin.name}</td>
              <td class="table-item">${coin.price}$</td>
              <td class="table-item">${coin.balance} ${cryptoShortName(coin.name)}</td>
              <td class="table-item">${coin.onAccount} $</td>
         `;

        if (index >= dataRows.length) {
            coinsTable.insertAdjacentHTML('beforeend', coinLayout)
        } else {
            dataRows[index].innerHTML = coinLayout
        }
    }

    clearEmptyRows()
}

function removeLoaders() {
    const loaderFields = document.querySelectorAll('.loading');

    for (let i = 0; i < loaderFields.length; i++) {
        const loadingField = loaderFields.item(Number(i))
        loadingField.style.backgroundImage = 'none';
        loadingField.style.animation = 'none'
        loadingField.style.opacity = '100%'
    }
}

function clearEmptyRows() {
    let dataRows = coinsTable.querySelectorAll('td')

    for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        if (row.innerText === '') {
            row.closest('tr').remove()
        }
    }
}

function cryptoShortName(cryptoName) {
    switch (cryptoName) {
        case "Bitcoin": return "BTC"
        case "Dash": return "DASH"
        case "Atom": return "ATOM"
        case "Monero": return "XMR"
        case "ZCash": return "ZEC"
    }
}

function displayErrorPlaceholder() {
    let errorField = document.querySelector('.error-field')
    errorField.style.display = "flex";
}

// Will be removed, that is for the loader to show
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateRequestCount() {
    let requestCount = localStorage.getItem('requestCount');
    if (requestCount) {
        localStorage.setItem('requestCount', `${Number(requestCount) + 1}`)
    } else {
        localStorage.setItem('requestCount', '1')
    }
}