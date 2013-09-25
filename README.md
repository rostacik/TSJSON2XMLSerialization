TypeScript JSON 2 XML Serialization tool/util/lib
=======================

TypeScript tool for simple JSON 2 XML Serialization.

All credits goes to this guy : https://github.com/SiegfriedEhret , I found this repo : https://github.com/SiegfriedEhret/json2xml and used and slightly tweaked his JS. Only thing what I did was little cleanup + put the thing to TS and using tsUnit made some unit tests....

Buy him a beer and hopefully this tool will be usefull for you. If you find a bug, pls fix it, I will accept your pull request.

Usage
-
```javascript
var obj = JSON.parse('{"prop1": "val1"}'); - or you can use object if you want directly
var conv = new JSON2XMLLib.Converter();
var xml = conv.convert(obj);
//xml should be '<prop1>val1</prop1>'

var obj = JSON.parse('{"prop1": "val1"}'); - or you can use object if you want directly
var conv = new JSON2XMLLib.Converter();
var xml = conv.convert(obj, { rootName: 'myRoot' });
//xml should be '<myRoot><prop1>val1</prop1></myRoot>'

var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');
var conv = new JSON2XMLLib.Converter();
var xml = conv.convert(obj, { rootName: 'myRoot' });
//xml should be '<myObj><0><prop1>val1</prop1><prop2>val2</prop2></0></myObj>'

var obj = JSON.parse('[{"prop1": "val1", "prop2": "val2"}]');
var conv = new JSON2XMLLib.Converter();
var xml = conv.convert(obj, { objectInArrayName: 'someObj' });
//xml should be '<someObj><prop1>val1</prop1><prop2>val2</prop2></someObj>'
```

Enjoy,
Dušan