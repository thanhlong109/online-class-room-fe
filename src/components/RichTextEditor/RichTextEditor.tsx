import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditorToolbar } from '..';
import { Button } from 'antd';

interface RichTextEditorProps {
    initialValue: string;
    onSave?: (value: string) => void;
    onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    initialValue,
    onSave = undefined,
    onChange = undefined,
}) => {
    const [editorState, setEditorState] = useState(() => {
        if (initialValue) {
            let contentState;
            try {
                contentState = convertFromRaw(JSON.parse(initialValue));
            } catch (e: any) {
                return EditorState.createEmpty();
            }

            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    });

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        if (onChange) {
            const contentState = editorState.getCurrentContent();
            const rawContentState = convertToRaw(contentState);
            const json = JSON.stringify(rawContentState);
            onChange(json);
        }
    };

    const handleStyleButtonClick = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const handleOnSaveDescription = () => {
        if (onSave) {
            const contentState = editorState.getCurrentContent();
            const rawContentState = convertToRaw(contentState);
            const json = JSON.stringify(rawContentState);
            onSave(json);
        }
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
            {onSave && <Button onClick={handleOnSaveDescription}>Lưu</Button>}
        </div>
    );
};

export default RichTextEditor;
