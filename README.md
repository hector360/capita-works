# My Project

This is a project made with node js (Express.js) and Typescript, which is in charge of reviewing a CSV file which contains the vehicle sales data provided by the company.
The steps to follow to obtain the total sum of sales is as follows:
1) In case of adding an excel file, the file should be added in the "xlsxFiles" folder, in case of adding a CSV file simply add it to the csvFiles folder.
2) In case of adding the excel file, you can consult the path "/convert-xlsx-to-csv" the project is running on port 3000 so the path would be: "http://localhost:3000/convert-xlsx-to-csv", this route basically what it does is convert the file from xlsx format to csv
3) In case of adding a csv file or after converting the xlsx file to csv, the following path can be accessed:
"http://localhost:3000/save-json-data-from-csv" what this route does is save all the information in our database, or in this case a local .json file, anyway the server It is programmed so that every 5 minutes it is checking the csv file directory, if there is a file it will pass it to our database and then delete the csv file.
4) Finally, to check the sale of the vehicles, you can access the route: "http://localhost:3000/get-inventory-data", to this route you can pass parameters in the url which will be the ones you want use for search, for example:
"http://localhost:3000/get-inventory-data?vehicle_make=Toyota&vehicle_year=2015&vehicle_model=Tacoma", The file will return the parameters that were passed to it and the total number of vehicles sold.


## Installation

To install this project, simply clone the repository and run `npm install`.
If there is no documentation, you can run the `npm run docs` command to generate the documentation.

## Usage

To use this project, run `npm start` and then navigate to `http://localhost:3000` in your web browser.

