import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.msgs = props.texts;
      }
    
    render() {
        let msgs = this.msgs.map((msg, index) => 
                <div key={ index } className="alert alert-primary" role="alert">{ msg }</div>);
       
        return (
            <div className="card">
                <Container>
                    <Row>
                        <Col style = {{ textAlign: "left"}}>
                            <h3>
                                Results:
                            </h3>
                        </Col>
                      </Row>
                    <Row>
                        <Col style = {{ padding: "50px; important!"}}>
                            <div className="card-body">{ msgs }</div>
                        </Col>  
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Content;