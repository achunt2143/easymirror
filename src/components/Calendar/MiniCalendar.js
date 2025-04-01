import React, { Component } from 'react';
import moment from 'moment';
import './minicalendar.css';  // Custom styles
import Item from '@enact/sandstone/Item';

class MiniCalendar extends Component {
    state = {
        dateContext: moment(), // Current date
        monthsData: {
            // Example data structure; replace this with actual data.
            2024: {
                'October': {
                    10: [{ title: 'Event 1' }],
                    15: [{ title: 'Event 2' }],
                    20: [{ title: 'Event 3' }],
                }
            }
        }
    };

    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    year = () => {
        return this.state.dateContext.format('Y');
    };

    month = () => {
        return this.state.dateContext.format('MMMM');
    };

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    };

    firstDayOfMonth = () => {
        return moment(this.state.dateContext).startOf('month').format('d');
    };

    today = () => {
        return this.state.dateContext.format('DD');
    }

    renderDays = () => {
        const daysInMonth = this.daysInMonth();
        const firstDay = this.firstDayOfMonth();
        const currentYear = this.year();
        const currentMonth = this.month();
        const currentDay = this.today();
        console.log(currentDay);
        const events = this.state.monthsData[currentYear]?.[currentMonth] || {};

        let blanks = [];
        // Empty slots before first day of the month
        for (let i = 0; i < firstDay; i++) {
            blanks.push(<td key={`empty-${i}`} className="empty">{""}</td>);
        }

        let days = [];
        // Create days of the month with event markers
        for (let day = 1; day <= daysInMonth; day++) {
            const hasEvent = !!events[day];  // Check if an event exists for this day
            days.push(
                <td key={`day-${day}`} className={`day ${hasEvent ? 'has-event' : ''} ${currentDay == day ? 'today' : ''}`}>
                    <Item centered>{day}{hasEvent && <span className="event-indicator">•</span>}</Item>
                </td>
            );
        }

        const totalSlots = [...blanks, ...days];
        let rows = [];
        let cells = [];

        // Group cells into rows (7 days each row)
        totalSlots.forEach((slot, i) => {
            if (i % 7 !== 0) {
                cells.push(slot);
            } else {
                rows.push(cells);
                cells = [slot];
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        // Return rows of days
        return rows.map((row, index) => <tr key={index}>{row}</tr>);
    };

    render() {
        return (
            <div className="mini-calendar">
                <h2>{this.month()} {this.year()}</h2>
                <table className="mini-calendar">
                    <thead>
                        <tr>
                            {this.weekdaysShort.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDays()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MiniCalendar;
