# Employee Tracker (Content Management System)
This command-line application manages a company's employees using node, inquirer, and MySQL.


## Getting Started
You need to set up your MySQL database before you can run the code: 

    1. Download and unzip the code, and install the prerequisites, as explained in the "Installing" section of this README.
    2. In your "employee-tracker-main" directory there is a "db" directory. In that directory there are two files: cms-schema.sql and cms-seeds.sql. 
        a. Open your MySQL Workbench and run cms-schema.sql to create the database and tables.
        b. Then run cms-seeds.sql to populate the database with some data. (Bonus points if you recognize some of the people in your database.)
    3. Now that your database is ready to be queried, open connections.js and replace the MySQL root password on line 13 with your MySQL root password.
    4. Open a Git terminal. Type "node app.js" to invoke the application.

### Prerequisites
  * Git Bash terminal
  * Node
  * MySQL and MySQL Workbench

### Installing
    1. Go to https://github.com/phillipmerriman/employee-tracker and click on the "↓ Code" button. 
    2. Choose "Download ZIP". 
    3. Unzip into a directory. If you're on Windows, open File Explorer and navigate to the download directory. Select the ZIP file, right click, and choose "Extract All". Accept the default location.
    4. Once the file is unzipped, navigate to employee-tracker-main.
    5. If you don't have the prerequisites installed, type the following:
       * npm i
    6. Then use your Git terminal to execute app.js by typing the following:
       * node app.js


## Running the tests
There is no automated test suite for this command line application. Instead, I ran the following manual tests. 

### Manual tests
    1. "View all employees"
    2. "View all managers"
    3. "Add employee"
    4. "Remove employee"
    5. "Update employee role"
    6. "View all roles" 
    7. "Add role"
    8. "Remove role"
    9. "View all departments"
    10. "Add department"
    11. "Remove department"
    12. "Exit"

You can see these tests run by viewing the provided GIF file 
![employee-tracker.gif](employee-tracker.gif) 

## Deployment
To deploy this on a live system, copy all of the files to your computer and follow the instructions in the "Installing" section followed by the "Getting Started" section. This is a command-line tool, not one that runs in the browser. There are no live pages to demonstrate. 

You can see these tests run by viewing the provided animated GIF file 
![employee-tracker.gif](employee-tracker.gif) 

## Built With
* [Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)
* [Visual Studio Code Extension "Open in Browser"] 
    * Open VS Code.
    * Open the extensions pane and search for open in browser.
    * Select the version written by TechER and click Install.
* [Git Terminal](https://git-scm.com/downloads)
* [Node](https://nodejs.org/en/download/)
     * [inqiurer](https://www.npmjs.com/package/inquirer)
     * [mysql](https://www.npmjs.com/package/mysql)
     * [console.table](https://www.npmjs.com/package/console.table)
     * [asciiart-logo](https://www.npmjs.com/package/asciiart-logo)
       

## Contributing
This project is not open to contributions.

## Versioning
This project does not use versions at this time. 

## Authors
© 2020 [Phillip Merriman](https://github.com/phillipmerriman)

## License
MIT

## Acknowledgments
Thanks to the following:
* U of M Coding Bootcamp (https://bootcamp.umn.edu/coding/)
* Node (https://nodejs.org/en/download/)
     * inqiurer
     * mysql
     * console.table
* Git Terminal (https://git-scm.com/downloads)
* Demetri Dillard (https://github.com/Meechlouch) for helping with the MySQL joins on the view all employees function!
* Screencastify (https://www.screencastify.com/) for making mp4 screen capture videos.
* ConvertIO (https://convertio.co/) for converting my MP4 to an animated GIF.