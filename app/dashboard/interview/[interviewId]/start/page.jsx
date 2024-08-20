"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [loading, setLoading] = useState(true); // Ensure initial loading state is true
    const [error, setError] = useState(null);
    const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        fetchInterviewDetails();
    }, [params.interviewId]);

    const fetchInterviewDetails = async () => {
        setLoading(true);
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result.length > 0) {
                const interview = result[0];
                setInterviewData(interview);

                // Safely parse JSON
                let jsonMockResp = [];
                if (interview.jsonMockResp) {
                    try {
                        jsonMockResp = JSON.parse(interview.jsonMockResp);
                        // Log the parsed JSON to the console
                        console.log('Parsed Mock Interview Questions:', jsonMockResp);
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                        setError('Error parsing interview questions.');
                    }
                }
                setMockInterviewQuestion(jsonMockResp);
            } else {
                setError('Interview data not found.');
            }
        } catch (fetchError) {
            console.error('Error fetching interview details:', fetchError);
            setError('An error occurred while fetching interview details.');
        } finally {
            // Ensure this is always called
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

   return(
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
             {/* Video/Audio Recording */}
             <RecordAnswerSection
             mockInterviewQuestion={mockInterviewQuestion}
             activeQuestionIndex={activeQuestionIndex}
             interviewData={interviewData}
             />
        </div>
        <div className='flex justify-end gap-6'> 
          {activeQuestionIndex>0&& 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Prev Question</Button>}

          {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          
          {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
          <Button>End Interview</Button>
          </Link>}
        </div>
    </div>
   )
}

export default StartInterview;



// "use client";
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';

// function StartInterview({ params }) {
//     const [interviewData, setInterviewData] = useState(null);
//     const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchInterviewDetails();
//     }, [params.interviewId]); // Added dependency to re-fetch data if interviewId changes

//     const fetchInterviewDetails = async () => {
//         setLoading(true);
//         try {
//             const result = await db.select().from(MockInterview)
//                 .where(eq(MockInterview.mockId, params.interviewId));

//             if (result.length > 0) {
//                 const interview = result[0];
//                 setInterviewData(interview);
                
//                 // Assuming jsonMockResp is a valid JSON string in your result
//                 const jsonMockResp = interview.jsonMockResp ? JSON.parse(interview.jsonMockResp) : [];
                
//                 // Assuming jsonMockResp is an array of objects with Question and Answer properties
//                 setMockInterviewQuestion(jsonMockResp);
//             } else {
//                 setError('Interview data not found.');
//             }
//         } catch (err) {
//             console.error('Error fetching interview details:', err); // Improved logging
//             setError('An error occurred while fetching interview details.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h1>Interview Details</h1>
//             {interviewData ? (
//                 <div>
//                     <h2>Interview ID: {interviewData.mockId}</h2>
//                     <h3>Questions:</h3>
//                     <ul>
//                         {mockInterviewQuestion.length > 0 ? (
//                             mockInterviewQuestion.map((item, index) => (
//                                 <li key={index}>
//                                     <strong>Question:</strong> {item.Question}<br />
//                                     <strong>Answer:</strong> {item.Answer}
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No questions available.</li>
//                         )}
//                     </ul>
//                 </div>
//             ) : (
//                 <div>No interview data available.</div>
//             )}
//         </div>
//     );
// }

// export default StartInterview;







// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'

// function StartInterview({params}) {

//     const [interviewData,setInterviewData]=useState();
//     const [mockInterviewQuetion,setMockInterviewQuetion]=useState();

//     useEffect(()=>{
//     const fetchInterviewDetails();
//     },[]);

//     const fetchInterviewDetails = async () => {
//         try {
//             setLoading(true);
//             const result = await db.select().from(MockInterview)
//                 .where(eq(MockInterview.mockId, params.interviewId));

//             if (result.length > 0) {
//                 setInterviewData(result[0]);
//             } else {
//                 setError('Interview data not found.');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching interview details.');
//         } finally {
//             setLoading(false);
//         }
//         const jsonMockResp=JSON.parse(result[0].jsonMockResp)
//         console.log(jsonMockResp)
//         setMockInterviewQuetion(jsonMockResp);
//         setInterviewData(result[0]);
//     };

//   return (
//     <div>StartInterview</div>
//   )
// }

// export default StartInterview