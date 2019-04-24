/* ------------------------------------------------------------
  pc.js pandora提供的公共方法类
        亦即 pandora-common.js 为方便引用改为简短的pc.js
  Project: (参考易迅公共类)此实现要求功能实现必须全为原生js
  Create:  2013-11-06
  Updated: 2013-11-06
  Readme:  维护使用要参考pandora手册
------------------------------------------------------------ */

(function (global, $, G, undefined) {
    "use strict" // 严格模式
    
    G = {
        init: function() {
            G.initSite();
        },
        initSite: function() {
            G.site.browser();
        },
        site: {
            browser: function() {
            var a = G.common.browser(), b = G.common.css3test("Transition") ? "csstransitions" : "no-csstransitions", b = G.common.css3test("Animation") ? b + " cssanimations" : b + " no-cssanimations";
            document.getElementsByTagName("html")[0].className += (b + " ic_" + a.engine + " ic_" + a.browser + " ic_" + a.version);
            }
        },
        common: {
            browser: function() {
                function a() {
                    for (var a in e)
                        e[a] && (d.system = a)
                }
                var b = navigator.userAgent.toLowerCase(), c = window.opera, d = {engine: 0,system: 0,browser: 0,version: 0}, e = {}, g = {}, f = {}, h, e = {macintosh: -1 < b.indexOf("macintosh"),windows: -1 < b.indexOf("windows"),linux: -1 < b.indexOf("linux"),android: -1 < b.indexOf("android"),ipad: -1 < b.indexOf("ipad"),iphone: -1 < 
                    b.indexOf("iphone")}, g = {ie6: !window.XMLHttpRequest || f.quirk,ie7: g.ie6 && g.ie8,ie7Compat: 7 == document.documentMode,ie8: !!document.documentMode,ie8Compat: 8 == document.documentMode,ie9: 9 == document.documentMode}, f = {ie: !!window.ActiveXObject,quirk: "BackCompat" == document.compatMode,webkit: -1 < b.indexOf(" applewebkit/"),opera: !!c && c.version,gecko: "Gecko" == navigator.product && !f.webkit && !f.opera};
                if (f.ie)
                    for (h in g)
                        if (g[h])
                            return d.engine = "ie", d.browser = h, d.version = parseInt(b.match(/msie (\d+)/)[1]), a(), d;
                if (f.webkit)
                    return -1 < 
                    b.indexOf("safari") ? -1 < b.indexOf("chrome") ? (d.browser = "chrome", d.version = "latest") : (d.browser = "safari", d.version = parseInt(b.match(/ applewebkit\/(\d+)/)[1])) : (d.browser = "webkit", d.version = "unknown"), d.engine = "webkit", a(), d;
                if (f.opera)
                    return d.engine = "opera", d.browser = "opera", d.version = parseInt(c.version()), a(), d;
                f.gecko && (-1 < b.indexOf("firefox") ? (d.browser = "firefox", d.version = b.match(/rv:(\d+)/)[1]) : (d.browser = "unknown", d.version = "unknown"), d.engine = "gecko", a());
                return d
            },css3test: function(a) {
                var b = 
                document.createElement("div"), c = ["Khtml", "Ms", "O", "Moz", "Webkit"], d = c.length - 1;
                if (a in b.style)
                    return !0;
                a = a.replace(/^[a-z]/, function(a) {
                    return a.toUpperCase()
                });
                for (d = c.length - 1; 0 <= d; ) {
                    if (c[d] + a in b.style)
                        return !0;
                    d--
                }
                return !1
            }
        }
    }
    
    G.init();
    global.G = G;
}(this, this.jQuery || {}, this.G || {}));
