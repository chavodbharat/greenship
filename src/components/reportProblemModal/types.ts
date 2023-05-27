export interface ReportProblemModalTypePropsInterface {
    isModalVisible: boolean;
    reportUserId: string;
    onClose: () => void;
    reportProblemSubmitStatus: boolean;
    onSuccessReportProblem: () => void;
};
  