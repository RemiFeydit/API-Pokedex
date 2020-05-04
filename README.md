# Projet ORM-API : Pokédex

### Groupe 
Rémi Feydit, Mathieu Caselles  

## Installation

Clone ce projet.  
Dans le dossier ui, faire un `npm install`.
Dans le dossier api, faire un `npm install`.

Dans le dossier api, faire ensuite `node .\main.js`.
Dans le dossier ui, faire ensuite `npm run serve`.

Le front est accessible via le localhost sur le port 8080: http://localhost:8080/  
L'api est accessible via le localhost sur le port 3000. http://localhost:3000/
  
## Details du projet:
### Fonctionalités

Ce projet consiste à avoir accès à une base de données listant des pokémon.  
On y retrouve pour chaque pokémon leur nom, numéro de pokédex, premier type et deuxième type.  
  
Le front permet facilement d'ajouter, modifier ou supprimer des pokémon grâce à l'api.  

Il est possible de se créer un compte permettant ainsi de se créer des équipes.
Chaque équipe peu avoir un nom et au maximun 6 pokémon.
En dessous de chaque équipe se trouve un message indiquant si votre équipe manque de type super efficace contre d'autres type. 
Par exemple si aucun pokémon ne possède de type super efficace contre le feu, le message sous l'équipe en question l'inqiquera.

### Les routes

L'api est fait avec expressjs. 
Voici les différentes routes proposés:  
  
Pour les pokémons :  

Get:
* Récupérer tous les pokémons: `/api/pokemons`  
* Récupérer les pokémon via leur numéro de pokédex: `/api/pokemon/num/:pkmnNum`  
* Récupérer les pokémon via leur nom: `/api/pokemon/name/:pkmnName`  
* Récupérer les pokémon via leur id: `/api/pokemon/id/:id`  
* Récupérer les pokémon via leur type: `/api/pokemons/types/:type`  

Delete:
* Supprimer un pokémon: `/delete/pokemon/:id`  

Post:
* Ajouter un pokémon (nécessite les données du pokémon en req.body): `/add/pokemon`  

Put:
* Modifier un pokémon (nécessite les données du pokémon en req.body): `/edit/pokemon`  


Pour les types :

Get:
* Récupérer tous les types: `/api/types` 

Pour les équipes:

Get: 
* Récupéré les équipes (nécessite le token de l'utilisateur en req.query): `/teams`  

Post: 
* Ajouter une équipe (nécessite les données de l'équipe en req.body): `/add/equipe`  

Put:
* Modifier une équipe (nécessite les données de l'équipe en req.body): `/edit/team`  

Delete:

* Supprimer une équipe: `/delete/team/:id`