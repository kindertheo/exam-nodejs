

//Récupère les données du CSV

//Récupère le parametre dans l'url date pour questionné l'API et lui demander le bon CSV
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let date = urlParams.get('date')

if (date === null || date.length == 0){
    date = '2015'
}

fetch(`/country/year/${date}`)
    .then(res => { return res.json() })
    .then(response => {
        const datas = response
        //Ajoute les clés des objets comme données dans le titre du tableau
        let tr_keys = []
        //Tri les données
        Object.keys(datas[0]).forEach(element => {
            //N'affiche pas la colnne _id
            if(element === '_id'){
                return;
            }

            let key = document.createElement("td")
            key.innerHTML = element
            tr_keys.push(key)
        });
        //Ajoute les <td> dans le <thead>
        tr_keys.forEach(element => {
            table_title.appendChild(element)
        });

        //Ajoute les lignes au tableau avec leur contenu
        let tr_rows = []
        for(let i = 0; i < datas.length; i++){
            
            //Créer la row de chaque pays et l'ajoute a un tableau
            let tr = document.createElement("tr")
            tr_rows.push(tr)
            //Pour chaque valeur du tableau, créer un element td et lui assigne une valeur
            Object.values(datas[i]).forEach( (elt, index) => {

                //Ajoute l'attribut data-id avec comme valeur l'id à chaque row
                if(index === 0){
                    tr.setAttribute('data-id', elt)
                    return;        
                }
                let td = document.createElement("td")
                td.innerHTML = elt
                tr.appendChild(td)
            })
        }
        //Pour chaque row créer précèdement, l'ajouter au tbody
        tr_rows.forEach(element => {
            table_body.appendChild(element)
        })

        popup();
})

//Récupère le tableau vide
const container = document.querySelector(".container")
const table_title = document.querySelector("table > thead > tr")
const table_body = document.querySelector("table > tbody ")



import { popup } from "./onclick_popup.js";
// createCard("", container);