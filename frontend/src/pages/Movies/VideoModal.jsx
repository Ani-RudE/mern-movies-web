import React from 'react';

const VideoModal = ({ videoUrl, onClose }) => {
     if (!videoUrl) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
               <div className="bg-gray-800 p-4">
                    <iframe
                         width="1120"
                         height="630
                         "
                         // width="560"
                         // height="315"
                         src={videoUrl}
                         // "https://www.youtube.com/embed/S9yO7rntATs?si=YmHS5gNTmGXXHHN3"
                         title="YouTube video player"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                    ></iframe>
                    <button onClick={onClose} className="mt-4 p-2 bg-red-600 text-white">
                         Close
                    </button>
               </div>
          </div>
     );
};

export default VideoModal;
