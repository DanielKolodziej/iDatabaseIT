import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const divStyle = {
    marginLeft: '12%',
    marginRight: '12%'
};

const Create = () => {
    const initialFormState = {title: '', author: '', keywords: '', body: ''};
    const [entry, setEntry] = useState(initialFormState);
    const [date, setDate] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntry({...entry, [name]: value})
    }

    useEffect(()=>{
        //helper function to get the present date of creation
        const getTodayDate = () => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            
            today = mm + '/' + dd + '/' + yyyy;
            console.log('today',today);
            setDate(today);
        }

        getTodayDate();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(`Title: ${entry.title},
                    Author: ${entry.author},
                    Keywords: ${entry.keywords},
                    Body: ${entry.body},
                    Date Created: ${date}`
        );

        const response = { 
            title: entry.title,
            author: entry.author,
            keywords: entry.keywords,
            body: entry.body,
            date: date
        };
        axios.post('http://localhost:4000/entries/add', response)
            .then(res => console.log(res.data));
        
            //reset form fields
            setEntry(initialFormState);
    }
    return(
        <div style={divStyle}>
            <form className="ui form" onSubmit={onSubmit}>
            <h3 className="ui dividing header">Add Entry</h3> 
            <div className="field">
                <label>Add Title:</label>
                <input
                    type="text"
                    name="title"
                    value={entry.title}
                    onChange={handleInputChange}/>
            </div>
            <div className="field">
                <label>Add Author:</label>
                <input
                    type="text"
                    name="author"
                    value={entry.author}
                    onChange={handleInputChange}/>
            </div>
            <div className="field">
                <label>Add Keywords:</label>
                <input
                    type="text"
                    name="keywords"
                    value={entry.keywords}
                    onChange={handleInputChange}/>
            </div>
            <div className="field">
                <label>Add Entry Details:</label>
                <textarea
                    name="body"
                    value={entry.body}
                    onChange={handleInputChange}/>
            </div>
            <div className="field">
                <input
                    type="submit"
                    className="ui primary button"
                    value="Register Entry"/>
                    <Link to={`/`}><button className="ui basic button">Cancel</button></Link>
            </div>
            </form>
        </div>
    );

}

// class Create extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             title: '',
//             author: '',
//             keywords: '',
//             date:''
//         }
//     }
    
//     onChangeTitle = (e) => {
//         this.setState({
//             title: e.target.value
//         })
//     }
//     onChangeAuthor = (e) => {
//         this.setState({
//             author: e.target.value
//         })
//     }
//     onChangeKeywords = (e) => {
//         this.setState({
//             keywords: e.target.value
//         })
//     }

//     //helper function to get the present date of creation
//     getTodayDate = () => {
//         let today = new Date();
//         let dd = String(today.getDate()).padStart(2, '0');
//         let mm = String(today.getMonth() + 1).padStart(2, '0');
//         let yyyy = today.getFullYear();

//         today = mm + '/' + dd + '/' + yyyy;
//         console.log('today',today);
//         this.setState({
//             date: today
//         })
//     }
//     componentDidMount = () => {
//         this.getTodayDate();
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         console.log(`Title: ${this.state.title},
//             Author: ${this.state.author},
//             Keywords: ${this.state.keywords},
//             Date Created: ${this.state.date}`
//         );
//         const response = { 
//             title: this.state.title,
//             author: this.state.author,
//             keywords: this.state.keywords,
//             date: this.state.date
//         };
//         axios.post('http://localhost:4000/entries/add', response)
//             .then(res => console.log(res.data));

//         //reset form fields
//         this.setState({
//             title: '',
//             author: '',
//             keywords: ''
//         })
//     }

//     render(){
//         return(
//             <div style={divStyle}>
//                <form className="ui form" onSubmit={this.onSubmit}>
//                <h3 className="ui dividing header">Add Entry</h3> 
//                 <div className="field">
//                     <label>Add Title:</label>
//                     <input
//                         type="text"
//                         value={this.state.title}
//                         onChange={this.onChangeTitle}/>
//                 </div>
//                 <div className="field">
//                     <label>Add Author:</label>
//                     <input
//                         type="text"
//                         value={this.state.author}
//                         onChange={this.onChangeAuthor}/>
//                 </div>
//                 <div className="field">
//                     <label>Add Keywords:</label>
//                     <input
//                         type="text"
//                         value={this.state.keywords}
//                         onChange={this.onChangeKeywords}/>
//                 </div>
//                 <div className="field">
//                     <label>Add Entry Details:</label>
//                     <textarea/>
//                 </div>
//                 <div className="field">
//                     <input
//                         type="submit"
//                         className="ui primary button"
//                         value="Register Entry"/>
//                         <Link to={`/`}><button className="ui basic button">Cancel</button></Link>
//                 </div>
//                </form>
//             </div>
//         );
//     }
// }

export default Create;
