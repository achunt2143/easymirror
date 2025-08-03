import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Calendar from './Calendar';

// Service component manages all background tasks and state
const CalendarService = (props) => {
  // State
  const [dateContext, setDateContext] = useState(moment());
  const [today] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSubTitle, setDialogSubTitle] = useState(null);
  const [dialogType, setDialogType] = useState('form');
  const [monthsData, setMonthsData] = useState([]);
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const weekdaysShort = moment.weekdaysShort();
  const months = moment.months();

  useEffect(() => {
    getDataFromDb();
  }, [dateContext]);

  // Mock fetching calendar data (simulate DB call or API)
  const getDataFromDb = () => {
    const mockData = mockMonthData();
    setMonthsData(mockData);
  };

  const mockMonthData = () => {
  return {
    "2025": {
      "8": { // August (1-based month string)
        "1": [
          { title: "Team Meeting" },
          { title: "Lunch with Client" }
        ],
        "3": [
          { title: "Doctor Appointment" }
        ],
        "10": [
          { title: "Annual Conference" }
        ],
        "15": [
          { title: "Project Deadline" }
        ],
        "20": [
          { title: "Company Workshop" }
        ],
        "25": [
          { title: "Team Building Event" }
        ],
        "30": [
          { title: "Performance Review" }
        ]
      }
    }
  };
};


  // Date helpers
  const year = () => dateContext.format('Y');
  const month = () => dateContext.format('MMMM');
  const daysInMonth = () => dateContext.daysInMonth();
  const currentDate = () => dateContext.get('date');
  const currentDay = () => dateContext.format('D');
  const firstDayOfMonth = () => moment(dateContext).startOf('month').format('d'); 

  // Change date context
  const setMonth = (monthName) => {
    const monthNo = months.indexOf(monthName);
    setDateContext(moment(dateContext).set('month', monthNo));
  };

  const nextMonth = () => {
    setDateContext(moment(dateContext).add(1, 'month'));
    props.onNextMonth && props.onNextMonth();
  };

  const prevMonth = () => {
    setDateContext(moment(dateContext).subtract(1, 'month'));
    props.onPrevMonth && props.onPrevMonth();
  };

  const onSelectChange = (data) => {
    setMonth(data.data);
    props.onMonthChange && props.onMonthChange();
  };

  const setYear = (year) => {
    setDateContext(moment(dateContext).set('year', year));
  };

  const onYearChange = (e) => {
    setYear(e.value);
  };

  const onDayClick = (e, day) => {
  let currentMonth = months.indexOf(month()) + 1;
  let currentYear = year().toString();
  let monthEvents = monthsData?.[currentYear]?.[currentMonth]?.[day?.toString()];
  let type = (monthEvents && monthEvents.length > 0) ? 'list' : 'form';
  setDialogType(type);
  setDialogSubTitle(type === 'list' ? 'Events of the Day' : 'Add new event');
  setSelectedDay(day);
  setDialogOpen(true);
  props.onDayClick && props.onDayClick(e, day);
};


  const onDialogClose = () => {
    setDialogOpen(false);
    setDialogType('form');
  };

  const postObj = (obj) => {
    // Save data routine (API/db)
    // After successful save:
    setDialogOpen(false);
    getDataFromDb();
  };

  const triggerNotification = (msg) => {
    setNotificationMsg(msg.message);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
      setNotificationMsg('');
    }, 3000);
  };

  const deleteEvent = (event, date, month, year) => {
    onDialogClose();
    // Implement delete logic here (API/db)
    getDataFromDb();
  };

  const createNewEvent = () => {
    setDialogType('form');
    setDialogOpen(true);
  };

  return (
    <Calendar
      {...props}

      dateContext={dateContext}
      today={today}
      selectedDay={selectedDay}
      dialogOpen={dialogOpen}
      dialogSubTitle={dialogSubTitle}
      dialogType={dialogType}
      monthsData={monthsData}
      notification={notification}
      notificationMsg={notificationMsg}
      weekdaysShort={weekdaysShort}
      months={months}

      year={year}
      month={month}
      daysInMonth={daysInMonth}
      currentDate={currentDate}
      currentDay={currentDay}
      firstDayOfMonth={firstDayOfMonth}

      setMonth={setMonth}
      nextMonth={nextMonth}
      prevMonth={prevMonth}
      onSelectChange={onSelectChange}
      onYearChange={onYearChange}
      onDayClick={onDayClick}
      onDialogClose={onDialogClose}
      postObj={postObj}
      triggerNotification={triggerNotification}
      deleteEvent={deleteEvent}
      createNewEvent={createNewEvent}
    />
  );
};

export default CalendarService;
