import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const CountdownComponent = () => {
  const [count, setCount] = useState(45);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count, paused]);

  const togglePause = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{count}</Text>
      <Button title={paused ? 'Continue' : 'Pause'} onPress={togglePause} />
    </View>
  );
};

export default CountdownComponent;
