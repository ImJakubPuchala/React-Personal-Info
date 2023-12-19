interface CtaProps {
    name: string,
    type: 'submit' | 'reset' | 'button',
    active : boolean,
    props: any,
}


export default function Cta({name, type, active, ...props} : CtaProps) {
    return(
        <div>
            <button 
                className={`
                    ${!active ? 
                        'bg-violet-300'
                        : 
                        'bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-900 focus:border-violet-500 hover:bg-violet-600'
                    }
                    w-full
                    text-white py-2 rounded 
                `}
                disabled={active}
                type={type}
                {...props}
            >
                {name}
            </button>
        </div>
    )
}