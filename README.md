
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Welcome to your Node.js project on Cloud9 IDE!

This chat example showcases how to use `socket.io` with a static `express` server.

## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node server.js

Once the server is running, open the project in the shape of 'https://projectname-username.c9.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.


### Developing

ARCHITECTURE:

We are developing a Multitenant SaaS Application which will feature the three 
SaaS Applications. This is a multitenant model where the user has the option of 
selecting and working with any of the three SaaS applications: Waterfall, Scrum 
and Kanban. The UI designed in AngularJS captures the features of these 
systems.
This application has a primitive login/Registration page where the user can login 
or can register as a new user and then gets a Preference page to choose or edit 
any of the three Waterfall, Scrum or Kanban. After setting the preference he can 
later view the project status. Project status again comes as relative to the 
tenant’s selection of the SDLC method.
Our’s is a multiple page approach, there’s a Project Page that displays a list of 
Activities (i.e Task ,Story, Card etc.). There’s also Activity Page from where the 
Activities can be approached and edited. 
Same code base renders all the three tenant types.
Waterfall models are design processes used for developing software models. It 
renders a linear sequential life-cycle. It undergoes a number of phase 
conversions systematically in a downward fashion catering to the shape of a 
waterfall. The important phases involved: Requirements, Design, 
Implementation, Verification and Maintenance.
Scrum is an agile methodology used for project management. It’s a process 
adopted by the teams to coordinate and work collectively to deliver a product . 
The development process occurs in small pieces and the current level pieces are 
constructed depending on the previous work. This makes testing and 
modifications easier because it’s conducted on modular pieces.
It simplifies the process of creating projects with rapidly changing requirements.
Kanban is a systematic approach used for maintaining and improving the level 
of production. It manages the software development process in an efficient 
fashion by providing faster outputs, flexible planning options and transparency 
through the lifecycle process.
Now coming to our project the UI page provides the user with an option to sign 
up for the application. After he signs up for the application he gets a preference 
page where he will be able to set up his choice for either of the Saas 
applications. The design is such that it will automatically render the data 
elements and schemas based on the user’s selection.
