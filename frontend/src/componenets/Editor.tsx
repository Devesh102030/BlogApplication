import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function BlogEditor() {
  
  const [title,settitle] = useState("");
  const [content,setcontent] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <TitleEditor onChange={(temp)=>{
        settitle(temp);
      }}/>
      <ContentEditor onChange={(temp)=>{
        setcontent(temp);
      }}/>
      <button onClick={async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
          title,
          content
        }, 
        {
          headers: {
              Authorization: localStorage.getItem("token")
            }
        });
          navigate(`/blog/${response.data.id}`)
      }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
          Publish post
      </button>
    </div>
  );
}


function ContentEditor({ onChange }: {onChange: (temp: string) => void}){
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorContainerRef.current || quillInstance.current) return;

    
    const editorElement = document.createElement('div');
    editorElement.style.height = '450px';
    editorContainerRef.current.appendChild(editorElement);

    
    quillInstance.current = new Quill(editorElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ]
      },
      placeholder: 'Write your content here...',
    });

    quillInstance.current.on('text-change', () => {
      const html = quillInstance.current?.root.innerHTML || '';
      onChange(html.trim());
    });

    return () => {
      if (editorContainerRef.current && quillInstance.current) {
        editorContainerRef.current.innerHTML = '';
        quillInstance.current = null;
      }
    };
  }, []);

  return(
    <div 
        ref={editorContainerRef} 
        className="border border-gray-200 rounded-lg overflow-hidden"
    />
  )
}


function TitleEditor({ onChange }: {onChange: (temp: string) => void}){
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorContainerRef.current || quillInstance.current) return;

    
    const editorElement = document.createElement('div');
    editorElement.style.height = '100px';
    editorContainerRef.current.appendChild(editorElement);

    
    quillInstance.current = new Quill(editorElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['clean']
        ]
      },
      placeholder: 'Write your Blog title here...',
    });

    quillInstance.current.on('text-change', () => {
      const s = quillInstance.current?.root.innerHTML || '';  
      onChange(s);
    });

    return () => {
      if (editorContainerRef.current && quillInstance.current) {
        editorContainerRef.current.innerHTML = '';
        quillInstance.current = null;
      }
    };
  }, []);

  return(
    <div 
        ref={editorContainerRef} 
        className="border border-gray-200 rounded-lg overflow-hidden"
    />
  )
}
