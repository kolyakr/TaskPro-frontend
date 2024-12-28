import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (time === 0) {
      navigate("/home");
    }

    setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, [time, navigate]);

  return (
    <div>
      <p>Not found page 404</p>
      <p>Navigate to home after {time} seconds</p>
    </div>
  );
};

export default NotFoundPage;
