# redux-parts

It`s just a try to create a better tool for using [Redux](https://github.com/reactjs/redux).

***

Example app: [redux-parts-example](https://github.com/andreevWork/redux-parts-example)

***
## Table of contents
- [Install](#install)
- [API](#api)
  * [Creator](#creator)
- [Part](#part)
- [SimplePart](#simplepart)
- [ComplexPart](#complexpart)

***

## Install

```javascropt
npm i -S redux-parts
```

---

## API

### Creator

**Creator** is a function for build *actions* and *reducer*. 
* *actions* - object with functions, with pre-set types.
* *reducer* - pure function.

After you have created a [part](#part), you can create *actions* and *reducer* just pass part to Creator:
```javascript
import {Creator} from 'redux-parts';

const part = // part code here

const {actions, reducer} = Creator(part);
```

---

## Part

"Part" is just javascript object, with such properties:

* *reducer* {Object}
* *initial_state* {Object}
* *actions* {Object}
* *simple_parts* {Array}
* *complex_parts* {Object}

## SimplePart

Simple part may include only these three properties:
* *reducer* {Object} **required**
* *initial_state* {Object}
* *actions* {Object}

Simple part - it is the smallest possible part. It is like mixin. You can create many simple parts and combine them in [ComplexPart](#complexpart). For example - simple part for load data:
```javascript
const LoadDataPart = {
 reducer: {
 
  loadData(state, action) {
   return {
    ...state,
    is_pending: true
   }
  },
  
  loadDataSuccess(state, action) {
   return {
    ...state,
    data: action.payload.data,
    is_pending: false
   }
  }
  
 }
```


## ComplexPart
