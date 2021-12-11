import { Spin } from 'antd';
import React from 'react';
import classnames from "classnames"

const LoadingComponent = ({inline, text}) => {
    return (
        <div 
            className={
                classnames(
                    "loading-component text-center", 
                    inline && "inline-loading d-flex justify-content-center align-items-center"
                )
            }
        >
            <Spin size="large" tip={text || "Loading..."} />
        </div>
    );
};

export default LoadingComponent;