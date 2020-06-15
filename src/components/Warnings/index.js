import React from "react";
import { useSelector } from "react-redux";
import HardToReadSentences from "./HardToReadSentences";
import Adverbs from "./Adverbs";
import VeryHardToReadSentences from "./VeryHardToReadSentences";
import PassiveVoice from "./PassiveVoice";
const Warnings = () => {
  const warnings = useSelector((state) => state.documentState.warnings);
  if (warnings) {
    const {
      hardToReadSentences,
      veryHardToReadSentences,
      tooManyAdverbsSentences,
      tooManyPassiveVoiceSentences,
    } = warnings;
    return (
      <div>
        {hardToReadSentences && hardToReadSentences.length > 0 && (
          <HardToReadSentences count={hardToReadSentences.length} sentences={hardToReadSentences} />
        )}
        {veryHardToReadSentences && veryHardToReadSentences.length > 0 && (
          <VeryHardToReadSentences count={veryHardToReadSentences.length} />
        )}
        {tooManyAdverbsSentences && tooManyAdverbsSentences.length > 0 && (
          <Adverbs count={tooManyAdverbsSentences.length} />
        )}
        {tooManyPassiveVoiceSentences &&
          tooManyPassiveVoiceSentences.length > 0 && (
            <PassiveVoice count={tooManyPassiveVoiceSentences.length} />
          )}
      </div>
    );
  }
  return <></>;
};

export default Warnings;
