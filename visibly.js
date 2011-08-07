/*!
 * visibly - v0.5.5 Aug 2011 - Page Visibility API Polyfill
 * http://github.com/addyosmani
 * Copyright (c) 2011 Addy Osmani
 * Dual licensed under the MIT and GPL licenses.
 */
;(function () {

    window.visibly = {
        q: document,
        p: undefined,
        prefixes: ['webkit', 'ms'],
        props: ['VisibilityState', 'visibilitychange', 'Hidden'],
        m: ['focus', 'blur'],
        visibleCallbacks: [],
        hiddenCallbacks: [],
        _callbacks: [],
        cachedPrefix:"",

        onVisible: function (_callback) {
            this.visibleCallbacks.push(_callback);
        },
        onHidden: function (_callback) {
            this.hiddenCallbacks.push(_callback);
        },
        _getPrefix:function(){
            if(!this.cachedPrefix){
                for(var i=0; i<this.prefixes.length;i++){
                    if(this.prefixes[i]){
                        this.cachedPrefix =  this.prefixes[i];
                        return this.cachedPrefix;
                    }
                }    
             }
        },

        visibilityState:function(){
            return  this._propTest(0);
        },
        hidden:function(){
            return this._propTest(2);
        },
        visibilitychange:function(){

        },
        isSupported: function (index) {
            return ((this.cachedPrefix + this.props[2]) in this.q);
        },
        _propTest:function(index){
            return document[this.cachedPrefix + this.props[index]]; 
        },
        _execute: function (index) {
            if (index) {
                this._callbacks = (index == 1) ? this.visibleCallbacks : this.hiddenCallbacks;
                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i]();
                }
            }
        },
        _visible: function () {
            window.visibly._execute(1);
        },
        _hidden: function () {
            window.visibly._execute(2);
        },
        _nativeSwitch: function () {
            this[this._propTest(2) ? '_hidden' : '_visible']();
        },
        _listen: function () {
            try { /*if no native page visibility support found..*/
                if (!(this.isSupported())) {
                    if (this.q.addEventListener) { /*for browsers without focusin/out support eg. firefox, opera use focus/blur*/
                        window.addEventListener(this.m[0], this._visible, 1);
                        window.addEventListener(this.m[1], this._hidden, 1);
                    } else { /*IE <10s most reliable focus events are onfocusin/onfocusout*/
                        if (this.q.attachEvent) {
                            this.q.attachEvent('onfocusin', this._visible);
                            this.q.attachEvent('onfocusout', this._hidden);
                        }
                    }
                } else { /*switch support based on prefix*/
                    this.q.addEventListener(this.cachedPrefix + this.props[1], function () {
                        window.visibly._nativeSwitch.apply(window.visibly, arguments);
                    }, 1);
                }
            } catch (e) {}
        },
        init: function () {
            this._getPrefix();
            this._listen();
        }
    };

    this.visibly.init();
})();