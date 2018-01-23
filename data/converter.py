# import csv
# import json
#
# csvfile = open('taxData.csv', 'r')
# jsonfile = open('corTax1.json', 'w')
#
# headers = ("Country","Corporate Tax rate")
# reader = csv.reader( csvfile)
# data = {}
# for row in reader:
#     try:
#         data = {row[0]:{"corTax": row[1]}}
#         csvfile[row[0]].update(data)
#     except KeyError:
#     	csvfile[row[0]] = {}
#     	csvfile[row[0]] = data
# json.dump(data, jsonfile, indent=2)

import csv
import json

# Keys for JSON object.
# fieldnames = ["name", "mean", "min", "max"]

rankFile = {}

json_map = {}





# Convert data from csv to JSON object with given keys.
with open("Book1.csv", 'r') as csvfile, open("ranks.json", 'w') as jsonfile_map:
	# reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
	reader = csv.reader(csvfile, delimiter=',')

	# Write to JSON file.
	for count, row in enumerate(reader):
		if count == 0:
			continue


		print(row)
		ranks = {
			"Minwage":{ row[3] :{
			row[0]
			}
            }}



		try:
			rankFile[row[0]].update(ranks)


		except KeyError:
			rankFile[row[0]] = {}
			rankFile[row[0]] = ranks

	json.dump(rankFile, jsonfile_map, indent=2)
