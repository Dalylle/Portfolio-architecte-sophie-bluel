

/*
 * Modification du DOM au chargement de la page en faisant appel aux works provenant de l'API lorqu'on l'appel ;
 */
window.addEventListener("load", async () => {
    // we get the gallery container from the HTML
    const gallery = document.querySelector(".gallery");
    // we fetch the works from the API
    const worksAPICall = await fetch("http://localhost:5678/api/works");
    const worksData = await worksAPICall.json();

    function updateGallery() {
        // vider gallery
        gallery.innerHTML = '';
        window.worksData.forEach((work) => {
            const figure = document.createElement("figure"); // appel d'un element figure dans la div gallery 
            const image = document.createElement("img"); // appel des images des travaux de la gallery 
            const figcaption = document.createElement("figcaption"); // appel des titres des travaux de la gallery
            image.src = work.imageUrl; 
            image.alt = work.title;
            figcaption.textContent = work.title;
            figure.appendChild(image); // appel pour affichage des images de la galerie
            figure.appendChild(figcaption); // appel pour affichage des titres de la galerie
            figure.setAttribute("category", work.categoryId);
            gallery.appendChild(figure); 
        });
    }

    window.worksData = worksData ; // globaliser worksData pour l'ensemble du code 
    // update the DOM to display the works
    updateGallery();

    window.addEventListener("update:gallery", () => {
        updateGallery();
    });
});

/* Modification du DOM au chargement de la page en faisant appel aux filtres provenant de l'API lorqu'on l'appel ; */

window.addEventListener("load", async () => {
    const categoriesElements = document.querySelector(".categories");  
    const categoriesAPICall = await fetch("http://localhost:5678/api/categories");
    const categoriesData = await categoriesAPICall.json();

    window.categories = categoriesData;

    if (categoriesData.length > 1) {
        const allWorks = document.createElement("button"); // Création du bouton (Tous)
        allWorks.innerText = "Tous";
        allWorks.id = 0 ; // Attribution de l'ID 0 au nouveau bouton crée 
        allWorks.classList.add("active"); // Attribution de la classe active lors du chargement de la page du bouton (Tous)
        categoriesElements.appendChild(allWorks); // Appel pour l'afichage du filtre (Tous)
        categoriesData.forEach((categorie) => {
            const button = document.createElement("button"); // creation des boutons de l'API 
            button.innerText = categorie.name; // Récupération du nom du filtre
            button.id = categorie.id; // Récupération de l'id du filtre
            categoriesElements.appendChild(button); // Appel pour l'affichage des filtres de l'API
        });
        
        const figures = document.querySelectorAll(".gallery figure")
        const buttons = document .querySelectorAll(".categories button");
        buttons.forEach((button) => {

            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove('active')); // Retrait de la classe active au click
                button.classList.add('active') // Attribution de la classe active au bouton cliqué 
                console.log(button.id)
                figures.forEach((figure) => {
                    figure.style.display = "none"; // 
                    const figureCategory = figure.getAttribute("category");
                    switch (button.id) {
                        case figureCategory:
                            figure.style.display = "block" ; // Affichage des works du bouton selectionné
                            break;
                        case "0":
                            figure.style.display = "block" ; // Affichage de tous les works au bouton (tous) selectionné
                            break;
                        default:
                            break;
                    }
                    console.log(figureCategory)
                })

            })
        })
        
    }
});



