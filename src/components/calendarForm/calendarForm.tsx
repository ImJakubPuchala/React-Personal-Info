import { useEffect, useState } from "react";
import { Calendar } from "calendar";

interface ICalselectedDay{
    value : string,
    setValue : any
}

interface ICalendarWithHoliday{
    date : number,
    isActive? : boolean,
    fulldate : string,
    holidayName: string
}

interface HolidayData {
    country: string;
    iso: string;
    year: number;
    date: string;
    day: string;
    name: string;
    type: string;
}

export default function CalendarForm({value, setValue} : ICalselectedDay){
    const [displayCaledar, setDisplayCalendar] = useState<ICalendarWithHoliday[][]>([[]]);
    const [displayMonthYear, setDisplayMonthYear] = useState<string>('');
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const getHolidayFromApi = async () => {
        let country = 'pl'
        let url = 'https://api.api-ninjas.com/v1/holidays?country=' + country + '&year=' + year + '&type=national_holiday'

        const headers = {
            'X-Api-Key': '123'
        }

        try {
            const response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: headers
                }
            );
            if (!response.ok) {
                throw new Error(`N/W error! Status Error: ${response.status}`);
            }
            const data: HolidayData[] = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
            return [];
        }
    }

    const getCalendar = async () => {
        try {
            getHolidayFromApi()
             .then(data => {
                const holidays = data

                let date = new Date();
                date.setMonth(month);
                date.setFullYear(year);
                let c = new Calendar(1);
                let m : Number[][] = c.monthDays(year, month);
                setDisplayMonthYear(date.toLocaleString('default', {month: 'long'}) + ' ' + date.getFullYear());
        
                let calendarWithHolidays : ICalendarWithHoliday[][] = [[]];
        
                for (var i = 0; i < m.length; i++) {
                    var dayArray : ICalendarWithHoliday[] = [];
                    for (var j = 0; j < m[i].length; j++) {
                        var dateValue = m[i][j];
                        dayArray.push({ 
                            date: Number(dateValue), 
                            isActive: !holidays.find(
                                (e : HolidayData) => {
                                    if(e.date === year + '-' + (month + 1) + '-' + dateValue || e.date === year + '-' + '0' + (month + 1) + '-' + dateValue){
                                        return true
                                    }else{
                                        return false
                                    }
                                }), 
                            fulldate : year + '-' + (month + 1) + '-' + dateValue, 
                            holidayName: '' 
                        });
                    }
                    calendarWithHolidays.push(dayArray);
                }
        
                setDisplayCalendar(calendarWithHolidays);
            })             
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getCalendar();
    },[month]);

    const nextMonth = () => {
        if(month + 1 >= 12){
            setMonth(0);
            setYear(year + 1);
        }
        else
        {
            setMonth(month + 1);
        }
    }

    const prevMonth = () => {
        if(month - 1 < 0){
            setMonth(11);
            setYear(year - 1);
        }
        else
        {
            setMonth(month - 1);
        }
    }

    return (
        <div className="w-full h-full p-6 border-2 border-purple-200 bg-white rounded-lg">
            <div className="flex justify-between px-4" style={{fontSize: "1.5rem"}}>
                <button onClick={prevMonth}>{'<'}</button>
                <span style={{textTransform: "capitalize"}}>{displayMonthYear}</span>
                <button onClick={nextMonth}>{'>'}</button>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th style={{ maxWidth: '5px'}}>Mo</th>            
                        <th style={{ maxWidth: '5px'}}>Tu</th>            
                        <th style={{ maxWidth: '5px'}}>We</th>            
                        <th style={{ maxWidth: '5px'}}>Th</th>            
                        <th style={{ maxWidth: '5px'}}>Fr</th>            
                        <th style={{ maxWidth: '5px'}}>Sa</th>
                        <th style={{ maxWidth: '5px'}}>Su</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        displayCaledar.map((week : ICalendarWithHoliday[], i : number) => (
                            <tr key={i}>
                                {
                                    week.map((day : ICalendarWithHoliday, j : number) => (
                                        <td key={j} 
                                            style={day.isActive && day.date != 0 && j != 6? {} : {color : 'gray'}}
                                            className={day.fulldate === value? 'bg-purple-500 text-white rounded-full' : ''}
                                            title={day.holidayName}
                                            onClick={
                                                () => {
                                                    if(day.isActive && day.date != 0 && j != 6){
                                                        setValue(year + '-' + Number(month+1) + '-' + day.date)
                                                    }
                                                }
                                            }     
                                        >
                                            {day.date != 0? day.date : ''}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

