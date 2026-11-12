(function () {
  if (window.location.pathname.indexOf("/admin") === 0) return;

  var ALLOW_KEY = "sai_bbc_push_allowed";
  var SILENCE_KEY = "sai_bbc_silenced_slug";
  var NOTIFIED_KEY = "sai_bbc_notified_slug";
  var POLL_MS = 30000;

  var items = [];
  var tickerIdx = 0;
  var tickerPaused = false;
  var swReg = null;

  function registerSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(function (reg) {
        swReg = reg;
      }).catch(function () {});
    }
  }

  function fireBrowserNotification(story) {
    if (!story || !("Notification" in window) || Notification.permission !== "granted") return;
    var title = "BREAKING · SMARTAI News";
    var opts = {
      body: story.title,
      icon: "/favicon-192x192.png",
      badge: "/assets/sai-push-icon.svg",
      image: story.image || undefined,
      tag: "sai-" + story.slug,
      data: { url: story.url }
    };
    if (swReg && swReg.showNotification) {
      swReg.showNotification(title, opts).catch(function () {});
    } else {
      try {
        var n = new Notification(title, opts);
        n.onclick = function () { window.location.href = story.path; };
      } catch (e) {}
    }
  }

  function timeAgo(pubDateStr) {
    if (!pubDateStr) return "Just in";
    var diffMin = Math.max(1, Math.round((Date.now() - new Date(pubDateStr).getTime()) / 60000));
    if (!isFinite(diffMin) || diffMin < 2) return "Just now";
    if (diffMin < 60) return diffMin + "m ago";
    var hrs = Math.floor(diffMin / 60);
    if (hrs < 24) return hrs + "h ago";
    return Math.floor(hrs / 24) + "d ago";
  }

  function formatUtcClock() {
    var d = new Date();
    var hh = String(d.getUTCHours()).padStart(2, "0");
    var mm = String(d.getUTCMinutes()).padStart(2, "0");
    return hh + ":" + mm + " UTC";
  }

  function shortCategory(cat, slug) {
    if (cat) {
      if (/Security/i.test(cat)) return "Security";
      if (/Business/i.test(cat)) return "Business";
      if (/Sports|Football/i.test(cat)) return "Sport";
      if (/Tech/i.test(cat)) return "Tech";
      if (/World/i.test(cat)) return "World";
      if (/US News/i.test(cat)) return "US News";
    }
    if (/senate|ibm|coreweave|infineon|cpi|berkshire|vodafone/.test(slug)) return "Business";
    if (/fairford|mildenhall|bessent|army|hegseth|iran-war/.test(slug)) return "Security";
    if (/football|basra|wenger|chelsea|curry|bills|van-dijk/.test(slug)) return "Sport";
    return "Latest";
  }

  var tickerStageEl, tickerLinkEl, tickerSecEl, tickerAgeEl, tickerClockEl;

  function mountTopTicker() {
    var navEl = document.querySelector("header nav, nav.nav, body > nav");
    if (!navEl || document.getElementById("bbc-top-ticker")) return;

    var bar = document.createElement("div");
    bar.id = "bbc-top-ticker";
    bar.className = "bbc-top-ticker is-breaking-mode";
    bar.innerHTML =
      '<div class="bbc-ticker-wrap">' +
        '<span class="bbc-ticker-badge"><span class="bbc-live-dot"></span>LATEST</span>' +
        '<span class="bbc-ticker-clock" id="bbc-t-clock">' + formatUtcClock() + '</span>' +
        '<div class="bbc-ticker-stage" id="bbc-t-stage">' +
          '<span class="bbc-ticker-sec" id="bbc-t-sec">BREAKING</span>' +
          '<a class="bbc-ticker-link" id="bbc-t-link" href="/articles/">Latest SMARTAI News headlines</a>' +
          '<span class="bbc-ticker-age" id="bbc-t-age"></span>' +
        '</div>' +
      '</div>';

    navEl.insertAdjacentElement("afterend", bar);

    tickerStageEl = document.getElementById("bbc-t-stage");
    tickerLinkEl = document.getElementById("bbc-t-link");
    tickerSecEl = document.getElementById("bbc-t-sec");
    tickerAgeEl = document.getElementById("bbc-t-age");
    tickerClockEl = document.getElementById("bbc-t-clock");

    bar.addEventListener("mouseenter", function () { tickerPaused = true; });
    bar.addEventListener("mouseleave", function () { tickerPaused = false; });

    setInterval(function () {
      if (tickerClockEl) tickerClockEl.textContent = formatUtcClock();
    }, 15000);

    setInterval(function () {
      if (!tickerPaused && items.length > 1) {
        tickerIdx = (tickerIdx + 1) % Math.min(items.length, 6);
        renderTickerItem(true);
      }
    }, 3600);
  }

  function renderTickerItem(animate) {
    if (!items.length || !tickerLinkEl) return;
    var apply = function () {
      var it = items[tickerIdx % items.length];
      tickerSecEl.textContent = tickerIdx === 0 ? "BREAKING" : it.section;
      tickerLinkEl.textContent = it.title;
      tickerLinkEl.href = it.path;
      tickerAgeEl.textContent = "· " + it.age;
    };
    if (animate && tickerStageEl) {
      tickerStageEl.classList.add("is-flipping");
      setTimeout(function () {
        apply();
        tickerStageEl.classList.remove("is-flipping");
      }, 220);
    } else {
      apply();
    }
  }

  var bannerEl, bnLinkEl, bnHeadlineEl, bnAgeEl, bnAllowBtn;
  var ICON_CLOSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  function isPushAllowed() {
    return localStorage.getItem(ALLOW_KEY) === "1" ||
      ("Notification" in window && Notification.permission === "granted");
  }

  function mountBottomBanner() {
    if (document.getElementById("bbc-breaking-banner")) return;

    bannerEl = document.createElement("div");
    bannerEl.id = "bbc-breaking-banner";
    bannerEl.className = "bbc-breaking-banner";
    bannerEl.setAttribute("role", "region");
    bannerEl.setAttribute("aria-label", "Breaking news alert");

    bannerEl.innerHTML =
      '<div class="bbc-bn-inner">' +
        '<a class="bbc-bn-main" id="bbc-bn-link" href="/">' +
          '<span class="bbc-bn-aston"><span class="bbc-bn-aston-dot"></span>Breaking</span>' +
          '<span class="bbc-bn-headline" id="bbc-bn-hl"></span>' +
          '<span class="bbc-bn-meta"><span id="bbc-bn-age"></span><span class="bbc-bn-chevron">›</span></span>' +
        '</a>' +
        '<div class="bbc-bn-actions">' +
          '<button type="button" class="bbc-bn-allow' + (isPushAllowed() ? ' is-hidden' : '') + '" id="bbc-bn-allow">Allow</button>' +
          '<button type="button" class="bbc-bn-icon-btn" id="bbc-bn-close" title="Close breaking news" aria-label="Close breaking news">' +
            ICON_CLOSE +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(bannerEl);

    bnLinkEl = document.getElementById("bbc-bn-link");
    bnHeadlineEl = document.getElementById("bbc-bn-hl");
    bnAgeEl = document.getElementById("bbc-bn-age");
    bnAllowBtn = document.getElementById("bbc-bn-allow");

    bnAllowBtn.addEventListener("click", function () {
      registerSW();
      localStorage.setItem(ALLOW_KEY, "1");
      bnAllowBtn.textContent = "Allowed";
      setTimeout(function () { bnAllowBtn.classList.add("is-hidden"); }, 450);

      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          if (items[0]) {
            localStorage.setItem(NOTIFIED_KEY, items[0].slug);
            fireBrowserNotification(items[0]);
          }
        } else {
          try {
            Notification.requestPermission().then(function (perm) {
              if (perm === "granted" && items[0]) {
                localStorage.setItem(NOTIFIED_KEY, items[0].slug);
                fireBrowserNotification(items[0]);
              }
            });
          } catch (e) {}
        }
      }
    });

    document.getElementById("bbc-bn-close").addEventListener("click", function () {
      if (items[0]) localStorage.setItem(SILENCE_KEY, items[0].slug);
      bannerEl.classList.remove("is-visible");
    });
  }

  function pollRssFeed() {
    fetch("/rss.xml", { cache: "no-store" })
      .then(function (r) { return r.text(); })
      .then(function (xml) {
        var doc = new DOMParser().parseFromString(xml, "application/xml");
        var nodes = Array.prototype.slice.call(doc.querySelectorAll("item"), 0, 8);
        if (!nodes.length) return;

        items = nodes.map(function (n) {
          var title = (n.querySelector("title") && n.querySelector("title").textContent) || "";
          var link = (n.querySelector("link") && n.querySelector("link").textContent) || "/";
          var pub = (n.querySelector("pubDate") && n.querySelector("pubDate").textContent) || "";
          var cat = (n.querySelector("category") && n.querySelector("category").textContent) || "";
          var media = n.getElementsByTagName("media:content")[0];
          var img = (media && media.getAttribute("url")) || "";
          var path = "/";
          try { path = new URL(link, window.location.origin).pathname; } catch (e) {}
          var slug = path.replace(/^\/articles\/|\/$/g, "") || "latest";
          return {
            title: title,
            url: link,
            path: path,
            slug: slug,
            image: img,
            age: timeAgo(pub),
            section: shortCategory(cat, slug)
          };
        });

        renderTickerItem(false);

        var top = items[0];
        bnLinkEl.href = top.path;
        bnHeadlineEl.textContent = top.title;
        bnAgeEl.textContent = top.age;

        var silencedSlug = localStorage.getItem(SILENCE_KEY);
        var onSameStory = window.location.pathname === top.path;

        if (!onSameStory && silencedSlug !== top.slug) {
          setTimeout(function () {
            bannerEl.classList.add("is-visible");
          }, 220);
        } else {
          bannerEl.classList.remove("is-visible");
        }

        // Auto-fire native browser notification when a brand-new #1 story lands in rss.xml
        if (isPushAllowed()) {
          var prevNotified = localStorage.getItem(NOTIFIED_KEY);
          if (!prevNotified) {
            localStorage.setItem(NOTIFIED_KEY, top.slug);
          } else if (prevNotified !== top.slug) {
            localStorage.setItem(NOTIFIED_KEY, top.slug);
            fireBrowserNotification(top);
          }
        }
      })
      .catch(function () {});
  }

  document.addEventListener("DOMContentLoaded", function () {
    registerSW();
    mountTopTicker();
    mountBottomBanner();
    pollRssFeed();
    setInterval(pollRssFeed, POLL_MS);
  });
})();
