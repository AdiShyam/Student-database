import React from 'react';
import StudentDetail from './StudentDetail';
import history from '../history';

class StudentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDetails : {}
        }
    }
    _handleStudentDetailClick = (event) => {
        history.push(`/${this.props.details.rollNo}`);
    }

    // shouldComponentUpdate (nextProp) {
    //     return this.props.details.class !== nextProp.details.class
    // }

    componentDidMount() {
        this.setState({
            cardDetails:this.props.details
        })
    }

    _calculateTotal = marks => {
        return Object.values(marks).reduce((acc, mark) => acc + mark)
    }

    render() {
        // console.log("the props are ", this.props.details);
        const studentDetails = this.props.details;
        if (StudentDetail) {
            const totalMarks = this._calculateTotal(studentDetails.marks);
            return (
                <div className ="student-card media-width" onClick = {this._handleStudentDetailClick} >
                    <div> Name: {studentDetails.name}</div>
                    <div>Total Marks: {totalMarks} </div>
                    <div> Roll No:{studentDetails.rollNo}</div>
                </div>
            )
        }
    }
}

export default StudentCard;
