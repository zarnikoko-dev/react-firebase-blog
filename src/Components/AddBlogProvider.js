import React, { useState } from 'react'

export const AddBlogContext = React.createContext();

const AddBlogProvider = (props) => {
    const [success,setSuccess] = useState(false)
    const [title,setTitle] = useState('');
    const [contents,setContents] = useState('');
    const [selectedAuthor,setSelectedAuthor] = useState('');
    const [selectedCategories,setSelectedCategories] =  useState([]);
    const [tags,setTags] = useState(['']);

    const reset = () => {
        setTitle('');
        setContents('');
        setSelectedAuthor('');
        setSelectedCategories([]);
        setTags([''])
        setSuccess(false)
    }
    return(
        <AddBlogContext.Provider
            value={{
                success : [success,setSuccess],
                title : [title,setTitle],
                contents : [contents,setContents],
                selectedAuthor : [selectedAuthor,setSelectedAuthor],
                selectedCategories : [selectedCategories,setSelectedCategories],
                tags : [tags,setTags],
                reset : reset
            }}
        >
            <div className="col-md-8 offset-md-2 p-3">
                {props.children}
            </div>
        </AddBlogContext.Provider>
    )
}

export default AddBlogProvider