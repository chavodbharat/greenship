export interface ReportProblemModalTypePropsInterface {
    isModalVisible: boolean;
    reportUserId: string;
    petId?: string;
    onClose: () => void;
    reportProblemSubmitStatus: boolean;
    onSuccessReportProblem: () => void;
};
  