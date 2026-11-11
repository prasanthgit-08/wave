import React from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import PostToPassportHeader from "./PostToPassportHeader";
import PostToPassport from "./PostToPassport";
import PostToPassportFooter from "./PostToPassportFooter";

const PostToPassportTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <PostToPassportHeader />
      <PostToPassport />
      <PostToPassportFooter />
    </QuarterScreenWrapper>
  );
};

export default PostToPassportTemplate;
