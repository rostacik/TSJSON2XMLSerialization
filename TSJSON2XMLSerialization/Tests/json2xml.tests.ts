/// <reference path="../Lib/json2xml.ts" />
/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />

QUnit.module("json2xml tests");

test("Test Web Site Object With Data Root Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' +
        ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

    // Act
    var xml = target.convert(obj, { rootName: 'data' });

    // Assert
    equal(xml, '<data><firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number></data>',
        'Result should be XML representation of JSON object with root name.');
});

test("Test Web Site Object No Data Root Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{ "firstName": "John", "lastName": "Smith", "age": 25, "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }' +
        ', "phoneNumber": [ { "type": "home", "number": "212 555-1234" }, { "type": "fax", "number": "646 555-4567" } ] }');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><type>home</type><number>212 555-1234</number><type>fax</type><number>646 555-4567</number>',
        'Result should be XML representation of JSON object without root.');
});

test("Test Array Object No Anonymous Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<0><prop1>val1</prop1></0><1><prop2>val2</prop2></1><2><prop3>val3</prop3></2><3><prop4>val4</prop4></3>',
        'Result should be XML representation of JSON object with 4 properties in array.');
});

test("Test Array Object Anonymous Name Set", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1"},{"prop2": "val2"},{"prop3": "val3"},{"prop4": "val4"}]');

    // Act
    var xml = target.convert(obj, { objectInArrayName: 'myObj' });

    // Assert
    equal(xml, '<myObj><prop1>val1</prop1></myObj><myObj><prop2>val2</prop2></myObj><myObj><prop3>val3</prop3></myObj><myObj><prop4>val4</prop4></myObj>',
        'Result should be XML representation of JSON object with 4 properties in array, wrapped in desired tag name.');
});

test("Test Simple Array Object", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1"}]');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<0><prop1>val1</prop1></0>',
        'Result should be XML representation of simple JSON object.');
});

test("Test Simple Array Object with root node", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1"}]');

    // Act
    var xml = target.convert(obj, { rootName: 'myObj' });

    // Assert
    equal(xml, '<myObj><0><prop1>val1</prop1></0></myObj>',
        'Result should be XML representation of simple JSON object, wrapped in root tag.');
});

test("Test Simple Array Object", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1"}');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<prop1>val1</prop1>',
        'Result should be XML representation of simple JSON object');
});

test("Test Simple Object with root node", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1"}');

    // Act
    var xml = target.convert(obj, { rootName: 'myRoot' });

    // Assert
    equal(xml, '<myRoot><prop1>val1</prop1></myRoot>',
        'Result should be XML representation of simple JSON object, wrapped with root node.');
});

test("Test Simple Object", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<0><prop1>val1</prop1><prop2>val2</prop2></0>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Simple Array More Props Object Root", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

    // Act
    var xml = target.convert(obj, { rootName: 'myObj' });

    // Assert
    equal(xml, '<myObj><0><prop1>val1</prop1><prop2>val2</prop2></0></myObj>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test No Array More Props Object", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<prop1>val1</prop1><prop2>val2</prop2>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test No Array More Props Object Root", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

    // Act
    var xml = target.convert(obj, { rootName: 'myObj' });

    // Assert
    equal(xml, '<myObj><prop1>val1</prop1><prop2>val2</prop2></myObj>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Simple Array More Props Object Wrap Obj With Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

    // Act
    var xml = target.convert(obj, { objectInArrayName: 'someObj' });

    // Assert
    equal(xml, '<someObj><prop1>val1</prop1><prop2>val2</prop2></someObj>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Simple Array More Props Object Wrap Obj With Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');

    // Act
    var xml = target.convert(obj, { objectInArrayName: 'someObj', rootName: 'myRoot' });

    // Assert
    equal(xml, '<myRoot><someObj><prop1>val1</prop1><prop2>val2</prop2></someObj></myRoot>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test No Array More Props Object Wrap Obj With Name", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1", "prop2": "val2"}');

    // Act
    var xml = target.convert(obj, { objectInArrayName: 'someObj' });

    // Assert
    equal(xml, '<prop1>val1</prop1><prop2>val2</prop2>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Enclosed Array Object Array", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Enclosed Array Object No Array", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}');

    // Act
    var xml = target.convert(obj);

    // Assert
    equal(xml, '<prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address>',
        'Result should be XML representation of simple JSON object, 2 props.');
});

test("Test Enclosed Array Object Array Root", function () {
    // Arrange
    var target = new JSON2XMLLib.Converter();
    var obj = JSON.parse('[{"prop1": "val1", "address": { "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }}]');

    // Act
    var xml = target.convert(obj, { rootName: 'someRoot' });

    // Assert
    equal(xml, '<someRoot><0><prop1>val1</prop1><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address></0></someRoot>',
        'Result should be XML representation of simple JSON object, 2 props.');
});