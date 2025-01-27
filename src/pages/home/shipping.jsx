import { useLocation } from "react-router-dom";

export default function ShippingPage() {
  //apata meken hambenne podi json ekk
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <h1>Shipping Page</h1>
    </>
  );
}
