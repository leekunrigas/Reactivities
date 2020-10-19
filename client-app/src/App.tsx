import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";

const App: React.FC = () => {
  const [values, setValues] = useState(Array);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/values")
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>

      <List>
        {values.map((value: any) => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
