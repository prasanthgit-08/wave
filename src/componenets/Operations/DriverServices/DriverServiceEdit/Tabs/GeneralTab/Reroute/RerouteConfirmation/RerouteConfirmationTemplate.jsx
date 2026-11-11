import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import RerouteConfirmationContent from "./RerouteConfirmationContent";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function RerouteConfirmationTemplate() {
  const { loading } = useRerouteRefreshRedirect();

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <QuarterScreenWrapper>
      <Header />
      <RerouteConfirmationContent />
      <Footer />
    </QuarterScreenWrapper>
  );
}

export default RerouteConfirmationTemplate;
