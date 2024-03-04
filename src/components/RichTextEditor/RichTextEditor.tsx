import React, { useState, useEffect } from 'react';
import {
    Editor,
    EditorState,
    ContentState,
    convertToRaw,
    convertFromRaw,
    RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditorToolbar } from '..';

interface RichTextEditorProps {
    initialValue: string;
    onValueChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onValueChange }) => {
    const [editorState, setEditorState] = useState(() => {
        if (initialValue) {
            const contentState = convertFromRaw(JSON.parse(initialValue));
            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    });

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const json = JSON.stringify(rawContentState);
        onValueChange(json);
    }, [editorState, onValueChange]);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleStyleButtonClick = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div>
            <EditorToolbar
                editorState={editorState}
                onEditorStateChange={setEditorState}
                onStyleButtonClick={handleStyleButtonClick}
            />
            <div style={{ border: '1px solid #ccc', padding: '5px' }}>
                <Editor editorState={editorState} onChange={handleEditorChange} />
            </div>
        </div>
    );
};

export default RichTextEditor;
