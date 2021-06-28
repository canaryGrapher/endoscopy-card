import { React,  useEffect,  useState } from 'react';
import './../App.css';
import { Upload, Trash } from 'react-feather';
import { useEndoscopyDispatch, useEndoscopyState, getPatientScans } from './../context';
import { useHistory } from 'react-router-dom';
import { uploadPatientScan } from '../context/actions';

const Scans = () => {

    const [scans, setScans] = useState([]);
    
    const admin = useEndoscopyState();
    const history = useHistory();
    const dispatch = useEndoscopyDispatch();

    const getScans = async() => {
        try {
            let response = await getPatientScans(dispatch, localStorage.getItem('hospital_no'));
            setScans(response.scans);
        } catch (error) {
            
        }
    }

    const uploadScan = async() => {
        try {
            let file =  document.getElementById('upload-scan');
            let formData = new FormData();
            formData.append('file', file.files.item(0));
            let payload = {
                file: formData,
                hospitalNum: localStorage.getItem('hospital_no'),
                scanName: file.files.item(0).name,
                scanTime: '12:00:00'
            }
            let response = await uploadPatientScan(dispatch, payload)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async() => {
        if(!admin.patientName || !admin.hospitalNum || !admin.token) {
            history.push('/patient/details');
        } else {
            await getScans();
        }
    }, [])

    // method to delete a scan from the database
    const deleteScan = (scanid) => {
        
    }

    // triggers the upload file dialog on clicking upload button
    const triggerUpload = () => {
        document.getElementById('upload-scan').click();
    }

    return(
        <div>
            {
                scans.length === 0 
                ? 
                <div className='d-flex flex-column w-half m-auto h-300 justify-content-center align-items-center mt-20'>
                    <div className='d-flex flex-column justify-content-center border rounded-circle shadow-lg h-200 w-200 align-items-center' style={{ cursor: 'pointer' }} onClick={triggerUpload}>
                        <div className='d-flex flex-column align-items-center'>
                            <input type='file' style={{ display: 'none' }} id='upload-scan' onChange={uploadScan}></input>
                            <Upload size={60}/> 
                        </div>                
                    </div>
                    <p className='font-size-22 text-center'>Upload files from your PC</p>
                </div>
                :
                <div className='d-flex flex-wrap flex-row w-full justify-content-center align-items-center mt-20 scan-area'>
                    {
                        scans.map((scan, index) => {
                            return(
                            <div key={index} className="w-350 mw-full">
                              <div className="card p-0 border border-0"> 
                                <div className='text-center'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RV6NNEzdhsxgOHXeiFMk889St-5tGDQTQ9bdcq9ZlQh8sGYdJhycLKd7RkLz-jt4JHQ&usqp=CAU' className='img-fluid rounded-top' alt="Scan"/>
                                </div> 
                                <div className="content">
                                  <h2 className="content-title text-center font-weight-bold">
                                    {scan.title}
                                  </h2>
                                  <p className='text-muted text-center font-weight-lighter'>
                                    {scan.date}
                                  </p>
                                </div>
                                <div className='text-center'>
                                    <Trash onClick={() => deleteScan(scan.scanId)}/>
                                </div>
                              </div>
                            </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}

export default Scans;