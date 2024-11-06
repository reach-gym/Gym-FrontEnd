import React, { useEffect, useRef, useState } from "react";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import "./Logs.css";
import ComponentBtns from "../../Common Components/ComponentBtns/ComponentBtns";
import Filter from "../../Common Components/Filter/Filter";
import { Commet } from "react-loading-indicators";
import { Helmet } from "react-helmet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MainButton from "../../Common Components/Main Button/MainButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, searchR } from "../../features/searchSlice";

function Logs() {
  const [results, setResults] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page] = useState(10);
  const [total_pages, setTotalPages] = useState(1);
  const [activeLogId, setActiveLogId] = useState(null);
  const navigate = useNavigate();
  const optionRef = useRef();
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("ابحث هنا...");
  const term = useSelector((state) => state.search.term.term);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("action");
  const api = process.env.REACT_APP_DOMAIN;
  const filter = (filter) => {
    setFilterType(filter);
  };

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const response = await fetch(
          `${api}/activity-logs/?page=${page}&per_page=${per_page}&filter{${filterType}.istartswith}=${
            term ? term : ""
          }`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("access"),
              accept: "application/json",
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setLogs(result.data.activity_logs);
          setTotalPages(result.data.meta.total_pages);
        } else if (response.status === 403) {
          console.log("permission");
          setError("ليس لديك صلاحية لعرض هذه المعلومات");
        } else if (response.status === 401) {
          setError("غير مصرح به: يرجى تسجيل الدخول لعرض هذه الصفحة");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [per_page, page, filterType, term, api]);

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNextPage = () => {
    if (page < total_pages) {
      setPage((nextPage) => nextPage + 1);
    }
  };

  const toggleOptions = (logId) => {
    setActiveLogId((prevId) => (prevId === logId ? null : logId));
  };
  const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      toggleOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (error.length > 0) {
    return (
      <div
        className="fw-bolder w-100 text-danger fs-4 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {error}
      </div>
    );
  }
  return (
    <div className="blogContainer">
      <Helmet>
        <title>السجل</title>
      </Helmet>
      {/* ( */}
      <div className="blogContainer__items">
        <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
          <ComponentTitle
            title={"السجل"}
            subTitle={"يمكنك متابعة سجل المستخدمين من هنا"}
            MainIcon={"/assets/image/mdi_clipboard-text-history-outline.png"}
          />
          <Filter
            filter={true}
            isDisabled={isDisabled}
            placeHolder={placeHolder}
            handleClear={() => {
              dispatch(searchR({ term: "" }));
              filter("action");
              setIsDisabled(false);
              setPlaceHolder("ابحث هنا...");
            }}
          >
            <div className={`p-2 rounded-2 bg-white`}>
              <div
                className={`p-2 filter rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("action");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                العملية
              </div>
              <div
                className={`p-2 filter rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("model_name");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                في
              </div>
              <div
                className={`p-2 filter rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("instance_name");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                الإسم
              </div>
              <div
                className={`p-2 filter rounded-2`}
                onClick={() => {
                  dispatch(searchR({ term: "" }));
                  filter("performed_by");
                  setIsDisabled(false);
                  setPlaceHolder("ابحث هنا...");
                }}
              >
                بواسطة
              </div>
            </div>
          </Filter>
          <ComponentBtns />
        </div>
        {loading ? (
          <div className="loader" style={{ backgroundColor: "#373636" }}>
            <Commet width="50px" height="50px" color="#316dcc" />
          </div>
        ) : logs.length === 0 ? (
          <div
            className="fw-bolder text-danger fs-4 d-flex justify-content-center align-items-center"
            style={{ height: "50vh", backgroundColor: "#373636" }}
          >
            لا يوجد سجلات حالية
          </div>
        ) : results?.data?.activity_logs?.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center mt-5 fs-5 fw-bolder"
            style={{ color: "red", height: "60vh" }}
          >
            لم يتم العثور علي نتائج مطابقة
          </div>
        ) : results?.data?.activity_logs?.length > 0 ? (
          <div className="p-3">
            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">العملية</th>
                    <th scope="col">في</th>
                    <th scope="col">الأسم</th>
                    <th scope="col">تاريخ التسجيل</th>
                    <th scope="col">بواسطة</th>
                    <th className="text-center" scope="col">
                      خيارات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.data?.activity_logs?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1 + (page - 1) * per_page}</td>
                      <td>{item.action}</td>
                      <td>{item.model_name}</td>
                      <td>{item.instance_name}</td>
                      <td>{item.created_at}</td>
                      <td>{item.performed_by}</td>
                      <td
                        className="text-center"
                        style={{ position: "relative" }}
                      >
                        <MoreVertIcon
                          onClick={() => toggleOptions(item.id)}
                          style={{ cursor: "pointer" }}
                        />
                        {activeLogId === item.id && (
                          <div
                            onClick={() =>
                              navigate(`/Home/Logs/${item.id}/LogDetail`)
                            }
                            className="options"
                            style={{ position: "absolute" }}
                          >
                            <div className="d-flex align-items-center pt-2 options_item">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2em"
                                height="2em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"
                                />
                              </svg>
                              <p
                                className=" mb-1 me-2"
                                style={{
                                  textAlign: "right",
                                  fontSize: "16px",
                                }}
                              >
                                تفاصيل
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="tableContainer mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">العملية</th>
                  <th scope="col">في</th>
                  <th scope="col">الأسم</th>
                  <th scope="col">تاريخ التسجيل</th>
                  <th scope="col">بواسطة</th>
                  <th className="text-center" scope="col">
                    خيارات
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1 + (page - 1) * per_page}</td>
                    <td>{log.action}</td>
                    <td>{log.model_name}</td>
                    <td>{log.instance_name}</td>
                    <td>{log.created_at}</td>
                    <td>{log.performed_by}</td>
                    <td
                      className="text-center"
                      style={{ position: "relative" }}
                    >
                      <MoreVertIcon
                        onClick={() => toggleOptions(log.id)}
                        style={{ cursor: "pointer" }}
                      />
                      {activeLogId === log.id && (
                        <div
                          onClick={() =>
                            navigate(`/Home/Logs/${log.id}/LogDetail`)
                          }
                          className="options"
                          style={{ position: "absolute" }}
                        >
                          <div className="d-flex align-items-center pt-2 options_item">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2em"
                              height="2em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#000"
                                d="M1 2.5h8.48l2 2.5H23v16H1zm2 2V19h18V7H10.52l-2-2.5zm3.998 7.498h2.004v2.004H6.998zm4 0h2.004v2.004h-2.004zm4 0h2.004v2.004h-2.004z"
                              />
                            </svg>
                            <p
                              className=" mb-1 me-2 text-dark"
                              style={{ textAlign: "right", fontSize: "16px" }}
                            >
                              تفاصيل
                            </p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div className="preivous-btn">
                <MainButton
                  text={"السابق"}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                />
              </div>
              <div>
                <span className="ms-3 me-3 text-light">
                  الصفحة {total_pages} من {page}
                </span>
              </div>
              <div className="next-btn">
                <MainButton
                  text={"التالي"}
                  onClick={handleNextPage}
                  disabled={page >= total_pages}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      ){"}"}
    </div>
  );
}
export default Logs;
