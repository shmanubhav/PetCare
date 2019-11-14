import React, { Component } from "react";

import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {observer} from "mobx-react";
import moment from "moment";

class AddEventForm extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Event Title',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const { eventStore, onSubmitCallback } = this.props;
        let start = moment(`${this.state.startDate} ${this.state.startTime}`);
        let end = moment(`${this.state.endDate} ${this.state.endTime}`);
        eventStore.addEvent({
            start: new Date(start),
            end: new Date(end),
            title: this.state.title,
        });
        onSubmitCallback()
    };

    render() {
        const {petStore} = this.props;
        const {pets} = petStore;
        return (
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label for="name">Title</Label>
                    <Input type="text" name="name" id="name" placeholder="Walk Rover" required
                           onChange={e => this.setState({ title: e.target.value })} />
                </FormGroup>
                <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input
                        type="date"
                        name="date"
                        id="startDate"
                        placeholder="date placeholder"
                        required
                        onChange={e => this.setState({ startDate: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="startTime">Start Time</Label>
                    <Input
                        type="time"
                        name="time"
                        id="startTime"
                        placeholder="time placeholder"
                        required
                        onChange={e => this.setState({ startTime: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleDate">End Date</Label>
                    <Input
                        type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                        required
                        onChange={e => this.setState({ endDate: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endTime">End Time</Label>
                    <Input
                        type="time"
                        name="time"
                        id="endTime"
                        placeholder="time placeholder"
                        required
                        onChange={e => this.setState({ endTime: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="petSelect">Pet</Label>
                    <Input type="select" name="select" id="petSelect">
                        {pets.map(pet => <option>{pet.name}</option>)}
                    </Input>
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
            </Form>
        )
    }

}

export default observer(AddEventForm)