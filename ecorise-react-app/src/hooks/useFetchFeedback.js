import { useState, useEffect } from 'react';
import { fetchFeedback } from '../utils/fetchFeedback';
export function useFeedback() {
 const [feedback, setFeedback] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 useEffect(() => {
   let isMounted = true;
   async function loadFeedback() {
     setLoading(true);
     setError(null);
     try {
       const data = await fetchFeedback();
       if (isMounted) {
         setFeedback(data);
       }
     } catch (err) {
       if (isMounted) {
         setError(err.message);
       }
     } finally {
       if (isMounted) {
         setLoading(false);
       }
     }
   }
   loadFeedback();
   return () => {
     isMounted = false;
   };
 }, []);
 return { feedback, loading, error };
}
