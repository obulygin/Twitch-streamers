$(document).ready(function() {
  
  getChannels();
  
  $('.filter-all').on('click', function() {
    $('.deleted, .offline, .online').css('display', '');
    $('.filter-all').addClass('btn-info');
    $('.filter-offline').removeClass('btn-danger');
    $('.filter-online').removeClass('btn-success');
  })
  
  $('.filter-online').on('click', function() {
    $('.deleted, .offline').css('display', 'none');
    $('.online').css('display', '');
    $('.filter-online').addClass('btn-success');
    $('.filter-offline').removeClass('btn-danger');
    $('.filter-all').removeClass('btn-info');
    
  });
  $('.filter-offline').on('click', function() {
    $('.online').css('display', 'none');
    $('.deleted, .offline').css('display', '');
    $('.filter-offline').addClass('btn-danger');
    $('.filter-online').removeClass('btn-success');
    $('.filter-all').removeClass('btn-info');
  });
  
})

var appendStream = function(status) {
  $('.streams').append('<a href="' + channelURL + '" target="_blank" class="' + status + '"><div class="thumbnail stream col-md-3 col-sm-6"><div class="channelLogo"><img src="' + logoURL + '" class="img-rounded img-responsive"></div><p class="channelName">' + name + '</p><p class="currentStream">' + currentStream + '</p></div></a>');
}

var getChannels = function() {
  var channels = ['FreeCodeCamp', 'brunofin', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
  channels.forEach(function(channel, index) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + channel,
      async: false,
      dataType: 'jsonp',
      success: function(streamData) {
        curchan = channel;
        if (streamData.stream != null) {
          channelURL = streamData.stream.channel.url;
          logoURL = streamData.stream.channel.logo;
          name = streamData.stream.channel.name;
          currentStream = 'Now streaming: ' + streamData.stream.game;
          appendStream('online');
        } else if (streamData.error) {
          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + channels[index],
            async: false,
            dataType: 'jsonp',
            success: function(channelData) {
              channelURL = '';
              logoURL = ' http://cdns2.freepik.com/free-photo/cross-mark_318-32569.jpg'
              name = channel;
              currentStream = 'Account closed or never existed';
              appendStream('deleted');
            }
          })
        } else if (streamData.stream === null) {
          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + channels[index],
            async: false,
            dataType: 'jsonp',
            success: function(channelData) {
              channelURL = channelData.url;
              logoURL = channelData.logo;
              name = channelData.name;
              currentStream = 'Offline'
              appendStream('offline');
            }
          })
        }
      }
    })
  })
}