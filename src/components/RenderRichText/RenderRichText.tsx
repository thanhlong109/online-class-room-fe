import draftToHtml from 'draftjs-to-html';

const RenderRichText = ({ jsonData }: { jsonData: string }) => {
    let renderedContent = '';

    try {
        const parsedData = JSON.parse(jsonData);
        renderedContent = draftToHtml(parsedData);
    } catch (error) {
        //console.error('Error parsing JSON:', error);
    }

    return <div dangerouslySetInnerHTML={{ __html: renderedContent }} />;
};

export default RenderRichText;
