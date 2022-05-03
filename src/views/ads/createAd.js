document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("createAdButton").addEventListener("click", (x, ev) => {
        // Collect values for API
        let productNameVal = document.getElementById("productNameInput").value;
        let priceVal = document.getElementById("priceInput").value;
        let categoryVal = document.getElementById("categoryInput").value;
        let conditionVal = document.getElementById("conditionInput").value;
        let locationVal = document.getElementById("locationInput").value;
    

        let product = {
            id: null,
            productName: productNameVal,
            price: priceVal,
            category: categoryVal,
            condition: conditionVal,
            location: locationVal, 

        };  

        // Call API 
        fetch(location.origin + "/ads/create", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Accept': 'application/json'   
            },
            body: JSON.stringify(product),
        }) 
            .then((resp) => {  
                return resp.json(); 
              
            })
            .then((body) => {
                console.log(body);
                document.getElementById("productNameInput").value = '';
                document.getElementById("priceInput").value = '';
                document.getElementById("categoryInput").value = '';
                document.getElementById("conditionInput").value = '';
                document.getElementById("locationInput").value = '';

                window.alert('Ad created!');
            })
            .catch(() => {
                window.alert("Mistake");
            });
    });
});  