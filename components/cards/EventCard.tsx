import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS styles
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 9, 15, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
      end: new Date(2023, 9, 15, 12, 0),
    },
    {
      title: 'Event 2',
      start: new Date(2023, 9, 16, 14, 0),
      end: new Date(2023, 9, 16, 16, 0),
    },
    // Add more events as needed
  ];

  
  const MyCalendar = () => {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start" // Property containing the start date of each event
          endAccessor="end"     // Property containing the end date of each event
          style={{ height: 500 }} // Set the calendar height (adjust as needed)
        />
      </div>
    );
  };
  
  export default MyCalendar;
  