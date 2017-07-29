# redux-parts

Is\`s just a try to create a tool for helps you create and manage your reducer and actions.

Redux-parts is a small library, with no dependies. It has small and very human friendly API. 

Here we go a simple example:

```javascript
import {Creator} from 'redux-parts';

const part = {
 initial_state: {
  text: 'Hello'
 },
 
 reducer: {
  addText(state, action) {
   return {
    ...state,
    text: `${state.text} ${action.payload}`
   }
  }
 }
}

const {actions, reducer} = Creator(part);

const state = reducer(undefined, actions.addText('World!'))

state.text === 'Hello World!'
```

## Goals

* Helps to organize code (reducer, actions and etc)
* Easy
  * create and support
  * combine and extend
  * build deep state
  * testing
* Remove
  *  action type constant
  *  switch-case from reducer


***

Example app: [redux-parts-example](https://github.com/andreevWork/redux-parts-example)
Example code: [code](https://github.com/andreevWork/redux-parts/tree/master/examples)

***

## Table of contents
- [Install](#install)
- [Basic terms](#basicterms)
- [API](#api)
  * [Creator](#creator)
- [Part](#part)
  * [reducer](#reducer)
  * [initial_state](#initial_state)
  * [actions](#actions)
  * [simple_parts](#simple_parts)
  * [complex_parts](#complex_parts)
- [SimplePart](#simplepart)
- [ComplexPart](#complexpart)

***

## Install

```javascropt
npm i -S redux-parts
```

---

## BasicTerms

Here describes basic terms, which helps you to start.

* **[Part](#part)** - is the smallest bit of your code. Is\`s just a simple object with few properties. Parts may be **simple** or   **complex**.
  * **[SimplePart](#simplepart)** - looks like mixins. Simple parts allows you write many little pieces and just merge them in **complex** part.
  * **[ComplexPart](#complexpart)** - is a little bit difficult than **simple** part. With complex part you can build a deep state, with sub states. Also you can mixin simple parts into your complex part. It\`s easy, see [examples]() or [example app](https://github.com/andreevWork/redux-parts-example).

---

## API

### Creator

After you have created a [part](#part), you can create *actions* and *reducer* just pass part to Creator:
```javascript
import {Creator} from 'redux-parts';

const part = // part code here

const {actions, reducer} = Creator(part);
```

* *actions* - object with action creators, with pre-set types. 

> Redux-parts use  [flux-standard-action](https://github.com/acdlite/flux-standard-action) for create actions.

* *reducer* - pure function. This function you can pass to *createStore* function.

What is it a "part"? See it below.

---

## Part

"Part" is just javascript object, with such properties:

* [reducer](#reducer)
* [initial_state](#initial_state)
* [actions](#actions)
* [simple_parts](#simple_parts)
* [complex_parts](#complex_parts)

---

### reducer

type | simple part | complex part
--- | --- | ---
Dictionary\<Functions\> | required | optional

It is an object with pure functions. From these functions will build final reducer function. 
For example:
```javascript
const counter_part = {
 reducer: {
  add(state, action) {
   return {
    ...state,
    value: state.value + action.payload
   }
  }
 }
}

const {actions, reducer} = Creator(counter_part);

let state = {value: 0};

const add_action = actions.add(5);
state = reducer(state, add_action);

expect(add_action).to.deep.equal({type: 'add', payload: 5})
expect(state).to.deep.equal({value: 5})
```
 > As you can see, redux-parts automatically create default action creators, with the same name. First argument such action creators, will be *payload* in action object, other arguments will be ignore.

### initial_state

type | simple part | complex part
--- | --- | ---
Dictionary\<any\> | optional | optional

In example above, we must set initial state into *state* variable. 
But in redux nobody will create initial state for us.

Now with this property we can create reducer function with initial state:

```javascript
const counter_part = {
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

const {actions, reducer} = Creator(counter_part);

// No value here anymore
let state;
state = reducer(state, actions.add(5));

expect(state).to.deep.equal({value: 5})
```

### actions

type | simple part | complex part
--- | --- | ---
Dictionary\<Functions\> | optional | optional

Sometimes default action creators, which was created automatically from *reducer* property, can be not enough. 

Maybe you wanna pass more than one argument or doing something with your arguments in action creator function. 

> All that you will return from action creator, will be in the *payload* action property.

Name of function in *actions* must be equal with name of function in *reducer*:

```javascript
const counter_part = {
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

const {actions, reducer} = Creator(counter_part);

let state;

const add_action = actions.add(5, 10);
state = reducer(state, add_action);

expect(add_action).to.deep.equal({type: 'add', payload: 15})
expect(state).to.deep.equal({value: 15})
```

### simple_parts

type | simple part | complex part
--- | --- | ---
Array\<[SimplePart](#simplepart)\> | no | optional

For example we have some logic, which we wanna add to different part. We can create a [SimpleParts](#simplepart) and just add it to our part. 

Because the counter part from above examples is a [SimplePart](#simplepart), we can use it(the last one) in our example:

```javascript
// simple part
 const counter_part = ...;
 
 const part = {
  simple_parts: [
   counter_part
  ]
 }
 
const {actions, reducer} = Creator(part);

let state;

const add_action = actions.add(5, 10);
state = reducer(state, add_action);

// The same tests from example above
expect(add_action).to.deep.equal({type: 'add', payload: 15})
expect(state).to.deep.equal({value: 15})
```
> As we can see, our part with "simple_parts" property works exactly, how just counter part, it happens because "simple_parts" is just array of mixins, nothing more.

### complex_parts

type | simple part | complex part
--- | --- | ---
Dictionary\<[ComplexPart](#complexpart)\> | no | optional

Sometimes your state may have a sub state and that state have another sub state and etc. For easy combine and use sub state, we have a "complex_parts" property. 

For example we wanna have a two independent counter in our app. We can take the "counter_part" from examples above and use it(the last one):

```javascript
const counter_part = ...;

const part = {
 complex_parts: {
  counter_1: counter_part,
  counter_2: counter_part
 }
};

const {actions, reducer} = Creator(part);

let state;

const counter_1_add_action = actions.counter_1.add(5, 10);
const counter_2_add_action = actions.counter_2.add(40, 10);

state = reducer(state, counter_1_add_action);
state = reducer(state, counter_2_add_action);

expect(state).to.deep.equal({
 counter_1: {
  value: 15
 },
 counter_2: {
  value: 50
 }
})

```
> Keys from "complex_parts" property will be a name for sub actions and will use in action types. 

> We can create a part with "complex_parts" property and use this part in another part in "complex_parts" property, thereby create any depth of state.



## SimplePart

Simple part may include only these three properties:
* *reducer* {Object} **required**
* *initial_state* {Object}
* *actions* {Object}

Simple part - is the smallest possible part. It is like mixin. You can create many simple parts and combine them in [ComplexPart](#complexpart). Also can be a root part, if you have really small application) For example - simple part for load data:
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

Complex part - is the heart of library. With Complex part you can build big and deep state very easily and declarative style. Complex part has many usage examples and many of them described above, but if after reading this article you have a problem with use Complex part, please take a look examples [code](https://github.com/andreevWork/redux-parts/tree/master/examples) and/or  [app](https://github.com/andreevWork/redux-parts-example). 
