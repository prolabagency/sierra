import React from 'react'

export default function TextSpace({ text, line }: { text: string, line?: boolean }) {
    return (
        <h1 className={`text-primary relative leading-[52.8px] font-rubik text-center ${!line ? 'food-title' : ''} text-[48px]`}>{text}
            <p className={` text_white font-rubik   text-[48px]`}>{text}</p>
        </h1>
    )
}
