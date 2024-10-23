import styles from "./ScheduleContainer.module.css";
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import Filter from "../../Common Components/Filter/Filter";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import { useGetSessionsQuery } from "../../features/api";
import { useEffect, useState } from "react";
import MainButton from "../../Common Components/Main Button/MainButton";
import { Commet } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import Warning from "../../Common Components/Warning/Warning";

// Schedule table container and header
const ScheduleContainer = () => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, error, isLoading } = useGetSessionsQuery(
    `?page=${page}&per_page=20&sort[]=-created_at&sort[]=-is_active`
  );
  console.log(data);
  useEffect(() => {
    setTotalPages(data?.data.meta?.total_pages);
  }, [data]);

  const [results, setResults] = useState();
  console.log(results);
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    if (error?.status === 403) {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          ليس لديك صلاحية الوصول لهذه الصفحة.
        </div>
      );
    } else if (error?.status === 401) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          برجاء تسجيل الدخول والمحاولة مرة أخرى.
        </div>
      );
    } else {
      return (
        <div
          className={`fs-3 fw-bold text-danger d-flex justify-content-center align-items-center`}
        >
          حدث خطأ، برجاء المحاولة مرة أخرى لاحقا.
        </div>
      );
    }
  }

  return (
    <>
      {confirmation && (
        <Warning
          text={"هل تريد حذف هذا الموعد؟"}
          handleConfirm={setConfirmed}
        />
      )}
      <div className={`${styles.scheduleContainer}`}>
        <div className="d-flex align-items-center justify-content-between gap-3 ps-3 pe-3">
          <ComponentTitle
            MainIcon={"/assets/image/groups.png"}
            title={"جميع المجموعات"}
            subTitle={"يمكنك متابعة جميع المجموعات  من هنا"}
          />
          <Filter
            query={"sessions/"}
            options={["الاسم"]}
            searchResults={setResults}
            status={false}
          />
          <ComponentBtns
            btn1={"+ إضافة موعد جديد "}
            onclick={() => {
              navigate("/Home/AddScheduleForm");
            }}
          />
        </div>
        {results?.data?.sessions?.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
            style={{ color: "red", height: "60vh" }}
          >
            لم يتم العثور علي نتائج مطابقة
          </div>
        ) : results?.data?.sessions?.length > 0 ? (
          <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
            <table className="w-100">
              <thead>
                <tr>
                  <th className={`p-2 pt-3 pb-3`}>#</th>
                  <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
                  <th className={`p-2 pt-3 pb-3`}>السعر</th>
                  <th className={`p-2 pt-3 pb-3`}>المدة</th>
                  <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
                  <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                  <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {results?.data?.sessions?.map((item, index) => (
                  <ScheduleItem key={index} index={index + 1} session={item} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`${styles.tableContainer} text-end mt-3 ps-4 pe-4`}>
            <table className="w-100">
              <thead className={`fw-bold`}>
                <th className={`p-2 pt-3 pb-3`}>#</th>
                <th className={`p-2 pt-3 pb-3`}>المجموعة</th>
                <th className={`p-2 pt-3 pb-3`}>السعر</th>
                <th className={`p-2 pt-3 pb-3`}>المدة</th>
                <th className={`p-2 pt-3 pb-3`}>ملاحظات</th>
                <th className={`p-2 pt-3 pb-3`}>الحالة</th>
                <th className={`p-2 pt-3 pb-3 text-center`}>خيارات</th>
              </thead>
              <tbody>
                {data?.data?.sessions?.map((session, index) => (
                  <ScheduleItem
                    key={index}
                    index={
                      data?.data.sessions?.indexOf(session) + (page - 1) * 5 + 1
                    }
                    session={session}
                    deleteConfirmation={confirmed}
                    confirmation={setConfirmation}
                  />
                ))}
              </tbody>
            </table>
            <div
              className={`d-flex justify-content-between m-auto mt-5 align-items-center`}
              style={{ width: "350px" }}
            >
              <MainButton
                onClick={() => setPage(page - 1)}
                text="السابق"
                disabled={page === 1}
                btnWidth="100px"
              />
              <p className="m-0">
                الصفحة {page} من {totalPages}
              </p>
              <MainButton
                onClick={() => setPage(page + 1)}
                text="التالي"
                disabled={page === totalPages}
                btnWidth="100px"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ScheduleContainer;
