import { Box, makeStyles } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NoData from '../../components/Nodata.tsx/NoData';
import { RiskAssessment } from '../../redux/RiskAssessment/action';
import { SetRiskAssessmentApprove } from '../../redux/RiskAssessmentApproveDenied/action';
import { GetRiskAssessmentComponent } from '../../redux/RiskAssessmentComponent/action';
import { IApplicationState } from '../../store/state';
import CustomButton from '../../utils/buttons/Button';
import AssessorItems from './AssessorItems';

export default function SubmittedAssessorsPage(): ReactElement {
  const currentRiskAssessmentComponent = useSelector(
    (state: IApplicationState) => state.riskAssessmentComponent,
  );

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(0, 1, 0),
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const assID = parseInt(history.location.pathname.split('/')[2]);

  useEffect(() => {
    dispatch(RiskAssessment());
    dispatch(GetRiskAssessmentComponent(history, 'submitted', assID));
  }, []);

  const list = currentRiskAssessmentComponent?.data;
  const assessorItemsData = list?.map((item) => {
    return {
      key: '',
      title: item.title,
      qbody: item.questionBody
    };
  });
  const handleApprove = () => {
    dispatch(SetRiskAssessmentApprove('start', assID, history, 'NeedsCheckAssessmentForms'));
  };
  const handleDeny = () => {
    dispatch(
      SetRiskAssessmentApprove('decline-by-committee', assID, history, 'NeedsCheckAssessmentForms'),
    );
  };
  return (
    <>
      <Box my={4}>
        <CustomButton
          disabled={list && list.length ? false : true}
          type="submit"
          variant="contained"
          color="default"
          className={classes.submit}
          label="تایید مولفه های ارزیابی"
          onClickFunction={handleApprove}
        />
        <CustomButton
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
          label="رد مولفه ارزیابی"
          onClickFunction={handleDeny}
        />
      </Box>
      {list && list.length ? (
        <AssessorItems data={assessorItemsData} renderAction={false} />
      ) : (
        <NoData />
      )}
    </>
  );
}
