import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { Chart } from './Chart';

class StudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentDetail: {}
    };
  }

  _getStudentDetail = data => {
    const studentId = parseInt(this.props.match.params.id);
    const studentDetail = Object.values(data).filter(
      student => student.rollNo === studentId
    )[0];
    this.setState({ studentDetail });
  };

  componentDidMount() {
    axios.get("https://api.myjson.com/bins/1dlper").then(response => {
      this._getStudentDetail(response.data);
    });
  }

  _renderTable = table => {
    if (!table) {
      return <div> Table Loading</div>;
    } else {
      return (
        <table className="table">
            <tbody>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                </tr>
                <tr>
                    <td>Subject 1</td>
                    <td>{table.s1}</td>
                </tr>
                <tr>
                    <td>Subject 2</td>
                    <td>{table.s2}</td>
                </tr>
                <tr>
                    <td>Subject 3</td>
                    <td>{table.s3}</td>
                </tr>
          </tbody>
        </table>
      );
    }
  };

  render() {
    const { studentDetail } = this.state;
    return (
      <div className="student-details-wrapper">
        <Link to='/dashboard' className="dashboard-link">Dashboard</Link>
        <div>Student Name = {studentDetail.name}</div>
        <div>class = {studentDetail.class}</div>
        <div>RollNumber ={studentDetail.rollNo}</div>       
        <div>The Marks Obtained is</div>
        {this._renderTable(studentDetail.marks)}
        <div className="graph">
            The graph of the Student Subjects are
            {Chart({data:studentDetail.marks, color:'orange', units: 'average'})}
        </div>
      </div>
    );
  }
}

export default StudentDetail;
