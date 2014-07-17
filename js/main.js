
  
var video = document.querySelector('#myvideo');
var part = {};
var current = null;
var timeOut = null;
var isPlaying = false;

var hotspots = document.querySelectorAll('.hotspot');
var hotArray = Array.prototype.slice.call(hotspots);
var spotTop = document.querySelector('#top');
var spotRight = document.querySelector('#right');
var spotBottom = document.querySelector('#bottom');
var spotLeft = document.querySelector('#left');



video.addEventListener('loadedmetadata', function() {

  part.duration = video.duration / 8;

  part.top = {
    forward: {
      start: 0.1,
      end: part.duration
    },
    rewind: {
      start: part.duration,
      end: part.duration * 2
    }
  };

  part.right = {
    forward: {
      start: part.duration * 2,
      end: part.duration * 3
    },
    rewind: {
      start: part.duration * 3,
      end: part.duration * 4
    }
  };

  part.bottom = {
    forward: {
      start: part.duration * 4,
      end: part.duration * 5
    },
    rewind: {
      start: part.duration * 5,
      end: part.duration * 6
    }
  };

  part.left = {
    forward: {
      start: part.duration * 6,
      end: part.duration * 7
    },
    rewind: {
      start: part.duration * 7,
      end: part.duration * 8
    }
  };

});



hotArray.forEach(function(el) {
  el.addEventListener('mouseenter', function(evt) {
    var section = evt.target.id + '';
    console.log(section);
    playNext(part[section]);
  });
});




function fastforward(section, callback) {
  video.currentTime = section.forward.start;
  video.play();
  isPlaying = true;
  setTimeout(function() {
    video.pause();
    isPlaying = false;
    if(typeof callback === 'function') {
      callback();
    }
  }, part.duration * 1000);
  current = section;
}

function rewind(section, callback) {
  video.currentTime = section.rewind.start;
  video.play();
  isPlaying = true;
  setTimeout(function() {
    video.pause();
    isPlaying = false;
    if(typeof callback === 'function') {
      callback();
    }
  }, part.duration * 1000);
}

function playNext(newSection) {
  if(isPlaying) {
    setTimeout(function() {
      playNext(newSection);
    }, 30);
  }
  else if(current) {
    rewind(current, function() {
      fastforward(newSection);
    });
  }
  else {
    fastforward(newSection);
  }
}
