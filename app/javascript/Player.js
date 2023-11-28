var Player = {
  url: "rtp://239.200.0.7:1234",
  TVPlayer: null,
  state: -1,
  STOPPED: 0,
  PLAYING: 1,
  PAUSED: 2,
};
var channels = [
  "http://10.10.41.157/videos/Argentina.mp4",
  "rtp://239.200.0.1:1234",
  "rtp://239.200.0.2:1234",
  "rtp://239.200.0.3:1234",
  "rtp://239.200.0.8:1234",
];
var playCB = {
  // onError: function (error) {
  //   appendLog("onError Channel Not Available");
  //   alert(" onError Channel Not Available");
  // },
  onerror: function (error) {
    appendLog("onError Channel Not Available");
    alert(" onError Channel Not Available");
  },
  onstreamnotfound: function (error) {
    appendLog("onstreamnotfound");
    alert("onstreamnotfound");
  },
  onrendererror: function (error) {
    appendLog("onrendererror");
    alert("onrendererror");
  },
};

Player.init = function () {
  var success = true;
  try {
    webapis.avplay.getAVPlay(Player.onAVPlayObtained, Player.onGetAVPlayError);
  } catch (e) {
    appendLog("getAVplay Exception :[" + e.code + "] " + e.message);
  }
  return success;
};

Player.onAVPlayObtained = function (avplay) {
  Player.TVPlayer = avplay;
  Player.TVPlayer.init({
    zIndex: 10,
    playCallback: playCB,
    displayArea: {
      top: 160,
      left: 586,
      width: 640,
      height: 360,
    },
    autoRatio: true,
  });
  appendLog("Player initialised");
  alert("Player initialised");
};

Player.onGetAVPlayError = function () {
  appendLog("onGetAVPlayError: " + error.message);
};

Player.onSuccess = function () {
  appendLog("Player.onSuccess");
  alert("Player.onSuccess");
};

Player.onError = function () {
  appendLog("Player.onError");
  alert("Player.onError HHHHHHHHHHHHHHHHHHHH");
};

Player.deinit = function () {
  alert("Deinitializing Player");
};

Player.setVideoURL = function (url) {
  this.url = url;
};

Player.playVideo = function () {
  appendLog("Player.playVideo");
  if (this.url == null) {
    appendLog("No videos to play");
  } else {
    appendLog("Laoding channel [" + this.url + "]");
    this.state = this.PLAYING;

    // Player.onAudioStream = 0;
    try {
      Player.TVPlayer.open(this.url);
      // Player.AVPlayer.play(Player.onSuccess, Player.onError, 5);
      Player.TVPlayer.play(Player.onSuccess, Player.onError, 5);

      //this.setWindow();
    } catch (e) {
      appendLog("Ici :" + e.message);
    }

    //Audio.plugin.Execute("SetSystemMute",false);
  }
};

function appendLog(message) {
  var logdiv = document.getElementById("logdiv");
  current = logdiv.innerHTML;
  logdiv.innerHTML = current + "<br>" + "<p>" + message + "</p>";
}
