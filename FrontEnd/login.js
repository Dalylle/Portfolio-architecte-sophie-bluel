
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
            if (loginAPICall.status == 404) {
                // TODO display client error message
            } else {
                const loginResponse = await loginAPICall.json();
                // TODO rest of the login feature ...
            }
        } catch (error) {
            // TODO display server error message in the DOM here
        }
    });
});

//  const loginRequest = async () => {
//     try {
    const response = await fetch(url, );

//      const dataResponse = await response.json ();
  
//  .then ((response) => response.json())
//  .then((data) => {
// console.log(data)
//  })

  