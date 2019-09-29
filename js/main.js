tracklistObject = [];

  function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  };

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition)}
  );

  const recordButton = document.querySelector('.record-button');
  // console.log(recordButton);

  let trackNumber = 0;
  let currentTime = 0;

  window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const keys = Array.from(document.querySelectorAll('.key'));
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');

    if(recordButton.innerHTML === "Stop Record"){
      let timePressed = Date.now();
      let timeStamp = timePressed - currentTime;

      tracklistObject.push(
        { 
          playIndex: keys.indexOf(key),
          timeStamp: timeStamp  
        }
      );
    }
  });

  function handlePlayback(e){
    // console.log("play button" , e.target);
    const keys = Array.from(document.querySelectorAll('.key'));
    const key = keys[tracklistObject[0].playIndex];
    console.log(tracklistObject[0].playIndex);
    console.log(keys);
    const keyCode = key.getAttribute('data-key');
    console.log("attribute", keyCode);
    //get attribute of data-key
    //pass data-key to audio
    //call audio.play()
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    console.log(audio);
    audio.play();

  }

  function recording() {
    console.log('click event happened, this function ran');

    console.log(recordButton.innerHTML);
    if(recordButton.innerHTML === "Record"){
      tracklistObject = [];
      currentTime = Date.now();
      console.log("Start Recording at.." + currentTime);
      recordButton.innerHTML = "Stop Record";
    }else{
      const li = document.createElement('li');
      const button = document.createElement('button');
      const paragraph = document.createElement('p');
      const ul = document.querySelector('.track-list');
  
      li.setAttribute('class','track-item');
      button.setAttribute('class','play-button');
      paragraph.setAttribute('class','track-text');
  
      trackNumber = trackNumber + 1;
  
      button.appendChild(document.createTextNode('Play'));
      paragraph.appendChild(document.createTextNode(`Track ${trackNumber}`));

      button.addEventListener('click', handlePlayback);
  
      li.appendChild(button);
      li.appendChild(paragraph);
  
      ul.appendChild(li);
      recordButton.innerHTML = "Record"
    }
  }
  
  recordButton.addEventListener('click', recording);




  // <ul class="track-list">
  //     <!-- <li class="track-item">
  //       <button class="play-button">Play</button>
  //       <p class="track-text">Track 1</p>
  //     </li>
  //     <li class="track-item">
  //       <button class="play-button">Play</button>
  //       <p class="track-text">Track 2</p>
  //     </li> -->
  //   </ul>

//           NEW
// Recording
// Add Recording To A List
// Play Recording From List


//           9-26
// Listener when you click the button   onClick
// Track Index of Pressed Key
// Track Time from First Hit Record Button
// Create function to play sounds according to index & time pressed  { keyIndex: 0 , timePressed: 2000 }
  // Date object  (Date.now())
  // Track when current time is at "timePressed", do .play() on the keyIndex element --> (keys[keyIndex].play())
// Add onClick listener to playback button 



// start time, take note at button press, add time between
// date time record   +   playback