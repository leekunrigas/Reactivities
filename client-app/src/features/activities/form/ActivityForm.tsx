import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface Iprops {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<Iprops> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    // console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input name="title" onChange={(e) => handleInputChange(e)} placeholder="Title" value={activity.title} />
        <Form.TextArea
          name="description"
          onChange={(e) => handleInputChange(e)}
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          onChange={(e) => handleInputChange(e)}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          onChange={(e) => handleInputChange(e)}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input name="city" onChange={(e) => handleInputChange(e)} placeholder="City" value={activity.city} />
        <Form.Input name="venue" onChange={(e) => handleInputChange(e)} placeholder="Venue" value={activity.venue} />

        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
