playableTrack = []; //one track that holds multiple objects (keyframes & timestamps) - each index is an object
listOfPlayableTracks = []; //holds the list of each track - each index is track
let timerIDs = []; //
let playingSoundFlag = false;
let trackNumber = 0;
let currentTime = 0;
const keys = Array.from(document.querySelectorAll('.key'));  


  function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  };

  // const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => {
      key.addEventListener('transitionend', removeTransition)
    }
  );

  const recordButton = document.querySelector('.record-button');
  // console.log(recordButton);



  window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);  // audio[data-key="65"]
    // const audio = document.querySelector("audio[data-key=" + e.keyCode + "]");  // audio[data-key="65"]
    // const keys = Array.from(document.querySelectorAll('.key'));
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');

    if(recordButton.innerHTML === "Stop Record"){
      let timePressed = Date.now();
      console.log('date now', Date.now());
      let timeStamp = timePressed - currentTime;
      console.log('timestamp', timeStamp);
      
      playableTrack.push(
        { 
          playIndex: keys.indexOf(key),
          timeStamp: timeStamp  
        }
      );
    }
  });


  function createScheduler(lastNote, audioElement, timeStamp){
    const timeoutID = setTimeout(() => {
      audioElement.currentTime = 0;
      audioElement.play();

      if(lastNote) {
        timerIDs = [];
      }
    }, timeStamp);

    return timeoutID;
  }

  function handlePlayback(e){
    if(timerIDs.length > 0){
      timerIDs.forEach((id) => clearTimeout(id));
    }
    // const keys = Array.from(document.querySelectorAll('.key'));

    const playableTrack = listOfPlayableTracks[trackNumber - 1];
    console.log(trackNumber);
    for(let i = 0; i < playableTrack.length; i++){
      const key = keys[playableTrack[i].playIndex];
      const keyCode = key.getAttribute('data-key');
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

      const timeStamp = playableTrack[i].timeStamp;
      const id = i === playableTrack.length ? createScheduler(false, audio, timeStamp) : createScheduler(true, audio, timeStamp)
      timerIDs.push(id);
    }
  }

  function recording() {
    if(recordButton.innerHTML === "Record"){
      playableTrack = [];
      currentTime = Date.now();
      console.log("Start Recording at.." + currentTime);
      recordButton.innerHTML = "Stop Record";
    }else{
      if(playableTrack.length > 0){
        const li = document.createElement('li');
        const button = document.createElement('button');
        const paragraph = document.createElement('p');
        const ul = document.querySelector('.track-list');
    
        li.setAttribute('class','track-item');
        button.setAttribute('class','play-button');
        paragraph.setAttribute('class','track-text');
    
        trackNumber = trackNumber + 1;
    
        // button.appendChild(document.createTextNode('Play'));
        button.innerHTML = 'Play';
        paragraph.appendChild(document.createTextNode(`Track ${trackNumber}`));
  
        button.addEventListener('click', handlePlayback);
    
        li.appendChild(button);
        li.appendChild(paragraph);
    
        ul.appendChild(li);
        recordButton.innerHTML = "Record"
        listOfPlayableTracks.push(playableTrack);
      }else{
        recordButton.innerHTML = "Record"
      }
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