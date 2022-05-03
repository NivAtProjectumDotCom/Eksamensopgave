document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("updateUserButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let usernameVal = document.getElementById("usernameInput").value;
       let passwordVal = document.getElementById("passwordInput").value;
  
        let user = {
            'userName': usernameVal,
           password: passwordVal,
    
 
        };

        // Call API 
        fetch(location.origin + "/users/update", {
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
                document.getElementById("usernameInput").value = '';
               document.getElementById("passwordInput").value = '';
                window.alert('User updated!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  


// request premium
document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("requestButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let emailVal = document.getElementById("emailInput").value;
       let premiumRequestVal = document.getElementById("requestInput").value;
  
        let user = {
            email: emailVal,
           premiumRequest: premiumRequestVal,
    
 
        };

        // Call API 
        fetch(location.origin + "/users/request", {
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
                document.getElementById("emailInput").value = '';
               document.getElementById("requestInput").value = '';
                window.alert('User updated!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  