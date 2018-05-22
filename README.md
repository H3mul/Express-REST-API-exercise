# Express REST-API exercise

Basic CRUD API for a single mongodb schema. Validates input data type and restriction compatability, and has full data/error feedback. Tested using Postman.

### Game Schema
| Field  | Type | Restrictions  |
| ------------- |:-------------|:-----|
|name           | String  | Must be alphanumeric, nonempty |
|cross_platform | Boolean | True if is string "true" (case insensitive), False otherwise.|
|rating         | Number  | Must be a number between 0 and 10 (inclusively) |
|release_date   | Date    | Must be valid js date string (no error parsing with Date.parse) |


### API
`game_id` is the mongodb document id, can be listed using Read All.

| Action  | URL | HTTP method  | HTTP Body|
| ------------- |:-------------|:-----|:---|
| Create | /api/games | POST | Schema data |
| Read All | /api/games | GET | |
| Read | /api/games/:game_id | GET | |
| Update | /api/games/:game_id | PUT | Schema data |
| Delete | /api/games/:game_id | DELETE | |
