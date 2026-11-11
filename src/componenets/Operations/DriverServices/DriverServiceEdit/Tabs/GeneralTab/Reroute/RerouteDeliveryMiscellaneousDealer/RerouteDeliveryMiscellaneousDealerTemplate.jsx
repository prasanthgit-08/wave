import React from "react";
import Header from "../RerouteHeader";
import Footer from "../RerouteFooter";
import RerouteDeliveryMiscellaneousDealerContent from "./RerouteDeliveryMiscellaneousDealerContent";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function RerouteDeliveryMiscellaneousDealerTemplate() {
  const { loading } = useRerouteRefreshRedirect();

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div className="customContainer">
      <div
        className="border border-dark border-2 "
        style={{
          minWidth: "1600px",
          margin: "1px",
        }}
      >
        <Header />
        <RerouteDeliveryMiscellaneousDealerContent />
        <Footer />
      </div>
    </div>
  );
}

export default RerouteDeliveryMiscellaneousDealerTemplate;
