interface TimeSlotsProps {
    time: string,
    selected: boolean,
    props: any,
}

export default function TimeSlots({time, selected, ...props} : TimeSlotsProps) {
    return(
        <div>
            <button 
                className={`
                    ${!selected ? 
                        'ring-1 ring-violet-300'
                        : 
                        'ring-1 ring-violet-600'
                    }
                    py-2 px-4 m-1 rounded 
                `}
                type='button'
                {...props}
            >
                {time}
            </button>
        </div>
    )
}