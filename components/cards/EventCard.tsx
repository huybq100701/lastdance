// import { fetchUserEvents } from '@/lib/actions/user.actions';
// import React, { useEffect, useState } from 'react';

// function EventCard() {
//   const [userEvents, setUserEvents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const events = await fetchUserEvents(); // Gọi hàm fetchUserEvents để lấy dữ liệu từ server
//         setUserEvents(events); // Cập nhật state với dữ liệu lấy được
//       } catch (error) {
//         console.error('Error fetching user events:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {userEvents.map((event) => (
//         <div key={event.eventId}>
//           <div>Title: {event.title}</div>
//           <div>Location: {event.location}</div>
//           <div>Event Time: {event.eventTime}</div>
//           <div>Description: {event.description}</div>
//           {/* Hiển thị các thông tin khác liên quan đến sự kiện ở đây */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default EventCard;
