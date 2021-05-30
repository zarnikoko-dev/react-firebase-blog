import React, { useEffect, useRef} from 'react';
import { withRouter } from 'react-router-dom';
import AddBlogProvider from './AddBlogProvider'
import AddBlogForm from './AddBlogForm'
import AddBlogPreview from './AddBlogPreview';
import SuccessBlogAlert from './SuccessBlogAlert';

// const usePrevious = value => {
//     const ref = useRef();

//     useEffect(()=>{
//         ref.current = value;
//     })

//     return ref.current
// }

const AddBlog = (props)=> {
    const _mounted = useRef(false);
    // const prevTags = usePrevious(tags);
    useEffect(()=>{
        if(!_mounted.current){
            _mounted.current = true
        }else{
            // if(tags.length>prevTags.length){
            //     if(tags.length-1 !== i)
            //     tagRef.current[i+1].current.focus();
            // }
        }   
    },[]);

    return(
        <AddBlogProvider>
            <SuccessBlogAlert/>
            <AddBlogForm/>
            <AddBlogPreview/>
        </AddBlogProvider>
    )
};

export default withRouter(AddBlog);