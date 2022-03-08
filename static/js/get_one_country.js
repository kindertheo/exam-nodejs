const pathArray = window.location.pathname.split('/');
const id = pathArray[2]


fetch(`/id/${id}`).then(res => res.json()).then( response => 
    console.log(response)
)
