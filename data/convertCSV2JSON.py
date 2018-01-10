# convertCSV2JSON_ages.py
#


import csv
import json

# Keys for JSON object.
# fieldnames = ["name", "mean", "min", "max"]

json_bar = {}

json_map = {}





# Convert data from csv to JSON object with given keys.
with open("politicalindex.csv", 'r') as csvfile, open("dataMap.json", 'w') as jsonfile_map, open("dataBar.json", 'w') as jsonfile_map:
	# reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
	reader = csv.reader(csvfile, delimiter=',')

	# Write to JSON file.
	for count, row in enumerate(reader):
		if count < 1:
			continue


		# print(row)
		state_bar = {row[1]:{
			"Population": row[3],
			"Violent crime rate": row[9],
			"Murder and nonnegligent Manslaughter rate" : row[10],
			"Legacy rape rate": row[11],
			"Robbery rate": row[12],
			"Aggravated assault rate": row[13],


			}
			}
		state_map = {row[1]: {
			"Population": row[3],
			"Violent crime total": row[4],
			"Murder and nonnegligent Manslaughter": row[5],
			"Legacy rape": row[6],
			"Robbery": row[7],
			"Aggravated assault": row[8],

			}
		}


		try:
			json_bar[row[0]].update(state_bar)

			json_map[row[0]].update(state_map)

		except KeyError:
			json_bar[row[0]] = {}
			json_bar[row[0]] = state_bar

			json_map[row[0]] = {}
			json_map[row[0]] = state_map


	json.dump(json_bar, jsonfile_bar, indent=2)

	json.dump(json_map, jsonfile_map, indent=2)
