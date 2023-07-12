window.addEventListener("load", async () => {
    // Verifier si le token existe //
    const token = localStorage.getItem('token');
    const loginLogoutBtn = document.getElementById("login_logout");

    if (token){

        loginLogoutBtn.innerText ="logout"; // changement de texte si l'utilisateur est connecté 
        loginLogoutBtn.addEventListener("click", (e)=> {
            e.preventDefault() 
            localStorage.removeItem("token"); // changement de l'action du bouton logout 
            window.location.href= "index.html"; // supprimer localStorage token et redirection vers index.html 
        })
        const categoriesElements = document.querySelector(".categories");
        categoriesElements.style.visibility = "hidden" ; // Masquer les filtres catégories

        const modalHeader = document.querySelector(".modal_header");
        modalHeader.style.visibility = "visible"; // Affichage du header de la modale
        console.log(modalHeader);
    }
})