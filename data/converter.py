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

corTax = {}

json_map = {}





# Convert data from csv to JSON object with given keys.
with open("taxData.csv", 'r') as csvfile, open("corTax1.json", 'w') as jsonfile_map:
	# reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
	reader = csv.reader(csvfile, delimiter=',')

	# Write to JSON file.
	for count, row in enumerate(reader):
		if count < 1:
			continue


		# print(row)
		state_bar = {
			"Tax": row[1]
            }



		try:
			corTax[row[0]].update(state_bar)


		except KeyError:
			corTax[row[0]] = {}
			corTax[row[0]] = state_bar

	json.dump(corTax, jsonfile_map, indent=2)
