const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

if (id === null || id.length == 0 || id == 'null'){
    false; //TODO à gérer
}


fetch(`/id/${id}`).then(res => { return res.json() })
.then(response => {
    console.log(response)
    console.log("hey")
    let form_dom = document.querySelector("form")
      
    let new_form = document.createElement("form")
//    new_form.action = "#"
    new_form.classList.add("form-group")
//    new_form.method = "#"
    Object.keys(response).forEach(element => {
        //N'affiche pas la colnne _id
/*         if(element === '_id'){
            return;
        } */
        let key = document.createElement("label")
        key.innerHTML = element
        let input = document.createElement("input")
        input.classList.add("form-control")
        input.type = "text"
        input.name = element
        input.value = response[element]

        if (element === '_id'){
            key.style.display = 'none'
            input.style.display = 'none'
        }
        new_form.appendChild(key)
        new_form.appendChild(input)
    });

    save_btn = document.createElement("button")
    save_btn.id = "update"
    save_btn.classList.add("btn")
    save_btn.classList.add("btn-success")
    save_btn.innerHTML = "Modifier"
    new_form.appendChild(save_btn)

    form_dom.replaceWith(new_form)

    console.log(...new FormData(new_form))

    save_btn.addEventListener('click', function(event) {
        event.preventDefault();

        let fd = new FormData(new_form);
        let data = {};
        for (let [key, prop] of fd) {
          data[key] = prop;
        }
        delete data._id
        data = JSON.stringify(data);
        console.log(data);

        var options = { 
            method: 'PUT',
            body : data,
            headers: {'Content-Type': 'application/json'},
            contentType: false,
            processData: false,
            redirect: "follow"
        }
        fetch(`/update/${id}`, options)
        .then(res => {
          console.log(res)
          if(res.status == 200){
            window.location.href = `/show?id=${id}`
          }
        })
        
        .catch(
          console.log(`Erreur lors de la modification de ${id}`)
        )
    })
})
