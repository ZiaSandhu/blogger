import React, { useEffect, useState } from 'react'
import { getUsers } from '../api';

const Test = () => {
  const [data,setData]= useState()

  useEffect(()=>{
    const fetchData = async () => {
        try {
          const apiData = await getUsers();
          setData(apiData);
        //   setLoading(false);
        } catch (error) {
        //   setError(error);
        //   setLoading(false);
        }
      };
  
      fetchData(); 
  },[])
    return (
    <>
        {
        data
        }
    </>
  )
}

export default Test