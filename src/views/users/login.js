
document.addEventListener("DOMContentLoaded", (e) => {
    document.getElementById("logIn").addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        
        const user = {
            email: email,
            password: password
        };

        fetch("http://localhost:1010/users/login", { //Fetch sender host til serveren. 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                localStorage.setItem("user", JSON.stringify(user)); // Put brugeren i localStorage på browseren, så det bliver gemt at brugeren er logget ind.
             location.href = "/" //Når oplysningerne er korrekte, bliver brugeren sendt videre til home page, hvor den er logget ind. 
            } else {
                window.alert("De indtastede oplysninger er forkerte."); //Hvis oplysningerne ikke stemmer, vil en meddelelse komme frem.
            }
        })
        .catch(() => {
            window.alert("Der skete en fejl");   
        });

        
    });
})  