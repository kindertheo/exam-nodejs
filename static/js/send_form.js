const submit = document.querySelector("#submit")

console.log(submit)



const data = JSON.stringify({'name': 'hey'})
let options = {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body : data
}


fetch("/add/country", options).then((response) => {return response} ).then((res) => {
    console.log('ok')
})



submit.addEventListener("click", () => {
})