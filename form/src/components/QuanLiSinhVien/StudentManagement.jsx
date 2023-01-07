import React, { Component } from "react";
import { connect } from "react-redux";
class StudentManagement extends Component {
  renderStudentList = () => {
    return this.props.studentList.map((ele) => {
      return (
        <tr key={ele.id}>
          <td>{ele.maSv}</td>
          <td>{ele.hoTen}</td>
          <td>{ele.sdt}</td>
          <td>{ele.email}</td>
          <td>
            <button
              onClick={() => this.updateStudent(ele)}
              className="btn btn-outline-secondary mr-2"
            >
              SỬA
            </button>
            <button
              onClick={() => this.deleteStudent(ele)}
              className="btn btn-outline-danger"
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };
  updateStudent = (user) => {
    this.props.dispatch({
      type: "SET_SELECTED_STUDENT",
      payload: user,
    });
  };
  deleteStudent = (user) => {
    this.props.dispatch({
      type: "DELETE_STUDENT",
      payload: user,
    });
  };
  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header bg-dark text-white">
          Danh sách sinh viên
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <label htmlFor="timSv" className="pr-2">
                Tìm kiếm
              </label>
              <input
                id="timSv"
                type="text"
                className="form-control"
                placeholder="Nhập tên sinh viên..."
              />
            </div>
            <div className="col-12">
              <table className="table mt-3  mr-3">
                <thead>
                  <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.renderStudentList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
  };
};
export default connect(mapStateToProps)(StudentManagement);
