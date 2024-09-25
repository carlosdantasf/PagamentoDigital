import React from 'react';

const baseStyle: React.CSSProperties = {
    display: "block",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    margin: "20px 0",
    padding: "10px 20px",
    textAlign: "center",
    backgroundColor: "#e9e9e9",
    border: "2px solid #bbb",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, border-color 0.3s ease"
};

const H1Span = ({ children, backgroundColor }: { children: React.ReactNode, backgroundColor?: string}) => {
    let style:React.CSSProperties;
    if(backgroundColor) {
        style = {
            ...baseStyle,
            backgroundColor: backgroundColor,
        };
    }else{
        style = {...baseStyle};
    }
    return <>
        <span style={style}>
            {children}
        </span>
    </>
}

export default H1Span;