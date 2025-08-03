import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import { Panel } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Alert from '@enact/sandstone/Alert';
import Scroller from '@enact/sandstone/Scroller';
import Popup from '@enact/sandstone/Popup';
import CalendarHeader from './CalendarHeader';
import Header from './Header';
import Days from './Days';
import EventsList from './EventsList';
import CreateForm from './CreateForm';
import '../Weather/miniweather.css'
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import css from './Calendar.module.less';

const Calendar = kind({
  name: 'Calendar',
  styles: {
    css,
    className: 'calendarKind'
  },
  propTypes: {
    // All props passed from CalendarService
    dateContext: PropTypes.object.isRequired,
    today: PropTypes.object.isRequired,
    selectedDay: PropTypes.number,
    dialogOpen: PropTypes.bool,
    dialogSubTitle: PropTypes.string,
    dialogType: PropTypes.string,
    monthsData: PropTypes.array,
    notification: PropTypes.bool,
    notificationMsg: PropTypes.string,
    weekdaysShort: PropTypes.array,
    months: PropTypes.array,

    year: PropTypes.func.isRequired,
    month: PropTypes.func.isRequired,
    daysInMonth: PropTypes.func.isRequired,
    currentDate: PropTypes.func.isRequired,
    currentDay: PropTypes.func.isRequired,
    firstDayOfMonth: PropTypes.func.isRequired,

    setMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onYearChange: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    postObj: PropTypes.func.isRequired,
    triggerNotification: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    createNewEvent: PropTypes.func.isRequired
  },

  render: (props) => {
    const {
      dialogOpen,
      dialogSubTitle,
      dialogType,
      selectedDay,
      month,
      year,
      weekdaysShort,
      firstDayOfMonth,
      daysInMonth,
      currentDay,
      onDayClick,
      onDialogClose,
      createNewEvent,
      notification,
      notificationMsg,
      monthsData
    } = props;

    // Render weekdays header cells
    const weekdayHeaders = weekdaysShort.map((day) => (
      <td key={day} className={css.weekDay}>{day}</td>
    ));

    // Format date for dialog title
    const formattedDate = selectedDay
      ? `${selectedDay}-${month()}-${year()}`
      : `${currentDay()}-${month()}-${year()}`;

    // Prepare variables for Children component (example: Days)
    const currentMonthIndex = props.months.indexOf(props.month()) + 1;
    const currentYearStr = year().toString();
    const selectedDateStr = selectedDay ? selectedDay.toString() : undefined;

    return (
      <Panel className={css.calendarPanel}>
        <Header />
        <div className={css.calendarContainer}>
          <table className={css.calendarTable}>
            <thead>
              <CalendarHeader
                prevMonth={props.prevMonth}
                months={props.months}
                month={month}
                onSelectChange={props.onSelectChange}
                year={year}
                onYearChange={props.onYearChange}
                nextMonth={props.nextMonth}
                className={css.calendarHeader}
              />
            </thead>
            <tbody>
              <tr className={css.weekDayNav}>
                {weekdayHeaders}
              </tr>
              <Days
                firstDayOfMonth={firstDayOfMonth}
                daysInMonth={daysInMonth}
                currentDay={currentDay}
                onDayClick={onDayClick}
                year={year()}
                month={currentMonthIndex}
                monthsData={monthsData}
                css={css}
              />
            </tbody>
          </table>
          <Button
            className={css.createNewBtn}
            onClick={createNewEvent}
          >
            Create New Event
          </Button>

          <Alert
            className={css.dialogPopup}
            open={dialogOpen}
            onClose={onDialogClose}
            skin="light"
            title={formattedDate}
            titleBelow={dialogSubTitle}
          >
            <Scroller>
              <div className={css.scrollbar}>
                {/* 
                  Render dialog content based on dialogType: form or list 
                  You can uncomment and implement CreateForm and EventsList components as required
                */}
                {dialogType === 'form' 
                  ? <CreateForm
                      currentSelectedDate={new Date(formattedDate)}
                      postObj={props.postObj}
                      triggerNotification={props.triggerNotification}
                    />
                  : <EventsList
                      deleteEvent={props.deleteEvent}
                      year={currentYearStr}
                      date={selectedDateStr}
                      month={currentMonthIndex}
                      createNewEvent={createNewEvent}
                      events={monthsData?.[currentYearStr]?.[currentMonthIndex]?.[selectedDateStr]}
                    /> 
               }
              </div>
            </Scroller>
          </Alert>

          <Popup open={notification}>
            {notificationMsg}
          </Popup>
        </div>
      </Panel>
    );
  }
});

export default ThemeDecorator(Calendar);
