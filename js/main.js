window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  });

  function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
    console.log("string");
    console.log(this);
  };

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));


// Record Sequence Button
// Create UL for PlayBack Button
// Listener when you click the button   onClick
// Track Index of Pressed Key
// Track Time from First Hit Record Button
// Create function to play sounds according to index & time pressed  { keyIndex: 0 , timePressed: 2000 }
  // Date object  (Date.now())
  // Track when current time is at "timePressed", do .play() on the keyIndex element --> (keys[keyIndex].play())
// Add onClick listener to playback button 