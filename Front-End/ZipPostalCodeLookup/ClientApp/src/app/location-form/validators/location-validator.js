"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var address_1 = require("../../models/address");
var zip_postal_code_lookup_response_1 = require("../../models/zip-postal-code-lookup-response");
var LocationValidator = /** @class */ (function () {
    function LocationValidator() {
    }
    LocationValidator.locationExists = function (zipcodeLookupService) {
        return function (formGroup) {
            var addressFirstLine = formGroup.get('addressFirstLine').value;
            var addressSecondLine = formGroup.get('addressSecondLine').value;
            var city = formGroup.get('city').value;
            var state = formGroup.get('state').value;
            var address = new address_1.Address(addressFirstLine, addressSecondLine, city, state);
            if (addressFirstLine && city && state) {
                return zipcodeLookupService.getZipcodeByAddress(address).pipe(operators_1.map(function (response) {
                    var zipcode = new zip_postal_code_lookup_response_1.ZipPostalCodeLookupResponse(response).zipcode;
                    return zipcode != undefined && zipcode != null ? null : { locationInvalid: true };
                }));
            }
        };
    };
    return LocationValidator;
}());
exports.LocationValidator = LocationValidator;
//# sourceMappingURL=location-validator.js.map