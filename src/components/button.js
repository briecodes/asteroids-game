import React, { useState } from 'react';

export default function Button(props) {
  const [buttonText, setButtonText] = useState({text: 'Increase count', style: ''});

  function updateButton() {
    setButtonText({text: 'Good! Count again!', style: 'active'});
    props.setCounter.setCounter(props.setCounter.counter + 1);
  }

  return (
    <button onClick={updateButton} className={buttonText.style}>
      {buttonText.text}
    </button>
  );
};