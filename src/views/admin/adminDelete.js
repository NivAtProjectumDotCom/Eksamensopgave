document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("adminDeleteUButton").addEventListener("click", (event) => {
        event.preventDefault()
        // Collect values for API
        let userIdVal = document.getElementById("userIdInput").value;
  
        let user = {
            userId: userIdVal,
 
        };

        // Call API 
        fetch(location.origin + "/admin/delete", {
            method: "DELETE",
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
                window.alert('User deleted!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});  