import React,{useState,useEffect} from 'react'
import templates from './templatesResource/templates.css';
import { pageimEndPoint } from '../../Config';
//using get_html 
export const dynamicTemplates = () => {
    const API_ENDPOINT = pageimEndPoint();

    const [site, setSite] = useState('');

    useEffect(() => {
        const URL = `${API_ENDPOINT}/pageim/getHtml?page_name=templates`;
        fetch(URL, {
            method: 'GET',
            headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] }
        })
            .then(response => {
               // debugger
                return response.json()
            })
            .then(res => {
                //debugger
                setSite(res &&res.appsresult[0] && res.appsresult[0][0].page_html? res.appsresult[0][0].page_html : null)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },[])


        return (
            <>
     {site}
     <div dangerouslySetInnerHTML={{__html: site}} />


            </>
        )
    }

export default dynamicTemplates;