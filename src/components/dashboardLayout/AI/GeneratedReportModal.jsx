import React, { useEffect, useRef } from "react";
import { Document, Page, pdf, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 5,
  },
 
  content: {
    fontSize: 12,
    marginBottom: 10,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',

  },header: {
    textAlign: 'center',
    padding: '8px 1px',
    marginBottom: 20,
  }
});

const GeneratedReportModal = ({ reportData }) => {
  const pdfRef = useRef(null);

  const handleDownloadReport = async () => {
    try {
      // Generate PDF document
      const blob = await pdf((
        <Document>
          <Page size="A4" style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.heading}>Financial Analysis report of {localStorage.getItem('user_name')}</Text>
            </View>
            {/* Portfolio analysis heading */}
            <View>
              <Text style={styles.content}>{reportData}</Text>
            </View>
          </Page>
        </Document>
      )).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");

      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };


  

  useEffect(() => {
    console.log(reportData, "this is report data of generated report modal");
  }, [reportData]);

  return (
    <div>
      {reportData !== '' ? (
        <div>
          <div style={{ height: "627px", overflowY: 'scroll' }}>
            <h1 style={{textAlign:"center", padding:"8px 1px"}}>Financial Analysis report of {localStorage.getItem("user_name")}</h1>
            <pre  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word',marginLeft:"20px" }}>{reportData}</pre>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{ margin: "20px", padding: "12px", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", background: "#5f5fff", color: "white" }}
              onClick={handleDownloadReport}
            >
              Download report ↓
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="/assets/loadingripple.svg" style={{ height: "200px" }} alt="" />
          <span>Report is generating, please wait...</span>
        </div>
      )}
    </div>
  );
}

export default GeneratedReportModal;
