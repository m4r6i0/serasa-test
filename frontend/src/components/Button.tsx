import React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  onClick: () => void;
  text: string;
  color?: "primary" | "secondary";
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text, color = "primary" }) => (
  <Button variant="contained" color={color} onClick={onClick}>
    {text}
  </Button>
);

export default CustomButton;
