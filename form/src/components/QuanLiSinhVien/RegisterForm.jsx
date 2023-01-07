import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
class RegisterForm extends Component {
  state = {
    values: { maSv: "", hoTen: "  ", sdt: "", email: "" },
    errors: { maSv: "", hoTen: "  ", sdt: "", email: "" },
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();

    if (!isValid) {
      alert("Kiểm tra form kìa");
      return;
    }
    if (this.props.selectedStudent) {
      this.props.dispatch({
        type: "UPDATE_STUDENT",
        payload: this.state.values,
      });
    } else {
      this.props.dispatch({
        type: "ADD_STUDENT",
        payload: this.state.values,
      });
    }
  };
  handleBlur = (event) => {
    let message = "";
    console.log(event.target.validity);
    const { name, validity, title, minLength, maxLength } = event.target;
    const { valueMissing, tooShort, patternMismatch } = validity;

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
  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedStudent &&
      currentState.values.id !== nextProps.selectedStudent.id
    ) {
      currentState.values = nextProps.selectedStudent;
    }
    return currentState;
  }
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
                      pattern="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/gm"
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
                <button className="btn btn-outline-dark mr-2">
                  Thêm sinh viên
                </button>
                <button
                  style={{ display: "none" }}
                  className="btn btn-warning mr-2"
                >
                  Lưu
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
    selectedStudent: state.studentReducer.selectedStudent,
  };
};

export default connect(mapStateToProps)(RegisterForm);
