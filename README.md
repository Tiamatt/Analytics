# Analytics app
This [web application](https://tiamatt.github.io/Analytics) app is a custom admin interface built with Angular and ASP.NET Core Web API. User can create/read/update/delete items.


## DEMO
Live DEMO [here](https://tiamatt.github.io/Analytics) </br>
</br>
![AnalyticsScreenshot](/src/assets/general-images/screenshot.png?raw=true "Analytics screenshot")


## Features
* Fully responsive design
* Reusable/shared components
* Table view with search, pagination, click column to sort by it
* 1-n and n-n relationships


## Built With
* Angular 4 (TypeScript)
* Angular CLI v1.5.0
* Bootstrap v4.0.0-beta
* Font Awesome v4.7.0
* Google fonts
* ASP.NET Web API (.NET Core 2.0 Framework + C#)
* MS SQL Server


## Getting Started
Note, this project requires Node.js installation.</br>
Follow the steps:
```bash
# step 1. Go to Node.js official website and install it
# check Node.js version (v8.5.0 or upper)
$ node –v
# check npm version (v5.3.0 or upper)
$ npm -v
# step 2. install Angular CLI
$ npm install -g @angular/cli
# check Angular CLI version (v1.4.2 or upper)
$ ng -v
# step 3. import project from github 
$ git clone https://github.com/Tiamatt/Analytics
$ cd Analytics
# step 4. install the project's dependencies (node_modules folder)
$ npm install
# step 5. run application
$ ng serve
# navigate to `http://localhost:4200/`
# app will automatically reload if you change any of the source files.
```

## API and database
This project is using PapaJohnsCloneApi web service and MS SQL database. </br>
The web service was built with ASP.NET Web API (.NET Core 2.0 Framework and C#) and deployed to SmarterAsp.Net (moved from Microsoft Azure Cloud). See  [PapaJohnsCloneApi repository](https://github.com/Tiamatt/PapaJohnsCloneApi) for details. </br>
Database was built with MS SQL and deployed to SmarterAsp.Net (moved from Microsoft Azure Cloud). </br>
