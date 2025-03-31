"use client";
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Camera, Mic, FileVideo, Languages, Loader } from 'lucide-react';
// import { PiTranslate } from "react-icons/pi";

const Home: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('th');
  const [showLanguages, setShowLanguages] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setVideoSrc(videoUrl);
        processVideo();
      };
      
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      
      // Stop all video tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  };

  const processVideo = () => {
    setProcessing(true);
    
    // Mock API call to process the video
    // In a real implementation, we would send the videoBlob to a server for processing
    // For example:
    // const formData = new FormData();
    // formData.append('video', videoBlob);
    // fetch('/api/translate-sign-language', {
    //   method: 'POST',
    //   body: formData
    // })
    
    setTimeout(() => {
      // Simulated response
      const mockSignLanguageTranslation = "Hello, today I ate very delicious food.";
      setTranslatedText(mockSignLanguageTranslation);
      setProcessing(false);
    }, 2000);
  };

  const translateToLanguage = (language: string) => {
    setTargetLanguage(language);
    setShowLanguages(false);
    
    // Mock translation API call
    const translations: Record<string, string> = {
        th: "สวัสดีครับ วันนี้ผมกินข้าวอร่อยมาก",
        en: "Hello, today I ate very delicious food.",
        ja: "こんにちは、今日はとても美味しい食事をしました。",
        zh: "你好，今天我吃了非常美味的饭。",
        ko: "안녕하세요, 오늘 매우 맛있는 밥을 먹었습니다."
    };
    
    setTranslatedText(translations[language] || translations.th);
  };

  const languageOptions = [
    { code: 'th', name: 'Thai' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ko', name: 'Korean' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Thai Sign Language Translator</title>
        <meta name="description" content="Translate Thai Sign Language to text" />
      </Head>

      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8 text-indigo-700">
          Deep Learning for the translation of Thai Sign Language
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Video Preview Section */}
            <div className="w-full md:w-1/2">
              <div className="bg-gray-100 rounded-lg aspect-video relative overflow-hidden">
                {videoSrc ? (
                  <video 
                    ref={videoRef}
                    src={videoSrc} 
                    className="w-full h-full object-cover" 
                    controls
                  />
                ) : (
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    playsInline
                  />
                )}
                
                {!recording && !videoSrc && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                    <Camera size={64} className="text-gray-400 mb-2" />
                    <p className="text-gray-500">Press the Record button to start sign language translation</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-center">
                {!recording ? (
                  <button 
                    onClick={startRecording} 
                    disabled={processing}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full flex items-center gap-2"
                  >
                    <Camera size={20} />
                    Start Recording
                  </button>
                ) : (
                  <button 
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full flex items-center gap-2"
                  >
                    <FileVideo size={20} />
                    Stop Recording
                  </button>
                )}
              </div>
            </div>
            
            {/* Translation Section */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg">Translation Result</h2>
                  <div className="relative">
                    <button 
                      onClick={() => setShowLanguages(!showLanguages)}
                      className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Languages size={20} />
                      {languageOptions.find(lang => lang.code === targetLanguage)?.name}
                    </button>
                    
                    {showLanguages && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 z-10 min-w-40">
                        {languageOptions.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => translateToLanguage(lang.code)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 min-h-32 border border-gray-200">
                  {processing ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader size={24} className="animate-spin text-indigo-600 mr-2" />
                      <span>Processing...</span>
                    </div>
                  ) : translatedText ? (
                    <p>{translatedText}</p>
                  ) : (
                    <p className="text-gray-400 text-center">
                      No translation yet. Record a video to begin.
                    </p>
                  )}
                </div>
              </div>
              
              {translatedText && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Options</h3>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 font-bold hover:bg-indigo-700 text-white py-2 px-4 rounded-xl flex items-center gap-2">
                      <Mic size={18} />
                      Text to Speech
                    </button>
                    {/* <button className="bg-green-600 font-bold hover:bg-green-700 text-white py-2 px-4 rounded-xl flex items-center gap-2">
                      <PiTranslate size={18} />
                      Translate to Other Languages
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Usage Instructions</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Press the Start Recording button to activate the camera</li>
            <li>Make sign language gestures within the camera frame</li>
            <li>Press the Stop Recording button when you want to stop and process</li>
            <li>Wait for the sign language to be translated into text</li>
            <li>You can select translation to other languages as needed</li>
          </ol>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-gray-500 pb-4">
        <p>© 2025 Thai Sign Language Translator </p>
      </footer>
    </div>
  );
};

export default Home;