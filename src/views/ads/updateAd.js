document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("updateAdButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let usernameVal = document.getElementById("usernameInput").value;
       let passwordVal = document.getElementById("passwordInput").value;
  
        let user = {
            'userName': usernameVal,
           password: passwordVal,
    
 
        };

        // Call API 
        fetch(location.origin + "/ads/update", {
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