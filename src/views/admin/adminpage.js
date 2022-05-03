document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("getUsersButton").addEventListener("click", (x, ev) => {
        fetch(location.origin + "/users/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            })
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
                let utCont = document.getElementById('userTableContainer');
                // Remove all chrildren
                while (utCont.firstChild) utCont.removeChild(utCont.firstChild);
                let nTable = document.createElement('table');
                let nTHead = document.createElement('thead');
                let nTBody = document.createElement('tbody');
                // let rHeaders = ['Email', 'Followed_ads', 'ID', 'Password', 'Userlevel', 'Username'];
                let rHeaders = ['id', 'email', 'userName', 'userLevel_id']; // No password, prettier order
                for (let i = 0; i < rHeaders.length; i++) {
                    let nHValue = rHeaders[i];
                    let nHElem = document.createElement('th')
                    nHElem.innerHTML = nHValue;
                    nTHead.appendChild(nHElem);
                }
                for (let i = 0; i < body.length; i++) {
                    let nRValue = body[i];
                    let nRElem = document.createElement('tr')
                    for (let x = 0; x < rHeaders.length; x++) {
                        let propName = rHeaders[x];
                        let nDValue = nRValue[propName];
                        let nDElem = document.createElement('td')
                        nDElem.innerHTML = nDValue;
                        nRElem.appendChild(nDElem);
                    }
                    // nRElem.innerHTML = nRValue;
                    nTBody.appendChild(nRElem);
                }
                nTable.appendChild(nTHead);
                nTable.appendChild(nTBody);
                utCont.appendChild(nTable);
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});
/*
document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("getAdsButton").addEventListener("click", (x, ev) => {
        fetch(location.origin + "/ads/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            })
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
                let utCont = document.getElementById('adsTableContainer');
                // Remove all chrildren
                while (utCont.firstChild) utCont.removeChild(utCont.firstChild);
                let nTable = document.createElement('table');
                let nTHead = document.createElement('thead');
                let nTBody = document.createElement('tbody');
           
                let rHeaders = ['id', 'productName', 'price', 'category', 'condition', 'location'];
                for (let i = 0; i < rHeaders.length; i++) {
                    let nHValue = rHeaders[i];
                    let nHElem = document.createElement('th')
                    nHElem.innerHTML = nHValue;
                    nTHead.appendChild(nHElem);
                }
                for (let i = 0; i < body.length; i++) {
                    let nRValue = body[i];
                    let nRElem = document.createElement('tr')
                    for (let x = 0; x < rHeaders.length; x++) {
                        let propName = rHeaders[x];
                        let nDValue = nRValue[propName];
                        let nDElem = document.createElement('td')
                        nDElem.innerHTML = nDValue;
                        nRElem.appendChild(nDElem);
                    }
                    // nRElem.innerHTML = nRValue;
                    nTBody.appendChild(nRElem);
                }
                nTable.appendChild(nTHead);
                nTable.appendChild(nTBody);
                utCont.appendChild(nTable);
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
            
    });

});
*/

document.addEventListener("DOMContentLoaded", (event) => { 
    document.getElementById("totalAdsButton").addEventListener("click", async() => {
        let table = document.getElementById("table");
        let result = await fetch("http://localhost:1010/admin/totalads", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>Sum qty</th>

        </tr>
        
        `;
       
        
        result.forEach((ads) => {
            tableHtml += `
            <tr>
                <td>${ads.total_ads}</td>
                

            `;

        
        }) 
        table.innerHTML = tableHtml;
    })

    document.getElementById("getAdsButton").addEventListener("click", async() => {
        let table = document.getElementById("table");
        let result = await fetch("http://localhost:1010/ads/getall", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>id</th>
            <th>Productname</th>
            <th>Price</th>
            <th>Category</th>
            <th>Condition</th>
            <th>Location</th>

        </tr>
        
        `;
       
        
        result.forEach((ads) => {
            tableHtml += `
            <tr>
                <td>${ads.id}</td>
                <td>${ads.productName}</td>
                <td>${ads.price}</td>
                <td>${ads.category_id}</td>
                <td>${ads.condition_id}</td>
                <td>${ads.location_id}</td>
                

            `;

        
        }) 
        table.innerHTML = tableHtml;
    })
});

