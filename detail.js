function convertToJson(response)
{
    return response.json();
}
function showInfo(data)
{
    const coin_img      =       document.getElementById("coin_image");
    coin_img.src        =       data.image.large;
    const coin_name     =       document.getElementById("coin_name");
    coin_name.innerText =       data.name;
    const coin_info     =       document.getElementById("coin_info");
    coin_info.innerHTML =       data.description.en;
    // console.log(data);
}
var url     =   new URL(window.location.href);
var params  =   new URLSearchParams(url.search);
let coin_id   = params.get("coin");
function showPrice(data)
{
    // console.log(data);
    const inr_price      =       document.getElementById("inr_prices");
    inr_price.innerText      =      "₹"+" " +data[coin_id].inr;
    const usd_price      =       document.getElementById("usd_prices");
    usd_price.innerText      =      "$"+" " +data[coin_id].usd;
    const eur_price      =       document.getElementById("eur_prices");
    eur_price.innerText      =      "€"+" " +data[coin_id].eur;
}
function showChart(data)
{
    // console.log(data);
    showGraph(data);
}
function unixToTime(timestamp)
{
    const date          =       new Date(timestamp);
    var date_string     =       date.getDate();
    var month_string    =       date.getMonth();
    var year            =       date.getFullYear();
    const fulldate      =       date_string+" - "+month_string+" - "+year;
    return fulldate;
}



// console.log(coin_id);
fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=inr&days=7&interval=daily`).then(convertToJson).then(showChart);
fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=true`).then(convertToJson).then(showInfo);
fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin_id}&vs_currencies=inr%2Cusd%2Ceur`).then(convertToJson).then(showPrice);
function showGraph(history_data)
{
    let labels=[];
    let prices=[];
    for(let i=0;i<history_data.prices.length;i++)
    {
    
        const single_price=history_data.prices[i];
        const fulldate_label=unixToTime(single_price[0]);
        labels.push(fulldate_label) ;
        prices.push(single_price[1]);
        // console.log(labels);
        // console.log(prices);
        // console.log(single_price);
    }
    // console.log(history_data.prices);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Prices (IN INR)',
            data: prices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}
