import React, { useEffect, useState } from "react";
import "babel-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = ({ setDesc, setLang }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: lang,
    });
  };

  useEffect(() => {
    setDesc(transcript);
  }, [transcript]);

  const [use, setuse] = useState(true);
  const [lang, setlang] = useState("en");

  //   useEffect(() => {
  //     setLang(lang)
  //   },[lang])
  return !use ? (
    !lang ? (
      <button
        onClick={() => {
          setlang("hi");
        }}
        className=" py-1 px-3 bg-slate-100/0  border-2 border-green-600 text-green-600 hover:text-slate-100 hover:bg-green-600 rounded-2xl transition-all"
      >
        Use speech recognition
      </button>
    ) : (
      <div className=" flex flex-row gap-2  justify-center items-center">
        {/* <button onClick={()=>{
            setlang("hi")
            setuse(true)
        }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>Hindi</button> */}
        {/* <button onClick={()=>{
            setlang("mwr")
            setuse(true)
        }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>Marwari</button> */}
        <button
          onClick={() => {
            setlang("en");
            setuse(true);
          }}
          className=" py-1 px-3 bg-slate-100/0 border-2 border-green-600 text-green-600 hover:text-slate-100 hover:bg-green-600 rounded-2xl transition-all"
        >
          English
        </button>
      </div>
    )
  ) : (
    <div className=" flex flex-row mt-6 gap-2 w-fit px-4 justify-center items-center">
      <p className=" text-xs flex font-medium">
        {listening ? (
          <img src="/unmute.png" alt="" />
        ) : (
          <img src="/mute.png" alt="" />
        )}{" "}
      </p>
      <div className=" flex flex-row gap-4 ">
        <button
          className=" py-1 px-3 bg-slate-100/0  border-2 border-green-600 text-green-600 hover:text-slate-100 hover:bg-green-600 rounded-2xl transition-all"
          onClick={() => {
            listening
              ? SpeechRecognition.stopListening()
              : listenContinuously();
          }}
        >
          {listening ? "Mute" : "Unmute"}
        </button>
        {/* <button className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all' onClick={SpeechRecognition.stopListening}>Stop</button>
      <button className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all' onClick={resetTranscript}>Reset</button> */}
      </div>
    </div>
  );
};
export default Dictaphone;
