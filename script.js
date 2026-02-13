const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".select")
const currencySelect1 = document.querySelector(".select1")

const convertValues = async () => {
    const inputCurrencyValue = parseFloat(
        document.querySelector(".input-valor").value
    );

    const valorMoeda = document.querySelector(".moeda-valor");
    const valorMoeda2 = document.querySelector(".moeda-valor2");

    if (isNaN(inputCurrencyValue)) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    const response = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
    );

    const data = await response.json();

    const dolarToday = parseFloat(data.USDBRL.high);
    const euroToday = parseFloat(data.EURBRL.high);
    const libraToday = parseFloat(data.GBPBRL.high);
    const bitcoinToday = parseFloat(data.BTCBRL.high);

    valorMoeda.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

    if (currencySelect.value === "dolar") {
        valorMoeda2.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday);

    } else if (currencySelect.value === "euro") {
        valorMoeda2.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);

    } else if (currencySelect.value === "libra") {
        valorMoeda2.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday);

    } else if (currencySelect.value === "bitcoin") {
        const valorEmBitcoin = inputCurrencyValue / bitcoinToday;
        valorMoeda2.innerHTML = valorEmBitcoin.toFixed(8) + " BTC";
    }
};


function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".img-usa")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/usa.png"
    }


    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra.png"
    }

    if (currencySelect.value == "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }
    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)

