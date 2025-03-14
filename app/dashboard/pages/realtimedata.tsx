// import { useState, useEffect } from "react";
// import { db } from "@/app/api/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";


// interface SensorData {
//   value: number;
// }

// export default function Sensor() {
//   const [data, setData] = useState<SensorData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const sensorDoc = doc(db, "tds_sensor", "tds_meter");
//         const docSnap = await getDoc(sensorDoc);

//         if (docSnap.exists()) {
//           const rawData = docSnap.data();
//           console.log("Fetched data:", rawData);

//           const sensorData: SensorData = {
//             value: Number(rawData["tds-measure"]),
//           };

//           setData(sensorData);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <h1 className="text-black font-bold">Firestore Database</h1>
//       {data ? (
//         <p className="text-black font-bold">TDS Value: {data.value}</p>
//       ) : (
//         <p className="text-black">Loading...</p>
//       )}
//     </div>
//   );
// }
