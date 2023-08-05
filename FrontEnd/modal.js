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
        // console.log(work);
        // call the API to delete the work
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
            window.worksData = window.worksData.filter((w) => w.id !== work.id);
            // appel au fonction pour mettre à jour les gallery
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
  console.log(window.categories, selectCategorie);
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

  // Ajout de travaux (proposition Bing )
async function addWork(e) {
  e.preventDefault();
  const formData = new FormData(addWorkValid); 

  const response = await fetch(
    `http://localhost:5678/api/works`,
    {
      method: "POST",
      headers: new Headers([
        ["Authorization", `Bearer ${localStorage.getItem("token")}`],
      ]),
      body: formData
    }
  );

  if (response.ok) {
    console.log('added')
  }
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
  const addWorkValid = document.getElementById("valid"); 
  const addWorkValid1 = document.getElementById("valid"); 
  
  // define event listeners
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
  })
  // Retour à la page 1 de la modale via la flèche 
  modalBack.addEventListener("click", (e) => {
    e.preventDefault();
    modalStep1.style.display = "block";
    modalStep2.style.display = "none";
  })
  addWorkValid.addEventListener("submit", addWork);
  addWorkValid1.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
  
    if (!file) {
      alert ("Veuillez selectionner une image.");
      return
    }
  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
    const formData = new FormData ();
    formData.append('imageFile', file);
  
    try {
      const response = await fetch ("http://localhost:5678/api/works",{
      method : 'POST',
      headers : {
        'Authorization': `Bearer${token}`,
      },
      body : formData,
    });
    if (response.ok) {
      alert('Image envoyée avec succès.');
    } else {
      alert('Une erreur est survenue lors de l\'envoi de l\'image.');
    }
    } catch (error) {
    alert('Une erreur est survenue lors de l\'envoi de l\'image.');
    console.error(error);
    }
  });
  
});




