#this file is used to load the specified model
#parse data arguments and create pd dataframe
#get the prediction and return it



import os
import argparse
import pandas as pd
import pickle
import argparse
import json


# x = pd.DataFrame({0: [1.944941], 1: [1.229823]})



# print("IN PY")


#get data from cli and create dataframe
parser = argparse.ArgumentParser()


#get names first
#and add other features later based on names that are given
#use names to add arguments to get those values and parse again

parser.add_argument("--modelpath")
parser.add_argument("--names")
data, unknown = parser.parse_known_args()
names = data.names.split(",")



#import model from pkl
#this python command is run from inside package file
#but model relative path given from project root
#so first go out from package to project root  and follow the modelpath
#only one ../ for testing since not inside node_modules
#two ../../ for prod as npm package inside node_modules
modelpath = os.path.join('../','../', data.modelpath)
# print(modelpath)
with open(modelpath,"rb") as file:
    model = pickle.load(file)




#add feature args one by one
for name in names:
    parser.add_argument("--"+name)

#get all args with proper name and data
data = parser.parse_args()
# print(data)




#create df from data given
#vars used to conver namespace object data to dict to traverse
dataDict = {}
temp = vars(data)
# print(temp)


# for name in names:
#     dataDict[name] = [temp[name]]
#buils dict for df from parsed data 

#if array of vals given for a feature
#split by , converted to array
#makes a dict in format {featureName: [val1,val2],..}

for name in names:
    feature = temp[name]
    feature = feature.split(",")
    dataDict[name] = feature

# print(dataDict)


#make df from dict
#keys are colnames

x = pd.DataFrame(dataDict)



#predict
#and return results
#any print in file corresponds to stdout in interface file

#converts numpy nd array to py list first and serializes to json

res = model.predict(x)
pred = json.dumps(res.tolist())
print(pred)





