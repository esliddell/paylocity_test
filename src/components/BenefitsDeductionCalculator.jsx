import React from 'react';
import { useImperativeHandle } from 'react';
import { Row, Col, InputGroup, FormControl, Button, Form, ButtonGroup, ToggleButton, ToggleButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from 'react-dom';
 
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
            <Form id="benefitsType" >
                <Form.Group className="mb-3">
                    <Form.Label className="mb-3 col-xs-6">Employee Name</Form.Label>
                    <Col xs={6} className="">
                        <Form.Control type="text" placeholder="Name" className="mb-3 col-xs-6" onChange={this.setEmployeeName}/>
                    </Col>
                    <Button variant="secondary" type="button" onClick={this.addDependent} className="mb-3">Add Dependent</Button>
                    {this.state.dependents.map((dependent, index) => (
                        <Col xs={12} className="">
                            <Row>
                                <Col xs={6}>
                                    <Form.Control type="text" placeholder={`Dependent ${index + 1}`} key={index} name="dependent" id={`dependent_${index}`} value={dependent.name} onChange={this.setDependentName} className="mb-3"/>
                                </Col>
                                <Col xs={6}>
                                    <Button key={index} name="dependent" id={`dependent_${index}`} className="mb-3" onClick={() => this.removeDependent(index)}>Remove</Button>
                                </Col>
                            
                            </Row>
                        </Col>
                    ))} 
                </Form.Group>
            </Form>
        </Row>
        </Col>
        <Col xs={6}>
            <Row>
                <h1>Benefits Cost</h1>
                <label>Net paycheck amount</label><span className="mb-3">${this.state.netPaycheck}</span>
                <label>Paychecks per year</label><span className="mb-3">{this.state.paychecksPeyYear}</span>
                <label>Amount per paycheck*</label><span className="mb-3">{this.state.amountPerPaycheck}</span>
                <label>Yearly cost</label><span className="mb-3">{this.state.yearlyCost}</span>
            </Row>    
        </Col>

    
    </Row>;
  }

  
  

}



export default BenefitsDeductionCalculator;