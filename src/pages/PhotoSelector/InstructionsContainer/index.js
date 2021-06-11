import { memo } from 'react';
import PropTypes from 'prop-types';
import SelectionStep from 'pages/PhotoSelector/InstructionsContainer/SelectionStep';
import messages from 'utils/messages';
import styles from './instructionsContainer.module.scss';

/**
 * The component that contains the instructions for photo selection
 */
const InstructionsContainer = ({ saveSelection, updateSelection }) => {
  return (
    <div className={styles.main}>
      <SelectionStep
        stepText={messages.selectorPage.stepTextOne}
        heading={messages.selectorPage.headingOne}
        bodyText={messages.selectorPage.bodyTextOne}
        isButtonShown={false}
      />
      <SelectionStep
        stepText={messages.selectorPage.stepTextTwo}
        heading={messages.selectorPage.headingTwo}
        bodyText={messages.selectorPage.bodyTextTwo}
        buttonText={messages.selectorPage.saveButtonText}
        isButtonShown
        saveSelection={saveSelection}
        updateSelection={updateSelection}
      />
    </div>
  );
};

InstructionsContainer.propTypes = {
  saveSelection: PropTypes.func.isRequired,
  updateSelection: PropTypes.func.isRequired,
};

export default memo(InstructionsContainer);
