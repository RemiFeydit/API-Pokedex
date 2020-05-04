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

Ce projet consiste à avoir accès à une base de donnée listant des pokémons.  
On y retrouve pour chaque pokémon leur noms, numéro de pokédex, premier type et deuxième type.  
  
Le front permet facilement d'ajouter, modifier ou supprimer des pokémons grâce à l'api.  

Il est possible de se créer un compte permettant ainsi de se créer des équipes.
Chaque équipe peut avoir un nom et au maximum 6 pokémons.
En dessous de chaque équipe se trouve un message indiquant si votre équipe manque de type super efficace contre d'autres types. 
Par exemple si aucuns pokémons ne possèdent de types super efficaces contre le feu, le message sous l'équipe en question l'indiquera.

### Les routes

L'api est fait avec expressjs. 
Voici les différentes routes proposés:  
  
Pour les pokémons :  

Get:
* Récupérer tous les pokémons: `/api/pokemons`  
* Récupérer les pokémons via leurs numéros de pokédex: `/api/pokemon/num/:pkmnNum`  
* Récupérer les pokémons via leurs nom: `/api/pokemon/name/:pkmnName`  
* Récupérer les pokémons via leurs id: `/api/pokemon/id/:id`  
* Récupérer les pokémons via leurs types: `/api/pokemons/types/:type`  

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