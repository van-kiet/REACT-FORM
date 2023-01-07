const DEFAULT_STATE = {
  studentList: [
    {
      id: 1,
      maSv: "123456",
      hoTen: "Võ Văn Kiệt",
      sdt: "0123456789",
      email: "kietprocute@gmail.com",
    },
    {
      id: 2,
      maSv: "123457",
      hoTen: "Chú Bé Đần",
      sdt: "0123456789",
      email: "chubedan123@gmail.com",
    },
  ],
  selectedStudent: null,
};
export const studentReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_STUDENT":
      const data = [...state.studentList];
      data.push({ ...payload, id: Date.now() });
      state.studentList = data;
      break;
    case "SET_SELECTED_STUDENT":
      state.selectedStudent = payload;
      break;
    case "DELETE_STUDENT":
      state.studentList = state.studentList.filter((ele) =>
        ele.id === payload.id ? false : true
      );
      break;
    case "UPDATE_STUDENT":
      state.studentList = state.studentList.map((ele) =>
        ele.id === payload.id ? payload : ele
      );
      state.selectedStudent = null;

      break;
    default:
      break;
  }
  return { ...state };
};
