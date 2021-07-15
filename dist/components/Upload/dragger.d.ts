import React from "react";
interface DragProps {
    onFile: (files: FileList) => void;
}
declare const Dragger: React.FC<DragProps>;
export default Dragger;
