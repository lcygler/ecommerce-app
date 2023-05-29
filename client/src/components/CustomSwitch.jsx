import { useEffect, useState } from 'react';

import { Switch } from '@chakra-ui/react';

function CustomSwitch({ isChecked, onChange }) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = () => {
    const updatedChecked = !checked; // Toggles the value of the local checked state
    setChecked(updatedChecked); // React will re-render the component with the updated state
    onChange(updatedChecked); // Invokes the onChange function passed as a prop to the CustomSwitch component
  };

  return <Switch isChecked={checked} onChange={handleChange} />;
}

export default CustomSwitch;
