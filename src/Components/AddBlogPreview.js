import React, { useContext} from 'react'
import {AddBlogContext} from './AddBlogProvider';


const AddBlogPreview = () => {
    const {title,contents,selectedAuthor,selectedCategories,tags} = useContext(AddBlogContext)
    const [stateTitle,setTitle] = title;
    const [stateContents,setContents] = contents;
    const [stateSelectedAuthor,setSelectedAuthor] = selectedAuthor;
    const [stateSelectedCategories,setSelectedCategories] = selectedCategories;
    const [stateTags,setTags] = tags;
    return(
        <div className="mb-3 mt-3 bg-secondary p-5" style={{borderRadius:'15px',boxShadow:'5px 10px 8px #888888'}}>
            <h3 className="text-center mb-3 text-primary">Preview</h3>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label text-center text-primary">Title: </label>
                <label className="col-sm-8 col-form-label text-left text-light"><h5>{stateTitle}</h5></label>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label text-center text-primary">Contents: </label>
                <p className="col-sm-12 col-form-label text-left text-light" style={{whiteSpace:'pre-wrap'}}>{stateContents}</p>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label text-center text-primary">Author: </label>
                <label className="col-sm-8 col-form-label text-left text-light"><h6>{stateSelectedAuthor}</h6></label>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label text-center text-primary">Categories: </label>
                <div className="col-sm-12 col-form-label text-left text-light">
                    <ul>
                        {stateSelectedCategories.map((category,i)=>{
                            return <li key={i}>{category}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="form-group row" style={{marginTop:'-30px'}}>
                <label className="col-sm-2 col-form-label text-center text-primary">Tags: </label>
                <div className="col-sm-12 col-form-label text-left text-light">
                    <ul style={{listStyleType:'none'}}>
                        {stateTags.map((tag,i)=>{
                            return tag!==''?<li key={i}>{'#'+tag}</li>:null
                        })}
                    </ul>
                </div>
            </div>
        </div> 
    )
}

export default AddBlogPreview