/**
 * we want to modify the DOM when we have fetched the works from the API;
 * this is why we need to wait for the DOM to be completely loaded
 */
window.addEventListener("load", async () => {

    // we get the gallery container from the HTML
    const gallery = document.querySelector(".gallery");
    // we fetch the works from the API
    const worksAPICall = await fetch("http://localhost:5678/api/works");
    const worksData = await worksAPICall.json();
    // update the DOM to display the works
    worksData.forEach((work) => {
        /* append a `figure` element to the `gallery` container
        <!-- <figure>
            <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
            <figcaption>Abajour Tahina</figcaption>
        </figure> --> */
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        image.src = work.imageUrl;
        image.alt = work.title;
        figcaption.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
    
});



