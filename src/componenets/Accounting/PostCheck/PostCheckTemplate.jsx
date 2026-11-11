import React from "react";
import PostCheckHeader from "./PostCheckHeader";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import PostCheckContent from "./PostCheckContent";
import PostCheckFooter from "./PostCheckFooter";

const PostCheckTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <PostCheckHeader />

      <PostCheckContent />

      <PostCheckFooter />
    </QuarterScreenWrapper>
  );
};

export default PostCheckTemplate;
