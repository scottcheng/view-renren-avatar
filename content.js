// View Renren Avatar by Scott Cheng
// Content script

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

var $avatar = $('#userpic');
var $parent = $avatar.parent();
if (!$parent.is('a')) {
  $parent.css('position', 'relative');
  var $a = $('<a />')
    .attr({
      href: getAvatarUrl(window.location.href),
      title: chrome.i18n.getMessage('viewText')
    })
    .append($avatar)
    .appendTo($parent);
  $('<div />')
    .css({
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    })
    .html(chrome.i18n.getMessage('viewText'))
    .appendTo($a);
}
