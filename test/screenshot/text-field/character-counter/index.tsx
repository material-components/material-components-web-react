import React from 'react';
import CharacterCounter from '../../../../packages/text-field/character-counter';

import '../../../../packages/text-field/character-counter/index.scss';

const TextFieldCharacterCounterScreenshotTest = () => {
  return (
    <div>
      <CharacterCounter />
      <CharacterCounter template='now(${count} / max(${maxLength}))' />
    </div>
  );
};
export default TextFieldCharacterCounterScreenshotTest;
