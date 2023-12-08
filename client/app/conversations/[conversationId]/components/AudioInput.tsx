import React, { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';

const AudioInput = ({ conversationId }: { conversationId: string }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  useEffect(() => {
    const handleAudioSubmit = async () => {
      try {
        // Gửi voice message
        if (audioBlob) {
          const formData = new FormData();
          formData.set('audio', audioBlob);
          const audioUploadResponse = await axios.post(
            '/api/upload-audio',
            formData
          );

          // Lấy đường dẫn đến voice message từ API upload
          const id = audioUploadResponse.data.id;

          // Gửi tin nhắn với đường dẫn đến voice message
          await axios.post('/api/messages', {
            audio: `${process.env.NEXT_PUBLIC_API_URL}/audio/${id}`,
            conversationId: conversationId,
          });
        }
      } catch (error) {
        console.error('Error sending audio message:', error);
      }
    };

    if (audioBlob) {
      handleAudioSubmit();
    }
  }, [audioBlob, conversationId]);

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => setAudioBlob(blob)}
        recorderControls={recorderControls}
        downloadFileExtension='mp3'
        showVisualizer={true}
      />
    </div>
  );
};

export default AudioInput;
