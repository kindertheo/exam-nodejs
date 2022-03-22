const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')

if (id === null || id.length == 0 || id == 'null'){
    false; //TODO à gérer
}

fetch(`/id/${id}`).then(res => { return res.json() })
.then(response => {
    console.log(response)
    console.log("hey")
    form_dom = document.querySelector("form")
      
    new_form = document.createElement("form")
    new_form.action = "#"
    new_form.classList.add("form-group")
    new_form.method = "#"
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

    form_dom.replaceWith(new_form)
    console.log("hey")

    
})

