import Iridescence from "@/components/layout/background/Iridescence";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
    </div>
  );
};

export default page;
