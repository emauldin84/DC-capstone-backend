# Flamingo 
## By Jonathan Ray & Eric Mauldin

## Full-Stack Capstone Project

### Table of contents
* Description
* Features
* Screenshots
* Technologies
* Challenges
* MVP
* Reach Goals
* Authors

#### Description
Flamingo is a mobile-first, digital interpretation of a familiar way of showing trips across the globe. Trading thumbtacs for digital pins, Flamingo users can quickly add, delete and edit past and future trips, creating and saving travel experiences.

#### Features
* Smooth, hasslefree signup/signin process with visual cues to guide users through the registration process.
* 15 randomly selected travel photos on the splash page to inspire a unique experience on each visit to goflamingo.today.
* Helpful tool-tips appear when needed to cue and guide users.
* Trip pins display different colors depending on whether their date is in the past or future.


#### Screenshots and Demo

## Sign in
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.24.41%20PM.png?raw=true)

## Sign up
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.24.55%20PM.png?raw=true)

## Dashboard
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.25.27%20PM.png?raw=true)

## Add Trip
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.25.51%20PM.png?raw=true)

## Trip Details
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.26.13%20PM.png?raw=true)

## User Profile
![alt-text](https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/Screen%20Shot%202019-05-31%20at%202.26.59%20PM.png?raw=true)

## Sign in simulation
<img src="https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/flaming_signin.gif?raw=true" title="Sign In demo" width="100%"/></img>

## Profile simulation
<img src="https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/flamingo_profile.gif?raw=true" title="Sign In demo" width="100%"/></img>

## Add Trip simulation
<img src="https://github.com/emauldin84/DC-capstone-backend/blob/master/screenshots/flamingo_addtrip.gif?raw=true" title="Add Trip demo" width="100%"/></img>


#### Technologies
- React
- Node.js
- Express
- PostgreSQL
- JavaScript
- HTML
- CSS / Materialize
- Axios
- bcrypt
- Mapbox
- Autosuggest
- geocoding APIs
- AWS
- Nginx


#### Challenges
- Challenge #1: 
  Directly manipulate the dom within React lifecycle methods.
  
- Solution: 
  In order to implement the datepicker and photo carousel provided by Materialize, an approach outside of React was needed.  Understanding of React lifecycle methods led us to employ a myriad of techniques to ensure that the site ran smoothly while two incongruent approaches dynamically displayed the datepicker and image carousel viewer.
  
  
- Challenge #2:
  Dynamically store trip data input by the user in the backend and serve automatically.
  
- Solution:
  Update React state input on change and store the new values in the backend on window close. New values will then be served on component remount
  
  
- Challenge #3:
  Providing responsive `undo` actions to the user
  
- Solution:
  Utilized onclick events to editable fields that, in turn, fire a css class change to display an undo tooltip feature to safe guard against unwanted changes.
   
    
#### MVP
A user can add, edit and delete trips that will display on a responsive map/push pin interface.

#### Reach Goals
- Add two finger swipe to photo carousel
- Set map zoom to relative dimensions of the map from page height/width
- Change date column in PSQL to two columns to include trip start and end dates
- Add flight information for trips and connect map pins based on connections

#### Authors
- [Jonathan Ray](https://github.com/ray-jonathan)
- [Eric Mauldin](https://github.com/emauldin84)
  
