import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/calendarForm/calendarForm';
import Cta from './components/cta/cta';
import RangeSlider from './components/rangeSlider/rangeSlider';
import Textfield from './components/textfield/textfield';
import TimeSlots from './components/timeSlots/timeSlots';
import UploadFile from './components/uploadFile/uploadFile';

function App() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [age, setAge] = useState<number>(8);
  const [file, setFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const time : string[] = [
    '12:00',
    '14:00',
    '16:30',
    '18:30',
    '20:00'
  ]

  const checkActive = () => {
    if(firstName && lastName && emailAddress && age && selectedDate && selectedTime){
      return true;
    } else {
      return false;
    }
  }

  useEffect(()=>{
    setSelectedTime('');
  },[selectedDate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', emailAddress);
    formData.append('age', age.toString());
    if(file) formData.append('file', file);
    formData.append('selectedDate', selectedDate);
    formData.append('selectedTime', selectedTime);

    if(checkActive()){
      try {
        fetch('http://letsworkout.pl/submit', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`N/W error! Status Error: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Response data:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className='form-container bg-violet-100' onSubmit={handleSubmit}>
      
      <h1 className='text-xl font-medium'>Presonal Info</h1>

      <Textfield 
        value={firstName}
        setValue={setFirstName}
        required={false}
        label="First Name" 
        type="text" 
        props={{id: 'firstName', name: 'firstName', placeholder: 'First Name'}}
      />

      <Textfield
        value={lastName}
        setValue={setLastName}
        required={false}
        label="Last Name" 
        type="text" 
        props={{id: 'lastName', name: 'lastName', placeholder: 'Last Name'}}
      />

      <Textfield 
        value={emailAddress}
        setValue={setEmailAddress}
        required={true}
        label="Email" 
        type="email" 
        props={{id: 'email', name: 'email', placeholder: 'Email Address'}}
      />

      <RangeSlider value={age} setValue={setAge}/>

      <UploadFile value={file} setValue={setFile}/>

      <h1 className='text-xl font-medium mt-6'>Your workout</h1>

      <div className='grid grid-cols-9 gap-4 pr-8'>
        <div className="col-span-8">
          <Calendar value={selectedDate} setValue={setSelectedDate}/>
        </div>

        <div className="col-span-1">
        {
          time.map(
            (e : string, i : number)=>
              <div key={"TimeSlots" + i} onClick={()=>setSelectedTime(e)}>
                <TimeSlots time={e} selected={selectedTime == e ? true : false} props={{}}/>
              </div>
          )
        }
        </div>
        
      </div>

      <div className="mt-5">
        <Cta type='submit' active={checkActive()} name='Send Application' props={{}}/>
      </div>
    </form>
  );
}

export default App;
