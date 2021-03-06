import React, { useState, useEffect } from 'react'

import Modal from '../../Components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

  const [ error, setError ] = useState(null)

  const errorConfirmedHandler = () => {
    setError(null)
  }
    


  const reqInterceptor = axios.interceptors.request.use( req => {
    setError(null)
    return req;
  })
  const resInterceptor = axios.interceptors.response.use(res => res, err => {
    setError(err)
  })

      
    

  useEffect(() => { 
    return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);  
    };
  }, [reqInterceptor, resInterceptor])
     
    

    
      return (  
        <Auxiliary>
          <Modal modalClosed={errorConfirmedHandler}
           show={error}> {error? error.message: null}</Modal>
          <WrappedComponent {...props} />
        </Auxiliary>
      )
 
  }
};

export default withErrorHandler;