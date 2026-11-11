import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import ReroutePickupNormalDealerFormContent from "./ReroutePickupNormalDealerFormContent";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function ReroutePickupNormalDealerTemplate() {
  const { loading } = useRerouteRefreshRedirect();

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <QuarterScreenWrapper>
      <Header />
      <ReroutePickupNormalDealerFormContent />
      <Footer />
    </QuarterScreenWrapper>
  );
}

export default ReroutePickupNormalDealerTemplate;
