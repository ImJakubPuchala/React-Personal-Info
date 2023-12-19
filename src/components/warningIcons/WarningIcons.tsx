export default function WarningIcons({...props}) {
    return(
        <div>
            <button 
                className="
                    scale-75
                    transition duration-300 ease-in-out
                    bg-red-500
                    text-white font-bold rounded-full w-8 h-8 flex items-center justify-center
                "
            >
               !
            </button>
        </div>
    )
}