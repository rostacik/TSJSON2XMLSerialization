module JSON2XMLTestModule {
    export class JSON2XMLTests {
        private target = new JSON2XMLLib.Converter();

        testNoArrayObject() {
            
        }

        testNoArrayObjectRoot() {
            
        }

        testSimpleArrayMorePropsObject() {

        }

        testSimpleArrayMorePropsObjectRoot() {

        }

        testNoArrayMorePropsObject() {

        }

        testNoArrayMorePropsObjectRoot() {

        }

        testSimpleArrayMorePropsObjectWrapObjWithName() {

        }

        testSimpleArrayMorePropsObjectWrapObjWithNameRoot() {

        }

        testNoArrayMorePropsObjectWrapObjWithName() {

        }

        testEnclosedArrayObjectArray() {
        }

        testEnclosedArrayObjectNoArray() {
        }

        testEnclosedArrayObjectArrayRoot() {
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