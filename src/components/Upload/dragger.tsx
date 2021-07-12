import React, { useState } from "react";
import classNames from "classnames";

interface DragProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DragProps> = (props) => {
  const { onFile, children } = props;
  const [ dragOver, setDragOver ] = useState(false);
  const classes = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  });
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }
  return (
    <div className={classes} onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={handleDrop} >
      {children}
    </div>
  )
}

export default Dragger;
