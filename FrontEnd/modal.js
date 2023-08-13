  // Mettre à jour la gallery
  function updateModalGallery() {
    const modalWrapper = document.querySelector(".modal--wrapper");
    const modalGallery = modalWrapper.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";
    window.worksData.forEach((work) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const edit = document.createElement("p");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList = "fa-regular fa-trash-can";

      image.src = work.imageUrl;

      edit.innerText = "éditer";
      figure.appendChild(image);
      figure.appendChild(deleteIcon);
      figure.appendChild(edit);
      figure.setAttribute("category", work.categoryId);
      
      modalGallery.appendChild(figure);

      // Paramétrage de la suppresion de travaux via l'icone poubelle 
      deleteIcon.addEventListener("click", async () => {
        // appel de l'API pour supprimer un projet 
        try {
          // console.log("TOKEN", localStorage.getItem("token"));
          const response = await fetch(
            `http://localhost:5678/api/works/${work.id}`,
            {
              method: "delete",
              headers: new Headers([
                ["Authorization", `Bearer ${localStorage.getItem("token")}`],
              ]),
            }
          );
          if (response.ok) {
            window.worksData = window.worksData.filter((w) => w.id !== work.id); // Filtrer et sortir le projet cliqué 
            // appel au fonction pour mettre à jour les gallery 
            updateModalGallery();
            window.updateGallery(window.worksData);
          } else {
            console.log("ERR", data);
          }
        } catch (error) {
          console.log("ERR", error);
        }
    });
  });
}

function modalGallery() {
  const modalWrapper = document.querySelector(".modal--wrapper");
  const modalGallery = modalWrapper.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";


  updateModalGallery();

  // Mettre à jour les catégories dans l'onglet déroulant 
  const selectCategorie = modalWrapper.querySelector("#categories");
  selectCategorie.innerText = "";
  // Création de l'onglet déroulant 
  const option = document.createElement("option");
  option.innerText = "...";
  option.label = "Sélectionner une catégorie";
  selectCategorie.appendChild(option);
  // importer les catégories de l'API dans le choix de l'onglet déroulant 
  window.categories.forEach((categorie) => {
    const option = document.createElement("option");
    option.value = categorie.id;
    option.innerText = categorie.name;
    selectCategorie.appendChild(option);
  });
}

window.addEventListener("load", async () => {

  // Récuperation des éléments du DOM
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const openBtn = document.querySelector(".modal-open-btn");
  const closeBtn = document.querySelector(".modal-close");
  const BtnStep = document.querySelector(".modal-btn-step");
  const modalStep1 = document.querySelector(".step-1");
  const modalStep2 = document.querySelector(".step-2");
  const modalBack = modal.querySelector(".fa-arrow-left");
  const addWorkValid = document.getElementById("form-add-work"); 
  
  // Ouverture de la modale 
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.visibility = "visible";
    overlay.style.visibility = "visible";
    modalGallery();
  });
  // Fermeture de la modale via le bouton 
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  })
  // Fermeture de la modale via le click dans l'overlay 
  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  })
  // Ouverture de la page 2 de la modale 
  BtnStep.addEventListener("click", (e) => {
    e.preventDefault();
    modalStep1.style.display = "none";
    modalStep2.style.display = "block";
    resetForm();
  })
  // Retour à la page 1 de la modale via la flèche 
  modalBack.addEventListener("click", (e) => {
    e.preventDefault();
    backToStep1();
  });

  function backToStep1() {
    modalStep1.style.display = "block";
    modalStep2.style.display = "none";
  }

  // Ajout projet
  const add_photo = document.getElementById("add_photo");
  const labelUploadImage = document.querySelector(".modal_add_photo_container label");
  const pUploadImage = document.querySelector(".modal_add_photo_container p");
  

  
  add_photo.addEventListener("change", previewFile);
  const previewImageFileLoaded = document.getElementById('previewImageFile');
  
  let selectedImageFile = null;
    
  function previewFile(e) {
    
    selectedImageFile = null;
    previewImageFile.src = 'assets/images/Group.png';
  
    if (add_photo.files && add_photo.files.length) {
      selectedImageFile = add_photo.files[0];
  
      if (selectedImageFile) {
        previewImageFileLoaded.src = URL.createObjectURL(selectedImageFile);
        labelUploadImage.style.display = "none";
        pUploadImage.style.display = "none";
      }
    } else {
      labelUploadImage.removeAttribute('style');
      pUploadImage.removeAttribute('style');
    }
  }

  const formInputTitle = addWorkValid.querySelector('#name');
  const formInputCategory = addWorkValid.querySelector('#categories');
  const formInputImage = addWorkValid.querySelector('#add_photo');
  const btnValid = addWorkValid.querySelector("#valid");

  function resetForm() {
    addWorkValid.reset();
    previewFile();
  }

  function onChange(e) {

    if (formInputTitle.value && formInputCategory.value !== '...' && formInputImage.value) {
      btnValid.removeAttribute('disabled');
    } else {
      btnValid.setAttribute('disabled', '');
    }
  }

  addWorkValid.addEventListener('keyup', onChange);
  addWorkValid.addEventListener('change', onChange);
  
  
  // Paramétrage du bouton pour valider l'ajout de travaux 
  addWorkValid.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    if (!selectedImageFile) {
      alert ("Veuillez selectionner une image.");
      return
    }
  
    const formData = new FormData(addWorkValid);
    // formData.append('image', selectedImageFile);
  
    try {
      const response = await fetch ("http://localhost:5678/api/works", {
      method : 'POST',
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body : formData,
    });
    if (response.ok) {
      worksData = await response.json();
      window.worksData.push(worksData); // Ajout du nouveau projet
      // appel au fonction pour mettre à jour les gallery
      updateModalGallery();
      window.updateGallery(window.worksData); 
      // Return to step 1
      backToStep1();
    } else {
      console.error('Une erreur est survenue lors de l\'envoi de l\'image.');
    }
    } catch (error) {
      console.error(error);
    }
  });
});