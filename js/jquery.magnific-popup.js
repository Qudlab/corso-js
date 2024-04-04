(function(a) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], a) :
      typeof exports == "object" ? a(require("jquery")) :
      a(window.jQuery || window.Zepto)
  })(function(a) {
    "use strict";
    var b = "Close",
      c = "BeforeClose",
      d = "AfterClose",
      e = "BeforeAppend",
      f = "MarkupParse",
      g = "Open",
      h = "Change",
      i = "mfp",
      j = "." + i,
      k = "mfp-ready",
      l = "mfp-removing",
      m = "mfp-prevent-close",
      n, o = function() {},
      p = !!window.jQuery,
      q, r = a(window),
      s, t, u, v,
      w = function(a, b) {
        "use strict";
        n.ev.on(i + a + j, b)
      },
      x = function(b, c, d, e) {
        "use strict";
        var f = document.createElement("div");
        return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
      },
      y = function(b, c) {
        "use strict";
        n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
      },
      z = function(b) {
        "use strict";
        if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
        return n.currTemplate.closeBtn
      },
      A = function() {
        "use strict";
        a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
      },
      B = function() {
        "use strict";
        var a = document.createElement("p").style,
          b = ["ms", "O", "Moz", "Webkit"];
        if (a.transition !== undefined) return !0;
        while (b.length)
          if (b.pop() + "Transition" in a) return !0;
        return !1
      };
    o.prototype = {
      constructor: o,
      init: function() {
        "use strict";
        var b = navigator.appVersion;
        n.isLowIE = n.isIE8 = document.all && !document.addEventListener, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
      },
      open: function(b) {
        "use strict";
        var c;
        if (b.isObj === !1) {
          n.items = b.items.toArray(), n.index = 0;
          var d = b.items,
            e;
          for (c = 0; c < d.length; c++) {
            e = d[c], e.parsed && (e = e.el[0]);
            if (e === b.el[0]) {
              n.index = c;
              break
            }
          }
        } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
        if (n.isOpen) {
          n.updateItemHTML();
          return
        }
        n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function() {
          "use strict";
          n.close()
        }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function(a) {
          "use strict";
          n._checkIfClose(a.target) && n.close()
        }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
        var h = a.magnificPopup.modules;
        for (c = 0; c < h.length; c++) {
          var i = h[c];
          i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
        }
        y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function(a, b, c, d) {
          "use strict";
          c.close_replaceWith = z(d.type)
        }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
          overflow: n.st.overflowY,
          overflowX: "hidden",
          overflowY: n.st.overflowY
        }) : n.wrap.css({
          top: r.scrollTop(),
          position: "absolute"
        }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
          height: s.height(),
          position: "absolute"
        }), n.st.enableEscapeKey && s.on("keyup" + j, function(a) {
          "use strict";
          a.keyCode === 27 && n.close()
        }), r.on("resize" + j, function() {
          "use strict";
          n.updateSize()
        }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
        var l = n.wH = r.height(),
          o = {};
        if (n.fixedContentPos && n._hasScrollBar(l)) {
          var p = n._getScrollbarSize();
          p && (o.marginRight = p)
        }
        n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : o.overflow = "hidden");
        var t = n.st.mainClass;
        return n.isIE7 && (t += " mfp-ie7"), t && n._addClassToMFP(t), n.updateItemHTML(), y("BuildControls"), a("html").css(o), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function() {
          "use strict";
          n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
        }, 16), n.isOpen = !0, n.updateSize(l), y(g), b
      },
      close: function() {
        "use strict";
        if (!n.isOpen) return;
        y(c);
        var b = n.st.removalDelay === !0 ? 0 : n.st.removalDelay;
        n.isLowIE && (b = 0), setTimeout(function() {
          "use strict";
          n._close()
        }, b)
      },
      _close: function() {
        "use strict";
        y(d);
        var b = ".mfp-" + n.currTemplate.type;
        n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (n._removeClassFromMFP(n.st.mainClass), n._removeClassFromMFP(k)), n.isOpen = !1, n.st.closeBtnInside && n.currTemplate.closeBtn && (n.currTemplate.closeBtn.length && n.currTemplate.closeBtn.removeClass("mfp-close-btn-in"), n.currTemplate.closeBtn = null), y(h)
      },
      updateSize: function(a) {
        "use strict";
        if (n.isIOS) {
          var b = document.documentElement.clientWidth / window.innerWidth,
            c = window.innerHeight * b;
          n.wrap.css("height", c), n.wH = c
        } else n.wH = a || r.height();
        n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
      },
      updateItemHTML: function() {
        "use strict";
        var b = n.items[n.index];
        n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
        var c = b.type;
        if (y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b, !n.currTemplate[c]) {
          var d = n.st[c] ? n.st[c].markup : !1;
          y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
        }
        if (u && a.magnificPopup.instance.st.showCloseBtn && n.currTemplate[c].find(".mfp-close").length === 0 && n.currTemplate[c].append(z()), n.currTemplate[c].find("[data-mfp-src]").length) {
          var e = n.currTemplate[c].find("[data-mfp-src]"),
            f = 0;
          for (; f < e.length; f++) {
            var g = a(e[f]);
            g.attr("src", g.attr("data-mfp-src"))
          }
        }
        n._parseMarkup(n.currTemplate[c], {
          title: b.title,
          index: n.index
        }), n.updateStatus("ready")
      }
    }, a.magnificPopup = {
      instance: null,
      proto: o.prototype,
      modules: [],
      open: function(b, c) {
        "use strict";
        return A(), b || (b = {}), b.isObj = !0, b.index = c || 0, this.instance.open(b)
      },
      close: function() {
        "use strict";
        return a.magnificPopup.instance && a.magnificPopup.instance.close()
      },
      registerModule: function(b, c) {
        "use strict";
        c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading..."
      }
    }, a.fn.magnificPopup = function(b) {
      "use strict";
      A();
      var c = a(this);
      if (typeof b == "string") {
        if (b === "open") {
          var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
            f = parseInt(arguments[1], 10) || 0;
          e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
            mfpEl: d
          }, c, e)
        } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        return
      }
      return b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, b.mainEl = c, b.items ? (b.isObj = !0, c.off("click" + j).on("click" + j, function() {
        "use strict";
        b.isObj = !1, n._openClick({
          mfpEl: a(this)
        }, c, b)
      })) : (b.isObj = !1, n._openClick({
        mfpEl: c
      }, c, b)), c
    }
  });
  