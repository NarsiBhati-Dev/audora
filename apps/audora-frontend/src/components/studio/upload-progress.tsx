// 'use client';

// import React from 'react';
// import { useUpload } from '@/hooks/recording/useUpload';
// import { Upload, Pause, Play, X, CheckCircle, AlertCircle } from 'lucide-react';

// interface UploadProgressProps {
//     className?: string;
// }

// export const UploadProgress: React.FC<UploadProgressProps> = ({ className = '' }) => {
//     const {
//         status,
//         progress,
//         isUploading,
//         isPaused,
//         isCompleted,
//         hasError,
//         pause,
//         resume,
//         cancel,
//         formattedSpeed,
//         formattedTimeRemaining,
//         percentage,
//     } = useUpload();

//     if (status === 'idle') {
//         return null;
//     }

//     return (
//         <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}>
//             <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                     {isUploading && !isPaused && (
//                         <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
//                     )}
//                     {isPaused && (
//                         <Pause className="h-4 w-4 text-yellow-500" />
//                     )}
//                     {isCompleted && (
//                         <CheckCircle className="h-4 w-4 text-green-500" />
//                     )}
//                     {hasError && (
//                         <AlertCircle className="h-4 w-4 text-red-500" />
//                     )}

//                     <span className="text-sm font-medium">
//                         {isUploading && !isPaused && 'Uploading...'}
//                         {isPaused && 'Upload Paused'}
//                         {isCompleted && 'Upload Complete'}
//                         {hasError && 'Upload Error'}
//                     </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     {isUploading && !isPaused && (
//                         <button
//                             onClick={pause}
//                             className="p-1 text-gray-500 hover:text-gray-700"
//                             title="Pause upload"
//                         >
//                             <Pause className="h-4 w-4" />
//                         </button>
//                     )}

//                     {isPaused && (
//                         <button
//                             onClick={resume}
//                             className="p-1 text-gray-500 hover:text-gray-700"
//                             title="Resume upload"
//                         >
//                             <Play className="h-4 w-4" />
//                         </button>
//                     )}

//                     {(isUploading || isPaused) && (
//                         <button
//                             onClick={cancel}
//                             className="p-1 text-gray-500 hover:text-red-500"
//                             title="Cancel upload"
//                         >
//                             <X className="h-4 w-4" />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {progress && (
//                 <>
//                     {/* Progress Bar */}
//                     <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                         <div
//                             className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                             style={{ width: `${percentage}%` }}
//                         />
//                     </div>

//                     {/* Progress Details */}
//                     <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
//                         <div>
//                             <span className="font-medium">Progress:</span> {Math.round(percentage)}%
//                         </div>
//                         <div>
//                             <span className="font-medium">Speed:</span> {formattedSpeed}
//                         </div>
//                         <div>
//                             <span className="font-medium">Chunks:</span> {progress.uploadedChunks}/{progress.totalChunks}
//                         </div>
//                         <div>
//                             <span className="font-medium">Time Left:</span> {formattedTimeRemaining}
//                         </div>
//                         <div>
//                             <span className="font-medium">Uploaded:</span> {formatFileSize(progress.uploadedBytes)}
//                         </div>
//                         <div>
//                             <span className="font-medium">Total:</span> {formatFileSize(progress.totalBytes)}
//                         </div>
//                     </div>
//                 </>
//             )}

//             {hasError && (
//                 <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
//                     Upload failed. Please try again.
//                 </div>
//             )}
//         </div>
//     );
// };

// // Utility function to format file size
// const formatFileSize = (bytes: number): string => {
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     if (bytes === 0) return '0 Bytes';
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
// };

// // Upload button component
// interface UploadButtonProps {
//     onUpload: () => void;
//     disabled?: boolean;
//     children?: React.ReactNode;
//     className?: string;
// }

// export const UploadButton: React.FC<UploadButtonProps> = ({
//     onUpload,
//     disabled = false,
//     children = 'Upload Recording',
//     className = ''
// }) => {
//     return (
//         <button
//             onClick={onUpload}
//             disabled={disabled}
//             className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//         >
//             <Upload className="h-4 w-4" />
//             {children}
//         </button>
//     );
// };

// // Upload status indicator
// export const UploadStatusIndicator: React.FC = () => {
//     const { status, isUploading, isPaused, isCompleted, hasError } = useUpload();

//     if (status === 'idle') return null;

//     return (
//         <div className="fixed bottom-4 right-4 z-50">
//             <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-mono shadow-lg ${isUploading && !isPaused ? 'bg-blue-500 text-white' :
//                 isPaused ? 'bg-yellow-500 text-white' :
//                     isCompleted ? 'bg-green-500 text-white' :
//                         hasError ? 'bg-red-500 text-white' :
//                             'bg-gray-500 text-white'
//                 }`}>
//                 {isUploading && !isPaused && (
//                     <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
//                 )}
//                 {isPaused && <Pause className="h-3 w-3" />}
//                 {isCompleted && <CheckCircle className="h-3 w-3" />}
//                 {hasError && <AlertCircle className="h-3 w-3" />}

//                 <span>
//                     {isUploading && !isPaused && 'UPLOADING'}
//                     {isPaused && 'PAUSED'}
//                     {isCompleted && 'COMPLETE'}
//                     {hasError && 'ERROR'}
//                 </span>
//             </div>
//         </div>
//     );
// };
