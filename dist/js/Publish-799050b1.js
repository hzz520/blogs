webpackJsonp([4],{576:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=n(15),b=f(i),u=n(76),l=n(34),a=c(n(591)),y=(c(n(88)),f(n(580))),h=f(n(592));function c(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function f(e){return e&&e.__esModule?e:{default:e}}var p=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,i.Component),o(s,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.props,n=t.actions,o=t.publish,r=t.common,i=t.router,u=o.title,l=o.content,a=o.cover,c=o.category,f=o.blobcover,p=(r.alert,r.userInfo,r.userInfo),s=p.info,d=p.isLogin,m=s.name,v=s._id;return b.default.createElement(y.default,{title:"发布文章"},b.default.createElement("div",{className:"content "+h.default.container},b.default.createElement("form",{className:h.default.publish},b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("label",null,"文章标题："),b.default.createElement("div",null,b.default.createElement("input",{value:u,type:"text",placeholder:"最少5个字",onChange:function(e){n.title(e.target.value)}}))),b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("label",null,"文章内容："),b.default.createElement("div",null,b.default.createElement("textarea",{value:l,type:"text",rows:"10",placeholder:"最少20个字,支持markdown写法",onChange:function(e){n.content(e.target.value)}}))),b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("label",null,"封面预览："),b.default.createElement("div",{className:h.default.inputDiv},b.default.createElement("img",{src:f}))),b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("label",null,"上传封面："),b.default.createElement("div",null,b.default.createElement("input",{type:"file",ref:"btn",onChange:function(e){n.coverToBase64(e.target.files[0])}}),b.default.createElement("span",{onClick:function(){e.refs.btn.click()}},"选择本地图片"))),b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("label",null,"文章类型："),b.default.createElement("div",null,b.default.createElement("select",{name:"category",id:"category",value:c,onChange:function(e){n.category(e.target.value)}},b.default.createElement("option",{value:"1"},"web开发"),b.default.createElement("option",{value:"2"},"node开发")))),b.default.createElement("div",{className:h.default.publishItem},b.default.createElement("input",{type:"button",value:"发布文章",onClick:function(){n.publish({_id:v,isLogin:d,name:m,title:u,content:l,category:c,cover:a},i)}})))))}}]),s);function s(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this))}t.default=(0,u.connect)(function(e){return{publish:e.publish,common:e.common}},function(e){return{actions:(0,l.bindActionCreators)(a,e)}})(p)},580:function(e,t,n){"use strict";var o=n(15),r=n(22),i=n(581);function u(){}u.prototype=Object.create(o.Component.prototype),u.displayName="DocumentTitle",u.propTypes={title:r.string.isRequired},u.prototype.render=function(){return this.props.children?o.Children.only(this.props.children):null},e.exports=i(function(e){var t=e[e.length-1];if(t)return t.title},function(e){var t=e||"";t!==document.title&&(document.title=t)})(u)},581:function(e,t,n){"use strict";function o(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var a=n(15),c=o(a),f=o(n(582));function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(t,n,l){if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof n)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==l&&"function"!=typeof l)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(o){if("function"!=typeof o)throw new Error("Expected WrappedComponent to be a React component.");var r,i=[];function u(){r=t(i.map(function(e){return e.props})),e.canUseDOM?n(r):l&&(r=l(r))}var e=function(e){function t(){return e.apply(this,arguments)||this}!function(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}(t,e),t.peek=function(){return r},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=r;return r=void 0,i=[],e};var n=t.prototype;return n.shouldComponentUpdate=function(e){return!f(e,this.props)},n.componentWillMount=function(){i.push(this),u()},n.componentDidUpdate=function(){u()},n.componentWillUnmount=function(){var e=i.indexOf(this);i.splice(e,1),u()},n.render=function(){return c.createElement(o,this.props)},t}(a.Component);return p(e,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(o)+")"),p(e,"canUseDOM",s),e}}},582:function(e,t){e.exports=function(e,t,n,o){var r=n?n.call(o,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),u=Object.keys(t);if(i.length!==u.length)return!1;for(var l=Object.prototype.hasOwnProperty.bind(t),a=0;a<i.length;a++){var c=i[a];if(!l(c))return!1;var f=e[c],p=t[c];if(!1===(r=n?n.call(o,f,p,c):void 0)||void 0===r&&f!==p)return!1}return!0}},591:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.publish=t.coverToBase64=t.category=t.content=t.title=void 0;var o,r=l(n(45)),i=n(87),u=(o=i)&&o.__esModule?o:{default:o};function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function a(e){return{type:r.COVER,cover:e}}function c(e){return{type:r.BLOBCOVER,blobcover:e}}var f=l(n(88))._alert,p=t.title=function(e){return{type:r.TITLE,title:e}},s=t.content=function(e){return{type:r.CONTENT,content:e}};t.category=function(e){return{type:r.CATEGORY,category:e}},t.coverToBase64=function(t){return function(e){e(c(window.URL.createObjectURL(t))),e(a(t))}},t.publish=function(e,o){return function(n){return 0==e.isLogin?(n(f({isAlert:!0,content:"登录后才可以发布文章"})),void setTimeout(function(){n(f({isAlert:!1,content:""}))},1e3)):e.title.length<5?(n(f({isAlert:!0,content:"标题最少5个字"})),void setTimeout(function(){n(f({isAlert:!1,content:""}))},1e3)):e.content.length<20?(n(f({isAlert:!0,content:"内容最少20个字"})),void setTimeout(function(){n(f({isAlert:!1,content:""}))},1e3)):void u.default.post("/api/blog/publish").field("data",JSON.stringify({_id:e._id,name:e.name,title:e.title,content:e.content,category:e.category})).attach("cover",""==e.cover?{}:e.cover).end(function(e,t){t.ok&&(n(f({isAlert:!0,content:t.body.message})),setTimeout(function(){n(f({isAlert:!1,content:""})),0==t.body.code&&(n(p("")),n(s("")),n(a("")),n(c("")),o.push("/"))},1e3))})}}},592:function(e,t){e.exports={container:"public-container-mq0Yb",publish:"public-publish-3m_UG",publishItem:"public-publishItem-2ZYLW",inputDiv:"public-inputDiv-2sTaD"}}});