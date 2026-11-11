import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import RerouteDetailScreenContent from "./RerouteDetailScreenContent";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";

function RerouteDetailScreenTemplate() {
  const { loading } = useRerouteRefreshRedirect();

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <QuarterScreenWrapper>
      <Header />
      <RerouteDetailScreenContent />
      <Footer />
    </QuarterScreenWrapper>
  );
}

export default RerouteDetailScreenTemplate;
