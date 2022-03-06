const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')

if (id === null || id.length == 0 || id == 'null'){
    return false; //TODO à gérer
}

fetch(`/id/${id}`).then(res => { return res.json() })
.then(response => {console.log(response)})

