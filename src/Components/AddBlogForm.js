import React, { useContext,useRef,useState } from 'react'
import {AddBlogContext} from './AddBlogProvider';
import axios from '../axiosConfig'

const AddBlogForm = () => {
    const [isPosting,setIsPosting] = useState(false);
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
    const {success,title,contents,selectedAuthor,selectedCategories,tags} = useContext(AddBlogContext)
    const [stateSuccess,setSuccess] = success;
    const [stateTitle,setTitle] = title;
    const [stateContents,setContents] = contents;
    const [stateSelectedAuthor,setSelectedAuthor] = selectedAuthor;
    const [stateSelectedCategories,setSelectedCategories] = selectedCategories;
    const [stateTags,setTags] = tags;
    const tagRef = useRef([]);

    tagRef.current = stateTags.map((v,i)=>
        tagRef.current[i] = React.createRef()
    );

    const handleCategoriesChecked = (e,i) => {
        if(e.target.checked){
            setSelectedCategories((prevSelectedCategories)=>{
                return prevSelectedCategories.concat(e.target.value)
            })
        }else{
            setSelectedCategories((prevSelectedCategories)=>{
                // return prevSelectedCategories.filter((category)=>category!==e.target.value)
                const copySC = prevSelectedCategories.slice()
                const index = copySC.indexOf(e.target.value)
                copySC.splice(index,1)
                return copySC
            })
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
            if(e.target.value !== '' && stateTags.length-1 === i){
                setTags((prevTags)=>{
                    return prevTags.concat('')
                })
            }
            if(stateTags.length-1 !== i || e.target.value!==''){
                setTimeout(function(){
                    tagRef.current[i+1].current.focus();
                },100) 
            } 
        }else if(e.keyCode === 8) { // backspace
            if(e.target.value==='' && stateTags.length !== 1){
                setTimeout(()=>{
                    removeAndFocusTag(i)
                },100)
            }
        }
    };

    const handleTagBlur = (e,i)=>{
        if(e.target.value==='' && stateTags.length !== 1){
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
                title:stateTitle,
                contents:stateContents,
                author:stateSelectedAuthor,
                categories:stateSelectedCategories,
                tags:stateTags,
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
    return(
        <>
            {!stateSuccess &&
                <div className="mb-3">
                    <h3 className="text-center text-info mb-5">Add A Blog</h3>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-center">Title: </label>
                            <div className="col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={stateTitle}
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
                                    value={stateContents}
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
                                            checked={stateSelectedCategories.includes(category)}
                                            onChange={(e)=>{handleCategoriesChecked(e,i)}}
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
                                    {stateTags.map((tag,i)=>{
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
                                            {stateTags.length>1?
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
        </>
    )
}

export default AddBlogForm