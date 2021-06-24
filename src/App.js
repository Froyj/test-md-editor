import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";

import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState("write");

  useEffect(() => {
    axios
      .get('http://localhost:4000/posts')
      .then((res) => setContent(res.data.content));
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:4000/posts', {content}).then((res) => {
      console.log(res.data.content)
      alert('success')
    }).catch(err => {
      alert(`bouuuuh ${err.message}`)
    })
  }


  return (
    <div className='App'>
      <div className='container'>
        <ReactMde
          value={content}
          onChange={setContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown>{content}</ReactMarkdown>)
          }
        />
      </div>
      <button type='button' onClick={handleSubmit}>save</button>
    </div>
  );
}

export default App;
