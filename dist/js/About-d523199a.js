webpackJsonp([5],{577:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=n(15),i=l(u),a=l(n(593)),c=l(n(580));function l(e){return e&&e.__esModule?e:{default:e}}var f=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(p,u.Component),r(p,[{key:"render",value:function(){return i.default.createElement(c.default,{title:"关于网站架构"},i.default.createElement("div",{className:a.default.container+" content"},i.default.createElement("h1",null,"关于网站架构"),i.default.createElement("h2",null,i.default.createElement("br",null),"前端采用的是react + redux + react-router 提供路由",i.default.createElement("br",null),i.default.createElement("br",null),"后端是node + express + mongoose提供API的方式",i.default.createElement("br",null),i.default.createElement("br",null),"前后端采用的是superagent的交互方式",i.default.createElement("br",null),i.default.createElement("br",null),"构建工具是基于webpakc打包， 线上是用nginx提供Gzip压缩。首屏加载整体优化下来从1.3M左右左右控制在80KB左右",i.default.createElement("br",null),i.default.createElement("br",null),"模块化方面是基于ES6模块化开发，配合react的组件化，以后复用率和扩展都很不错，同时配合webpack打包，完全实现按需加载",i.default.createElement("br",null),i.default.createElement("br",null))))}}]),p);function p(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(p.__proto__||Object.getPrototypeOf(p)).call(this))}t.default=f},580:function(e,t,n){"use strict";var r=n(15),o=n(22),u=n(581);function i(){}i.prototype=Object.create(r.Component.prototype),i.displayName="DocumentTitle",i.propTypes={title:o.string.isRequired},i.prototype.render=function(){return this.props.children?r.Children.only(this.props.children):null},e.exports=u(function(e){var t=e[e.length-1];if(t)return t.title},function(e){var t=e||"";t!==document.title&&(document.title=t)})(i)},581:function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var c=n(15),l=r(c),f=r(n(582));function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(t,n,a){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof n)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==a&&"function"!=typeof a)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var o,u=[];function i(){o=t(u.map(function(e){return e.props})),e.canUseDOM?n(o):a&&(o=a(o))}var e=function(e){function t(){return e.apply(this,arguments)||this}!function(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}(t,e),t.peek=function(){return o},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=o;return o=void 0,u=[],e};var n=t.prototype;return n.shouldComponentUpdate=function(e){return!f(e,this.props)},n.componentWillMount=function(){u.push(this),i()},n.componentDidUpdate=function(){i()},n.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),i()},n.render=function(){return l.createElement(r,this.props)},t}(c.Component);return p(e,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),p(e,"canUseDOM",d),e}}},582:function(e,t){e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var u=Object.keys(e),i=Object.keys(t);if(u.length!==i.length)return!1;for(var a=Object.prototype.hasOwnProperty.bind(t),c=0;c<u.length;c++){var l=u[c];if(!a(l))return!1;var f=e[l],p=t[l];if(!1===(o=n?n.call(r,f,p,l):void 0)||void 0===o&&f!==p)return!1}return!0}},593:function(e,t){e.exports={container:"about-container-1ztS1"}}});