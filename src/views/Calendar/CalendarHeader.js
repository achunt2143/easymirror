// Copyright (c) 2021 LG Electronics, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import RangePicker from '@enact/sandstone/RangePicker';

const CalendarHeader = (props) => {
 return (
  <tr className="calendar-header">
   <td colSpan="1">
    <Button
     onClick={() => {
      props.prevMonth();
     }}
     icon='arrowsmallleft'
    />
   </td>
   <td colSpan="5" className="nav-content">
    <Dropdown
     selected={props.months.indexOf(props.month())}
     width="medium"
     onSelect={(d) => {
      props.onSelectChange(d);
     }}
    >
     {props.months}
    </Dropdown>

    {' '}
    <RangePicker
     max={3000}
     min={1000}
     value={parseInt(props.year())}
     onChange={(d) => {
      props.onYearChange(d);
     }}
     width="small"
    />
   </td>
   <td colSpan="1" className="nav-month">
    <Button
     onClick={() => {
      props.nextMonth();
     }}
    icon='arrowsmallright'
    />
   </td>
  </tr>
 );
};

export default CalendarHeader;