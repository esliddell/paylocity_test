import React from 'react';
import { Row, Col, Button, Form, Card,  } from 'react-bootstrap';

 
class BenefitsDeductionCalculator extends React.Component {
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      
        var newCost = this.recalculateBenefitCost();

        if(newCost != prevState.yearlyCost)
        {
            this.setState( {
                yearlyCost: newCost,
                amountPerPaycheck: (newCost / 24.0).toPrecision(4)
            });
        }
    }

    constructor(props) {
        super(props);

        

        this.state = {
            netPaycheck: 2000,
            paychecksPeyYear: 26,
            amountPerPaycheck: 0,
            yearlyCost: 0,
            costForEmployee: 1000,
            costPerDependent: 500,
            contrivedDiscount: .1,
            value: 1,
            benefitsSelected: 1,
            employee: "",
            dependents: [ ]
        };  
    }

    recalculateBenefitCost() {
        var employeeContrivedDiscount = this.state.employee.substr(0,1).toUpperCase() == 'A' ? this.state.contrivedDiscount : 0;

        var yearlyCost = this.state.costForEmployee - (this.state.costForEmployee * employeeContrivedDiscount);

        this.state.dependents.forEach(dependent => {
            var dependentContrivedDistcount = dependent.name.substr(0,1).toUpperCase() == 'A' ? this.state.contrivedDiscount : 0;
            yearlyCost += this.state.costPerDependent - (this.state.costPerDependent * dependentContrivedDistcount);
        })

        return yearlyCost;

    }
   

    benefitsTypeSelection(event) {
        console.log(event);
    }

    handleButton(value) {
        
        console.log(value);
    }

    setEmployeeName = (event) => {
        
        this.setState({employee: event.target.value});
        
    }

    addDependent = (event) => {
        event.preventDefault();
        this.setState((state) => ({
            dependents: [ ...this.state.dependents,
            {name: ""}]
            
            
        }));
        
    }

    setDependentName = (event) => {
        
        let dependents = [...this.state.dependents];
        var id = event.target.id.split('_')[1];
        dependents[id].name = event.target.value;
        this.setState({dependents});
        
    }

    removeDependent = (index) => {
        this.state.dependents.splice(index,1);
        this.setState({
            dependents: this.state.dependents
        })
    }

    
  
    render(props) {

    

    return <Row >
        <Col xs={12}>
            <h1 >Deductions Calculator</h1>
        </Col>
        <Col xs={6}>
        <Row className="justify-content-xs-right">
            <Col xs={12}>
                <Form id="benefitsType" >
                    <Form.Group className="mb-3">
                        <Row  id="employee-container">
                            
                            <Col className="mb-3">
                                <Form.Label className="col-xs-6">Employee Name</Form.Label>
                            </Col>
                            <Col xs={6}>
                                <Form.Control type="text" placeholder="Name" className="mb-3" onChange={this.setEmployeeName}/>
                            </Col>
                            
                            <Col xs={12} className="mb-3" id="add-button-container">
                                <Button variant="secondary" type="button" id="addButton" onClick={this.addDependent}>Add Dependent</Button>
                            </Col>
                            {this.state.dependents.map((dependent, index) => (
                            <Col xs={12} className="mb-3">
                                <Row>
                                    <Col>
                                        <Form.Control type="text" placeholder={`Dependent ${index + 1}`} key={index} name="dependent" id={`dependent_${index}`} value={dependent.name} onChange={this.setDependentName} className="mb-3"/>
                                    </Col>
                                    <Col>
                                        <Button key={index} name="dependent" id={`dependent_${index}`} className="mb-3" onClick={() => this.removeDependent(index)}>Remove</Button>
                                    </Col>
                                
                                </Row>
                            </Col>
                            ))}
                        </Row> 
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        </Col>
        <Col xs={6}>
            <Row>
                <Card bg='dark' border='light'>
                    
                    <Card.Body>
                        <Card.Title>Benefits Cost</Card.Title>
                        <Card.Text>Net paycheck amount</Card.Text>
                        <Card.Text>${this.state.netPaycheck}</Card.Text>
                        <Card.Text>Paychecks per year</Card.Text>
                        <Card.Text>{this.state.paychecksPeyYear}</Card.Text>
                        <Card.Text>Amount per paycheck*</Card.Text>
                        <Card.Text>${this.state.amountPerPaycheck}</Card.Text>
                        
                        <Card.Text>Yearly cost</Card.Text>
                        <Card.Text>${this.state.yearlyCost}</Card.Text>
                        <Card.Subtitle>*Amount reflected will be taken from paychecks bi-monthly, on the months where there are three paychecks, this amount will not be removed.Go</Card.Subtitle>

                    </Card.Body>
                </Card>
                <h1></h1>
                
            </Row>    
        </Col>

    
    </Row>;
  }

  
  

}



export default BenefitsDeductionCalculator;