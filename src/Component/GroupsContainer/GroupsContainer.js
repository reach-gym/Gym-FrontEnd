import ContentContainer from "../ContentContainer/ContentContainer";
import GroupsItem from "../GroupsItem/GroupsItem";
import styles from "./GroupsContainer.module.css";

const row = {
  num: 1,
  name: "Ahmed",
  price: "170",
  discount: "10",
  duration: "10",
  numOfReservations: "10",
};

// Groups table container and header
const GroupsContainer = () => {
  return (
    <ContentContainer
      title={"جميع المجموعات"}
      desc={"يمكنك متابعة جميع المجموعات المحفوظة"}
      mainIcon={"/assets/image/groups.png"}
      btn1={"إضافة مجموعة جديدة"}
      btn2={"disabled"}
    >
      <div className={`${styles.tableContainer} text-end ps-4 pe-4`}>
        <table className="w-100">
          <thead className={`fw-bold`}>
            <th className={`p-2 pt-3 pb-3`}>#</th>
            <th className={`p-2 pt-3 pb-3`}>الإسم</th>
            <th className={`p-2 pt-3 pb-3`}>السعر</th>
            <th className={`p-2 pt-3 pb-3`}>الخصم(%)</th>
            <th className={`p-2 pt-3 pb-3`}>المدة</th>
            <th className={`p-2 pt-3 pb-3`}>عدد مرات الحجز</th>
            <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
          </thead>
          <tbody>
            <GroupsItem {...row} />
          </tbody>
        </table>
      </div>
    </ContentContainer>
  );
};

export default GroupsContainer;
