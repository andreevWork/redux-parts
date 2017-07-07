# redux-parts

It`s just a try to create a better tool for using [Redux](https://github.com/reactjs/redux).

***

Example app: [redux-parts-example](https://github.com/andreevWork/redux-parts-example)

***
## Table of contents
1. [Install](#install)
2. [Part](#part)
3. [Third Example](#third-example)

***

## Install

```javascropt
npm i -S redux-parts
```

## Part

Part is just javascript object. For example - counter part :
```javascript
const part = {
  initial_state: {
    value: 0
  },

  reducer: {
    increment(state, action) {
      return {
        ...state,
        value: state.value + 1
      };
    }
  }
}
```
## What next

Next we can easy create reducer and actions from a "part":

```javascript
import {Creator} from 'redux-parts';

const {actions, reducer} = Creator(part);
```

**Creator** - main and single function, which is exported from redux-parts.
