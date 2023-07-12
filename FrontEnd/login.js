
window.addEventListener("load", async () => {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        // this prevents the page from being reloaded
        e.preventDefault();
        const enteredEmail = document.getElementById("emailInput").value;
        const enteredPassword = document.getElementById("passwordInput").value;
         try {
            const loginAPICall = await fetch("http://localhost:5678/api/users/login", {
                method : "POST", 
                body : JSON.stringify ({
                 email : enteredEmail,
                 password : enteredPassword
                }),
                headers:{
                    "Content-Type" : "application/json",
                },
            });
            if (loginAPICall.status == 200) {
                const loginResponse = await loginAPICall.json();
                localStorage.setItem('token', loginResponse.token);
                window.location.href = "index.html"; 
               
            } else {
                 const errorMessage = document.querySelector(".error");
                 errorMessage.innerText = "erreur les informations utilisateur / mot de passe ne sont pas correctes."
                 errorMessage.style.visibility = "visible";
                
            }
        } catch (error) {
            const errorMessage = document.querySelector(".error");
            errorMessage.innerText = "Erreur serveur"
            errorMessage.style.visibility = "visible";
        }
    });
});