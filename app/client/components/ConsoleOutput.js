import React from 'react';
import { Panel, Accordion, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import RemoteRobotStore from '../stores/RemoteRobotStore';
import RobotActions from '../actions/RobotActions';

var ConsoleOutput = React.createClass({
  getInitialState() {
    return {output: []}
  },
  updateConsole() {
    this.setState({output: RemoteRobotStore.getConsoleData()});
  },
  componentDidMount() {
    RemoteRobotStore.on('change', this.updateConsole);
  },
  clearConsole() {
    RobotActions.clearConsole();
  },
  render() {
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsSize="small" bsStyle='default' onClick={ ()=> this.setState({ open: !this.state.open })}>Click to Show Output</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button bsSize="small" bsStyle='default' onClick={this.clearConsole}>Clear</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Panel collapsible expanded={this.state.open}>
          <div style={{maxHeight: '300px', overflowY: 'auto'}}>
          { this.state.output.map((line, index)=><pre><code>{line}</code></pre>) }
          </div>
        </Panel>
      </div>
    );
  }
});

export default ConsoleOutput;
