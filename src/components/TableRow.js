import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const TableRow = (props) => {
    // const deleteItem = () => {
    //     let result = window.confirm("Are you sure you want to delete this item?");
    //         if (result){
    //             axios.get(`http://localhost:4000/entries/delete/${props.obj._id}`)
    //                 .then(console.log('delete clicked...'))
    //                 .catch((err => {
    //                     console.log(err);
    //                 }))
    //         }
    // }

    return(
        <tr>
            <td>
                {props.obj.title}
            </td>
            <td>
                {props.obj.author}
            </td>
            <td>
                {props.obj.keywords}
            </td>
            <td>
                <Link to={`/details/${props.obj._id}`}><button className="ui primary button">Open</button></Link>
                <Link to={`/edit/${props.obj._id}`}><button className="ui basic button">Edit</button></Link>
                {/* <button className="ui basic red button" onClick={deleteItem}>Delete</button> */}
            </td>
        </tr>
    )
}

// class TableRow extends React.Component{
//     delete = () => {
//         let result = window.confirm("Are you sure you want to delete this item?");
//             if (result){
//             axios.get(`http://localhost:4000/entries/delete/${this.props.obj._id}`)
//             .then(console.log('delete clicked...'))
//             .catch((err => {
//                 console.log(err);
//             }))
//         }
//     }
    
//     render(){
//         return(
//             <tr>
//                 <td>
//                     {this.props.obj.title}
//                 </td>
//                 <td>
//                     {this.props.obj.author}
//                 </td>
//                 <td>
//                     {this.props.obj.keywords}
//                 </td>
//                 <td>
//                     <Link to={`/details/${this.props.obj._id}`}><button className="ui primary button">Open</button></Link>
//                     <Link to={`/edit/${this.props.obj._id}`}><button className="ui basic button">Edit</button></Link>
//                     <button className="ui red button" onClick={this.delete}>Delete</button>
//                 </td>
//             </tr>
//         )
//     }
// }

export default TableRow;