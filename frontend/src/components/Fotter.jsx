 import {useState} from "react";

const Footer = () => {
  const [count, setCount] = useState(0);

  return (
    <footer>
      <p>&copy; 2023 NearNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;