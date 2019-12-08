"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_xml2json_1 = require("ngx-xml2json");
var ZipPostalCodeLookupResponse = /** @class */ (function () {
    function ZipPostalCodeLookupResponse(response) {
        this.xmlToJson = new ngx_xml2json_1.NgxXml2jsonService();
        var parser = new DOMParser();
        var xml = parser.parseFromString(response.requestXml, 'text/xml');
        var jsonResponse = this.xmlToJson.xmlToJson(xml);
        var zip5 = jsonResponse.ZipCodeLookupResponse.Address.Zip5;
        var zip4 = jsonResponse.ZipCodeLookupResponse.Address.Zip4;
        this.zipcode = zip5 + ' - ' + zip4;
    }
    return ZipPostalCodeLookupResponse;
}());
exports.ZipPostalCodeLookupResponse = ZipPostalCodeLookupResponse;
//# sourceMappingURL=zip-postal-code-lookup-response.js.map