import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

const MarkDown = ({label, value, changeValue, name, invalidField, setInvalidFields}) => {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //     console.log(editorRef.current.getContent());
    //     }
    // };
    return (
        <>
            <span className="block mb-2 text-sm font-medium text-white">{label}</span>
            <Editor
                apiKey='89bkg104blfqtxvtc0aj7aj2ja1zf0mv0sz4j4382isvg4ym'
                // onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidField?.some(el => el.name === name) && <span className='text-sm text-main'>{invalidField?.find(el => el.name === name)?.mes}</span>}
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    )
}

export default MarkDown