import React, { useContext} from 'react'
import {AddBlogContext} from './AddBlogProvider';


const AddBlogSuccessAlert = () => {
    const {reset,success} = useContext(AddBlogContext)
    const [stateSuccess] = success;
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

export default AddBlogSuccessAlert