import {useCallback, useState} from 'react';
import { useDropzone } from "react-dropzone";
import {Button} from "@/components/ui/button.tsx";

const FileUploader = ()=>{
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState("");
    const onDrop = useCallback(acceptedFiles => {
        setFileUrl(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop,
        accept: {
        "image/*": ['.png', '.jpeg', '.jpg', '.svg'],
    }})

    return(
        <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
            <input {...getInputProps()} className="cursor-ponter"/>
            {
                fileUrl ?(
                    <div>
                        test 1
                    </div>
                    ) :(
                        <div className="file_uploader-box">
                            <img
                                src="/assets/icons/file-upload.svg"
                                width={96}
                                height={77}
                                alt="file-upload"
                            />
                            <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
                            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

                            <Button className="shad-button_dark_4">
                                Select from files
                            </Button>
                        </div>
                    )
            }
        </div>
    )
}
export default FileUploader