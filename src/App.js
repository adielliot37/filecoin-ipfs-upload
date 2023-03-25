import "./App.css"
import { Web3Storage } from "web3.storage"
import { useState } from "react"
//import lighthouse from '@lighthouse-web3/sdk';

export default function App() {
  const fs = require("fs")
  const [file, setFile] = useState(null)
  const [imageURI, setImageURI] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [cid, setCid] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [dataLength, setDataLength] = useState(0)

  const client = new Web3Storage({
    token: "api",
  })

  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const uploadFile = async () => {
    setIsUploading(true)
    const fileToUpload = new File([file], file.name.split(" ").join(""), {
      type: file.type,
    })
    const cid = await client.put([fileToUpload], {
      name: file.name,
    })
    setFileSize(fileToUpload.size)
    setImageURI(`https://ipfs.io/ipfs/${cid}?format=car`)
    setCid(cid)
    setFile(null)
    setIsUploading(false)

    // Download
    const downloadFile = async () => {
      const response = await fetch(`https://ipfs.io/ipfs/${cid}?format=car`)
      const data = await response.arrayBuffer()
      setDataLength(data.byteLength)
 
    }

    downloadFile()
    return cid
  }

  return (
    <div className="container">
      <h1 className="title">Upload files </h1>
      {isUploading && <div className="uploading">Uploading file</div>}
      <input className="input" type={"file"} onChange={handleFileChange} />
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
          <p>CAR file size: {dataLength}</p>
        </div>
      )}
    </div>
  )
}
