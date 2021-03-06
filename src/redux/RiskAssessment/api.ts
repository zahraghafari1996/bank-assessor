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
  DeleteRiskAssessment: async (id: number) => {
    return axios.delete(RiskAssessmentUrl + `/assessment-component/${id}`);
  },
};
