import { React } from 'jimu-core';
import { Form, FormGroup, Label, Input, Slider, Switch, 
  Button, InputGroup, InputGroupAddon, InputGroupText } from 'jimu-ui';

interface State {
  radioValue: string
}

export class Page3 extends React.PureComponent<{}, State> {
  onRadioChanged(evt) {
    this.setState({
      radioValue: evt.currentTarget.value
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'radio1'
    }
    this.onRadioChanged = this.onRadioChanged.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Form</h2>
        {/* FORM: START */}
        <Form>
          <FormGroup>
            {/* Text */}
            <Label for="exampleText">Text</Label>
            <Input type="text" name="text" id="exampleText" placeholder="placeholder" />
          </FormGroup>
          <FormGroup>
            {/* Email */}
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="placeholder" />
          </FormGroup>
          <FormGroup>
            {/* Password */}
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="placeholder" />
          </FormGroup>
          <FormGroup>
            {/* Select */}
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            {/* Text Area */}
            <Label for="exampleTextArea">Text Area</Label>
            <Input type="textarea" name="text" id="exampleTextArea" />
          </FormGroup>
          <FormGroup>
            {/* Input Group */}
            <Label for="exampleTextArea">Input Groups</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="username" />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Amount" min={0} max={100} type="number" step="1" />
              <InputGroupAddon addonType="append"><Button size="sm">I'm a button</Button></InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            {/* Radios */}
            Radio Buttons:
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" value="radio1" checked={this.state.radioValue === 'radio1'}
                onChange={this.onRadioChanged} />{' '}
                Option one
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input type="radio" name="radio2" value="radio2" checked={this.state.radioValue === 'radio2'}
                onChange={this.onRadioChanged}/>{' '}
                Option two
             </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label>
                <Input type="radio" name="radio3" disabled />{' '}
                Option three (disabled)
             </Label>
            </FormGroup>
          </FormGroup>
          {/* Checks */}
          Checkboxes:
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check className="mr-5">
                <Input type="checkbox" checked/>{' '}
                Checkbox 1
              </Label>
              <Label className="mr-5">
                <Input type="checkbox" />{' '}
                Checkbox 2
              </Label>
              <Label>
                <Input type="checkbox" disabled />{' '}
                Checkbox 3 (disabled)
              </Label>
            </FormGroup>
          </FormGroup>

          Switches:
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check className="mr-5">
                <Switch />{' '}
                Switch 1
              </Label>
              <Label className="mr-5">
                <Switch checked />{' '}
                Switch 2
              </Label>
              <Label>
                <Switch disabled />{' '}
                Switch 3 (disabled)
              </Label>
            </FormGroup>
          </FormGroup>
        
          {/* Range (Slider) */}
          Range (Slider):<br/>
          <span className="text-muted">Using &#60;Input type="range"&#62; tag:</span>
          <Input style={{width: '300px'}} bsSize="sm" type="range" value="40"/>
          <Input style={{width: '300px'}} type="range" min={-100} max={300} step={5} value="100" onChange={e => {
            console.log(`Default slider's value: ${e.target.value}`);
          }}/>
          <Input style={{width: '300px'}} bsSize="lg" type="range" max={300} step={20} value="200"/>
          <span className="text-muted">Using &#60;Slider&#62; tag:</span>
          <Slider style={{width: '300px'}} value="20"/>
        </Form>
        {/* FORM: END */}

      </div>
    )
  }
}