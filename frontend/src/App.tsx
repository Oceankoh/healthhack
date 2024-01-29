import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function App() {
    const [report, setReport] = useState("Simplified Report will appear here");
    const [notes, setNotes] = useState("");
    const [file, setFile] = useState<File | null>(null);

    async function poll() {
        // Your polling logic here
        console.log("Polling function called");
        const url = `${window.location.protocol}//${window.location.hostname}:3000/updates`;
        try {
            const response = await fetch(url, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.status);
            // if (response.status === 304) return;
            let data = await response.text();
            if (data !== "No run detected") {
                data = data.replace(/\\n/gi, "\n").replace(/\n/gi, "<br/>");
                setReport(data);
            }
        } catch (error) {
            console.error("Error in GET request:", error);
            // setTimeout(poll, 1000); // Poll every 1000 milliseconds (1 second)
        }
        setTimeout(() => {
            poll();
        }, 2000);
    }

    const updateReport = async (
        endpoint: "/simplify" | "/elaborate",
        text: string
    ) => {
        const url = `${window.location.protocol}//${window.location.hostname}:3000`;

        // Create a FormData object
        const formData = new FormData();
        formData.append("text", text); // Append your string data

        try {
            const response = await fetch(url + endpoint, {
                credentials: "include",
                method: "POST",
                body: formData, // FormData will set the content type to 'multipart/form-data'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            setReport(data);
        } catch (error) {
            console.error("Error in POST request:", error);
        }
    };

    const generateReport = async (file: any, text: string) => {
        const url = `${window.location.protocol}//${window.location.hostname}:3000/interpret`;

        // Create a FormData object
        const formData = new FormData();
        formData.append("text", text); // Append your string data

        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(url, {
                credentials: "include",
                method: "POST",
                body: formData, // FormData will set the content type to 'multipart/form-data'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            console.log(data);
            if (data === "queued") {
                setReport("Loading...");
                poll();
            }
        } catch (error) {
            console.error("Error in POST request:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen p-12">
            <div className="flex h-5/6 flex-1">
                <div className="w-1/2 flex flex-col space-y-4 justify-start items-center">
                    <h3 className="text-3xl font-bold w-5/6">Project Title</h3>
                    <div className="w-5/6 h-5/6 p-2 border border-gray-300 rounded-lg shadow-md overflow-auto">
                        <ReactMarkdown
                            children={report}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        ></ReactMarkdown>
                    </div>
                    <div className="flex w-5/6 space-x-2">
                        <button
                            onClick={() => updateReport("/elaborate", report)}
                            className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-1/2"
                        >
                            Elaborate
                        </button>
                        <button
                            onClick={() => updateReport("/simplify", report)}
                            className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 w-1/2"
                        >
                            Simplify
                        </button>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col space-y-4 justify-start items-center">
                    <div className="w-full space-y-4">
                        <h3 className="text-3xl font-bold w-5/6">
                            Upload Medical Report
                        </h3>
                        <input
                            onChange={(event) => {
                                // Get the file from the event target
                                const file = event.target.files![0];
                                if (file) {
                                    setFile(file);
                                } else {
                                    setFile(null);
                                }
                            }}
                            type="file"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md"
                        />
                    </div>

                    <div className="w-full h-5/6 space-y-4">
                        <h3 className="text-3xl font-bold w-5/6">
                            Doctor's Notes
                        </h3>
                        <textarea
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            className="w-full h-5/6 p-2 border border-gray-300 rounded-lg shadow-md"
                            placeholder="Enter your text..."
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-start justify-center">
                <button
                    disabled={report === "Waiting..." || report === "Loading..."}
                    onClick={() => generateReport(file, notes)}
                    className="w-3/4 p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default App;
