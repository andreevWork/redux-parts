import {expect} from 'chai';
import {concatStrings, getByPath, mergeByPath, reduceByKeys, reduceMerge} from "../src/helpers/utils";
import {DELIMITER} from "../src/helpers/constants";

describe("utils - ", function() {
    describe("getByPath ", function() {
        const obj = {
            a: {
                b: {
                    c: {
                        d: 10
                    }
                }
            }
        };

        it("simple object - return object", function() {
            const value = getByPath(obj, 'a.b.c');

            expect(value).to.deep.equal({d: 10});
        });

        it("simple object - return primitive", function() {
            const value = getByPath(obj, 'a.b.c.d');

            expect(value).to.equal(10);
        });

        it("get not string in second param", function() {
            expect(() => getByPath(obj, ['wrong', 'way'] as any)).to.throw('getByPath: second param should be a string type');
        });

        it("if can not get access to value by path - return null", function() {
            expect(getByPath(null, 'a.b.c.d')).to.be.null;
            expect(getByPath([1, 2, 3], 'a.b.c.d')).to.be.null;
            expect(getByPath(() => {}, 'a.b.c.d')).to.be.null;
            expect(getByPath({a: {h: 4}}, 'a.b.c.d')).to.be.null;
        });

    });

    describe("mergeByPath ", function() {
        const obj = {
            a: {
                b: {
                    c: {
                        value: 10
                    },
                    c1: 5
                },
                b1: {
                    value: 1
                }
            },
            a1: {
                value: 10
            }
        };

        it("set new value-object - return new object", function() {
            const value = {f : 'test'};
            const new_obj: any = mergeByPath(obj, 'a.b.c', value);

            expect(new_obj).to.not.equal(obj);

            expect(new_obj.a).to.not.equal(obj.a);
            expect(new_obj.a1).to.equal(obj.a1);

            expect(new_obj.a.b).to.not.equal(obj.a.b);
            expect(new_obj.a.b1).to.equal(obj.a.b1);

            expect(new_obj.a.b.c).to.not.equal(obj.a.b.c);
            expect(new_obj.a.b.c1).to.equal(obj.a.b.c1);

            expect(new_obj.a.b.c).to.deep.equal(value);
        });

        it("get not string in second param", function() {
            expect(() => mergeByPath(obj, ['wrong', 'way'] as any, 5)).to.throw('mergeByPath: second param should be a string type');
        });

        it("first param not object - return null", function() {
            expect(mergeByPath(null, 'a.b.c.d', 5)).to.be.null;
            expect(mergeByPath([1, 2, 3], 'a.b.c.d', 5)).to.be.null;
            expect(mergeByPath(() => {}, 'a.b.c.d', 5)).to.be.null;
        });


        it("If not value by path - throw error", function() {
            expect(() => mergeByPath({a: 10}, 'a.b', 5)).to.throw('Redux-parts: state must be an object not "number"');
        });

    });

    describe("concatStrings ", function() {

        it("two strings", function() {
            expect(concatStrings('a', 'b')).to.be.equal(`b${DELIMITER}a`);
        });

        it("without second string", function() {
            expect(concatStrings('a', null)).to.be.equal(`a`);
        });
    });


    describe("reduceByKeys ", function() {

        it("work", function() {
            const arr = ['a', 'b'];
            const result = reduceByKeys(arr, key => key.toUpperCase());

            expect(result).to.deep.equal({
                a: 'A',
                b: 'B'
            });
        });
    });

    describe("reduceMerge ", function() {

        it("work", function() {
            const arr = [{name: 'name_1'}, {name: 'name_2'}];
            const result = reduceMerge(arr, item => ({[item.name]: 5}));

            expect(result).to.deep.equal({
                name_1: 5,
                name_2: 5
            });
        });
    });
});