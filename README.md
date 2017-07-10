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
  * [reducer](#reducer)
  * [initial_state](#initial_state)
  * [actions](#actions)
  * [simple_parts](#simple_parts)
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
* *actions* - object with functions, with pre-set types. These actions create a object, which you can dispatch to store. Redux-parts use  [flux-standard-action](https://github.com/acdlite/flux-standard-action) for create actions.
* *reducer* - pure function. This function you can pass to *createStore* function.

After you have created a [part](#part), you can create *actions* and *reducer* just pass part to Creator:
```javascript
import {Creator} from 'redux-parts';

const part = // part code here

const {actions, reducer} = Creator(part);
```

---

## Part

"Part" is just javascript object, with such properties:

* [reducer](#reducer) {Object}
* [initial_state](#initial_state) {Object}
* [actions](#actions) {Object}
* [simple_parts](#simple_parts) {Array}
* *complex_parts* {Object}

### reducer
It is an object with functions. From these functions will build final reducer. 
For example:
```javascript
const part = {
 reducer: {
  add(state, action) {
   return {
    ...state,
    value: state.value + action.payload
   }
  }
 }
}

const {actions, reducer} = Creator(part);

let state = {value: 0};

const add_action = actions.add(5);
state = reducer(state, add_action);

expect(add_action).to.deep.equal({type: 'add', payload: 5})
expect(state).to.deep.equal({value: 5})
```
How you can see, redux-parts automatically create default actions, with the same name. Also first argument such action, will be *payload* in action object, other arguments will be ignore. More about such actions you can read here [Flux stantard action](https://github.com/acdlite/flux-standard-action)

### initial_state
It is an object, which will be initial for your reducer. 
In example above, we must set initial state into *state* variable. 
But in redux nobody will not create initial state for us.
Now with this property we can do it in right way:
```javascript
const part = {
 initial_state: {
  value: 0
 },
 reducer: {
  add(state, action) {
   return {
    ...state,
    value: state.value + action.payload
   }
  }
 }
}

const {actions, reducer} = Creator(part);

// No value here anymore
let state;
state = reducer(state, actions.add(5));

expect(state).to.deep.equal({value: 5})
```

### actions
Sometimes default actions, which was created automatically from *reducer* property, can be not enough. Maybe you wanna pass more than one argument or doing something with your arguments in action function. What you will return will be in *payload* property. 
Name of property in *actions* must be equal with name of property in *reducer*:
```javascript
const part = {
 initial_state: {
  value: 0
 },
 
 actions: {
  add(firts, second) {
   return first + second;
  }
 },
 
 reducer: {
  add(state, action) {
   return {
    ...state,
    value: state.value + action.payload
   }
  }
 }
}

const {actions, reducer} = Creator(part);

let state;

const add_action = actions.add(5, 10);
state = reducer(state, add_action);

expect(add_action).to.deep.equal({type: 'add', payload: 15})
expect(state).to.deep.equal({value: 15})
```

### simple_parts
It is array of [SimpleParts](#simplepart). For example we have some logic, which we wanna add to different part. We can create a [SimpleParts](#simplepart) and just add it to our part. Because the counter part from above example is a [SimplePart](#simplepart), we can use it in our example
```javascript
// simple part
 const counter_part = //code from example above
 
 const part = {
  simple_parts: [
   counter_parts
  ]
 }
 
const {actions, reducer} = Creator(part);

let state;

// The same actions and reducer
const add_action = actions.add(5, 10);
state = reducer(state, add_action);

// The same test
expect(add_action).to.deep.equal({type: 'add', payload: 15})
expect(state).to.deep.equal({value: 15})
```
As we can see, our part with "simple_parts" property works exactly, how just counter part, it happens because "simple_parts" is just array of mixins, nothing more.



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
