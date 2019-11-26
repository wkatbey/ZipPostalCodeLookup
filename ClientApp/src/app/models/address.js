"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address(addressFirstLine, addressSecondLine, city, state, zipcode) {
        this.addressFirstLine = addressFirstLine;
        this.addressSecondLine = addressSecondLine;
        this.city = city;
        this.state = state;
        if (zipcode)
            this.zipcode = zipcode;
    }
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=address.js.map