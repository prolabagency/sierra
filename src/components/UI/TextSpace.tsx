import React from 'react'

export default function TextSpace({ text, line, classn}: { text: string, line?: boolean, classn?: string }) {
    return (
        <h1 className={`text-primary ${classn}  relative leading-[52.8px] font-rubik text-center ${!line ? 'food-title' : ''} text-[48px]`}>{text}
            <p className={` ${classn} text_white  font-rubik   text-[48px]`}>{text}</p>
        </h1>
    )
}
