// View Renren Avatar by Scott Cheng
// Background script

var _gaq = _gaq || [];
// _gaq.push(['_setAccount', '']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();


var parseUrlParam = function(url) {
  var queryString = url.split('?')[1];
  var pairs = queryString.split('&');
  var ret = {};
  var len = pairs.length;
  for (var i = 0; i < len; i++) {
    var kv = pairs[i].split('=');
    ret[kv[0]] = kv[1];
  }
  return ret;
};


// Add context menu
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('viewText'),
  contexts: ['link'],
  documentUrlPatterns: ['*://*.renren.com/*'],
  targetUrlPatterns: ['*://www.renren.com/*'],
  onclick: function(info, tab) {
    var avatarUrl = getAvatarUrl(info.linkUrl);
    viewAvatar(avatarUrl);
  }
});

var getAvatarUrl = function(profileUrl) {
  var id;
  if (profileUrl.indexOf('www.renren.com/profile.do') >= 0) {
    // www.renren.com/profile.do?id=:id
    var param = parseUrlParam(profileUrl);
    id = param.id;
  } else if (profileUrl.indexOf('www.renren.com/g/') >= 0) {
    // www.renren.com/g/:id
    id = profileUrl.match(/\/g\/\d+/)[0].split('/')[2];
  } else {
    // www.renren.com/:id
    // www.renren.com/:id/profile
    var matchRes = profileUrl.match(/www.renren.com\/\d+/);
    matchRes && (id = matchRes[0].split('/')[1]);
  }
  if (id) {
    return 'http://photo.renren.com/getalbumprofile.do?owner=' + id;
  }
  return 'http://photo.renren.com/';
};

var viewAvatar = function(url) {
  _gaq.push(['_trackEvent', 'ViewAvatar', 'clickMenuItem', url]);
  window.open(url);
};
