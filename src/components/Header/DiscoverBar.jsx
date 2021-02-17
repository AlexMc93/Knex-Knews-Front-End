import React from 'react';
import TopicList from '../Lists/TopicList';

const DiscoverBar = (props) => {
    return (
        <div>
            <TopicList toggle={props.toggle}/>
        </div>
    );
};

export default DiscoverBar;