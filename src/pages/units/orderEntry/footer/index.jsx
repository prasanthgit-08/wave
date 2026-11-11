import CustomButton from "../../../../components/common/button";

const OEFooter = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <CustomButton
            type="submit"
            // onClick={}
            disabled={false}
            label={"Save"}
          />

          <CustomButton
            type="button"
            onClick={() => window.location.reload()}
            disabled={false}
            label={"Cancel"}
          />
        </div>
      </div>
    </div>
  );
};

export default OEFooter;
