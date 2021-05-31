import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Content from '../components/content';

class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            texts: [], // save texts sent!
            text: '' // page text current!
        }

        this.updateInput = this.updateInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit() {
        let textSubmit = this.state.text;
        if (textSubmit.length) {
            // uncomment to reach the API at localhost and comment the next line!
            // let endpoint = 'http://localhost:5000/iecho?text=' + textSubmit;
            // uncomment to reach the API at heroku and comment the line previous!
            let endpoint = 'https://frozen-temple-59746.herokuapp.com/iecho?text=' + textSubmit;

            fetch(endpoint, {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    // save texts
                    let bakTexts = this.state.texts;
                    let newText = data.text;
                    if (data.palindrome === true) {
                        newText = newText + ' es palindrome!';
                    }
                    // add new text
                    bakTexts.push(newText);
                    // do a reverse
                    let reverseTexts = bakTexts.reverse();
                    this.setState({ texts: reverseTexts, text: '' });
                    console.log(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    updateInput(evt) {
        this.setState({ text: evt.target.value });
    }

    render() {
        return ( <
            Container fluid >
            <
            Row className = "p-3"
            style = {
                { backgroundColor: '#e00002' }
            } >
            <
            Col xs = "1"
            sm = "2"
            md = "2"
            lg = "3" > < /Col> <
            Col >
            <
            Form >
            <
            Form.Control type = "text"
            placeholder = "Enter text!"
            onChange = { this.updateInput }
            value = { this.state.text }
            /> < /
            Form >

            <
            /Col> <
            Col sm = "1" >
            <
            Button variant = "primary"
            type = "submit"
            onClick = { this.onSubmit } >
            Submit <
            /Button> < /
            Col > <
            Col xs = "1"
            sm = "2"
            md = "2"
            lg = "3" > < /Col> < /
            Row >

            <
            Row style = {
                { height: "" }
            } >
            <
            Col xs = "1"
            sm = "1"
            md = "2" > < /Col> <
            Col className = "mt-4" >
            <
            Content texts = { this.state.texts } > < /Content> < /
            Col > <
            Col xs = "1"
            sm = "1"
            md = "2" > < /Col> < /
            Row > <
            /Container>
        )
    }
}

export default Layout;