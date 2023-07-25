function handleModals() {
    const modalsWrapper = document.querySelectorAll(".modal--wrapper");

    modalsWrapper.forEach(modalWrapper => {
        const id = modalWrapper.getAttribute('data-modal-id');
        const modal = modalWrapper.querySelector('.modal');
        const openBtn = document.querySelectorAll(`.modal-open-btn[data-modal-id="${id}"]`);
        const closeBtn = modalWrapper.querySelector('.modal-close');
        const overlay = modalWrapper.querySelector(".overlay");

        // open modal
        openBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.visibility = "visible";
                overlay.style.visibility = "visible";
                // je demande a ouvrir la modal gallery
                const event = new CustomEvent('modal:'+id+':open'); // modal:gallery:open
                window.dispatchEvent(event);
            });
        });

        // Close modal
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.visibility = "hidden";
            overlay.style.visibility = "hidden";
            const event = new CustomEvent('modal:'+id+':close');
            window.dispatchEvent(event);
        });

        // overlay modal
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("clik close overlay");
            modal.style.visibility = "hidden";
            overlay.style.visibility = "hidden";
            const event = new CustomEvent('modal:'+id+':close');
            window.dispatchEvent(event);
        });

        // Steps
        const btnsStep = modalWrapper.querySelectorAll('.modal-btn-step');
        btnsStep.forEach(btnStep => {
            btnStep.addEventListener('click', () => {
                const stepId = btnStep.getAttribute('data-step');
                modalWrapper.querySelectorAll('.step').forEach(step => {
                    step.style.display = 'none';
                });
                modalWrapper.querySelector(`.step[data-step="${stepId}"`).style.display = 'block';
                const event = new CustomEvent('modal:'+id+':step:'+stepId);
                window.dispatchEvent(event);
            });
        });
    });
}

/**
 * Permet de gérer les modals
 */
window.addEventListener("load", () => {
    handleModals();
});

/**
 * Gestionnaire de la modal gallery
 */
window.addEventListener("load", async () => {
    // j'attend que la modal s'ouvre
    window.addEventListener('modal:gallery:open', () => {
        const modalWrapper = document.querySelector(".modal--wrapper[data-modal-id='gallery']");
        const modalGallery = modalWrapper.querySelector('.modal-gallery');
        modalGallery.innerHTML = "";

        // Fill gallery
        function updateGallery() {
            modalGallery.innerHTML = '';
            window.worksData.forEach((work) => {
                const figure = document.createElement("figure"); 
                const image = document.createElement("img"); 
                const edit = document.createElement("p");
                const deleteIcon = document.createElement("i");
                
                image.src = work.imageUrl; 
    
                // TODO create the `i` tag with Javascript as well
                deleteIcon.classList = "fa-regular fa-trash-can"
                edit.innerText = "éditer";
                figure.appendChild(image); 
                figure.appendChild(deleteIcon);
                figure.appendChild(edit);
                figure.setAttribute("category", work.categoryId);
                // Ajouter les boutons
                // et ajouter les event click
                modalGallery.appendChild(figure);
    
                // TODO add an event listener on the delete button that just console logs the id of the work to delete
                deleteIcon.addEventListener("click", async () => {
                    console.log(work);
                    // TODO call the API to delete the work
                    try {
                        const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
                            method: 'delete',
                            headers: new Headers([
                                ['Authorization', `Bearer ${localStorage.getItem('token')}`]
                            ])
                        });
                        if (response.ok) {
                            console.log('OK', response);
                            // TODO refresh the gallery when the work is deleted (in the modal and on the homepage)
                            window.worksData = window.worksData.filter(w => w.id !== work.id);
                            const event = new CustomEvent('update:gallery');
                            window.dispatchEvent(event);
                        } else {
                            console.log('ERR', data);
                        }
                    } catch (error) {
                        console.log('ERR', error);
                    }
                });
            });
        }
        
        updateGallery();

        window.addEventListener("update:gallery", () => {
            updateGallery();
        });

        // TODO `Homepage_edit_3` fill the categories input with the categories from the API
        const selectCategorie = modalWrapper.querySelector("#categories");
        console.log(window.categories, selectCategorie);
        // selectCategorie ajouter les options
        window.categories.forEach((categorie) => {
            // <option value="<id>">[name]</option> . append dans selectCategorie
            const option = document.createElement("option");
            option.value = categorie.id;
            option.innerText = categorie.name; 
            selectCategorie.appendChild(option);
        });
    })
});