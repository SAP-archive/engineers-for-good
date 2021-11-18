import React from "react";
import "./TextBox.css";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

/**
 * Displays an editor with a field to enter text and with a header, that contains a menu to format the text.
 */
const TextBox = ({ textBoxContent, handleChange }) => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }, 'bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{'color': []}], [{ 'background': []}, { 'script':  'sub' }, { 'script':  'super' }, { 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background', 'script',
    'list', 'bullet',
    'link',
    'clean'
  ]

  return (
    <div className="TextBox">
      <header className="TextBox-header">
        <ReactQuill className='ql-custom'
          theme='snow'
          modules={modules}
          formats={formats}
          style={{ minHeight: '100px', minWidth: '480px', marginRight:'20px', paddingBottom: '20px'}}
          value={textBoxContent}
          onChange={handleChange}
        />
      </header>
    </div>
  );

}
export default TextBox;