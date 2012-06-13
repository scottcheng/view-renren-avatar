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
  for (var i in pairs) {
    var kv = pairs[i].split('=');
    ret[kv[0]] = kv[1];
  }
  return ret;
};


// Add context menu
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('viewText'),
  contexts: ['link'],
  targetUrlPatterns: [
    '*://www.renren.com/profile.do?*',
    '*://www.renren.com/*/profile',
    '*://www.renren.com/*/profile?*',
    '*://www.renren.com/g/*'
  ],
  onclick: function(info, tab) {
    var avatarUrl = getAvatarUrl(info.linkUrl);
    viewAvatar(avatarUrl);
  }
});

var getAvatarUrl = function(profileUrl) {
  var id;
  if (profileUrl.indexOf('www.renren.com/profile.do') >= 0) {
    var param = parseUrlParam(profileUrl);
    id = param.id;
  } else if (profileUrl.indexOf('www.renren.com/g/') >= 0) {
    id = profileUrl.match(/\/g\/\d*/)[0].split('/')[2];
  } else {
    id = profileUrl.match(/\d*\/profile/)[0].split('/')[0];
  }
  return 'http://photo.renren.com/getalbumprofile.do?owner=' + id;
};

var viewAvatar = function(url) {
  _gaq.push(['_trackEvent', 'ViewAvatar', 'clickMenuItem', url]);
  window.open(url);
}
