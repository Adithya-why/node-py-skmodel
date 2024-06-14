# node-py-skmodel

NPM package to get predictions from scikit-learn models(.pkl files) in node js. Requires python in PATH with pandas installed.

# Installation

using npm :
```
$ npm install node-py-skmodel
```

# Usage

## Import

Once installed the library can be imported using ```require()``` 

```js
const PyModel = require("node-py-skmodel");
```


## Syntax

### Initialize Model

First Initialize an object of the PyModel class by passing the path of the model.pkl file. 

**Note: The path of model.pkl file must be passed from the root of the project i.e from the same directory as the node_modules folder**

This is because the library looks for the model.pkl file from the path starting from the same directory as node_modules

```js
const model = new PyModel("./models/mymodelname.pkl");
//Here models is a folder in the same directory as node_modules
```

### Prepare data 

The input data to the model must be passed as a Javascript ```Map()``` Object. Every key in the ```Map()``` must correspond to a the name of a feature and the value should be an array of values for that feature for every row

```js
let data = new Map([
        ['x1', [110,12,-4953,453,23,-56]],
        ['x2', [1334.345,-23,-45,45,45,-23]]
    ]);
    
//x1 and x2 are names of the input features
//this dataset has 2 columns and 6 rows 
//the arrays contain the values for the feature for all 6 rows

/* 
console.log(data)
 data = Map(2) {
  'x1' => [ 110, 12, -4953, 453, 23, -56 ],
  'x2' => [ 1334.345, -23, -45, 45, 45, -23 ]
} 
*/
```

### Get predictions

To get a prediction from the model, call the ```predict()``` method with the data in the above format.

**Note: The ```predict()``` method is asynchronous and returns a promise**

The predictions are retured in the JSON format and need to per parsed with ```JSON.parse()``` 

```js
let res = await model.predict(data);
let predictions = JSON.parse(res);
console.log(predictions);
```
The structure of the output depends on the type of the model and the data passed

For **Classification**
```js
//input data with 2 features
let data = new Map([
        ['x1', [110,12,-4953]],
        ['x2', [1334.345,-23,-45]]
    ]);

//output data
[ 1, 0, 1 ]

```

For **Regression**

```js
//input data with 4 features and 2 rows
let data = new Map([
        ['x1', [-1.5832,1.3]],
        ['x2', [2.4124,-1.1]],
        ['x3', [0.0239,0.93]],
        ['x4', [-0.8986,-0.3]]
    ]);

//output data with 2 predicted target features for 2 rows
[
  [ 4.4787611463874635, 4.996385307992549 ],    //row 1
  [ 9.03510439367713, 46.88473858460242 ]       //row 2
]
```

## Full Examples

**Classification**
```js
const PyModel = require("node-py-skmodel");


async function main(){
    let mymodel = new PyModel("./models/simpleModel.pkl");
    
    let data = new Map([
        ['x1', [110,12,-4953]],
        ['x2', [1334.345,-23,-45]]
    ]);


    let res = await mymodel.predict(data);
    console.log(JSON.parse(res));

}

main();

```

**Regression**

```js
/
const PyModel = require("node-py-skmodel");


async function main(){
    let model = new PyModel("./models/simpleregmodel.pkl");

    let data = new Map([
        ['x1', [-1.5832,1.3]],
        ['x2', [2.4124,-1.1]],
        ['x3', [0.0239,0.93]],
        ['x4', [-0.8986,-0.3]]
    ]);


    let res = await model.predict(data);
    let pred = JSON.parse(res);
    console.log(pred);
    
}

main();
```
















