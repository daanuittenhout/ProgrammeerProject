# convertCSV2JSON_ages.py
#


import csv
import json

# Keys for JSON object.
# fieldnames = ["name", "mean", "min", "max"]

json_bar = {}

json_map = {}

for i in range(15):
	year = str(2002 + i)
	json_bar[year] = {}

print(json_bar)

# Convert data from csv to JSON object with given keys.
with open("politicalindex.csv", 'r') as csvfile, open("dataMap1.json", 'w')	as jsonfile_map, open("dataBar1.json", 'w') as jsonfile_bar:
	# reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
	reader = csv.DictReader(csvfile, delimiter='\t')

	for row in reader:
		print(row)
		if row["Country"] == "Country":
			k = "country"
		if row["Series"] == "Series":
			v = "series"
		print(row["Country"])
		current_series = row["Series"]
		current_country = row["Country Cod"]
		for i in range(15):
			year = str(2002 + i)
			value = row[year]
			if current_country in json_bar[year].keys():
				json_bar[year][current_country][current_series] = value
			else:
				json_bar[year][current_country] = {current_series: value}
	print(json_bar)
		# for item in row:
		# 	print(item)
		# 	if k != "country" and v !="series":
        #
		# 		dummy = reader.setdefault(k, )
				# dummy = reader.setdefault()
#
# 	# Write to JSON file.
# 	for count, row in enumerate(reader):
# 		if count > 0:
# 			continue
# while row != ""
# 	for row in range(0,4):
# 		for i in len(row):
# 			if i == 0 and range[0]:
#
#
# 			state_bar = {if i == 0:{
# 				"Population": row[3],
# 				"Violent crime rate": row[9],
# 				"Murder and nonnegligent Manslaughter rate" : row[10],
# 				"Legacy rape rate": row[11],
# 				"Robbery rate": row[12],
# 				"Aggravated assault rate": row[13],
#
#
# 			}
# 			}
# 		state_map = {row[1]: {
# 			"Population": row[3],
# 			"Violent crime total": row[4],
# 			"Murder and nonnegligent Manslaughter": row[5],
# 			"Legacy rape": row[6],
# 			"Robbery": row[7],
# 			"Aggravated assault": row[8],
#
# 			}
# 		}
#
#
# 		try:
# 			json_bar[row[0]].update(state_bar)
#
# 			json_map[row[0]].update(state_map)
#
# 		except KeyError:
# 			json_bar[row[0]] = {}
# 			json_bar[row[0]] = state_bar
#
# 			json_map[row[0]] = {}
# 			json_map[row[0]] = state_map
    #
    #
	json.dump(json_bar, jsonfile_bar, indent=2)
    #
	# json.dump(json_map, jsonfile_map, indent=2)
