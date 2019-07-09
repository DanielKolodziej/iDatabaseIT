import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const divStyle = {
    marginLeft: '5%',
    marginRight: '5%'
};


const Edit = (props) => {
    const initialFormState = {title: '', author: '', keywords: '', body: ''};
    const [entry, setEntry] = useState(initialFormState);

    useEffect(()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;

        axios.get(`http://localhost:4000/entries/edit/${props.match.params.id}`, {signal: signal})
            .then(response => {
                setEntry({
                    title: response.data.title,
                    author: response.data.author,
                    keywords: response.data.keywords,
                    body: response.data.body
                });
            })
            .catch(error => {
                console.log(error);
            })

        return function cleanup(){
            console.log('edit useEffect clean up...');
            abortController.abort();//cancal subscription by abort
        }

    },[]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntry({...entry, [name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            title: entry.title,
            author: entry.author,
            keywords: entry.keywords,
            body: entry.body
        };
        axios.post(`http://localhost:4000/entries/update/${props.match.params.id}`, obj)
            .then(res => {
                console.log(res.data);
            });
        props.history.push('/index');
    }
    return(
        <div style={divStyle}>
            <form className="ui form" onSubmit={onSubmit}>
                <h3 className="ui dividing header">Update Entry</h3>    
                <div className="field">
                    <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={entry.title}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="field"> 
                            <label>Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={entry.author}
                                onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>Keywords:</label>
                            <input
                                type="text"
                                name="keywords"
                                value={entry.keywords}
                                onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>Body Details:</label>
                            <textarea
                                name="body"
                                value={entry.body}
                                onChange={handleInputChange}/>
                        </div>
                    <div>
                        <input
                            type="submit"
                            className="ui primary button"
                            value="Update Entry"/>
                            <Link to={`/index`}><button className="ui basic button">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
}


// class Edit extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             title: '',
//             author: '',
//             keywords: ''
//         };
//     }
//     componentDidMount(){
//         axios.get(`http://localhost:4000/entries/edit/${this.props.match.params.id}`)
//             .then(response => {
//                 this.setState({
//                     title: response.data.title,
//                     author: response.data.author,
//                     keywords: response.data.keywords
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     onChangeTitle = (e) => {
//         this.setState({
//             title: e.target.value
//         });
//     }
//     onChangeAuthor = (e) => {
//         this.setState({
//             author: e.target.value
//         });
//     }
//     onChangeKeywords = (e) => {
//         this.setState({
//             keywords: e.target.value
//         });
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         const obj = {
//             title: this.state.title,
//             author: this.state.author,
//             keywords: this.state.keywords
//         };
//         axios.post(`http://localhost:4000/entries/update/${this.props.match.params.id}`, obj)
//             .then(res => {
//                 console.log(res.data);
//             });
//         this.props.history.push('/index');
//     }
//     render(){
//         return(
//             <div style={divStyle}>
//                 <form className="ui form" onSubmit={this.onSubmit}>
//                     <h3 className="ui dividing header">Update Entry</h3>    
//                     <div className="field">
//                         <label>Title:</label>
//                         <input
//                             type="text"
//                             value={this.state.title}
//                             onChange={this.onChangeTitle}/>
//                     </div>
//                     <div className="field"> 
//                         <label>Author:</label>
//                         <input
//                             type="text"
//                             value={this.state.author}
//                             onChange={this.onChangeAuthor}/>
//                     </div>
//                     <div className="field">
//                         <label>Keywords:</label>
//                         <input
//                             type="text"
//                             value={this.state.keywords}
//                             onChange={this.onChangeKeywords}/>
//                     </div>
//                     <div>
//                         <input
//                             type="submit"
//                             className="ui primary button"
//                             value="Update Entry"/>
//                             <Link to={`/index`}><button className="ui basic button">Cancel</button></Link>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

export default Edit;