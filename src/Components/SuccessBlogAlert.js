import React, { useContext} from 'react'
import {AddBlogContext} from './AddBlogProvider';


const SuccessBlogAlert = () => {
    const {reset,success} = useContext(AddBlogContext)
    const [stateSuccess,setSuccess] = success;
    return(
        <>
            {stateSuccess &&
                <div className="alert alert-success" role="alert">
                    New blog posted successfully. 
                    <div className='float-vertical-align'>
                        <button className="btn btn-sm btn-outline-success" onClick={reset}>OK</button>
                    </div>
                </div>
            }
        </>
    )
}

export default SuccessBlogAlert