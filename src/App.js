import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import AddNewMember from "./Component/Members/AddNewMember/AddNewMember";
import AllMembers from "./Component/Members/AllMemebers/AllMembers";
import MeasurmentsContainer from "./Component/MeasurementsContainer/MeasurementsContainer";
import AddMeasurementForm from "./Component/AddMeasurementForm/AddMeasurementForm";
import AddGroupForm from "./Component/AddGroupForm/AddGroupForm";
import store from "./store/store";
import { Provider } from "react-redux";
import Container from "./Component/Container/Container";
import GroupsContainer from "./Component/GroupsContainer/GroupsContainer";
import ScheduleContainer from "./Component/ScheduleContainer/ScheduleContainer";
import AddScheduleForm from "./Component/AddScheduleForm/AddScheduleForm";
import AllSubScriptions from "./Component/Subscriptions/AllSubScriptions/AllSubScriptions";
import AlmostFinished from "./Component/Subscriptions/AlmostFinished/AlmostFinished";
import ActiveSubScription from "./Component/Subscriptions/ActiveSubscriptions/ActiveSubscriptions";
import SubscripedMembers from "./Component/Subscriptions/SubscripedMembers/SubscripedMembers";
import AddNewMemberToSub from "./Component/Subscriptions/AddNewMemberToSub/AddNewMemberToSub";
import AddNewSubscription from "./Component/Subscriptions/AddNewSubscription/AddNewSubscription";
import UpdateSystem from "./Component/Update System/UpdateSystem";
import ExpiredSubscriptions from "./Component/Subscriptions/ExpiredSubscriptions/ExpiredSubscriptions";
import ForgotPassword from "./Pages/Auth/Password/Forgot Password/ForgotPassword";
import ConfirmCode from "./Pages/Auth/Password/Confirm Code/ConfirmCode";
import CreateNewPassword from "./Pages/Auth/Password/Create New Password/CreateNewPassword";
import PaymentMethodsContainer from "./Component/PaymentMethodsContainer/PaymentMethodsContainer";
import AddPaymentMethodForm from "./Component/AddPaymentMethodForm/AddPaymentMethodForm";
import SubscriptionDetail from "./Component/Subscriptions/Subscription Detail/SubscriptionDetail";
import TrainerScheduleContainer from "./Component/TrainerScheduleContainer/TrainerScheduleContainer";
import EditMember from "./Component/Members/Edit Member/EditMember";import AddGroupMember from "./Component/AddGroupMember/AddGroupMember";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="ConfirmCode" element={<ConfirmCode />} />
            <Route path="CreateNewPassword" element={<CreateNewPassword />} />

            <Route path="Home" element={<Home />}>
              <Route path="UpdateSystem" element={<UpdateSystem />} />
              <Route index element={<Container />} />
              <Route path="AllMembers" element={<AllMembers />} />
              <Route path="AddNewMember" element={<AddNewMember />} />
              {/* <Route path="EditMember" element={<EditMember />} /> */}
              <Route path="AllMembers/:id/" element={<EditMember />} />
              <Route
                path="MeasurmentsContainer"
                element={<MeasurmentsContainer />}
              />
              <Route
                path="AddMeasurementForm"
                element={<AddMeasurementForm />}
              />
              <Route
                path="PaymentMethodsContainer"
                element={<PaymentMethodsContainer />}
              />
              <Route
                path="AddPaymentMethodForm"
                element={<AddPaymentMethodForm />}
              />
              <Route path="GroupsContainer" element={<GroupsContainer />} />
              <Route path="AddGroupForm" element={<AddGroupForm />} />
              <Route path="AddGroupMember" element={<AddGroupMember />} />
              <Route path="ScheduleContainer" element={<ScheduleContainer />} />
              <Route path="AddScheduleForm" element={<AddScheduleForm />} />
              <Route
                path="TrainerScheduleContainer"
                element={<TrainerScheduleContainer />}
              />

              {/*Subscriptions*/}
              <Route path="SubscripedMembers" element={<SubscripedMembers />} />
              <Route path="AddNewMemberToSub" element={<AddNewMemberToSub />} />
              <Route
                path="AddNewSubscription"
                element={<AddNewSubscription />}
              />
              <Route path="AllSubScriptions" element={<AllSubScriptions />} />
              <Route path="AlmostFinished" element={<AlmostFinished />} />
              <Route
                path="ActiveSubScription"
                element={<ActiveSubScription />}
              />
              <Route path="SubscribedMembers" element={<SubscripedMembers />} />

              <Route
                path="ExpiredSubScriptions"
                element={<ExpiredSubscriptions />}
              />
              <Route
                path="SubscripedMembers/:id/"
                element={<SubscriptionDetail />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
