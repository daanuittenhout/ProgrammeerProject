import csv
import json

csvfile = open('colors.csv', 'r')
jsonfile = open('colors1.json', 'w')


reader = csv.DictReader( csvfile)
data = []
for row in reader:
    data.append(row)
json.dump(data, jsonfile, indent=2)
