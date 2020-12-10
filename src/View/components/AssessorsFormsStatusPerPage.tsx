import { Box, makeStyles } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import Loading from '../../components/Loading/Loading';
import NoData from '../../components/Nodata.tsx/NoData';
import AssessorItemsTable from '../../components/Tables/AssessorItemsTable';
import { DeleteRiskAssessment, RiskAssessment } from '../../redux/RiskAssessment/action';
import { SetRiskAssessmentApprove } from '../../redux/RiskAssessmentApproveDenied/action';
import { CreateRiskAssessmentComponent } from '../../redux/RiskAssessmentComponent/action';
import { IApplicationState } from '../../store/state';
import CustomButton from '../../utils/buttons/Button';
import CreateAsseessorComponentModal from './CreateAsseessorComponentModal';

import { GetRiskAssessmentComponent } from '../../redux/RiskAssessmentComponent/action';
import AssessorItems from './AssessorItems';

interface IDataType {
  id: number;
  title: string;
  bankAssessmentResponse: string;
  generalAssessmentResponse: string;
}
export default function AssessorsFormsStatusPerPage(): ReactElement {
  const [showdeleteModal, setshowdeleteModal] = useState(false);
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Assessors, setAssessors] = useState({
    id: 0,
    title: '',
    bankAssessmentResponse: '',
    generalAssessmentResponse: '',
  });

  const currentRiskAssessment = useSelector(
    (state: IApplicationState) => state.riskAssessment?.data,
  );

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
  const currentRiskAssessmentStatus =
    currentRiskAssessment &&
    currentRiskAssessment.length > 0 &&
    currentRiskAssessment.find((item) => item.id === assID)?.status;

  useEffect(() => {
    dispatch(RiskAssessment());
    // dispatch(GetRiskAssessmentComponent(history, 'AssessorsFormsStatus', assID));
  }, [currentRiskAssessmentStatus, assID, dispatch, history]);

  const renderAction = (data: IDataType) => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CustomButton
          type="submit"
          variant="contained"
          color="secondary"
          label="حذف"
          onClickFunction={() => handleDelete(data)}
        />
      </Box>
    );
  };
  const list = currentRiskAssessmentComponent?.data;
  const assessorItemsData = list?.map((item) => {
    return {
      key: 'عنوان',
      value: item.title,
    };
  });
  const handleDelete = (data: IDataType) => {
    setshowdeleteModal(true);
    setAssessors(data);
  };
  const deleteAssessment = () => {
    dispatch(DeleteRiskAssessment(Assessors.id));
    setLoading(true);
    setTimeout(() => {
      // dispatch(GetRiskAssessmentComponent(history, 'AssessorsFormsStatus', assID));
      setLoading(false);
    }, 200);
    setshowdeleteModal(false);
  };
  const handleChange = (name: string, value: string) => {
    setAssessors({ ...Assessors, [name]: value });
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    dispatch(CreateRiskAssessmentComponent(Assessors.title, assID));
    setLoading(true);
    setTimeout(() => {
      // dispatch(GetRiskAssessmentComponent(history, 'AssessorsFormsStatus', assID));
      setLoading(false);
    }, 200);
    setshowCreateModal(false);
  };
  const handleApprove = () => {
    dispatch(SetRiskAssessmentApprove('submit', assID));
  };

  return (
    <>
      <Box my={4}>
        {currentRiskAssessmentStatus === 'CREATED' && (
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            label="افزودن مولفه ارزیابی"
            onClickFunction={() => setshowCreateModal(true)}
          />
        )}
        <CustomButton
          disabled={list && list.length ? false : true}
          type="submit"
          variant="contained"
          color="default"
          className={classes.submit}
          label="تایید مولفه های ارزیابی"
          onClickFunction={handleApprove}
        />
      </Box>
      {showCreateModal && (
        <CreateAsseessorComponentModal
          open={showCreateModal}
          onClose={() => setshowCreateModal(false)}
          title={Assessors.title}
          onHandleChange={handleChange}
          onHandleSubmit={handleSubmit}
        />
      )}
      {showdeleteModal && (
        <DeleteModal
          open={showdeleteModal}
          onClose={() => setshowdeleteModal(false)}
          deleteFunc={deleteAssessment}
        />
      )}
      {list && list.length ? (
        <AssessorItems data={assessorItemsData} renderAction={renderAction} />
      ) : (
        <NoData />
      )}
      {loading && <Loading />}
    </>
  );
}