function convertToJson(response)
{
    return response.json();
}
const tbody_elem=document.getElementById("search_result");
function showResult(data)
{
    for(let i=1;i<data.coins.length;i++)
    {
        const single_data   =  data.coins[i];

        const new_row       =   document.createElement('tr');
        const s_no          =   document.createElement('td');
        const logo          =   document.createElement('td');
        const name          =   document.createElement('td');
        const link          =   document.createElement('td');
        const img           =   document.createElement('img');
        const a             =   document.createElement('a');

        s_no.innerText      =   i;
        img.src             =   single_data.thumb;
        logo.appendChild(img);
        name.innerText=single_data.name+"("+single_data.symbol+")";
        a.innerText  =   "Show More";
        a.href="detail.html?coin="+single_data.id;


        new_row.appendChild(s_no);
        new_row.appendChild(logo);
        new_row.appendChild(name);
        new_row.appendChild(link);
        new_row.appendChild(a);

        tbody_elem.appendChild(new_row);


     

    }
    // console.log(data.coins);
}

// const  search_value=document.getElementById("search").value;
// search.value=search_value;
var url     =   new URL(window.location.href);
var params  =   new URLSearchParams(url.search);
let query   =   params.get("q");

// console.log(param);
// console.log(query);
fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(convertToJson).then(showResult);


// console.log(window.location.href);
