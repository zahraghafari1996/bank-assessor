import { Box, makeStyles } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import Loading from '../../components/Loading/Loading';
import NoData from '../../components/Nodata.tsx/NoData';
import { DeleteRiskAssessment, RiskAssessment } from '../../redux/RiskAssessment/action';
import { SetRiskAssessmentApprove } from '../../redux/RiskAssessmentApproveDenied/action';
import { CreateRiskComponents } from '../../redux/RiskAssessmentComponent/action';
import { IApplicationState } from '../../store/state';
import CustomButton from '../../utils/buttons/Button';
import CreateAsseessorListComponentModal from './CreateAsseessorsListComponentModal';
import { GetRiskAssessmentComponent } from '../../redux/RiskAssessmentComponent/action';
import AssessorItems from './AssessorItems';
import NotificationManager from '../../components/Notification/NotificationManager';

interface IDataType {
  id: number;
  title: string;
  bankAssessmentResponse: string;
  generalAssessmentResponse: string;
}
export default function AssessorsFormsStatusPerPage(): ReactElement {
  const assessorsOption = [
    {
      label: 'ریسک اعتباری، تعریف و اهداف: بلوغ بانک را در آشنایی با تعریف و اهداف مدیریت ریسک اعتباری چه مقدار ارزیابی میکنید؟	',
      value: 1,
      status: false,
    },
    {
      label:
        'ریسک اعتباری، بیانیه و مدل های اندازه گیری: بلوغ بیانیه ریسک اعتباری و مدل های اندازه گیری ریسک اعتباری را چه مقدار ارزیابی می کنید؟	',
      value: 2,
      status: false,
    },
    {
      label:
        'ریسک اعتباری، تطبیق: بلوغ بانک در تطابق با رهنمودها و دستورالعمل های مدیریت ریسک اعتباری را چه میزان ارزیابی میکنید؟	',
      value: 3,
      status: false,
    },
    {
      label: 'ریسک نقدینگی، تعریف و اهداف: بلوغ بانک را در آشنایی با تعریف و اهداف مدیریت ریسک نقدینگی چه مقدار ارزیابی میکنید؟	',
      value: 4,
      status: false,
    },
    {
      label:
        'ریسک نقدینگی، بیانیه و مدل های اندازه گیری: بلوغ بیانیه ریسک نقدینگی و مدل های اندازه گیری ریسک نقدینگی را چه مقدار ارزیابی می کنید؟	',
      value: 5,
      status: false,
    },
    {
      label:
        'ریسک نقدینگی، تطبیق: بلوغ بانک در تطابق با رهنمودها و دستورالعمل های مدیریت ریسک نقدینگی را چه میزان ارزیابی میکنید؟	',
      value: 6,
      status: false,
    },
    {
      label: 'ریسک بازار، تعریف و اهداف: بلوغ بانک را در آشنایی با تعریف و اهداف مدیریت ریسک بازار چه مقدار ارزیابی میکنید؟	',
      value: 7,
      status: false,
    },
    {
      label:
        'ریسک بازار، بیانیه و مدل های اندازه گیری: بلوغ بیانیه ریسک بازار و اندازه گیری ریسک بازار در انواع آن را چه مقدار ارزیابی می کنید؟	',
      value: 8,
      status: false,
    },
    {
      label:
        'ریسک بازار، تطبیق: بلوغ بانک در تطابق با رهنمودها و دستورالعمل های مدیریت ریسک بازار را چه میزان ارزیابی میکنید؟	',
      value: 9,
      status: false,
    },
    {
      label: 'ریسک عملیاتی، تعریف و اهداف: بلوغ بانک را در آشنایی با تعریف و اهداف مدیریت ریسک عملیاتی چه مقدار ارزیابی میکنید؟	',
      value: 13,
      status: false,
    },
    {
      label:
        'ریسک عملیاتی، بیانیه و مدل های اندازه گیری: بلوغ بیانیه ریسک عملیاتی و اندازه گیری ریسک عملیاتی در انواع آن را چه مقدار ارزیابی می کنید؟	',
      value: 14,
      status: false,
    },
    {
      label:
        'ریسک عملیاتی، تطبیق: بلوغ بانک در تطابق با رهنمودها و دستورالعمل های مدیریت ریسک عملیاتی را چه میزان ارزیابی میکنید؟	',
      value: 15,
      status: false,
    },
    {
      label: 'ریسک عملیاتی-ریسک فرآیندها: بلوغ بانک را در اندازه گیری و مدیریت ریسک فرآیندها چه مقدار ارزیابی میکنید؟	',
      value: 16,
      status: false,
    },
    {
      label: 'ریسک عملیاتی-ریسک کارکنان: بلوغ بانک را در اندازه گیری و مدیریت ریسک کارکنان چه مقدار ارزیابی میکنید؟	',
      value: 17,
      status: false,
    },
    {
      label: 'ریسک عملیاتی-ریسک سیستمها: بلوغ بانک را در اندازه گیری و مدیریت ریسک سیستمها چه مقدار ارزیابی میکنید؟	',
      value: 18,
      status: false,
    },
    {
      label: 'ریسک عملیاتی-ریسک رویدادهای بیرونی: بلوغ بانک را در اندازه گیری و مدیریت ریسک رویدادهای بیرونی چه مقدار ارزیابی میکنید؟	',
      value: 19,
      status: false,
    },
    {
      label: 'ریسک عملیاتی-ریسک فناوری اطلاعات: بلوغ بانک را در اندازه گیری و مدیریت ریسک فناوری اطلاعات چه مقدار ارزیابی میکنید؟	',
      value: 20,
      status: false,
    },
    {
      label:
        'ریسک عملیاتی-انواع ریسک فناوری اطلاعات: بلوغ بانک را در اندازه گیری و مدیریت انواع ریسک فناوری اطلاعات چه مقدار ارزیابی میکنید؟	',
      value: 21,
      status: false,
    },
    {
      label: 'ریسک تطبیق، تعریف و اهداف: بلوغ بانک را در آشنایی با تعریف و اهداف مدیریت ریسک تطبیق چه مقدار ارزیابی میکنید؟	',
      value: 22,
      status: false,
    },
    {
      label:
        'ریسک تطبیق، اندازه گیری: بلوغ بانک را در اندازه گیری و مدیریت انواع ریسک تطبیق شامل (رفتار سازمان، رفتار مشتری، رفتار خدمات مالی، رفتار کارکنان و قوانین احتیاطی) چه مقدار ارزیابی می کنید؟',
      value: 23,
      status: false,
    },
  ];
  const [showdeleteModal, setshowdeleteModal] = useState(false);
  const [showCreateListModal, setshowCreateListModal] = useState(false);
  const [assessorsList, setassessorsList] = useState(assessorsOption);
  const [loading, setLoading] = useState(false);
  const [openNotif, setopenNotif] = useState(false);
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
    dispatch(GetRiskAssessmentComponent(history, 'created', assID));
  }, [currentRiskAssessmentStatus, assID, dispatch, history]);

  const renderAction = (data: any) => {
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
      key: '',
      value: 0,
      title: item.title,
      qbody: item.questionBody,
      id: item.id,
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
      dispatch(GetRiskAssessmentComponent(history, 'created', assID));
      setLoading(false);
    }, 200);
    setshowdeleteModal(false);
  };

  const handleChangeCheckBox = (val: number) => {
    const res = assessorsList.map((item) => {
      if (item.value === val) {
        console.log(item);
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    console.log(assessorsList);
    setassessorsList(res);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      CreateRiskComponents(
        assessorsList.filter((item) => item.status === true).map((item) => item.value),
        assID,
      ),
    );

    setLoading(true);
    setTimeout(() => {
      dispatch(GetRiskAssessmentComponent(history, 'created', assID));
      setLoading(false);
    }, 2000);
    setshowCreateListModal(false);
  };

  const handleApprove = () => {
    setopenNotif(true);
    dispatch(SetRiskAssessmentApprove('submit', assID, history, 'AssessorsFormsStatus'));
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
            label="انتخاب مولفه‌های ارزیابی"
            onClickFunction={() => setshowCreateListModal(true)}
          />
        )}
        <CustomButton
          disabled={list && list.length ? false : true}
          type="submit"
          variant="contained"
          color="default"
          className={classes.submit}
          label="ثبت نهایی و ارسال به کمیته"
          onClickFunction={handleApprove}
        />
      </Box>
      {showCreateListModal && (
        <CreateAsseessorListComponentModal
          open={showCreateListModal}
          onClose={() => setshowCreateListModal(false)}
          list={assessorsList}
          onHandleChange={handleChangeCheckBox}
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
      {openNotif && (
        <NotificationManager
          open={openNotif}
          handleClose={() => setopenNotif(false)}
          message="مولفه‌ها ثبت شدند"
        />
      )}
      {loading && <Loading />}
    </>
  );
}
