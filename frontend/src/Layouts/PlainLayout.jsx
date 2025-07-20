import { Outlet } from "react-router-dom";

export default function PlainLayout() {
  return (
    <>
      <Outlet /> {/* No Slider/Nav, just the route content */}
    </>
  );
}