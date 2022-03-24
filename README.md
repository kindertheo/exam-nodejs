# Exam Node JS - MNS

Un CRUD sur un tableau avec comme données une liste des pays avec leur 'Happiness Score' et d'autres indicateurs

--------
## La stack : 
- MongoDB
- NodeJS
- Express

--------

### Utilisation 

```bash
git clone https://github.com/kindertheo/exam-nodejs
cd exam-nodejs
npm i
nodemon index.js
```

Pour restorer la base :
```bash
mongorestore mongodump/exam/country.bson
```

![alt text](https://github.com/kindertheo/exam-nodejs/blob/master/img/homepage.PNG?raw=true)

Pour modifier/supprimer, cliquez sur la ligne que vous souhaitez changer

![alt text](https://github.com/kindertheo/exam-nodejs/blob/master/img/onclick.PNG?raw=true)
