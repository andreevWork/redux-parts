# redux-parts

It`s just a try to create a tool for using with [Redux](https://github.com/reactjs/redux).

---

Example app: TODO

***

## What is it "part"?

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
