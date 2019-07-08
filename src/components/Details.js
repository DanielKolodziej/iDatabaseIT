import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const divStyle = {
    marginLeft: '5%',
    marginRight: '5%'
};

const Details = (props) => {
    const initialFormState = {title: '', author: '', keywords: ''};
    const [entry, setEntry] = useState(initialFormState);
    const [date, setDate] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        axios.get(`http://localhost:4000/entries/edit/${props.match.params.id}`, {signal: signal})
            .then(response => {
                setEntry({
                    title: response.data.title,
                    author: response.data.author,
                    keywords: response.data.keywords
                });
                setDate(response.data.date);
            })
            .catch(error => {
                console.log(error);
            })

        return function cleanup(){
            console.log('detail useEffect clean up...');
            abortController.abort();//cancal subscription by abort
        }
    }, []);

    return(
        <div style={divStyle}>
            <h3>Entry Details</h3>
                <div>
                    <label>Title: {entry.title}</label>
                </div>
                <div>
                    <label>Author: {entry.author}</label>
                </div>
                <div>
                    <label>Keywords: {entry.keywords}</label>
                </div>
                <div>
                    <label>Date Created: {date}</label>
                </div>
                <Link to={`/index`}><button className="ui primary button">Back</button></Link>
        </div>
    )
}


// class Details extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             title: '',
//             author: '',
//             keywords: '',
//             date: ''
//         };
//     }
//     componentDidMount(){
//         axios.get(`http://localhost:4000/entries/edit/${this.props.match.params.id}`)
//             .then(response => {
//                 this.setState({
//                     title: response.data.title,
//                     author: response.data.author,
//                     keywords: response.data.keywords,
//                     date: response.data.date
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     render(){
//         return(
//             <div style={divStyle}>
//                 <h3>Entry Details</h3>
//                     <div>
//                         <label>Title: {this.state.title}</label>
//                     </div>
//                     <div>
//                         <label>Author: {this.state.author}</label>
//                     </div>
//                     <div>
//                         <label>Keywords: {this.state.keywords}</label>
//                     </div>
//                     <div>
//                         <label>Date Created: {this.state.date}</label>
//                     </div>
//                     <Link to={`/index`}><button className="ui primary button">Back</button></Link>
//             </div>
//         )
//     }
// }

export default Details;