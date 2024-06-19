import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import { useUploadLeadsMutation } from "../../services/appApi.js"
import Papa from 'papaparse'; 
import { useSelector } from "react-redux";
import axios from 'axios';
const Upload = ({
  uploadLeads:upload,
  updateLead,
  addLead,
  removeLead,
}) => {
    const phone = useSelector((state) => state.phoneNum);
    const user = useSelector((state) => state.user);
    const [selected, setSelected] = useState(phone[0]);
    const [open, setOpen] = useState(false)
    const [uploadLeads, { isDeleteError }] = useUploadLeadsMutation();
const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });
const formatCsv = async (keys, values) => {
    try {
      const stringValues = JSON.stringify(values);
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `match these these values  ${stringValues} to this array   [{"firstName": "", "lastName": "", "phone": "", "email": "", then any additional values}] for each object, 
             format phone numbers like '15554443333' 
            reutrn an array of objects where each object has the keys I sent with the corresponding values. For example if 
 the values are {"": "2353andrew@gmail.com", "_1":"224 656 8854", "_2": "john doe", "Millers Consulting"} then your should return [{"firstName": "john", "lastName": "doe","email": "2353andrew@gmail.com", "phone":"224 656 8854", "company": "Millers Consulting"}]    
 another example is if the values are        {"": "2353andrew@gmail.com", "_1":"224 656 8854", "_2": "", "_3" : ""} [{"firstName": "", "lastName": "","email": "2353andrew@gmail.com", "phone":"224 656 8854"}]    
         
or  {"": "2353andrew@gmail.com", "_1":"224 656 8854", "_2": "bob", "_3" : ""} [{"firstName": "bob", "lastName": "","email": "2353andrew@gmail.com", "phone":"224 656 8854"}]    
or{"": "2353andrew@gmail.com", "_1":"224 656 8854", "_2": "Tyler", "_3" : "Home Gardens LLC"} [{"firstName": "Tyler", "lastName": "","email": "2353andrew@gmail.com", "phone":"224 656 8854"}]    
Don't put phone numbers in the email key exclude any extra values like addresses or business names`,
          },
          { role: "user", content: "return a JSON array of objects based on the matching data structure,name the array contacts, also give me another array called firstKeys containing all the keys like ['firstname', 'lastname', 'email', 'phone',  ] {contacts: Array, keys: Array} " },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      if (!response.choices[0]) {
        throw new Error('Failed to generate summary');
      }

      const summary = response.choices[0].message.content;
      const sum = JSON.parse(summary);
      console.log(sum)
      return sum 
    } catch (error) {
      console.error('Error generating summary:', error);
      return { summary: 'Error generating summary' };
    }
  };



const uploadCsvToCloudinary = async (csvContent) => {
  try {
    const formData = new FormData();
    formData.append('file', new Blob([csvContent], { type: 'text/csv' }), 'leads.csv');  
    formData.append('upload_preset', 'qmakq1p3');  
 
 
    const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dojwag3u1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

     
      await addLead({url: uploadResponse.data.secure_url, type: 'document'})
     
    

    return {
      url: uploadResponse.data.secure_url,
      public_id: uploadResponse.data.public_id,
    };
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

  useEffect(() => {
    if (phone.length > 0) {
      setSelected(phone[0])
    }
  }, [phone]);
  const [leads, setLeads] = useState([]); // State to store parsed leads from CSV
  const [keys, setKeys] = useState([])


  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  const postData = async (keys, url) => {
await axios.post('/save-csv', keys, url)
  }
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const csvData = await readFile(file);
     const csvUrl =  await uploadCsvToCloudinary(csvData)
      const parsedData = Papa.parse(csvData, { header: true }).data; 
      const dataWithoutHeaders = parsedData.filter(row => Object.keys(row).some(key => key.trim() !== ""));
      const keys = Object.values(dataWithoutHeaders[0]).map(key => key.trim());
 
      const format = await formatCsv(keys, dataWithoutHeaders)
      setLeads(format.contacts)
      setKeys(format.keys);
      await postData(format.keys, csvUrl)
    }
  };

 

  return (
<div>


{leads?.length > 0 ? (
    <label style={{width:'fit-content'}}onClick={() =>  user.credits < 50 ? setOpen(false) : setOpen(true)}
     className="submit-b2">Show leads</label>
  ) : (
    <>
      <input id="file-upload" 
      
      disabled={user.credits < 50} type="file" style={{ display: 'none' }}
       onChange={handleFileUpload} accept=".csv" />
     
     
     
      <label  
style={{opacity: ".5", background:  '#34a853', position:'relative',
 width: 'fit-content', zIndex:'9'}}htmlFor="file-upload" 
className="submit-b2">Upload leads</label>



    </> 



)}


 
{leads.length > 0 && keys.length > 0 && <>

    <div style={{display:'flex', justifyContent: 'space-between', marginBottom: '5px'}}> <h3>Lead List</h3>   <button style={{height:'34px'}} className="red-btn">Remove leads</button> </div>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {keys.map((key, index) => (
                  <th key={index} style={{ padding: '8px', border: '1px solid black' }}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index}>
                  {keys.map((key, index) => (
                    <td key={index} style={{ padding: '8px', border: '1px solid black' }}>{lead[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
    
     

 </>}

</div>
  )}




  export default Upload