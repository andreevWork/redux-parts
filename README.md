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

* **initial_state** {Object}
* **reducer** {Object}
* **actions** {Object}
* **simple_parts** {Array}
* **complex_parts** {Object}
