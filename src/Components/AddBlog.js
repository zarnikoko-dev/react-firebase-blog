import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from '../axiosConfig'

// const usePrevious = value => {
//     const ref = useRef();

//     useEffect(()=>{
//         ref.current = value;
//     })

//     return ref.current
// }

const AddBlog = (props)=> {
    const tagRef = useRef([]);
    const _mounted = useRef(false);
    const [isPosting,setIsPosting] = useState(false);
    const [success,setSuccess] = useState(false)
    const [title,setTitle] = useState('');
    const [contents,setContents] = useState('');
    const authors =[
        'Famous',
        'Unknown',
        'Anonymous',
        'Popular',
        'Who care'
    ];
    const categories =[
        'Science',
        'Health',
        'Education',
        'LifeStyle',
        'Fashion'
    ];

    const [tags,setTags] = useState(['']);

    // const prevTags = usePrevious(tags);

    const [selectedAuthor,setSelectedAuthor] = useState('');

    const [selectedCategories,setSelectedCategories] =  useState([]);

    tagRef.current = tags.map((v,i)=>
        tagRef.current[i] = React.createRef()
    );

    const handleCategoriesChecked = (e) => {
        if(e.target.checked){
            setSelectedCategories(selectedCategories.concat(e.target.value))
        }else{
            setSelectedCategories(selectedCategories.filter((category)=>category!==e.target.value))
        }
    };

    const handleTagChange = (e,i) => {
        setTags((prevTags)=>{
            const copyTags = prevTags.slice() //copy array
            copyTags[i] = e.target.value
            return copyTags
        })
    };

    const handleTagKeyDown = (e,i) => {
        if(e.keyCode === 13){ // enter
            if(e.target.value !== '' && tags.length-1 === i){
                setTags((tags)=>{
                    return tags.concat('')
                })
            }

            if(tags.length-1 !== i || e.target.value!==''){
                setTimeout(function(){
                    tagRef.current[i+1].current.focus();
                },100) 
            } 
        }else if(e.keyCode === 8) { // backspace
            if(e.target.value==='' && tags.length !== 1){
                setTimeout(()=>{
                    removeAndFocusTag(i)
                },100)
            }
        }
    };

    const handleTagBlur = (e,i)=>{
        if(e.target.value==='' && tags.length !== 1){
            removeTag(i)
        }
    };

    const removeTag = (i) => {
        setTags((prevTags)=>{
            const copyTags = prevTags.slice()
            copyTags.splice(i,1)
            return copyTags
            // return tags.filter((tag,index)=>i!==index)
        })
    };

    const removeAndFocusTag = (i) => {
        removeTag(i);
        if(i===0)
        i++
        tagRef.current[i-1].current.focus();
    };

    const handleSubmit = async (e) => {
        setIsPosting(true)
        try{
            const response =  await axios.post('/blogs.json',{
                title:title,
                contents:contents,
                author:selectedAuthor,
                categories:selectedCategories,
                tags:tags,
                createdAt : {".sv": "timestamp"}
            })
            if(response.status === 200){
                setSuccess(true)
            }
        }catch(error){
            console.log(error)
        } 
        setIsPosting(false)
    };

    const reset = () => {
        setTitle('');
        setContents('');
        setSelectedAuthor('');
        setSelectedCategories([]);
        setTags([''])
        setSuccess(false)
    }

    useEffect(()=>{
        if(!_mounted.current){
            _mounted.current = true
        }else{
            // if(tags.length>prevTags.length){
            //     if(tags.length-1 !== i)
            //     tagRef.current[i+1].current.focus();
            // }
        }   
    },[tags]);

    return(
        <div className="col-md-8 offset-md-2 p-3">
            {success?
                <div className="alert alert-success" role="alert">
                    New blog posted successfully. 
                    <div className='float-vertical-align'>
                        <button className="btn btn-sm btn-outline-success" onClick={reset}>OK</button>
                    </div>
                </div>
            :
                <div className="mb-3">
                    <h3 className="text-center text-info mb-5">Add A Blog</h3>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">Title: </label>
                            <div className="col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    placeholder="Enter Blog Title ..." autoFocus  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">Contents: </label>
                            <div className="col-sm-8">
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    placeholder="Blog Contents"
                                    value={contents}
                                    onChange={(e)=>setContents(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">Author: </label>
                            <div className="col-sm-8">
                                <select className="form-control" onChange={(e)=>setSelectedAuthor(e.target.value)}>
                                    <option value="">Select Author</option>
                                    {authors.map((author,i)=>{
                                        return <option value={author} key={i}>
                                            {author}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">Categories: </label>
                            <div className="col-sm-8">
                                {categories.map((category,i)=>{
                                    return <div className="form-check-inline" style={{marginTop:"10px"}} key={i}>
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={(e)=>{handleCategoriesChecked(e)}}
                                        />
                                        <label className="form-check-label">{category}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">
                                Tags: 
                            </label>
                            <div className="col-sm-8">
                                <div className="row">
                                    {tags.map((tag,i)=>{
                                        return  <div className="input-group col-md-4 mt-1" key={i}>
                                            <input 
                                                placeholder="tag" 
                                                className="form-control col-md-8 py-2 border-right-0 border"
                                                value={tag}
                                                onChange={(e)=> handleTagChange(e,i) }
                                                onKeyDown={(e)=>handleTagKeyDown(e,i)}
                                                onBlur = {(e)=>handleTagBlur(e,i)}
                                                ref={tagRef.current[i]}
                                            />
                                            {tags.length>1?
                                                <div className="input-group-prepend">
                                                    <button 
                                                        className="btn btn-outline-secondary border-left-0 border" 
                                                        type="button"
                                                        onClick={()=>removeTag(i)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            :null}
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary btn-sm pl-3 pr-3 mt-3" onClick={handleSubmit} disabled={isPosting}>
                            {isPosting?
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Posting...
                                </>
                                :  <span>Post</span>
                            }
                        </button>
                    </form>
                </div>
            }
            <div className="mb-3 mt-3 bg-secondary p-5" style={{borderRadius:'15px',boxShadow:'5px 10px 8px #888888'}}>
                <h3 className="text-center mb-3 text-primary">Preview</h3>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-center text-primary">Title: </label>
                    <label className="col-sm-8 col-form-label text-left text-light"><h5>{title}</h5></label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-center text-primary">Contents: </label>
                    <p className="col-sm-12 col-form-label text-left text-light" style={{whiteSpace:'pre-wrap'}}>{contents}</p>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-center text-primary">Author: </label>
                    <label className="col-sm-8 col-form-label text-left text-light"><h6>{selectedAuthor}</h6></label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-center text-primary">Categories: </label>
                    <div className="col-sm-12 col-form-label text-left text-light">
                        <ul>
                            {selectedCategories.map((category,i)=>{
                                return <li key={i}>{category}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="form-group row" style={{marginTop:'-30px'}}>
                    <label className="col-sm-2 col-form-label text-center text-primary">Tags: </label>
                    <div className="col-sm-12 col-form-label text-left text-light">
                        <ul style={{listStyleType:'none'}}>
                            {tags.map((tag,i)=>{
                                return tag!==''?<li key={i}>{'#'+tag}</li>:null
                            })}
                        </ul>
                    </div>
                </div>
            </div> 
        </div>
    )
};

export default withRouter(AddBlog);