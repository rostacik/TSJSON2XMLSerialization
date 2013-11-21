module JSON2XMLLib {
    "use strict";

    /** interface of the converter */
    export interface IConverter {
        /** convert given object to XML
        * @param obj object to serialize to XML
        * @param rootname wrap with root element of this name
        */
        convert(obj: Object, rootname?: string): string;
    }

    /** converter class implementation */
    export class Converter implements IConverter {
        /** converter class implementation 
        * @param obj object to serialize to XML
        * @params optional rootname and name for wrapping of each anonymous object in array
        */
        public convert(obj, params?: {
            rootName?: string;
            objectInArrayName?: string
        }) {
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
                        }
                        //number node = array
                        else {
                            //wrap with this name if defined
                            if ((params !== undefined) && (params !== null) &&
                                (params.objectInArrayName !== undefined) && (params.objectInArrayName !== null) && (params.objectInArrayName !== '')) {

                                xml += this.tagConvertValueTag(params.objectInArrayName, value);
                            }
                            //or use default - number
                            else {
                                xml += this.tagConvertValueTag(i, value);
                            }
                        }
                    } else {
                        xml += this.tagValueTag(i, value);
                    }
                }
            }

            return ((params !== undefined) && (params !== null) &&
                (params.rootName !== undefined) && (params.rootName !== null)) ?
                this.tag(params.rootName) + xml + this.tag(params.rootName, {
                    closing: 1
                }) : xml;

        }

        private tag(name, options?) {
            options = options || {};
            return '<' + (options.closing ? '/' : '') + name + '>';
        }

        private tagValueTag(tagName: string, value: string): string {
            return this.tag(tagName) + value + this.tag(tagName, { closing: 1 });
        }

        private tagConvertValueTag(tagName: string, value: string): string {
            return this.tag(tagName) + this.convert(value) + this.tag(tagName, { closing: 1 });
        }
    }
}