# redux-parts

It`s just a try to create a better tool for using [Redux](https://github.com/reactjs/redux).

***

Example app: [redux-parts-example](https://github.com/andreevWork/redux-parts-example)

***
## Table of contents
1. [Install](#install)
2. [API](#api)
2.1. [Creator](#api.creator)
3. [Part](#part)

***

## Install

```javascropt
npm i -S redux-parts
```

## API

### Creator

**Creator** is a function for build *actions* and *reducer*.
After you have created a [part](#part), you can create *actions* and *reducer* just pass part to Creator:
```javascript
import {Creator} from 'redux-parts';

const part = // part code here

const {actions, reducer} = Creator(part);
```


## Part

"Part" is just javascript object, with such properties:
* **initial_state** {Object} - initial state for reducer.
```javascript
const part = {
  initial_state: {
    value: 0
  }
}
```
* **reducer** {Object} - 
```javascript
const part = {
  reducer: {
    increment(state, action) {
      return {
        ...state,
        value: state.value + 1
      }
    }
  }
}
```
* **actions** {Object};
* **simple_parts** {Array};
* **complex_parts** {Object}
