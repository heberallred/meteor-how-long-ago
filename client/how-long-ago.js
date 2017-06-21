//return a nice English friendly "how long ago" for a date
howLong = function (date, agoOrUntil){
  if (agoOrUntil == undefined) agoOrUntil == 'ago';
  //log('howLong', 'Start');
  //console.log('how long ago start');
  if (Session.get('serverTimeOffset') == undefined){
    Meteor.call('serverTime', function(error, result){
      if (!error){
        Session.set('serverTimeOffset', new Date() - result);
      }
    });
    return '';
  }
  var now = new Date(Session.get('currentDateTime') - Session.get('serverTimeOffset'));
  var diff = (now - date);  //difference in seconds

  if (agoOrUntil == 'until') diff = -diff;
  var diffSeconds = diff / 1000;
  var diffMinutes = diffSeconds / 60;
  var diffHours = diffMinutes / 60;
  var diffDays = diffHours / 24;
  var suffix = agoOrUntil == 'ago' ? ' ago' : '';
  var prefix = agoOrUntil == 'until' ? 'in ' : '';

  if (diffSeconds < 60){
    return prefix + Math.trunc(diffSeconds) + " seconds" + suffix;
  }else if (diffDays >= 1.0){
    return prefix + Math.trunc(diffDays) + ' days' + suffix;
  }else if (diffHours >= 1.0){
    return prefix + Math.trunc(diffHours) + ' hours' + suffix;
  }else if (diffMinutes >= 1.0){
    return prefix + Math.trunc(diffMinutes) + ' minutes' + suffix;
  }
};

UI.registerHelper('serverTime', function() {
  return new Date(Session.get('currentDateTime') - Session.get('serverTimeOffset'));
});

Template.howLongAgo.helpers({
  data: function(){
    return howLong(this, 'ago');
  }
});

Template.howLongUntil.helpers({
  data: function(){
    return howLong(this,'until');
  }
});

// create a timer that updates a session variable each second (souldn't take too much processor, and will only refresh other stuff if they depend on this)
Meteor.setInterval(function(){
  Session.set('currentDateTime', new Date());
}, 1000);
Session.set('currentDateTime', new Date());