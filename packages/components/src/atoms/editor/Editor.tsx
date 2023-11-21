import EditorContainer from "@techstack/lexical";

import "@techstack/lexical/css";

export const Editor = ({ name }) => {
    return (
        <div>
            <EditorContainer name={name} value={''} onChange={() => {}} />
            <EditorContainer name={name} value={'<p>test</p>'}  onChange={() => {}} />
            <EditorContainer name={name} value={''}  onChange={() => {}} />
        </div>
    )
}

export default Editor;