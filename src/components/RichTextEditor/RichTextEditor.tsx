import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditorToolbar } from '..';
import { Button } from 'antd';

interface RichTextEditorProps {
    initialValue: string;
    onSave: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onSave }) => {
    const [editorState, setEditorState] = useState(() => {
        if (initialValue) {
            const contentState = convertFromRaw(JSON.parse(initialValue));
            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    });

    useEffect(() => {}, [editorState]);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleStyleButtonClick = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const handleOnSaveDescription = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const json = JSON.stringify(rawContentState);
        onSave(json);
    };

    return (
        <div className="border-[1px]  p-4">
            <div className="border-b-[1px] border-[#ccc]">
                <EditorToolbar
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    onStyleButtonClick={handleStyleButtonClick}
                />
            </div>
            <div className="my-2 bg-[#f7f9fa] p-4">
                <Editor editorState={editorState} onChange={handleEditorChange} />
            </div>
            <Button onClick={handleOnSaveDescription}>Lưu</Button>
        </div>
    );
};

export default RichTextEditor;
