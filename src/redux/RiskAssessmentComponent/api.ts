import axios from '../../AxiosConfig';

import { BaseUrl, ApiVersion } from '../../Constants/General';
const RiskAssessmentUrl = BaseUrl + ApiVersion;

export const RiskAssessmentApi = {
  getRiskAssessment: async () => {
    return axios.get(RiskAssessmentUrl + '/risk-assessment');
  },
  createRiskAssessment: async (
    event: React.ChangeEvent<HTMLInputElement>,
    data: {
      title: string;
      bankName: string;
      startDate: any;
      deadlineDate: any;
    },
  ) => {
    event.preventDefault();
    return axios.post(RiskAssessmentUrl + '/risk-assessment', data);
  },
  getOneRiskAssessment: async (id: number) => {
    return axios.get(RiskAssessmentUrl + `/risk-assessment/${id}`);
  },
  getRiskAssessmentComponent: async (id: number) => {
    return axios.get(
      RiskAssessmentUrl + `/risk-assessment/${id}/component?fetchAllQuestions=false`,
    );
  },
  createRiskComponents: async (data: number[], id: number) => {
    return axios.post(RiskAssessmentUrl + `/risk-assessment/${id}/component`, data);
  },
  DeleteRiskAssessment: async (id: number) => {
    return axios.delete(RiskAssessmentUrl + `/risk-assessment/${id}`);
  },
};
