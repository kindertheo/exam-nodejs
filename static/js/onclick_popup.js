export function popup(){

    const popup = document.querySelector(".popup")
    const all_tr = document.querySelectorAll('tbody > tr')
    const btn_modify = document.querySelector(".btn-warning")
    const btn_delete = document.querySelector(".btn-danger")
    all_tr.forEach(element => {
       element.addEventListener('click', (tr) => {
        console.log(tr)
        if(element.tagName === 'TR'){
            console.log(element.getAttribute('data-id'))
            let data_id = element.getAttribute('data-id')
        }else if (element.tagName === 'TD'){
            console.log(element.parentElement.getAttribute('data-id'))
            let data_id = element.getAttribute('data-id')
        }else {
            let data_id = 0
        }

        //element.after(popup)
        popup.style.display = 'flex'
        popup.style.left = `${tr.layerX}px`
        popup.style.top = `${tr.layerY}px`
        popup.style.position = 'absolute'
        popup.style.backgroundColor = 'grey';
        popup.style.opacity = '90%'
        popup.style.borderRadius = '10px'

/*         btn_modify.href = `/update/${data_id}`
        btn_delete.href = `/delete/${data_id}` 
 */    


        btn_modify.addEventListener('click', () => {
            console.log('modify')
        })
    
        btn_delete.addEventListener('click', () => {
            fetch(`/delete/${data_id}`, 
               { method: 'DELETE',
                 headers: new Headers(),
                 data : {
                     id: data_id
                 }
            } ).then(res => { return res.json() })
            .then(response => {console.log(response)})
            
        })

        }) 
    });
}

