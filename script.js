// API URL for CoinGecko (10 popular cryptocurrencies)
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,cardano,polkadot,binancecoin,solana,dogecoin,monero";

// Function to fetch and display cryptocurrency data
async function fetchCryptoData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayCryptoData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    const cryptoListContainer = document.getElementById('crypto-list');
    cryptoListContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}

// Function to display the fetched cryptocurrency data
function displayCryptoData(cryptos) {
  const cryptoListContainer = document.getElementById('crypto-list');
  cryptoListContainer.innerHTML = ''; // Clear any previous data

  cryptos.forEach((crypto, index) => {
    const cryptoItem = document.createElement('div');
    cryptoItem.classList.add('crypto-item');

    cryptoItem.innerHTML = `
      <div class="name">${crypto.name}</div>
      <div class="price">$${crypto.current_price.toFixed(2)}</div>
    `;
    
    cryptoListContainer.appendChild(cryptoItem);
    cryptoListContainer.appendChild(document.createElement('hr'));  // Add horizontal line after each crypto
  });
}

// Fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchCryptoData);
