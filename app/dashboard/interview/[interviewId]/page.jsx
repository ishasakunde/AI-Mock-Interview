"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                setLoading(true);
                const result = await db.select().from(MockInterview)
                    .where(eq(MockInterview.mockId, params.interviewId));

                if (result.length > 0) {
                    setInterviewData(result[0]);
                } else {
                    setError('Interview data not found.');
                }
            } catch (err) {
                setError('An error occurred while fetching interview details.');
            } finally {
                setLoading(false);
            }
        };

        fetchInterviewDetails();
    }, [params.interviewId]);

    const handleWebCamToggle = () => {
        setWebCamEnabled(prevState => !prevState);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {interviewData && (
                    <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
                        <div className='flex flex-col p-5 rounded-lg border gap-5'>
                            <h2 className='text-lg'>
                                <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                            </h2>
                            <h2 className='text-lg'>
                                <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                            </h2>
                            <h2 className='text-lg'>
                                <strong>Years of Experience:</strong> {interviewData.jobExperience}
                            </h2>
                        </div>
                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-700'>
                                <Lightbulb />
                                <strong>Information</strong>
                            </h2>
                            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </div>
                    </div>
                )}

                <div>
                    {webCamEnabled ? (
                        <Webcam
                            audio={true}
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className="w-full" onClick={handleWebCamToggle}>
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='flex justify-end items-center mt-5'>
                <Link href={`/dashboard/interview/${params.interviewId}/start`} passHref>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;





// "use client"

// import { Button } from '@/components/ui/button'
// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import { Lightbulb, WebcamIcon } from 'lucide-react'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'

// function Interview({ params }) {
//     const [interviewData, setInterviewData] = useState(null);
//     const [webCamEnabled, setWebCamEnabled] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchInterviewDetails = async () => {
//             try {
//                 setLoading(true);
//                 const result = await db.select().from(MockInterview)
//                     .where(eq(MockInterview.mockId, params.interviewId));

//                 if (result.length > 0) {
//                     setInterviewData(result[0]);
//                 } else {
//                     setError('Interview data not found.');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching interview details.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInterviewDetails();
//     }, [params.interviewId]);

//     const handleWebCamToggle = () => {
//         setWebCamEnabled(prevState => !prevState);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className='my-10 '>
//             <h2 className='font-bold text-2xl'>Let's Get Started</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

//             {interviewData && (
//                 <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
//                     <div className='flex flex-col p-5 rounded-lg border gap-5'>
//                         <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
//                         <h2 className='text-lg'><strong>Job Description/Tech Stak:</strong> {interviewData.jobDesc}</h2>
//                         <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
//                     </div>
//                     <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
//                        <h2 className='flex gap-2 items-center text-yellow-700'><Lightbulb/><strong>Information</strong></h2>
//                        <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//                     </div>
//                 </div>
//             )}
            

//             <div>
//                 {webCamEnabled ? (
//                     <Webcam
//                         onUserMedia={() => setWebCamEnabled(true)}
//                         onUserMediaError={() => setWebCamEnabled(false)}
//                         mirrored={true}
//                         style={{
//                             height: 300,
//                             width: 300
//                         }}
//                     />
//                 ) : (
//                     <>
//                         <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
//                         <Button variant="ghost" className="w-full" onClick={handleWebCamToggle}>Enable Web Cam and Microphone</Button>
//                     </>
//                 )}
//             </div>

//             </div>
//             <div>
//                 <div className='flex justify-end items-center'>
//                     <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
//                     <Button >Start Interview</Button>
//                     </Link>
//                 </div> 
//             </div>

            

           
//         </div>
//     );
// }

// export default Interview;



// "use client"
// import { Button } from '@/components/ui/button'
// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import { WebcamIcon } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'

// function Interview({params}) {

//     const [interviewData,setInterviewData]=useState();
//     const [webCamEnabled,setWebCamEnabled]=useState(false);
//     useEffect(()=>{
//        console.log(params.interviewId)
//        GetInterviewDetails();
//     },[])
//     /**
//      * Used to get Interview Details by MockId/Interview Id
//      */

//     const GetInterviewDetails=async()=>{
//         const result=await db.select().from(MockInterview)
//         .where(eq(MockInterview.mockId,params.interviewId))

//         setInterviewData(result[0]);
//     }
//   return (
//     <div className='my-10 flex justify-center flex-col items-center'>
//         <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        
    
//         <div>
//            {webCamEnabled? < Webcam
//            onUserMedia={()=>setWebCamEnabled(true)}
//            onUserMediaError={()=>setWebCamEnabled(false)}
//            mirrored={true}
//             style={{
//                 height:300,
//                 width:300
//             }}
//            /> 
//            :
//            <>
//            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
//            <Button onClick={()=>setWebCamEnabled(true)} >Enable Web Cam and Microphone</Button>
//            </>
//          }
//          </div>
//          <div className='flex flex-col my-5'>
//             <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
//          </div>
          
//     </div>
//   )
// }

// export default Interview