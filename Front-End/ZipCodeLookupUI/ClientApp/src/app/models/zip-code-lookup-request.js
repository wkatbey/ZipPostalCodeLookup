"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZipCodeLookupRequest = /** @class */ (function () {
    function ZipCodeLookupRequest(address) {
        this.userId = '333SAPPH3353';
        this.request = "\n            <ZipCodeLookupRequest USERID=\"" + this.userId + "\">\n                <Address ID=\"0\">\n                    <Address1>" + address.addressFirstLine + "</Address1>\n                    <Address2>" + address.addressSecondLine + "</Address2>\n                    <City>" + address.city + "</City>\n                    <State>" + address.state.abbreviation + "</State>\n                </Address>\n            </ZipCodeLookupRequest> \n        ";
    }
    return ZipCodeLookupRequest;
}());
exports.ZipCodeLookupRequest = ZipCodeLookupRequest;
//# sourceMappingURL=zip-code-lookup-request.js.map
