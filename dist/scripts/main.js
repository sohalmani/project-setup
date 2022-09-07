define("modules/Person",{name:"John Doe"}),define("modules/Car",["./Person"],function(n){function e(){this.getOwner=function(){return"The owner is "+n.name}}return e}),require(["modules/Car"],function(n){new n}),define("main",function(){});

//# sourceMappingURL=main.js.map
