
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const apiKey1 = process.env.NEXT_PUBLIC_GEMINI_API_KEY1;
  const apiKey2 = process.env.NEXT_PUBLIC_GEMINI_API_KEY2;


  const genAI = new GoogleGenerativeAI(apiKey,apiKey1,apiKey2);

  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
   
    });



///////  


// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY1;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    
  // });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// // }


  
  