// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","./kernel","./domUtils","./lang","./InfoTemplate","./geometry/jsonUtils","./symbols/jsonUtils"],function(t,e,i,s,r,n,a,o,h){var u=t(null,{declaredClass:"esri.Graphic",constructor:function(t,e,i,s){this._geomVersion=0,t&&!t.declaredClass?(this.geometry=t.geometry?o.fromJson(t.geometry):null,this.symbol=t.symbol?h.fromJson(t.symbol):null,this.attributes=t.attributes||null,this.infoTemplate=t.infoTemplate?new a(t.infoTemplate):null):(this.geometry=t,this.symbol=e,this.attributes=i,this.infoTemplate=s)},_geomVersion:null,_shape:null,_dataAttrs:null,_graphicsLayer:null,_suspended:!1,size:null,_visible:!0,visible:!0,_aggregationSourceLayer:null,_aggregationInfo:null,setSize:function(t){this.size=t},getAggregationSourceLayer:function(){return this._aggregationSourceLayer},setAggregationSourceLayer:function(t){this._aggregationSourceLayer=t},isAggregate:function(){return!!this._aggregationInfo},getAggregationInfo:function(){return this._aggregationInfo},setAggregationInfo:function(t){this._aggregationInfo=t},getChildGraphics:function(){var t=this.getAggregationSourceLayer();return t?t.getChildGraphics(this):[]},getDojoShape:function(){return this._shape},getShapes:function(){var t=[];return this._shape&&t.push(this._shape),this._bgShape&&t.push(this._bgShape),t},getNode:function(){var t=this._shape&&this._shape.getNode();return t&&t.nodeType?t:null},getNodes:function(){var t,e,i=this.getShapes(),s=i.length,r=[];for(e=0;s>e;e++)t=i[e]&&i[e].getNode(),t&&t.nodeType&&r.push(t);return r},getLayer:function(){return this._layer},getSourceLayer:function(){return this._sourceLayer||this._layer},clone:function(){var t=new this.constructor(this.toJson());return t.visible=this.visible,t._visible=this._visible,t._layer=this._layer,t._sourceLayer=this._sourceLayer,t._aggregationSourceLayer=this._aggregationSourceLayer,t._aggregationInfo=this._aggregationInfo,t},draw:function(){var t=this._graphicsLayer;return t&&t._draw(this,!0),this},setGeometry:function(t){this.geometry=t,this._geomVersion++;var e=this._graphicsLayer;return e&&(e._updateExtent(this),e._draw(this,!0),t&&"polyline"===t.type&&e._updateSVGMarkers()),this},setSymbol:function(t,e){var i=this._graphicsLayer,s=this._shape;return this.symbol=t,i&&(e&&s&&i._removeShape(this),i._draw(this,!0)),this},setAttributes:function(t){return this.attributes=t,this._clearCache(),this},setInfoTemplate:function(t){return this.infoTemplate=t,this},getInfoTemplate:function(){return this._getEffInfoTemplate()},_getEffInfoTemplate:function(){var t=this.getLayer();return this.infoTemplate||t&&t.infoTemplate},getTitle:function(){var t=this.getInfoTemplate(),i=t&&t.title;if(e.isFunction(i))i=i.call(t,this);else if(e.isString(i)){var s=this.getLayer(),r=s&&s._getDateOpts;i=n.substitute(this.attributes,i,{first:!0,dateFormat:r&&r.call(s)})}return i},getContent:function(){var t=this.getInfoTemplate(),i=t&&t.content;if(e.isFunction(i))i=i.call(t,this);else if(e.isString(i)){var s=this.getLayer(),r=s&&s._getDateOpts;i=n.substitute(this.attributes,i,{dateFormat:r&&r.call(s)})}return i},attr:function(t,e){return null==e||this._dataAttrs||(this._dataAttrs={}),this._dataAttrs&&(this._dataAttrs[t]=e,this._setDataAttr(t,e)),this},show:function(){this.visible=this._visible=!0,this.attr("data-hidden");var t,e,i,s=this.getShapes();if(s.length)for(t=this.getNodes(),i=t.length,e=0;i>e;e++)r.show(t[e]);else this._graphicsLayer&&this._graphicsLayer._draw(this,!0);return this},hide:function(){this.visible=this._visible=!1,this.attr("data-hidden","");var t,e,i,s=this._graphicsLayer;if(s)if("canvas-2d"===s.surfaceType)s._removeShape(this);else if(t=this.getNodes(),i=t.length)for(e=0;i>e;e++)r.hide(t[e]);return this},toJson:function(){var t={};return this.geometry&&(t.geometry=this.geometry.toJson()),this.attributes&&(t.attributes=e.mixin({},this.attributes)),this.symbol&&(t.symbol=this.symbol.toJson()),this.infoTemplate&&(t.infoTemplate=this.infoTemplate.toJson()),t},_setDataAttr:function(t,e){var i,s=this.getNodes(),r=s.length;for(i=0;r>i;i++)this._setDOMDataAttr(s[i],t,e)},_setDOMDataAttr:function(t,e,i){null==i?t.removeAttribute(e):t.setAttribute(e,i)},_applyDataAttrs:function(){var t=this._dataAttrs;if(t){var e,i=this.getNodes(),s=i.length;for(e=0;s>e;e++){var r;for(r in t)this._setDOMDataAttr(i[e],r,t[r])}}},_getViewInfo:function(t){t=t||this.getLayer();var e=t&&t.getMap();return e&&e._getViewInfo()},_getDataValue:function(t,e,i,s,r){var n=e.id,a=this.attributes,o=t.field,h=e.isNumeric,u=null;if(n){var l=this._computedAttributes,g=this._computedVersion,f=this._computedGeomVersion,c=this._getViewInfo(s),_=e.dependsOnView||e.isJSFunc,p=e.dependsOnGeometry,m=p&&!!r;l||(l=this._computedAttributes={}),_&&!g&&(g=this._computedVersion={}),p&&!f&&(f=this._computedGeomVersion={});var d=_&&g[n]!==c._version||p&&f[n]!==this._geomVersion;if(u=l[n],void 0===u||d||m){if(u=null,e.hasExpr){var y=i.createExecContext(this,c),b=y.vars.$feature;b&&r&&(b.geometry=r),u=i.executeFunction(e.compiledFunc,y)}else if(e.isJSFunc)u=o(this,t);else if(a&&(u=a[o],h&&this._isValidNumber(u))){var v=t.normalizationType||"field";if(v){var S=u;u=null;var L=t.normalizationTotal,V=a[t.normalizationField];"log"===v&&0!==S?u=Math.log(S)*Math.LOG10E:"percent-of-total"===v&&this._isValidNumber(L)&&0!==L?u=S/L*100:"field"===v&&this._isValidNumber(V)&&0!==V&&(u=S/V)}}u=this._sanitizeValue(u,h),m||(l[n]=u,_&&(g[n]=c._version),p&&(f[n]=this._geomVersion))}}else a&&(u=this._sanitizeValue(a[o],h));return u},_sanitizeValue:function(t,e){return e&&!this._isValidNumber(t)&&(t=null),t},_isValidNumber:function(t){return"number"==typeof t&&!isNaN(t)&&t!==1/0&&t!==-(1/0)},_clearCache:function(){this._computedAttributes=this._computedVersion=this._computedGeomVersion=null}});return u.prototype.getShape=u.prototype.getDojoShape,i("extend-esri")&&(s.Graphic=u),u});