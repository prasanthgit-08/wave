import { formatForApi } from "./dateUtils";
const downloadFile = (serviceFunction, filename, payload) => {
  serviceFunction()
    .then((res) => {
      // Convert response data into a Blob
      const blob = new Blob([res.data], { type: "application/octet-stream" });
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Extract filename from Content-Disposition header if available
      let tempFilename = "Tempfile";

      if (res.headers["content-disposition"]) {
        const contentDisposition = res.headers["content-disposition"];
        tempFilename = contentDisposition.split("filename=")[1];
      } else {
        const currentDate = new Date();
        const formattedDate = formatForApi(currentDate); // Format date as yyyy-mm-dd
        tempFilename = `Tempfile_${formattedDate}.pdf`;
      }
      // Create a link with the download attribute set to the desired filename
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || tempFilename);
      // Append the link to the body and trigger a click to initiate download
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Open the downloaded file as a new tab in the browser
      // window.open(url, '_blank');
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export default downloadFile;

// Example usage:
// const generateExcelReport = (filename) => {
//   downloadFile(ReportsService.generateExcelReport, filename);
// }
