# Flamingo: Jonathan, Eric

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


* Ability to register unique login for company employees
* Add unique items or select prefilled options from categories like furniture.
* Choose a specific item to simulate purchases over a selected time period
* User can also generate a random simulation of all items in their inventory
* Select number of customers per day
* Increase a specific item's likelihood of purchase
* Running simulation will show revenue earned, cost of outgoing stock, and profits for that time period
* After the simulation has run, user can select specific day to visualize inventory amounts and purchase quantities for each item
* Color coded simulated stock positions help visualize inventory outflows per day

#### Screenshots

## Sign in page
![alt-text](https://raw.githubusercontent.com/DC-captstone-backend/screenshots/Screen Shot 2019-05-31 at 2.24.41 PM.png)

## Login page
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/login-page.png)

## Dashboard
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/preset-table.png)

## Add Item
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/single-item-popup.png)

## Single item simulation
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/one-item-sim.png)

## Cash flows
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/cash-flow-visual.png)

## Increase likelihood of purchase
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/increase-likelihood.png)

## Random simulation result final day
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/random-item-sim.png)

## Random simulation result day 3
![alt-text](https://raw.githubusercontent.com/A-DiRusso/oms-project-app/master/images/day-3-random-sim.png)

## Day to day slider simulation visualization
<img src="https://giant.gfycat.com/IllinformedPoshHarpyeagle.gif" title="Slider Demo" width="1000"/></img>


#### Technologies
- Node.js
- Express
- PostgreSQL
- JavaScript
- HTML
- CSS / Bootstrap
- Mocha (TDD)
- AWS
- Nginx
- Passport
- OAuth

#### Challenges
- Challenge #1: Constructing a database architecture using PostgreSQL that we could then build functionality around.
  - Solution: Organized data into 5 tables (users, customers, items, locations, purchases) that represents the real world information.
  
- Challenge #2: Allowing the user to securely add a single item and visualize it on the dashboard
  - Solution: Using forms, looked for post requests that allowed the user to dynamically manipulate tables in the database. This involved creation of the proper routes, controllers, and models in traditional MVC fashion.
  
- Challenge #3: Allowing the user to visualize inventory outflows of the items they want to test, using a selected number of days and customers.
  - Solution: Scaled existing functions to work for user entered data and added new functionality that allows the tables to scale appropriately

- Challenge #4: Showing the user how their inventory would change incrementally over time without refreshing the entire page for each increment
  - Solution: Used client-side JavaScript once the database was changed to visualize the day-to-day changes, without having to query the database again.

- Challenge #5: Understand and implement GitHub OAuth for user login. 
  - Solution: Have OAuth work beside standard login procedures without interferance or overlap.
  

#### MVP
A user can add items and visualize inventory outflows for one item in their inventory over a fixed number of days.

#### Reach Goals
- Random simulation using all entered inventory √
- Make an item more likely to be purchased than others √
- Build a visualization of change over time √
- Build inventory replenishment functionality 

#### Authors
- [Anthony DiRusso](https://github.com/A-DiRusso)
- [Eric Wittenberg](https://github.com/ebwittenberg)
- [Eric Mauldin](https://github.com/emauldin84)
  
