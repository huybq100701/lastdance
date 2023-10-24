// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';

// interface EventData {
//   _id: string;
//   title: string;
//   location: string;
//   eventTime: string;
//   description: string;
//   author: {
//     name: string;
//     image: string;
//     id: string;
//   };
//   opponent: {
//     name: string;
//     image: string;
//     id: string;
//   };
//   createdAt: string;
// }

// // Dữ liệu sự kiện giả định
// const events: EventData[] = [
//   {
//     _id: '1',
//     title: 'Meeting 1',
//     location: 'New York',
//     eventTime: '2023-10-25T10:00:00',
//     description: 'Meeting with the team',
//     author: {
//       name: 'John Doe',
//       image: 'url-to-image',
//       id: 'author-id',
//     },
//     opponent: {
//       name: 'Jane Doe',
//       image: 'url-to-image',
//       id: 'opponent-id',
//     },
//     createdAt: '2023-10-24T08:00:00',
//   },
//   // Thêm dữ liệu sự kiện khác tại đây
// ];

// const localizer = momentLocalizer(moment);

// const EventTab = () => {
//   const eventsFormatted = events.map((event) => ({
//     id: event._id,
//     title: event.title,
//     start: new Date(event.eventTime),
//     end: new Date(event.eventTime),
//     allDay: false,
//   }));

//   return (
//     <div style={{ height: 500 }}>
//       <Calendar
//         localizer={localizer}
//         events={eventsFormatted}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ margin: '50px' }}
//       />
//     </div>
//   );
// };

// export default EventTab;
