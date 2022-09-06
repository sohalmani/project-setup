define("modules/Person",{name:"John Doe"}),define("modules/Car",["./Person"],function(n){return function(){this.getOwner=function(){return"The owner is "+n.name}}}),require(["modules/Car"],function(n){const e=new n;console.log(e.getOwner())}),define("main",function(){});
//# sourceMappingURL=main.js.map
