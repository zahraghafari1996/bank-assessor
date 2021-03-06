import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefineNewAssessorsForms from './View/DefineNewAssessorsForms';
import AssessorsFormsStatus from './View/AssessorsFormsStatus';
import AssessorsFormsStatusPerPage from './View/components/AssessorsFormsStatusPerPage';
import CheckBankAssessorSResponse from './View/CheckBankAssessorSResponse';
import GetReports from './View/GetReports';
import NeedsCheckAssessmentForms from './View/NeedsCheckAssessmentForms';
import NeedsCheckAssessment from './View/NeedsCheckAssessment';
import ApprovedGeneralAssessmentResults from './View/ApprovedGeneralAssessmentResults';
import OngoingGeneralAssessment from './View/OngoingGeneralAssessment';
import ApprovedGeneralAssessment from './View/ApprovedGeneralAssessment';
import OngoingAssessment from './View/OngoingAssessment';
import NeedsCorrectionAssessment from './View/NeedsCorrectionAssessment';
import ApprovedAssessment from './View/ApprovedAssessment';
import NotFoundComponent from './View/NotFoundComponent';
import SubmittedAssessorsPage from './View/components/SubmittedAssessorsPage';
import ResponseForm from './View/components/ResponseForm';
import checkBankResponse from './View/components/CheckBankResponse';
import GetAssessmentReport from "./View/components/GetAssessmentReport";
function PrivateRout() {
  return (
    <Switch>
      {/* risk_management_assessor_sideBarItems */}
      <Route path="/checkBankResponse/:id" component={checkBankResponse} />
      <Route path="/created/:id" component={AssessorsFormsStatusPerPage} />
      <Route path="/DefineNewAssessorsForms" component={DefineNewAssessorsForms} />
      <Route path="/CheckBankAssessorSResponse" component={CheckBankAssessorSResponse} />
      <Route path="/GetReports" component={GetReports} />
      <Route path="/getReport/:id" component={GetAssessmentReport} />
      {/*  committee_sideBarItems*/}
      <Route path="/checkAllResponse/:id" component={checkBankResponse} />
      <Route path="/submitted/:id" component={SubmittedAssessorsPage} />
      <Route path="/NeedsCheckAssessmentForms" component={NeedsCheckAssessmentForms} />
      <Route path="/NeedsCheckAssessment" component={NeedsCheckAssessment} />
      <Route
        path="/approvedGeneralAssessmentResults"
        component={ApprovedGeneralAssessmentResults}
      />
      {/* general_assessor_sideBarItems */}
      <Route path="/getGeneralResponse/:id" component={ResponseForm} />
      <Route path="/OngoingGeneralAssessment" component={OngoingGeneralAssessment} />
      <Route path="/approvedGeneralAssessment" component={ApprovedGeneralAssessment} />
      {/* bank_sideBarItems */}
      <Route path="/getResponse/:id" component={ResponseForm} />
      <Route path="/OngoingAssessment" component={OngoingAssessment} />
      <Route path="/NeedsCorrectionAssessment" component={NeedsCorrectionAssessment} />
      <Route path="/approvedAssessment" component={ApprovedAssessment} />
      <Route path="/NotFoundComponent" component={NotFoundComponent} />
      <Route path="/AssessorsFormsStatus" component={AssessorsFormsStatus} />
    </Switch>
  );
}

export default PrivateRout;
