import React from 'react';

const DeleteContent = (props) => {

    const { type, handleDelete, id } = props;

    return (
        <button onClick={() => handleDelete(id)}>Delete this {type}</button>
    );
};

export default DeleteContent;