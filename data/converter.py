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


rankFile = {
	"Minwage" : {},
	"English" : {},
	"ChildLabour": {},
	"Environment": {},
	"Education" : {},
	"Inovation" : {},
	"Infrastructure" : {},
	"ICTAcces" : {},
	"TaxRate" : {}
}




for keys in rankFile:
	rankFile[keys]
	for i in range(5):
		rankFile[keys][str(i + 1)] = []

print (rankFile)
# Convert data from csv to JSON object with given keys.
with open("Book1.csv", 'r') as csvfile, open("ranks.json", 'w') as jsonfile:
	# reader = csv.DictReader(csvfile, fieldnames, delimiter=';')
	reader = csv.reader(csvfile, delimiter=',')

	# Write to JSON file.
	for row in reader:
		if row[1] != "":
			rankFile["Minwage"][row[1]].append(row[0])
		if row[3] != "":
			rankFile["English"][row[3]].append(row[2])
		if row[5] != "":
			rankFile["ChildLabour"][row[5]].append(row[4])
		if row[7] != "":
			rankFile["Environment"][row[7]].append(row[6])
		if row[9] != "":
			rankFile["Education"][row[9]].append(row[8])
		if row[10] != "":
			rankFile["Inovation"][row[10]].append(row[8])
		if row[11] != "":
			rankFile["Infrastructure"][row[11]].append(row[8])
		if row[12] != "":
			rankFile["ICTAcces"][row[12]].append(row[8])
		if row[14] != "":
			rankFile["TaxRate"][row[14]].append(row[13])
			# print("hooooooooooooooooooooi")
	json.dump(rankFile, jsonfile, indent=2)

	print(rankFile)
