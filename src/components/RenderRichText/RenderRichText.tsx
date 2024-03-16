import draftToHtml from 'draftjs-to-html';

const RenderRichText = ({ jsonData }: { jsonData: string }) => {
    let renderedContent = '';

    try {
        const parsedData = JSON.parse(jsonData);
        renderedContent = draftToHtml(parsedData);
    } catch (error) {
        const text = `{\"blocks\":[{\"key\":\"2ds8j\",\"text\":\"${jsonData}\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}`;
        try {
            const parsedData = JSON.parse(text);
            renderedContent = draftToHtml(parsedData);
        } catch (error) {
            console.error(error);
        }
    }

    return <div dangerouslySetInnerHTML={{ __html: renderedContent }} />;
};

export default RenderRichText;
