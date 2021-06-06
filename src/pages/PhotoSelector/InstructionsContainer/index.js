import { memo } from 'react';
import PropTypes from 'prop-types';
import SelectionStep from 'pages/PhotoSelector/InstructionsContainer/SelectionStep';
import messages from 'utils/messages';
import styles from './instructionsContainer.module.scss';

const InstructionsContainer = ({ saveSelection }) => {
  return (
    <div className={styles.main}>
      <SelectionStep
        stepText={messages.homePage.stepTextOne}
        heading={messages.homePage.headingOne}
        bodyText={messages.homePage.bodyTextOne}
        isButtonShown={false}
      />
      <SelectionStep
        stepText={messages.homePage.stepTextTwo}
        heading={messages.homePage.headingTwo}
        bodyText={messages.homePage.bodyTextTwo}
        buttonText={messages.homePage.saveButtonText}
        isButtonShown
        buttonFunction={saveSelection}
      />
    </div>
  );
};

InstructionsContainer.propTypes = {
  saveSelection: PropTypes.func.isRequired,
};

export default memo(InstructionsContainer);
