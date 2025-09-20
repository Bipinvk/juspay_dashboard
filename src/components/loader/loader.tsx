import React from "react";
import { Loader2 } from "lucide-react";
import "./loader.css"; // Ensure you have a CSS file for styling the loader
const Loader: React.FC = () => (
    <div className='flex items-center justify-center h-8 w-full'>
        {/* <span className="loader" /> */}
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
    </div>
);

export default Loader;
