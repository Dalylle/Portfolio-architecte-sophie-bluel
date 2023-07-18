// TODO wait for the page to load before doing anything --
// TODO show this only if admin is connected --
// TODO mask filters if admin is connected --
// TODO display an empty modal div on click on modify button WITHOUT the pictures BUT WITH the buttons AND the overlay --
// TODO close button of the modal must close the modal and remove the overlay --
// TODO change the contents of the modal to display the empty form (Figma `Homepage_edit_2`) when user clicks on add picture button
// TODO display pictures from the API like in `Homepage_edit_1`
// TODO display an inactive delete button on each of the pictures
// TODO add an event listener on the delete button that just console logs the id of the picture
// TODO `Homepage_edit_3` fill the categories input with the categories from the API


 window.addEventListener("load", async () => {
     const modalImg = document.querySelector(".modal_Img");
     const modalBtn = document.getElementById("modalSetting");
     const modal = document.querySelector(".modal");
     const overlay = document.querySelector(".overlay");

     console.log(modalBtn)
     
     // Paramétrage de l'affichage de la modal au clique sur le bouton modifier //
     modalBtn.addEventListener("click", (e) => {
        e.preventDefault()
        modal.style.visibility = "visible"; 
        overlay.style.visibility = "visible";

    
    // Paramétrage de la fermeture de la modal au click sur le bouton et au click sur l'overlay // 
    const modalClose = document.getElementById("modalClose");
        console.log(modalClose)
    
    modalClose.addEventListener("click", (e) => {
        e.preventDefault()
        modal.style.visibility = "hidden"; 
        overlay.style.visibility = "hidden";

    overlay.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("clik close overlay")
        modal.style.visibility = "hidden"; 
        overlay.style.visibility = "hidden";
     })
     })
    })
})