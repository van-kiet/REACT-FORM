import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import StudentManagement from "./StudentManagement";

export default class QuanLiSinhVien extends Component {
  render() {
    return (
      <div className="content">
        <div className="container">
          <RegisterForm />
          <StudentManagement />
        </div>
      </div>
    );
  }
}
