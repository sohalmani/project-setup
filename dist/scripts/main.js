'use strict';

define('modules/Person', {
    name: "John Doe"
});

define('modules/Car', ["./Person"], function (Person) {
    function Car() {
        this.getOwner = function () {
            return "The owner is " + Person.name;
        };
    }
    return Car;
});

require(['modules/Car'], function (Car) {
    var car = new Car();
    console.log(car.getOwner());
});

define("main", function () {});
//# sourceMappingURL=main.js.map
