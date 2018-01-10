a list of data sources if you will get data from an external source, including information on how your are going to filter and transform the data for your project
# Data sources
- worldbank

The data of the pillars will be a dict per year than per country and than the value of the pillars.

The data will be downloaded as csv and will be converted to json files this to properly select the data according to the year and the country.
Data will also be recalculated to show the countries that matches with the company's preferences

# technical components
![](doc/diagram.pnd)

the slider will interact with the year of the data in the json files
the checkboxes will interact with the countries
and the flowerchart will be the best matches


a diagram with an overview of the technical components of your app (visualizations, scraper etc etc)
# Code structure




* create variables that don't need Libraries
* draw the map
* create the checkboxes
* window onload function
  - load the map with countries, colours and create the hover over functionality
  - load the checkboxes
* updatefunctions:
  - onclick updatefunction on the map to select a country
  - slider update to change the year
  - update **go** for the checkboxes to calculate the matches and draw the flowerchart
  - update **reset** to delete the flowerchart



# Libraries, add-ons and plugins
- D3 version 3
- D3 Tooltip
- D3 queue
- TOPO JSON
- D3 interpolate
- Ajax legendLinear
