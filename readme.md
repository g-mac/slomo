# "The inner BPM"
## SloMo Web Experiment



https://github.com/g-mac/slomo

https://slomo-xp.herokuapp.com/

-----

[This website](http://www.all8.com/tools/bpm.htm), called "Tap for Beat Pet Minute" was used as an example for the JS code.

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

Other commands:
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
``

C:\node\nodetest1\package.json

add to "dependencies":

    "mongodb": "^2.2.25",
    "monk": "^4.0.0",

`npm install`

`npm start`

http://localhost:3000
