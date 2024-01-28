import React from "react";
import { Button } from "./components/Button";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 p-12">
      <div className="flex flex-1 gap-8"> {/* Added gap for spacing between columns */}
        <div className="w-1/2 flex flex-col space-y-6 items-center">
          <h3 className="text-4xl font-semibold w-full text-center">Project Title</h3>
          <textarea className="w-5/6 h-64 p-4 border border-gray-200 rounded-lg shadow-sm" placeholder='Summary will be displayed here' readOnly></textarea>
          <div className="flex w-5/6 space-x-2">
            <button className="flex-1 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">Elaborate</button>
            <button className="flex-1 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">Simplify</button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col space-y-6 items-center">
          <div className="w-full space-y-4">
            <h3 className="text-4xl font-semibold w-full text-center">Upload Medical Report</h3>
            <input type="file" className="w-full py-3 border border-gray-200 rounded-lg shadow-sm" />
          </div>

          <div className="w-full flex flex-col space-y-4">
            <h3 className="text-4xl font-semibold w-full text-center">Doctor's Notes</h3>
            <textarea className="w-full h-64 p-4 border border-gray-200 rounded-lg shadow-sm" placeholder="Enter your text..."></textarea>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center mt-6'> {/* Adjusted alignment and margin */}
        <button className="w-3/4 py-4 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          Submit
        </button>
      </div>
    </div>
  );
};