import React, { useState, useEffect } from 'react';
import { getSingleBlog, userDetails, deleteBlog } from '../api';

const Show = (props) => {
    const [blog, setblog] = useState([]);

    useEffect(() => {
        const iid = props.match.params.id;
        let currUserId;
        let authorId;
        const data = async () => {
            if (localStorage.getItem('token')) {
                const { data } = await userDetails();
                currUserId = data.id
            }
            const currBlog = await getSingleBlog(iid)
            authorId = currBlog[0].author.id
            setblog({ ...currBlog, currUserId, authorId })
        }
        data();
    }, [])

    const handleDelete = async (id) => {
        const delres = await deleteBlog(id);
        if (delres.status === 200) {
            props.history.push('/blogs')
        }
    }

    const newBlog = blog.currUserId === blog.authorId ? (
        blog[0] ? (
            <div>
                <div className='center'>
                    <div className="container">
                        <h2>{blog[0].title}</h2>
                    </div>
                </div>
                <div className='center'>
                    <img src={blog[0].image} alt={blog[0].title} />

                </div>
                <div>
                    <div className="container para">
                        <p>{blog[0].body}</p>
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <button className="btn-floating btn-large red waves-effect">
                        <i className="large material-icons">mode_edit</i>
                    </button>
                    <button className="btn-floating btn-large red waves-effect" onClick={() => handleDelete(blog[0]._id)}>
                        <i className="large material-icons">delete</i>
                    </button>
                </div>

            </div>
        ) : (
                <div className="center">Loading.....</div>
            )
    ) : (
            blog[0] ? (
                <div>
                    <div className='center'>
                        <div className="container">
                            <h2>{blog[0].title}</h2>
                        </div>
                    </div>
                    <div className='center'>
                        <img src={blog[0].image} alt={blog[0].title} />

                    </div>
                    <div>
                        <div className="container para">
                            <p>{blog[0].body}</p>
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="center">Loading.....</div>
                )
        )
    return (
        <div className='l12 m8 s12 post'>
            {newBlog}
        </div>
    );
}

export default Show;
