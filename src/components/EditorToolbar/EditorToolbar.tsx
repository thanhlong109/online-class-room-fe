import { EditorState } from 'draft-js';

const EditorToolbar: React.FC<{
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    onStyleButtonClick: (style: string) => void;
}> = ({ editorState, onEditorStateChange, onStyleButtonClick }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <button onClick={() => onStyleButtonClick('BOLD')}>Bold</button>
            <button onClick={() => onStyleButtonClick('ITALIC')}>Italic</button>
            <button onClick={() => onStyleButtonClick('UNDERLINE')}>Underline</button>
        </div>
    );
};
export default EditorToolbar;
