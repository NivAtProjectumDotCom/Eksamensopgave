document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("premiumButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let userIdVal = document.getElementById("userIdInput").value;
       let premiumdVal = document.getElementById("premiumInput").value;
  
        let user = {
            userId: userIdVal,
           premiumUser: premiumdVal,
    
 
        };

        // Call API 
        fetch(location.origin + "/admin/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'   
            },
            body: JSON.stringify(user),
        }) 
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
                document.getElementById("userIdInput").value = '';
               document.getElementById("premiumInput").value = '';
                window.alert('User updated to premium!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  