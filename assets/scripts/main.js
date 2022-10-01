require(['modules/Car'], function (Car) {
  const car = new Car();
  console.log(car.getOwner());
});
