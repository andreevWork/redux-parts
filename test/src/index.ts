/**
 * If we have webpack, we can use context for dynamic require all parts.
 *
 */
import './main.part';
import './user.part';

import {Creator} from "../../src/index";

const {reducer, actions} = Creator();

export {
    actions,
    reducer
};