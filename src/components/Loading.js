import React from 'react';

const Loading = (props) => (
    <>
        {props.loading ? <img className="d-block mx-auto" src="https://i.imgur.com/aIOeCH4.gif" alt="loading" /> : null}
    </>
)


export default Loading