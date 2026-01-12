export function useSpeech(onResult) {
  let recognition = null;

  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
  }

  const startListening = () => {
    if (recognition) recognition.start();
  };

  return { startListening };
}
