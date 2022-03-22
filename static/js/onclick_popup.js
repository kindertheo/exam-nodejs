export function popup(){

    const popup = document.querySelector(".popup")
    const all_tr = document.querySelectorAll('tbody > tr')

    const btn_modify = document.querySelector(".btn-warning")
    const btn_delete = document.querySelector(".btn-danger")

    // variable pour stocké l'id du document et l'element du DOM
    let data_id = 0
    let element_to_delete = ''

    //pour chaque row du tableau, on ajoute un eventlistener au click
    all_tr.forEach(element => {
       element.addEventListener('click', (tr) => {
        if(element.tagName === 'TR'){
            element_to_delete = element
            data_id = element.getAttribute('data-id')
        }else if (element.tagName === 'TD'){
            element_to_delete = element.parentElement
            console.log(element.parentElement.getAttribute('data-id'))
            data_id = element.getAttribute('data-id')
        }else {
            data_id = 0
        }

        //A chaque clic, la div#popup va se déplacer au niveau de la souris, contenant 2 boutons, le bouton delete & update
        //Ce code peut être remplacé par une classe CSS 
        popup.style.display = 'flex'
        popup.style.left = `${tr.layerX}px`
        popup.style.top = `${tr.layerY}px`
        popup.style.position = 'absolute'
        popup.style.backgroundColor = 'grey';
        popup.style.opacity = '90%'
        popup.style.borderRadius = '10px'
        }) 
    });

    
    btn_modify.addEventListener('click', () => {
        console.log('modify')
        window.location.href = `/update?id=${data_id}`
    })

    //A chaque clic sur le bouton delete, fait une requête delete vers la route /delete/id_du_document
    //Et supprime la row du tableau
    btn_delete.addEventListener('click', () => {
        fetch(`/delete/${data_id}`, 
           { method: 'DELETE',
             headers: new Headers(),
             data : {
                 id: data_id
             }
        } ).then(res => res )
        .then(response => {
            console.log("response=",response)
            element_to_delete.remove()
        })
        .catch(console.error)
        
    })
}

