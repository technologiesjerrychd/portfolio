import WhatIDoCard from "../WhatIDoCard";
import devopsIcon from "@assets/generated_images/DevOps_automation_icon_illustration_bcf93f49.png";

export default function WhatIDoCardExample() {
  return (
    <WhatIDoCard
      title="DevOps Engineer"
      description="I enjoy improving the speed and quality of delivery, automating processes and achieving CI/CD excellence"
      icon={devopsIcon}
    />
  );
}
