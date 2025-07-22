import SweetAlert from "react-bootstrap-sweetalert";
import React, { useState } from "react";

function SweetAlertComponent({ confirm, cancel, title, subtitle, type }) {
  const [fadeOut, setFadeOut] = useState(false); // State to control fade-out effect
 

  const alertStyles = {
    zIndex: "1",
    fontFamily: "'Roboto', sans-serif",
    transition: "opacity 0.5s ease", // Smooth transition for opacity
    opacity: fadeOut ? 0 : 1, // Change opacity based on fadeOut state
  };

  const confirmButtonStyles = {
    backgroundColor: "maroon",
    border: "2px solid orangered",
    color: "#fff",
    "&:hover": {
      backgroundColor: "darkred",
    },
  };

  const cancelButtonStyles = {
    backgroundColor: "lightgray",
    border: "none",
    color: "black",
    "&:hover": {
      backgroundColor: "gray",
    },
  };

  const handleConfirm = () => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      confirm(); // Call confirm after fade-out is complete
    }, 500); // Duration should match the CSS transition duration
  };

  return (
    <SweetAlert
      style={alertStyles}
      title={title}
      onConfirm={handleConfirm} // Use the new handleConfirm function
      type={type !== undefined ? type : "warning"}
      showCancel={true}
      confirmBtnStyle={confirmButtonStyles}
      cancelBtnStyle={cancelButtonStyles}
      onCancel={cancel}
      customIcon={type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"} // Custom icon based on type
    >
      <h5 style={{ margin: 0, padding: '10px 0', color: type === "danger" ? "red" : "black" }}>
        {subtitle}
      </h5>
    </SweetAlert>
  );
}

export default SweetAlertComponent;