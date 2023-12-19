import DeleteIcons from "../deleteIcons/deleteIcons";

interface IUploadFileProps {
    value : any,
    setValue : any,
}


export default function UploadFile({ value, setValue } : IUploadFileProps) {
    const handleFileInputChange = (e:any) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            setValue(selectedFile);
        }
      };

    return (
        <div className="pt-6 flex flex-col items-center justify-center w-full">
            <label className="w-full pointer-events-none">Photo</label>
            <label 
                htmlFor="file" 
                className="
                    flex items-center justify-center
                    w-full h-32
                    border-2 border-purple-200 bg-white rounded-lg
                    cursor-pointer 
                ">
                    {
                        value?
                            <label className="flex z-100">
                                {value.name} <i onClick={()=>setValue(null)}><DeleteIcons/></i>
                            </label>
                        :
                        <>
                            <u className="mr-1 text-purple-600">Upload a file </u> or drag and drop here
                        </>
                    }
                <input type="file" id="file" className="hidden" onChange={handleFileInputChange}/>
            </label>
        </div>
    )
}