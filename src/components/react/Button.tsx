import * as React from "react";
import {
  Button as PaperButton,
  type ButtonProps as PaperButtonProps,
} from "react-native-paper";

export const ButtonComponent = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <PaperButton
        mode="contained"
        onPress={() => setShow(!show)}
        style={{ marginBottom: 10 }}
      >
        {show ? "Hide" : "Show"} Button
      </PaperButton>
      {show && (
        <PaperButton
          mode="outlined"
          onPress={() => console.log("Button Pressed")}
        >
          Press Me
        </PaperButton>
      )}
    </div>
  );
};
