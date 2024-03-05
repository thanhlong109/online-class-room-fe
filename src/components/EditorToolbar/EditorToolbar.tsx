import { Button } from 'antd';
import { EditorState } from 'draft-js';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { useState } from 'react';

interface EditorToolbarTools {
    style: string;
    icon: React.ReactNode;
}

const defaultDisplayTools: EditorToolbarTools[] = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
    { icon: <StrikethroughSIcon />, style: 'STRIKETHROUGH' },
];

const EditorToolbar: React.FC<{
    editorState: EditorState;
    onEditorStateChange: (state: EditorState) => void;
    onStyleButtonClick: (style: string) => void;
}> = ({ editorState, onEditorStateChange, onStyleButtonClick }) => {
    return (
        <div style={{ marginBottom: '10px' }} className="flex gap-2">
            {defaultDisplayTools.map((tool, index) => (
                <Button
                    size="small"
                    shape="default"
                    icon={tool.icon}
                    key={index}
                    onClick={() => {
                        onStyleButtonClick(tool.style);
                    }}
                ></Button>
            ))}
        </div>
    );
};
export default EditorToolbar;
