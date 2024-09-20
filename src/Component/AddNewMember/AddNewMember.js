import React from "react";
import "./AddNewMember.css";
import InputField from "../../Common Components/InputField/InputField";
import MainButton from "../../Common Components/Main Button/MainButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNvigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
function AddNewMember() {
  // const navigate = useNavigate();
  const access_token = localStorage.getItem('access');
  const handleSubmit = async (value) => {
    try {
      const items = {
        name: value["name"],
        phone_number: value["phone_number"],
        national_id: value["national_id"],
        password: value["password"],
        notes: value["notes"],
        date_of_birth: value["date_of_birth"],
        gender: value["gender"],
      };

      const data = await fetch(
        "https://gym-backend-production-65cc.up.railway.app/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:access_token,
            accept: "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const result = await data.json();
      console.log("Response status:", data.status);
      console.log("Response result:", result);
      localStorage.setItem("loginResult", JSON.stringify(result));

      if (data.ok) {
        toast.success("Member Added Successfully");
        setTimeout(() => {
          // navigate("AllMembers");
        }, 1500);
        console.log(items);
      } else {
        toast.error("failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string().required("هذا الحقل الزامي"),
    password: Yup.string().required("هذا الحقل الزامي"),
    notes: Yup.string().required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });

  const intialValues = {
    name: "",
    phone_number: "",
    national_id: "",
    password: "",
    notes: "",
    date_of_birth: "",
    gender: "",
  };
  return (
    <div className="addMemberContainer">
      <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
        <ComponentTitle
          MainIcon={"/assets/image/Vector.png"}
          title={"اضافة عضو "}
          subTitle={"يمكنك اضافة العضو المطلوب من هنا"}
        />
      </div>
      <div className="">
        <Formik
          onSubmit={handleSubmit}
          initialValues={intialValues}
          validationSchema={validationSchema}
        >
          <Form className={`addForm mt-3 mb-5`}>
            {/* upload user image */}
            <div className="mt-5 d-flex flex-column align-items-center  mb-4 position-relative">
              <div className="position-relative">
                <img
                  src="/assets/image/user image.png"
                  alt="user img"
                  width={"84.55px"}
                  height={"84.55px"}
                />
              </div>
              <div className="position-absolute  upload-image">
                <img
                  src="/assets/image/Frame 119.png"
                  alt="upload img"
                  className="mb-1"
                  width={"25px"}
                  height={"25px"}
                />
              </div>
              <Link to={"/"} className="text-decoration-none mt-3">
                <p style={{ color: "#3572EF" }}>تعديل الصورة</p>
              </Link>
            </div>
            {/* end of upload user image */}

            {/* name & number */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"name"} label={"الأسم"} />
              </div>
              <div className={`col-4 col-lg-6 phone-number`}>
                <InputField name={"phone_number"} label={"رقم الهاتف"} />
              </div>
            </div>
            {/* end of name & number */}

            {/* nationalId & password */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"national_id"} label={"رقم العضوية"} />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"password"} label={"كلمة السر"} />
              </div>
            </div>
            {/* end of nationalId & password */}

            {/* notes & date & gender */}
            <div className={`row g-4 mb-5`}>
              <div className={`col-4 col-lg-6`}>
                <InputField name={"notes"} label={"ملاحظات"} className="p-5" />
              </div>
              <div className={`col-4 col-lg-6`}>
                <InputField
                  name={"date_of_birth"}
                  label={" تاريخ الميلاد"}
                  inputType={"input"}
                  type={"date"}
                />
                <InputField
                  name={"gender"}
                  label={" النوع"}
                  // inputType={"select"}
                >
                  {/* <option>ذكر</option>
                    <option>انثي</option> */}
                </InputField>
              </div>
            </div>
            {/* end of notes & date & gender */}

            {/* button to confirm add memeber */}
            <div className={`addmemberBtn m-auto`}>
              <MainButton text={"اضافة"} btnType={"submit"} />
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}
export default AddNewMember;
