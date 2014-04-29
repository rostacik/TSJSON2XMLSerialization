var JSON2XMLLib;
(function (JSON2XMLLib) {
    "use strict";

    

    /** converter class implementation */
    var Converter = (function () {
        function Converter() {
        }
        /** converter class implementation
        * @param obj object to serialize to XML
        * @params optional rootname and name for wrapping of each anonymous object in array
        */
        Converter.prototype.convert = function (obj, params) {
            var xml = '';

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    var value = obj[i], type = typeof value;

                    if (value instanceof Array && type === 'object') {
                        for (var sub in value) {
                            xml += this.convert(value[sub]);
                        }
                    } else if (value instanceof Object && type === 'object') {
                        //normal text node
                        if (isNaN(i)) {
                            xml += this.tag(i) + this.convert(value) + this.tag(i, {
                                closing: 1
                            });
                        } else {
                            //wrap with this name if defined
                            if ((params !== undefined) && (params !== null) && (params.objectInArrayName !== undefined) && (params.objectInArrayName !== null) && (params.objectInArrayName !== '')) {
                                xml += this.tagConvertValueTag(params.objectInArrayName, value);
                            } else {
                                xml += this.tagConvertValueTag(i, value);
                            }
                        }
                    } else {
                        xml += this.tagValueTag(i, value);
                    }
                }
            }

            return ((params !== undefined) && (params !== null) && (params.rootName !== undefined) && (params.rootName !== null)) ? this.tag(params.rootName) + xml + this.tag(params.rootName, {
                closing: 1
            }) : xml;
        };

        Converter.prototype.tag = function (name, options) {
            options = options || {};
            return '<' + (options.closing ? '/' : '') + name + '>';
        };

        Converter.prototype.tagValueTag = function (tagName, value) {
            return this.tag(tagName) + value + this.tag(tagName, { closing: 1 });
        };

        Converter.prototype.tagConvertValueTag = function (tagName, value) {
            return this.tag(tagName) + this.convert(value) + this.tag(tagName, { closing: 1 });
        };
        return Converter;
    })();
    JSON2XMLLib.Converter = Converter;
})(JSON2XMLLib || (JSON2XMLLib = {}));
//# sourceMappingURL=json2xml.js.map
