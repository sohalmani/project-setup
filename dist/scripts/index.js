!function(e){function t(i){if(n[i])return n[i].exports;var u=n[i]={exports:{},id:i,loaded:!1};return e[i].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var u=n(2),o=i(u),r=n(3),s=i(r),l=new o.default;l.enqueue(1),l.enqueue(2),l.enqueue(4),l.enqueue(8),console.log(l.items),l.dequeue(),console.log(l.items),console.log(l.peek()),console.log(l.isEmpty()),console.log(l.size()),l.clear(),console.log(l.items);var a=new s.default;a.add(1),a.add(2),a.add(4),a.add(8),console.log(a.items),a.remove(),console.log(a.items),console.log(a.peek())},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function(){function e(){n(this,e),this.items=[]}return i(e,[{key:"enqueue",value:function(e){return this.items.push(e)}},{key:"dequeue",value:function(){if(this.items.length>0)return this.items.shift()}},{key:"peek",value:function(){return this.items[this.items.length-1]}},{key:"isEmpty",value:function(){return 0==this.items.length}},{key:"size",value:function(){return this.items.length}},{key:"clear",value:function(){this.items=[]}}]),e}();t.default=u},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function(){function e(){n(this,e),this.items=[]}return i(e,[{key:"add",value:function(e){return this.items.push(e)}},{key:"remove",value:function(){if(this.items.length>0)return this.items.pop()}},{key:"peek",value:function(){return this.items[this.items.length-1]}},{key:"isEmpty",value:function(){return 0==this.items.length}},{key:"size",value:function(){return this.items.length}},{key:"clear",value:function(){this.items=[]}}]),e}();t.default=u}]);