import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import RerouteDeliveryLocationContentOfNormalDealer from "./RerouteDeliveryLocationNormalDealerFormContent";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function RerouteDeliveryNormalDealerTemplate() {
  const { loading } = useRerouteRefreshRedirect();

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <QuarterScreenWrapper>
      <Header />
      <RerouteDeliveryLocationContentOfNormalDealer />
      <Footer />
    </QuarterScreenWrapper>
  );
}

export default RerouteDeliveryNormalDealerTemplate;
