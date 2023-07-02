/*
 * Modification du DOM au chargement de la page en faisant appel aux works provenant de l'API lorqu'on l'appel ;
 */
window.addEventListener("load", async () => {

    // we get the gallery container from the HTML
    const gallery = document.querySelector(".gallery");
    // we fetch the works from the API
    const worksAPICall = await fetch("http://localhost:5678/api/works");
    const worksData = await worksAPICall.json();
    // update the DOM to display the works
    worksData.forEach((work) => {
        const figure = document.createElement("figure"); // appel d'un element figure dans la div gallery 
        const image = document.createElement("img"); // appel des images des travaux de la gallery 
        const figcaption = document.createElement("figcaption"); // appel des titres des travaux de la gallery
        image.src = work.imageUrl; 
        image.alt = work.title;
        figcaption.textContent = work.title;
        figure.appendChild(image); // appel pour affichage des images de la galerie
        figure.appendChild(figcaption); // appel pour affichage des titres de la galerie
        gallery.appendChild(figure); 
    });
});



