import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.maSvInputRef = React.createRef();
  }
  state = {
    values: { maSv: "", hoTen: "", sdt: "", email: "" },
    errors: { maSv: "", hoTen: "", sdt: "", email: "" },
  };

  //handleChange======================================

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  //submit=============================================

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    const checkErrorsMaSv = this.state.errors.maSv;
    const maSvInputRef = this.maSvInputRef.current.value;

    if (maSvInputRef.length < 5) {
      alert("Vui lòng kiểm tra lại thông tin!");
      return;
    }
    if (checkErrorsMaSv === "*Mã sinh viên đã tồn tại!") {
      alert("Vui lòng kiểm tra lại thông tin!");
      return;
    } else if (!isValid) {
      alert("Vui lòng kiểm tra lại thông tin!");
      return;
    }
    if (this.props.selectedStudent) {
      this.props.dispatch({
        type: "UPDATE_STUDENT",
        payload: this.state.values,
      });
      alert("Cập nhật thành công.");
      document.getElementById("Masv").disabled = false;
      document.getElementById("add").innerHTML = "Thêm sinh viên";
    } else {
      this.props.dispatch({
        type: "ADD_STUDENT",
        payload: this.state.values,
      });
      alert("Thêm sinh viên thành công.");
    }
    this.setState({ values: "", errors: "" });
  };

  //hadneBlur=========================================

  handleBlur = (event) => {
    let message = "";
    const data = this.props.studentList;
    const { name, value, validity, title, minLength, maxLength } = event.target;
    const { valueMissing, tooShort, patternMismatch } = validity;
    const maSvInputRef = this.maSvInputRef.current.value;

    if (name === "maSv" && maSvInputRef.length < 5) {
      message = "Mã sinh viên từ 5 đến 6 kí tự!";
    }
    if (name === "maSv") {
      for (let i in data) {
        if (data[i].maSv === value) {
          message = "*Mã sinh viên đã tồn tại!";
          break;
        }
      }
    }
    if (valueMissing) {
      message = `*Vui lòng điền vào ô này!`;
    }
    if (patternMismatch) {
      if (name === "sdt") {
        message = " *Vui lòng nhập có kí tự  số và kí tự đầu là số 0.";
      } else {
        message = `*Vui lòng nhập đúng định dạng!`;
      }
    } else if (tooShort) {
      message = `*${title} từ ${minLength}-${maxLength} kí tự!`;
    }

    this.setState({
      errors: { ...this.state.errors, [name]: message },
    });
  };

  //getDerivedStateFromProps============================================

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedStudent &&
      currentState.values.id !== nextProps.selectedStudent.id
    ) {
      currentState.values = nextProps.selectedStudent;
      currentState.errors = "";
    }
    return currentState;
  }

  //reset==========================================

  handleReset = () => {
    this.props.dispatch({
      type: "RESET",
    });
    this.setState({
      values: "",
      errors: "",
    });
    document.getElementById("Masv").disabled = false;
    document.getElementById("add").innerHTML = "Thêm sinh viên";
  };
  render() {
    const {
      maSv = "",
      hoTen = "",
      sdt = "",
      email = "",
    } = this.state.values || {};
    return (
      <div>
        <div className="card ">
          <div className="card-header bg-dark text-white ">
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="Masv">Mã sinh viên</label>
                    <input
                      ref={this.maSvInputRef}
                      value={maSv}
                      pattern="^[0-9]*$"
                      title="Mã sinh viên"
                      type="text"
                      name="maSv"
                      id="Masv"
                      required
                      minLength={5}
                      maxLength={6}
                      className="form-control"
                      placeholder="Nhập vào mã gồm 6 chữ số ..."
                      aria-describedby="helpId"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    <small id="helpId" className="text-danger">
                      {this.state.errors.maSv}
                    </small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="Hoten">Họ tên</label>
                    <input
                      value={hoTen}
                      title=" Họ tên"
                      required
                      type="text"
                      name="hoTen"
                      id="Hoten"
                      minLength={1}
                      maxLength={32}
                      pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$"
                      className="form-control"
                      placeholder="Nhập vào tên sinh viên ..."
                      aria-describedby="helpName"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    <small id="helpName" className="text-danger">
                      {this.state.errors.hoTen}
                    </small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="Sdt">Số điện thoại</label>
                    <input
                      value={sdt}
                      type="text"
                      title="Số điện thoại"
                      name="sdt"
                      id="Sdt"
                      required
                      pattern="^[0][0-9]*$"
                      minLength={10}
                      maxLength={11}
                      className="form-control"
                      placeholder="Nhập vào số điện thoại ..."
                      aria-describedby="helpSdt"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    <small id="helpSdt" className="text-danger">
                      {this.state.errors.sdt}
                    </small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      value={email}
                      type="email"
                      name="email"
                      id="Email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="form-control"
                      placeholder="Nhập vào email ..."
                      aria-describedby="helpEmail"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    <small id="helpEmail" className="text-danger">
                      {this.state.errors.email}
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button id="add" className="btn btn-outline-dark mr-2">
                  Thêm sinh viên
                </button>
                <button
                  onClick={() => this.handleReset()}
                  type="reset"
                  className="btn btn-outline-secondary mr-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
    selectedStudent: state.studentReducer.selectedStudent,
  };
};

export default connect(mapStateToProps)(RegisterForm);
