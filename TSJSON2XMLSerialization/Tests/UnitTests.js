/// <reference path="../Lib/json2xml.ts" />
/// <reference path="../tsUnit/tsUnit.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JSON2XMLTestModule;
(function (JSON2XMLTestModule) {
    var JSON2XMLTests = (function (_super) {
        __extends(JSON2XMLTests, _super);
        function JSON2XMLTests() {
            _super.apply(this, arguments);
            this.target = new JSON2XMLLib.Converter();
        }
        JSON2XMLTests.prototype.testWebSiteObjectWithData = function () {
            var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' + ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

            var xml = this.target.convert(obj, { rootName: 'data' });

            this.areIdentical(xml, '<data><firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number></data>');
        };

        JSON2XMLTests.prototype.testWebSiteObjectNoData = function () {
            var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' + ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number>');
        };

        JSON2XMLTests.prototype.testArrayObjectNoAnonymousName = function () {
            var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1></0><1><prop2>val2</prop2></1><2><prop3>val3</prop3></2><3><prop4>val4</prop4></3>');
        };

        JSON2XMLTests.prototype.testArrayObjectAnonymousNameSet = function () {
            var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'myObj' });

            this.areIdentical(xml, '<myObj><prop1>val1</prop1></myObj><myObj><prop2>val2</prop2></myObj><myObj><prop3>val3</prop3></myObj><myObj><prop4>val4</prop4></myObj>');
        };

        JSON2XMLTests.prototype.testSimpleArrayObject = function () {
            var obj = JSON.parse('[{"prop1": "val1"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1></0>');
        };

        JSON2XMLTests.prototype.testSimpleArrayObjectRoot = function () {
            var obj = JSON.parse('[{"prop1": "val1"}]');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><0><prop1>val1</prop1></0></myObj>');
        };

        JSON2XMLTests.prototype.testNoArrayObject = function () {
            var obj = JSON.parse('{"prop1": "val1"}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1>');
        };

        JSON2XMLTests.prototype.testNoArrayObjectRoot = function () {
            var obj = JSON.parse('{"prop1": "val1"}');

            var xml = this.target.convert(obj, { rootName: 'myRoot' });

            this.areIdentical(xml, '<myRoot><prop1>val1</prop1></myRoot>');
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObject = function () {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1><prop2>val2</prop2></0>');
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectRoot = function () {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><0><prop1>val1</prop1><prop2>val2</prop2></0></myObj>');
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObject = function () {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1><prop2>val2</prop2>');
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObjectRoot = function () {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><prop1>val1</prop1><prop2>val2</prop2></myObj>');
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectWrapObjWithName = function () {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj' });

            this.areIdentical(xml, '<someObj><prop1>val1</prop1><prop2>val2</prop2></someObj>');
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectWrapObjWithNameRoot = function () {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj', rootName: 'myRoot' });

            this.areIdentical(xml, '<myRoot><someObj><prop1>val1</prop1><prop2>val2</prop2></someObj></myRoot>');
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObjectWrapObjWithName = function () {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj' });

            this.areIdentical(xml, '<prop1>val1</prop1><prop2>val2</prop2>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArray = function () {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectNoArray = function () {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArrayRoot = function () {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0></someRoot>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectNoArrayRoot = function () {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></someRoot>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArrayRootArrayName = function () {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot', objectInArrayName: 'arrName' });

            this.areIdentical(xml, '<someRoot><arrName><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></arrName></someRoot>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectNoArrayRootArrayName = function () {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj, { rootName: 'someRoot', objectInArrayName: 'arrName' });

            this.areIdentical(xml, '<someRoot><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></someRoot>');
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArrayRootArrayNameNoObjArrayName = function () {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0></someRoot>');
        };
        return JSON2XMLTests;
    })(tsUnit.TestClass);
    JSON2XMLTestModule.JSON2XMLTests = JSON2XMLTests;
})(JSON2XMLTestModule || (JSON2XMLTestModule = {}));

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new JSON2XMLTestModule.JSON2XMLTests());

// Use the built in results display
test.showResults(document.getElementById('results'), test.run());
//# sourceMappingURL=UnitTests.js.map
