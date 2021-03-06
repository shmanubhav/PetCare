import React, {Component} from "react";

import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {observer} from "mobx-react";

class AddPetForm extends Component {

    isEditForm = false;

    constructor(props) {
        super(props);
        const petToEdit = props.petToEdit;
        if (petToEdit) {
            this.state = {
                ...petToEdit,
            };
            this.isEditForm = true;
        } else {
            this.state = {
                name: '',
                type: '',
                breed: '',
                weight: 0,
                age: '',
                notes: '',
                img: '',
            }
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const {petStore, onSubmitCallback} = this.props;
        const img = this.state.img || "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/03/12192604/Black-Lab-Face.jpg";
        if (this.isEditForm) {
            petStore.editPet({
                ...this.state
            })
        } else {
            petStore.addPet({
                id: Math.random(),
                ...this.state,
                img
            });
        }
        onSubmitCallback()
    };

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label for="name">Name<span className="text-danger"> *</span></Label>
                    <Input type="text" name="name" id="name" placeholder="Rover" required
                           value={this.state.name}
                           onChange={e => this.setState({name: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label for="petType">Type</Label>
                    <Input type="select" name="petType" id="petType" value={this.state.type} onChange={
                        e => this.setState({type: e.target.value})}>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Bird</option>
                        <option>Other</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="petBreed">Breed<span className="text-danger"> *</span></Label>
                    <Input type="text" name="petBreed" id="petBreed" placeholder="German Sheppard" required
                           value={this.state.breed}
                           onChange={e => this.setState({breed: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label for="petWeight">Weight <span
                        className="text-secondary font-weight-light">(lbs)</span></Label>
                    <Input type="number" name="petWeight" id="petWeight" placeholder="0" step=".01"
                           value={this.state.weight}
                           onChange={e => this.setState({weight: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label for="petAge">Age</Label>
                    <Input type="number" name="petAge" id="petAge" placeholder="0"
                           value={this.state.age}
                           onChange={e => this.setState({age: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label for="petNotes">Notes</Label>
                    <Input type="textarea" name="petNotes" id="petNotes" placeholder="Best Pupper"
                           value={this.state.notes}
                           onChange={e => this.setState({notes: e.target.value})}/>
                </FormGroup>

                <FormGroup>
                    <Label for="petImg">Photo</Label>
                    <Input type="url" name="petImg" id="petImg" placeholder="https://rover.com/avatar.jpg"
                           value={this.state.img}
                           onChange={e => this.setState({img: e.target.value})}/>
                    <FormText>This must be a URL to a pet image (upload not implemented for Prototype)</FormText>
                </FormGroup>

                <Button type="submit" color="primary">{this.isEditForm ? `Submit changes for ${this.state.name}` : `Add your Furry Friend`}</Button>
            </Form>
        )
    }

}

export default observer(AddPetForm)