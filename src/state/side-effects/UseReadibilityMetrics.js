import {useState, useEffect, useCallback} from 'react';
import { useDocument } from './UseDocument';

export const useReadibilityMetrics = () => {

    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);
    const [currentDocument] = useDocument();
    console.log("in use readibility hook")
    useEffect(() => {
        console.log("Current document updated")
        console.log(currentDocument)
    })


    useEffect(() => {
        const editorState = currentDocument.body;
        console.log("updating metrics")
        var charCounter = 0;
        var wordCounter = 0;
        var sentenceCounter = 0;
        var paragraphCounter = 0;
        editorState.forEach((section) => {
          section.children.forEach((child) => {
            charCounter = charCounter + child.text.length;
            wordCounter = wordCounter + ((child.text.match(/[\w-]+/g) == null) ? 0 : child.text.match(/[\w-]+/g).length);
            if(section.type === "paragraph"){
                sentenceCounter = sentenceCounter + ((child.text.match(/[\w|)][.?!:](\s|$)/g) == null) ? 0 : child.text.match(/[\w|)][.?!:](\s|$)/g).length);
            }
          })
          if(section.type === "paragraph" && !section.children.every(child => child.text.length === 0 )){
            paragraphCounter += 1;
          }
        })
        setCharCount(charCounter)
        setWordCount(wordCounter);
        setSentenceCount(sentenceCounter);
        setParagraphCount(paragraphCounter);
    }, [])

    return [{charCount: charCount, wordCount: wordCount, sentenceCount: sentenceCount, paragraphCount: paragraphCount },
    {setCharCount: setCharCount, setWordCount: setWordCount, setSentenceCount: setSentenceCount, setParagraphCount: setParagraphCount}]
}
