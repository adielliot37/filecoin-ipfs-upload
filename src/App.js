import "./App.css"
import { Web3Storage } from "web3.storage"
import { useState } from "react"
export default function App() {
    const [file, setFile] = useState(null)
    const [imageURI, setImageURI] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [cid, setCid] = useState("")
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0NjhDOTU2ZTM4MjQyMDlhMzdCNkVlZDZkQjExMTE4YzE3ZGQ0MzMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk1MDU0NDc0NjAsIm5hbWUiOiJ1cGxvYWQifQ.XH3sRMYQyZMrJKoTba4xxJI5K-8zJvkCAuqRWuGtOBg" })
    const handleFileChange = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const [fileSize, setFileSize] = useState(0)

const uploadFile = async () => {
    setIsUploading(true)
    const fileToUpload = new File([file], file.name.split(" ").join(""), {
        type: file.type,
    })
    const cid = await client.put([fileToUpload], {
        name: file.name,
    })
    setFileSize(fileToUpload.size)
    setImageURI(
        `https://ipfs.io/ipfs/${cid}?format=car`
    )
    setCid(cid)
    setFile(null)
    setIsUploading(false)
    return cid
}

return (
    <div className="container">
        <h1 className="title">Upload files </h1>
        {isUploading && <div className="uploading">Uploading file</div>}
        <input
            className="input"
            type={"file"}
            onChange={handleFileChange}
        />
        {file && (
            <button className="upload" onClick={uploadFile}>
                Upload File
            </button>
        )}
        {imageURI.length > 0 && (
            <div className="link">
                <a href={imageURI}> File link</a>
                <p>CID: {cid}</p>
                <p>File size in bytes: {fileSize}</p>
            </div>
        )}
    </div>
)
}
