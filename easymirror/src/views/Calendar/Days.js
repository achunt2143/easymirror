import IconItem from '@enact/sandstone/IconItem';
import Item from '@enact/sandstone/Item';
import css from './Calendar.module.less';  // Import your CSS module

const Days = (props) => {
  let blanks = [];
  for (let i = 0; i < props.firstDayOfMonth(); i++) {
    blanks.push(
      <td key={i * 80} className={css.emptySlot}>
        {''}
      </td>
    );
  }

  let daysInMonth = [];

  const getEvents = (d) => {
    let events = null;
    if (props.monthsData && props.monthsData[props.month] && props.monthsData[props.month][d.toString()]) {
      let daysData = props.monthsData[props.month][d.toString()];
      if (daysData.length > 3) {
        events = [];
        events[0] = (
          <div key="0" className={css.eventElement}>
            {daysData[0].title}
          </div>
        );
        events[1] = (
          <div key="1" className={css.eventElement}>
            {daysData[1].title}
          </div>
        );
        events[2] = (
          <IconItem key="2" className={css.moreEventElement} icon="arrowsmallright" labelPosition="before">
            Click to view more
          </IconItem>
        );
      } else {
        events = daysData.map((ev, i) => {
          return (
            <div key={i} className={css.eventElement}>
              {ev.title}
            </div>
          );
        });
      }
    }
    return events;
  };

  let currentDate = props.currentDay();
  for (let d = 1; d <= props.daysInMonth(); d++) {
    // Compose class names using CSS module and conditional
    let className = d === parseInt(currentDate) ? `${css.day} ${css.currentDay}` : css.day;

    if (props.monthsData && props.monthsData[props.month]) {
      daysInMonth.push(
        <td
          key={d}
          onClick={(e) => {
            props.onDayClick(e, d);
          }}
          className={className}
        >
          <Item centered className={css.dayText}>
            {d}
          </Item>
          {getEvents(d)}
        </td>
      );
    } else {
      daysInMonth.push(
        <td
          key={d}
          onClick={(e) => {
            props.onDayClick(e, d);
          }}
          className={className}
        >
          <Item centered className={css.dayText}>
            {d}
          </Item>
        </td>
      );
    }
  }

  let totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if ((i % 7) !== 0 || i === 0) {
      cells.push(row);
    } else {
      let insertRow = cells.slice();
      rows.push(insertRow);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      let insertRow = cells.slice();
      rows.push(insertRow);
    }
  });

  let trElems = rows.map((d, i) => {
    return (
      <tr key={i * 100} className={css.datesRow}>
        {d}
      </tr>
    );
  });

  return <>{trElems}</>;
};

export default Days;
