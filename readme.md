# "The Inner Timing Experiment"

![alt text](https://www.soscisurvey.de/MusicPracticeHabits/logo.eng.8585.png)

## ERC-Project SloMo

This experiment and study is part of a larger EU funded project called SloMo - "Slow Motion: Transformations of Musical Time in Perception and Performance", initiated by Prof. Dr. Clemens Wöllner at the University of Hamburg, who also leads the Institute of Musicology at the UHH.

For more info on the Slomo project please refer the project website: https://www.slomo.uni-hamburg.de/

## "The Inner Timing" Web Experiment

This project in particular, i.e. "The Inner Timing Experiment" was built by Simon Mayrshofer (MA Systematic Musicology, and author of all code in this project) to facilitate the following study:

`Hammerschmidt, D., Frieler, K., & Wöllner, C. (2020). Innere Zeit: Eine Online-Tappingstudie zum spontanen motorischen Tempo und dessen Einflussfaktoren. In 36. Tagungsband der Deutschen Gesellschaft für Musikpsychologie (pp. 74–75). 3rd-6th September 2020, virtual conference.`

The code repository may be found at https://github.com/g-mac/slomo

The experiment is/was hosted on a University of Hamburg server at: https://innertiming.slomo.uni-hamburg.de
A DEV environment was setup for deploying new developments/features at: https://innertiming.slomo.uni-hamburg.de/dev
A LAB environnment was setup for running in-house tests with a closed group of participants at https://innertiming.slomo.uni-hamburg.de/lab

Originally, before the code base was moved to the University servers, a first version of the project was hosted using Heroku and MLAB at https://slomo-xp.herokuapp.com/

## Technology used

This project is based on the MEN (Mongo, Express, Node.Js) Stack. The Frontend was built using JavaScript and the Node.Js Express Framework. The Backend Infrastructure (i.e. server and database) was setup up on a Apache Server of the University of Hamburg and NGINX and Forever was used for hosting and running the website service. MongoDB was used as a database. Versioning was done using Git, the repository being hosted on GitHub.

## Miscellaneous Notes

[This website](http://www.all8.com/tools/bpm.htm), called "Tap for Beat Per Minute" was used as an example for some of the JS code.

-----

[This guide](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb) from CLOSEBRACE was followed in order to get the MEN (Mongo, Express, NodeJs) Project set up and running.

-----

Guide
Installing NodeJs (npm)
https://nodejs.org/en/download/


-----

https://mlab.com/
Guide for setting up MEN with heroku:
https://forum.freecodecamp.org/t/guide-for-using-mongodb-and-deploying-to-heroku/19347
https://dashboard.heroku.com/apps


-----

to run local mongo db:

1. navigate to /data: `cd data`
2. `mongod --dbpath` .
3. and use mongo console to read/write/delete etc.: `mongo`
4. `use examplecdb` to switch between databases

Other relevant commands:
`db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })`
display all  entries in a collection
`db.usercollection.find().pretty()
Remove all entries from a collection
`db.usercollection.remove({})`


-----

`sudo chown -R $(whoami) /usr/local`

`brew update`

`brew install mongodb --with-openssl`

`npm install ejs`

`which mongo`

`mongod --dbpath .`

`npm install -g express-generator`

C:\node\nodetest1\package.json

add to "dependencies":

    "mongodb": "^2.2.25",
    "monk": "^4.0.0",

`npm install`

`npm start`

http://localhost:3000
