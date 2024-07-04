import React, { useState, useEffect } from 'react';
import { useUploadLeadsMutation } from "../../services/appApi.js"
import { useSelector } from "react-redux";
import axios from 'axios';
import './UploadDoc.css'

const Upload = ({knowledgeBase, addKnowledgeBase ,removeKnowledgeBase}) => {
    const user = useSelector((state) => state.user);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState(knowledgeBase.length > 0 ?  knowledgeBase : []);
    const [uploaDocument, { isDeleteError }] = useUploadLeadsMutation();

    const uploadDocumentToCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('upload_preset', 'qmakq1p3');

            const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dojwag3u1/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
addKnowledgeBase(uploadResponse.data.secure_url, file.name)
            return {
                url: uploadResponse.data.secure_url,
                public_id: uploadResponse.data.public_id,
            };
        } catch (error) {
            console.error('Error uploading file to Cloudinary:', error);
            throw error;
        }
    };


    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const uploadedFiles = await Promise.all(files.map(async (file) => {
            const { url, public_id } = await uploadDocumentToCloudinary(file);
            return { name: file.name, url, public_id };
        }));

        setUploadedFiles(uploadedFiles);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
        removeKnowledgeBase(index)
    };

    return (
        <div>
            <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileUpload} multiple accept=".pdf,.txt,.doc,.docx" />
            <label
                style={{
                    background: '#f2f2f2',
                    fontSize: '13px',
                    position: 'relative',
                    width: 'fit-content',
                    zIndex: '9'
                }}
                htmlFor="file-upload"
                className="standardBtn"
            >
                + Add Document
            </label>

            {uploadedFiles?.map((file, index) => (
                <div key={index} className='document'>
                    <div>
                        <p>{file.name}</p>
                    </div>
                    <div style={{ display: 'flex', columnGap: '10px' }}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <img className="uploadIcon" src="https://res.cloudinary.com/dojwag3u1/image/upload/v1718330306/download_vgzch5.png" />
                        </a>
                        <div
                            style={{ cursor: 'pointer', zIndex: '99999999' }}
                            onClick={() => handleRemoveFile(index)}
                            className="closer-btn-3"
                        >
                            <div>x</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Upload;