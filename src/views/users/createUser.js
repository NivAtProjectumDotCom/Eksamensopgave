document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("createUserButton").addEventListener("click", (e) => {
        e.preventDefault();

        // Collect values for API
        let usernameVal = document.getElementById("usernameInput");
        let passwordVal = document.getElementById("passwordInput");
        let emailVal = document.getElementById("EmailInput");

        let form = document.getElementById("form");

        if(form.checkValidity() == false) {
            form.reportValidity();
            return;
        }
  
        let user = {
            username: usernameVal.value,
            password: passwordVal.value,
            email: emailVal.value,
        };

        // Call API 
        fetch(location.origin + "/users/create", {
            method: "POST",
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
                document.getElementById("EmailInput").value = '';
                window.alert('User created!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  
