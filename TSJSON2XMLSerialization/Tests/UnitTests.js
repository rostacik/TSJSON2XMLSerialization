var JSON2XMLTestModule;
(function (JSON2XMLTestModule) {
    var JSON2XMLTests = (function () {
        function JSON2XMLTests() {
            this.target = new JSON2XMLLib.Converter();
        }
        JSON2XMLTests.prototype.testNoArrayObject = function () {
        };

        JSON2XMLTests.prototype.testNoArrayObjectRoot = function () {
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObject = function () {
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectRoot = function () {
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObject = function () {
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObjectRoot = function () {
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectWrapObjWithName = function () {
        };

        JSON2XMLTests.prototype.testSimpleArrayMorePropsObjectWrapObjWithNameRoot = function () {
        };

        JSON2XMLTests.prototype.testNoArrayMorePropsObjectWrapObjWithName = function () {
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArray = function () {
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectNoArray = function () {
        };

        JSON2XMLTests.prototype.testEnclosedArrayObjectArrayRoot = function () {
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
    })();
    JSON2XMLTestModule.JSON2XMLTests = JSON2XMLTests;
})(JSON2XMLTestModule || (JSON2XMLTestModule = {}));
