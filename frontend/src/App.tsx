import React from 'react';
import logo from './logo.svg';
import './App.css';

function simplify(){
  
}

function App() {
  return (<div className="flex flex-col h-screen p-12">
    <div className="flex flex-1">
      <div className="w-1/2 flex flex-col space-y-4 justify-start items-center">
        <h3 className="text-3xl font-bold w-5/6">Project Title</h3>
        <textarea className="w-5/6 h-5/6 p-2 border border-gray-300 rounded-lg shadow-md" placeholder='Summary will be displyed here' readOnly></textarea>
        <div className="flex w-5/6 space-x-2">
          <button className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-1/2">Elaborate</button>
          <button className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-1/2">Simplify</button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col space-y-4 justify-start items-center">
        <div className="w-full space-y-4">
          <h3 className="text-3xl font-bold w-5/6">Upload Medical Report</h3>
          <input type="file" className="w-full p-3 border border-gray-300 rounded-lg shadow-md" />
        </div>

        <div className="w-full h-4/5 space-y-4">
          <h3 className="text-3xl font-bold w-5/6">Doctor's Notes</h3>
          <textarea className="w-full h-5/6 p-2 border border-gray-300 rounded-lg shadow-md" placeholder="Enter your text..."></textarea>
        </div>
      </div>
    </div>
    <div className='w-full flex items-start justify-center'>
      <button className="w-3/4 p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100">
        Submit
      </button>
    </div>
  </div>
  );
}

export default App;
