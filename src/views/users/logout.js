document.addEventListener("DOMContentLoaded", (event) => { 
    const user = localStorage.getItem("user"); //Vi finder brugeren fra localstorage
    
    if (!user) { //Hvis brugeren ikke findes
        location.href = "/login.html" // skal den føres videre til logind siden. 
    } 

    document.getElementById("logout").addEventListener("click", (e) => { //Når knappen logud bliver klikket
        localStorage.removeItem("user"); //Bliver brugeren i localstorage fjernet i browseren. 
        location.href = "/login.html" // Og brugeren bliver ført ud igen til logind siden. 
    
    })}
)