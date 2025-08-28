let audioContext;
const soundBuffers = {};

export  function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    loadSound('order_placed.mp3');
    //loadSound('order_placed.mp3');
  }
}

export  async function loadSound(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    soundBuffers[url] = audioBuffer;
  } catch (error) {
    console.error(`Error loading sound: ${url}`, error);
  }
}

export  function playSound(url) {
  if (audioContext && soundBuffers[url]) {
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffers[url];
    source.connect(audioContext.destination);
    source.start(0);
  }
}

document.body.addEventListener('click', initAudio, { once: true });
