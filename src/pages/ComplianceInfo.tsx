import PolicyPage from "@/components/layout/PolicyPage";

const ComplianceInfo = () => {
  return (
    <PolicyPage title="合規資訊">
      <p>最後更新日期：2025年10月23日</p>
      <h2>1. 監管機構</h2>
      <p>此處應放置您的合規資訊內容。說明您的公司受哪些金融或法律機構的監管。</p>
      <h2>2. 法規遵循</h2>
      <p>聲明您的公司遵循所有適用的法律和法規，例如反洗錢 (AML) 和了解您的客戶 (KYC) 政策。</p>
      <h2>3. 風險揭露</h2>
      <p>提供與您的服務相關的詳細風險揭露，確保客戶在做出決策前已充分了解潛在風險。</p>
      <h2>4. 投訴處理</h2>
      <p>說明客戶如何提出投訴以及您的投訴處理流程。</p>
    </PolicyPage>
  );
};

export default ComplianceInfo;
