/// <reference path="../Lib/json2xml.ts" />
/// <reference path="../tsUnit/tsUnit.ts" />

module JSON2XMLTestModule {
    export class JSON2XMLTests extends tsUnit.TestClass {

        private target = new JSON2XMLLib.Converter();

        testWebSiteObjectWithData() {
            var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' +
                ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

            var xml = this.target.convert(obj, { rootName: 'data' });

            this.areIdentical(xml, '<data><firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number></data>');
        }

        testWebSiteObjectNoData() {
            var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' +
                ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number>');
        }

        testArrayObjectNoAnonymousName() {
            var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1></0><1><prop2>val2</prop2></1><2><prop3>val3</prop3></2><3><prop4>val4</prop4></3>');
        }

        testArrayObjectAnonymousNameSet() {
            var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'myObj' });

            this.areIdentical(xml, '<myObj><prop1>val1</prop1></myObj><myObj><prop2>val2</prop2></myObj><myObj><prop3>val3</prop3></myObj><myObj><prop4>val4</prop4></myObj>');
        }

        testSimpleArrayObject() {
            var obj = JSON.parse('[{"prop1": "val1"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1></0>');
        }

        testSimpleArrayObjectRoot() {
            var obj = JSON.parse('[{"prop1": "val1"}]');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><0><prop1>val1</prop1></0></myObj>');
        }

        testNoArrayObject() {
            var obj = JSON.parse('{"prop1": "val1"}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1>');
        }

        testNoArrayObjectRoot() {
            var obj = JSON.parse('{"prop1": "val1"}');

            var xml = this.target.convert(obj, { rootName: 'myRoot' });

            this.areIdentical(xml, '<myRoot><prop1>val1</prop1></myRoot>');
        }

        testSimpleArrayMorePropsObject() {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1><prop2>val2</prop2></0>');
        }

        testSimpleArrayMorePropsObjectRoot() {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><0><prop1>val1</prop1><prop2>val2</prop2></0></myObj>');
        }

        testNoArrayMorePropsObject() {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1><prop2>val2</prop2>');
        }

        testNoArrayMorePropsObjectRoot() {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj, { rootName: 'myObj' });

            this.areIdentical(xml, '<myObj><prop1>val1</prop1><prop2>val2</prop2></myObj>');
        }

        testSimpleArrayMorePropsObjectWrapObjWithName() {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj' });

            this.areIdentical(xml, '<someObj><prop1>val1</prop1><prop2>val2</prop2></someObj>');
        }

        testSimpleArrayMorePropsObjectWrapObjWithNameRoot() {
            var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj', rootName: 'myRoot' });

            this.areIdentical(xml, '<myRoot><someObj><prop1>val1</prop1><prop2>val2</prop2></someObj></myRoot>');
        }

        testNoArrayMorePropsObjectWrapObjWithName() {
            var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

            var xml = this.target.convert(obj, { objectInArrayName: 'someObj' });

            this.areIdentical(xml, '<prop1>val1</prop1><prop2>val2</prop2>');
        }

        testEnclosedArrayObjectArray() {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0>');
        }

        testEnclosedArrayObjectNoArray() {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj);

            this.areIdentical(xml, '<prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address>');
        }

        testEnclosedArrayObjectArrayRoot() {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0></someRoot>');
        }

        testEnclosedArrayObjectNoArrayRoot() {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></someRoot>');
        }

        testEnclosedArrayObjectArrayRootArrayName() {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot', objectInArrayName: 'arrName' });

            this.areIdentical(xml, '<someRoot><arrName><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></arrName></someRoot>');
        }

        testEnclosedArrayObjectNoArrayRootArrayName() {
            var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

            var xml = this.target.convert(obj, { rootName: 'someRoot', objectInArrayName: 'arrName' });

            this.areIdentical(xml, '<someRoot><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></someRoot>');
        }

        testEnclosedArrayObjectArrayRootArrayNameNoObjArrayName() {
            var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

            var xml = this.target.convert(obj, { rootName: 'someRoot' });

            this.areIdentical(xml, '<someRoot><0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0></someRoot>');
        }
    }
}

// new instance of tsUnit
var test = new tsUnit.Test();

// add your test class (you can call this multiple times)
test.addTestClass(new JSON2XMLTestModule.JSON2XMLTests());

// Use the built in results display
test.showResults(document.getElementById('results'), test.run());