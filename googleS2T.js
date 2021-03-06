// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();


const filename = process.env.PATH_TO_SAMPLE_DATA;
const encoding = 'FLAC';
const sampleRateHertz = 8000;
const languageCode = 'en-US';
const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: `, transcription);
    fs.writeFile('test.json', JSON.stringify(response), 'utf-8');
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
