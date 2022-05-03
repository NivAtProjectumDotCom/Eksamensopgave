document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("deleteAdButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let productNameVal = document.getElementById("productNameInput");
  
        let product = {
            'productName': productNameVal,
    
        };

        // Call API 
        fetch(location.origin + "/ads/delete", {
            method: "DELETE",
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
                window.alert('ad deleted!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  