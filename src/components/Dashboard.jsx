import React from 'react';
import axios from 'axios';
import StudentCard from './StudentCard';
import SearchBar from './SearchBar'

class Dashboard  extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            searchStringValue: '',
            isAscending: true,
            isDecending: false
        }
        this.noDataFound = 0;
        this.studentDataList = [];
        this.studentData = {}
    }

    componentDidMount() {
        axios.get("https://api.myjson.com/bins/1dlper").then((response) => {
            this.studentData = response.data;
            this.studentDataList = Object.values(this.studentData);
            this.noDataFound = (this.studentDataList.lenght === 0)? 1: 2;
            this.studentDataList = this.checkToggleButton(this.studentDataList, this.state.isAscending);
            this.setState({
                data: this.studentDataList
            })
        })
    }

    checkToggleButton = (studentDataList, isAscending) => {
        if (isAscending) {
            return this.ascendingOrderSort(studentDataList)
        } else {
            return this.decendingOrderSort(studentDataList);
        }
    }

    componentWillUpdate(nextProp, nextState) {
        if (this.state.searchStringValue !== nextState.searchStringValue) {
            if(!(nextState.searchStringValue === "")) {
                this.getStudentDataOnSearchString(nextState.searchStringValue, Object.values(this.studentData));
            }
            if (nextState.searchStringValue === "") {
                this.studentDataList = Object.values(this.studentData);
                this.noDataFound = (this.studentDataList.lenght === 0)? 1: 2;
                this.setState({
                    data: this.studentDataList
                });
            }
            
        }
        if (this.state.isAscending !== nextState.isAscending) {
            this.studentDataList = this.checkToggleButton(this.studentDataList, nextState.isAscending);
            this.setState({
                data: this.studentDataList
            });
        }
    }

    renderStudentCard = (studentMap) => {
        return studentMap.map((student) => {
            return <StudentCard {...this.props} details= {student} key= {student.rollNo}/>
        });
    }

    _handleSearchTerm = value => {
        this.setState({searchStringValue: value})
    }

    _handleDecendingorderClick = event => {
        this.setState(
            {
                isDecending: true,
                isAscending: false
            }
        )
    }

    _handleAscendingOrderClick = event => {
        this.setState(
            {
                isDecending: false,
                isAscending: true
            }
        )
    }

    getStudentDataOnSearchString = (stringValue, studentDataList) => {
        this.studentDataList =  studentDataList.filter((element) => {
            return element.name.toLocaleLowerCase().startsWith(stringValue.toLocaleLowerCase())
        })
        if(this.studentDataList.length === 0) {
            this.noDataFound = 1;
        } else {
            this.noDataFound = 2;
        }
        this.setState({
            data: this.studentDataList
        });
    }

    ascendingOrderSort = (studentDataList) => {
        return studentDataList.sort((a, b) => {
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort student names ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 
        })
      }
    
      decendingOrderSort = (studentDataList) => {
        return studentDataList.sort((a, b) =>{
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA > nameB) //sort student names decending 
                return -1 
            if (nameA < nameB)
                return 1
            return 0 
        })
      }

    render() {
        const studentList = this.state.data;
        if(this.noDataFound === 0) {
            return(<div className="loading">Loading the Student data!!!!!!!!</div>)
        } else {
            return (
                <div>
                    <div className="search-wrapper">
                        <div className="title">Search Based on Student Name</div>
                        <SearchBar searchTerm = {this._handleSearchTerm} />
                        <button className={this.state.isAscending? "button clicked": "button"} onClick = {this._handleAscendingOrderClick}>&#x2B06;</button>
                        <button className={this.state.isDecending? "button clicked": "button"} onClick={this._handleDecendingorderClick}>&#x2B07; </button>
                    </div>
                    {
                        (this.noDataFound === 1) 
                        ? 
                        (
                            <div className= "no-data title"> The Student Name starting with "{this.state.searchStringValue}" is not found in the database </div>
                        ) 
                        :
                        (
                            <div className='dashboard'> {this.renderStudentCard(studentList)}</div>
                        )
                    }
                </div>
            )
        }
    }
} 

export default Dashboard;
